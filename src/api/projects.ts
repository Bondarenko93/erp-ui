import mainApi from './index'

export const getProjects = async () => {
  const projectsData = await mainApi.get('/projects')
  return projectsData.data
}

export const addProject = async (body: ProjectObject) => {
  await mainApi.post('/projects', body)
}

export const deleteProject = async (id: string) => {
  await mainApi.delete(`/projects/${id}`)
}

export const editProject = async (id: string, body: any) => {
  const project = await mainApi.patch(`/projects/${id}`, body)
  return project.data
}

export const getSingleProject = async (id: string) => {
  const project = await mainApi.get(`/projects/${id}`)
  return project.data
}
