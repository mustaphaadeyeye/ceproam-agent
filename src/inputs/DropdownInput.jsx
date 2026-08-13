import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

const DropdownInput = ({
  items = ['Option 1', 'Option 2', 'Option 3'],
  placeholder = 'Select...',
  width = '203px',
  height = '42px',
  bgColor = 'bg-white',
  borderColor = 'border-gray-300',
  textColor = 'text-gray-700',
  rounded = 'md', 
  value,
  onChange = () => {},
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(value || null)
  const dropdownRef = useRef(null)

  const roundedMap = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (item) => {
    setSelected(item)
    setIsOpen(false)
    onChange(item)
  }

  return (
    <div ref={dropdownRef} style={{ width }} className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{ height }}
        className={`
          flex items-center justify-between px-3 cursor-pointer select-none
          border ${borderColor} ${bgColor}
          ${roundedMap[rounded] || 'rounded-md'}
          ${className}
        `}
      >
        <span className={`text-sm truncate ${selected ? textColor : 'text-gray-400'}`}>
          {selected || placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`text-gray-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>

      {isOpen && (
        <ul
          className={`
            absolute z-10 mt-1 w-full max-h-48 overflow-y-auto
            border ${borderColor} ${bgColor}
            rounded-md shadow-md
          `}
        >
          {items.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelect(item)}
              className={`
                px-3 py-2 text-sm cursor-pointer hover:bg-gray-100
                ${selected === item ? 'bg-gray-50 font-medium' : textColor}
              `}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default DropdownInput
