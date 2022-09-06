import React, { FC, useState } from 'react'
import { useHistory } from 'react-router-dom'

import SigninForm from './components/SigninForm'

import { setToken } from '../../utils/setToken'
import { login } from '../../api/auth'

const Signin: FC = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const history = useHistory()

  const onFinish = async (values: SigninBody) => {
    setError('')
    setLoading(true)
    try {
      const data = await login(values)
      setLoading(false)
      setToken(data)
      history.push('/tasks')
    } catch (err) {
      console.log(err.response)
      setError('Wrong email or password')
      setLoading(false)
    }
  }

  return <SigninForm onFinish={onFinish} onValuesChange={() => setError('')} error={error} loading={loading} />
}

export default Signin
