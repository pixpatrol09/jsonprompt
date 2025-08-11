import { Card, Button, Space, Typography, message, Divider } from 'antd'
import { DownloadOutlined, CopyOutlined, FileTextOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { usePromptStore } from '../../stores/promptStore'
import SectionTitle from '../ui/SectionTitle'

const { Text, Paragraph } = Typography

export function ExportForm() {
  const { promptData, exportJSON } = usePromptStore()

  const handleCopyJSON = async () => {
    try {
      const jsonString = exportJSON()
      await navigator.clipboard.writeText(jsonString)
      message.success('JSON copied to clipboard!')
    } catch (error) {
      message.error('Failed to copy JSON')
    }
  }

  const handleDownloadJSON = () => {
    try {
      const jsonString = exportJSON()
      const blob = new Blob([jsonString], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `prompt-${Date.now()}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      message.success('JSON file downloaded!')
    } catch (error) {
      message.error('Failed to download JSON')
    }
  }

  const jsonString = exportJSON()

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <Card>
        <SectionTitle
          icon={<FileTextOutlined />}
          title="Export Your Prompt"
          subtitle="Review and export your AI prompt configuration"
        />

        {/* Summary */}
        <div style={{ marginBottom: 32 }}>
          <div className="export-summary" style={{ 
            background: '#f8f9fa', 
            padding: 20, 
            borderRadius: 8,
            border: '1px solid #e9ecef'
          }}>
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckCircleOutlined style={{ color: '#10b981' }} />
                <Text strong>Task:</Text>
                <Text>{promptData.task || 'Not specified'}</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckCircleOutlined style={{ color: '#10b981' }} />
                <Text strong>Integration Style:</Text>
                <Text>{promptData.instructions?.integration_style || 'Not specified'}</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckCircleOutlined style={{ color: '#10b981' }} />
                <Text strong>Visual Style:</Text>
                <Text>{promptData.additional_details?.visual_style || 'Not specified'}</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckCircleOutlined style={{ color: '#10b981' }} />
                <Text strong>Output Resolution:</Text>
                <Text>{promptData.instructions?.output_resolution || 'Not specified'}</Text>
              </div>
            </Space>
          </div>
        </div>

        <Divider />

        {/* JSON Preview */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: 12 
          }}>
            <Text strong style={{ fontSize: 16 }}>
              JSON Preview
            </Text>
            <Space size={8}>
              <Button
                type="text"
                icon={<CopyOutlined />}
                onClick={handleCopyJSON}
                size="small"
                style={{ 
                  color: '#8c8c8c',
                  border: 'none',
                  boxShadow: 'none'
                }}
                title="Copy JSON"
              />
              <Button
                type="text"
                icon={<DownloadOutlined />}
                onClick={handleDownloadJSON}
                size="small"
                style={{ 
                  color: '#8c8c8c',
                  border: 'none',
                  boxShadow: 'none'
                }}
                title="Download JSON"
              />
            </Space>
          </div>
          <div className="json-preview" style={{
            background: '#f6f8fa',
            border: '1px solid #d0d7de',
            borderRadius: 8,
            padding: 16,
            maxHeight: 400,
            overflow: 'auto',
            fontFamily: 'Monaco, Consolas, "Courier New", monospace',
            fontSize: 12,
            lineHeight: 1.5
          }}>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {jsonString}
            </pre>
          </div>
        </div>

        {/* Export Actions */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            Click the icons above to copy or download your prompt
          </Text>
        </div>

        <Divider />

        {/* Usage Instructions */}
        <div style={{ textAlign: 'center' }}>
          <Text type="secondary">
            <Paragraph style={{ marginBottom: 8 }}>
              Use this JSON with AI image generation tools like:
            </Paragraph>
            <Text strong>Flux, Kling, Midjourney, DALL-E, Stable Diffusion</Text>
            <Paragraph style={{ marginTop: 8, marginBottom: 0 }}>
              Copy the JSON or download the file to use with your preferred AI platform
            </Paragraph>
          </Text>
        </div>
      </Card>
    </div>
  )
}
