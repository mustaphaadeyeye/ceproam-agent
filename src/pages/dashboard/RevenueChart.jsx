import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", revenue: 125 },
  { month: "Feb", revenue: 140 },
  { month: "Mar", revenue: 150 },
  { month: "Apr", revenue: 165 },
  { month: "May", revenue: 160 },
  { month: "Jun", revenue: 175 },
  { month: "Jul", revenue: 185 },
  { month: "Aug", revenue: 180 },
  { month: "Sep", revenue: 190 },
  { month: "Oct", revenue: 205 },
  { month: "Nov", revenue: 195 },
  { month: "Dec", revenue: 215 },
];

export default function RevenueChart() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm h-[360px]">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-sm font-semibold text-[#1E1B4B]">
          Revenue Overview
        </h2>

        <select className="border border-[#D1D5DB] rounded-md text-xs px-3 py-2 outline-none">
          <option>Last 12 months</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EF4444" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#EF4444" stopOpacity={0.03} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="#F1F5F9" vertical={false} />

          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
          />

          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
          />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#EF4444"
            strokeWidth={2}
            fill="url(#fillRevenue)"
            dot={{
              r: 3,
              fill: "#EF4444",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}