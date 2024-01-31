import { Breadcrumb, Button, Col, FloatButton, Form, Modal, Row, message } from "antd"
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem"
import React, { useEffect, useState } from "react"
import ProductCategoryList from "./components/ProductCategoryList"
import { useAppDispatch, useAppSelector } from '../../redux_store/hook'
import { ICreateProductCategoryRequest, IProductCategory, IProductCategoryState } from "../../models/product.category.model"
import { Creators } from '../../services/redux/product_category/actions'
import AppLayout from "../../layout"
import AddProductCategoryForm from "./components/AddProductCategoryForm"
import { PlusOutlined } from "@ant-design/icons"
import ConfirmModal from "../../components/ConfirmModal"

const ProductIndex: React.FC = () => {
  const {
    product_categories,
    selected_product_category,
    post_success,
    posting,
    fetching
  } = useAppSelector(state => state.product_category)

  const [createVisible, setCreateVisible] = useState<boolean>(false)
  const [editVisible, setEditVisible] = useState<boolean>(false)
  const [deleteVisible, setDeleteVisible] = useState<boolean>(false)

  const [editForm] = Form.useForm()
  const [createForm] = Form.useForm()

  const dispatch = useAppDispatch()

  const handleCreateSubmit = (values: any) => {
    const payload: ICreateProductCategoryRequest = {name: values.name, description: values.description}
    dispatch(Creators.postProductCategory(payload))
  }

  const handleEditSubmit = (values: any) => {
    const payload: ICreateProductCategoryRequest = {name: values.name, description: values.description}
    dispatch(Creators.putProductCategory(selected_product_category?.id, payload))
  }

  const handleDelete = (row: IProductCategory) => {
    dispatch(Creators.deleteProductCategory(row.id))
  }

  useEffect(() => {
    dispatch(Creators.resetProductCategory())
    dispatch(Creators.fetchProductCategories({}))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if(post_success && !posting) {
      setCreateVisible(false)
      setEditVisible(false)
      setDeleteVisible(false)
      dispatch(Creators.fetchProductCategories({}))
      dispatch(Creators.setSelectedProductCategory(null))
    }
  }, [dispatch, post_success, posting])

  return (
    <AppLayout
      header={(
        <Row>
          <Col span={24}>
            <Breadcrumb>
              <BreadcrumbItem>PRODUCT CATEGORIES</BreadcrumbItem>
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
          <ProductCategoryList
            product_categories={product_categories}
            loading={fetching}
            onEdit={(row: IProductCategory) => {
              console.log(`Edit Product Category: ${row}`)
              dispatch(Creators.setSelectedProductCategory(row))
              editForm.setFieldsValue({name: row?.name, description: row.description})
              setEditVisible(true)
            }}
            onDelete={(row: IProductCategory) => {
              dispatch(Creators.setSelectedProductCategory(row))
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
        <AddProductCategoryForm 
          form={createForm}
          initialValues={{ 
            name: '',
            description: ''
           }}
          onSubmit={handleCreateSubmit}
          submitting={posting} 
        />
      </Modal>

      <Modal
        open={editVisible}
        title='EDIT PRODUCT CATEGORY'
        footer={false}
        onCancel={() => {
          setEditVisible(false)
          dispatch(Creators.setSelectedProductCategory(null))
        }}
      >
        <AddProductCategoryForm 

          form={editForm}
          initialValues={{ 
            name: selected_product_category?.name as string,
            description: selected_product_category?.description as string
           }}
          onSubmit={handleEditSubmit}
          submitting={posting} 
        />
      </Modal>
      
      <ConfirmModal 
        open={deleteVisible}
        title='Delete Product Category'
        description={`Are you sure you want to delete this product category (${selected_product_category?.name})`}
        onCancel={() => {
          setDeleteVisible(false)
          dispatch(Creators.setSelectedProductCategory(null))
        }}
        onOk={() => {
          handleDelete(selected_product_category as IProductCategory)
        }}
        loading={posting}
      />
    </AppLayout>
  )
}

export default ProductIndex