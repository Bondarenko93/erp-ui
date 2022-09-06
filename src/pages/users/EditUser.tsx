import React, { FC, useState, useEffect } from 'react'
import { Form, Input, Select, Switch } from 'antd'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import CommonForm from '../../components/CommonForm'

import { usersSelector } from '../../redux/selectors'
import { updateUser, fetchUsers } from '../../redux/actions/users'
import { editUser } from '../../api/users'
import { setError } from '../../utils/setError'

const EditUser: FC = () => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<UserObject | null>(null)

  const history = useHistory()
  const dispatch = useDispatch()
  const { id } = useParams<ParamTypes>()
  const { users } = useSelector(usersSelector)

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers())
    } else {
      if (id) {
        const singleUser = users.find(item => item._id === id)
        singleUser && setUser(singleUser)
      }
    }
  }, [id, users, dispatch])

  const onFinish = async (values: UserObject) => {
    setLoading(true)
    try {
      const updatedUser = await editUser(id, values)
      dispatch(updateUser(updatedUser))
      setLoading(false)
      history.push('/users')
    } catch (err) {
      setError(err)
      setLoading(false)
    }
  }

  return (
    user && (
      <CommonForm
        onFinish={onFinish}
        loading={loading}
        title="Edit User"
        initialValues={{
          name: user.name,
          role: user.role,
          email: user.email,
          approved: user.approved,
        }}
        labelCol={{ span: 4 }}
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
        <Form.Item label="Approved" name="approved">
          <Switch defaultChecked={user.approved} />
        </Form.Item>
      </CommonForm>
    )
  )
}

export default EditUser
