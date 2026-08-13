import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Residential", value: 45 },
  { name: "Commercial", value: 28 },
  { name: "Industrial", value: 17 },
  { name: "Land", value: 10 },
];

const COLORS = [
  "#EF4444",
  "#1E3A8A",
  "#6B7280",
  "#D1D5DB",
];

export default function PropertyChart() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm h-[360px]">
      <h2 className="text-sm font-semibold text-[#1E1B4B] mb-8">
        Property Types Distribution
      </h2>

      <div className="flex items-center justify-center gap-8 h-[260px]">
        <ResponsiveContainer width={220} height={220}>
          <PieChart>
            <Pie
              data={data}
              innerRadius={55}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="space-y-3">
          {data.map((item, index) => (
            <div
              key={item.name}
              className="flex items-center gap-3"
            >
              <span
                className="w-3 h-3 rounded-full"
                style={{
                  background: COLORS[index],
                }}
              />

              <span className="text-sm text-gray-600">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}