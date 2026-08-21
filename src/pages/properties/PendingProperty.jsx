import React from 'react'
import Wrapper from '../../components/Wrapper'
import BackgroundCard from '../../components/BackgroundCard'
import IconBg from '../../components/IconBg'
import TotalIcon from "../../assets/icons/tolicon.png"
import ActIcon from "../../assets/icons/pendicon.png"
import UserIcon from "../../assets/icons/soldicon.png"
import NairaIcon from "../../assets/icons/avaicon.png"
import { ArrowUp, CheckCircle2, Circle } from "lucide-react"
import { fontSize, fontWeight, fontFamily, textColor } from "../../styles/theme"

const checklistItems = [
  {
    title: "Schedule a Property Inspection",
    description:
      "Visit the property or arrange a physical inspection to verify its condition and location.",
    checked: true,
  },
  {
    title: "Review Title and Ownership Documents",
    description:
      "Examine all legal documents to confirm property ownership and confirm the seller or landlord's authority over the property.",
    checked: false,
  },
  {
    title: "Confirm Terms and Conditions",
    description:
      "Ensure you understand the purchase, lease, or rental terms before proceeding.",
    checked: false,
  },
]

const PendingProperty = () => {
  const handleCancelSale = () => {
    // TODO: wire up actual cancel-sale logic (e.g. open confirmation modal, call API)
    console.log("Cancel sale clicked")
  }

  return (
    <div className={`${fontFamily.main}`}>
      <Wrapper>
        <div className="flex justify-between gap-4">
          <BackgroundCard rounded="2xl">
            <div className="py-5 px-6">
              <p className={`${textColor.primary} ${fontWeight.normal} ${fontSize.md}`}>
                Total Properties
              </p>
              <div className="flex justify-between mt-2">
                <h1 className={`${textColor.primary800} ${fontWeight.normal} ${fontSize.md}`}>
                  1,247
                </h1>
                <IconBg icon={TotalIcon} iconSize={18} />
              </div>
              <div className="flex items-center gap-1">
                <ArrowUp size={20} className="text-[#22C55E]" />
                <p className={`${textColor.success} ${fontWeight.normal} ${fontSize.sm}`}>
                  12% from last month
                </p>
              </div>
            </div>
          </BackgroundCard>

          <BackgroundCard rounded="2xl">
            <div className="py-5 px-6">
              <p className={`${textColor.primary} ${fontWeight.normal} ${fontSize.md}`}>
                Pending Properties
              </p>
              <div className="flex justify-between mt-2">
                <h1 className={`${textColor.primary800} ${fontWeight.normal} ${fontSize.md}`}>
                  1007
                </h1>
                <IconBg icon={ActIcon} iconSize={18} bgColor="bg-yellow-100" />
              </div>
              <div className="flex items-center gap-1">
                <ArrowUp size={20} className="text-[#22C55E]" />
                <p className={`${textColor.success} ${fontWeight.normal} ${fontSize.sm}`}>
                  8.5% from last month
                </p>
              </div>
            </div>
          </BackgroundCard>

          <BackgroundCard rounded="2xl">
            <div className="py-5 px-6">
              <p className={`${textColor.primary} ${fontWeight.normal} ${fontSize.md}`}>
                Sold Properties
              </p>
              <div className="flex justify-between mt-2">
                <h1 className={`${textColor.primary800} ${fontWeight.normal} ${fontSize.md}`}>
                  240
                </h1>
                <IconBg icon={UserIcon} iconSize={18} bgColor="bg-red-200" />
              </div>
              <div className="flex items-center gap-1">
                <ArrowUp size={20} className="text-[#22C55E]" />
                <p className={`${textColor.success} ${fontWeight.normal} ${fontSize.sm}`}>
                  8.5% from last month
                </p>
              </div>
            </div>
          </BackgroundCard>

          <BackgroundCard rounded="2xl">
            <div className="py-5 px-6">
              <p className={`${textColor.primary} ${fontWeight.normal} ${fontSize.md}`}>
                Available Properties
              </p>
              <div className="flex justify-between mt-2">
                <h1 className={`${textColor.primary800} ${fontWeight.normal} ${fontSize.md}`}>
                  15,432
                </h1>
                <IconBg icon={NairaIcon} iconSize={18} bgColor="bg-green-100" />
              </div>
              <div className="flex items-center gap-1">
                <ArrowUp size={20} className="text-[#22C55E]" />
                <p className={`${textColor.success} ${fontWeight.normal} ${fontSize.sm}`}>
                  15.3% from last month
                </p>
              </div>
            </div>
          </BackgroundCard>
        </div>

        {/* Property Verification Checklist */}
        <div className="mt-6">
          
            <div className="py-6 px-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h2
                    className={`${textColor.primary800} ${fontWeight.semibold} ${fontSize.lg}`}
                  >
                    Property Verification Checklist
                  </h2>
                  <p
                    className={`${textColor.primary} ${fontWeight.normal} ${fontSize.sm} mt-1 max-w-md`}
                  >
                    Your safety is our priority. Complete all required
                    verification steps to confirm the property's authenticity
                    and documentation before making payment.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCancelSale}
                  className={`bg-red-500 hover:bg-red-600 text-white ${fontWeight.medium} ${fontSize.sm} rounded-lg px-5 py-2.5 whitespace-nowrap transition-colors shrink-0 cursor-pointer`}
                >
                  Cancel Sale
                </button>
              </div>

              {/* Checklist */}
              <div className="flex flex-col gap-5">
                {checklistItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    {item.checked ? (
                      <CheckCircle2
                        size={20}
                        className="text-orange-500 mt-0.5 shrink-0"
                      />
                    ) : (
                      <Circle
                        size={20}
                        className="text-gray-300 mt-0.5 shrink-0"
                      />
                    )}
                    <div>
                      <p
                        className={`${textColor.primary800} ${fontWeight.medium} ${fontSize.sm}`}
                      >
                        {item.title}
                      </p>
                      <p
                        className={`${textColor.primary} ${fontWeight.normal} ${fontSize.sm} mt-0.5 max-w-md`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        
        </div>
      </Wrapper>
    </div>
  )
}

export default PendingProperty