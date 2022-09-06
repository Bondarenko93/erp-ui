import React, { FC, useState } from 'react'
import { Form, Input } from 'antd'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import CommonForm from '../../components/CommonForm'

import { usersSelector } from '../../redux/selectors'
import { setCurrentUser } from '../../redux/actions/users'
import { editProfile, EditProfileBody } from '../../api/profile'
import { setError } from '../../utils/setError'

const EditProfile: FC = () => {
  const [loading, setLoading] = useState(false)

  const history = useHistory()
  const dispatch = useDispatch()
  const { current_user } = useSelector(usersSelector)

  const onFinish = async (values: EditProfileBody) => {
    if (current_user?._id) {
      setLoading(true)
      try {
        let body = {
          ...values,
          avatar: {
            url: values.avatar,
            color: current_user.avatar?.color,
          },
        }
        const edited = await editProfile(current_user._id, body)
        setLoading(false)
        dispatch(setCurrentUser({ ...current_user, ...edited }))
        history.push('/profile')
      } catch (err) {
        setError(err)
        setLoading(false)
      }
    }
  }

  return (
    current_user && (
      <CommonForm
        onFinish={onFinish}
        loading={loading}
        title="Edit Profile"
        initialValues={{
          name: current_user.name,
          email: current_user.email,
          avatar: current_user.avatar?.url,
        }}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
      >
        <Form.Item name="name" rules={[{ required: true, message: 'Please input name' }]} label="Name">
          <Input placeholder="Name" />
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
        <Form.Item name="avatar" label="Avatar (url)">
          <Input placeholder="Url" />
        </Form.Item>
      </CommonForm>
    )
  )
}

export default EditProfile
