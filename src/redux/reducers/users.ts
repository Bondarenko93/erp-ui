const initialState: usersState = {
  users: [],
  current_user: null,
}

const users = (state = initialState, action: ReduxAction): usersState => {
  switch (action.type) {
    case 'USERS_SAVE_DATA':
      return {
        ...state,
        users: action.payload,
      }
    case 'USERS_UPDATE_ITEM':
      const updatedUsers = (state.users as any[]).map((item: UserObject) => {
        // "as any" needed because of typescript issue: https://github.com/microsoft/TypeScript/issues/36390
        if (action.payload._id === item._id) {
          item = Object.assign(item, action.payload)
        }
        return item
      })
      return {
        ...state,
        users: updatedUsers,
      }
    case 'USERS_SET_CURRENT_USER':
      return {
        ...state,
        current_user: action.payload,
      }
    case 'USERS_DELETE_ONE':
      const filteredUsers = (state.users as any[]).filter(user => user._id !== action.payload)
      return {
        ...state,
        users: filteredUsers,
      }
    default:
      return state
  }
}

export default users
