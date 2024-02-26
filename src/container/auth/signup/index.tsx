import { UserAddOutlined } from '@ant-design/icons'
import { Col, Row, Card, Form } from 'antd'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux_store/hook'
import { Creators as AuthCreators } from '../../../services/redux/auth/actions'
import { IAuthState, ISignUpRequest } from '../../../models/auth.model'
import SignUpForm from './components/SignUpForm'
import { ERole } from '../../../models/user.model'
import { useNavigate } from 'react-router-dom'
import logo from '../../../assets/img/signup.jpg'

const SignUpIndex: React.FC = () => {
  const {
    posting,
    post_success
  } = useAppSelector(state => state.auth) as IAuthState
  

  const [form] = Form.useForm()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if(!posting && post_success) {
      form.resetFields()
    }
  }, [post_success, posting])

  return (
    <Row style={{ height: '100vh', width: '100%' }}>
      <Col md={12} lg={12} sm={0} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <img src={logo} alt='signup' style={{ width: '80%', height: '80%' }} />
      </Col>
      <Col md={12} lg={12} sm={24} xs={24} style={{ boxShadow: '-2px 0 6px rgba(0, 0, 0, 0.09)' }}>
        <Card style={{ padding: 30 }}>
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
                initialValues={{ email: '', firstName: '', lastName: '', role: ERole.UPDATER, password: '', passwordConfirm: '' }}
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