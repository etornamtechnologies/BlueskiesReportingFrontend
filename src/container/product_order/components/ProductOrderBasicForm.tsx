import { Button, Col, DatePicker, Form, FormInstance, Input, Row, Select } from "antd"
import { ICustomer } from "../../../models/customer.model"
import { IAirline } from "../../../models/airline.model"
import dayjs, { Dayjs } from "dayjs"
import moment from "moment"
import initCollapseMotion from "antd/es/_util/motion"

export type ProductOrderFormFieldType = {
  customerId: string
  airlineId: string
  description: string
  flight: string
  requiredDate: string
}

type Props = {
  initialValues: { customerId: string, airlineId: string, flight: string, description: string, requiredDate: string },
  form: FormInstance
  onSubmit: (values: any) => void
  customers: Array<ICustomer>
  fetchingCustomers: boolean
  airlines: Array<IAirline>
  fetchingAirlines: boolean
}

const ProductOrderBasicForm: React.FC<Props> = ({
  initialValues,
  form,
  onSubmit,
  fetchingCustomers,
  customers,
  fetchingAirlines,
  airlines
}) => {
  //console.log('customerid', initialValues)
  console.log('init values', initialValues)
  return (
    <>
      <Form
        autoComplete='off'
        layout='vertical'
        initialValues={{...initialValues, requiredDate: moment(initialValues.requiredDate, 'YYYY-MM-DD')}}
        form={form}
        onFinish={(values) => onSubmit(values)}
        variant='outlined'
      >
        <Row>
          <Col span={24}>
            <Form.Item<ProductOrderFormFieldType>
              label='Customer'
              name='customerId'
              rules={[{ required: true, message: 'Customer cannot be empty' }]}
            >
              <Select loading={fetchingCustomers}>
                {customers.map(customer => (
                  <Select.Option key={customer.id} value={customer.id}>
                    {customer.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item<ProductOrderFormFieldType>
              label='Airline'
              name='airlineId'
              rules={[{ required: true, message: 'Airline cannot be empty' }]}
            >
              <Select loading={fetchingAirlines}>
                {airlines.map(airline => (
                  <Select.Option key={airline.id} value={airline.id}>
                    {airline.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item<ProductOrderFormFieldType>
              label='Flight'
              name='flight'
              rules={[{ required: true, message: 'Flight cannot be empty' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Required Date"
              name="requiredDate"
            >
              <DatePicker
                style={{ width: "100%" }}
                format="YYYY-MM-DD"
                value={moment(Date.now()) as any}
              />
            </Form.Item>
            <Form.Item<ProductOrderFormFieldType>
              label='Description'
              name='description'
              rules={[{ required: true, message: 'Description cannot be empty' }]}
            >
              <Input.TextArea rows={2} placeholder="Description..." />
            </Form.Item>
            <Button type='primary' htmlType="submit" >SUBMIT</Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default ProductOrderBasicForm