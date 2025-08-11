import { useState } from 'react'
import { Modal, Form, Input, Select, Tag, Button, Space, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { TEMPLATE_CATEGORIES } from '../../data/templates'
import { usePromptStore } from '../../stores/promptStore'

const { TextArea } = Input
const { Option } = Select

interface SaveTemplateModalProps {
  visible: boolean
  onClose: () => void
}

export function SaveTemplateModal({ visible, onClose }: SaveTemplateModalProps) {
  const [form] = Form.useForm()
  const [tags, setTags] = useState<string[]>([])
  const [inputTag, setInputTag] = useState('')
  const { saveAsTemplate } = usePromptStore()

  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      
      saveAsTemplate({
        name: values.name,
        description: values.description,
        category: values.category,
        tags: tags
      })

      message.success('Template saved successfully!')
      handleClose()
    } catch (error) {
      console.error('Validation failed:', error)
    }
  }

  const handleClose = () => {
    form.resetFields()
    setTags([])
    setInputTag('')
    onClose()
  }

  const handleAddTag = () => {
    if (inputTag && !tags.includes(inputTag)) {
      setTags([...tags, inputTag])
      setInputTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    }
  }

  return (
    <Modal
      title="Save as Template"
      open={visible}
      onCancel={handleClose}
      footer={[
        <Button key="cancel" onClick={handleClose}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Save Template
        </Button>
      ]}
      width={500}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          category: 'custom'
        }}
      >
        <Form.Item
          name="name"
          label="Template Name"
          rules={[{ required: true, message: 'Please enter a template name' }]}
        >
          <Input placeholder="e.g., Fashion Editorial Studio" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter a description' }]}
        >
          <TextArea 
            rows={3} 
            placeholder="Describe what this template is used for..."
          />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: 'Please select a category' }]}
        >
          <Select placeholder="Select category">
            {TEMPLATE_CATEGORIES.map(category => (
              <Option key={category.key} value={category.key}>
                {category.icon} {category.label}
              </Option>
            ))}
            <Option value="custom">🎨 Custom</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Tags">
          <div style={{ marginBottom: 8 }}>
            <Space size={4} wrap>
              {tags.map(tag => (
                <Tag
                  key={tag}
                  closable
                  onClose={() => handleRemoveTag(tag)}
                  style={{ marginBottom: 4 }}
                >
                  {tag}
                </Tag>
              ))}
            </Space>
          </div>
          
          <Input
            placeholder="Add tags (press Enter)"
            value={inputTag}
            onChange={(e) => setInputTag(e.target.value)}
            onKeyPress={handleKeyPress}
            suffix={
              <Button
                type="text"
                size="small"
                icon={<PlusOutlined />}
                onClick={handleAddTag}
                disabled={!inputTag}
              />
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
