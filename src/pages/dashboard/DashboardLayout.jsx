import Wrapper from '../../components/Wrapper'
import BackgroundCard from "../../components/BackgroundCard"
import IconBg from "../../components/IconBg"
import TotalIcon from "../../assets/icons/tolicon.png"
import ActIcon from "../../assets/icons/acicon.png"
import UserIcon from "../../assets/icons/uicon.png"
import NairaIcon from "../../assets/icons/nairacon.png"
import { ArrowUp, ArrowDown} from "lucide-react"
import { fontSize, fontWeight, fontFamily, textColor } from "../../styles/theme";
import RevenueChart from "../dashboard/RevenueChart"
import PropertyChart from "../dashboard/PropertyChart"
import RecentProperties from "../dashboard/RecentProperties"
import TopInvestors from '../dashboard/TopInvestors'


const DashboardLayout = () => {
  return (
    <div className={`${fontFamily.main}`}>
      <Wrapper>
        <div className='flex justify-between gap-4'>
        <BackgroundCard rounded='2xl'>
          <div className='py-5 px-6'>
            <p className={`${textColor.primary} ${fontWeight.normal} ${fontSize.md}`}>Total Properties</p>
            <div className='flex justify-between mt-2'>
                <h1 className={`${textColor.primary800} ${fontWeight.normal} ${fontSize.md}`}>1,247</h1>
                <IconBg
                icon={TotalIcon}
                iconSize={18}
                />
            </div>
            <div className='flex items-center gap-1'>
                <ArrowUp size={20} className="text-[#22C55E]" />
                <p className={`${textColor.success} ${fontWeight.normal} ${fontSize.sm}`}>12% from last month</p>
            </div>
          </div>
        </BackgroundCard>

         <BackgroundCard rounded='2xl'>
          <div className='py-5 px-6'>
            <p className={`${textColor.primary} ${fontWeight.normal} ${fontSize.md}`}>Active Investments</p>
            <div className='flex justify-between mt-2'>
                <h1 className={`${textColor.primary800} ${fontWeight.normal} ${fontSize.md}`}>₦2.4B</h1>
                <IconBg
                icon={ActIcon}
                iconSize={18}
                bgColor='bg-red-200'
                />
            </div>
            <div className='flex items-center gap-1'>
                <ArrowUp size={20} className="text-[#22C55E]" />
                <p className={`${textColor.success} ${fontWeight.normal} ${fontSize.sm}`}>8.5% from last month</p>
            </div>
          </div>
        </BackgroundCard>

         <BackgroundCard rounded='2xl'>
          <div className='py-5 px-6'>
            <p className={`${textColor.primary} ${fontWeight.normal} ${fontSize.md}`}>Total Users</p>
            <div className='flex justify-between mt-2'>
                <h1 className={`${textColor.primary800} ${fontWeight.normal} ${fontSize.md}`}>15,432</h1>
                <IconBg
                icon={UserIcon}
                iconSize={18}
                bgColor='bg-green-100'
                />
            </div>
            <div className='flex items-center gap-1'>
                <ArrowUp size={20} className="text-[#22C55E]" />
                <p className={`${textColor.success} ${fontWeight.normal} ${fontSize.sm}`}>15.3% from last month</p>
            </div>
          </div>
        </BackgroundCard>
         <BackgroundCard rounded='2xl'>
          <div className='py-5 px-6'>
            <p className={`${textColor.primary} ${fontWeight.normal} ${fontSize.md}`}>Monthly Revenue</p>
            <div className='flex justify-between mt-2'>
                <h1 className={`${textColor.primary800} ${fontWeight.normal} ${fontSize.md}`}>₦456M</h1>
                <IconBg
                icon={NairaIcon}
                iconSize={18}
                bgColor='bg-yellow-100'
                />
            </div>
            <div className='flex items-center gap-1'>
                <ArrowDown size={20} className="text-[#EF4444]" />
                <p className={`${textColor.danger} ${fontWeight.normal} ${fontSize.sm}`}>15.3% from last month</p>
            </div>
          </div>
        </BackgroundCard>
        </div>
         

         <div className="flex gap-4 w-full mt-8">
          <div className="w-1/2">
           <RevenueChart />
           </div>

             <div className="w-1/2">
            <PropertyChart />
            </div>
          </div>

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
  )
}

export default DashboardLayout
