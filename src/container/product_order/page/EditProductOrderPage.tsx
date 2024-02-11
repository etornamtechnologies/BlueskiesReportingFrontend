import { Breadcrumb, Button, Col, Form, Row, message } from "antd"
import AppLayout from "../../../layout"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../redux_store/hook"
import { Creators as ProductOrderCreators } from "../../../services/redux/product_order/actions"
import { ICreateProductOrderRequest, IProductOrder, IProductOrderState, IOrderDetail } from "../../../models/product.order.model"

const EditProductOrderPage: React.FC = () => {
  const navigate = useNavigate()
  const { orderId } = useParams()
  const dispatch = useAppDispatch()
  const productOrderState: IProductOrderState = useAppSelector(state => state.product_order)
  const [productQuantity, setProductQuantity] = useState<IOrderDetail[]>([])
  const [orderForm] = Form.useForm()


  useEffect(() => {
    if(orderId) {
      dispatch(ProductOrderCreators.fetchProductOrder(orderId))
      
    }
  }, [orderId])

  useEffect(() => {

  }, [])

  return (
    <AppLayout
    header={(
      <Row>
        <Col span={12}>
        <Breadcrumb>
          <Breadcrumb.Item onClick={() => navigate('/product-orders')}>
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

    </AppLayout>
  )
}