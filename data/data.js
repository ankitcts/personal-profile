// Spending Dashboard — your data goes here.
//
// Edit this file with your own transactions, categories, and config.
// The dashboard reads from window.DASHBOARD_CONFIG, window.CATEGORIES,
// and window.TRANSACTIONS at load time. See README.md for schema details.

window.DASHBOARD_CONFIG = {
  title: "Spending Dashboard",
  subtitle: "Derived from Gmail receipts · Click a category to drill down",
  windowLabel: "Feb 11 – May 11, 2026",
  currency: "USD",
  // months is optional. If omitted, it's derived from the transaction dates.
  // Format: ["YYYY-MM", ...] in chronological order.
  // months: ["2026-02", "2026-03", "2026-04", "2026-05"],
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
  // May 2026
  { date: "2026-05-10", merchant: "Beavers Bend State Park (8 reservations)", category: "Recreation", amount: 80.00, note: "8 × $10/reservation (Use Fee $9.42 + County Tax $0.16 + State Tax $0.42)" },
  { date: "2026-05-08", merchant: "OneGold (buy order 6982016)", category: "Investments", amount: 46.67 },
  { date: "2026-05-08", merchant: "OneGold (buy order 6982022)", category: "Investments", amount: 48.38 },
  { date: "2026-05-08", merchant: "OneGold (buy order 6982019)", category: "Investments", amount: 49.68 },
  { date: "2026-05-06", merchant: "Apple iCloud+ 200GB", category: "Subscriptions", amount: 2.99 },
  { date: "2026-05-06", merchant: "Anthropic – Max plan 20x", category: "Subscriptions", amount: 192.91 },
  { date: "2026-05-06", merchant: "Netlify (1000 credits)", category: "Subscriptions", amount: 9.59 },
  { date: "2026-05-05", merchant: "BSW Health pre-payment", category: "Healthcare", amount: 29.84 },
  { date: "2026-05-03", merchant: "Pearson VUE – GH-300 GitHub Copilot exam", category: "Education", amount: 99.00, note: "Invoice 0079-6168-2664, paid via Amex" },
  { date: "2026-05-01", merchant: "UWM mortgage (autopay)", category: "Mortgage", amount: 3920.58, note: "loan #...9563, confirmed in payment-applied email" },

  // April 2026
  { date: "2026-04-30", merchant: "CVS Pharmacy online order", category: "Personal Care", amount: 0, note: "amount not in snippet" },
  { date: "2026-04-29", merchant: "Anthropic – one-time credit", category: "Subscriptions", amount: 5.33 },
  { date: "2026-04-25", merchant: "Namecheap (domain)", category: "Subscriptions", amount: 11.48 },
  { date: "2026-04-25", merchant: "British Swim School (kids)", category: "Family", amount: 0, note: "registration, fee not in snippet" },
  { date: "2026-04-22", merchant: "BSW Surgicare – DFW Baylor", category: "Healthcare", amount: 568.00, note: "balance remaining: $1,136" },
  { date: "2026-04-22", merchant: "DFW Airport NTTA Parking", category: "Travel", amount: 0, note: "amount not in snippet" },
  { date: "2026-04-20", merchant: "Agoda – Bhiwadi hotel", category: "Travel", amount: 0, note: "refunded — unacceptable condition" },
  { date: "2026-04-14", merchant: "Audi Financial – auto loan", category: "Auto", amount: 0, note: "monthly payment, amount not in snippet" },
  { date: "2026-04-14", merchant: "Namecheap (domain)", category: "Subscriptions", amount: 0, note: "order #199796615, amount not in snippet" },
  { date: "2026-04-12", merchant: "Amazon refund (Kristin Paradise)", category: "Refunds", amount: -8.54 },
  { date: "2026-04-09", merchant: "TXU Electric – bill payment", category: "Utilities", amount: 0, note: "amount not in snippet" },
  { date: "2026-04-08", merchant: "Anthropic – one-time credit", category: "Subscriptions", amount: 5.33 },
  { date: "2026-04-07", merchant: "BSW Health pre-payment", category: "Healthcare", amount: 149.19 },
  { date: "2026-04-01", merchant: "UWM mortgage (autopay)", category: "Mortgage", amount: 3920.58, note: "loan #...9563, inferred from autopay; Document Center notice on 04/02" },

  // March 2026
  { date: "2026-03-29", merchant: "ShreeVimals (Square POS)", category: "Dining", amount: 5.41 },
  { date: "2026-03-26", merchant: "TJ Maxx & HomeGoods – Las Colinas", category: "Shopping", amount: 0, note: "e-receipt, amount not in snippet" },
  { date: "2026-03-26", merchant: "TXU Electric – bill ready", category: "Utilities", amount: 0, note: "statement, paid later" },
  { date: "2026-03-25", merchant: "Amazon (Easter Gifts + 1 item)", category: "Shopping", amount: 0, note: "amount not in snippet" },
  { date: "2026-03-01", merchant: "UWM mortgage (autopay)", category: "Mortgage", amount: 3920.58, note: "loan #...9563, confirmed in autopay processing email" },
];
