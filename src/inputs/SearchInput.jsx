
const SearchInput = ({
  icon: Icon = null,
  placeholder = 'Search....',
  width = '203px',
  height = '42px',
  bgColor = 'bg-white',
  borderColor = 'border-gray-300',
  textColor = 'text-gray-700',
  rounded = 'md', // 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  value,
  onChange = () => {},
  className = '',
}) => {
  const roundedMap = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  }

  return (
    <div
      style={{ width, height }}
      className={`
        flex items-center gap-2 px-3
        border ${borderColor} ${bgColor}
        ${roundedMap[rounded] || 'rounded-md'}
        ${className}
      `}
    >
      {Icon && <Icon size={18} className="text-gray-400 shrink-0" />}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full h-full bg-transparent outline-none border-none
          ${textColor} placeholder-gray-400 text-sm
        `}
      />
    </div>
  )
}

export default SearchInput
