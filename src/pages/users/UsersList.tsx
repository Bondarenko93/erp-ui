import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { FilterOutlined } from '@ant-design/icons'

import Table from '../../components/Table'
import RoleTag from '../../components/RoleTag'
import ApprovedIcon from '../../components/ApprovedIcon'
import TableActions from '../../components/TableActions'

import { deleteUser } from '../../api/users'
import { fetchUsers, deleteUserAction } from '../../redux/actions/users'
import { usersSelector } from '../../redux/selectors'
import { filterSearch } from '../../utils/filterSearch'
import { filterDate } from '../../utils/filterDate'
import { setError } from '../../utils/setError'

const UsersList: FC = () => {
  const { users } = useSelector(usersSelector)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const handleDelete = async (id: string) => {
    setLoading(true)
    try {
      await deleteUser(id)
      dispatch(deleteUserAction(id))
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  const usersColumns: Column[] = [
    {
      title: 'Email',
      dataIndex: 'email',
      render: email => <a href={`mailto:${email}`}>{email}</a>,
      sorter: (a: any, b: any) => a.email.localeCompare(b.email),
      sortDirections: ['descend', 'ascend'],
      responsive: ['lg'],
      ...filterSearch('email'),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
      sortDirections: ['descend', 'ascend'],
      ...filterSearch('name'),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      render: role => <RoleTag role={role} />,
      sorter: (a: any, b: any) => a.role.localeCompare(b.role),
      sortDirections: ['descend', 'ascend'],
      filters: [
        { text: 'Admin', value: 'admin' },
        { text: 'Manager', value: 'manager' },
        { text: 'Developer', value: 'developer' },
      ],
      onFilter: (value: string, record: any) => record.role === value,
      filterIcon: (filtered: boolean) => (
        <FilterOutlined style={{ color: filtered ? '#1890ff' : undefined, fontSize: '16px' }} />
      ),
    },
    {
      title: 'Approved',
      dataIndex: 'approved',
      align: 'center',
      render: approved => <ApprovedIcon approved={approved} />,
      sorter: (a: any, b: any) => a.approved - b.approved,
      sortDirections: ['descend', 'ascend'],
      filters: [
        { text: 'Approved', value: true },
        { text: 'Disapproved', value: false },
      ],
      onFilter: (value: string, record: any) => record.approved === value,
      filterIcon: (filtered: boolean) => (
        <FilterOutlined style={{ color: filtered ? '#1890ff' : undefined, fontSize: '16px' }} />
      ),
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
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <TableActions
          editPath={`/users/edit/${record._id}`}
          onDelete={() => handleDelete(record._id)}
          loading={loading}
        />
      ),
    },
  ]

  return <Table columns={usersColumns} dataSource={users} onAddPath="/users/add" />
}

export default UsersList
