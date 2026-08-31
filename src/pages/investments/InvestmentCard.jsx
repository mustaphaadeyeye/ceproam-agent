import { useNavigate } from 'react-router-dom'
import { Users } from 'lucide-react'
import Button from "../../components/Button"
import buttonImg from "../../assets/icons/button.png"

const statusStyles = {
  Ongoing: 'bg-green-50 text-green-600',
  Closed: 'bg-red-50 text-red-500',
  Pending: 'bg-yellow-50 text-yellow-600',
}

const InvestmentCard = ({
  image,
  status = 'Ongoing',
  id = 'INV-001',
  title = 'Property Title',
  investors = 156,
  description = '',
  investmentValue = '$0',
  roiLabel = 'Expected ROI',
  roi = '0%',
  duration = '0 months',
}) => {
  const navigate = useNavigate()

  const handleViewDetails = () => {
    navigate(`/app/investments/${id}`)
  }

  // 🎯 Route directly to edit-details with the investment ID query parameter
  const handleEdit = () => {
    navigate(`/app/edit-details?id=${id}`)
  }

  return (
    <div className="w-full bg-white relative rounded-xl border border-gray-200 overflow-hidden shadow-sm pb-14">
      <div className="w-full h-40 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-medium ${
              statusStyles[status] || statusStyles.Ongoing
            }`}
          >
            {status}
          </span>
          <span className="text-xs text-gray-400">ID: {id}</span>
        </div>

        <div className='flex flex-wrap items-start justify-between gap-2'>
          <h3 className="text-blue-900 font-semibold text-base mb-2">{title}</h3>
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2 shrink-0">
            <Users size={13} />
            <span>{investors} Investors</span>
          </div>
        </div>

        <p className="text-sm text-gray-500 leading-snug mb-4 line-clamp-2">
          {description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Investment Value</span>
            <span className="text-gray-700 font-medium">{investmentValue}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">{roiLabel}</span>
            <span className="text-green-600 font-medium">{roi}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Duration</span>
            <span className="text-gray-700 font-medium">{duration}</span>
          </div>
        </div>

        <div className="flex items-center absolute bottom-4 left-4 right-4 gap-2">
          <Button
            text="View Details"
            onClick={handleViewDetails}
            bgColor="bg-blue-900"
            hoverBgColor="hover:bg-blue-950"
            textColor="text-white"
            fontSize="text-sm"
            fontWeight="font-medium"
            rounded="md"
            width="100%"
            height="40px"
            className="flex-1 cursor-pointer"
          />
          <div className="shrink-0">
            <img src={buttonImg} alt="Edit" onClick={handleEdit} className="cursor-pointer hover:opacity-80 transition" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvestmentCard