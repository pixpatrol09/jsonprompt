import React, { useState, useEffect } from 'react'
import { Card, Input, Button, Typography, Space, message } from 'antd'
import { LockOutlined, SafetyOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

// Use environment variable or fallback for development
const PASSCODE = import.meta.env.VITE_APP_PASSCODE || 'blinkDEL19'
const AUTH_KEY = 'prompt-studio-auth'
const MAX_ATTEMPTS = 5
const LOCKOUT_TIME = 15 * 60 * 1000 // 15 minutes

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [loading, setLoading] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const [lockoutEnd, setLockoutEnd] = useState<number | null>(null)

  useEffect(() => {
    // Check if user is already authenticated
    const savedAuth = localStorage.getItem(AUTH_KEY)
    if (savedAuth === 'true') {
      setIsAuthenticated(true)
    }

    // Check for existing lockout
    const lockoutData = localStorage.getItem('auth-lockout')
    if (lockoutData) {
      const { endTime, attemptCount } = JSON.parse(lockoutData)
      if (Date.now() < endTime) {
        setIsLocked(true)
        setLockoutEnd(endTime)
        setAttempts(attemptCount)
      } else {
        localStorage.removeItem('auth-lockout')
      }
    }
  }, [])

  useEffect(() => {
    if (isLocked && lockoutEnd) {
      const timer = setInterval(() => {
        if (Date.now() >= lockoutEnd) {
          setIsLocked(false)
          setLockoutEnd(null)
          setAttempts(0)
          localStorage.removeItem('auth-lockout')
          clearInterval(timer)
        }
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [isLocked, lockoutEnd])

  const handleSubmit = () => {
    if (isLocked) {
      message.error('Too many failed attempts. Please wait.')
      return
    }

    setLoading(true)
    
    setTimeout(() => {
      if (passcode === PASSCODE) {
        localStorage.setItem(AUTH_KEY, 'true')
        localStorage.removeItem('auth-lockout')
        setIsAuthenticated(true)
        setAttempts(0)
        message.success('Access granted!')
      } else {
        const newAttempts = attempts + 1
        setAttempts(newAttempts)
        
        if (newAttempts >= MAX_ATTEMPTS) {
          const lockoutEndTime = Date.now() + LOCKOUT_TIME
          setIsLocked(true)
          setLockoutEnd(lockoutEndTime)
          localStorage.setItem('auth-lockout', JSON.stringify({
            endTime: lockoutEndTime,
            attemptCount: newAttempts
          }))
          message.error(`Too many failed attempts. Locked for 15 minutes.`)
        } else {
          message.error(`Invalid passcode. ${MAX_ATTEMPTS - newAttempts} attempts remaining.`)
        }
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
              prefix={<SafetyOutlined style={{ color: '#8c8c8c' }} />}
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
