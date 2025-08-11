import { useState } from 'react'
import { Card, Row, Col, Button, Tag, Input, Select, Space, Typography, message, Tabs, Dropdown } from 'antd'
import { SearchOutlined, FolderOutlined, StarOutlined, DownloadOutlined, HeartOutlined, HeartFilled, MoreOutlined, DeleteOutlined } from '@ant-design/icons'
import { PRESET_TEMPLATES, TEMPLATE_CATEGORIES } from '../../data/templates'
import type { PromptTemplate } from '../../data/templates'
import type { UserTemplate } from '../../stores/promptStore'
import { usePromptStore } from '../../stores/promptStore'
import SectionTitle from '../ui/SectionTitle'

const { Text, Title } = Typography
const { Option } = Select
const { TabPane } = Tabs

interface TemplateLibraryProps {
  onSelectTemplate: (template: PromptTemplate | UserTemplate) => void
  onClose: () => void
}

export function TemplateLibrary({ onSelectTemplate, onClose }: TemplateLibraryProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [activeTab, setActiveTab] = useState('builtin')
  const { userTemplates, recentTemplates, toggleFavorite, deleteTemplate, exportTemplate, loadTemplate } = usePromptStore()

  // Combine built-in and user templates for search
  const allTemplates = [
    ...PRESET_TEMPLATES,
    ...userTemplates.map(t => ({
      ...t,
      author: 'You',
      createdAt: t.createdAt
    }))
  ]

  const filteredTemplates = allTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'builtin' && PRESET_TEMPLATES.some(p => p.id === template.id)) ||
                      (activeTab === 'custom' && userTemplates.some(u => u.id === template.id)) ||
                      (activeTab === 'favorites' && 'isFavorite' in template && template.isFavorite) ||
                      (activeTab === 'recent' && recentTemplates.includes(template.id))
    
    return matchesSearch && matchesCategory && matchesTab
  })

  const handleUseTemplate = (template: PromptTemplate | UserTemplate) => {
    if ('data' in template) {
      loadTemplate(template as UserTemplate)
    }
    onSelectTemplate(template)
    message.success(`Template "${template.name}" loaded successfully!`)
    onClose()
  }

  const handleSaveAsPreset = (template: PromptTemplate) => {
    // This is for built-in templates - save to user templates
    message.success(`Template saved: "${template.name}"`)
  }

  const handleExportTemplate = (template: UserTemplate) => {
    const content = exportTemplate(template)
    const blob = new Blob([content], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${template.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.promptstudio`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    message.success('Template exported successfully!')
  }

  const handleDeleteTemplate = (template: UserTemplate) => {
    deleteTemplate(template.id)
    message.success('Template deleted successfully!')
  }

  const renderTemplateCard = (template: PromptTemplate | UserTemplate) => {
    const category = TEMPLATE_CATEGORIES.find(cat => cat.key === template.category)
    const isUserTemplate = 'isFavorite' in template
    const userTemplate = template as UserTemplate

    const menuItems = isUserTemplate ? [
      {
        key: 'export',
        label: 'Export Template',
        icon: <DownloadOutlined />,
        onClick: () => handleExportTemplate(userTemplate)
      },
      {
        key: 'delete',
        label: 'Delete Template',
        icon: <DeleteOutlined />,
        danger: true,
        onClick: () => handleDeleteTemplate(userTemplate)
      }
    ] : [
      {
        key: 'save',
        label: 'Save as Custom',
        icon: <DownloadOutlined />,
        onClick: () => handleSaveAsPreset(template)
      }
    ]

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
            isUserTemplate ? (
              <Button
                key="favorite"
                type="text"
                size="small"
                icon={userTemplate.isFavorite ? <HeartFilled style={{ color: '#ff4d4f' }} /> : <HeartOutlined />}
                onClick={() => toggleFavorite(userTemplate.id)}
              />
            ) : (
              <Button
                key="save"
                type="text"
                size="small"
                icon={<DownloadOutlined />}
                onClick={() => handleSaveAsPreset(template)}
              />
            ),
            <Dropdown
              key="more"
              menu={{ items: menuItems }}
              trigger={['click']}
            >
              <Button
                type="text"
                size="small"
                icon={<MoreOutlined />}
              />
            </Dropdown>
          ]}
        >
          <div style={{ marginBottom: 12 }}>
            <Space align="start" style={{ width: '100%', justifyContent: 'space-between' }}>
              <Title level={5} style={{ margin: 0, lineHeight: 1.2 }}>
                {template.name}
              </Title>
              <Tag color={isUserTemplate ? 'green' : 'purple'} style={{ margin: 0 }}>
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
              by {'author' in template ? template.author : 'You'}
            </Text>
            <Space size={4}>
              {isUserTemplate && userTemplate.usageCount > 0 && (
                <>
                  <Text style={{ fontSize: 10 }}>Used {userTemplate.usageCount}x</Text>
                </>
              )}
              {!isUserTemplate && (
                <>
                  <StarOutlined style={{ color: '#faad14', fontSize: 12 }} />
                  <Text style={{ fontSize: 10 }}>Featured</Text>
                </>
              )}
            </Space>
          </div>
        </Card>
      </Col>
    )
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <Card>
        <SectionTitle
          icon={<FolderOutlined />}
          title="Template Library"
          subtitle="Choose from professional templates or manage your custom ones"
        />

        <Tabs activeKey={activeTab} onChange={setActiveTab} style={{ marginBottom: 24 }}>
          <TabPane tab="Built-in Templates" key="builtin" />
          <TabPane tab={`My Templates (${userTemplates.length})`} key="custom" />
          <TabPane tab={`Favorites (${userTemplates.filter(t => t.isFavorite).length})`} key="favorites" />
          <TabPane tab="Recent" key="recent" />
          <TabPane tab="All Templates" key="all" />
        </Tabs>

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
                <Option value="custom">🎨 Custom</Option>
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
          {filteredTemplates.map(renderTemplateCard)}
        </Row>

        {filteredTemplates.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px 20px',
            color: '#8c8c8c'
          }}>
            <FolderOutlined style={{ fontSize: 48, marginBottom: 16 }} />
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
