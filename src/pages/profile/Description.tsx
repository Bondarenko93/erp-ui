import React from 'react'
import { Descriptions, Space, Button, Grid } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import moment from 'moment'
import { Link } from 'react-router-dom'

import RoleTag from '../../components/RoleTag'
import ApprovedIcon from '../../components/ApprovedIcon'
import Avatar from '../../components/UserAvatar'

interface DescriptionProps {
  currentUser: UserObject
  logout: () => void
  loading: boolean
}

const Description = ({ currentUser, logout, loading }: DescriptionProps): JSX.Element => {
  const { name, email, approved, role, date_created, avatar } = currentUser
  const screens = Grid.useBreakpoint()

  const getWidth = (): string => {
    if (screens.md) {
      return '60%'
    } else if (screens.sm) {
      return '80%'
    } else {
      return '100%'
    }
  }

  return (
    <div style={{ maxWidth: getWidth() }}>
      <Descriptions
        title="Profile Info"
        bordered
        extra={
          <Link to="/profile/edit">
            <Button type="primary" icon={<EditOutlined />}>
              Edit
            </Button>
          </Link>
        }
        column={1}
        className="profilelabelwidth"
        size={screens.md ? 'default' : 'middle'}
      >
        <Descriptions.Item label="Name:">{name}</Descriptions.Item>
        <Descriptions.Item label="Email:">{email}</Descriptions.Item>
        <Descriptions.Item label="Role:">
          <RoleTag role={role} />
        </Descriptions.Item>
        <Descriptions.Item label="Approved:">
          <ApprovedIcon approved={approved} />
        </Descriptions.Item>
        <Descriptions.Item label="Avatar:">
          <Avatar avatar={avatar as any} name={name!} />
        </Descriptions.Item>
        <Descriptions.Item label="Date created:">
          {moment.utc(date_created).local().format('DD.MM.YYYY, HH:mm')}
        </Descriptions.Item>
      </Descriptions>
      <Space direction="vertical" style={{ marginTop: screens.md ? '35px' : '15px' }} size="middle">
        <Link to="/profile/changePassword">
          <Button type="primary">Change Password</Button>
        </Link>
        <Button danger onClick={logout} loading={loading}>
          Log out
        </Button>
      </Space>
    </div>
  )
}

export default Description
