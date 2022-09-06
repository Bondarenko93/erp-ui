import React, { FC, useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useSelector } from 'react-redux'

// components
import Login from './pages/login/Login'
import LoggedInRoutes from './Routes'

// redux
import { authSelector } from './redux/selectors'

// utils
import { setToken } from './utils/setToken'

const App: FC = () => {
  const { access_token } = useSelector(authSelector)

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!access_token) {
      const token = window.localStorage.getItem('access_token')
      token && setToken({ access_token: token })
    }
    setMounted(true)
  }, [access_token])

  return mounted ? <Router>{access_token ? <LoggedInRoutes /> : <Login />}</Router> : null
}

export default App
