import React, { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

export default function RevenueChart() {
  const [timeframe, setTimeframe] = useState("12months");

  const { data: chartData = [], isLoading } = useQuery({
    queryKey: ["revenue-overview", timeframe],
    queryFn: async () => {
      const res = await api.get(
        `/analytics/revenue-overview?timeframe=${timeframe}`,
      );
      return res?.data ?? res;
    },
  });

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm h-[360px] relative">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-sm font-semibold text-[#1E1B4B]">
          Revenue Overview
        </h2>

        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="border border-[#D1D5DB] rounded-md text-xs px-3 py-2 outline-none bg-white cursor-pointer"
        >
          <option value="12months">Last 12 months</option>
          <option value="6months">Last 6 months</option>
        </select>
      </div>

      {isLoading ? (
        <div className="h-[260px] w-full flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="85%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EF4444" stopOpacity={0.45} />
                <stop offset="100%" stopColor="#EF4444" stopOpacity={0.03} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#F1F5F9" vertical={false} />

            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
            />

            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />

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
      )}
    </div>
  );
}
