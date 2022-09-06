const initialState: authState = {
  access_token: null,
}

const auth = (state = initialState, action: ReduxAction): authState => {
  switch (action.type) {
    case 'AUTH_SET_TOKEN':
      return {
        ...state,
        access_token: action.payload,
      }
    default:
      return state
  }
}

export default auth
