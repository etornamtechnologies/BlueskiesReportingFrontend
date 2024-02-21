import { LockOutlined, UserAddOutlined } from '@ant-design/icons'
import { Col, Row, Card, Form, Input, Button, Divider } from 'antd'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux_store/hook'
import { Creators as AuthCreators } from '../../../services/redux/auth/actions'
import { ERole, IAuthState, ILoginRequest, ISignUpRequest } from '../../../models/auth.model'
import SignUpForm from './components/SignUpForm'

const SignUpIndex: React.FC = () => {
  const {
    posting
  } = useAppSelector(state => state.auth) as IAuthState

  const [form] = Form.useForm()
  const dispatch = useAppDispatch()

  return (
    <Row style={{ height: '100vh', width: '100%' }}>
      <Col md={14} lg={14} sm={0} style={{  }}>

      </Col>
      <Col md={10} lg={10} sm={24} xs={24} style={{ padding: '90px 60px 0 60px' }}>
        <Card>
          <Row>
            <Col span={24} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <UserAddOutlined />
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <span>Sign Up</span>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ paddingTop: 80 }}>
              <SignUpForm 
                initialValues={{ email: '', firstName: '', lastName: '', role: ERole.ADMIN, password: '', passwordConfirm: '' }}
                onSubmit={(values: any) => {
                  const payload: ISignUpRequest = {
                    email: values.email,
                    firstName: values.firstName,
                    lastName: values?.lastName,
                    role: values.role,
                    password: values.password
                  }
                  dispatch(AuthCreators.signUp(payload))
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

export default SignUpIndex