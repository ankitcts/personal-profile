"""Generic extraction engine — reads senders.json, queries Gmail, extracts transactions.

Adding a new merchant is a JSON edit (see extractor/senders.json), not a code change.
"""

from __future__ import annotations

import json
import re
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

from .gmail_client import Message, fetch_message, search_message_ids


# -- Sender catalog ---------------------------------------------------------


@dataclass
class AmountPattern:
    regex: re.Pattern[str]
    source: str  # "plain" | "html" | "snippet" | "subject"


@dataclass
class SenderRule:
    id: str
    name: str
    category: str
    from_domains: list[str] = field(default_factory=list)
    from_addresses: list[str] = field(default_factory=list)
    subject_includes: list[str] = field(default_factory=list)
    amount_patterns: list[AmountPattern] = field(default_factory=list)
    amount_sign: str = "positive"  # "positive" | "negative"
    is_fallback: bool = False


def load_senders(path: Path) -> list[SenderRule]:
    raw = json.loads(path.read_text())
    rules: list[SenderRule] = []
    for entry in raw.get("senders", []):
        m = entry.get("match", {}) or {}
        patterns = [
            AmountPattern(re.compile(p["regex"], re.IGNORECASE | re.MULTILINE), p.get("source", "plain"))
            for p in entry.get("amount_patterns", [])
        ]
        rules.append(
            SenderRule(
                id=entry["id"],
                name=entry["name"],
                category=entry.get("category", "Uncategorized"),
                from_domains=m.get("from_domains", []),
                from_addresses=m.get("from_addresses", []),
                subject_includes=m.get("subject_includes", []),
                amount_patterns=patterns,
                amount_sign=entry.get("amount_sign", "positive"),
                is_fallback=bool(entry.get("is_fallback", False)),
            )
        )
    return rules


# -- Query building ---------------------------------------------------------


def build_query(rule: SenderRule, since: str | None, until: str | None) -> str | None:
    """Build a Gmail search query for a sender rule.

    Date range uses Gmail's `after:YYYY/MM/DD` / `before:YYYY/MM/DD` syntax.
    Returns None for fallback rules (those are matched against already-fetched messages).
    """
    if rule.is_fallback:
        return None

    parts: list[str] = []
    from_clauses: list[str] = [f"from:{d}" for d in rule.from_domains]
    from_clauses += [f"from:{a}" for a in rule.from_addresses]
    if from_clauses:
        parts.append("(" + " OR ".join(from_clauses) + ")")

    if rule.subject_includes:
        subj_clauses = " OR ".join(f'subject:"{s}"' for s in rule.subject_includes)
        parts.append(f"({subj_clauses})")

    if since:
        parts.append(f"after:{since.replace('-', '/')}")
    if until:
        parts.append(f"before:{until.replace('-', '/')}")

    if not parts:
        return None
    return " ".join(parts)


# -- Rule matching ----------------------------------------------------------


def message_matches_rule(msg: Message, rule: SenderRule) -> bool:
    """Does this message match the rule? Used for fallback rules and dedup."""
    if rule.from_domains and not any(d in msg.sender_domain for d in rule.from_domains):
        return False
    if rule.from_addresses and not any(a.lower() in msg.sender.lower() for a in rule.from_addresses):
        return False
    if rule.subject_includes and not any(s.lower() in msg.subject.lower() for s in rule.subject_includes):
        return False
    return True


def _body_source(msg: Message, source: str) -> str:
    if source == "plain":
        return msg.plain_body
    if source == "html":
        html = msg.html_body
        if not html:
            return ""
        # Strip tags but keep visible text so regex against the rendered text works.
        try:
            from bs4 import BeautifulSoup
            return BeautifulSoup(html, "html.parser").get_text(separator=" ", strip=True)
        except Exception:
            return html
    if source == "snippet":
        return msg.snippet
    if source == "subject":
        return msg.subject
    return ""


def extract_amount(msg: Message, rule: SenderRule) -> float | None:
    for pat in rule.amount_patterns:
        text = _body_source(msg, pat.source)
        if not text:
            continue
        m = pat.regex.search(text)
        if m:
            try:
                val = float(m.group(1).replace(",", ""))
                return -val if rule.amount_sign == "negative" else val
            except (ValueError, IndexError):
                continue
    return None


