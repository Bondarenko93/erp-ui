import mainApi from './index'

export type EditProfileBody = {
  name: string
  email: string
  avatar?: any
}

export type ChangePasswordBody = {
  old_password: string
  new_password: string
}

export const editProfile = async (id: string, body: EditProfileBody) => {
  const user = await mainApi.patch(`/users/${id}`, body)
  return user.data
}

export const changePassword = async (body: ChangePasswordBody) => {
  const user = await mainApi.post('/auth/changePassword', body)
  return user.data
}
