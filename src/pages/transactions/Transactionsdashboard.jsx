import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

const TABS = ["All Transactions", "Properties", "Investments", "Withdrawals"];

const STATUS_STYLES = {
  Completed: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Failed: "bg-red-100 text-red-700",
};

function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || "bg-gray-100 text-gray-600";
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${style}`}
    >
      {status}
    </span>
  );
}

function TransactionsTable({ transactions, onView }) {
  const headers = [
    "Sent to",
    "Transaction date",
    "Recipient",
    "Amount",
    "Status",
    "Type",
    "Action",
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse">
        <thead>
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="border-b border-gray-100 px-4 py-3 text-left text-sm font-medium text-gray-400"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} className="border-b border-gray-100">
              <td className="px-4 py-4 text-sm text-gray-900">{tx.sentTo}</td>
              <td className="px-4 py-4 text-sm text-gray-500">
                {tx.transactionDate}
              </td>
              <td className="px-4 py-4 text-sm font-medium text-blue-700">
                {tx.recipient}
              </td>
              <td className="px-4 py-4 text-sm font-medium text-gray-900">
                {tx.amount}
              </td>
              <td className="px-4 py-4">
                <StatusBadge status={tx.status} />
              </td>
              <td className="px-4 py-4 text-sm text-gray-500">{tx.type}</td>
              <td className="px-4 py-4">
                <button
                  onClick={() => onView(tx)}
                  className="cursor-pointer border-none bg-transparent p-0 text-sm font-medium text-blue-700 hover:text-blue-800"
                >
                  View transaction
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function TransactionsDashboard() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const navigate = useNavigate();

  // Fetch agent-scoped transaction list based on selected tab filter
  const { data: rows = [], isLoading } = useQuery({
    queryKey: ["transactions-table-list", activeTab],
    queryFn: async () => {
      const res = await api.get("/transactions/table-list", {
        params: { tab: activeTab },
      });
      return res?.data ?? res;
    },
  });

  const handleView = (tx) => {
    navigate(`/transactions/${tx.id}`);
  };

  return (
    <div className="mx-auto rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-2 flex gap-7 border-b border-gray-100">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`-mb-px cursor-pointer border-b-2 bg-transparent pb-3 text-sm transition-colors ${
              activeTab === tab
                ? "border-blue-700 font-semibold text-blue-700"
                : "border-transparent font-medium text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="py-12 text-center text-sm text-gray-400 animate-pulse">
          Loading transactions...
        </div>
      ) : rows.length === 0 ? (
        <div className="py-12 text-center text-sm text-gray-400">
          No transactions found for "{activeTab}".
        </div>
      ) : (
        <TransactionsTable transactions={rows} onView={handleView} />
      )}
    </div>
  );
}
