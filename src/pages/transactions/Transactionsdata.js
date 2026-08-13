export const TRANSACTIONS = [
  {
    id: "INV-2025-09-10-001",
    sentTo: "George A. James",
    date: "10th September, 2025",
    recipient: "Debs Adeoye",
    amount: 45000000,
    status: "Completed",
    type: "Deposit",
    notes: "Initial investment",
  },
  {
    id: "INV-2025-09-10-002",
    sentTo: "George A. James",
    date: "10th September, 2025",
    recipient: "Debs Adeoye",
    amount: 45000000,
    status: "Pending",
    type: "Commission",
    notes: "Commission payout pending review",
  },
  {
    id: "INV-2025-09-10-003",
    sentTo: "George A. James",
    date: "10th September, 2025",
    recipient: "Debs Adeoye",
    amount: 45000000,
    status: "Completed",
    type: "Deposit",
    notes: "Property purchase deposit",
  },
  {
    id: "INV-2025-09-10-004",
    sentTo: "George A. James",
    date: "10th September, 2025",
    recipient: "Debs Adeoye",
    amount: 45000000,
    status: "Completed",
    type: "Deposit",
    notes: "Follow-up investment deposit",
  },
  {
    id: "INV-2025-09-10-005",
    sentTo: "George A. James",
    date: "10th September, 2025",
    recipient: "Debs Adeoye",
    amount: 45000000,
    status: "Failed",
    type: "Commission",
    notes: "Commission payment failed - insufficient funds",
  },
  {
    id: "INV-2025-09-10-006",
    sentTo: "George A. James",
    date: "10th September, 2025",
    recipient: "Debs Adeoye",
    amount: 45000000,
    status: "Pending",
    type: "Withdrawal",
    notes: "Withdrawal request awaiting approval",
  },
];

export function formatNaira(amount) {
  return "\u20A6" + amount.toLocaleString("en-NG");
}

export const STATUS_STYLES = {
  Completed: "bg-emerald-50 text-emerald-600",
  Pending: "bg-amber-50 text-amber-600",
  Failed: "bg-red-50 text-red-600",
};

export const STATUS_DOT = {
  Completed: "bg-emerald-500",
  Pending: "bg-amber-500",
  Failed: "bg-red-500",
};