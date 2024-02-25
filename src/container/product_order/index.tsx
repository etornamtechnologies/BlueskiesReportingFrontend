import { Breadcrumb, Col, FloatButton, Input, Row, Space } from "antd"
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem"
import React, { useEffect, useState } from "react"
import ProductOrderList from "./components/ProductOrderList"
import { useAppDispatch, useAppSelector } from '../../redux_store/hook'
import { IProductOrder } from "../../models/product.order.model"
import { Creators } from '../../services/redux/product_order/actions'
import { Creators as ProductCreators } from '../../services/redux/product/actions'
import AppLayout from "../../layout"
import { PlusOutlined } from "@ant-design/icons"
import ConfirmModal from "../../components/ConfirmModal"
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
  const [deleteVisible, setDeleteVisible] = useState<boolean>(false)
  const [search, setSearch] = useState<string>("")
  const dispatch = useAppDispatch()

  const handleDelete = (row: IProductOrder) => {
    dispatch(Creators.deleteProductOrder(row.id))
  }

  useEffect(() => {
    dispatch(Creators.resetProductOrder())
    dispatch(Creators.fetchProductOrders({ pageSize: 10000, pageNo: 0 }))
    dispatch(ProductCreators.fetchProducts({}))
    // dispatch(CustomerCreators.fetchCustomers({}))
    // dispatch(AirlineCreators.fetchAirlines({}))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if(post_success && !posting) {
      // setCreateVisible(false)
      // setEditVisible(false)
      setDeleteVisible(false)
      dispatch(Creators.fetchProductOrders({ pageSize: 10000, pageNo: 0 }))
      dispatch(Creators.setSelectedProductOrder(null))
    }
     // eslint-disable-next-line
  }, [dispatch, post_success, posting])

  return (
    <AppLayout
      header={(
        <Row>
          <Col span={12}>
            <Breadcrumb>
              <BreadcrumbItem>ORDERS</BreadcrumbItem>
            </Breadcrumb>
          </Col>
          <Col span={12} style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
            <Space>
              <Input.Search 
                placeholder="search..."
                value={search}
                onChange={(e) => {
                  console.log('search', e.target.value)
                  setSearch(e.target.value)
                }} 
              />
            </Space>
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
          navigate('/app/product-orders/add-new')
        }}
      />
      <Row>
        <Col span={24}>
          <ProductOrderList
            product_orders={product_orders}
            loading={fetching}
            onEdit={(row: IProductOrder) => {
              navigate(`/app/product-orders/edit/${row?.id}`)
            }}
            onView={(row: IProductOrder) => {
              navigate(`/app/product-orders/view-detail/${row.id}`)
            }}
            onDelete={(row: IProductOrder) => {
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