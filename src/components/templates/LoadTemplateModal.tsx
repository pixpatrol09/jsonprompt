import { useState } from 'react'
import { Modal, Upload, Button, message, Divider, Typography, Space } from 'antd'
import { UploadOutlined, FileOutlined, InboxOutlined } from '@ant-design/icons'
import { usePromptStore } from '../../stores/promptStore'

const { Dragger } = Upload
const { Text, Title } = Typography

interface LoadTemplateModalProps {
  visible: boolean
  onClose: () => void
}

export function LoadTemplateModal({ visible, onClose }: LoadTemplateModalProps) {
  const [loading, setLoading] = useState(false)
  const { importTemplate } = usePromptStore()

  const handleFileUpload = async (file: File) => {
    setLoading(true)
    
    try {
      const fileContent = await file.text()
      const result = importTemplate(fileContent)
      
      if (result.success) {
        message.success('Template imported successfully!')
        onClose()
      } else {
        message.error(result.error || 'Failed to import template')
      }
    } catch (error) {
      message.error('Failed to read file. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const uploadProps = {
    name: 'template',
    multiple: false,
    accept: '.json,.promptstudio',
    beforeUpload: (file: File) => {
      handleFileUpload(file)
      return false // Prevent default upload
    },
    showUploadList: false
  }

  return (
    <Modal
      title="Load Template"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>
      ]}
      width={500}
    >
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <Title level={4} style={{ marginBottom: 8 }}>
          Import Template File
        </Title>
        <Text type="secondary" style={{ marginBottom: 24, display: 'block' }}>
          Load a template file exported from Prompt Studio
        </Text>

        <Dragger {...uploadProps} style={{ marginBottom: 24 }}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined style={{ fontSize: 48, color: '#6366f1' }} />
          </p>
          <p className="ant-upload-text">
            Click or drag template file here
          </p>
          <p className="ant-upload-hint">
            Supports .json and .promptstudio files
          </p>
        </Dragger>

        <Divider>or</Divider>

        <Upload {...uploadProps}>
          <Button 
            icon={<UploadOutlined />} 
            loading={loading}
            size="large"
          >
            Browse Files
          </Button>
        </Upload>

        <div style={{ 
          marginTop: 24, 
          padding: 16, 
          background: '#f8f9fa', 
          borderRadius: 8,
          textAlign: 'left'
        }}>
          <Space direction="vertical" size={8}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <FileOutlined style={{ color: '#6366f1' }} />
              <Text strong>Supported Files:</Text>
            </div>
            <Text type="secondary" style={{ fontSize: 12 }}>
              • Template files exported from Prompt Studio
            </Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              • JSON files with valid template structure
            </Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              • Files with .json or .promptstudio extension
            </Text>
          </Space>
        </div>
      </div>
    </Modal>
  )
}
