import React from 'react'
import { Form, Input, Button, Card, Select, Typography, Grid } from 'antd'
import { Link } from 'react-router-dom'

import { Flex } from '../Login'

interface SignupFormProps {
  onFinish: (values: SignupBody) => void
  onValuesChange: () => void
  loading: boolean
  error: string
}

const SignupForm = ({ onFinish, onValuesChange, loading, error }: SignupFormProps): JSX.Element => {
  const screens = Grid.useBreakpoint()
  return (
    <Card title="Signup" size={screens.md ? 'default' : 'small'}>
      <Form
        name="normal_login"
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        size={screens.md ? 'large' : 'middle'}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 20 }}
      >
        <Form.Item name="name" rules={[{ required: true, message: 'Please input name' }]} label="Name">
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="role" rules={[{ required: true, message: 'Please choose role' }]} label="Role">
          <Select placeholder="Role">
            <Select.Option value="manager">Manager</Select.Option>
            <Select.Option value="developer">Developer</Select.Option>
            <Select.Option value="admin">Admin</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please input email' },
            { type: 'email', message: 'Invalid email' },
          ]}
          label="Email"
        >
          <Input placeholder="Email" />
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
          <Input type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 30 }}>
          <Flex>
            <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
              Sign up
            </Button>
            <div>
              Or <Link to="/login">login</Link>
            </div>
          </Flex>
        </Form.Item>
        {error && <Typography.Text type="danger">{error}</Typography.Text>}
      </Form>
    </Card>
  )
}

export default SignupForm
