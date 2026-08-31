import { useState } from "react";
import Wrapper from '../../components/Wrapper';
import BackgroundCard from "../../components/BackgroundCard";
import { fontSize, fontWeight, fontFamily, textColor } from "../../styles/theme";
import Button from "../../components/Button";
import { Plus } from "lucide-react";
import IconBg from "../../components/IconBg";
import TotalIcon from "../../assets/icons/tolicon.png";
import ActIcon from "../../assets/icons/greeninvest.png";
import UserIcon from "../../assets/icons/dolla.png";
import NairaIcon from "../../assets/icons/division.png";
import FilterBar from "../investments/FilterBar";
import InvestmentCard from "../investments/InvestmentCard";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

const InvestmentLayout = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [type, setType] = useState("All Types");

  // Fetch metrics for top cards
  const { data: metrics, isLoading: isMetricsLoading } = useQuery({
    queryKey: ["investment-metrics"],
    queryFn: async () => {
      const res = await api.get("/investments/metrics");
      return res?.data ?? res;
    },
  });

  // Fetch filtered investments based on search, status, and type
  const { data: investments = [], isLoading } = useQuery({
    queryKey: ["investments-list", search, status, type],
    queryFn: async () => {
      const res = await api.get(`/investments/list`, {
        params: { search, status, type },
      });
      return res?.data ?? res;
    },
  });

  return (
    <div className={`${fontFamily.main} xl:mt-0 lg:mt-0 mt-12`}>
        <Wrapper>
            <div className='flex flex-col xl:flex-row justify-between gap-4'>
            <div>
                <h1 className={`${fontWeight.semibold} ${fontSize[`3xl`]} ${textColor.primary800}`}>
                    Property & Investment Management
                </h1>

                <p className={`${fontWeight.normal} ${textColor.miniGray} ${fontSize.base} mt-2`}>
                    Create and manage investment packages for real estate projects
                </p>
            </div>

            <div className='w-full xl:w-auto'>
                <Button
                    text='Create Investment Package'
                    bgColor='bg-[#EC2614]'
                    icon={Plus}
                    className='cursor-pointer w-full xl:w-auto'
                    hoverBgColor='bg-[#EC2614]/90'
                    onClick={() => navigate('/app/edit-details')}
                />
            </div>
            </div>
           
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:flex xl:justify-between gap-4 mt-5'>
        <div className='w-full h-[108px] xl:w-[318px]'>
        <BackgroundCard rounded='2xl'
            width='100%'
            height='100%'
        >
          <div className='py-5 px-6'>
           <div className='flex justify-between mt-2'>
             <div >
                <p className={`${textColor.primary} ${fontWeight.normal} ${fontSize.md}`}>Total Investments</p>
                <h1 className={`${textColor.primary800} ${fontWeight.normal} ${fontSize['2xl']}`}>
                  {isMetricsLoading ? "..." : (metrics?.totalProperties ?? 0)}
                </h1>
             </div>
             <div>
                <IconBg
                icon={TotalIcon}
                iconSize={18}
                />
             </div>
           </div>
                
          </div>
        </BackgroundCard>
        </div>

        <div className='w-full h-[108px] xl:w-[318px]'>
         <BackgroundCard rounded='2xl'
                width='100%'
            height='100%'
       >
          <div className='py-5 px-6'>
           <div className='flex justify-between mt-2'>
             <div >
            <p className={`${textColor.primary} ${fontWeight.normal} ${fontSize.md}`}>Active Investments</p>
                <h1 className={`${textColor.primary800} ${fontWeight.normal} ${fontSize['2xl']}`}>
                  {isMetricsLoading ? "..." : (metrics?.activeInvestments ?? 0)}
                </h1>
             </div>
             <div>
                <IconBg
                icon={ActIcon}
                iconSize={18}
                bgColor='bg-green-100'
                />
             </div>
           </div>
         
          </div>
        </BackgroundCard>
        </div>

        <div className='w-full h-[108px] xl:w-[318px]'>
         <BackgroundCard rounded='2xl'
                width='100%'
            height='100%'
       >
          <div className='py-5 px-6'>
         
            <div className='flex justify-between mt-2'>
                 <div>
                    <p className={`${textColor.primary} ${fontWeight.normal} ${fontSize.md}`}>Total Value</p>
                <h1 className={`${textColor.primary800} ${fontWeight.normal} ${fontSize['2xl']}`}>
                  {isMetricsLoading ? "..." : (metrics?.totalValue ?? "$0")}
                </h1>
                 </div>
                 <div>
                     <IconBg
                icon={UserIcon}
                iconSize={18}
                bgColor='bg-purple-100'
                />
                 </div>
            </div>

          </div>
        </BackgroundCard>
        </div>
        <div className='w-full h-[108px] xl:w-[318px]'>
         <BackgroundCard rounded='2xl'
                width='100%'
            height='100%'
       >
          <div className='py-5 px-6'>
         
            <div className='flex justify-between mt-2'>
                 <div>
                     <p className={`${textColor.primary} ${fontWeight.normal} ${fontSize.md}`}>Avg ROI</p>
                <h1 className={`${textColor.primary800} ${fontWeight.normal} ${fontSize['2xl']}`}>
                  {isMetricsLoading ? "..." : (metrics?.avgRoi ?? "0%")}
                </h1>
                 </div>

                 <div>
                      <IconBg
                icon={NairaIcon}
                iconSize={18}
                bgColor='bg-yellow-100'
                />
                 </div>
            </div>
            
          </div>
        </BackgroundCard>
        </div>
        </div>
            <div className='mt-5'>
                <FilterBar
                  onSearchChange={(e) => setSearch(e.target.value)}
                  onStatusChange={(val) => setStatus(val)}
                  onTypeChange={(val) => setType(val)}
                />
            </div>

            {isLoading ? (
              <div className='py-20 text-center text-gray-400 text-sm animate-pulse'>Loading investments...</div>
            ) : investments.length === 0 ? (
              <div className='py-20 text-center text-gray-400 text-sm'>No investment packages found.</div>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5'>
                  {investments.map((item, index) => (
                      <InvestmentCard key={item.id || index} {...item} />
                  ))}
              </div>
            )}
        </Wrapper>
    </div>
  )
}

export default InvestmentLayout;