import { Button, Form, FormInstance, Input } from "antd"

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
          name='email'
          rules={[{ required: true, message: 'Please enter your email' }]}
        >
          <Input placeholder='Email' />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Please enter your email' }]}
        >
          <Input placeholder='password' type='password' />
        </Form.Item>
        <Form.Item style={{ marginTop: 30 }}>
          <Button type='primary' htmlType='submit'>
            LOGIN
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default SignInForm