import Wrapper from '../../components/Wrapper'
import BackgroundCard from '../../components/BackgroundCard'
import IconBg from '../../components/IconBg'
import TotalIcon from "../../assets/icons/tolicon.png"
import ActIcon from "../../assets/icons/pendicon.png"
import UserIcon from "../../assets/icons/soldicon.png"
import NairaIcon from "../../assets/icons/avaicon.png"
import { ArrowUp } from "lucide-react"
import { fontSize, fontWeight, fontFamily, textColor } from "../../styles/theme";
import PropertyTable from "../properties/PropertyTable"


const Properties = () => {
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
            <p className={`${textColor.primary} ${fontWeight.normal} ${fontSize.md}`}>Pending Properties</p>
            <div className='flex justify-between mt-2'>
                <h1 className={`${textColor.primary800} ${fontWeight.normal} ${fontSize.md}`}>1007</h1>
                <IconBg
                icon={ActIcon}
                iconSize={18}
                bgColor='bg-yellow-100'
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
            <p className={`${textColor.primary} ${fontWeight.normal} ${fontSize.md}`}>Sold Properties</p>
            <div className='flex justify-between mt-2'>
                <h1 className={`${textColor.primary800} ${fontWeight.normal} ${fontSize.md}`}>240</h1>
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
            <p className={`${textColor.primary} ${fontWeight.normal} ${fontSize.md}`}>Available Properties</p>
            <div className='flex justify-between mt-2'>
                <h1 className={`${textColor.primary800} ${fontWeight.normal} ${fontSize.md}`}>15,432</h1>
                <IconBg
                icon={NairaIcon}
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
        </div>

        <div6
         className='mt-6'>
          <PropertyTable />
        </div6>
      </Wrapper>
    </div>
  )
}

export default Properties
