import React, { FC, useState, useEffect } from 'react'
import { Form, Input, Select, Spin } from 'antd'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import CommonForm from '../../components/CommonForm'

import { clientsSelector, usersSelector, uiSelector, projectsSelector } from '../../redux/selectors'
import { updateProjectObject, fetchProjects } from '../../redux/actions/projects'
import { fetchUsers } from '../../redux/actions/users'
import { fetchClients } from '../../redux/actions/clients'
import { editProject } from '../../api/projects'
import { setError } from '../../utils/setError'

const EditProject: FC = () => {
  const [formLoading, setFormLoading] = useState(false)
  const [project, setProject] = useState<ProjectObject | null>(null)

  const history = useHistory()
  const dispatch = useDispatch()
  const { id } = useParams<ParamTypes>()
  const { projects } = useSelector(projectsSelector)
  const { clients } = useSelector(clientsSelector)
  const { users } = useSelector(usersSelector)
  const { loading } = useSelector(uiSelector)

  useEffect(() => {
    if (projects.length === 0) {
      dispatch(fetchProjects())
    } else {
      if (id) {
        const singleProject = projects.find(item => item._id === id)
        singleProject && setProject(singleProject)
      }
    }
    if (clients.length === 0) {
      dispatch(fetchClients())
    }
    if (users.length === 0) {
      dispatch(fetchUsers())
    }
  }, [id, projects, clients, users, dispatch])

  const onFinish = async (values: { name: string }) => {
    setFormLoading(true)
    try {
      const updatedProject = await editProject(id, values)
      dispatch(updateProjectObject(updatedProject))
      setFormLoading(false)
      history.push('/projects')
    } catch (err) {
      setError(err)
      setFormLoading(false)
    }
  }

  return (
    project && (
      <Spin spinning={loading} size="large">
        <CommonForm
          onFinish={onFinish}
          loading={formLoading}
          title="Edit Project"
          initialValues={{
            name: project.name,
            description: project.description,
            client: typeof project.client === 'object' && project.client ? project.client._id : null,
            manager: typeof project.manager === 'object' && project.manager ? project.manager._id : null,
            members: (project!.members! as any).map((item: any) => item._id),
          }}
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
  )
}

export default EditProject
