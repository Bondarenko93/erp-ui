import React, { FC } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Result } from 'antd'

// components
import SuspenseRoute from './components/SuspenseRoute'
import Layout from './components/Layout'

// routes
const Tasks = React.lazy(() => import('./pages/tasks/Tasks'))

const ProjectsList = React.lazy(() => import('./pages/projects/ProjectsList'))
const AddProject = React.lazy(() => import('./pages/projects/AddProject'))
const EditProject = React.lazy(() => import('./pages/projects/EditProject'))

const ClientsList = React.lazy(() => import('./pages/clients/ClientsList'))
const AddClient = React.lazy(() => import('./pages/clients/AddClient'))
const EditClient = React.lazy(() => import('./pages/clients/EditClient'))

const UsersList = React.lazy(() => import('./pages/users/UsersList'))
const AddUser = React.lazy(() => import('./pages/users/AddUser'))
const EditUser = React.lazy(() => import('./pages/users/EditUser'))

const Profile = React.lazy(() => import('./pages/profile/Profile'))
const ChangePassword = React.lazy(() => import('./pages/profile/ChangePassword'))
const EditProfile = React.lazy(() => import('./pages/profile/EditProfile'))

const LoggedInRoutes: FC = () => (
  <Layout>
    <Switch>
      {/* tasks */}
      <SuspenseRoute path="/tasks" component={Tasks} />
      {/* projects */}
      <SuspenseRoute path="/projects/add" component={AddProject} />
      <SuspenseRoute path="/projects/edit/:id" component={EditProject} />
      <SuspenseRoute path="/projects" component={ProjectsList} />
      {/* clients */}
      <SuspenseRoute path="/clients/add" component={AddClient} />
      <SuspenseRoute path="/clients/edit/:id" component={EditClient} />
      <SuspenseRoute path="/clients" component={ClientsList} />
      {/* users */}
      <SuspenseRoute path="/users/add" component={AddUser} />
      <SuspenseRoute path="/users/edit/:id" component={EditUser} />
      <SuspenseRoute path="/users" component={UsersList} />
      {/* profile */}
      <SuspenseRoute path="/profile/edit" component={EditProfile} />
      <SuspenseRoute path="/profile/changePassword" component={ChangePassword} />
      <SuspenseRoute path="/profile" component={Profile} />

      <Route exact path="/">
        <Redirect to="/tasks" />
      </Route>
      <Route path="*">
        <Result status="404" title="404" subTitle="Sorry, the page you visited does not exist." />
      </Route>
    </Switch>
  </Layout>
)

export default LoggedInRoutes
