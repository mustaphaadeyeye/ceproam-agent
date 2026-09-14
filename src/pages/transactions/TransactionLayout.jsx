import React from "react";
import Wrapper from "../../components/Wrapper";
import BackgroundCard from "../../components/BackgroundCard";
import IconBg from "../../components/IconBg";
import {
  fontSize,
  fontWeight,
  fontFamily,
  textColor,
} from "../../styles/theme";
import Button from "../../components/Button";
import TotalIcon from "../../assets/icons/tolicon.png";
import ActIcon from "../../assets/icons/pendicon.png";
import UserIcon from "../../assets/icons/soldicon.png";
import NairaIcon from "../../assets/icons/greencon.png";
import { ArrowUp } from "lucide-react";
import Transactionsdashboard from "../transactions/Transactionsdashboard";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

const formatCurrency = (val) => {
  if (val == null) return "NGN 0";
  if (val >= 1_000_000_000) return `NGN ${(val / 1_000_000_000).toFixed(1)}B`;
  if (val >= 1_000_000) return `NGN ${(val / 1_000_000).toFixed(0)}M`;
  return `NGN ${val.toLocaleString()}`;
};

const TransactionLayout = () => {
  // Fetch real agent-scoped transaction analytics metrics
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["transactions-metrics"],
    queryFn: async () => {
      const res = await api.get("/transactions/metrics");
      return res?.data ?? res;
    },
  });

  const summaryCards = [
    {
      label: "Investments",
      value: metrics?.investments,
      icon: TotalIcon,
      bgColor: undefined,
      growth: "12% from last month",
    },
    {
      label: "Properties",
      value: metrics?.properties,
      icon: UserIcon,
      bgColor: "bg-red-200",
      growth: "8.5% from last month",
    },
    {
      label: "Withdrawals",
      value: metrics?.withdrawals,
      icon: NairaIcon,
      bgColor: "bg-green-100",
      growth: "8.5% from last month",
    },
    {
      label: "ROI PayOut",
      value: metrics?.roiPayout,
      icon: ActIcon,
      bgColor: "bg-yellow-100",
      growth: "15.3% from last month",
    },
  ];

  return (
    <div className={`${fontFamily.main} xl:mt-0 lg:mt-0 mt-12`}>
      <Wrapper>
        {/* Wallet Balance Card */}
        <div>
          <BackgroundCard rounded="2xl" width="full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-6 px-4 sm:py-8 sm:px-6">
              <div className="flex items-center gap-4">
                <div>
                  <IconBg icon={TotalIcon} iconSize={18} />
                </div>
                <div>
                  <h1
                    className={`${textColor.primary} ${fontWeight.normal} ${fontSize.xl}`}
                  >
                    Wallet Balance
                  </h1>
                  <p
                    className={`${textColor.primary800} ${fontWeight.normal} ${fontSize["2xl"]} sm:${fontSize["3xl"]} break-all`}
                  >
                    {isLoading ? "..." : formatCurrency(metrics?.walletBalance)}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <ArrowUp size={20} className="text-[#22C55E] shrink-0" />
                    <p
                      className={`${textColor.success} ${fontWeight.normal} ${fontSize.sm}`}
                    >
                      12% from last month
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-auto">
                <Button
                  text="Withdraw"
                  bgColor="bg-[#05062F]"
                  rounded="lg"
                  hoverBgColor="null"
                  className="cursor-pointer w-full sm:w-auto"
                />
              </div>
            </div>
          </BackgroundCard>
        </div>

        {/* 4 Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-5">
          {summaryCards.map((card) => (
            <BackgroundCard key={card.label} rounded="2xl">
              <div className="py-4 px-4 sm:py-5 sm:px-6">
                <p
                  className={`${textColor.primary} ${fontWeight.normal} ${fontSize.md} truncate`}
                >
                  {card.label}
                </p>
                <div className="flex justify-between mt-2 items-center gap-2">
                  <h1
                    className={`${textColor.primary800} ${fontWeight.normal} ${fontSize["2xl"]} sm:${fontSize["3xl"]} truncate`}
                  >
                    {isLoading ? "..." : formatCurrency(card.value)}
                  </h1>
                  <IconBg icon={card.icon} iconSize={18} bgColor={card.bgColor} />
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUp size={20} className="text-[#22C55E] shrink-0" />
                  <p
                    className={`${textColor.success} ${fontWeight.normal} ${fontSize.sm} truncate`}
                  >
                    {card.growth}
                  </p>
                </div>
              </div>
            </BackgroundCard>
          ))}
        </div>

        {/* Transactions Table Component */}
        <div className="mt-5 overflow-x-auto">
          <Transactionsdashboard />
        </div>
      </Wrapper>
    </div>
  );
};

export default TransactionLayout;