import React from "react";
import Wrapper from "../../components/Wrapper";
import BackgroundCard from "../../components/BackgroundCard";
import IconBg from "../../components/IconBg";
import TotalIcon from "../../assets/icons/tolicon.png";
import ActIcon from "../../assets/icons/pendicon.png";
import UserIcon from "../../assets/icons/soldicon.png";
import NairaIcon from "../../assets/icons/avaicon.png";
import { ArrowUp, ArrowDown } from "lucide-react";
import {
  fontSize,
  fontWeight,
  fontFamily,
  textColor,
} from "../../styles/theme";
import PropertyTable from "../properties/PropertyTable";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

const Properties = () => {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["agent-properties-metrics"],
    queryFn: async () => {
      const res = await api.get("/analytics/properties-metrics");
      return res?.data ?? res;
    },
    refetchInterval: 30000,
  });

  const totalProperties = metrics?.totalProperties || {
    value: 0,
    growthRate: 0,
    isIncrease: true,
  };
  const pendingProperties = metrics?.pendingProperties || {
    value: 0,
    growthRate: 0,
    isIncrease: true,
  };
  const soldProperties = metrics?.soldProperties || {
    value: 0,
    growthRate: 0,
    isIncrease: true,
  };
  const availableProperties = metrics?.availableProperties || {
    value: 0,
    growthRate: 0,
    isIncrease: true,
  };

  return (
    <div className={`${fontFamily.main}`}>
      <Wrapper>
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
                    {totalProperties.value.toLocaleString()}
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

          {/* Pending Properties */}
          <BackgroundCard rounded="2xl">
            <div className="py-5 px-6">
              <p
                className={`${textColor.primary} ${fontWeight.normal} ${fontSize.md}`}
              >
                Pending Properties
              </p>
              <div className="flex justify-between mt-2 items-center">
                {isLoading ? (
                  <div className="h-6 w-16 bg-gray-200 rounded animate-pulse my-1" />
                ) : (
                  <h1
                    className={`${textColor.primary800} ${fontWeight.normal} ${fontSize.md}`}
                  >
                    {pendingProperties.value.toLocaleString()}
                  </h1>
                )}
                <IconBg icon={ActIcon} iconSize={18} bgColor="bg-yellow-100" />
              </div>
              <div className="flex items-center gap-1 mt-2">
                {pendingProperties.isIncrease ? (
                  <ArrowUp size={20} className="text-[#22C55E]" />
                ) : (
                  <ArrowDown size={20} className="text-[#EF4444]" />
                )}
                <p
                  className={`${pendingProperties.isIncrease ? textColor.success : textColor.danger} ${fontWeight.normal} ${fontSize.sm}`}
                >
                  {pendingProperties.growthRate}% from last month
                </p>
              </div>
            </div>
          </BackgroundCard>

          {/* Sold Properties */}
          <BackgroundCard rounded="2xl">
            <div className="py-5 px-6">
              <p
                className={`${textColor.primary} ${fontWeight.normal} ${fontSize.md}`}
              >
                Sold Properties
              </p>
              <div className="flex justify-between mt-2 items-center">
                {isLoading ? (
                  <div className="h-6 w-16 bg-gray-200 rounded animate-pulse my-1" />
                ) : (
                  <h1
                    className={`${textColor.primary800} ${fontWeight.normal} ${fontSize.md}`}
                  >
                    {soldProperties.value.toLocaleString()}
                  </h1>
                )}
                <IconBg icon={UserIcon} iconSize={18} bgColor="bg-red-200" />
              </div>
              <div className="flex items-center gap-1 mt-2">
                {soldProperties.isIncrease ? (
                  <ArrowUp size={20} className="text-[#22C55E]" />
                ) : (
                  <ArrowDown size={20} className="text-[#EF4444]" />
                )}
                <p
                  className={`${soldProperties.isIncrease ? textColor.success : textColor.danger} ${fontWeight.normal} ${fontSize.sm}`}
                >
                  {soldProperties.growthRate}% from last month
                </p>
              </div>
            </div>
          </BackgroundCard>

          {/* Available Properties */}
          <BackgroundCard rounded="2xl">
            <div className="py-5 px-6">
              <p
                className={`${textColor.primary} ${fontWeight.normal} ${fontSize.md}`}
              >
                Available Properties
              </p>
              <div className="flex justify-between mt-2 items-center">
                {isLoading ? (
                  <div className="h-6 w-16 bg-gray-200 rounded animate-pulse my-1" />
                ) : (
                  <h1
                    className={`${textColor.primary800} ${fontWeight.normal} ${fontSize.md}`}
                  >
                    {availableProperties.value.toLocaleString()}
                  </h1>
                )}
                <IconBg icon={NairaIcon} iconSize={18} bgColor="bg-green-100" />
              </div>
              <div className="flex items-center gap-1 mt-2">
                {availableProperties.isIncrease ? (
                  <ArrowUp size={20} className="text-[#22C55E]" />
                ) : (
                  <ArrowDown size={20} className="text-[#EF4444]" />
                )}
                <p
                  className={`${availableProperties.isIncrease ? textColor.success : textColor.danger} ${fontWeight.normal} ${fontSize.sm}`}
                >
                  {availableProperties.growthRate}% from last month
                </p>
              </div>
            </div>
          </BackgroundCard>
        </div>

        <div className="mt-6">
          <PropertyTable />
        </div>
      </Wrapper>
    </div>
  );
};

export default Properties;
