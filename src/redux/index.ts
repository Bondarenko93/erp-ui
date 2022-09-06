import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'

import auth from './reducers/auth'
import users from './reducers/users'
import clients from './reducers/clients'
import projects from './reducers/projects'
import ui from './reducers/ui'
import tasks from './reducers/tasks'

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, rootState, unknown, Action<string>>

const initialState = {}
const rootReducer = combineReducers({
  auth,
  users,
  clients,
  projects,
  ui,
  tasks,
})

export const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)))
