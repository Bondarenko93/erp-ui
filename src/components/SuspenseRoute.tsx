import React, { FC, Suspense } from 'react'
import { Route } from 'react-router-dom'
import { Spin } from 'antd'

import ErrorBoundary from './ErrorBoundary'

type SuspenseRouteProps = {
  path: string
  component: any
}

const SuspenseRoute: FC<SuspenseRouteProps> = ({ path, component }) => (
  <Suspense fallback={<Spin size="large" />}>
    <ErrorBoundary>
      <Route exact path={path} component={component} />
    </ErrorBoundary>
  </Suspense>
)

export default SuspenseRoute
