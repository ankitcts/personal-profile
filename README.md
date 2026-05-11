# Spending Dashboard

A single-file, dependency-free HTML dashboard for visualizing personal spending. Drop in your own transactions, open the page, get monthly totals, a category breakdown with click-to-drill-down, and a monthly trend chart.

**Live demo:** https://ankitcts.github.io/personal-profile/spending-dashboard.html

## Quick start

1. Clone the repo and open it:
   ```sh
   git clone https://github.com/ankitcts/personal-profile.git
   cd personal-profile
   ```

2. Copy the sample data file and edit with your own transactions:
   ```sh
   cp data/data.example.js data/data.js
   ```

3. Serve the folder (a local HTTP server is required because the dashboard loads `data/data.js` as a script):
   ```sh
   python3 -m http.server 8000
   ```
   Then open <http://localhost:8000/spending-dashboard.html>.

That's it — no build step, no npm install.

## Configuration

All configuration lives in `data/data.js`, which exposes three globals.

### 1. `window.DASHBOARD_CONFIG`

```js
window.DASHBOARD_CONFIG = {
  title:       "My Spending Dashboard",   // page heading
  subtitle:    "Click a category to drill down",
  windowLabel: "Last 3 months",            // shown next to subtitle
  currency:    "USD",                      // any ISO 4217 code
  // months:   ["2026-01", "2026-02"],     // optional; auto-derived from data
};
```

### 2. `window.CATEGORIES`

Map of category name → hex color. Categories not listed here still render — they just get a default blue.

```js
window.CATEGORIES = {
  "Housing":       "#10b981",
  "Food":          "#f59e0b",
  "Transport":     "#fb923c",
};
```

### 3. `window.TRANSACTIONS`

Array of transactions. Required fields: `date`, `merchant`, `category`, `amount`. Optional: `note`.

```js
window.TRANSACTIONS = [
  { date: "2026-03-01", merchant: "Rent",          category: "Housing", amount: 1500.00 },
  { date: "2026-03-05", merchant: "Grocery store", category: "Food",    amount: 87.43 },
  { date: "2026-03-15", merchant: "Amazon refund", category: "Other",   amount: -12.99, note: "returned item" },
];
```

| Field      | Type            | Notes                                                             |
| ---------- | --------------- | ----------------------------------------------------------------- |
| `date`     | string          | `YYYY-MM-DD`                                                      |
| `merchant` | string          | Free text                                                         |
| `category` | string          | Must match a key in `CATEGORIES` for custom color                 |
| `amount`   | number          | Positive for spend; negative for refunds. Use `0` to keep a row visible in the table without affecting totals (handy when you have an order but don't know the price). |
| `note`     | string \| omit  | Shown as a pill under the merchant name                           |

## Features

- **Monthly filter chips** — auto-generated from your data, or override via `DASHBOARD_CONFIG.months`.
- **KPI cards** — total spend, transaction count, top category, avg per transaction.
- **Category doughnut** — click a slice to filter the transactions table to that category.
- **Monthly trend bar chart** — updates to show only the drilled-in category when filtering.
- **Currency-aware** — uses `Intl.NumberFormat` based on `CURRENCY`.

## Deploying to GitHub Pages

1. Push to GitHub on your default branch.
2. Settings → Pages → Source: **Deploy from a branch** → Branch: `main` / `(root)` → Save.
3. Live in ~1 minute at `https://<user>.github.io/<repo>/spending-dashboard.html`.

GitHub Pages is free for **public** repos on personal accounts.

## File layout

```
spending-dashboard.html   ← single-page app (Chart.js via CDN)
data/
  data.js                 ← your data + config (gitignore this if private)
  data.example.js         ← template / placeholder
README.md
```

## License

MIT — see `LICENSE`.
