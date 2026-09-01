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

  return (
    <div>
      <Wrapper>
        <div className="flex justify-between gap-4">
          <BackgroundCard rounded="2xl">
            <div className="py-5 px-6">
              <p
                className={`${textColor.primary} ${fontWeight.normal} ${fontSize.md}`}
              >
                Total Properties
              </p>
              <div className="flex justify-between mt-2">
                <h1
                  className={`${textColor.primary800} ${fontWeight.normal} ${fontSize["3xl"]}`}
                >
                  {isMetricsLoading
                    ? "..."
                    : (metrics?.totalProperties ?? 1247).toLocaleString()}
                </h1>
                <IconBg icon={TotalIcon} iconSize={18} />
              </div>
              <div className="flex items-center gap-1">
                <ArrowUp size={20} className="text-[#22C55E]" />
                <p
                  className={`${textColor.success} ${fontWeight.normal} ${fontSize.sm}`}
                >
                  12% from last month
                </p>
              </div>
            </div>
          </BackgroundCard>

          <BackgroundCard rounded="2xl">
            <div className="py-5 px-6">
              <p
                className={`${textColor.primary} ${fontWeight.normal} ${fontSize.md}`}
              >
                Active Properties
              </p>
              <div className="flex justify-between mt-2">
                <h1
                  className={`${textColor.primary800} ${fontWeight.normal} ${fontSize["3xl"]}`}
                >
                  {isMetricsLoading
                    ? "..."
                    : (metrics?.activeProperties ?? 1007).toLocaleString()}
                </h1>
                <IconBg icon={ActIcon} iconSize={18} bgColor="bg-yellow-100" />
              </div>
              <div className="flex items-center gap-1">
                <ArrowUp size={20} className="text-[#22C55E]" />
                <p
                  className={`${textColor.success} ${fontWeight.normal} ${fontSize.sm}`}
                >
                  8.5% from last month
                </p>
              </div>
            </div>
          </BackgroundCard>

          <BackgroundCard rounded="2xl">
            <div className="py-5 px-6">
              <p
                className={`${textColor.primary} ${fontWeight.normal} ${fontSize.md}`}
              >
                Inactive Properties
              </p>
              <div className="flex justify-between mt-2">
                <h1
                  className={`${textColor.primary800} ${fontWeight.normal} ${fontSize["3xl"]}`}
                >
                  {isMetricsLoading
                    ? "..."
                    : (metrics?.inactiveProperties ?? 240).toLocaleString()}
                </h1>
                <IconBg icon={UserIcon} iconSize={18} bgColor="bg-red-200" />
              </div>
              <div className="flex items-center gap-1">
                <ArrowUp size={20} className="text-[#22C55E]" />
                <p
                  className={`${textColor.success} ${fontWeight.normal} ${fontSize.sm}`}
                >
                  8.5% from last month
                </p>
              </div>
            </div>
          </BackgroundCard>
          <BackgroundCard rounded="2xl">
            <div className="py-5 px-6">
              <p
                className={`${textColor.primary} ${fontWeight.normal} ${fontSize.md}`}
              >
                Total Users
              </p>
              <div className="flex justify-between mt-2">
                <h1
                  className={`${textColor.primary800} ${fontWeight.normal} ${fontSize["3xl"]}`}
                >
                  {isMetricsLoading
                    ? "..."
                    : (metrics?.totalUsers ?? 15432).toLocaleString()}
                </h1>
                <IconBg icon={NairaIcon} iconSize={18} bgColor="bg-green-100" />
              </div>
              <div className="flex items-center gap-1">
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

        <div className="mt-6">
          <Usertable />
        </div>
      </Wrapper>
    </div>
  );
};

export default UserLayout;
