import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { Tag, Typography } from 'antd'

import Table from '../../components/Table'
import TableActions from '../../components/TableActions'

import { deleteProject } from '../../api/projects'
import { fetchProjects, deleteProjectAction } from '../../redux/actions/projects'
import { projectsSelector } from '../../redux/selectors'
import { filterSearch } from '../../utils/filterSearch'
import { filterDate } from '../../utils/filterDate'
import { setError } from '../../utils/setError'

const ProjectsList: FC = () => {
  const { projects } = useSelector(projectsSelector)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  const handleDelete = async (id: string) => {
    setLoading(true)
    try {
      await deleteProject(id)
      dispatch(deleteProjectAction(id))
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  const projectsColumns: Column[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
      sortDirections: ['descend', 'ascend'],
      ...filterSearch('name'),
    },
    {
      title: 'Client',
      dataIndex: 'client',
      render: (text, record) =>
        record.client ? record.client.name : <Typography.Text type="danger">deleted</Typography.Text>,
      sorter: (a: any, b: any) => a.client.name.localeCompare(b.client.name),
      sortDirections: ['descend', 'ascend'],
      ...filterSearch('client', 'name'),
      responsive: ['lg'],
    },
    {
      title: 'Manager',
      dataIndex: 'manager',
      render: (text, record) =>
        record.manager ? record.manager.name : <Typography.Text type="danger">deleted</Typography.Text>,
      sorter: (a: any, b: any) => a.manager.name.localeCompare(b.manager.name),
      sortDirections: ['descend', 'ascend'],
      ...filterSearch('manager', 'name'),
    },
    {
      title: 'Members',
      dataIndex: 'members',
      render: (text, record) =>
        record.members.map((item: any, index: number) => (
          <Tag key={index} color="geekblue" style={{ marginBottom: '5px' }}>
            {item.name}
          </Tag>
        )),
      sorter: (a: any, b: any) => a.members.length - b.members.length,
      sortDirections: ['descend', 'ascend'],
      ...filterSearch('members', 'name', true),
      responsive: ['sm'],
    },
    {
      title: 'Date Created',
      dataIndex: 'date_created',
      render: date => moment.utc(date).local().format('DD.MM.YYYY, HH:mm'),
      sorter: (a: any, b: any) => moment(a.date_created).diff(moment(b.date_created)),
      sortDirections: ['descend', 'ascend'],
      responsive: ['lg'],
      ...filterDate('date_created'),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => (
        <TableActions
          editPath={`/projects/edit/${record._id}`}
          onDelete={() => handleDelete(record._id)}
          loading={loading}
        />
      ),
    },
  ]

  return (
    <Table
      columns={projectsColumns}
      dataSource={projects}
      onAddPath="/projects/add"
      tableProps={{
        expandable: {
          expandedRowRender: (record: ProjectObject) => <p style={{ margin: 0 }}>{record.description}</p>,
          rowExpandable: (record: ProjectObject) => record.description,
        },
      }}
    />
  )
}

export default ProjectsList
