import React, { FC } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Layout, Grid } from 'antd'
import styled from 'styled-components'

// custom components
import Logo from '../../components/Logo'
import Signin from './Signin'
import Signup from './Signup'

const { Header, Content } = Layout

const HeaderWrapper = styled.div`
  width: 100%;
  padding-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const CardContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 64px);
  display: flex;
  justify-content: center;
`

export const CardWrapper = styled.div`
  width: 450px;
`

export const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Login: FC = () => {
  const screens = Grid.useBreakpoint()
  return (
    <Layout>
      <Header style={{ padding: screens.md ? '0 50px' : '0 15px' }}>
        <HeaderWrapper>
          <Logo />
        </HeaderWrapper>
      </Header>
      <Content>
        <CardContainer
          style={{
            paddingTop: screens.md ? '100px' : '0',
          }}
        >
          <CardWrapper>
            <Switch>
              <Route exact path="/login" component={Signin} />
              <Route exact path="/signup" component={Signup} />
              <Route path="*">
                <Redirect to="/login" />
              </Route>
            </Switch>
          </CardWrapper>
        </CardContainer>
      </Content>
    </Layout>
  )
}

export default Login
