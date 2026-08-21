import { useState } from "react";
import luxuryImg from "../../assets/images/luxury.png"
import spaceImg from "../../assets/images/space.png"
import familyImg from "../../assets/images/family.png"
import { fontSize, fontWeight, textColor } from "../../styles/theme";
import { useNavigate } from "react-router-dom";

const properties = [
  {
    id: 1,
    image: luxuryImg,
    title: "Luxury Apartment",
    subtitle: "3 bed, 2 bath",
    location: "Victoria Island, Lagos",
    listedOn: "10th September, 2025",
    price: "₦45,000,000",
    status: "Available",
  },
  {
    id: 2,
    image: spaceImg,
    title: "Commercial Space",
    subtitle: "Office complex",
    location: "Ikoyi, Lagos",
    listedOn: "10th September, 2025",
    price: "₦120,000,000",
    status: "Pending",
  },
  {
    id: 3,
    image: luxuryImg,
    title: "Luxury Apartment",
    subtitle: "3 bed, 2 bath",
    location: "Victoria Island, Lagos",
    listedOn: "10th September, 2025",
    price: "₦45,000,000",
    status: "Available",
  },
  {
    id: 4,
    image: familyImg,
    title: "Family Duplex",
    subtitle: "4 bed, 3 bath",
    location: "Lekki, Lagos",
    listedOn: "10th September, 2025",
    price: "₦85,000,000",
    status: "Sold",
  },
  {
    id: 5,
    image: spaceImg,
    title: "Commercial Space",
    subtitle: "Office complex",
    location: "Ikoyi, Lagos",
    listedOn: "10th September, 2025",
    price: "₦120,000,000",
    status: "Pending",
  },
  {
    id: 6,
    image: familyImg,
    title: "Family Duplex",
    subtitle: "4 bed, 3 bath",
    location: "Lekki, Lagos",
    listedOn: "10th September, 2025",
    price: "₦85,000,000",
    status: "Sold",
  },
];

export default function PropertyTable() {
  const [status, setStatus] = useState("All Status");
  const navigate = useNavigate();

  const handleDetails = () => {
    navigate("/properties-details");
  };

  const manageProperty = () => {
    navigate(`/available-property`);
  };

  const managePending = () => {
    navigate(`/pending-property`);
  };

  const manageSold = () => {
    navigate(`/sold-property`);
  };

  const handleStatusClick = (item) => {
    switch (item.status) {
      case "Available":
        navigate(`/available-property`);
        break;
      case "Pending":
        managePending();
        break;
      case "Sold":
        manageSold();
        break;
      default:
        break;
    }
  };

  const filtered =
    status === "All Status"
      ? properties
      : properties.filter((item) => item.status === status);

  const badgeColor = (status) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-600";
      case "Pending":
        return "bg-yellow-100 text-yellow-600";
      case "Sold":
        return "bg-red-100 text-red-500";
      default:
        return "";
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mt-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <div className="flex items-center gap-3">

          <h2 className={`${textColor.primary800} ${fontWeight.normal} ${fontSize.md}`}>
            All Properties
          </h2>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-[#D1D5DB] rounded-md px-3 py-2 text-sm outline-none"
          >
            <option>All Status</option>
            <option>Available</option>
            <option>Pending</option>
            <option>Sold</option>
          </select>

        </div>

        <button
          className="bg-[#EC2614] hover:bg-red-600 text-white rounded-md px-5 py-2 text-sm font-medium"
          onClick={handleDetails}
        >
          Add new
        </button>

      </div>

      {/* Table */}
      <div className="overflow-x-auto">

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
            {filtered.map((item) => (
              <tr
                key={item.id}
                className="border-b border-b-[#E5E7EB] last:border-none hover:bg-gray-50"
              >
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt=""
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-sm text-[#1E3A8A]">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-400">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="text-sm text-gray-600">
                  {item.location}
                </td>

                <td className="text-sm text-gray-600">
                  {item.listedOn}
                </td>

                <td className="text-sm font-medium text-[#1E3A8A]">
                  {item.price}
                </td>

                <td>
                  <span
                    onClick={() => handleStatusClick(item)}
                    className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer ${badgeColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>

                <td>
                  <button
                    className="text-[#1E3A8A] text-sm font-medium hover:underline cursor-pointer"
                    onClick={manageProperty}
                  >
                    Manage property
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}