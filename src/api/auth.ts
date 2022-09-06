import mainApi from './index'

export const login = async (body: SigninBody) => {
  const tokenData = await mainApi.post('/auth/login', body)
  return tokenData.data
}

export const signup = async (body: SignupBody) => {
  await mainApi.post('/auth/signup', body)
}

export const logout = async (access_token: string | null) => {
  access_token && (await mainApi.post('/auth/logout', { access_token: access_token }))
}