# -- Driving the extraction -------------------------------------------------


@dataclass
class Transaction:
    date: str
    merchant: str
    category: str
    amount: float
    note: str = ""
    message_id: str = ""
    sender_rule_id: str = ""


def run(
    service,
    rules: list[SenderRule],
    since: str | None,
    until: str | None,
    on_progress=None,
) -> tuple[list[Transaction], dict[str, Any]]:
    """Run extraction. Returns (transactions, stats)."""
    txs: list[Transaction] = []
    stats = {
        "by_rule": {r.id: {"matched": 0, "amount_extracted": 0, "no_amount": 0} for r in rules},
        "total_messages_scanned": 0,
        "total_transactions": 0,
        "duplicate_messages_skipped": 0,
    }
    seen_message_ids: set[str] = set()

    # Pass 1: targeted rules
    for rule in rules:
        if rule.is_fallback:
            continue
        query = build_query(rule, since, until)
        if not query:
            continue
        if on_progress:
            on_progress(f"[{rule.id}] query: {query}")
        for mid in search_message_ids(service, query):
            if mid in seen_message_ids:
                stats["duplicate_messages_skipped"] += 1
                continue
            seen_message_ids.add(mid)
            stats["total_messages_scanned"] += 1
            msg = fetch_message(service, mid)
            stats["by_rule"][rule.id]["matched"] += 1
            amount = extract_amount(msg, rule)
            if amount is None:
                stats["by_rule"][rule.id]["no_amount"] += 1
                # Still record the row at $0 so it appears in the audit, useful for tuning regexes.
                txs.append(
                    Transaction(
                        date=msg.date_iso,
                        merchant=rule.name,
                        category=rule.category,
                        amount=0.0,
                        note=f"amount not parsed — subject: {msg.subject[:60]}",
                        message_id=mid,
                        sender_rule_id=rule.id,
                    )
                )
                continue
            stats["by_rule"][rule.id]["amount_extracted"] += 1
            txs.append(
                Transaction(
                    date=msg.date_iso,
                    merchant=rule.name,
                    category=rule.category,
                    amount=amount,
                    note="",
                    message_id=mid,
                    sender_rule_id=rule.id,
                )
            )

    # Pass 2: fallback rules — query broadly with date range, then match each result.
    fallback_rules = [r for r in rules if r.is_fallback]
    if fallback_rules and (since or until):
        # Build a single broad query from the union of subject_includes across fallbacks.
        subj_terms = sorted({s for r in fallback_rules for s in r.subject_includes})
        if subj_terms:
            subj_clause = " OR ".join(f'subject:"{s}"' for s in subj_terms)
            date_clause_parts = []
            if since:
                date_clause_parts.append(f"after:{since.replace('-', '/')}")
            if until:
                date_clause_parts.append(f"before:{until.replace('-', '/')}")
            query = f"({subj_clause}) " + " ".join(date_clause_parts)
            if on_progress:
                on_progress(f"[fallback] query: {query}")
            for mid in search_message_ids(service, query):
                if mid in seen_message_ids:
                    continue
                seen_message_ids.add(mid)
                stats["total_messages_scanned"] += 1
                msg = fetch_message(service, mid)
                for rule in fallback_rules:
                    if not message_matches_rule(msg, rule):
                        continue
                    amount = extract_amount(msg, rule)
                    stats["by_rule"][rule.id]["matched"] += 1
                    if amount is None:
                        stats["by_rule"][rule.id]["no_amount"] += 1
                        continue
                    stats["by_rule"][rule.id]["amount_extracted"] += 1
                    txs.append(
                        Transaction(
                            date=msg.date_iso,
                            merchant=msg.sender.split("<")[0].strip() or rule.name,
                            category=rule.category,
                            amount=amount,
                            note=msg.subject[:80],
                            message_id=mid,
                            sender_rule_id=rule.id,
                        )
                    )
                    break  # one fallback match per message is enough

    stats["total_transactions"] = len(txs)
    return txs, stats
