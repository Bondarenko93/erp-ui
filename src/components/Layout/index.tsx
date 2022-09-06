import React, { useState, useEffect, FC } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { TeamOutlined, IdcardOutlined, ProfileOutlined, FundProjectionScreenOutlined } from '@ant-design/icons'
import { notification } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import Layout from './Layout'

import { authSelector, usersSelector, uiSelector } from '../../redux/selectors'
import { fetchCurrentUser } from '../../redux/actions/users'

export type NavLinkType = {
  name: string
  icon: any
}

const navLinks: NavLinkType[] = [
  {
    name: 'tasks',
    icon: <ProfileOutlined />,
  },
  {
    name: 'projects',
    icon: <FundProjectionScreenOutlined />,
  },
  {
    name: 'clients',
    icon: <IdcardOutlined />,
  },
  {
    name: 'users',
    icon: <TeamOutlined />,
  },
]

const LayoutContainer: FC = ({ children }) => {
  const [collapsed, toogleCollapsed] = useState(false)
  const [navKey, setNavKey] = useState('0')
  const [title, setTitle] = useState('')

  const { access_token } = useSelector(authSelector)
  const { current_user } = useSelector(usersSelector)
  const { error } = useSelector(uiSelector)
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    const key = navLinks.findIndex(item => location.pathname.includes(item.name))
    setNavKey(key.toString())
    setTitle(location.pathname.includes('profile') ? 'profile' : navLinks[key]?.name || '')
  }, [location.pathname])

  useEffect(() => {
    if (access_token && !current_user) {
      dispatch(fetchCurrentUser())
    }
  }, [access_token, current_user, dispatch])

  useEffect(() => {
    if (error) {
      notification.error({
        message: 'Error',
        description: error,
      })
    }
  }, [error])

  const onNavClicked = (name: string): void => history.push('/' + name)

  return (
    <Layout
      toogleCollapsed={toogleCollapsed}
      collapsed={collapsed}
      setNavKey={setNavKey}
      navKey={navKey}
      navLinks={navLinks}
      title={title}
      onNavClicked={onNavClicked}
    >
      {children}
    </Layout>
  )
}

export default LayoutContainer
