import React from 'react'
import { Form, Input, Button, Card, Typography, Grid } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

import { Flex } from '../Login'

interface SigninFormProps {
  onFinish: (values: SigninBody) => void
  onValuesChange: () => void
  loading: boolean
  error: string
}

const SigninForm = ({ onFinish, onValuesChange, loading, error }: SigninFormProps): JSX.Element => {
  const screens = Grid.useBreakpoint()
  return (
    <Card title="Signin" size={screens.md ? 'default' : 'small'}>
      <Form
        name="normal_login"
        onFinish={onFinish}
        size={screens.md ? 'large' : 'middle'}
        onValuesChange={onValuesChange}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 20 }}
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please input your email' },
            { type: 'email', message: 'Invalid email' },
          ]}
          label="Email"
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Please input your password' },
            {
              min: 6,
              message: 'Password should be at least 6 characters long',
            },
          ]}
          label="Password"
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 30 }}>
          <Flex>
            <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
              Log in
            </Button>
            <div>
              Or <Link to="/signup">signup</Link>
            </div>
          </Flex>
        </Form.Item>
        {error && <Typography.Text type="danger">{error}</Typography.Text>}
      </Form>
    </Card>
  )
}

export default SigninForm
