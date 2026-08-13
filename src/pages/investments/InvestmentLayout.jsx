import Wrapper from '../../components/Wrapper'
import BackgroundCard from "../../components/BackgroundCard"
import { fontSize, fontWeight, fontFamily, textColor } from "../../styles/theme";
import Button from "../../components/Button"
import { Plus } from "lucide-react";
import IconBg from "../../components/IconBg"
import TotalIcon from "../../assets/icons/tolicon.png"
import ActIcon from "../../assets/icons/greeninvest.png"
import UserIcon from "../../assets/icons/dolla.png"
import NairaIcon from "../../assets/icons/division.png"
import FilterBar from "../investments/FilterBar"
import InvestmentCard from "../investments/InvestmentCard"
import { investments } from "./investmentsData"

const InvestmentLayout = () => {
  return (
    <div className={`${fontFamily.main}`}>
        <Wrapper>
            <div className='flex justify-between'>
            <div>
                <h1 className={`${fontWeight.semibold} ${fontSize[`3xl`]} ${textColor.primary800}`}>
                    Property & Investment Management
                </h1>

                <p className={`${fontWeight.normal} ${textColor.miniGray} ${fontSize.base} mt-2`}>
                    Create and manage investment packages for real estate projects
                </p>
            </div>

            <div>
                <Button
                    text='Create Investment Package'
                    bgColor='bg-[#EC2614]'
                    icon={Plus}
                    className='cursor-pointer'
                    hoverBgColor='bg-[#EC2614]/90'
                />
            </div>
            </div>
           
            <div className='flex justify-between gap-4 mt-5'>
        <BackgroundCard rounded='2xl'
            width='318px'
            height='108px'
        >
          <div className='py-5 px-6'>
           <div className='flex justify-between mt-2'>
             <div >
                <p className={`${textColor.primary} ${fontWeight.normal} ${fontSize.md}`}>Total Properties</p>
                <h1 className={`${textColor.primary800} ${fontWeight.normal} ${fontSize['2xl']}`}>24</h1>
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

         <BackgroundCard rounded='2xl'
                width='318px'
            height='108px'
         >
          <div className='py-5 px-6'>
           <div className='flex justify-between mt-2'>
             <div >
            <p className={`${textColor.primary} ${fontWeight.normal} ${fontSize.md}`}>Active Investments</p>
                <h1 className={`${textColor.primary800} ${fontWeight.normal} ${fontSize['2xl']}`}>156</h1>
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

         <BackgroundCard rounded='2xl'
                width='318px'
            height='108px'
         >
          <div className='py-5 px-6'>
           
            <div className='flex justify-between mt-2'>
                 <div>
                    <p className={`${textColor.primary} ${fontWeight.normal} ${fontSize.md}`}>Total Value</p>
                <h1 className={`${textColor.primary800} ${fontWeight.normal} ${fontSize['2xl']}`}>$4.2M</h1>
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
         <BackgroundCard rounded='2xl'
                width='318px'
            height='108px'
         >
          <div className='py-5 px-6'>
          
            <div className='flex justify-between mt-2'>
                 <div>
                     <p className={`${textColor.primary} ${fontWeight.normal} ${fontSize.md}`}>Avg ROI</p>
                <h1 className={`${textColor.primary800} ${fontWeight.normal} ${fontSize['2xl']}`}>12.5%</h1>
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
            <div className='mt-5'>
                <FilterBar/>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5'>
                {investments.map((item, index) => (
                    <InvestmentCard key={index} {...item} />
                ))}
            </div>
        </Wrapper>
    </div>
  )
}

export default InvestmentLayout
