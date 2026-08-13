import johnImg from "../../assets/images/john.png"
import mariaImg from "../../assets/images/maria.png"
import davidImg from "../../assets/images/david.png"
import graceImg from "../../assets/images/grace.png"

const investors = [
  {
    image: johnImg,
    name: "John Adebayo",
    amount: "₦24.5M invested",
    growth: "+12.5%",
  },
  {
    image: mariaImg,
    name: "Maria Okafor",
    amount: "₦18.2M invested",
    growth: "+8.3%",
  },
  {
    image: davidImg,
    name: "David Okonkwo",
    amount: "₦15.8M invested",
    growth: "+15.2%",
  },
  {
    image: graceImg,
    name: "Grace Eze",
    amount: "₦12.1M invested",
    growth: "+6.7%",
  },
];

export default function TopInvestors() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">
      <div className="flex justify-between mb-6">
        <h3 className="text-sm font-semibold text-[#1F2A5A]">
          Top Investors
        </h3>

        <button className="text-xs text-red-500 cursor-pointer">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {investors.map((item) => (
          <div
            key={item.name}
            className="flex justify-between items-center bg-gray-50 rounded-xl p-3"
          >
            <div className="flex gap-3">
              <img
                src={item.image}
                className="w-10 h-10 rounded-full object-cover"
              />

              <div>
                <h4 className="text-sm font-medium">
                  {item.name}
                </h4>

                <p className="text-xs text-gray-400">
                  {item.amount}
                </p>
              </div>
            </div>

            <span className="text-green-500 text-sm font-medium">
              {item.growth}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}