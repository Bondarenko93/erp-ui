import mainApi from './index'

export const getProjectTasks = async (id: string) => {
  const tasksData = await mainApi.get(`/tasks/project/${id}`)
  return tasksData.data
}

export const editTask = async (id: string, body: any) => {
  const task = await mainApi.patch(`/tasks/${id}`, body)
  return task.data
}

export const addTask = async (body: TaskObject) => {
  const task = await mainApi.post('/tasks', body)
  return task.data
}
