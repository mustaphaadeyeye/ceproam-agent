import React from 'react'

const IconBg = ({
  icon,
  iconSize = 24,
  iconColor = 'text-blue-600',
  bgColor = 'bg-blue-100',
  width = '48px',
  height = '48px',
  rounded = 'xl', // 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  className = '',
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

  const isImageSrc = typeof icon === 'string'

  return (
    <div
      style={{ width, height }}
      className={`
        flex items-center justify-center
        ${bgColor}
        ${roundedMap[rounded] || 'rounded-xl'}
        ${className}
      `}
    >
      {icon && (
        isImageSrc ? (
          <img src={icon} alt="" style={{ width: iconSize, height: iconSize }} />
        ) : (
          React.createElement(icon, { size: iconSize, className: iconColor })
        )
      )}
    </div>
  )
}

export default IconBg