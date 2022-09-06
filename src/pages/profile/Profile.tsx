import React, { FC, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { authSelector, usersSelector } from '../../redux/selectors'
import { setCurrentUser } from '../../redux/actions/users'
import { setToken } from '../../utils/setToken'
import { logout } from '../../api/auth'
import { setError } from '../../utils/setError'

import Description from './Description'

const Profile: FC = () => {
  const [loading, setLoading] = useState(false)

  const { access_token } = useSelector(authSelector)
  const { current_user } = useSelector(usersSelector)
  const history = useHistory()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    setLoading(true)
    try {
      await logout(access_token)
      setLoading(false)
      setToken(null)
      dispatch(setCurrentUser(null))
      history.push('/login')
    } catch (err) {
      setError(err)
      setLoading(false)
    }
  }

  return current_user && <Description currentUser={current_user} logout={handleLogout} loading={loading} />
}

export default Profile
