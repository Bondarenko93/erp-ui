import React, { FC, useState } from 'react'
import { useHistory } from 'react-router-dom'

import SignupForm from './components/SignupForm'
import SignupSuccess from './components/SignupSuccess'

import { signup } from '../../api/auth'

const Signup: FC = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const history = useHistory()

  const onFinish = async (values: SignupBody) => {
    setError('')
    setLoading(true)
    try {
      await signup(values)
      setSuccess(true)
    } catch (err) {
      console.log(err.response)
      const errorMessage: string = err.response?.data?.error
      setError(errorMessage ? errorMessage : 'Oops! Something bad happened :(')
    } finally {
      setLoading(false)
    }
  }

  return !success ? (
    <SignupForm onFinish={onFinish} onValuesChange={() => setError('')} error={error} loading={loading} />
  ) : (
    <SignupSuccess onClick={() => history.push('/login')} />
  )
}

export default Signup
