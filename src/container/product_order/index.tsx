import { Breadcrumb, Col, Drawer, FloatButton, Form, Modal, Row } from "antd"
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem"
import React, { useEffect, useState } from "react"
import ProductOrderList from "./components/ProductOrderList"
import { useAppDispatch, useAppSelector } from '../../redux_store/hook'
import { ICreateProductOrderRequest, INewOrder, IProductOrder } from "../../models/product.order.model"
import { Creators } from '../../services/redux/product_order/actions'
import { Creators as ProductCreators } from '../../services/redux/product/actions'
import { Creators as CustomerCreators } from '../../services/redux/customer/actions'
import { Creators as AirlineCreators } from '../../services/redux/airline/actions'
import AppLayout from "../../layout"
import { PlusOutlined } from "@ant-design/icons"
import ConfirmModal from "../../components/ConfirmModal"
import AddMultipleProductOrderForm from "./components/AddMultipleProductOrderForm"
import { useNavigate } from "react-router-dom"

const ProductOrderIndex: React.FC = () => {
  const {
    product_orders,
    selected_product_order,
    post_success,
    posting,
    fetching
  } = useAppSelector(state => state.product_order)
  const navigate = useNavigate()

  const { customers, fetching: fetchingCustomers } = useAppSelector(state => state.customer)
  const { products, fetching: fetchingProducts } = useAppSelector(state => state.product)
  const { airlines, fetching: fetchingAirlines } = useAppSelector(state => state.airline)


  const [createVisible, setCreateVisible] = useState<boolean>(false)
  const [editVisible, setEditVisible] = useState<boolean>(false)
  const [deleteVisible, setDeleteVisible] = useState<boolean>(false)
  const [orderProductQuantities, setOrderProductQuantities] = useState<Array<{productId: string, quantity: number}>>([])
  const [order, setOrder] = useState<INewOrder | null>({ 
                    customerId: undefined, 
                    airlineId: undefined,
                    flight: '',
                    description: '',
                    productQuantity: [] 
                  })

  const [editForm] = Form.useForm()
  const [createForm] = Form.useForm()

  const dispatch = useAppDispatch()

  // const handleCreateSubmit = (values: any) => {
  //   const payload: ICreateProductOrderRequest = {
  //     productId: values.productId,
  //     customerId: values.customerId,
  //     airlineId: values.airlineId,
  //     quantity: values.quantity,
  //     description: values.description,
  //     flight: values.flight
  //   }
  //   dispatch(Creators.postProductOrder(payload))
  // }

  // const handleEditSubmit = (values: any) => {
  //   const payload: ICreateProductOrderRequest = {
  //     productId: values.productId,
  //     customerId: values.customerId,
  //     airlineId: values.airlineId,
  //     quantity: values.quantity,
  //     description: values.description,
  //     flight: values.flight
  //   }
  //   dispatch(Creators.putProductOrder(selected_product_order?.id, payload))
  // }

  const handleDelete = (row: IProductOrder) => {
    dispatch(Creators.deleteProductOrder(row.id))
  }

  useEffect(() => {
    dispatch(Creators.resetProductOrder())
    dispatch(Creators.fetchProductOrders({}))
    dispatch(ProductCreators.fetchProducts({}))
    dispatch(CustomerCreators.fetchCustomers({}))
    dispatch(AirlineCreators.fetchAirlines({}))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if(post_success && !posting) {
      setCreateVisible(false)
      setEditVisible(false)
      setDeleteVisible(false)
      dispatch(Creators.fetchProductOrders({}))
      dispatch(Creators.setSelectedProductOrder(null))
    }
  }, [dispatch, post_success, posting])

  return (
    <AppLayout
      header={(
        <Row>
          <Col span={24}>
            <Breadcrumb>
              <BreadcrumbItem>ORDERS</BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
      )}
    >
      <FloatButton 
        type='primary' 
        tooltip='Add new' 
        icon={<PlusOutlined/>} 
        onClick={() => {
          //setCreateVisible(true)
          navigate('/product-orders/add-new')
        }}
      />
      <Row>
        <Col span={24}>
          <ProductOrderList
            product_orders={product_orders}
            loading={fetching}
            // onEdit={(row: IProductOrder) => {
            //   dispatch(Creators.setSelectedProductOrder(row))
            //   editForm.setFieldsValue({
            //     productId: row.product.id as string,
            //     customerId: row.customer.id,
            //     airlineId: row.airline.id,
            //     quantity: row.quantity,
            //     description: row.description,
            //     flight: row.flight
            //   })
            //   setEditVisible(true)
            // }}
            onView={(row: IProductOrder) => {
              navigate(`/product-orders/view-detail/${row.id}`)
            }}
            onDelete={(row: IProductOrder) => {
              console.log('row', row)
              dispatch(Creators.setSelectedProductOrder(row))
              setDeleteVisible(true)
            }}
          />
        </Col>
      </Row>

      
      <ConfirmModal 
        open={deleteVisible}
        title='Delete Product Category'
        description={`Are you sure you want to delete this order`}
        onCancel={() => {
          setDeleteVisible(false)
          dispatch(Creators.setSelectedProductOrder(null))
        }}
        onOk={() => {
          console.log('selected product order', selected_product_order)
          handleDelete(selected_product_order as IProductOrder)
        }}
        loading={posting}
      />
    </AppLayout>
  )
}

export default ProductOrderIndex