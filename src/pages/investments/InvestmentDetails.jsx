import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Wrapper from '../../components/Wrapper'
import Button from '../../components/Button'
import { investments } from './investmentsData'
import { fontSize, fontWeight, fontFamily, textColor } from "../../styles/theme";
import buttonImg from "../../assets/icons/button.png"

const statusStyles = {
  Ongoing: 'bg-green-50 text-green-600',
  Closed: 'bg-red-50 text-red-500',
  Pending: 'bg-yellow-50 text-yellow-600',
}

const DetailRow = ({ leftLabel, leftValue, rightLabel, rightValue }) => (
  <div className="grid grid-cols-2 py-4 border-b border-gray-100 last:border-b-0">
    <div>
      <p className="text-xs text-gray-400 mb-1">{leftLabel}</p>
      <p className="text-sm text-gray-700 font-medium">{leftValue}</p>
    </div>
    <div>
      <p className="text-xs text-gray-400 mb-1">{rightLabel}</p>
      <p className="text-sm text-gray-700 font-medium">{rightValue}</p>
    </div>
  </div>
)

const InvestmentDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const investment = investments.find((item) => item.id === id)

  if (!investment) {
    return (
      <Wrapper>
        <div className="py-20 text-center">
          <p className="text-gray-500 mb-4">Investment not found.</p>
          <button onClick={() => navigate(-1)} className="text-blue-900 font-medium text-sm">
            &larr; Go back
          </button>
        </div>
      </Wrapper>
    )
  }

  const handleRemove = () => {
    console.log('Remove investment', investment.id)
  }

  const handleEdit = () => {
    console.log('Edit investment', investment.id)
    navigate(`/edit-details?id=${investment.id}`)
  }

  return (
    <div className={`px-55  ${fontFamily.main}`}>
    <Wrapper>
      <div className={`relative flex flex-col items-center py-4  `}>
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 top-4 text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className={`${textColor.primary800} ${fontSize['3xl']} ${fontWeight.semibold}`}>Investment Details</h1>
        <p className={`${fontSize.md} ${fontWeight.bold} ${textColor.miniGray}`}>Manage investment packages for real estate projects</p>
      </div>

      <div>
        <div>
          <div className="flex  justify-between">
            <div className='flex gap-2 items-center'>
                <h2 className={`${textColor.primary800} ${fontWeight.bold} text-[30px]`}>{investment.title}</h2>
            <button
              onClick={handleEdit}
              className="w-8 h-8 flex items-center justify-center rounded-md "
            >
              <img src={buttonImg} alt="" />
            </button>
            </div>
            <div>
                <Button
          text="Remove Investment"
          onClick={handleRemove}
          bgColor="bg-[#EC2614]"
          hoverBgColor="hover:bg-[#EC2614]/90"
          textColor="text-white"
          fontSize="text-sm"
          fontWeight="font-medium"
          rounded="md"
          height="40px"
          className="px-4 shrink-0"
        />
            </div>
          </div>
          
        </div>

        <p className="text-sm text-gray-500 mt-4">{investment.description}</p>
      </div>

      <div className="w-full h-80 rounded-xl overflow-hidden mt-6">
        <img
          src={investment.image}
          alt={investment.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="bg-white border border-gray-200 rounded-xl mt-6 px-6">
        <div className="grid grid-cols-2 py-4 border-b border-gray-200 items-center">
          <h3 className="text-gray-800 font-semibold text-base">Investment Details</h3>
          <div className="flex items-center gap-2">
            <h3 className="text-gray-800 font-semibold text-base">Status</h3>
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                statusStyles[investment.status] || statusStyles.Ongoing
              }`}
            >
              {investment.status}
            </span>
          </div>
        </div>

        <DetailRow
          leftLabel="Category"
          leftValue={investment.category}
          rightLabel="Package type"
          rightValue={investment.packageType}
        />
        <DetailRow
          leftLabel="Price1"
          leftValue={investment.price1}
          rightLabel="Price 2"
          rightValue={investment.price2}
        />
        <DetailRow
          leftLabel="Duration 1"
          leftValue={investment.duration1}
          rightLabel="Duration 2"
          rightValue={investment.duration2}
        />
        <DetailRow
          leftLabel="ROI 1"
          leftValue={investment.roi1}
          rightLabel="ROI 2"
          rightValue={investment.roi2}
        />
      </div>
    </Wrapper>
    </div>
  )
}

export default InvestmentDetails
