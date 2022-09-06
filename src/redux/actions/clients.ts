import { getClients } from '../../api/clients'
import { uiSetLoading, uiSetSuccess } from './ui'
import { setError } from '../../utils/setError'
import { AppThunk } from '../index'

export const clientsSaveData: (payload: ClientObject[]) => ReduxAction = (payload: ClientObject[]): ReduxAction => {
  return {
    type: 'CLIENTS_SAVE_DATA',
    payload,
  }
}

export const updateClientObject: (payload: ClientObject) => ReduxAction = (payload: ClientObject): ReduxAction => {
  return {
    type: 'CLIENTS_UPDATE_ITEM',
    payload,
  }
}

export const deleteClientAction: (payload: string) => ReduxAction = (payload: string): ReduxAction => {
  return {
    type: 'CLIENTS_DELETE_ONE',
    payload,
  }
}

export const fetchClients = (): AppThunk => async dispatch => {
  dispatch(uiSetLoading())
  try {
    const data = await getClients()
    const dataWithKey = data.map((item: ClientObject) => ({
      key: item.id,
      ...item,
    }))
    dispatch(clientsSaveData(dataWithKey))
    dispatch(uiSetSuccess())
  } catch (err) {
    setError(err)
  }
}
