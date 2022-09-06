import React from 'react'
import { Table, Space, Grid } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { uiSelector } from '../redux/selectors'

import RoleButton from './RoleButton'

interface CommonTableProps {
  columns: any[]
  dataSource: any[] | []
  onAddPath: string
  tableProps?: any
}

const CommonTable = ({ columns, dataSource, onAddPath, tableProps }: CommonTableProps) => {
  const history = useHistory()
  const { loading } = useSelector(uiSelector)
  const screens = Grid.useBreakpoint()

  return (
    <>
      <Space align="center" style={{ marginBottom: '10px' }}>
        <RoleButton
          allowedRoles={['admin', 'manager']}
          buttonProps={{
            icon: <PlusOutlined />,
            onClick: () => history.push(onAddPath),
            type: 'primary',
          }}
        >
          Add
        </RoleButton>
      </Space>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey="_id"
        bordered
        size={screens.md ? 'large' : 'middle'}
        {...tableProps}
      />
    </>
  )
}

export default CommonTable
