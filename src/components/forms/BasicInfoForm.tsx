import { Form, Input, Select, Card, Typography, Tooltip, Space, Radio } from 'antd'
import { InfoCircleOutlined, PictureOutlined, BgColorsOutlined, PlusOutlined } from '@ant-design/icons'
import { usePromptStore } from '../../stores/promptStore'
import SectionTitle from '../ui/SectionTitle'

const { TextArea } = Input
const { Title, Text } = Typography
const { Option } = Select

const taskOptions = [
  { value: 'background_integration', label: 'Background Integration', desc: 'Replace or modify image background' },
  { value: 'style_transfer', label: 'Style Transfer', desc: 'Apply artistic style to image' },
  { value: 'object_replacement', label: 'Object Replacement', desc: 'Replace objects in the image' },
  { value: 'enhancement', label: 'Enhancement', desc: 'Improve image quality and details' },
  { value: 'composition', label: 'Composition', desc: 'Modify image composition and layout' },
]

const fidelityPresets = [
  'Outfit must be exactly the same, pose is maintained, and the original model\'s face, race, and skin tone must remain exactly as provided.',
  'Preserve all original elements while allowing minor stylistic adjustments for better integration.',
  'Maintain core subject identity with flexibility for artistic interpretation.',
  'Focus on technical accuracy over creative interpretation.',
]

export function BasicInfoForm() {
  const { promptData, updatePromptData } = usePromptStore()
  const [form] = Form.useForm()

  const handleFormChange = (changedFields: any, allFields: any) => {
    const formData = form.getFieldsValue()
    updatePromptData(formData)
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <Card>
        <SectionTitle
          icon={<PictureOutlined />}
          title="Basic Information"
          subtitle="Define the core parameters for your AI prompt generation"
        />

        <Form
          form={form}
          layout="vertical"
          initialValues={promptData}
          onFieldsChange={handleFormChange}
          size="large"
        >
          <Form.Item
            name="task"
            label={
              <Space>
                Task Type
                <Tooltip title="Select the primary transformation you want to apply to your image">
                  <InfoCircleOutlined style={{ color: '#8c8c8c' }} />
                </Tooltip>
              </Space>
            }
            rules={[{ required: true, message: 'Please select a task type' }]}
          >
            <Select 
              placeholder="Choose your transformation type"
              dropdownStyle={{ padding: '8px 0' }}
              showSearch
              optionFilterProp="children"
            >
              {taskOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  <div className="custom-option">
                    <div className="custom-option-title">{option.label}</div>
                    <div className="custom-option-desc">{option.desc}</div>
                  </div>
                </Option>
              ))}
              <Option key="custom" value="">
                <div className="custom-option">
                  <div className="custom-option-title">
                    <PlusOutlined style={{ marginRight: 8 }} />
                    Custom Task
                  </div>
                  <div className="custom-option-desc">Define your own transformation type</div>
                </div>
              </Option>
            </Select>
          </Form.Item>

          {form.getFieldValue('task') === '' && (
            <Form.Item
              name="custom_task"
              label="Custom Task Description"
              rules={[{ required: true, message: 'Please describe your custom task' }]}
            >
              <Input 
                placeholder="Describe your custom transformation task..."
                style={{ marginTop: -16 }}
              />
            </Form.Item>
          )}

          <Form.Item
            name="input_image"
            label={
              <Space>
                Input Image Description
                <Tooltip title="Describe your source image in detail - this helps the AI understand what it's working with">
                  <InfoCircleOutlined style={{ color: '#8c8c8c' }} />
                </Tooltip>
              </Space>
            }
            rules={[{ required: true, message: 'Please describe your input image' }]}
          >
            <Input 
              placeholder="e.g., Portrait of a woman in casual clothing against white background"
              prefix={<PictureOutlined style={{ color: '#8c8c8c' }} />}
            />
          </Form.Item>

          <Form.Item
            name="background_description"
            label={
              <Space>
                Target Background/Scene
                <Tooltip title="Describe the desired background or scene you want to integrate with your subject">
                  <InfoCircleOutlined style={{ color: '#8c8c8c' }} />
                </Tooltip>
              </Space>
            }
            rules={[{ required: true, message: 'Please describe the target background' }]}
          >
            <TextArea
              rows={4}
              placeholder="Describe your desired background in detail - lighting, environment, mood, colors, architectural elements, etc."
              style={{ resize: 'vertical' }}
            />
          </Form.Item>

          <Form.Item
            name="fidelity_priority"
            label={
              <Space>
                Fidelity Priority
                <Tooltip title="Define how strictly the AI should preserve the original subject's characteristics">
                  <InfoCircleOutlined style={{ color: '#8c8c8c' }} />
                </Tooltip>
              </Space>
            }
            rules={[{ required: true, message: 'Please set fidelity priority' }]}
          >
            <Radio.Group style={{ width: '100%' }}>
              <Space direction="vertical" style={{ width: '100%' }} size={16}>
                {fidelityPresets.map((preset, index) => (
                  <Radio key={index} value={preset} style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start',
                    whiteSpace: 'normal',
                    lineHeight: 1.4,
                    padding: '12px',
                    border: '1px solid #f0f0f0',
                    borderRadius: '8px',
                    margin: 0
                  }}>
                    <span style={{ 
                      marginLeft: 8, 
                      lineHeight: 1.4,
                      fontSize: 14
                    }}>
                      {preset}
                    </span>
                  </Radio>
                ))}
                <Radio value="" style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start',
                  whiteSpace: 'normal',
                  lineHeight: 1.4,
                  padding: '12px',
                  border: '1px solid #f0f0f0',
                  borderRadius: '8px',
                  margin: 0
                }}>
                  <span style={{ 
                    marginLeft: 8, 
                    lineHeight: 1.4,
                    fontSize: 14,
                    fontWeight: 500
                  }}>
                    <PlusOutlined style={{ marginRight: 8 }} />
                    Custom Fidelity Rule
                  </span>
                </Radio>
              </Space>
            </Radio.Group>
          </Form.Item>

          {form.getFieldValue('fidelity_priority') === '' && (
            <Form.Item
              name="custom_fidelity"
              label="Custom Fidelity Priority"
              rules={[{ required: true, message: 'Please describe your custom fidelity rules' }]}
            >
              <TextArea
                rows={3}
                placeholder="Describe your custom preservation rules and priorities..."
                style={{ marginTop: -16, resize: 'vertical' }}
              />
            </Form.Item>
          )}
        </Form>
      </Card>
    </div>
  )
}
