import React, { FC, useState, useEffect } from 'react'
import { Form, Input, Select, Spin } from 'antd'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import CommonForm from '../../components/CommonForm'

import { clientsSelector, usersSelector, uiSelector } from '../../redux/selectors'
import { fetchUsers } from '../../redux/actions/users'
import { fetchClients } from '../../redux/actions/clients'
import { addProject } from '../../api/projects'
import { setError } from '../../utils/setError'

const AddProject: FC = () => {
  const [formLoading, setFormLoading] = useState(false)

  const history = useHistory()
  const dispatch = useDispatch()
  const { clients } = useSelector(clientsSelector)
  const { users } = useSelector(usersSelector)
  const { loading } = useSelector(uiSelector)

  useEffect(() => {
    if (clients.length === 0) {
      dispatch(fetchClients())
    }
    if (users.length === 0) {
      dispatch(fetchUsers())
    }
  }, [])

  const onFinish = async (values: any) => {
    setFormLoading(true)
    try {
      await addProject(values)
      setFormLoading(false)
      history.push('/projects')
    } catch (err) {
      setError(err)
      setFormLoading(false)
    }
  }

  return (
    <Spin spinning={loading} size="large">
      <CommonForm
        onFinish={onFinish}
        loading={formLoading}
        title="Add Project"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
      >
        <Form.Item name="name" rules={[{ required: true, message: 'Please input name' }]} label="Name">
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={4} placeholder="Description" />
        </Form.Item>
        <Form.Item name="client" rules={[{ required: true, message: 'Please choose client' }]} label="Client">
          <Select placeholder="Choose client">
            {(clients as any[]).map((client: ClientObject, index: number) => (
              <Select.Option key={index} value={client._id || 'null'}>
                {client.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="manager" rules={[{ required: true, message: 'Please choose manager' }]} label="Manager">
          <Select placeholder="Choose manager">
            {(users as any[])
              .filter((user: UserObject) => user.role === 'manager' || user.role === 'admin')
              .map((user: UserObject, index: number) => (
                <Select.Option key={index} value={user._id || 'null'}>
                  {user.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item name="members" label="Members">
          <Select placeholder="Choose members" mode="multiple" allowClear>
            {(users as any[])
              .filter((user: UserObject) => user.role === 'developer')
              .map((user: UserObject, index: number) => (
                <Select.Option key={index} value={user._id || 'null'}>
                  {user.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
      </CommonForm>
    </Spin>
  )
}

export default AddProject
