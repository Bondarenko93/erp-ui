export const authSetToken: (payload: string | null) => ReduxAction = (payload: string | null): ReduxAction => {
  return {
    type: 'AUTH_SET_TOKEN',
    payload,
  }
}
