import { Form, Switch, Select, Card, Row, Col, Tooltip, Space } from 'antd'
import { SettingOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { usePromptStore } from '../../stores/promptStore'
import SectionTitle from '../ui/SectionTitle'

const { Option } = Select

const integrationStyles = [
  'photorealistic',
  'artistic',
  'cinematic',
  'editorial',
  'commercial',
  'lifestyle',
  'fashion',
  'portrait'
]

const colorGradingOptions = [
  'match background',
  'warm tone',
  'cool tone',
  'neutral',
  'high contrast',
  'soft contrast',
  'vintage',
  'modern'
]

const resolutionOptions = [
  'same_as_input',
  '1024x1024',
  '1280x720',
  '1920x1080',
  '2048x2048',
  '4096x4096'
]

export function InstructionsForm() {
  const { promptData, updatePromptData } = usePromptStore()
  const [form] = Form.useForm()

  const handleFormChange = () => {
    const formData = form.getFieldsValue()
    updatePromptData({
      instructions: {
        ...promptData.instructions,
        ...formData
      }
    })
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <Card>
        <SectionTitle
          icon={<SettingOutlined />}
          title="Instructions & Settings"
          subtitle="Configure how the AI should process and transform your image"
        />

        <Form
          form={form}
          layout="vertical"
          initialValues={promptData.instructions}
          onValuesChange={handleFormChange}
          size="large"
        >
          {/* Preservation Settings */}
          <div style={{ marginBottom: 32 }}>
            <h4 style={{ marginBottom: 16, fontWeight: 600 }}>Preservation Controls</h4>
            <Row gutter={[24, 16]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="preserve_subject"
                  label={
                    <Space>
                      Preserve Subject
                      <Tooltip title="Keep the main subject exactly as it appears in the original">
                        <InfoCircleOutlined style={{ color: '#8c8c8c' }} />
                      </Tooltip>
                    </Space>
                  }
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  name="preserve_details"
                  label={
                    <Space>
                      Preserve Details
                      <Tooltip title="Maintain fine details and textures from the original image">
                        <InfoCircleOutlined style={{ color: '#8c8c8c' }} />
                      </Tooltip>
                    </Space>
                  }
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  name="pose_locked"
                  label={
                    <Space>
                      Lock Pose
                      <Tooltip title="Prevent any changes to the subject's pose or position">
                        <InfoCircleOutlined style={{ color: '#8c8c8c' }} />
                      </Tooltip>
                    </Space>
                  }
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  name="no_face_or_garment_modification"
                  label={
                    <Space>
                      No Face/Garment Changes
                      <Tooltip title="Strictly preserve facial features and clothing">
                        <InfoCircleOutlined style={{ color: '#8c8c8c' }} />
                      </Tooltip>
                    </Space>
                  }
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
            </Row>
          </div>

          {/* Style & Integration */}
          <div style={{ marginBottom: 32 }}>
            <h4 style={{ marginBottom: 16, fontWeight: 600 }}>Style & Integration</h4>
            <Row gutter={[24, 16]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="integration_style"
                  label="Integration Style"
                  rules={[{ required: true, message: 'Please select integration style' }]}
                >
                  <Select placeholder="Choose integration style">
                    {integrationStyles.map(style => (
                      <Option key={style} value={style}>
                        {style.charAt(0).toUpperCase() + style.slice(1)}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  name="color_grading"
                  label="Color Grading"
                  rules={[{ required: true, message: 'Please select color grading' }]}
                >
                  <Select placeholder="Choose color grading">
                    {colorGradingOptions.map(option => (
                      <Option key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  name="output_resolution"
                  label="Output Resolution"
                  rules={[{ required: true, message: 'Please select output resolution' }]}
                >
                  <Select placeholder="Choose output resolution">
                    {resolutionOptions.map(res => (
                      <Option key={res} value={res}>
                        {res.replace('_', ' ').toUpperCase()}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  name="scale_and_alignment"
                  label="Scale & Alignment"
                  rules={[{ required: true, message: 'Please specify scale and alignment' }]}
                >
                  <Select placeholder="Choose scale and alignment">
                    <Option value="match original proportions and placement">Match Original</Option>
                    <Option value="center and scale to fit">Center & Scale to Fit</Option>
                    <Option value="fill frame maintaining aspect ratio">Fill Frame</Option>
                    <Option value="custom positioning">Custom Positioning</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </div>

          {/* Lighting & Effects */}
          <div style={{ marginBottom: 32 }}>
            <h4 style={{ marginBottom: 16, fontWeight: 600 }}>Lighting & Effects</h4>
            <Row gutter={[24, 16]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="lighting_match"
                  label={
                    <Space>
                      Match Lighting
                      <Tooltip title="Adjust subject lighting to match the background scene">
                        <InfoCircleOutlined style={{ color: '#8c8c8c' }} />
                      </Tooltip>
                    </Space>
                  }
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  name="shadow_blending"
                  label={
                    <Space>
                      Shadow Blending
                      <Tooltip title="Create realistic shadows that blend with the background">
                        <InfoCircleOutlined style={{ color: '#8c8c8c' }} />
                      </Tooltip>
                    </Space>
                  }
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
            </Row>
          </div>

          {/* Product & Brand Controls */}
          <div style={{ marginBottom: 32 }}>
            <h4 style={{ marginBottom: 16, fontWeight: 600 }}>Product & Brand Controls</h4>
            <Row gutter={[24, 16]}>
              <Col xs={24}>
                <Form.Item
                  name="logos"
                  label={
                    <Space>
                      Logo Preservation
                      <Tooltip title="How to handle logos and brand elements">
                        <InfoCircleOutlined style={{ color: '#8c8c8c' }} />
                      </Tooltip>
                    </Space>
                  }
                  rules={[{ required: true, message: 'Please specify logo handling' }]}
                >
                  <Input 
                    placeholder="e.g., Preserve original logo shape, size, and position"
                    defaultValue="Preserve original logo shape, size, and position"
                  />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item
                  name="product_features"
                  label={
                    <Space>
                      Product Features
                      <Tooltip title="Specify how product details should be preserved">
                        <InfoCircleOutlined style={{ color: '#8c8c8c' }} />
                      </Tooltip>
                    </Space>
                  }
                  rules={[{ required: true, message: 'Please specify product feature handling' }]}
                >
                  <Input 
                    placeholder="e.g., Preserve garment material, color, fit, silhouette, and texture"
                    defaultValue="Preserve garment material, color, fit, silhouette, and texture. No hallucinations or alterations."
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
        </Form>
      </Card>
    </div>
  )
}
