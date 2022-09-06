import React from 'react'
import { Tag } from 'antd'

const setRoleColor = (role: string): string => {
  role.toLowerCase()
  switch (role) {
    case 'developer':
      return 'geekblue'
    case 'manager':
      return 'gold'
    case 'admin':
      return 'red'
    default:
      return '#000'
  }
}

type RoleTagProps = {
  role: string | undefined
}

const RoleTag = ({ role }: RoleTagProps): JSX.Element | null =>
  typeof role === 'string' ? <Tag color={setRoleColor(role)}>{role.toUpperCase()}</Tag> : null

export default RoleTag
