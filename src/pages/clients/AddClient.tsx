import React, { FC, useState } from 'react'
import { Form, Input } from 'antd'
import { useHistory } from 'react-router-dom'

import CommonForm from '../../components/CommonForm'

import { addClient } from '../../api/clients'
import { setError } from '../../utils/setError'

const AddClient: FC = () => {
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const onFinish = async (values: ClientObject) => {
    setLoading(true)
    try {
      await addClient(values)
      setLoading(false)
      history.push('/clients')
    } catch (err) {
      setError(err)
      setLoading(false)
    }
  }

  return (
    <CommonForm
      onFinish={onFinish}
      loading={loading}
      title="Add Client"
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 20 }}
    >
      <Form.Item name="name" rules={[{ required: true, message: 'Please input name' }]} label="Name">
        <Input placeholder="Name" />
      </Form.Item>
    </CommonForm>
  )
}

export default AddClient
