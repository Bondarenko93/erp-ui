import mainApi from './index'

export const getUsers = async () => {
  const usersData = await mainApi.get('/users')
  return usersData.data
}

export const addUser = async (body: UserObject) => {
  await mainApi.post('/users', body)
}

export const editUser = async (id: string, body: UserObject) => {
  const user = await mainApi.patch(`/users/${id}`, body)
  return user.data
}

export const getCurrentUser = async () => {
  const user = await mainApi.get('/users/current')
  return user.data
}

export const deleteUser = async (id: string) => {
  await mainApi.delete(`/users/${id}`)
}
