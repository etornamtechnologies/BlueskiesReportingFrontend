import { Button, Form, FormInstance, Input, Select } from "antd"
import { IProduct } from "../../../models/product.model"
import { ICustomer } from "../../../models/customer.model"
import { IAirline } from "../../../models/airline.model"

type Props = {
  initialValues: ProductOrderFormFieldType
  onSubmit: (values: any) => void
  submitting: boolean
  submitBtnText?: string
  form: FormInstance
  customers: ICustomer[],
  fetchingCustomers: boolean
  products: IProduct[]
  fetchingProducts: boolean
  airlines: IAirline[]
  fetchingAirlines: boolean
}

export type ProductOrderFormFieldType = {
  productId: string
  customerId: string
  airlineId: string
  quantity: number
  description: string
  flight: string
}

const AddProductOrderForm: React.FC<Props> = ({
  initialValues,
  onSubmit,
  submitting,
  submitBtnText = 'SUBMIT',
  form,
  customers = [],
  fetchingCustomers,
  airlines,
  fetchingAirlines,
  products,
  fetchingProducts,
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
          label='Customer'
          name='customerId'
          rules={[{required: true, message: 'Customer cannot be empty'}]}
        >
          <Select loading={fetchingCustomers}>
            {customers.map(customer => (
              <Select.Option key={customer.id} value={customer.id}>
                {customer.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label='Product'
          name='productId'
          rules={[{required: true, message: 'Product cannot be empty'}]}
        >
          <Select loading={fetchingCustomers}>
            {products.map(product => (
              <Select.Option key={product.id} value={product.id}>
                {product.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label='Airline'
          name='airlineId'
          rules={[{required: true, message: 'Airline cannot be empty'}]}
        >
          <Select loading={fetchingCustomers}>
            {airlines.map(airline => (
              <Select.Option key={airline.id} value={airline.id}>
                {airline.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item<ProductOrderFormFieldType>
          label='Quantity'
          name='quantity'
          rules={[{required: true, message: 'Please input quantity'}]}  
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item<ProductOrderFormFieldType>
          label='Flight'
          name='flight'
        >
          <Input />
        </Form.Item>
        <Form.Item<ProductOrderFormFieldType>
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

export default AddProductOrderForm