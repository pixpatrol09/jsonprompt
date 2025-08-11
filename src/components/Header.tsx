import { Layout, Button, Space, Typography } from 'antd'
import { BulbOutlined, BulbFilled, ThunderboltOutlined } from '@ant-design/icons'
import { useThemeStore } from '../stores/themeStore'

const { Header: AntHeader } = Layout
const { Title, Text } = Typography

export function Header() {
  const { isDark, toggleTheme } = useThemeStore()

  return (
    <AntHeader className="app-header" style={{ height: 'auto', lineHeight: 'normal', padding: '12px 0' }}>
      <div style={{ 
        maxWidth: 1200, 
        margin: '0 auto', 
        padding: '0 24px',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between'
      }}>
        <Space align="center" size={16}>
          <div style={{
            width: 40,
            height: 40,
            background: isDark ? '#2a2a2a' : '#6366f1',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ThunderboltOutlined style={{ 
              color: isDark ? '#8b5cf6' : '#ffffff', 
              fontSize: 20 
            }} />
          </div>
          <div>
            <Title level={4} style={{ margin: 0, fontWeight: 600, lineHeight: 1.2 }}>
              Prompt Studio
            </Title>
            <Text type="secondary" style={{ fontSize: 12, lineHeight: 1.2 }}>
              AI Prompt Generator
            </Text>
          </div>
        </Space>
        
        <Button
          type="text"
          icon={isDark ? 
            <BulbFilled style={{ color: '#8b5cf6' }} /> : 
            <BulbOutlined style={{ color: '#6b7280' }} />
          }
          onClick={toggleTheme}
        />
      </div>
    </AntHeader>
  )
}
