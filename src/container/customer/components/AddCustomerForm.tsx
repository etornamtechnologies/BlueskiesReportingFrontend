import { Button, Form, FormInstance, Input } from "antd"

type Props = {
  initialValues: CustomerFormFieldType,
  onSubmit: (values: any) => void,
  submitting: boolean,
  submitBtnText?: string,
  form: FormInstance
}

export type CustomerFormFieldType = {
  name: string
  description: string
  location: string
  email: string
  phoneNumber: string
}

const AddCustomerForm: React.FC<Props> = ({
  initialValues,
  onSubmit,
  submitting,
  submitBtnText = 'SUBMIT',
  form
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
        <Form.Item<CustomerFormFieldType>
          label='Name'
          name='name'
          rules={[{required: true, message: 'Please input product category name'}]}  
        >
          <Input placeholder="name..." />
        </Form.Item>
        <Form.Item<CustomerFormFieldType>
          label='Email'
          name='email'
        >
          <Input placeholder="email..." />
        </Form.Item>
        <Form.Item<CustomerFormFieldType>
          label='Phone Number'
          name='phoneNumber'
        >
          <Input placeholder="Phone Number..." />
        </Form.Item>
        <Form.Item<CustomerFormFieldType>
          label='Location'
          name='location'
        >
          <Input placeholder="Location..." />
        </Form.Item>
        <Form.Item<CustomerFormFieldType>
          label='Description'
          name='description'
        >
          <Input.TextArea rows={5} placeholder="Description..."/>
        </Form.Item>
        <Button type='primary' htmlType='submit' loading={submitting}>
          {submitBtnText}
        </Button>
      </Form>
    </>
  )
}

export default AddCustomerForm