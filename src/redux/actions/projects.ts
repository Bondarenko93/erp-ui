import { getProjects } from '../../api/projects'
import { uiSetLoading, uiSetSuccess } from './ui'
import { setError } from '../../utils/setError'
import { AppThunk } from '../index'

export const projectsSaveData: (payload: ProjectObject[]) => ReduxAction = (payload: ProjectObject[]): ReduxAction => {
  return {
    type: 'PROJECTS_SAVE_DATA',
    payload,
  }
}

export const updateProjectObject: (payload: ProjectObject) => ReduxAction = (payload: ProjectObject): ReduxAction => {
  return {
    type: 'PROJECTS_UPDATE_ITEM',
    payload,
  }
}

export const deleteProjectAction: (payload: string) => ReduxAction = (payload: string): ReduxAction => {
  return {
    type: 'PROJECTS_DELETE_ONE',
    payload,
  }
}

export const fetchProjects = (): AppThunk => async dispatch => {
  dispatch(uiSetLoading())
  try {
    const data = await getProjects()
    const dataWithKey = data.map((item: ProjectObject) => ({
      key: item.id,
      ...item,
    }))
    dispatch(projectsSaveData(dataWithKey))
    dispatch(uiSetSuccess())
  } catch (err) {
    setError(err)
  }
}
