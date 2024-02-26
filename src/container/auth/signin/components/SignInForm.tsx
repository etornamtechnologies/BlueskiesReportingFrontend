import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Checkbox, Form, FormInstance, Input } from "antd"

type Props = {
  initialValues: {email: string, password: string}
  onSubmit: (values: any) => void
  loading: boolean
  form: FormInstance
}

const SignInForm: React.FC<Props> = ({
  initialValues,
  onSubmit,
  loading,
  form
}) => {

  return (
    <>
      <Form
        form={form}
        onFinish={(values: any) => onSubmit(values)}
        requiredMark={false}
      >
        <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your Email!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        {/* <a className="login-form-forgot" href="">
          Forgot password
        </a> */}
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%' }}>
          Log in
        </Button>
        Or <a href="/auth/signup">register now!</a>
      </Form.Item>
      </Form>
    </>
  )
}

export default SignInForm