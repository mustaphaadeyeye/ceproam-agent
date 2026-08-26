import { Eye } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function RecentProperties() {
  const navigate = useNavigate();
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["agent-recent-properties"],
    queryFn: async () => {
      const res = await api.get("/analytics/recent-properties");
      return res?.data ?? res;
    },
  });

  const getStatusStyle = (status) => {
    switch ((status || "").toUpperCase()) {
      case "AVAILABLE":
      case "ACTIVE":
        return "bg-green-100 text-green-600";
      case "PENDING":
        return "bg-yellow-100 text-yellow-600";
      case "SOLD":
        return "bg-red-100 text-red-500";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-semibold text-[#1F2A5A]">
          Recent Properties
        </h3>

        <button
          onClick={() => navigate("/app/properties")}
          className="text-xs text-red-500 cursor-pointer hover:underline"
        >
          View All
        </button>
      </div>

      {isLoading ? (
        <div className="py-12 text-center text-xs text-gray-400 animate-pulse">
          Loading recent properties...
        </div>
      ) : properties.length === 0 ? (
        <div className="py-12 text-center text-xs text-gray-400">
          No properties found.
        </div>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs text-gray-400 border-b border-gray-200">
              <th className="pb-3">Property</th>
              <th>Location</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {properties.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 last:border-none"
              >
                <td className="py-4">
                  <div className="flex gap-3 items-center">
                    <img
                      src={
                        item.coverImage ||
                        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=100"
                      }
                      alt={item.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />

                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {item.title}
                      </p>

                      <p className="text-xs text-gray-400">
                        {item.subDescription}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="text-sm text-gray-500">{item.location}</td>

                <td className="text-sm font-medium text-gray-900">
                  ₦{Number(item.price || 0).toLocaleString()}
                </td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                      item.status,
                    )}`}
                  >
                    {item.status
                      ? item.status.charAt(0) +
                        item.status.slice(1).toLowerCase()
                      : "Available"}
                  </span>
                </td>

                <td>
                  <button
                    onClick={() =>
                      navigate(`/app/available-property?id=${item.id}`)
                    }
                    className="p-1 hover:bg-gray-100 rounded text-red-500 cursor-pointer transition"
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
