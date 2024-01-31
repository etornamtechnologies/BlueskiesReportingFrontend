import { Button, Form, FormInstance, Input } from "antd"

type Props = {
  initialValues: ProductCategoryFormFieldType,
  onSubmit: (values: any) => void,
  submitting: boolean,
  submitBtnText?: string,
  form: FormInstance
}

export type ProductCategoryFormFieldType = {
  name: string
  description: string
}

const AddProductCategoryForm: React.FC<Props> = ({
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
        <Form.Item<ProductCategoryFormFieldType>
          label='Name'
          name='name'
          rules={[{required: true, message: 'Please input product category name'}]}  
        >
          <Input placeholder="name..." />
        </Form.Item>
        <Form.Item<ProductCategoryFormFieldType>
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

export default AddProductCategoryForm