import { Breadcrumb, Button, Card, Col, DatePicker, Form, Input, Modal, Row, Select, Space, Spin, Table, TableColumnsType } from "antd"
import AppLayout from "../../../layout"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../redux_store/hook"
import { Creators as ProductOrderCreators } from "../../../services/redux/product_order/actions"
import { Creators as CustomerCreators } from "../../../services/redux/customer/actions"
import { Creators as AirlineCreators } from "../../../services/redux/airline/actions"
import { Creators as ProductCreators } from "../../../services/redux/product/actions"
import { IProductOrderState, IOrderDetail, IOrderFulfillment, IUpdateProductOrderDetailRequest, IUpdateProductOrderRequest } from "../../../models/product.order.model"
import { ColumnsType } from "antd/es/table"
import { prettifyDateTime } from "../../../utils/common.helper"
import ProductOrderBasicForm, { ProductOrderFormFieldType } from "../components/ProductOrderBasicForm"
import { ICustomerState } from "../../../models/customer.model"
import { IAirlineState } from "../../../models/airline.model"
import { EditOutlined } from "@ant-design/icons"
import { IProductState } from "../../../models/product.model"
import moment from "moment"


const EditProductOrderPage: React.FC = () => {
  const navigate = useNavigate()
  const { orderId } = useParams()
  const dispatch = useAppDispatch()

  const productOrderState: IProductOrderState = useAppSelector(state => state.product_order)
  const customerState: ICustomerState = useAppSelector(state => state.customer)
  const airlineState: IAirlineState = useAppSelector(state => state.airline)
  const productState: IProductState = useAppSelector(state => state.product)

  const [editOrderDetailVisible, setEditOrderDetailVisible] = useState<boolean>(false)
  const [selectedOrderDetail, setSelectedOrderDetail] = useState<IOrderDetail | null>(null)


  const [orderForm] = Form.useForm()

  const [orderDetailForm] = Form.useForm()



  const colums: ColumnsType<IOrderDetail> = [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      render: (text, row) => row.product?.name
    },
    {
      title: 'Quantity Ordered',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text, row) => row?.quantity
    },
    {
      title: 'Quantity Processed',
      dataIndex: 'totalQuantity',
      key: 'totalQuantity',
      render: (text, row) => productOrderState?.product_order?.orderFulfillments
        ?.filter((it: IOrderFulfillment) => it.product.id === row.product.id)
        ?.reduce((accumulator: number, item: IOrderFulfillment) => {
          return accumulator + item?.quantity
        }, 0)
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      align: 'right',
      render: (text, row) => (<Space>
        <Button
          type="default"
          onClick={() => {
            setSelectedOrderDetail(row)
            orderDetailForm.setFieldsValue({ productId: row?.product?.id, quantity: row.quantity })
            setEditOrderDetailVisible(true)
          }}
          size="small"
        //disabled={productFulfilled(row.product.id)}
        >
          <EditOutlined />
        </Button>
      </Space>)
    }
  ]

  const expandedRowRender = (row: IOrderDetail) => {
    const expandedColumns: TableColumnsType<IOrderFulfillment> = [
      { title: 'Created By', dataIndex: 'createdBy', key: 'createdby', render: text => text || 'N/A' },
      { title: 'Created On', dataIndex: 'createdAt', key: 'createdAt', render: text => prettifyDateTime(text) },
      { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
    ];
    return <Table columns={expandedColumns} dataSource={row.orderFulfillments} pagination={false} rowKey="id" />
  }



  useEffect(() => {
    dispatch(CustomerCreators.fetchCustomers({}))
    dispatch(AirlineCreators.fetchAirlines({}))
    dispatch(ProductCreators.fetchProducts({}))
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (orderId) {
      dispatch(ProductOrderCreators.fetchProductOrder(orderId))
    }
    //eslint-disable-next-line
  }, [orderId])

  // useEffect(() => {
  //   if(productOrderState.product_order) {
  //     const order = productOrderState.product_order
  //     orderForm.setFieldsValue({
  //       airlineId: order.airline.id,
  //       customerId: order.customer.id,
  //       requiredDate: order.requiredDate,

  //     })
  //   }
  //   //eslint-disable-next-line
  // }, [productOrderState.product_order])

  useEffect(() => {
    if (productOrderState.product_order) {
      const productOrder = productOrderState.product_order
      orderForm.setFieldsValue({
        customerId: productOrder.customer.id,
        airlineId: productOrder.airline.id,
        description: productOrder.description,
        flight: productOrder.flight,
        //requiredDate: productOrder.requiredDate,
        requiredDate: moment(productOrder.requiredDate, 'YYYY-MM-DD')
      })
    }
    //eslint-disable-next-line
  }, [productOrderState.product_order])

  useEffect(() => {
    if(productOrderState.post_success && !productOrderState.posting) {
      setEditOrderDetailVisible(false)
      orderDetailForm.resetFields()
    }
  }, [productOrderState.posting, productOrderState.post_success])

  return (
    <AppLayout
      header={(
        <Row>
          <Col span={24}>
            <Breadcrumb>
              <Breadcrumb.Item onClick={() => navigate('/app/product-orders')}>
                ORDERS
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                EDIT ORDER
              </Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
      )}
    >
      {productOrderState.fetching ? <Spin /> : (
        <>
          <Card>
            <Row>
              <Col span={24}>
                <Form
                  autoComplete='off'
                  layout='vertical'
                  initialValues={{
                    customerId: productOrderState?.product_order?.customer?.id,
                    airlineId: productOrderState?.product_order?.airline.id,
                    flight: productOrderState?.product_order?.flight,
                    description: productOrderState?.product_order?.description,
                    requiredDate: moment(productOrderState?.product_order?.requiredDate)
                  }}
                  form={orderForm}
                  onFinish={(values: any) => {
                    const paylaod: IUpdateProductOrderRequest = {
                      customerId: values?.customerId,
                      airlineId: values.airlineId,
                      description: values.description,
                      flight: values.flight,
                      requiredDate: values.requiredDate
                    }
                    dispatch(ProductOrderCreators.putProductOrder(productOrderState.product_order?.id, paylaod))
                  }}
                >
                  <Row>
                    <Col span={11}>
                      <Form.Item
                        label='Customer'
                        name='customerId'
                        rules={[{ required: true, message: 'Customer cannot be empty' }]}
                      >
                        <Select loading={customerState.fetching}>
                          {customerState.customers.map(customer => (
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
                        <Select loading={airlineState.fetching}>
                          {airlineState.airlines.map(airline => (
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
                        rules={[{ required: true, message: 'Description cannot be empty' }]}
                      >
                        <Input.TextArea rows={2} placeholder="Description..." />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Form.Item
                        label="Required Date"
                        name="requiredDate"
                      >
                        <DatePicker
                          format="YYYY-MM-DD"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Button type="primary" htmlType="submit">UPDATE</Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Card>
          <Card style={{ marginTop: 20 }}>
            <Row style={{ marginBottom: 10 }}>
              <Col span={24}>
                <span>PRODUCTS</span>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Table
                  size="small"
                  columns={colums}
                  dataSource={productOrderState?.product_order?.orderDetails.map((item, index) => ({ ...item, index: index }))}
                  rowKey="index"
                  pagination={false}
                  expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
                />
              </Col>
            </Row>
          </Card>
        </>
      )}
      <Modal
        open={editOrderDetailVisible}
        onCancel={() => {
          setEditOrderDetailVisible(false)
          setSelectedOrderDetail(null)
        }}
        onOk={() => {

        }}
        style={{ padding: 20 }}
        title="Edit Order Detail"
        footer={false}
        maskClosable={false}
      >
        <Form
          initialValues={{
            productId: selectedOrderDetail?.product?.id,
            quantity: selectedOrderDetail?.quantity
          }}
          onFinish={(values: any) => {
            const payload: IUpdateProductOrderDetailRequest = {
              productId: values?.productId,
              quantity: values?.quantity
            }
            console.log('selected orderd detail', selectedOrderDetail)
            dispatch(ProductOrderCreators.putProductOrderDetail(productOrderState.product_order?.id as string, selectedOrderDetail?.id as string, payload))
          }}
          layout='vertical'
          form={orderDetailForm}
        >
          <Form.Item name='productId' label='Product'>
            <Select disabled>
              {productState.products.map(item => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label='Ordered Quantity' name='quantity' rules={[{ required: true, message: "Quantity is required" }]}>
            <Input type='number' />
          </Form.Item>
          <Button loading={productOrderState.posting} type="primary" htmlType="submit" >UPDATE</Button>
        </Form>
      </Modal>
    </AppLayout>
  )
}

export default EditProductOrderPage