import { useState } from 'react'
import { Card, Row, Col, Button, Tag, Input, Select, Space, Typography, message } from 'antd'
import { SearchOutlined, BookOutlined, StarOutlined, DownloadOutlined } from '@ant-design/icons'
import { PRESET_TEMPLATES, TEMPLATE_CATEGORIES } from '../../data/templates'
import type { PromptTemplate } from '../../data/templates'
import { usePromptStore } from '../../stores/promptStore'
import SectionTitle from '../ui/SectionTitle'

const { Text, Title } = Typography
const { Option } = Select

interface TemplateLibraryProps {
  onSelectTemplate: (template: PromptTemplate) => void
  onClose: () => void
}

export function TemplateLibrary({ onSelectTemplate, onClose }: TemplateLibraryProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const { savePreset } = usePromptStore()

  const filteredTemplates = PRESET_TEMPLATES.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const handleUseTemplate = (template: PromptTemplate) => {
    onSelectTemplate(template)
    message.success(`Template "${template.name}" loaded successfully!`)
    onClose()
  }

  const handleSaveAsPreset = (template: PromptTemplate) => {
    savePreset(template.name, template.data)
    message.success(`Template saved as preset: "${template.name}"`)
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <Card>
        <SectionTitle
          icon={<BookOutlined />}
          title="Template Library"
          subtitle="Choose from professional prompt templates or save your own"
        />

        {/* Search and Filter */}
        <div style={{ marginBottom: 24 }}>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={8}>
              <Input
                placeholder="Search templates..."
                prefix={<SearchOutlined />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                allowClear
              />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Select
                style={{ width: '100%' }}
                placeholder="Filter by category"
                value={selectedCategory}
                onChange={setSelectedCategory}
              >
                <Option value="all">All Categories</Option>
                {TEMPLATE_CATEGORIES.map(category => (
                  <Option key={category.key} value={category.key}>
                    {category.icon} {category.label}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} sm={24} md={8}>
              <Text type="secondary">
                {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} found
              </Text>
            </Col>
          </Row>
        </div>

        {/* Template Grid */}
        <Row gutter={[16, 16]}>
          {filteredTemplates.map(template => {
            const category = TEMPLATE_CATEGORIES.find(cat => cat.key === template.category)
            
            return (
              <Col xs={24} sm={12} lg={8} key={template.id}>
                <Card
                  size="small"
                  hoverable
                  style={{ height: '100%' }}
                  actions={[
                    <Button
                      key="use"
                      type="primary"
                      size="small"
                      onClick={() => handleUseTemplate(template)}
                    >
                      Use Template
                    </Button>,
                    <Button
                      key="save"
                      type="text"
                      size="small"
                      icon={<DownloadOutlined />}
                      onClick={() => handleSaveAsPreset(template)}
                    >
                      Save
                    </Button>
                  ]}
                >
                  <div style={{ marginBottom: 12 }}>
                    <Space align="start" style={{ width: '100%', justifyContent: 'space-between' }}>
                      <Title level={5} style={{ margin: 0, lineHeight: 1.2 }}>
                        {template.name}
                      </Title>
                      <Tag color="purple" style={{ margin: 0 }}>
                        {category?.icon} {category?.label}
                      </Tag>
                    </Space>
                  </div>

                  <Text type="secondary" style={{ 
                    fontSize: 12, 
                    lineHeight: 1.4,
                    display: 'block',
                    marginBottom: 12
                  }}>
                    {template.description}
                  </Text>

                  <div style={{ marginBottom: 8 }}>
                    <Space size={4} wrap>
                      {template.tags.slice(0, 3).map(tag => (
                        <Tag key={tag} style={{ fontSize: 10 }}>
                          {tag}
                        </Tag>
                      ))}
                      {template.tags.length > 3 && (
                        <Tag style={{ fontSize: 10 }}>
                          +{template.tags.length - 3}
                        </Tag>
                      )}
                    </Space>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text type="secondary" style={{ fontSize: 10 }}>
                      by {template.author}
                    </Text>
                    <Space size={4}>
                      <StarOutlined style={{ color: '#faad14', fontSize: 12 }} />
                      <Text style={{ fontSize: 10 }}>Featured</Text>
                    </Space>
                  </div>
                </Card>
              </Col>
            )
          })}
        </Row>

        {filteredTemplates.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px 20px',
            color: '#8c8c8c'
          }}>
            <BookOutlined style={{ fontSize: 48, marginBottom: 16 }} />
            <Title level={4} type="secondary">No templates found</Title>
            <Text type="secondary">
              Try adjusting your search terms or category filter
            </Text>
          </div>
        )}

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <Button onClick={onClose}>
            Close Library
          </Button>
        </div>
      </Card>
    </div>
  )
}
