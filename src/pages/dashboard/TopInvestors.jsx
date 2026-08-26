import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

export default function TopInvestors() {
  const { data: investors = [], isLoading } = useQuery({
    queryKey: ["agent-top-investors"],
    queryFn: async () => {
      const res = await api.get("/analytics/top-investors");
      return res?.data ?? res;
    },
  });

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-semibold text-[#1F2A5A]">Top Investors</h3>

        <button className="text-xs text-red-500 cursor-pointer hover:underline">
          View All
        </button>
      </div>

      {isLoading ? (
        <div className="py-12 text-center text-xs text-gray-400 animate-pulse">
          Loading top investors...
        </div>
      ) : investors.length === 0 ? (
        <div className="py-12 text-center text-xs text-gray-400">
          No investors found yet.
        </div>
      ) : (
        <div className="space-y-4">
          {investors.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-gray-50 rounded-xl p-3"
            >
              <div className="flex gap-3 items-center">
                <img
                  src={
                    item.avatar ||
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                  }
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                />

                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    {item.name}
                  </h4>

                  <p className="text-xs text-gray-400">
                    {item.formattedInvested}
                  </p>
                </div>
              </div>

              <span className="text-green-500 text-sm font-medium">
                {item.growthRate}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
