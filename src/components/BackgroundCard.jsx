const BackgroundCard = ({
  rounded = 'lg',
  bgColor = 'bg-white',
  shadow = 'shadow-md',
  children,
  className = '',
  onClick,
}) => {
  const roundedMap = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full',
  }

  const shadowMap = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl',
  }

  return (
    <div
      onClick={onClick}
      className={`
        w-full h-full
        ${bgColor}
        ${roundedMap[rounded] || 'rounded-lg'}
        ${shadowMap[shadow] || 'shadow-md'}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

export default BackgroundCard