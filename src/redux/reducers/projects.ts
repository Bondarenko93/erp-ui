const initialState: projectsState = {
  projects: [],
}

const projects = (state = initialState, action: ReduxAction): projectsState => {
  switch (action.type) {
    case 'PROJECTS_SAVE_DATA':
      return {
        ...state,
        projects: action.payload,
      }
    case 'PROJECTS_UPDATE_ITEM':
      const updatedProjects = (state.projects as any[]).map((item: ProjectObject) => {
        // "as any" needed because of typescript issue: https://github.com/microsoft/TypeScript/issues/36390
        if (action.payload._id === item._id) {
          item = Object.assign(item, action.payload)
        }
        return item
      })
      return {
        ...state,
        projects: updatedProjects,
      }
    case 'PROJECTS_DELETE_ONE':
      const filteredProjects = (state.projects as any[]).filter(project => project._id !== action.payload)
      return {
        ...state,
        projects: filteredProjects,
      }
    default:
      return state
  }
}

export default projects
