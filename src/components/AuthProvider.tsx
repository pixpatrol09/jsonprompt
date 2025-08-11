import React, { useState, useEffect } from 'react'
import { Card, Input, Button, Typography, Space, message } from 'antd'
import { LockOutlined, KeyOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

const PASSCODE = 'blinkDEL19'
const AUTH_KEY = 'prompt-studio-auth'

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Check if user is already authenticated
    const savedAuth = localStorage.getItem(AUTH_KEY)
    if (savedAuth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleSubmit = () => {
    setLoading(true)
    
    setTimeout(() => {
      if (passcode === PASSCODE) {
        localStorage.setItem(AUTH_KEY, 'true')
        setIsAuthenticated(true)
        message.success('Access granted!')
      } else {
        message.error('Invalid passcode')
        setPasscode('')
      }
      setLoading(false)
    }, 500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  if (isAuthenticated) {
    return <>{children}</>
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <Card style={{
        width: '100%',
        maxWidth: 400,
        textAlign: 'center',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}>
        <Space direction="vertical" size={24} style={{ width: '100%' }}>
          <div>
            <LockOutlined style={{ 
              fontSize: 48, 
              color: '#6366f1', 
              marginBottom: 16 
            }} />
            <Title level={3} style={{ margin: 0 }}>
              Prompt Studio
            </Title>
            <Text type="secondary">
              Enter passcode to access the application
            </Text>
          </div>

          <div style={{ width: '100%' }}>
            <Input.Password
              size="large"
              placeholder="Enter passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              onKeyPress={handleKeyPress}
              prefix={<KeyOutlined style={{ color: '#8c8c8c' }} />}
              style={{ marginBottom: 16 }}
            />
            
            <Button
              type="primary"
              size="large"
              block
              loading={loading}
              onClick={handleSubmit}
              disabled={!passcode.trim()}
            >
              Access Studio
            </Button>
          </div>

          <Text type="secondary" style={{ fontSize: 12 }}>
            Professional AI prompt generation tool
          </Text>
        </Space>
      </Card>
    </div>
  )
}
