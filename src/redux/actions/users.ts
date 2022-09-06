import { getUsers, getCurrentUser } from '../../api/users'
import { uiSetLoading, uiSetSuccess } from './ui'
import { setError } from '../../utils/setError'
import { AppThunk } from '../index'

export const usersSaveData: (payload: UserObject[]) => ReduxAction = (payload: UserObject[]): ReduxAction => {
  return {
    type: 'USERS_SAVE_DATA',
    payload,
  }
}

export const updateUser: (payload: UserObject) => ReduxAction = (payload: UserObject): ReduxAction => {
  return {
    type: 'USERS_UPDATE_ITEM',
    payload,
  }
}

export const setCurrentUser: (payload: UserObject | null) => ReduxAction = (
  payload: UserObject | null,
): ReduxAction => {
  return {
    type: 'USERS_SET_CURRENT_USER',
    payload,
  }
}

export const deleteUserAction: (payload: string) => ReduxAction = (payload: string): ReduxAction => {
  return {
    type: 'USERS_DELETE_ONE',
    payload,
  }
}

export const fetchUsers = (): AppThunk => async dispatch => {
  dispatch(uiSetLoading())
  try {
    const data = await getUsers()
    const dataWithKey = data.map((item: UserObject) => ({
      key: item.id,
      ...item,
    }))
    dispatch(usersSaveData(dataWithKey))
    dispatch(uiSetSuccess())
  } catch (err) {
    setError(err)
  }
}

export const fetchCurrentUser = (): AppThunk => async dispatch => {
  dispatch(uiSetLoading())
  try {
    const user = await getCurrentUser()
    dispatch(setCurrentUser(user))
    dispatch(uiSetSuccess())
  } catch (err) {
    setError(err)
  }
}
