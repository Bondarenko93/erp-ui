import React from 'react'
import { Space } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'

import RoleButton from './RoleButton'

type TableActionsProps = {
  editPath: string
  onDelete: () => void
  loading: boolean
}

const TableActions = ({ editPath, onDelete, loading }: TableActionsProps): JSX.Element => {
  const history = useHistory()
  return (
    <Space>
      <RoleButton
        allowedRoles={['admin', 'manager']}
        buttonProps={{
          size: 'small',
          icon: <EditOutlined />,
          onClick: () => history.push(editPath),
        }}
      >
        Edit
      </RoleButton>
      <RoleButton
        allowedRoles={['admin']}
        confirm="Are you sure?"
        onConfirm={onDelete}
        buttonProps={{
          size: 'small',
          danger: true,
          loading: loading,
        }}
      >
        Delete
      </RoleButton>
    </Space>
  )
}

export default TableActions
