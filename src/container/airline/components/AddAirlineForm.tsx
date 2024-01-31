import { Button, Form, FormInstance, Input } from "antd"

type Props = {
  initialValues: AirlineFormFieldType,
  onSubmit: (values: any) => void,
  submitting: boolean,
  submitBtnText?: string,
  form: FormInstance
}

export type AirlineFormFieldType = {
  name: string
  description: string
}

const AddAirlineForm: React.FC<Props> = ({
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
        <Form.Item<AirlineFormFieldType>
          label='Name'
          name='name'
          rules={[{required: true, message: 'Please input product category name'}]}  
        >
          <Input placeholder="name..." />
        </Form.Item>
        <Form.Item<AirlineFormFieldType>
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

export default AddAirlineForm