import React from "react";
import Wrapper from "../../components/Wrapper";
import BackgroundCard from "../../components/BackgroundCard";
import IconBg from "../../components/IconBg";
import TotalIcon from "../../assets/icons/tolicon.png";
import ActIcon from "../../assets/icons/pendicon.png";
import UserIcon from "../../assets/icons/soldicon.png";
import NairaIcon from "../../assets/icons/avaicon.png";
import { ArrowUp } from "lucide-react";
import {
  fontSize,
  fontWeight,
  fontFamily,
  textColor,
} from "../../styles/theme";
import Usertable from "../users/UserTable";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

const UserLayout = () => {
  // Fetch platform metrics dynamically from backend
  const { data: metrics, isLoading: isMetricsLoading } = useQuery({
    queryKey: ["users-metrics"],
    queryFn: async () => {
      const res = await api.get("/users/metrics");
      return res?.data ?? res;
    },
  });

  const metricCards = [
    {
      label: "Total Properties",
      value: metrics?.totalProperties,
      icon: TotalIcon,
      bgColor: undefined,
    },
    {
      label: "Active Properties",
      value: metrics?.activeProperties,
      icon: ActIcon,
      bgColor: "bg-yellow-100",
    },
    {
      label: "Inactive Properties",
      value: metrics?.inactiveProperties,
      icon: UserIcon,
      bgColor: "bg-red-200",
    },
    {
      label: "Total Users",
      value: metrics?.totalUsers,
      icon: NairaIcon,
      bgColor: "bg-green-100",
    },
  ];

  return (
    <div className={`${fontFamily.main} xl:mt-0 lg:mt-0 mt-12`}>
      <Wrapper>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
          {metricCards.map((card) => (
            <BackgroundCard key={card.label} rounded="2xl">
              <div className="py-4 px-4 sm:py-5 sm:px-6">
                <p
                  className={`${textColor.primary} ${fontWeight.normal} ${fontSize.md} truncate`}
                >
                  {card.label}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <h1
                    className={`${textColor.primary800} ${fontWeight.normal} ${fontSize["2xl"]} sm:${fontSize["3xl"]}`}
                  >
                    {isMetricsLoading ? "..." : (card.value ?? 0).toLocaleString()}
                  </h1>
                  <IconBg icon={card.icon} iconSize={18} bgColor={card.bgColor} />
                </div>
                <div className="flex items-center gap-1 flex-wrap">
                  <ArrowUp size={20} className="text-[#22C55E] shrink-0" />
                  <p
                    className={`${textColor.success} ${fontWeight.normal} ${fontSize.sm}`}
                  >
                    From last month
                  </p>
                </div>
              </div>
            </BackgroundCard>
          ))}
        </div>

        <div className="mt-6 overflow-x-auto">
          <Usertable />
        </div>
      </Wrapper>
    </div>
  );
};

export default UserLayout;