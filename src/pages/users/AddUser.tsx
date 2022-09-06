import React, { FC, useState } from 'react'
import { Form, Input, Select, Switch } from 'antd'
import { useHistory } from 'react-router-dom'

import CommonForm from '../../components/CommonForm'

import { addUser } from '../../api/users'
import { setError } from '../../utils/setError'

const AddUser: FC = () => {
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const onFinish = async (values: UserObject) => {
    setLoading(true)
    try {
      await addUser(values)
      setLoading(false)
      history.push('/users')
    } catch (err) {
      setError(err)
      setLoading(false)
    }
  }

  return (
    <CommonForm onFinish={onFinish} loading={loading} title="Add User" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
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
          { required: true, message: 'Please your password' },
          {
            min: 6,
            message: 'Password should be at least 6 characters long',
          },
        ]}
        label="Password"
      >
        <Input type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item label="Approved" name="approved" initialValue={true}>
        <Switch defaultChecked={true} />
      </Form.Item>
    </CommonForm>
  )
}

export default AddUser
