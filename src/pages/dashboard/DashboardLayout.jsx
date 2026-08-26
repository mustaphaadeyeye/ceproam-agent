import React from "react";
import Wrapper from "../../components/Wrapper";
import BackgroundCard from "../../components/BackgroundCard";
import IconBg from "../../components/IconBg";
import TotalIcon from "../../assets/icons/tolicon.png";
import ActIcon from "../../assets/icons/acicon.png";
import UserIcon from "../../assets/icons/uicon.png";
import NairaIcon from "../../assets/icons/nairacon.png";
import { ArrowUp, ArrowDown } from "lucide-react";
import {
  fontSize,
  fontWeight,
  fontFamily,
  textColor,
} from "../../styles/theme";
import RevenueChart from "../dashboard/RevenueChart";
import PropertyChart from "../dashboard/PropertyChart";
import RecentProperties from "../dashboard/RecentProperties";
import TopInvestors from "../dashboard/TopInvestors";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

// Helper to format large currency or numbers nicely (e.g., ₦2.4B, ₦456M, or standard numbers)
const formatMetricValue = (val, isCurrency = false) => {
  if (val == null) return "0";
  if (!isCurrency) return val.toLocaleString();

  if (val >= 1_000_000_000) {
    return `₦${(val / 1_000_000_000).toFixed(1)}B`;
  }
  if (val >= 1_000_000) {
    return `₦${(val / 1_000_000).toFixed(1)}M`;
  }
  if (val >= 1_000) {
    return `₦${(val / 1_000).toFixed(1)}K`;
  }
  return `₦${val.toLocaleString()}`;
};

