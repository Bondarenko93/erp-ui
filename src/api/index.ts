import axios from 'axios'
import jwt from 'jwt-decode'
import moment from 'moment'

import { setToken } from '../utils/setToken'

const baseURL = process.env.REACT_APP_API_URL
const mainApi = axios.create({ baseURL: baseURL })
mainApi.defaults.headers.common['Content-Type'] = 'application/json'

export const setApiToken = (token: string | null) => {
  if (token) {
    mainApi.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete mainApi.defaults.headers.common['Authorization']
  }
}

mainApi.interceptors.request.use(
  async function (config) {
    const {
      headers: { common },
    } = config
    const token = common['Authorization']
    if (token) {
      const decoded: { exp: number } = jwt(token.replace('Bearer ', ''))
      const now = moment().unix() + 60
      const refresh_token = window.localStorage.getItem('refresh_token')

      if (decoded.exp < now && refresh_token) {
        const res = await axios.post(`${baseURL}/auth/refresh`, { refresh_token: refresh_token })
        setToken(res.data)
        config.headers.common['Authorization'] = `Bearer ${res.data.access_token}`
      }
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

mainApi.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response.status && error.response.status === 401) {
      setToken(null)
    }
    return Promise.reject(error)
  },
)

export default mainApi
