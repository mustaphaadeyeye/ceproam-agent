import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

const COLORS = [
  "#EF4444", // Residential
  "#1E3A8A", // Commercial
  "#6B7280", // Industrial
  "#D1D5DB", // Land
];

export default function PropertyChart() {
  const { data: distributionData = [], isLoading } = useQuery({
    queryKey: ["property-distribution"],
    queryFn: async () => {
      const res = await api.get("/analytics/property-distribution");
      return res?.data ?? res;
    },
  });

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm h-[360px] relative">
      <h2 className="text-sm font-semibold text-[#1E1B4B] mb-8">
        Property Types Distribution
      </h2>

      {isLoading ? (
        <div className="h-[260px] w-full flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="flex items-center justify-center gap-8 h-[260px]">
          <ResponsiveContainer width={220} height={220}>
            <PieChart>
              <Pie
                data={distributionData}
                innerRadius={55}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {distributionData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className="space-y-3">
            {distributionData.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between gap-6"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{
                      background: COLORS[index % COLORS.length],
                    }}
                  />
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="text-xs text-gray-400 font-semibold">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
