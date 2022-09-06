//
// api types
//

type SigninBody = {
  email: string
  password: string
}

type SignupBody = {
  email: string
  first_name: string
  last_name: string
  role: string
  password: string
}

type UserObject = {
  email?: string
  name?: string
  role?: 'admin' | 'manager' | 'developer'
  approved?: boolean
  _id?: string
  avatar?: {
    url: string | null
    color: string | null
  }
  [key: string]: any
}

type ClientObject = {
  _id?: string
  name: string
  [key: string]: any
}

type ProjectObject = {
  _id?: string
  name: string
  client:
    | string
    | {
        _id: string
        name: string
      }
  manager:
    | string
    | {
        _id: string
        name: string
      }
  members?:
    | string[]
    | {
        _id: string
        name: string
      }[]
  order_snapshot: {
    backlog: string[]
    to_do: string[]
    in_progress: string[]
    in_review: string[]
    done: string[]
  }
  description: string | null
  [key: string]: any
}

type TaskObject = {
  title: string
  description?: string
  project: {
    _id: string
    name: string
  }
  assignee: {
    _id: string
    name: string
    avatar?: {
      url: string | null
      color: string | null
    }
  }
  status: 'backlog' | 'to do' | 'in progress' | 'in review' | 'done'
  estimate_hours?: number
  due_date?: string
  order: number
  [key: string]: any
}

//
// redux types
//

type ReduxAction = {
  type: string
  payload?: any
}

type authState = {
  access_token: string | null
}

type usersState = {
  users: UserObject[] | []
  current_user: UserObject | null
}

type clientsState = {
  clients: ClientObject[] | []
}

type projectsState = {
  projects: ProjectObject[] | []
}

type uiState = {
  loading: boolean
  error: string | null
}

type tasksState = {
  tasks: TaskObject[] | []
  selectedProject: string | null
}

type rootState = {
  auth: authState
  users: usersState
  clients: clientsState
  projects: projectsState
  ui: uiState
  tasks: tasksState
}

//
// other types
//

type Column = {
  title: string
  dataIndex?: string
  key?: string
  render?: (text: any, record: any) => any
  align?: string
  [key: string]: any
}

interface ParamTypes {
  id: string
}

type BoardColumnsType = {
  backlog: []
  to_do: []
  in_progress: []
  in_review: []
  done: []
  [key: string]: any[]
}
type ColumnBodyType = {
  isDraggingOver: boolean
}
type ColumnContainerType = {
  isLast: boolean
}
