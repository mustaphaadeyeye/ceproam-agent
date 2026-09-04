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

  return (
    <div className={`${fontFamily.main}`}>
      <Wrapper>
        {/* Wallet Balance Card */}
        <div>
          <BackgroundCard rounded="2xl" width="full">
            <div className="flex justify-between items-center py-8 px-6">
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
                    className={`${textColor.primary800} ${fontWeight.normal} ${fontSize["3xl"]}`}
                  >
                    {isLoading ? "..." : formatCurrency(metrics?.walletBalance)}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <ArrowUp size={20} className="text-[#22C55E]" />
                    <p
                      className={`${textColor.success} ${fontWeight.normal} ${fontSize.sm}`}
                    >
                      12% from last month
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <Button
                  text="Withdraw"
                  bgColor="bg-[#05062F]"
                  rounded="lg"
                  hoverBgColor="null"
                  className="cursor-pointer"
                />
              </div>
            </div>
          </BackgroundCard>
        </div>

        {/* 4 Summary Cards */}
        <div className="flex justify-between gap-4 mt-5">
          {/* Investments */}
          <BackgroundCard rounded="2xl">
            <div className="py-5 px-6">
              <p
                className={`${textColor.primary} ${fontWeight.normal} ${fontSize.md}`}
              >
                Investments
              </p>
              <div className="flex justify-between mt-2 items-center">
                <h1
                  className={`${textColor.primary800} ${fontWeight.normal} ${fontSize["3xl"]}`}
                >
                  {isLoading ? "..." : formatCurrency(metrics?.investments)}
                </h1>
                <IconBg icon={TotalIcon} iconSize={18} />
              </div>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUp size={20} className="text-[#22C55E]" />
                <p
                  className={`${textColor.success} ${fontWeight.normal} ${fontSize.sm}`}
                >
                  12% from last month
                </p>
              </div>
            </div>
          </BackgroundCard>

          {/* Properties */}
          <BackgroundCard rounded="2xl">
            <div className="py-5 px-6">
              <p
                className={`${textColor.primary} ${fontWeight.normal} ${fontSize.md}`}
              >
                Properties
              </p>
              <div className="flex justify-between mt-2 items-center">
                <h1
                  className={`${textColor.primary800} ${fontWeight.normal} ${fontSize["3xl"]}`}
                >
                  {isLoading ? "..." : formatCurrency(metrics?.properties)}
                </h1>
                <IconBg icon={UserIcon} iconSize={18} bgColor="bg-red-200" />
              </div>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUp size={20} className="text-[#22C55E]" />
                <p
                  className={`${textColor.success} ${fontWeight.normal} ${fontSize.sm}`}
                >
                  8.5% from last month
                </p>
              </div>
            </div>
          </BackgroundCard>

          {/* Withdrawals */}
          <BackgroundCard rounded="2xl">
            <div className="py-5 px-6">
              <p
                className={`${textColor.primary} ${fontWeight.normal} ${fontSize.md}`}
              >
                Withdrawals
              </p>
              <div className="flex justify-between mt-2 items-center">
                <h1
                  className={`${textColor.primary800} ${fontWeight.normal} ${fontSize["3xl"]}`}
                >
                  {isLoading ? "..." : formatCurrency(metrics?.withdrawals)}
                </h1>
                <IconBg icon={NairaIcon} iconSize={18} bgColor="bg-green-100" />
              </div>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUp size={20} className="text-[#22C55E]" />
                <p
                  className={`${textColor.success} ${fontWeight.normal} ${fontSize.sm}`}
                >
                  8.5% from last month
                </p>
              </div>
            </div>
          </BackgroundCard>

          {/* ROI PayOut */}
          <BackgroundCard rounded="2xl">
            <div className="py-5 px-6">
              <p
                className={`${textColor.primary} ${fontWeight.normal} ${fontSize.md}`}
              >
                ROI PayOut
              </p>
              <div className="flex justify-between mt-2 items-center">
                <h1
                  className={`${textColor.primary800} ${fontWeight.normal} ${fontSize["3xl"]}`}
                >
                  {isLoading ? "..." : formatCurrency(metrics?.roiPayout)}
                </h1>
                <IconBg icon={ActIcon} iconSize={18} bgColor="bg-yellow-100" />
              </div>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUp size={20} className="text-[#22C55E]" />
                <p
                  className={`${textColor.success} ${fontWeight.normal} ${fontSize.sm}`}
                >
                  15.3% from last month
                </p>
              </div>
            </div>
          </BackgroundCard>
        </div>

        {/* Transactions Table Component */}
        <div className="mt-5">
          <Transactionsdashboard />
        </div>
      </Wrapper>
    </div>
  );
};

export default TransactionLayout;