const DashboardLayout = () => {
  // Fetch real agent analytics from backend
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["agent-dashboard-analytics"],
    queryFn: async () => {
      const res = await api.get("/analytics/agent-dashboard");
      return res?.data ?? res;
    },
    refetchInterval: 30000,
  });

  // Fallback defaults if loading or empty
  const totalProperties = metrics?.totalProperties || {
    value: 0,
    growthRate: 0,
    isIncrease: true,
  };
  const activeInvestments = metrics?.activeInvestments || {
    value: 0,
    growthRate: 0,
    isIncrease: true,
  };
  const totalUsers = metrics?.totalUsers || {
    value: 0,
    growthRate: 0,
    isIncrease: true,
  };
  const monthlyRevenue = metrics?.monthlyRevenue || {
    value: 0,
    growthRate: 0,
    isIncrease: true,
  };

  return (
    <div className={`${fontFamily.main}`}>
      <Wrapper>
        {/* Top Metric Cards with SaaS breathing animation during loading */}
        <div className="flex justify-between gap-4">
          {/* Total Properties */}
          <BackgroundCard rounded="2xl">
            <div className="py-5 px-6">
              <p
                className={`${textColor.primary} ${fontWeight.normal} ${fontSize.md}`}
              >
                Total Properties
              </p>
              <div className="flex justify-between mt-2 items-center">
                {isLoading ? (
                  <div className="h-6 w-16 bg-gray-200 rounded animate-pulse my-1" />
                ) : (
                  <h1
                    className={`${textColor.primary800} ${fontWeight.normal} ${fontSize.md}`}
                  >
                    {formatMetricValue(totalProperties.value)}
                  </h1>
                )}
                <IconBg icon={TotalIcon} iconSize={18} />
              </div>
              <div className="flex items-center gap-1 mt-2">
                {totalProperties.isIncrease ? (
                  <ArrowUp size={20} className="text-[#22C55E]" />
                ) : (
                  <ArrowDown size={20} className="text-[#EF4444]" />
                )}
                <p
                  className={`${totalProperties.isIncrease ? textColor.success : textColor.danger} ${fontWeight.normal} ${fontSize.sm}`}
                >
                  {totalProperties.growthRate}% from last month
                </p>
              </div>
            </div>
          </BackgroundCard>

          {/* Active Investments */}
          <BackgroundCard rounded="2xl">
            <div className="py-5 px-6">
              <p
                className={`${textColor.primary} ${fontWeight.normal} ${fontSize.md}`}
              >
                Active Investments
              </p>
              <div className="flex justify-between mt-2 items-center">
                {isLoading ? (
                  <div className="h-6 w-16 bg-gray-200 rounded animate-pulse my-1" />
                ) : (
                  <h1
                    className={`${textColor.primary800} ${fontWeight.normal} ${fontSize.md}`}
                  >
                    {formatMetricValue(activeInvestments.value, true)}
                  </h1>
                )}
                <IconBg icon={ActIcon} iconSize={18} bgColor="bg-red-200" />
              </div>
              <div className="flex items-center gap-1 mt-2">
                {activeInvestments.isIncrease ? (
                  <ArrowUp size={20} className="text-[#22C55E]" />
                ) : (
                  <ArrowDown size={20} className="text-[#EF4444]" />
                )}
                <p
                  className={`${activeInvestments.isIncrease ? textColor.success : textColor.danger} ${fontWeight.normal} ${fontSize.sm}`}
                >
                  {activeInvestments.growthRate}% from last month
                </p>
              </div>
            </div>
          </BackgroundCard>

          {/* Total Users */}
          <BackgroundCard rounded="2xl">
            <div className="py-5 px-6">
              <p
                className={`${textColor.primary} ${fontWeight.normal} ${fontSize.md}`}
              >
                Total Users
              </p>
              <div className="flex justify-between mt-2 items-center">
                {isLoading ? (
                  <div className="h-6 w-16 bg-gray-200 rounded animate-pulse my-1" />
                ) : (
                  <h1
                    className={`${textColor.primary800} ${fontWeight.normal} ${fontSize.md}`}
                  >
                    {formatMetricValue(totalUsers.value)}
                  </h1>
                )}
                <IconBg icon={UserIcon} iconSize={18} bgColor="bg-green-100" />
              </div>
              <div className="flex items-center gap-1 mt-2">
                {totalUsers.isIncrease ? (
                  <ArrowUp size={20} className="text-[#22C55E]" />
                ) : (
                  <ArrowDown size={20} className="text-[#EF4444]" />
                )}
                <p
                  className={`${totalUsers.isIncrease ? textColor.success : textColor.danger} ${fontWeight.normal} ${fontSize.sm}`}
                >
                  {totalUsers.growthRate}% from last month
                </p>
              </div>
            </div>
          </BackgroundCard>

          {/* Monthly Revenue */}
          <BackgroundCard rounded="2xl">
            <div className="py-5 px-6">
              <p
                className={`${textColor.primary} ${fontWeight.normal} ${fontSize.md}`}
              >
                Monthly Revenue
              </p>
              <div className="flex justify-between mt-2 items-center">
                {isLoading ? (
                  <div className="h-6 w-16 bg-gray-200 rounded animate-pulse my-1" />
                ) : (
                  <h1
                    className={`${textColor.primary800} ${fontWeight.normal} ${fontSize.md}`}
                  >
                    {formatMetricValue(monthlyRevenue.value, true)}
                  </h1>
                )}
                <IconBg
                  icon={NairaIcon}
                  iconSize={18}
                  bgColor="bg-yellow-100"
                />
              </div>
              <div className="flex items-center gap-1 mt-2">
                {monthlyRevenue.isIncrease ? (
                  <ArrowUp size={20} className="text-[#22C55E]" />
                ) : (
                  <ArrowDown size={20} className="text-[#EF4444]" />
                )}
                <p
                  className={`${monthlyRevenue.isIncrease ? textColor.success : textColor.danger} ${fontWeight.normal} ${fontSize.sm}`}
                >
                  {monthlyRevenue.growthRate}% from last month
                </p>
              </div>
            </div>
          </BackgroundCard>
        </div>

        {/* Charts Section */}
        <div className="flex gap-4 w-full mt-8">
          <div className="w-1/2">
            <RevenueChart />
          </div>

          <div className="w-1/2">
            <PropertyChart />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
          <div className="lg:col-span-2">
            <RecentProperties />
          </div>

          <div>
            <TopInvestors />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default DashboardLayout;
