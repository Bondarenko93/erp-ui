import React from 'react'
import { Result, Button, Card } from 'antd'

interface SignupSuccessProps {
  onClick: () => void
}

const SignupSuccess = ({ onClick }: SignupSuccessProps): JSX.Element => (
  <Card>
    <Result
      status="success"
      title="Account created!"
      subTitle="You will be able to login as soon as your account is approved"
      extra={[
        <Button type="primary" onClick={onClick}>
          Go To Login
        </Button>,
      ]}
    />
  </Card>
)

export default SignupSuccess
