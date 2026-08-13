import { Eye } from "lucide-react";
import luxuryImg from "../../assets/images/luxury.png"
import spaceImg from "../../assets/images/space.png"
import familyImg from "../../assets/images/family.png"

const properties = [
  {
    image: luxuryImg,
    name: "Luxury Apartment",
    details: "3 bed, 2 bath",
    location: "Victoria Island, Lagos",
    price: "₦45,000,000",
    status: "Available",
    color: "bg-green-100 text-green-600",
  },
  {
    image: spaceImg,
    name: "Commercial Space",
    details: "Office complex",
    location: "Ikoyi, Lagos",
    price: "₦120,000,000",
    status: "Pending",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    image: familyImg,
    name: "Family Duplex",
    details: "4 bed, 3 bath",
    location: "Lekki, Lagos",
    price: "₦65,000,000",
    status: "Sold",
    color: "bg-red-100 text-red-500",
  },
];

export default function RecentProperties() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-semibold text-[#1F2A5A]">
          Recent Properties
        </h3>

        <button className="text-xs text-red-500  cursor-pointer">
          View All
        </button>
      </div>

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
            <tr key={item.name} className="border-b border-gray-200 last:border-none">
              <td className="py-4">
                <div className="flex gap-3">
                  <img
                    src={item.image}
                    className="w-12 h-12 rounded-lg object-cover"
                  />

                  <div>
                    <p className="text-sm font-medium">
                      {item.name}
                    </p>

                    <p className="text-xs text-gray-400">
                      {item.details}
                    </p>
                  </div>
                </div>
              </td>

              <td className="text-sm text-gray-500">
                {item.location}
              </td>

              <td className="text-sm font-medium">
                {item.price}
              </td>

              <td>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${item.color}`}
                >
                  {item.status}
                </span>
              </td>

              <td>
                <Eye
                  size={16}
                  className="text-red-500 cursor-pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}