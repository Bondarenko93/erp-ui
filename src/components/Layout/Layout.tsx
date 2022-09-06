import React, { useState } from 'react'
import { Layout, Menu, Button, Typography, Grid, Drawer } from 'antd'
import { UserOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import Logo from '../Logo'

import { NavLinkType } from './index'

const { Header, Content, Sider } = Layout
const { Title } = Typography

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
`

const BurgerContainer = styled.div`
  display: flex;
  align-items: center;
`

const LogoContainer = styled.div<LogoContainerProps>`
  display: flex;
  align-items: center;
  padding-left: ${({ collapsed }) => (collapsed ? '25px' : '20px')};
  height: 64px;
  background-color: #001628;
  position: relative;
  transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.3);
  }
`

const ContentContainer = styled.div`
  background-color: #fff;
  min-width: 100%;
  overflow: scroll;
`

type LogoContainerProps = {
  collapsed?: boolean
}

interface MainLayoutProps {
  collapsed: boolean
  toogleCollapsed: (value: boolean) => void
  navLinks: NavLinkType[]
  navKey: string
  setNavKey: (value: string) => void
  children: React.ReactNode
  title: string
  onNavClicked: (name: string) => void
}

interface MainMenuProps {
  navLinks: NavLinkType[]
  navKey: string
  onNavClicked: (name: string) => void
  setNavKey: (value: string) => void
}

const MainMenu = ({ navLinks, navKey, onNavClicked, setNavKey }: MainMenuProps): JSX.Element => (
  <Menu selectedKeys={[navKey]} mode="inline" onClick={({ key }) => setNavKey(key.toString())} theme="dark">
    {navLinks.map((item, index) => (
      <Menu.Item
        key={index}
        icon={item.icon}
        style={{ textTransform: 'capitalize' }}
        onClick={() => onNavClicked(item.name)}
      >
        {item.name}
      </Menu.Item>
    ))}
  </Menu>
)

const MainLayout = ({
  collapsed,
  toogleCollapsed,
  navLinks,
  navKey,
  setNavKey,
  children,
  title,
  onNavClicked,
}: MainLayoutProps): JSX.Element => {
  const [visible, setVisible] = useState(false)
  const screens = Grid.useBreakpoint()

  const handleNavClicked = (name: string) => {
    onNavClicked(name)
    setVisible(false)
  }

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={toogleCollapsed}
          breakpoint="xl"
          collapsedWidth={screens.md ? 80 : 0}
          {...(!screens.md && { trigger: null })}
        >
          <LogoContainer collapsed={collapsed}>
            <Logo collapsed={collapsed} />
          </LogoContainer>
          <MainMenu navLinks={navLinks} navKey={navKey} setNavKey={setNavKey} onNavClicked={handleNavClicked} />
        </Sider>
        <Layout>
          <Header style={{ padding: screens.md ? '0 50px' : '0 15px' }}>
            <HeaderWrapper>
              <BurgerContainer>
                {!screens.md && (
                  <Button ghost style={{ marginRight: '20px' }} onClick={() => setVisible(true)}>
                    <MenuOutlined />
                  </Button>
                )}
                <Title
                  level={4}
                  style={{
                    color: '#fff',
                    textTransform: 'capitalize',
                    marginBottom: 0,
                  }}
                >
                  {title}
                </Title>
              </BurgerContainer>
              <Button ghost icon={<UserOutlined />} onClick={() => handleNavClicked('profile')}>
                Profile
              </Button>
            </HeaderWrapper>
          </Header>
          <Content>
            <ContentContainer
              style={{
                padding: screens.sm ? '15px' : '10px',
              }}
            >
              {children}
            </ContentContainer>
          </Content>
        </Layout>
      </Layout>
      {!screens.md && (
        <Drawer
          title={
            <LogoContainer>
              <Logo />
              <Button
                type="text"
                size="small"
                onClick={() => setVisible(false)}
                style={{ position: 'absolute', top: 10, right: 0 }}
              >
                <CloseOutlined style={{ color: '#fff', fontSize: '24px' }} />
              </Button>
            </LogoContainer>
          }
          placement="left"
          visible={visible}
          closable={false}
          headerStyle={{ padding: 0 }}
          bodyStyle={{ padding: 0 }}
          drawerStyle={{ backgroundColor: '#001529' }}
        >
          <MainMenu navLinks={navLinks} navKey={navKey} setNavKey={setNavKey} onNavClicked={handleNavClicked} />
        </Drawer>
      )}
    </>
  )
}

export default MainLayout
