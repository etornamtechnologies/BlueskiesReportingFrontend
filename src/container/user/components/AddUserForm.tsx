import { Button, Form, FormInstance, Input, Select } from "antd"
import { ERole } from "../../../models/user.model"

type Props = {
  initialValues: UserFormFieldType
  onSubmit: (values: any) => void
  submitting: boolean
  submitBtnText?: string
  form: FormInstance
  loadingUserCategories?: boolean
}

export type UserFormFieldType = {
  firstName: string
  lastName: string
  email: string
  role: ERole
}

const AddUserForm: React.FC<Props> = ({
  initialValues,
  onSubmit,
  submitting,
  submitBtnText = 'SUBMIT',
  form,
  loadingUserCategories = false
}) => {

  return (
    <>
      <Form
        autoComplete='off'
        layout='vertical'
        initialValues={initialValues}
        onFinish={onSubmit}
        form={form}
      >
        <Form.Item<UserFormFieldType>
          label='First Name'
          name='firstName'
          rules={[{required: true, message: 'Please input First Name name'}]}  
        >
          <Input placeholder="name..." />
        </Form.Item>
        <Form.Item<UserFormFieldType>
          label='Last Name'
          name='lastName'
          rules={[{required: true, message: 'Please input Last Name name'}]} 
        >
          <Input />
        </Form.Item>
        <Form.Item<UserFormFieldType>
          label='Email'
          name='email'
          rules={[{required: true, message: 'Please select a role'}]} 
        >
          <Input />
        </Form.Item>
        <Form.Item name='role' label='Role'>
          <Select>
            {Object.keys(ERole).map(role => (
              <Select.Option key={role} value={role}>
                {role}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Button type='primary' htmlType='submit' loading={submitting}>
          {submitBtnText}
        </Button>
      </Form>
    </>
  )
}

export default AddUserForm