import { Layout, Card, Button, Steps, Space } from 'antd'
import { PlayCircleOutlined, FileImageOutlined, RocketOutlined, ArrowRightOutlined, ArrowLeftOutlined, FolderOutlined } from '@ant-design/icons'
import { ThemeProvider } from './components/ThemeProvider'
import { AuthProvider } from './components/AuthProvider'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Header } from './components/Header'
import { BasicInfoForm } from './components/forms/BasicInfoForm'
import { InstructionsForm } from './components/forms/InstructionsForm'
import { ModelLockForm } from './components/forms/ModelLockForm'
import { AdditionalDetailsForm } from './components/forms/AdditionalDetailsForm'
import { ExportForm } from './components/forms/ExportForm'
import { TemplateLibrary } from './components/templates/TemplateLibrary'
import { usePromptStore } from './stores/promptStore'
import type { PromptTemplate } from './data/templates'
import type { UserTemplate } from './stores/promptStore'
import { useState } from 'react'

const { Content } = Layout

const steps = [
  { title: 'Basic Info', icon: <FileImageOutlined /> },
  { title: 'Instructions', icon: <FileImageOutlined /> },
  { title: 'Model Lock', icon: <FileImageOutlined /> },
  { title: 'Details', icon: <FileImageOutlined /> },
  { title: 'Export', icon: <FileImageOutlined /> },
]

function App() {
  const { currentStep, setCurrentStep, updatePromptData } = usePromptStore()
  const [showTemplateLibrary, setShowTemplateLibrary] = useState(false)

  const handleStartCreating = () => {
    setCurrentStep(0)
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSelectTemplate = (template: PromptTemplate | UserTemplate) => {
    // Both template types have data property
    updatePromptData(template.data)
    setCurrentStep(0) // Start from first step with template loaded
  }

  const renderContent = () => {
    if (showTemplateLibrary) {
      return (
        <TemplateLibrary
          onSelectTemplate={handleSelectTemplate}
          onClose={() => setShowTemplateLibrary(false)}
        />
      )
    }

    if (currentStep === -1) {
      return (
        <Card>
          <div className="welcome-section">
            <RocketOutlined style={{ fontSize: 48, color: '#6366f1', marginBottom: 16 }} />
            <h1 className="welcome-title">Prompt Studio</h1>
            <p className="welcome-subtitle">
              Create professional AI prompts for image and video generation with precision and control
            </p>
            
            <div className="feature-grid">
              <Card className="feature-card" size="small">
                <div className="feature-icon">
                  <FileImageOutlined />
                </div>
                <h3 className="feature-title">Image to Image</h3>
                <p className="feature-description">
                  Transform images with precise control over style, composition, and visual elements
                </p>
              </Card>
              
              <Card className="feature-card" size="small">
                <div className="feature-icon video">
                  <PlayCircleOutlined />
                </div>
                <h3 className="feature-title">Image to Video</h3>
                <p className="feature-description">
                  Generate dynamic videos from static images with advanced motion control
                </p>
              </Card>
            </div>
            
            <Space size={16} style={{ marginTop: 32 }}>
              <Button 
                type="primary" 
                size="large" 
                icon={<RocketOutlined />}
                onClick={handleStartCreating}
              >
                Start Creating
              </Button>
              
              <Button 
                size="large" 
                icon={<FolderOutlined />}
                onClick={() => setShowTemplateLibrary(true)}
              >
                Browse Templates
              </Button>
            </Space>
          </div>
        </Card>
      )
    }

    switch (currentStep) {
      case 0:
        return <BasicInfoForm />
      case 1:
        return <InstructionsForm />
      case 2:
        return <ModelLockForm />
      case 3:
        return <AdditionalDetailsForm />
      case 4:
        return <ExportForm />
      default:
        return <div>Step {currentStep + 1} - Coming Soon</div>
    }
  }

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <Layout>
            <Header />
            
            <Content className="app-content">
              <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                {currentStep >= 0 && (
                  <Card style={{ marginBottom: 24 }}>
                    <Steps
                      current={currentStep}
                      items={steps}
                      style={{ marginBottom: 24 }}
                    />
                    
                    <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                      <Space>
                        <Button 
                          onClick={handlePrevious}
                          disabled={currentStep <= 0}
                          icon={<ArrowLeftOutlined />}
                        >
                          Previous
                        </Button>
                        
                        <Button 
                          icon={<FolderOutlined />}
                          onClick={() => setShowTemplateLibrary(true)}
                        >
                          Templates
                        </Button>
                      </Space>
                      
                      <Button 
                        type="primary"
                        onClick={handleNext}
                        disabled={currentStep >= steps.length - 1}
                        icon={<ArrowRightOutlined />}
                      >
                        Next Step
                      </Button>
                    </Space>
                  </Card>
                )}
                
                {renderContent()}
              </div>
            </Content>
          </Layout>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
