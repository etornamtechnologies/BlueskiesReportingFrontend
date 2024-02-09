import { Button, Col, Form, FormInstance, Input, Row, Select, Space, Steps, Table } from "antd"
import { IProduct } from "../../../models/product.model"
import { ICustomer } from "../../../models/customer.model"
import { IAirline } from "../../../models/airline.model"
import { ColumnsType } from "antd/es/table"
import { DeleteOutlined } from "@ant-design/icons"
import { useCallback, useState } from "react"
import ProductAutoComplete from "./ProductAutoComplete"
import _debounce from "lodash/debounce"
import { INewOrder } from "../../../models/product.order.model"

type Props = {
  //initialValues: ProductOrderFormFieldType,
  order: INewOrder,
  setOrder: (order: INewOrder) => void
  onSubmit: (values: any) => void
  submitting: boolean
  submitBtnText?: string
  form: FormInstance
  customers: ICustomer[],
  fetchingCustomers: boolean
  products: IProduct[]
  fetchingProducts: boolean
  airlines: IAirline[]
  fetchingAirlines: boolean,
  productQuantity: { productId: string, quantity: number }[],
  setProductQuantity: (productQuantity: Array<{ productId: string, quantity: number }>) => void,
  fetchProducts: (query: any) => void
}

export type ProductOrderFormFieldType = {
  customerId: string
  airlineId: string
  description: string
  flight: string
}



const AddMultipleProductOrderForm: React.FC<Props> = ({
  onSubmit,
  setOrder,
  submitting,
  order,
  submitBtnText = 'SUBMIT',
  form,
  customers = [],
  fetchingCustomers,
  airlines,
  fetchingAirlines,
  products,
  fetchingProducts,
  productQuantity,
  fetchProducts,
  setProductQuantity
}) => {

  const [current, setCurrent] = useState<number>(1)

  //eslint-disable-next-line
  const onChangeDebounceFn = useCallback(
    _debounce(filterProducts, 1000), 
    //eslint-disable-next-line
  [])

  function filterProducts(value: string) {
    fetchProducts({ productName: value})
  }


  const colums: ColumnsType<{ productId: string, quantity: number }> = [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text, row) => (
        <Input type="number" />
      )
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, row) => (<Space>
        <DeleteOutlined />
      </Space>)
    }
  ]


  return (
    <>
      <Steps
        current={current}
      >
        <Steps.Step status={current === 1 ? 'process' : current > 1 ? 'finish' : 'wait'} title="Enter order details"></Steps.Step>
        <Steps.Step title="Select products" status={current === 2 ? 'process' : current > 2 ? 'finish' : 'wait'}></Steps.Step>
      </Steps>
      <Row>
        <Col span={24} style={{ padding: "40px 100px 0px 100px" }}>
          {current === 1 && (
            <>
              <Row>
                <Col span={24}>
                  <Form
                    autoComplete='off'
                    layout='vertical'
                    initialValues={{
                      customerId: order?.customerId,
                      airlineId: order?.airlineId,
                      flight: order?.flight,
                      description: order?.description
                    }}
                    onFinish={onSubmit}
                    form={form}
                  >
                    <Row>
                      <Col span={11}>
                        <Form.Item
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
                      </Col>
                      <Col span={11} offset={2}>
                        <Form.Item
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
                      </Col>
                    </Row>
                    <Row>
                      <Col span={11}>
                        <Form.Item<ProductOrderFormFieldType>
                          label='Flight'
                          name='flight'
                          rules={[{ required: true, message: 'Flight cannot be empty' }]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={11} offset={2}>
                        <Form.Item<ProductOrderFormFieldType>
                          label='Description'
                          name='description'
                        > 
                          <Input.TextArea rows={2} placeholder="Description..." />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Button
                    style={{ float: "right" }}
                    type='primary'
                    loading={submitting}
                    onClick={() => {
                      console.log('lets go next to add products')
                      form.validateFields()
                        .then(it => {
                          console.log('valid result', it)
                          setOrder({
                            ...order,
                            customerId: it?.customerId,
                          })
                          setCurrent(2)
                        })
                        .catch(() => {
                          console.log('form not valid')
                        })
                      //setCurrent(2)
                    }}
                  >
                    Next
                  </Button>
                </Col>
              </Row>
            </>
          )}
          {current === 2 && (
            <>
              <Row>
                <Col span={24} style={{ marginBottom: 20, marginTop: 40 }}>
                  <ProductAutoComplete
                    style={{ width: "100%" }}
                    products={products}
                    loading={fetchingProducts}
                    onSearch={(search: string) => {
                      onChangeDebounceFn(search)
                    }}
                    onSelect={(val: string, row: any) => {
                      setOrder({
                        ...order,
                        productQuantity: order.productQuantity.concat({ productId: row?.id, quantity: 0 })
                      })
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Table
                    columns={colums}
                    dataSource={order.productQuantity}
                    size="small"
                    rowKey="productId"
                    pagination={false}
                  />
                </Col>
              </Row>
            </>
          )}
        </Col>
      </Row>
    </>
  )
}

export default AddMultipleProductOrderForm