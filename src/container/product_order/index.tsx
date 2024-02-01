import { Breadcrumb, Col, FloatButton, Form, Modal, Row } from "antd"
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem"
import React, { useEffect, useState } from "react"
import ProductOrderList from "./components/ProductOrderList"
import { useAppDispatch, useAppSelector } from '../../redux_store/hook'
import { ICreateProductOrderRequest, IProductOrder } from "../../models/product.order.model"
import { Creators } from '../../services/redux/product_order/actions'
import { Creators as ProductCreators } from '../../services/redux/product/actions'
import { Creators as CustomerCreators } from '../../services/redux/customer/actions'
import { Creators as AirlineCreators } from '../../services/redux/airline/actions'
import AppLayout from "../../layout"
import AddProductOrderForm from "./components/AddProductOrderForm"
import { PlusOutlined } from "@ant-design/icons"
import ConfirmModal from "../../components/ConfirmModal"

const ProductOrderIndex: React.FC = () => {
  const {
    product_orders,
    selected_product_order,
    post_success,
    posting,
    fetching
  } = useAppSelector(state => state.product_order)
  const { customers, fetching: fetchingCustomers } = useAppSelector(state => state.customer)
  const { products, fetching: fetchingProducts } = useAppSelector(state => state.product)
  const { airlines, fetching: fetchingAirlines } = useAppSelector(state => state.airline)

  const [createVisible, setCreateVisible] = useState<boolean>(false)
  const [editVisible, setEditVisible] = useState<boolean>(false)
  const [deleteVisible, setDeleteVisible] = useState<boolean>(false)

  const [editForm] = Form.useForm()
  const [createForm] = Form.useForm()

  const dispatch = useAppDispatch()

  const handleCreateSubmit = (values: any) => {
    const payload: ICreateProductOrderRequest = {
      productId: values.productId,
      customerId: values.customerId,
      airlineId: values.airlineId,
      quantity: values.quantity,
      description: values.description,
      flight: values.flight
    }
    dispatch(Creators.postProductOrder(payload))
  }

  const handleEditSubmit = (values: any) => {
    const payload: ICreateProductOrderRequest = {
      productId: values.productId,
      customerId: values.customerId,
      airlineId: values.airlineId,
      quantity: values.quantity,
      description: values.description,
      flight: values.flight
    }
    dispatch(Creators.putProductOrder(selected_product_order?.id, payload))
  }

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
          setCreateVisible(true)
        }}
      />
      <Row>
        <Col span={24}>
          <ProductOrderList
            product_orders={product_orders}
            loading={fetching}
            onEdit={(row: IProductOrder) => {
              dispatch(Creators.setSelectedProductOrder(row))
              editForm.setFieldsValue({
                productId: row.product.id as string,
                customerId: row.customer.id,
                airlineId: row.airline.id,
                quantity: row.quantity,
                description: row.description,
                flight: row.flight
              })
              setEditVisible(true)
            }}
            onDelete={(row: IProductOrder) => {
              dispatch(Creators.setSelectedProductOrder(row))
              setDeleteVisible(true)
            }}
          />
        </Col>
      </Row>

      <Modal
        open={createVisible}
        title='ADD NEW PRODUCT CATEGORY'
        footer={false}
        onCancel={() => {
          setCreateVisible(false)
        }}
      >
        <AddProductOrderForm 
          form={createForm}
          initialValues={{
            productId: '',
            customerId: '',
            airlineId: '',
            quantity: 0,
            description: '',
            flight: ''
          }}
          onSubmit={handleCreateSubmit}
          submitting={posting} 
          customers={customers} 
          fetchingCustomers={fetchingCustomers} 
          products={products} 
          fetchingProducts={fetchingProducts} 
          airlines={airlines} 
          fetchingAirlines={fetchingAirlines}
        />
      </Modal>

      <Modal
        open={editVisible}
        title='EDIT PRODUCT CATEGORY'
        footer={false}
        onCancel={() => {
          setEditVisible(false)
          dispatch(Creators.setSelectedProductOrder(null))
        }}
      >
        <AddProductOrderForm 
          form={editForm}
          initialValues={{ 
            productId: selected_product_order?.product.id as string,
            customerId: selected_product_order?.customer.id as string,
            airlineId: selected_product_order?.airline.id as string,
            quantity: selected_product_order?.quantity as number,
            description: selected_product_order?.description as string,
            flight: selected_product_order?.flight as string
           }}
          onSubmit={handleEditSubmit}
          submitting={posting} 
          customers={customers} 
          fetchingCustomers={fetchingCustomers} 
          products={products} 
          fetchingProducts={fetchingProducts} 
          airlines={airlines} 
          fetchingAirlines={fetchingAirlines}
        />
      </Modal>
      
      <ConfirmModal 
        open={deleteVisible}
        title='Delete Product Category'
        description={`Are you sure you want to delete this order`}
        onCancel={() => {
          setDeleteVisible(false)
          dispatch(Creators.setSelectedProductOrder(null))
        }}
        onOk={() => {
          handleDelete(selected_product_order as IProductOrder)
        }}
        loading={posting}
      />
    </AppLayout>
  )
}

export default ProductOrderIndex