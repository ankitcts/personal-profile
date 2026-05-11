// Spending Dashboard — your data goes here.
//
// Edit this file with your own transactions, categories, and config.
// The dashboard reads from window.DASHBOARD_CONFIG, window.CATEGORIES,
// and window.TRANSACTIONS at load time. See README.md for schema details.

window.DASHBOARD_CONFIG = {
  title: "Spending Dashboard",
  subtitle: "Derived from Gmail receipts · Click a category to drill down",
  windowLabel: "Aug 2024 – May 2026",
  currency: "USD",
  // months is optional. If omitted, it's derived from the transaction dates.
};

window.CATEGORIES = {
  "Mortgage":      "#10b981",
  "Healthcare":    "#f87171",
  "Subscriptions": "#6ea8fe",
  "Investments":   "#facc15",
  "Travel":        "#a78bfa",
  "Auto":          "#fb923c",
  "Utilities":     "#34d399",
  "Shopping":      "#f472b6",
  "Personal Care": "#22d3ee",
  "Family":        "#fbbf24",
  "Recreation":    "#4ade80",
  "Education":     "#818cf8",
  "Dining":        "#fde68a",
  "Refunds":       "#9ca3af",
};

window.TRANSACTIONS = [
  // ───── 2026 (already in dashboard) ─────
  { date: "2026-05-10", merchant: "Beavers Bend State Park (8 reservations)", category: "Recreation", amount: 80.00, note: "8 × $10/reservation" },
  { date: "2026-05-08", merchant: "OneGold (buy order 6982016)", category: "Investments", amount: 46.67 },
  { date: "2026-05-08", merchant: "OneGold (buy order 6982022)", category: "Investments", amount: 48.38 },
  { date: "2026-05-08", merchant: "OneGold (buy order 6982019)", category: "Investments", amount: 49.68 },
  { date: "2026-05-06", merchant: "Apple iCloud+ 200GB", category: "Subscriptions", amount: 2.99 },
  { date: "2026-05-06", merchant: "Anthropic – Max plan 20x", category: "Subscriptions", amount: 192.91 },
  { date: "2026-05-06", merchant: "Netlify (1000 credits)", category: "Subscriptions", amount: 9.59 },
  { date: "2026-05-05", merchant: "BSW Health pre-payment", category: "Healthcare", amount: 29.84 },
  { date: "2026-05-03", merchant: "Pearson VUE – GH-300 GitHub Copilot exam", category: "Education", amount: 99.00 },
  { date: "2026-05-01", merchant: "UWM mortgage (autopay)", category: "Mortgage", amount: 3920.58, note: "loan #...9563" },
  { date: "2026-04-29", merchant: "Anthropic – one-time credit", category: "Subscriptions", amount: 5.33 },
  { date: "2026-04-25", merchant: "Namecheap (domain)", category: "Subscriptions", amount: 11.48 },
  { date: "2026-04-22", merchant: "BSW Surgicare – DFW Baylor", category: "Healthcare", amount: 568.00, note: "balance remaining: $1,136" },
  { date: "2026-04-12", merchant: "Amazon refund (Kristin Paradise)", category: "Refunds", amount: -8.54 },
  { date: "2026-04-08", merchant: "Anthropic – one-time credit", category: "Subscriptions", amount: 5.33 },
  { date: "2026-04-07", merchant: "BSW Health pre-payment", category: "Healthcare", amount: 149.19 },
  { date: "2026-04-01", merchant: "UWM mortgage (autopay)", category: "Mortgage", amount: 3920.58, note: "loan #...9563" },
  { date: "2026-03-29", merchant: "ShreeVimals (Square POS)", category: "Dining", amount: 5.41 },
  { date: "2026-03-01", merchant: "UWM mortgage (autopay)", category: "Mortgage", amount: 3920.58, note: "loan #...9563" },

  // ───── 2026 – UWM mortgage (loan #...9563) ─────
  { date: "2026-02-01", merchant: "UWM mortgage (autopay)", category: "Mortgage", amount: 3920.58, note: "loan #...9563 (inferred from autopay enrollment)" },
  { date: "2026-01-01", merchant: "UWM mortgage", category: "Mortgage", amount: 3920.58, note: "loan #...9563 (per Dec statement: Next Payment $3920.58 Due 01/01/26)" },

  // ───── 2025 – UWM mortgage (Dec only; refi from Chase Oct 15) ─────
  { date: "2025-12-31", merchant: "UWM mortgage (one-time payment)", category: "Mortgage", amount: 3920.58, note: "Conf# 1767190819709" },
  { date: "2025-11-27", merchant: "UWM mortgage (one-time payment)", category: "Mortgage", amount: 3920.58, note: "Conf# 1764273597409 — first UWM payment after refi" },

  // ───── 2025 – Chase mortgage (loan #...3049) ─────
  { date: "2025-10-01", merchant: "Chase Home Lending (mortgage)", category: "Mortgage", amount: 4469.75, note: "loan #...3049, last Chase payment before payoff 10/15" },
  { date: "2025-09-30", merchant: "Chase Home Lending (mortgage)", category: "Mortgage", amount: 4469.75, note: "loan #...3049" },
  { date: "2025-08-29", merchant: "Chase Home Lending (mortgage)", category: "Mortgage", amount: 4469.75, note: "loan #...3049 (escrow adj down)" },
  { date: "2025-07-31", merchant: "Chase Home Lending (mortgage)", category: "Mortgage", amount: 4469.75, note: "loan #...3049, applied 8/1" },
  { date: "2025-07-15", merchant: "Chase Home Lending (mortgage – partial)", category: "Mortgage", amount: 1919.27, note: "loan #...3049 (mid-month partial)" },
  { date: "2025-06-30", merchant: "Chase Home Lending (mortgage)", category: "Mortgage", amount: 4709.66, note: "loan #...3049 (escrow adj up)" },
  { date: "2025-05-30", merchant: "Chase Home Lending (mortgage)", category: "Mortgage", amount: 4709.66, note: "loan #...3049" },
  { date: "2025-04-30", merchant: "Chase Home Lending (mortgage)", category: "Mortgage", amount: 4709.66, note: "loan #...3049 (per May 1 receipt)" },
  { date: "2025-04-01", merchant: "Chase Home Lending (mortgage – principal)", category: "Mortgage", amount: 4200.00, note: "loan #...3049 — extra principal" },
  { date: "2025-04-01", merchant: "Chase Home Lending (mortgage – regular)", category: "Mortgage", amount: 509.66, note: "loan #...3049 — regular portion" },
  { date: "2025-03-03", merchant: "Chase Home Lending (mortgage)", category: "Mortgage", amount: 4418.15, note: "loan #...3049" },
  { date: "2025-01-31", merchant: "Chase Home Lending (mortgage)", category: "Mortgage", amount: 4418.15, note: "loan #...3049, applied 2/1" },
  { date: "2024-12-31", merchant: "Chase Home Lending (mortgage)", category: "Mortgage", amount: 4418.15, note: "loan #...3049, applied 1/1/25" },
  { date: "2024-11-28", merchant: "Chase Home Lending (mortgage)", category: "Mortgage", amount: 4418.15, note: "loan #...3049, applied 11/30" },
  { date: "2024-10-31", merchant: "Chase Home Lending (mortgage)", category: "Mortgage", amount: 4418.15, note: "loan #...3049, applied 11/1" },
  { date: "2024-09-30", merchant: "Chase Home Lending (mortgage)", category: "Mortgage", amount: 4418.15, note: "loan #...3049, applied 10/1" },
  { date: "2024-08-29", merchant: "Chase Home Lending (mortgage)", category: "Mortgage", amount: 4418.15, note: "loan #...3049, applied 8/31" },
  { date: "2024-07-30", merchant: "Chase Home Lending (mortgage)", category: "Mortgage", amount: 4418.15, note: "loan #...3049, applied 7/31 — first payment after closing 6/14" },
];
