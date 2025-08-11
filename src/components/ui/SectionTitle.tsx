import React from 'react'
import { Typography, Space } from 'antd'
import { useTheme } from '../../hooks/useTheme'
import { TYPOGRAPHY } from '../../constants/theme'
import IconWrapper from './IconWrapper'

const { Title, Text } = Typography

interface SectionTitleProps {
  icon?: React.ReactNode
  title: string
  subtitle?: string
  level?: 1 | 2 | 3 | 4 | 5
}

export default function SectionTitle({ 
  icon, 
  title, 
  subtitle, 
  level = 4 
}: SectionTitleProps) {
  const { getTextColor } = useTheme()
  
  return (
    <div style={{ marginBottom: 24 }}>
      <Space align="center" size={12}>
        {icon && (
          <IconWrapper size="medium" variant="secondary">
            {icon}
          </IconWrapper>
        )}
        <Title 
          level={level} 
          style={{ 
            margin: 0, 
            fontFamily: TYPOGRAPHY.fontFamily,
            fontWeight: TYPOGRAPHY.fontWeight.semibold,
            color: getTextColor('primary')
          }}
        >
          {title}
        </Title>
      </Space>
      {subtitle && (
        <Text 
          type="secondary" 
          style={{ 
            display: 'block', 
            marginTop: 8,
            color: getTextColor('secondary')
          }}
        >
          {subtitle}
        </Text>
      )}
    </div>
  )
}
