const initialState: tasksState = {
  tasks: [],
  selectedProject: null,
}

const tasks = (state = initialState, action: ReduxAction): tasksState => {
  switch (action.type) {
    case 'TASKS_SAVE_DATA':
      return {
        ...state,
        tasks: action.payload,
      }
    case 'TASKS_ADD_ITEM':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      }
    case 'TASKS_UPDATE_ITEM':
      const updatedTasks = (state.tasks as any[]).map((item: TaskObject) => {
        // "as any" needed because of typescript issue: https://github.com/microsoft/TypeScript/issues/36390
        if (action.payload._id === item._id) {
          item = Object.assign(item, action.payload)
        }
        return item
      })
      return {
        ...state,
        tasks: updatedTasks,
      }
    case 'TASKS_CHOOSE_PROJECT':
      return {
        ...state,
        selectedProject: action.payload,
      }
    default:
      return state
  }
}

export default tasks
