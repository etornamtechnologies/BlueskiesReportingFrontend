import { Button, Form, FormInstance, Input, Select } from "antd"
import { Measurementunits } from "../../../models/product.model"
import { IProductCategory } from "../../../models/product.category.model"

type Props = {
  initialValues: ProductFormFieldType
  onSubmit: (values: any) => void
  submitting: boolean
  submitBtnText?: string
  form: FormInstance
  productCategories?: Array<IProductCategory>
  loadingProductCategories?: boolean
}

export type ProductFormFieldType = {
  name: string
  description: string
  quantityPerPack: number
  measurementUnit: string
  weight: number
  // packWeightInKg: number
  productCategoryId: string
}

const AddProductForm: React.FC<Props> = ({
  initialValues,
  onSubmit,
  submitting,
  submitBtnText = 'SUBMIT',
  form,
  productCategories = [],
  loadingProductCategories = false
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
        <Form.Item
          label='Product Category'
          name='productCategoryId'
          rules={[{required: true, message: 'Product category cannot be empty'}]}
        >
          <Select loading={loadingProductCategories}>
            {productCategories.map(pc => (
              <Select.Option key={pc.id} value={pc.id}>
                {pc.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item<ProductFormFieldType>
          label='Name'
          name='name'
          rules={[{required: true, message: 'Please input product category name'}]}  
        >
          <Input placeholder="name..." />
        </Form.Item>
        <Form.Item<ProductFormFieldType>
          label='Measurment Unit'
          name='measurementUnit'
        >
          <Select value={Measurementunits.GRAM}>
            {Object.keys(Measurementunits).map(unit => (
              <Select.Option key={unit} value={unit}>
                {unit}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item<ProductFormFieldType>
          label='Weight'
          name='weight'
        >
          <Input />
        </Form.Item>
        <Form.Item<ProductFormFieldType>
          label='Quantity Per Pack'
          name='quantityPerPack'
        >
          <Input />
        </Form.Item>
        {/* <Form.Item
          label='Pack Weight in Kg'
          name='packWeightInKg'
        >
          <Input />
        </Form.Item> */}
        <Form.Item<ProductFormFieldType>
          label='Description'
          name='description'
        >
          <Input.TextArea rows={2} placeholder="Description..."/>
        </Form.Item>
        <Button type='primary' htmlType='submit' loading={submitting}>
          {submitBtnText}
        </Button>
      </Form>
    </>
  )
}

export default AddProductForm