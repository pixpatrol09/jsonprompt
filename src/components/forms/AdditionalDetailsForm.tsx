import { Form, Input, Select, Card, Row, Col, Tooltip, Space } from 'antd'
import { StarOutlined, InfoCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { usePromptStore } from '../../stores/promptStore'
import SectionTitle from '../ui/SectionTitle'

const { TextArea } = Input
const { Option } = Select

const visualStyles = [
  'Editorial, cinematic, with a focus on dynamic athletic posture',
  'Fashion editorial with high-end commercial appeal',
  'Lifestyle photography with natural, candid feel',
  'Portrait photography with professional studio quality',
  'Street photography with urban, authentic vibe',
  'Fine art photography with artistic composition',
  'Commercial product photography style',
  'Documentary photography with journalistic approach'
]

const lightingOptions = [
  'Natural midday with soft shadows blending seamlessly into background',
  'Golden hour warm lighting with dramatic shadows',
  'Studio lighting with controlled highlights and shadows',
  'Overcast natural lighting with even illumination',
  'Dramatic side lighting with strong contrast',
  'Soft window lighting with gentle shadows',
  'Professional portrait lighting setup',
  'Ambient environmental lighting'
]

const integrationPriorities = [
  'Scene realism must not override model or product accuracy',
  'Balance between scene integration and subject preservation',
  'Prioritize artistic vision over technical accuracy',
  'Focus on seamless background integration',
  'Maintain commercial photography standards',
  'Emphasize creative interpretation and style'
]

export function AdditionalDetailsForm() {
  const { promptData, updatePromptData } = usePromptStore()
  const [form] = Form.useForm()

  const handleFormChange = () => {
    const formData = form.getFieldsValue()
    updatePromptData({
      additional_details: {
        ...promptData.additional_details,
        ...formData
      }
    })
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <Card>
        <SectionTitle
          icon={<StarOutlined />}
          title="Additional Details"
          subtitle="Fine-tune the artistic and technical aspects of your prompt"
        />

        <Form
          form={form}
          layout="vertical"
          initialValues={promptData.additional_details}
          onValuesChange={handleFormChange}
          size="large"
        >
          <Row gutter={[24, 0]}>
            <Col span={24}>
              <Form.Item
                name="visual_style"
                label={
                  <Space>
                    Visual Style
                    <Tooltip title="Define the overall aesthetic and photographic style">
                      <InfoCircleOutlined style={{ color: '#8c8c8c' }} />
                    </Tooltip>
                  </Space>
                }
                rules={[{ required: true, message: 'Please select or define visual style' }]}
              >
                <Select 
                  placeholder="Choose visual style or create custom"
                  dropdownStyle={{ padding: '8px 0' }}
                >
                  {visualStyles.map((style, index) => (
                    <Option key={index} value={style}>
                      <div style={{ 
                        whiteSpace: 'normal', 
                        lineHeight: 1.4, 
                        padding: '4px 0' 
                      }}>
                        {style}
                      </div>
                    </Option>
                  ))}
                  <Option key="custom" value="">
                    <div className="custom-option">
                      <div className="custom-option-title">
                        <PlusOutlined style={{ marginRight: 8 }} />
                        Custom Visual Style
                      </div>
                      <div className="custom-option-desc">Define your own visual aesthetic</div>
                    </div>
                  </Option>
                </Select>
              </Form.Item>

              {form.getFieldValue('visual_style') === '' && (
                <Form.Item
                  name="custom_visual_style"
                  label="Custom Visual Style"
                  rules={[{ required: true, message: 'Please describe your custom visual style' }]}
                >
                  <TextArea
                    rows={3}
                    placeholder="Describe your desired visual style, aesthetic, and photographic approach..."
                    style={{ marginTop: -16, resize: 'vertical' }}
                  />
                </Form.Item>
              )}
            </Col>

            <Col span={24}>
              <Form.Item
                name="lighting"
                label={
                  <Space>
                    Lighting Description
                    <Tooltip title="Specify the lighting conditions and mood">
                      <InfoCircleOutlined style={{ color: '#8c8c8c' }} />
                    </Tooltip>
                  </Space>
                }
                rules={[{ required: true, message: 'Please select or define lighting' }]}
              >
                <Select 
                  placeholder="Choose lighting setup or create custom"
                  dropdownStyle={{ padding: '8px 0' }}
                >
                  {lightingOptions.map((lighting, index) => (
                    <Option key={index} value={lighting}>
                      <div style={{ 
                        whiteSpace: 'normal', 
                        lineHeight: 1.4, 
                        padding: '4px 0' 
                      }}>
                        {lighting}
                      </div>
                    </Option>
                  ))}
                  <Option key="custom" value="">
                    <div className="custom-option">
                      <div className="custom-option-title">
                        <PlusOutlined style={{ marginRight: 8 }} />
                        Custom Lighting
                      </div>
                      <div className="custom-option-desc">Define your own lighting setup</div>
                    </div>
                  </Option>
                </Select>
              </Form.Item>

              {form.getFieldValue('lighting') === '' && (
                <Form.Item
                  name="custom_lighting"
                  label="Custom Lighting Description"
                  rules={[{ required: true, message: 'Please describe your custom lighting' }]}
                >
                  <TextArea
                    rows={3}
                    placeholder="Describe your desired lighting conditions, direction, intensity, and mood..."
                    style={{ marginTop: -16, resize: 'vertical' }}
                  />
                </Form.Item>
              )}
            </Col>

            <Col span={24}>
              <Form.Item
                name="integration_priority"
                label={
                  <Space>
                    Integration Priority
                    <Tooltip title="Define the balance between realism and creative interpretation">
                      <InfoCircleOutlined style={{ color: '#8c8c8c' }} />
                    </Tooltip>
                  </Space>
                }
                rules={[{ required: true, message: 'Please select or define integration priority' }]}
              >
                <Select 
                  placeholder="Choose integration approach or create custom"
                  dropdownStyle={{ padding: '8px 0' }}
                >
                  {integrationPriorities.map((priority, index) => (
                    <Option key={index} value={priority}>
                      <div style={{ 
                        whiteSpace: 'normal', 
                        lineHeight: 1.4, 
                        padding: '4px 0' 
                      }}>
                        {priority}
                      </div>
                    </Option>
                  ))}
                  <Option key="custom" value="">
                    <div className="custom-option">
                      <div className="custom-option-title">
                        <PlusOutlined style={{ marginRight: 8 }} />
                        Custom Priority
                      </div>
                      <div className="custom-option-desc">Define your own integration approach</div>
                    </div>
                  </Option>
                </Select>
              </Form.Item>

              {form.getFieldValue('integration_priority') === '' && (
                <Form.Item
                  name="custom_integration_priority"
                  label="Custom Integration Priority"
                  rules={[{ required: true, message: 'Please describe your custom integration priority' }]}
                >
                  <TextArea
                    rows={3}
                    placeholder="Describe your approach to balancing realism, creativity, and technical accuracy..."
                    style={{ marginTop: -16, resize: 'vertical' }}
                  />
                </Form.Item>
              )}
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  )
}
