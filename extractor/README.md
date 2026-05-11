# Spending Extractor

A Python tool that reads receipts from your Gmail inbox and writes them into `data/data.js` for the dashboard. Merchants live in **`senders.json`** — adding or modifying a merchant is a JSON edit, not a code change.

## How it works

```
   senders.json (catalog)         Gmail API           data/data.js
   ──────────────────             ─────────           ─────────────
   per-merchant:                  search for     →    transactions
     - from domains/addresses     each rule's          (date, merchant,
     - subject filters            messages              category, amount)
     - amount regex(es)
     - category
                                  apply regex    →    extraction-log.json
                                  to body              (audit / debug)
```

## Setup

### 1. Install Python deps

```sh
cd extractor
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
```

### 2. Create a Gmail API OAuth client

The script needs read-only access to your Gmail. You create the OAuth credentials once, in your own Google Cloud project — nothing is sent anywhere except google.com.

1. Open https://console.cloud.google.com/ and create a new project (e.g., `spending-extractor`).
2. In **APIs & Services → Library**, enable **Gmail API**.
3. In **APIs & Services → OAuth consent screen**, configure:
   - User type: **External**
   - App name: anything (e.g., `Spending Extractor`)
   - Add **your Google account** as a Test user.
   - Scope: add `https://www.googleapis.com/auth/gmail.readonly`.
4. In **APIs & Services → Credentials → Create credentials → OAuth client ID**:
   - Application type: **Desktop app**.
   - Download the JSON and save it to **`extractor/credentials.json`** (gitignored).

### 3. Configure run options (optional)

```sh
cp extractor/config.example.yaml extractor/config.yaml
# edit since / until / title / currency
```

### 4. Run

```sh
python -m extractor.extract --since 2021-11-01
```

First run pops a browser for OAuth consent. The token is cached in `extractor/token.json` for next time. Output:

- `data/data.js` — the dashboard data file
- `data/transactions.csv` — same data as CSV for spreadsheets
- `extractor/extraction-log.json` — per-rule stats (matched, amount-extracted, no-amount)

Refresh `spending-dashboard.html` and the new data shows up.

## Adding a merchant — edit `senders.json`

Each sender entry has this shape:

```jsonc
{
  "id": "amazon-order",                      // unique slug, free-form
  "name": "Amazon",                          // shown as the merchant label
  "category": "Shopping",                    // any category name
  "match": {
    "from_domains":   ["amazon.com"],        // matched against the From: domain
    "from_addresses": [],                    // exact local-part@domain, optional
    "subject_includes": ["Ordered:"]         // case-insensitive substring(s)
  },
  "amount_patterns": [
    { "regex": "Order Total:\\s*\\$([0-9,]+\\.[0-9]{2})", "source": "plain" },
    { "regex": "Grand Total:\\s*\\$([0-9,]+\\.[0-9]{2})", "source": "html"  }
  ],
  "amount_sign": "positive"                  // "negative" for refund senders
}
```

Field reference:

| Field                       | Required | Notes                                                                                           |
| --------------------------- | -------- | ----------------------------------------------------------------------------------------------- |
| `id`                        | yes      | Stable identifier used in logs and audit                                                         |
| `name`                      | yes      | Merchant name on the transaction                                                                |
| `category`                  | yes      | Any string. Color it via `category_colors` in `config.yaml`.                                    |
| `match.from_domains`        | one of   | Substrings matched against `From:` domain                                                       |
| `match.from_addresses`      | one of   | Substrings matched against the full `From:` header                                              |
| `match.subject_includes`    | optional | Case-insensitive substrings; ANY match qualifies                                                 |
| `amount_patterns[].regex`   | yes      | Python regex, capture-group 1 = amount (digits and dot, optional commas)                        |
| `amount_patterns[].source`  | yes      | `plain` (text body), `html` (rendered text from HTML body), `snippet`, `subject`                |
| `amount_sign`               | optional | `positive` (default) or `negative` (refunds)                                                    |
| `is_fallback`               | optional | If `true`, this rule isn't queried directly; it matches against messages returned by the fallback subject sweep. Use for generic "Other receipt" buckets. |

### Tips for writing the regex

- Use `[0-9,]+\\.[0-9]{2}` for currency-formatted amounts.
- The engine compiles with `re.IGNORECASE | re.MULTILINE`.
- The `html` source is the rendered visible text from BeautifulSoup — tags are stripped, whitespace collapsed.
- Start permissive, then refine. The `extraction-log.json` tells you how often each rule matched and how often the amount failed to parse — use that to iterate.

## Project layout

```
extractor/
├── README.md                ← this file
├── requirements.txt
├── config.example.yaml      ← copy → config.yaml to customize a run
├── senders.json             ← merchant catalog (edit me!)
├── extract.py               ← CLI entry point
├── engine.py                ← reads senders.json, queries Gmail, extracts
├── gmail_client.py          ← OAuth flow + thin Gmail API helpers
└── output.py                ← writes data.js, CSV, extraction-log.json
```

## Privacy & safety

- The OAuth scope is `gmail.readonly` — the script cannot modify or send mail.
- `credentials.json` and `token.json` are gitignored. Treat them like passwords.
- All processing happens on your machine. Nothing is uploaded.
- To revoke access at any time: https://myaccount.google.com/permissions

## Troubleshooting

| Symptom                                     | Fix                                                                                                  |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `FileNotFoundError: credentials.json`        | You skipped step 2 above. Place the OAuth client JSON at `extractor/credentials.json`.               |
| `access blocked: this app's request is invalid` | Add your account as a Test user in the OAuth consent screen.                                       |
| Amount comes through as `0.0`               | Open the email, copy a line containing the amount, write a regex for it, add to `amount_patterns`. Re-run. |
| Too many duplicate-skipped messages         | Normal — overlapping queries dedupe by message ID.                                                   |
| Rate-limit errors from Gmail                | Re-run; the OAuth token is cached so it resumes quickly. Heavy users may want to add `time.sleep` between fetches in `gmail_client.fetch_messages`. |
