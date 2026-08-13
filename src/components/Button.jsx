
const Button = ({
  text = 'Button',
  icon: Icon = null,
  iconPosition = 'left', // 'left' | 'right'
  width = 'auto',
  height = 'auto',
  rounded = 'md', 
  bgColor = 'bg-blue-600',
  hoverBgColor = 'hover:bg-blue-700',
  textColor = 'text-white',
  fontSize = 'text-base',
  fontWeight = 'font-medium',
  fontFamily = '', 
  onClick = () => {},
  disabled = false,
  className = '',
  type = 'button',
}) => {
  const roundedMap = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ width, height }}
      className={`
        inline-flex items-center justify-center gap-2
        ${bgColor} ${!disabled && hoverBgColor}
        ${textColor} ${fontSize} ${fontWeight} ${fontFamily}
        ${roundedMap[rounded] || 'rounded-md'}
        px-4 py-2 transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {Icon && iconPosition === 'left' && <Icon size={18} />}
      {text}
      {Icon && iconPosition === 'right' && <Icon size={18} />}
    </button>
  )
}

export default Button
