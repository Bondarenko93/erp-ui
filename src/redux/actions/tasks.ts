import { getProjectTasks } from '../../api/tasks'
import { uiSetLoading, uiSetSuccess } from './ui'
import { setError } from '../../utils/setError'
import { AppThunk } from '../index'

export const tasksSaveData: (payload: TaskObject[]) => ReduxAction = (payload: TaskObject[]): ReduxAction => {
  return {
    type: 'TASKS_SAVE_DATA',
    payload,
  }
}

export const updateTaskObject: (payload: TaskObject) => ReduxAction = (payload: TaskObject): ReduxAction => {
  return {
    type: 'TASKS_UPDATE_ITEM',
    payload,
  }
}

export const tasksAddItem: (payload: TaskObject) => ReduxAction = (payload: TaskObject): ReduxAction => {
  return {
    type: 'TASKS_ADD_ITEM',
    payload,
  }
}

export const taskChooseProject: (payload: string) => ReduxAction = (payload: string): ReduxAction => {
  return {
    type: 'TASKS_CHOOSE_PROJECT',
    payload,
  }
}

export const fetchTasks = (id: string): AppThunk => async dispatch => {
  dispatch(uiSetLoading())
  try {
    const data = await getProjectTasks(id)
    const dataWithKey = data.map((item: TaskObject) => ({
      key: item.id,
      ...item,
    }))
    dispatch(tasksSaveData(dataWithKey))
    dispatch(uiSetSuccess())
  } catch (err) {
    setError(err)
  }
}
