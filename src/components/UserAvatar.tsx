import React from 'react'
import { Avatar, Tooltip } from 'antd'

import { renderName } from '../utils/renderAvatarName'

type AvatarProps = {
  avatar: {
    url: string | null
    color: string | null
  }
  name: string
  size?: string
}

const UserAvatar = ({ avatar, name, size }: AvatarProps): JSX.Element => (
  <Tooltip title={name}>
    <Avatar
      src={avatar?.url || undefined}
      style={{
        color: '#fff',
        backgroundColor: avatar?.color || '#52c41a',
        marginRight: '10px',
      }}
      size={(size as any) || 'default'}
    >
      {renderName(name)}
    </Avatar>
  </Tooltip>
)

export default UserAvatar
