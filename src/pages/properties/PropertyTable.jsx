import { useState } from "react";
import { fontSize, fontWeight, textColor } from "../../styles/theme";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

export default function PropertyTable() {
  const [status, setStatus] = useState("All Status");
  const navigate = useNavigate();

  // Fetch properties from backend based on selected status filter
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["agent-properties-table", status],
    queryFn: async () => {
      const res = await api.get(
        `/properties/table-list?status=${encodeURIComponent(status)}`,
      );
      return res?.data ?? res;
    },
    keepPreviousData: true,
  });

  const handleDetails = () => {
    navigate("/app/properties-details");
  };

  const manageProperty = (id) => {
    navigate(`/app/available-property?id=${id}`);
  };

  const badgeColor = (itemStatus) => {
    switch (itemStatus) {
      case "Available":
      case "Active":
        return "bg-green-100 text-green-600";
      case "Pending":
        return "bg-yellow-100 text-yellow-600";
      case "Sold":
        return "bg-red-100 text-red-500";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mt-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h2
            className={`${textColor.primary800} ${fontWeight.normal} ${fontSize.md}`}
          >
            All Properties
          </h2>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-[#D1D5DB] rounded-md px-3 py-2 text-sm outline-none bg-white cursor-pointer"
          >
            <option value="All Status">All Status</option>
            <option value="Available">Available</option>
            <option value="Pending">Pending</option>
            <option value="Sold">Sold</option>
          </select>
        </div>

        <button
          className="bg-[#EC2614] hover:bg-red-600 text-white rounded-md px-5 py-2 text-sm font-medium cursor-pointer transition"
          onClick={handleDetails}
        >
          Add new
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="py-16 text-center text-xs text-gray-400 animate-pulse">
            Loading properties...
          </div>
        ) : properties.length === 0 ? (
          <div className="py-16 text-center text-xs text-gray-400">
            No properties found for this status.
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm border-b">
                <th className="pb-3 font-medium">Property</th>
                <th className="pb-3 font-medium">Location</th>
                <th className="pb-3 font-medium">Listed On</th>
                <th className="pb-3 font-medium">Price</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Action</th>
              </tr>
            </thead>

            <tbody>
              {properties.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-b-[#E5E7EB] last:border-none hover:bg-gray-50 transition"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          item.image ||
                          "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=100"
                        }
                        alt={item.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-sm text-[#1E3A8A]">
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-400">{item.subtitle}</p>
                      </div>
                    </div>
                  </td>

                  <td className="text-sm text-gray-600">{item.location}</td>

                  <td className="text-sm text-gray-600">{item.listedOn}</td>

                  <td className="text-sm font-medium text-[#1E3A8A]">
                    {item.price}
                  </td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${badgeColor(
                        item.status,
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="text-[#1E3A8A] text-sm font-medium hover:underline cursor-pointer"
                      onClick={() => manageProperty(item.id)}
                    >
                      Manage property
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
