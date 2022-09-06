import React, { FC, useState } from 'react'
import { Form, Input } from 'antd'
import { useHistory } from 'react-router-dom'

import CommonForm from '../../components/CommonForm'

import { changePassword, ChangePasswordBody } from '../../api/profile'
import { setError } from '../../utils/setError'

const ChangePassword: FC = () => {
  const [loading, setLoading] = useState(false)

  const history = useHistory()

  const onFinish = async (values: ChangePasswordBody) => {
    setLoading(true)
    try {
      await changePassword(values)
      setLoading(false)
      history.push('/profile')
    } catch (err) {
      setError(err)
      setLoading(false)
    }
  }

  return (
    <CommonForm onFinish={onFinish} loading={loading} title="Change Password">
      <Form.Item name="old_password" rules={[{ required: true, message: 'Please input old Password' }]}>
        <Input placeholder="Old Password" type="password" />
      </Form.Item>
      <Form.Item name="new_password" rules={[{ required: true, message: 'Please input new Password' }]}>
        <Input placeholder="New Password" type="password" />
      </Form.Item>
    </CommonForm>
  )
}

export default ChangePassword
