import { Layout, theme, Menu, Button, MenuProps, Row, Col } from 'antd'
import { useState } from 'react'
import {
  BookOutlined,
  DashboardOutlined,
  LeftOutlined,
  PieChartOutlined,
  RightOutlined,
  RocketOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
const { Sider, Header, Content, Footer } = Layout;

type Props = {
  children?: React.ReactNode
  header?: React.ReactNode
}

const AppLayout: React.FC<Props> = ({
  children,
  header
}) => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [current, setCurrent] = useState<string>('/')

  const location = useLocation()

  const navigate = useNavigate()

  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    //setCurrent(e.key);
    if(e.keyPath[0] === '/') {
      navigate('/')
    } else {
      navigate(`/${e.keyPath.join('/')}`)
    }
  };

  React.useEffect(()=> {
    const { pathname } = location
    console.log('--------------> pathname', pathname)
    if(pathname === '/') {
      setCurrent("/")
    } else if(pathname === '/airlines') {
      setCurrent("airlines")
    } else if(pathname === '/customers') {
      setCurrent('customers')
    } else if(pathname === '/product-categories') {
      setCurrent("product-categories")
    } else if(pathname === '/products') {
      setCurrent("products")
    } else if(pathname === '/product-orders') {
      setCurrent('product-orders')
    } else {
      setCurrent("/")
    }
  }, [current])

  return (
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
            }
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
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
  )
}
export default AppLayout