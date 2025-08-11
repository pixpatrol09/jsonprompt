import React from 'react'
import { Result, Button } from 'antd'
import { BugOutlined } from '@ant-design/icons'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    
    // In production, you might want to send this to an error reporting service
    if (import.meta.env.PROD) {
      // Example: sendErrorToService(error, errorInfo)
    }
  }

  handleReload = () => {
    window.location.reload()
  }

  handleReset = () => {
    // Clear localStorage and reset
    localStorage.clear()
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '20px'
        }}>
          <Result
            status="error"
            icon={<BugOutlined style={{ color: '#ff4d4f' }} />}
            title="Something went wrong"
            subTitle="We're sorry, but something unexpected happened. Please try refreshing the page."
            extra={[
              <Button type="primary" key="reload" onClick={this.handleReload}>
                Reload Page
              </Button>,
              <Button key="reset" onClick={this.handleReset}>
                Reset Application
              </Button>
            ]}
          >
            {!import.meta.env.PROD && this.state.error && (
              <div style={{ 
                textAlign: 'left', 
                background: '#f5f5f5', 
                padding: '16px', 
                borderRadius: '4px',
                marginTop: '16px',
                fontSize: '12px',
                fontFamily: 'monospace'
              }}>
                <strong>Error Details (Development Only):</strong>
                <pre style={{ margin: '8px 0 0 0', whiteSpace: 'pre-wrap' }}>
                  {this.state.error.stack}
                </pre>
              </div>
            )}
          </Result>
        </div>
      )
    }

    return this.props.children
  }
}
