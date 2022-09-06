import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import Table from '../../components/Table'
import TableActions from '../../components/TableActions'

import { deleteClient } from '../../api/clients'
import { fetchClients, deleteClientAction } from '../../redux/actions/clients'
import { clientsSelector } from '../../redux/selectors'
import { filterSearch } from '../../utils/filterSearch'
import { filterDate } from '../../utils/filterDate'
import { setError } from '../../utils/setError'

const ClientsList: FC = () => {
  const { clients } = useSelector(clientsSelector)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    dispatch(fetchClients())
  }, [dispatch])

  const handleDelete = async (id: string) => {
    setLoading(true)
    try {
      await deleteClient(id)
      dispatch(deleteClientAction(id))
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  const clientsColumns: Column[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
      sortDirections: ['descend', 'ascend'],
      ...filterSearch('name'),
    },
    {
      title: 'Date Created',
      dataIndex: 'date_created',
      render: date => moment.utc(date).local().format('DD.MM.YYYY, HH:mm'),
      sorter: (a: any, b: any) => moment(a.date_created).diff(moment(b.date_created)),
      sortDirections: ['descend', 'ascend'],
      ...filterDate('date_created'),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => (
        <TableActions
          editPath={`/clients/edit/${record._id}`}
          onDelete={() => handleDelete(record._id)}
          loading={loading}
        />
      ),
    },
  ]

  return <Table columns={clientsColumns} dataSource={clients} onAddPath="/clients/add" />
}

export default ClientsList
