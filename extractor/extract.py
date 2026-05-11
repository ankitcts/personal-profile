#!/usr/bin/env python3
"""CLI: extract spending from Gmail into data/data.js (+ CSV + log).

Usage:
    python -m extractor.extract --since 2021-11-01 --until 2026-05-11

See extractor/README.md for the full setup.
"""

from __future__ import annotations

import argparse
import sys
from datetime import date
from pathlib import Path

from .engine import load_senders, run
from .output import DEFAULT_PALETTE, write_csv, write_data_js, write_extraction_log

REPO_ROOT = Path(__file__).resolve().parent.parent
DEFAULT_CONFIG = REPO_ROOT / "extractor" / "config.yaml"
EXAMPLE_CONFIG = REPO_ROOT / "extractor" / "config.example.yaml"
DEFAULT_SENDERS = REPO_ROOT / "extractor" / "senders.json"
DEFAULT_CREDENTIALS = REPO_ROOT / "extractor" / "credentials.json"
DEFAULT_TOKEN = REPO_ROOT / "extractor" / "token.json"
DEFAULT_OUTPUT_JS = REPO_ROOT / "data" / "data.js"
DEFAULT_OUTPUT_CSV = REPO_ROOT / "data" / "transactions.csv"
DEFAULT_OUTPUT_LOG = REPO_ROOT / "extractor" / "extraction-log.json"


def _load_config(path: Path) -> dict:
    import yaml  # lazy so --help works without PyYAML installed

    if not path.exists():
        if EXAMPLE_CONFIG.exists():
            print(
                f"[warn] {path} not found — using example values. "
                f"Copy {EXAMPLE_CONFIG.name} to config.yaml to customize.",
                file=sys.stderr,
            )
            return yaml.safe_load(EXAMPLE_CONFIG.read_text()) or {}
        return {}
    return yaml.safe_load(path.read_text()) or {}


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Extract spending transactions from Gmail receipts.")
    p.add_argument("--since", help="Start date YYYY-MM-DD (default: from config.yaml)")
    p.add_argument("--until", help="End date YYYY-MM-DD (default: today)")
    p.add_argument("--config", type=Path, default=DEFAULT_CONFIG, help="Path to config.yaml")
    p.add_argument("--senders", type=Path, default=DEFAULT_SENDERS, help="Path to senders.json")
    p.add_argument("--credentials", type=Path, default=DEFAULT_CREDENTIALS, help="OAuth client secret JSON")
    p.add_argument("--token", type=Path, default=DEFAULT_TOKEN, help="Where to cache the OAuth token")
    p.add_argument("--output-js", type=Path, default=DEFAULT_OUTPUT_JS, help="Path for data.js")
    p.add_argument("--output-csv", type=Path, default=DEFAULT_OUTPUT_CSV, help="Path for transactions.csv")
    p.add_argument("--output-log", type=Path, default=DEFAULT_OUTPUT_LOG, help="Path for extraction-log.json")
    p.add_argument("--dry-run", action="store_true", help="Validate config and print plan, no Gmail calls")
    return p.parse_args()


def main() -> int:
    args = parse_args()

    # For dry-run, validate without loading YAML (so it works on a barebones install).
    if args.dry_run:
        cfg = {}
        if args.config.exists():
            try:
                cfg = _load_config(args.config)
            except ImportError:
                print("[warn] PyYAML not installed; skipping config load for --dry-run", file=sys.stderr)
    else:
        cfg = _load_config(args.config)

    since = args.since or cfg.get("since")
    until = args.until or cfg.get("until") or date.today().isoformat()
    title = cfg.get("title", "Spending Dashboard")
    subtitle = cfg.get("subtitle", "Derived from Gmail receipts · Click a category to drill down")
    currency = cfg.get("currency", "USD")
    palette = {**DEFAULT_PALETTE, **(cfg.get("category_colors") or {})}
    window_label = cfg.get("window_label") or (
        f"{since} – {until}" if since else f"through {until}"
    )

    if not args.senders.exists():
        print(f"[error] senders catalog not found: {args.senders}", file=sys.stderr)
        return 2

    rules = load_senders(args.senders)
    print(f"Loaded {len(rules)} sender rules from {args.senders.name}.")

    if args.dry_run:
        print("[dry-run] would query Gmail with the rules above for "
              f"{since or '(no start)'} → {until}. Exiting without API calls.")
        return 0

    print("Authenticating with Gmail (OAuth)...")
    service = build_service(args.credentials, args.token)

    def progress(msg: str) -> None:
        print(msg, file=sys.stderr)

    print(f"Extracting transactions {since or '(no start)'} → {until} ...")
    txs, stats = run(service, rules, since=since, until=until, on_progress=progress)

    args.output_js.parent.mkdir(parents=True, exist_ok=True)
    write_data_js(
        args.output_js,
        txs,
        title=title,
        subtitle=subtitle,
        window_label=window_label,
        currency=currency,
        palette=palette,
    )
    write_csv(args.output_csv, txs)
    write_extraction_log(args.output_log, stats)

    print(f"\nDone. {stats['total_transactions']} transactions written to {args.output_js.relative_to(REPO_ROOT)}.")
    print(f"      Scanned {stats['total_messages_scanned']} messages "
          f"({stats['duplicate_messages_skipped']} dupes skipped).")
    print(f"      Audit log: {args.output_log.relative_to(REPO_ROOT)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
