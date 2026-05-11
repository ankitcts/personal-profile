// Spending Dashboard — sample data template.
//
// Copy this file to `data/data.js` and replace with your own entries.
// All three globals (DASHBOARD_CONFIG, CATEGORIES, TRANSACTIONS) are required.

window.DASHBOARD_CONFIG = {
  title: "My Spending Dashboard",
  subtitle: "Personal expense tracker · Click a category to drill down",
  windowLabel: "Last 3 months",
  currency: "USD",
  // Optional. If omitted, months are derived from transaction dates.
  // months: ["2026-01", "2026-02", "2026-03"],
};

// Category → color (any CSS color). Categories not listed get a default color.
window.CATEGORIES = {
  "Housing":       "#10b981",
  "Food":          "#f59e0b",
  "Transport":     "#fb923c",
  "Entertainment": "#a78bfa",
  "Subscriptions": "#6ea8fe",
  "Other":         "#9ca3af",
};

// Each transaction needs: date (YYYY-MM-DD), merchant, category, amount.
// `note` is optional; refunds use negative amounts.
window.TRANSACTIONS = [
  { date: "2026-03-01", merchant: "Rent",            category: "Housing",       amount: 1500.00 },
  { date: "2026-03-05", merchant: "Grocery store",   category: "Food",          amount: 87.43 },
  { date: "2026-03-07", merchant: "Gas station",     category: "Transport",     amount: 42.10 },
  { date: "2026-03-10", merchant: "Movie theater",   category: "Entertainment", amount: 28.50 },
  { date: "2026-03-12", merchant: "Streaming",       category: "Subscriptions", amount: 15.99 },
  { date: "2026-03-15", merchant: "Amazon refund",   category: "Other",         amount: -12.99, note: "returned item" },
];
