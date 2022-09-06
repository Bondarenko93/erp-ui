import React from 'react'
import { Typography } from 'antd'
import styled from 'styled-components'

import smallLogo from '../assets/smallLogo.png'

const { Title } = Typography

type LogoProps = {
  collapsed?: boolean
}

const Flex = styled.div`
  display: flex;
  align-items: center;
`

const LogoImg = styled.img<LogoProps>`
  max-width: ${({ collapsed }) => (collapsed ? '30px' : '28px')};
  margin-right: ${({ collapsed }) => (collapsed ? 0 : '10px')};
  transition: margin 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
`

const TextContainer = styled(Flex)<LogoProps>`
  opacity: ${({ collapsed }) => (collapsed ? 0 : 1)};
  max-width: ${({ collapsed }) => (collapsed ? 0 : '100%')};
  transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
`

const Logo = ({ collapsed }: LogoProps): JSX.Element => (
  <Flex>
    <LogoImg src={smallLogo} collapsed={collapsed} />
    <TextContainer collapsed={collapsed}>
      <Title level={3} style={{ color: '#fff', display: 'inline-block', margin: 0 }}>
        AM
      </Title>
      <Title level={3} style={{ color: '#8D1E2B', display: 'inline-block', margin: 0 }}>
        Work
      </Title>
    </TextContainer>
  </Flex>
)

export default Logo
