import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from 'react-router-dom'

const FILTERS = ["All Users", "Properties", "Investment"];

const RAW_DATA = [
  { id: 1, name: "George A. James", date: "10th September, 2025", email: "george@example.com", value: "₦45,000,000", type: "Investment" },
  { id: 2, name: "George A. James", date: "10th September, 2025", email: "george@example.com", value: "₦45,000,000", type: "Properties" },
  { id: 3, name: "George A. James", date: "10th September, 2025", email: "george@example.com", value: "₦45,000,000", type: "Investment" },
  { id: 4, name: "George A. James", date: "10th September, 2025", email: "george@example.com", value: "₦45,000,000", type: "Investment" },
  { id: 5, name: "George A. James", date: "10th September, 2025", email: "george@example.com", value: "₦45,000,000", type: "Properties" },
  { id: 6, name: "George A. James", date: "10th September, 2025", email: "george@example.com", value: "₦45,000,000", type: "Investment" },
  { id: 7, name: "George A. James", date: "10th September, 2025", email: "george@example.com", value: "₦45,000,000", type: "Properties" },
  { id: 8, name: "George A. James", date: "10th September, 2025", email: "george@example.com", value: "₦45,000,000", type: "Properties" },
  { id: 9, name: "George A. James", date: "10th September, 2025", email: "george@example.com", value: "₦45,000,000", type: "Investment" },
];

function TypeBadge({ type }) {
  const isInvestment = type === "Investment";
  return (
    <span
      className={`inline-block rounded-md px-3 py-[3px] text-xs font-medium ${
        isInvestment ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-700"
      }`}
    >
      {type || "Unknown"}
    </span>
  );
}

function FilterDropdown({ selected, onSelect }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
 
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
      >
        {selected}
        <ChevronDown size={16} className="text-gray-500" />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+6px)] z-10 min-w-[160px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          {FILTERS.map((f) => (
            <div
              key={f}
              onClick={() => {
                onSelect(f);
                setOpen(false);
              }}
              className={`cursor-pointer px-4 py-2.5 text-sm ${
                f === selected
                  ? "bg-indigo-50 font-semibold text-indigo-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {f}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function UserTable() {
  const [filter, setFilter] = useState("All Users");
  const navigate = useNavigate()

const handleViewDetails = (id) => {
  navigate(`/users/${id}`);
};

  const rows =
    filter === "All Users"
      ? RAW_DATA
      : RAW_DATA.filter((r) => r?.type === filter);

  const columns = [
    "User Name",
    "Date Joined",
    "Email address",
    "Investment Value",
    "Type",
    "Action",
  ];

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-5">
        <h2 className="text-base font-bold text-indigo-700">{filter}</h2>
        <FilterDropdown selected={filter} onSelect={setFilter} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="whitespace-nowrap border-b border-gray-100 px-3 pb-3.5 text-left text-[13px] font-semibold text-gray-500"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row?.id || index}>
                <td className="whitespace-nowrap border-b border-gray-50 px-3 py-4 text-sm font-medium text-gray-900">
                  {row?.name || "N/A"}
                </td>
                <td className="whitespace-nowrap border-b border-gray-50 px-3 py-4 text-sm text-gray-500">
                  {row?.date || "N/A"}
                </td>
                <td className="whitespace-nowrap border-b border-gray-50 px-3 py-4 text-sm text-indigo-600">
                  {row?.email || "N/A"}
                </td>
                <td className="whitespace-nowrap border-b border-gray-50 px-3 py-4 text-sm font-medium text-indigo-600">
                  {row?.value || "₦0"}
                </td>
                <td className="whitespace-nowrap border-b border-gray-50 px-3 py-4">
                  <TypeBadge type={row?.type} />
                </td>
                <td className="whitespace-nowrap border-b border-gray-50 px-3 py-4">
                  <span className="cursor-pointer font-semibold text-indigo-700 hover:underline"
                 onClick={() => handleViewDetails(row.id)}
                  >
                    View user
                  </span>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-10 text-center text-gray-400">
                  No users found for "{filter}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}