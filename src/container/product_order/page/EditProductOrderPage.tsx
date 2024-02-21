import { Breadcrumb, Button, Card, Col, Form, Input, List, Modal, Row, Select, Space, Spin, Table, TableColumnsType, message } from "antd"
import AppLayout from "../../../layout"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../redux_store/hook"
import { Creators as ProductOrderCreators } from "../../../services/redux/product_order/actions"
import { Creators as CustomerCreators } from "../../../services/redux/customer/actions"
import { Creators as AirlineCreators } from "../../../services/redux/airline/actions"
import { Creators as ProductCreators } from "../../../services/redux/product/actions"
import { ICreateProductOrderRequest, IProductOrder, IProductOrderState, IOrderDetail, IOrderFulfillment, IUpdateProductOrderDetailRequest, IUpdateProductOrderRequest } from "../../../models/product.order.model"
import { ColumnsType } from "antd/es/table"
import { prettifyDateTime } from "../../../utils/common.helper"
import ProductOrderBasicForm from "../components/ProductOrderBasicForm"
import { ICustomerState } from "../../../models/customer.model"
import { IAirlineState } from "../../../models/airline.model"
import { EditOutlined } from "@ant-design/icons"
import { IProductState } from "../../../models/product.model"

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

  const [productQuantity, setProductQuantity] = useState<IOrderDetail[]>([])
  const [orderForm] = Form.useForm()
  const [fulfillmentForm] = Form.useForm()

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
  }, [])

  useEffect(() => {
    if (orderId) {
      dispatch(ProductOrderCreators.fetchProductOrder(orderId))
    }
  }, [orderId])

  useEffect(() => {
    if(productOrderState.product_order) {
      const order = productOrderState.product_order
      orderForm.setFieldsValue({
        airlineId: order.airline.id,
        customerId: order.customer.id,
        requiredDate: order.requiredDate,
        
      })
    }
  }, [productOrderState.product_order])

  useEffect(() => {
    if (productOrderState.product_order) {
      const productOrder = productOrderState.product_order
      orderForm.setFieldsValue({
        customerId: productOrder.customer.id,
        airlineId: productOrder.airline.id,
        description: productOrder.description,
        flight: productOrder.flight,
        requiredDate: productOrder.requiredDate
      })
    }
  }, [productOrderState.product_order])

  return (
    <AppLayout
      header={(
        <Row>
          <Col span={24}>
            <Breadcrumb>
              <Breadcrumb.Item onClick={() => navigate('/product-orders')}>
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
                <ProductOrderBasicForm
                  form={orderForm}
                  initialValues={{
                    customerId: productOrderState.product_order?.customer?.id as string,
                    airlineId: productOrderState.product_order?.airline?.id as string,
                    description: productOrderState.product_order?.description as string,
                    flight: productOrderState.product_order?.flight as string,
                    requiredDate: productOrderState.product_order?.requiredDate as string
                  }}
                  customers={customerState.customers}
                  fetchingCustomers={customerState.fetching}
                  airlines={airlineState.airlines}
                  fetchingAirlines={airlineState.fetching}
                  onSubmit={(values: any) => {
                    const payload: IUpdateProductOrderRequest = {
                      customerId: values?.customerId as string,
                      airlineId: values?.airlineId as string,
                      description: values?.description as string,
                      flight: values?.flight as string,
                      requiredDate: values?.requiredDate as string,
                    }
                    dispatch(ProductOrderCreators.putProductOrder(productOrderState.product_order?.id, payload))
                  }}
                />
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
          <Form.Item label='Ordered Quantity' name='quantity' rules={[{required: true, message: "Quantity is required"}]}>
            <Input type='number' />
          </Form.Item>
          <Button loading={productOrderState.posting} type="primary" htmlType="submit" >UPDATE</Button>
        </Form>
      </Modal>
    </AppLayout>
  )
}

export default EditProductOrderPage