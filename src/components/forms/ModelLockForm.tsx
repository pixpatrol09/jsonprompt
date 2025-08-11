import { Form, Switch, Card, Row, Col, Tooltip, Space } from 'antd'
import { LockOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { usePromptStore } from '../../stores/promptStore'
import SectionTitle from '../ui/SectionTitle'

export function ModelLockForm() {
  const { promptData, updatePromptData } = usePromptStore()
  const [form] = Form.useForm()

  const handleFormChange = () => {
    const formData = form.getFieldsValue()
    updatePromptData({
      model_lock: {
        ...promptData.model_lock,
        ...formData
      }
    })
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <Card>
        <SectionTitle
          icon={<LockOutlined />}
          title="Model Lock Settings"
          subtitle="Lock specific aspects of your subject to prevent unwanted changes"
        />

        <Form
          form={form}
          layout="vertical"
          initialValues={promptData.model_lock}
          onValuesChange={handleFormChange}
          size="large"
        >
          {/* Position Controls */}
          <div style={{ marginBottom: 32 }}>
            <h4 style={{ marginBottom: 16, fontWeight: 600 }}>Position Controls</h4>
            <Row gutter={[24, 16]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="preserve_proportions"
                  label={
                    <Space>
                      Preserve Proportions
                      <Tooltip title="Maintain the original body proportions and scale">
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
                  name="preserve_subject_position"
                  label={
                    <Space>
                      Subject Position
                      <Tooltip title="Keep the subject in the exact same position within the frame">
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
                  name="preserve_frame_ratio"
                  label={
                    <Space>
                      Frame Ratio
                      <Tooltip title="Maintain the subject-to-background ratio">
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
                  name="camera_perspective_locked"
                  label={
                    <Space>
                      Camera Perspective
                      <Tooltip title="Lock the camera angle and perspective">
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

          {/* Body Part Controls */}
          <div style={{ marginBottom: 32 }}>
            <h4 style={{ marginBottom: 16, fontWeight: 600 }}>Body Part Controls</h4>
            <Row gutter={[24, 16]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="head_position_locked"
                  label={
                    <Space>
                      Head Position
                      <Tooltip title="Lock the head position and angle">
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
                  name="arms_position_locked"
                  label={
                    <Space>
                      Arms Position
                      <Tooltip title="Lock the position and pose of arms">
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
                  name="legs_position_locked"
                  label={
                    <Space>
                      Legs Position
                      <Tooltip title="Lock the position and pose of legs">
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
                  name="feet_position_locked"
                  label={
                    <Space>
                      Feet Position
                      <Tooltip title="Lock the exact position of feet">
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
                  name="outfit_position_locked"
                  label={
                    <Space>
                      Outfit Position
                      <Tooltip title="Lock clothing position and fit">
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

          {/* Identity & Quality Controls */}
          <div style={{ marginBottom: 32 }}>
            <h4 style={{ marginBottom: 16, fontWeight: 600 }}>Identity & Quality Controls</h4>
            <Row gutter={[24, 16]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="preserve_face_identity"
                  label={
                    <Space>
                      Face Identity
                      <Tooltip title="Preserve facial features and identity">
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
                  name="preserve_skin_tone"
                  label={
                    <Space>
                      Skin Tone
                      <Tooltip title="Maintain original skin tone and color">
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
                  name="preserve_race"
                  label={
                    <Space>
                      Preserve Race
                      <Tooltip title="Maintain racial characteristics">
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
                  name="no_body_warping"
                  label={
                    <Space>
                      No Body Warping
                      <Tooltip title="Prevent any distortion of body shape">
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
                  name="no_pose_generation"
                  label={
                    <Space>
                      No Pose Generation
                      <Tooltip title="Prevent AI from generating new poses">
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
                  name="no_scale_distortion"
                  label={
                    <Space>
                      No Scale Distortion
                      <Tooltip title="Prevent scaling that distorts proportions">
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
        </Form>
      </Card>
    </div>
  )
}
