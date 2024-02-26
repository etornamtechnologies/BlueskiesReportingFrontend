import { Button, Form, FormInstance, Input, Select } from "antd"
import { ERole } from "../../../../models/user.model"

type Props = {
  initialValues: {email: string, firstName: string, lastName: string, password: string, passwordConfirm: string, role: ERole}
  onSubmit: (values: any) => void
  loading: boolean
  form: FormInstance
}

const SignUpForm: React.FC<Props> = ({
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
        layout='vertical'
      >
        <Form.Item
          name='email'
          label='Email'
          rules={[{ required: true, message: 'Please enter your email' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='First Name'
          name='firstName'
          rules={[{ required: true, message: 'Please enter your first name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Last Name'
          name='lastName'
          rules={[{ required: true, message: 'Please enter your last name' }]}
        >
          <Input placeholder='Email' />
        </Form.Item>
        <Form.Item
          label='Role'
          name='role'
          rules={[{ required: true, message: 'Please select a role' }]}
        >
          <Select>
            {Object.keys(ERole).map(item => (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input placeholder='password' type='password' />
        </Form.Item>
        <Form.Item
          name='passwordConfirm'
          rules={[{ required: true, message: 'Please confirm your password' }]}
        >
          <Input placeholder='password' type='password' />
        </Form.Item>
        <Form.Item style={{ marginTop: 30 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
        Or <a href="/auth/signin">Sign in!</a>
      </Form>
    </>
  )
}

export default SignUpForm