import { X } from 'lucide-react'
import Button from "../Button"

const CancelsModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Cancel Property Sale?',
  description = 'Are you sure you want to cancel the sale of this property? This property will no longer be available for purchase and will be listed back as available property.',
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-xl px-10 py-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex cursor-pointer items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50"
        >
          <X size={16} />
        </button>

        <h2 className="text-center text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h2>
        <p className="text-center text-sm text-gray-500 leading-relaxed mb-6">
          {description}
        </p>

        <div className="flex gap-3">
          <Button
            text="Keep Sale"
            onClick={onClose}
            bgColor="bg-white"
            hoverBgColor="hover:bg-gray-50"
            textColor="text-blue-900"
            fontSize="text-sm"
            fontWeight="font-medium"
            rounded="md"
            height="44px"
            className="flex-1 border border-gray-300"
          />
          <Button
            text="Yes, Cancel Sale"
            onClick={onConfirm}
            bgColor="bg-[#EC2614]"
            hoverBgColor="hover:bg-[#EC2614]/90"
            textColor="text-white"
            fontSize="text-sm"
            fontWeight="font-medium"
            rounded="md"
            height="44px"
            className="flex-1"
          />
        </div>
      </div>
    </div>
  )
}

export default CancelsModal