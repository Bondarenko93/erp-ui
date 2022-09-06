export const uiSetLoading: () => ReduxAction = (): ReduxAction => {
  return {
    type: 'UI_SET_LOADING',
  }
}

export const uiSetSuccess: () => ReduxAction = (): ReduxAction => {
  return {
    type: 'UI_SET_SUCCESS',
  }
}

export const uiSetError: (payload: string | null) => ReduxAction = (payload: string | null): ReduxAction => {
  return {
    type: 'UI_SET_ERROR',
    payload,
  }
}
