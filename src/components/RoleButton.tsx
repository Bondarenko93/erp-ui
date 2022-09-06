import React from 'react'
import { Button, Tooltip, Popconfirm } from 'antd'
import { useSelector } from 'react-redux'

import { usersSelector } from '../redux/selectors'

type RoleButtonProps = {
  allowedRoles: string[]
  buttonProps?: any
  children: React.ReactNode
  confirm?: string
  onConfirm?: () => void
}

const RoleButton = ({ allowedRoles, buttonProps, children, confirm, onConfirm }: RoleButtonProps): JSX.Element => {
  const { current_user } = useSelector(usersSelector)

  return current_user && allowedRoles.includes(current_user.role as any) ? (
    confirm ? (
      <Popconfirm title={confirm} onConfirm={onConfirm}>
        <Button {...buttonProps}>{children}</Button>
      </Popconfirm>
    ) : (
      <Button {...buttonProps}>{children}</Button>
    )
  ) : (
    <Tooltip title={`Allowed only for ${allowedRoles.join(' or ')}`}>
      <Button {...buttonProps} disabled>
        {children}
      </Button>
    </Tooltip>
  )
}

export default RoleButton
