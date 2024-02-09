import { Breadcrumb, Button, Col, Divider, Table, List, Row, Space, Spin, Modal, Form, Input } from "antd"
import AppLayout from "../../../layout"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Creators as ProductOrderCreators } from '../../../services/redux/product_order/actions'
import { useAppDispatch, useAppSelector } from '../../../redux_store/hook'
import { IAddFulfillmentRequest, IProductOrderState, OrderDetail } from "../../../models/product.order.model"
import { ColumnsType } from "antd/es/table"

const ProductOrderDetailPage: React.FC = () => {
  const navigate = useNavigate()
  const { orderId } = useParams()

  const productOrderState: IProductOrderState = useAppSelector(state => state.product_order)
  const dispatch = useAppDispatch()
  const {
    product_order,
    fetching
  } = productOrderState

  const [selectedorderDetail, setSelectedOrderDetail] = useState<OrderDetail | null>(null)
  const [fulfillmentVisible, setFulfillmentVisible] = useState<boolean>(false)
  const [fulfillmentForm] = Form.useForm()


  const colums: ColumnsType<OrderDetail> = [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      render: (text, row) => row.product?.name
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      align: 'right',
      render: (text, row) => (<Space>
        <Button
          onClick={() => {
            fulfillmentForm.resetFields()
            setSelectedOrderDetail(row)
            setFulfillmentVisible(true)
          }}
        >
          Add Fulfillment
        </Button>
      </Space>)
    }
  ]


  useEffect(() => {
    if (orderId) {
      dispatch(ProductOrderCreators.fetchProductOrder(orderId))
    }
  }, [orderId])

  useEffect(() => {
    if(!productOrderState.posting_fulfillment && productOrderState.post_fulfillment_success) {
      setFulfillmentVisible(false)
      setSelectedOrderDetail(null)
      fulfillmentForm.resetFields()
    }
  }, [productOrderState.post_fulfillment_success, productOrderState.posting_fulfillment])

  return (
    <AppLayout
      header={(
        <Row>
          <Col span={12}>
            <Breadcrumb>
              <Breadcrumb.Item
                onClick={() => navigate('/product-orders')}
              >
                ORDERS
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                DETAIL
              </Breadcrumb.Item>
            </Breadcrumb>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            {/* <Button type='default'>
              Add Fulfillment
            </Button> */}
          </Col>
        </Row>
      )}
    >
      {fetching ? <Spin /> : (
        <>
          <Row>
            <Col span={12}>
              <List>
                <List.Item>
                  <List.Item.Meta title="Company" description={product_order?.customer?.name} />
                </List.Item>
                <List.Item>
                  <List.Item.Meta title="Flight" description={product_order?.flight} />
                </List.Item>
                <List.Item>
                  <List.Item.Meta title="Description" description={product_order?.description} />
                </List.Item>
              </List>
            </Col>
            <Col span={12}>
              <List>
                <List.Item>
                  <List.Item.Meta title="Airline" description={product_order?.airline?.name} />
                </List.Item>
                <List.Item>
                  <List.Item.Meta title="Required Date" description={product_order?.requiredDate} />
                </List.Item>
                <List.Item>
                  <List.Item.Meta title="Status" description={product_order?.status || "N/A"} />
                </List.Item>
              </List>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={24}>
              <span>PRODUCTS</span>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Table
                size="small"
                columns={colums}
                dataSource={product_order?.orderDetails.map((item, index) => ({...item, index: index}))}
                rowKey="index"
                pagination={false}
              />
            </Col>
          </Row>
        </>
      )}


      <Modal
        open={fulfillmentVisible}
        title="Add Fulfillment"
        footer={false}
        onCancel={() => {
          setFulfillmentVisible(false)
          setSelectedOrderDetail(null)
        }}
      >
        <Row>
          <Col span={24}>
            <List>
              <List.Item>
                <List.Item.Meta title="Product" description={selectedorderDetail?.product?.name} />
              </List.Item>
              <List.Item>
                <List.Item.Meta title="Quantity" description={selectedorderDetail?.quantity} />
              </List.Item>
            </List>
          </Col>
        </Row>
        <Form
          initialValues={{
            quantity: 1
          }}
          layout="vertical"
          onFinish={(values) => {
            const payload: IAddFulfillmentRequest = {
              productOrderId: product_order?.id as string,
              orderDetails: [{productId: selectedorderDetail?.product.id as string, quantity: values?.quantity as number}]
            }
            dispatch(ProductOrderCreators.addFulfillment(payload))
          }}
          form={fulfillmentForm}
        >
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{required: true, message: "Quantity is required"}]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit"
              loading={productOrderState.posting_fulfillment}
            >
              SUBMIT
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </AppLayout>
  )
}

export default ProductOrderDetailPage