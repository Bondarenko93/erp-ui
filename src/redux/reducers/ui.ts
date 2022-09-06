const initialState: uiState = {
  loading: false,
  error: null,
}

const ui = (state = initialState, action: ReduxAction): uiState => {
  switch (action.type) {
    case 'UI_SET_LOADING':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'UI_SET_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
      }
    case 'UI_SET_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default ui
