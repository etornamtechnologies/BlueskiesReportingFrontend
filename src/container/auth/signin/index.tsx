import { LockOutlined } from '@ant-design/icons'
import { Col, Row, Card, Form } from 'antd'
import React from 'react'
import SignInForm from './components/SignInForm'
import { useAppDispatch, useAppSelector } from '../../../redux_store/hook'
import { Creators as AuthCreators } from '../../../services/redux/auth/actions'
import { IAuthState, ILoginRequest } from '../../../models/auth.model'
// import logo from '../../../assets/img/login.jpg'

const SignInIndex: React.FC = () => {
  const {
    posting
  } = useAppSelector(state => state.auth) as IAuthState

  const [form] = Form.useForm()
  const dispatch = useAppDispatch()

  return (
    <Row style={{ height: '100vh', width: '100%' }}>
      <Col md={14} lg={14} sm={0} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundImage: "url('/img/login.jpg')", backgroundSize: '90% 90%', backgroundRepeat: 'no-repeat' }}>
        
      </Col>
      <Col md={10} lg={10} sm={24} xs={24} style={{ boxShadow: '-0.05px 0 16px rgba(0, 0, 0, 0.1)' }}>
        <Card style={{ width: '100%', height: '100%', padding: 30 }} bordered={false}>
          <Row>
            <Col span={24} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <LockOutlined />
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <span>Sign In</span>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ paddingTop: 80 }}>
              <SignInForm 
                initialValues={{ email: '', password: '' }}
                onSubmit={(values: any) => {
                  const payload: ILoginRequest = {
                    email: values.email,
                    password: values.password
                  }
                  dispatch(AuthCreators.signIn(payload))
                }}
                loading={posting} 
                form={form}
              />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}

export default SignInIndex