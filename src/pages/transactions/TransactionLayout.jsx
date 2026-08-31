import React from 'react'
import Wrapper from '../../components/Wrapper'
import BackgroundCard from '../../components/BackgroundCard'
import IconBg from '../../components/IconBg'
import { fontSize, fontWeight, fontFamily, textColor } from "../../styles/theme";
import Button from "../../components/Button"
import TotalIcon from "../../assets/icons/tolicon.png"
import ActIcon from "../../assets/icons/pendicon.png"
import UserIcon from "../../assets/icons/soldicon.png"
import NairaIcon from "../../assets/icons/greencon.png"
import { ArrowUp, ArrowDown} from "lucide-react"
import Transactionsdashboard from "../transactions/Transactionsdashboard"

const TransactionLayout = () => {
  return (
    <div className={`${fontFamily.main}  xl:mt-0 lg:mt-0 mt-12`}>
        <Wrapper>
            <div>
               <BackgroundCard rounded-2xl width='full'>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 py-6 sm:py-8 px-4 sm:px-6">
                        <div className="flex items-center gap-4">
                            <div className=''>
                                 <IconBg
                                 icon={TotalIcon}
                                iconSize={18}
                                 />
                            </div>
                            <div>
                            <h1 className={`${textColor.primary} ${fontWeight.normal} ${fontSize.xl}`}>Wallet Balance</h1>
                            <p className={`${textColor.primary800} ${fontWeight.normal} ${fontSize['3xl']}`}>NGN 200,000,000</p>
                            <div className='flex items-center gap-2 mt-1'>
                            <ArrowUp size={20} className="text-[#22C55E]" />
                                <p className={`${textColor.success} ${fontWeight.normal} ${fontSize.sm}`}>12% from last month</p>
                            </div>
                            </div>
                        </div>
                        <div className='w-full sm:w-auto'>
                            <Button 
                            text='Withdraw'
                            bgColor='bg-[#05062F]'
                            rounded='lg'
                            hoverBgColor='null'
                            className='cursor-pointer w-full sm:w-auto'
                            />
                        </div>
                    </div>
               </BackgroundCard>
            </div>

         <div className='grid grid-cols-1 sm:grid-cols-2 xl:flex xl:justify-between gap-4 mt-5'>
        <BackgroundCard rounded='2xl'>
          <div className='py-5 px-6'>
            <p className={`${textColor.primary} ${fontWeight.normal} ${fontSize.md}`}>Investments</p>
            <div className='flex justify-between mt-2'>
                <h1 className={`${textColor.primary800} ${fontWeight.normal} ${fontSize['3xl']}`}>NGN 2M</h1>
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
            <p className={`${textColor.primary} ${fontWeight.normal} ${fontSize.md}`}>Properties</p>
            <div className='flex justify-between mt-2'>
                <h1 className={`${textColor.primary800} ${fontWeight.normal} ${fontSize['3xl']}`}>NGN 20M</h1>
                <IconBg
                icon={UserIcon}
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
            <p className={`${textColor.primary} ${fontWeight.normal} ${fontSize.md}`}>Withdrawals</p>
            <div className='flex justify-between mt-2'>
                <h1 className={`${textColor.primary800} ${fontWeight.normal} ${fontSize['3xl']}`}>NGN 10M</h1>

              
               <IconBg
                icon={NairaIcon}
                iconSize={18}
                bgColor='bg-green-100'
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
            <p className={`${textColor.primary} ${fontWeight.normal} ${fontSize.md}`}>ROI PayOut</p>
            <div className='flex justify-between mt-2'>
                <h1 className={`${textColor.primary800} ${fontWeight.normal} ${fontSize['3xl']}`}>NGN 200M</h1>
                   <IconBg
                icon={ActIcon}
                iconSize={18}
                bgColor='bg-yellow-100'
                />
            </div>
            <div className='flex items-center gap-1'>
                <ArrowUp size={20} className="text-[#22C55E]" />
                <p className={`${textColor.success} ${fontWeight.normal} ${fontSize.sm}`}>15.3% from last month</p>
            </div>
          </div>
        </BackgroundCard>
        </div>

            <div className='mt-5'>
                <Transactionsdashboard/>
            </div>
        </Wrapper>
    </div>
  )
}

export default TransactionLayout