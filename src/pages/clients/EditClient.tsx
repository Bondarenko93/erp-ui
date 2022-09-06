import React, { FC, useState, useEffect } from 'react'
import { Form, Input } from 'antd'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import CommonForm from '../../components/CommonForm'

import { clientsSelector } from '../../redux/selectors'
import { updateClientObject, fetchClients } from '../../redux/actions/clients'
import { editClient } from '../../api/clients'
import { setError } from '../../utils/setError'

const EditClient: FC = () => {
  const [loading, setLoading] = useState(false)
  const [client, setClient] = useState<ClientObject | null>(null)

  const history = useHistory()
  const dispatch = useDispatch()
  const { id } = useParams<ParamTypes>()
  const { clients } = useSelector(clientsSelector)

  useEffect(() => {
    if (clients.length === 0) {
      dispatch(fetchClients())
    } else {
      if (id) {
        const singleClient = clients.find(item => item._id === id)
        singleClient && setClient(singleClient)
      }
    }
  }, [id, clients, dispatch])

  const onFinish = async (values: { name: string }) => {
    setLoading(true)
    try {
      const updatedClient = await editClient(id, values)
      dispatch(updateClientObject(updatedClient))
      setLoading(false)
      history.push('/clients')
    } catch (err) {
      setError(err)
      setLoading(false)
    }
  }

  return (
    client && (
      <CommonForm
        onFinish={onFinish}
        loading={loading}
        title="Edit Client"
        initialValues={{
          name: client.name,
        }}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 20 }}
      >
        <Form.Item name="name" rules={[{ required: true, message: 'Please input name' }]} label="Name">
          <Input placeholder="Name" />
        </Form.Item>
      </CommonForm>
    )
  )
}

export default EditClient
