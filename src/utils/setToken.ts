import { store } from '../redux'
import { authSetToken } from '../redux/actions/auth'
import { setApiToken } from '../api'

type TokenDataType = {
  access_token: string
  refresh_token?: string
}

export const setToken = (tokenData: TokenDataType | null): void => {
  if (tokenData) {
    window.localStorage.setItem('access_token', tokenData.access_token)
    tokenData.refresh_token && window.localStorage.setItem('refresh_token', tokenData.refresh_token)
    saveToken(tokenData.access_token)
  } else {
    window.localStorage.removeItem('access_token')
    window.localStorage.removeItem('refresh_token')
    saveToken(null)
  }
}

export const saveToken = (access_token: string | null): void => {
  setApiToken(access_token)
  store.dispatch(authSetToken(access_token))
}
