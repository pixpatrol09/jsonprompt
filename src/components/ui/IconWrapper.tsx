import React from 'react'
import { useTheme } from '../../hooks/useTheme'
import { COMPONENTS } from '../../constants/theme'

interface IconWrapperProps {
  children: React.ReactNode
  size?: 'small' | 'medium' | 'large' | 'xlarge'
  variant?: 'primary' | 'secondary' | 'neutral'
  className?: string
}

export default function IconWrapper({ 
  children, 
  size = 'large', 
  variant = 'primary',
  className = '' 
}: IconWrapperProps) {
  const { theme, getIconColor } = useTheme()
  
  const iconSize = COMPONENTS.icon.size[size]
  
  const style = {
    width: iconSize,
    height: iconSize,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.background.tertiary,
    borderRadius: COMPONENTS.card.borderRadius,
    color: getIconColor(variant),
    fontSize: size === 'xlarge' ? 24 : size === 'large' ? 20 : 16,
    transition: 'all 0.3s ease',
  }
  
  return (
    <div style={style} className={className}>
      {children}
    </div>
  )
}
