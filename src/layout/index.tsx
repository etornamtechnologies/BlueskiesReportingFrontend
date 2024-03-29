import { Layout, theme, Menu, Button, MenuProps, Row, Col, Dropdown } from 'antd'
import { useState } from 'react'
import {
  BarChartOutlined,
  BookOutlined,
  DashboardOutlined,
  LeftOutlined,
  LogoutOutlined,
  PieChartOutlined,
  RightOutlined,
  RocketOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import AuthMiddleware from '../middlewares/auth.middleware';
import useAuth from '../hooks/useAuth';
import { useAppDispatch, useAppSelector } from '../redux_store/hook'
import { Creators as AuthCreators } from '../services/redux/auth/actions'
import { IAuthState } from '../models/auth.model';
const { Sider, Header, Content, Footer } = Layout;

type Props = {
  children?: React.ReactNode
  header?: React.ReactNode
}

const AppLayout: React.FC<Props> = ({
  children,
  header
}) => {

  const {
    user
  } = useAppSelector(state => state.auth) as IAuthState

  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [current, setCurrent] = useState<string>('/')
  const dispatch = useAppDispatch()


  const location = useLocation()

  const navigate = useNavigate()

  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    //setCurrent(e.key);
    if (e.keyPath[0] === '/') {
      navigate('/app')
    } else {
      navigate(`/app/${e.keyPath.join('/')}`)
    }
  };

  React.useEffect(() => {
    const { pathname } = location
    if (pathname === '/app') {
      setCurrent("/")
    } else if (pathname === '/app/airlines') {
      setCurrent("airlines")
    } else if (pathname === '/app/customers') {
      setCurrent('customers')
    } else if (pathname === '/app/product-categories') {
      setCurrent("product-categories")
    } else if (pathname === '/app/products') {
      setCurrent("products")
    } else if (pathname === '/app/users') {
      setCurrent('users')
    } else if (pathname === '/app/product-orders' || pathname.includes('/app/product-orders/add-new') || pathname.includes('/app/product-orders/view-detail')) {
      setCurrent('product-orders')
    } else if (pathname === '/app/reports') {
      setCurrent('reports')
    } else {
      setCurrent("/")
    }
    //eslint-disable-next-line
  }, [current])

  const profileMenu = (
    <Menu>
      <Menu.Item key="1" icon={<LogoutOutlined />} onClick={()=> {
        dispatch(AuthCreators.signOut())
      }}>
        Logout
      </Menu.Item>
    </Menu>
  )

  useAuth()

  return (
    <AuthMiddleware>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div style={{ width: '100%', padding: 5, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '100%' }}>
              <PieChartOutlined style={{ color: '#ffffff', marginRight: 10, marginLeft: 25, fontSize: 20 }} /><span style={{ color: '#ffffff' }}>Blueskies</span>
            </div>
          </div>
          <Menu
            style={{ height: '100vh' }}
            theme='dark'
            mode='inline'
            defaultSelectedKeys={['/']}
            onClick={onClick}
            selectedKeys={[current]}
            items={[
              {
                key: '/',
                icon: <DashboardOutlined />,
                label: 'Home'
              },
              {
                key: 'customers',
                icon: <UserOutlined />,
                label: 'Customers'
              },
              {
                key: 'airlines',
                icon: <RocketOutlined />,
                label: 'Airline'
              },
              {
                key: 'products',
                icon: <ShoppingCartOutlined />,
                label: 'Product'
              },
              {
                key: 'product-orders',
                icon: <ShoppingCartOutlined />,
                label: 'Orders'
              },
              {
                key: 'product-categories',
                icon: <BookOutlined />,
                label: 'Product Category'
              },
              {
                key: 'users',
                icon: <UserOutlined />,
                label: 'Users'
              },
              {
                key: 'reports',
                icon: <BarChartOutlined />,
                label: 'Reports'
              }
            ]}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Row>
              <Col span={12}>
                <Button
                  type="text"
                  icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                  }}
                />
              </Col>
              <Col span={12}>
                <div
                  style={{
                    float: 'right', marginRight: 10, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
                    alignItems: 'center', cursor: 'pointer', height: '100%'
                  }}
                >
                  {/* <UserOutlined /> <span>{currentUser.fullName}</span> */}
                  <Dropdown.Button overlay={profileMenu} placement="bottomLeft" icon={<UserOutlined />}>
                    {`${user?.firstName} ${user?.lastName}`}
                  </Dropdown.Button>
                </div>
              </Col>
            </Row>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              //background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {header ? (
              <Row>
                <Col span={24} style={{ marginBottom: 10 }}>
                  {header}
                </Col>
              </Row>
            ) : null}
            {children ? children : null}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Tech-bridge ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </AuthMiddleware>
  )
}
export default AppLayout