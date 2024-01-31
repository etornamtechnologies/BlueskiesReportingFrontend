import { Breadcrumb, Col, FloatButton, Form, Modal, Row } from "antd"
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem"
import React, { useEffect, useState } from "react"
import ProductList from "./components/ProductList"
import { useAppDispatch, useAppSelector } from '../../redux_store/hook'
import { ICreateProductRequest, IProduct, Measurementunits } from "../../models/product.model"
import { Creators } from '../../services/redux/product/actions'
import { Creators as ProducCategoryCreators } from '../../services/redux/product_category/actions'
import AppLayout from "../../layout"
import AddProductForm from "./components/AddProductForm"
import { PlusOutlined } from "@ant-design/icons"
import ConfirmModal from "../../components/ConfirmModal"

const ProductIndex: React.FC = () => {
  const {
    products,
    selected_product,
    post_success,
    posting,
    fetching
  } = useAppSelector(state => state.product)

  const {
    product_categories,
    fetching: fetching_product_categories
  } = useAppSelector(state => state.product_category)

  const [createVisible, setCreateVisible] = useState<boolean>(false)
  const [editVisible, setEditVisible] = useState<boolean>(false)
  const [deleteVisible, setDeleteVisible] = useState<boolean>(false)

  const [editForm] = Form.useForm()
  const [createForm] = Form.useForm()

  const dispatch = useAppDispatch()

  const handleCreateSubmit = (values: any) => {
    console.log('values', values)
    const payload: ICreateProductRequest = {
      name: values.name,
      description: values.description,
      weight: values.weight,
      measurementUnits: values.measurementUnit,
      quantityPerPack: values.quantityPerPack,
      productCategoryId: values.productCategoryId
    }
    dispatch(Creators.postProduct(payload))
  }

  const handleEditSubmit = (values: any) => {
    const payload: ICreateProductRequest = {
      name: values.name,
      description: values.description,
      weight: values.weight,
      measurementUnits: values.measurementUnit,
      quantityPerPack: values.quantityPerPack,
      productCategoryId: values.productCategoryId
    }
    dispatch(Creators.putProduct(selected_product?.id, payload))
  }

  const handleDelete = (row: IProduct) => {
    dispatch(Creators.deleteProduct(row.id))
  }

  useEffect(() => {
    dispatch(Creators.resetProduct())
    dispatch(Creators.fetchProducts({}))
    dispatch(ProducCategoryCreators.fetchProductCategories({}))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if(post_success && !posting) {
      setCreateVisible(false)
      setEditVisible(false)
      setDeleteVisible(false)
      dispatch(Creators.fetchProducts({}))
      dispatch(Creators.setSelectedProduct(null))
    }
  }, [dispatch, post_success, posting])

  return (
    <AppLayout
      header={(
        <Row>
          <Col span={24}>
            <Breadcrumb>
              <BreadcrumbItem>PRODUCTS</BreadcrumbItem>
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
          createForm.resetFields()
          setCreateVisible(true)
        }}
      />
      <Row>
        <Col span={24}>
          <ProductList
            products={products}
            loading={fetching}
            onEdit={(row: IProduct) => {
              dispatch(Creators.setSelectedProduct(row))
              editForm.setFieldsValue({
                name: row?.name, 
                description: row.description,
                weight: row.weight,
                measurementUnit: row.measurementUnits,
                quantityPerPack: row?.quantityPerPack as number,
                packWeightInKg: row?.packWeightInKg as number,
                productCategoryId: row?.productCategory?.id as string
              })
              setEditVisible(true)
            }}
            onDelete={(row: IProduct) => {
              dispatch(Creators.setSelectedProduct(row))
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
        <AddProductForm 
          form={createForm}
          initialValues={{ 
            name: '',
            description: '',
            weight: 0,
            measurementUnit: Measurementunits.GRAM.toString(),
            quantityPerPack: 0,
            productCategoryId: ''
           }}
          onSubmit={handleCreateSubmit}
          submitting={posting} 
          productCategories={product_categories}
          loadingProductCategories={fetching_product_categories}
        />
      </Modal>

      <Modal
        open={editVisible}
        title='EDIT PRODUCT'
        footer={false}
        onCancel={() => {
          setEditVisible(false)
          dispatch(Creators.setSelectedProduct(null))
        }}
      >
        <AddProductForm 

          form={editForm}
          initialValues={{ 
            name: selected_product?.name as string,
            description: selected_product?.description as string,
            weight: 0,
            measurementUnit: Measurementunits.GRAM.toString(),
            quantityPerPack: selected_product?.quantityPerPack as number,
            productCategoryId: selected_product?.productCategory?.id as string
           }}
          onSubmit={handleEditSubmit}
          submitting={posting} 
        />
      </Modal>
      
      <ConfirmModal 
        open={deleteVisible}
        title='Delete Product Category'
        description={`Are you sure you want to delete this product category (${selected_product?.name})`}
        onCancel={() => {
          setDeleteVisible(false)
          dispatch(Creators.setSelectedProduct(null))
        }}
        onOk={() => {
          handleDelete(selected_product as IProduct)
        }}
        loading={posting}
      />
    </AppLayout>
  )
}

export default ProductIndex