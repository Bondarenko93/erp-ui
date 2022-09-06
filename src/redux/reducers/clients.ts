const initialState: clientsState = {
  clients: [],
}

const clients = (state = initialState, action: ReduxAction): clientsState => {
  switch (action.type) {
    case 'CLIENTS_SAVE_DATA':
      return {
        ...state,
        clients: action.payload,
      }
    case 'CLIENTS_UPDATE_ITEM':
      const updatedClients = (state.clients as any[]).map((item: ClientObject) => {
        // "as any" needed because of typescript issue: https://github.com/microsoft/TypeScript/issues/36390
        if (action.payload._id === item._id) {
          item = Object.assign(item, action.payload)
        }
        return item
      })
      return {
        ...state,
        clients: updatedClients,
      }
    case 'CLIENTS_DELETE_ONE':
      const filteredClients = (state.clients as any[]).filter(client => client._id !== action.payload)
      return {
        ...state,
        clients: filteredClients,
      }
    default:
      return state
  }
}

export default clients
