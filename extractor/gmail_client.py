"""Gmail API client with OAuth desktop flow + helpers for receipt extraction."""

from __future__ import annotations

import base64
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable, Iterator

SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"]


def _import_google():
    """Lazy-import google-auth deps so --help / --dry-run work without them installed."""
    from google.auth.transport.requests import Request
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow
    from googleapiclient.discovery import build
    from googleapiclient.errors import HttpError

    return Request, Credentials, InstalledAppFlow, build, HttpError


@dataclass
class Message:
    """Minimal projection of a Gmail message we care about for receipts."""

    id: str
    thread_id: str
    sender: str
    subject: str
    date_iso: str  # YYYY-MM-DD
    snippet: str
    plain_body: str
    html_body: str

    @property
    def sender_domain(self) -> str:
        if "@" not in self.sender:
            return ""
        return self.sender.rsplit("@", 1)[-1].rstrip(">").lower()


def build_service(credentials_path: Path, token_path: Path):
    """Return an authenticated Gmail API service object.

    Triggers the desktop OAuth flow on first run, then caches the token.
    """
    Request, Credentials, InstalledAppFlow, build, _ = _import_google()

    creds = None
    if token_path.exists():
        creds = Credentials.from_authorized_user_file(str(token_path), SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not credentials_path.exists():
                raise FileNotFoundError(
                    f"OAuth client secret not found at {credentials_path}. "
                    "Create a Google Cloud project, enable the Gmail API, "
                    "create an OAuth client of type Desktop, and save the JSON here. "
                    "See extractor/README.md."
                )
            flow = InstalledAppFlow.from_client_secrets_file(str(credentials_path), SCOPES)
            creds = flow.run_local_server(port=0)
        token_path.write_text(creds.to_json())

    return build("gmail", "v1", credentials=creds, cache_discovery=False)


def search_message_ids(service, query: str, page_size: int = 100) -> Iterator[str]:
    """Yield message IDs matching `query`, paging until exhausted."""
    _, _, _, _, HttpError = _import_google()
    page_token: str | None = None
    while True:
        try:
            resp = (
                service.users()
                .messages()
                .list(userId="me", q=query, maxResults=page_size, pageToken=page_token)
                .execute()
            )
        except HttpError as e:
            raise RuntimeError(f"Gmail search failed for q={query!r}: {e}") from e
        for m in resp.get("messages", []):
            yield m["id"]
        page_token = resp.get("nextPageToken")
        if not page_token:
            return


def _header(headers: list[dict], name: str) -> str:
    for h in headers:
        if h.get("name", "").lower() == name.lower():
            return h.get("value", "")
    return ""


def _walk_parts(payload: dict) -> Iterator[dict]:
    """Yield every part in a (possibly nested) MIME payload, including the root."""
    yield payload
    for part in payload.get("parts", []) or []:
        yield from _walk_parts(part)


def _decode_body(data_b64url: str) -> str:
    if not data_b64url:
        return ""
    try:
        return base64.urlsafe_b64decode(data_b64url + "==").decode("utf-8", errors="replace")
    except Exception:
        return ""


def fetch_message(service, message_id: str) -> Message:
    """Fetch a full message, projecting it into our `Message` dataclass."""
    _, _, _, _, HttpError = _import_google()
    try:
        raw = (
            service.users()
            .messages()
            .get(userId="me", id=message_id, format="full")
            .execute()
        )
    except HttpError as e:
        raise RuntimeError(f"Failed to fetch message {message_id}: {e}") from e

    payload = raw.get("payload", {}) or {}
    headers = payload.get("headers", []) or []
    sender = _header(headers, "From")
    subject = _header(headers, "Subject")

    # internalDate is ms since epoch
    internal_ms = int(raw.get("internalDate", "0") or 0)
    date_iso = ""
    if internal_ms:
        from datetime import datetime, timezone

        date_iso = datetime.fromtimestamp(internal_ms / 1000, tz=timezone.utc).strftime("%Y-%m-%d")

    plain_parts: list[str] = []
    html_parts: list[str] = []
    for part in _walk_parts(payload):
        mime = (part.get("mimeType") or "").lower()
        body = part.get("body") or {}
        data = body.get("data")
        if not data:
            continue
        decoded = _decode_body(data)
        if mime == "text/plain":
            plain_parts.append(decoded)
        elif mime == "text/html":
            html_parts.append(decoded)

    return Message(
        id=raw["id"],
        thread_id=raw.get("threadId", raw["id"]),
        sender=sender,
        subject=subject,
        date_iso=date_iso,
        snippet=raw.get("snippet", "") or "",
        plain_body="\n".join(plain_parts),
        html_body="\n".join(html_parts),
    )


def fetch_messages(service, message_ids: Iterable[str]) -> Iterator[Message]:
    """Fetch many messages, yielding each. Caller decides on rate-limit pauses."""
    for mid in message_ids:
        yield fetch_message(service, mid)
