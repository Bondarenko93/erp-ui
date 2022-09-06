import React from 'react'
import { Result } from 'antd'

class ErrorBoundary extends React.Component {
  state = {
    error: false,
  }

  static getDerivedStateFromError(error: any) {
    return { error: true }
  }

  render() {
    return this.state.error ? (
      <Result status="error" title="Error" subTitle="Sorry, something went wrong. Please try refreshing the page" />
    ) : (
      this.props.children
    )
  }
}

export default ErrorBoundary
