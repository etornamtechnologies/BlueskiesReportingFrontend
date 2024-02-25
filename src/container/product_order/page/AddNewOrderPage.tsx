import { Breadcrumb, Col, Input, Row, Select, Form, Table, Space, Divider, message, Button, DatePicker } from "antd"
import AppLayout from "../../../layout"
import { useNavigate } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import { ICreateProductOrderRequest, IProductOrder, IProductOrderState, IOrderDetail } from "../../../models/product.order.model"
import { useAppDispatch, useAppSelector } from '../../../redux_store/hook'
import { Creators as ProductCreators } from '../../../services/redux/product/actions'
import { Creators as CustomerCreators } from '../../../services/redux/customer/actions'
import { Creators as AirlineCreators } from '../../../services/redux/airline/actions'
import { Creators as ProductOrderCreators } from '../../../services/redux/product_order/actions'
import { IProduct, IProductState } from "../../../models/product.model"
import { ICustomerState } from "../../../models/customer.model"
import { IAirlineState } from "../../../models/airline.model"
import ProductAutoComplete from "../components/ProductAutoComplete"
import { ColumnsType } from "antd/es/table"
import { DeleteOutlined } from "@ant-design/icons"
import _debounce from "lodash/debounce"
import { ProductOrderFormFieldType } from "../components/ProductOrderBasicForm"



const AddNewOrderPage: React.FC = () => {

  const navigate = useNavigate()
   // eslint-disable-next-line
  const [order, setOrder] = useState<IProductOrder>()
  const [productQuantity, setProductQuantity] = useState<IOrderDetail[]>([])
  const [orderForm] = Form.useForm()

  const productState: IProductState = useAppSelector(state => state.product)
  const customerState: ICustomerState = useAppSelector(state => state.customer)
  const airlineState: IAirlineState = useAppSelector(state => state.airline)
  const productOrderState: IProductOrderState = useAppSelector(state => state.product_order)

  const dispatch = useAppDispatch()

  //eslint-disable-next-line
  const onChangeDebounceFn = useCallback(
    _debounce(filterProducts, 1000), 
    //eslint-disable-next-line
  [])

  function filterProducts(value: string) {
    dispatch(ProductCreators.fetchProducts({ productName: value}))
  }

  const colums: ColumnsType<IOrderDetail> = [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      render: (text, row) => row.product?.name
    },
    {
      title: 'Quantity (Packs)',
      dataIndex: 'quantity',
      key: 'quantity',
      width: '200px',
      render: (text, row) => (
        <Input 
          type="number" 
          value={row?.quantity}
          onChange={(e) => {
            const value = e.target.value
            setProductQuantity(productQuantity.map(it => {
              if(it.product?.id === row?.product?.id) {
                return {...it, quantity: Number(value) as number}
              } else {
                return it
              }
            }))
          }} 
        />
      )
    },
    {
      title: 'No. of Items',
      dataIndex: 'noOfItems',
      key: 'noOfItems',
      render: (text, row) => `${(row.quantity) * row?.product.quantityPerPack}`
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      align: 'right',
      render: (text, row) => (<Space>
        <DeleteOutlined 
          onClick={() => {
            setProductQuantity(productQuantity.filter(it => it?.product?.id !== row?.product?.id))
          }} 
        />
      </Space>)
    }
  ]

  useEffect(() => {
    dispatch(CustomerCreators.fetchCustomers({}))
    dispatch(AirlineCreators.fetchAirlines({}))
    dispatch(ProductCreators.fetchProducts({}))
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    if(!productOrderState.posting && productOrderState.post_success) {
      orderForm.resetFields()
      setProductQuantity([])
    }
    //eslint-disable-next-line
  }, [productOrderState.posting, productOrderState.post_success])


  return (
    <AppLayout
      header={(
        <Row>
          <Col span={12}>
          <Breadcrumb>
            <Breadcrumb.Item onClick={() => navigate('/app/product-orders')}>
              ORDERS
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              ADD NEW
            </Breadcrumb.Item>
          </Breadcrumb>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <Button 
              type="primary"
              loading={productOrderState.posting}
              onClick={() => {
                orderForm.validateFields()
                  .then(values => {
                    console.log('form values', values)
                    if(productQuantity.length < 1) { 
                      message.error("Please add products to order")
                    } else {
                      const payload: ICreateProductOrderRequest = {
                        customerId: values?.customerId,
                        airlineId: values?.airlineId,
                        flight: values?.flight,
                        description: values.description,
                        requiredDate: values.requiredDate,
                        products: productQuantity.map(it => ({ productId: it?.product?.id, quantity: it.quantity }))
                      }
                      dispatch(ProductOrderCreators.postProductOrder(payload))
                    }
                  })
                  .catch(e => {

                  })
                
              }}
            >
              SUBMIT
            </Button>
          </Col>
        </Row>
      )}
    >
      <Row>
        <Col span={24}>
          <Form
            autoComplete='off'
            layout='vertical'
            initialValues={{
              customerId: order?.customer?.id,
              airlineId: order?.airline.id,
              flight: order?.flight,
              description: order?.description,
              requiredDate: order?.requiredDate
            }}
            form={orderForm}
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
                    format="YYYY-MM-DD HH:mm:ss"

                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={24} style={{ marginTop: 10, marginBottom: 10 }}>
          <span>PRODUCTS</span>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <ProductAutoComplete
            products={productState.products}
            loading={productState.fetching}
            size='middle'
            onSearch={(val: string) => {
              console.log('val search', val)
              onChangeDebounceFn(val)
            }}
            onSelect={(val: string, options: any) => {
              console.log('find in', productQuantity.findIndex(it => it.product?.id === options?.id))
              if(productQuantity.findIndex(it => it.product?.id === options?.id) !== -1) {
                message.info("product is already added to order")
              } else {
                setProductQuantity(productQuantity.concat({ product: options as IProduct, quantity: 1 }))
              }
            }}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <Col span={24}>
          <Table
            columns={colums}
            dataSource={productQuantity.map((it, index) => ({...it, index: index}))}
            size="small"
            rowKey="index"
            pagination={false}
          />
        </Col>
      </Row>
    </AppLayout>
  )
}

export default AddNewOrderPage