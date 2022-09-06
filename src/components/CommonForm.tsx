import React from 'react'
import { Form, Button, Card, Grid } from 'antd'
import { useHistory } from 'react-router-dom'

interface CommonFormProps {
  onFinish: (values: any) => void
  loading?: boolean
  children: React.ReactNode
  title: string
  buttonLabel?: string
  initialValues?: any
  labelCol?: any
  wrapperCol?: any
}

const CommonForm = ({
  onFinish,
  loading,
  children,
  title,
  buttonLabel,
  initialValues,
  labelCol,
  wrapperCol,
}: CommonFormProps): JSX.Element => {
  const history = useHistory()
  const screens = Grid.useBreakpoint()

  return (
    <div style={{ maxWidth: '600px' }}>
      <Card
        title={title}
        extra={
          <Button type="link" onClick={() => history.goBack()}>
            Cancel
          </Button>
        }
        size={screens.md ? 'default' : 'small'}
      >
        <Form
          name="common_form"
          onFinish={onFinish}
          size={screens.md ? 'large' : 'middle'}
          initialValues={initialValues}
          labelCol={labelCol}
          wrapperCol={wrapperCol}
        >
          {children}
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {buttonLabel || 'Save'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default CommonForm
