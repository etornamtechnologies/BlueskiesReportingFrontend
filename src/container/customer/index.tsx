import { Breadcrumb, Col, FloatButton, Form, Modal, Row } from "antd"
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem"
import React, { useEffect, useState } from "react"
import CustomerList from "./components/CustomerList"
import { useAppDispatch, useAppSelector } from '../../redux_store/hook'
import { IPostCustomerRequest, ICustomer } from "../../models/customer.model"
import { Creators } from '../../services/redux/customer/actions'
import AppLayout from "../../layout"
import AddCustomerForm from "./components/AddCustomerForm"
import { PlusOutlined } from "@ant-design/icons"
import ConfirmModal from "../../components/ConfirmModal"

const CustomerIndex: React.FC = () => {
  const {
    customers,
    selected_customer,
    post_success,
    posting,
    fetching
  } = useAppSelector(state => state.customer)

  const [createVisible, setCreateVisible] = useState<boolean>(false)
  const [editVisible, setEditVisible] = useState<boolean>(false)
  const [deleteVisible, setDeleteVisible] = useState<boolean>(false)

  const [editForm] = Form.useForm()
  const [createForm] = Form.useForm()

  const dispatch = useAppDispatch()

  const handleCreateSubmit = (values: any) => {
    const payload: IPostCustomerRequest = {
      name: values.name,
      description: values.description,
      location: values.location,
      email: values.email,
      phoneNumber: values.phoneNumber
    }
    dispatch(Creators.postCustomer(payload))
  }

  const handleEditSubmit = (values: any) => {
    const payload: IPostCustomerRequest = {
      name: values.name, 
      description: values.description,
      location: values.location,
      email: values.email,
      phoneNumber: values.phoneNumber
    }
    dispatch(Creators.putCustomer(selected_customer?.id, payload))
  }

  const handleDelete = (row: ICustomer) => {
    dispatch(Creators.deleteCustomer(row.id))
  }

  useEffect(() => {
    dispatch(Creators.resetCustomer())
    dispatch(Creators.fetchCustomers({}))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if(post_success && !posting) {
      setCreateVisible(false)
      setEditVisible(false)
      setDeleteVisible(false)
      dispatch(Creators.fetchCustomers({}))
      dispatch(Creators.setSelectedCustomer(null))
    }
  }, [dispatch, post_success, posting])

  return (
    <AppLayout
      header={(
        <Row>
          <Col span={24}>
            <Breadcrumb>
              <BreadcrumbItem>CUSTOMERS</BreadcrumbItem>
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
          <CustomerList
            customers={customers}
            loading={fetching}
            onEdit={(row: ICustomer) => {
              dispatch(Creators.setSelectedCustomer(row))
              editForm.setFieldsValue({
                name: row?.name, 
                description: row.description,
                location: row?.location,
                email: row?.email,
                phoneNumber: row?.phoneNumber
              })
              setEditVisible(true)
            }}
            onDelete={(row: ICustomer) => {
              dispatch(Creators.setSelectedCustomer(row))
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
        <AddCustomerForm 
          form={createForm}
          initialValues={{ 
            name: '',
            description: '',
            location: '',
            email: '',
            phoneNumber: ''
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
          dispatch(Creators.setSelectedCustomer(null))
        }}
      >
        <AddCustomerForm 

          form={editForm}
          initialValues={{ 
            name: selected_customer?.name as string,
            description: selected_customer?.description as string,
            location: selected_customer?.location as string,
            email: selected_customer?.email as string,
            phoneNumber: selected_customer?.phoneNumber as string,
           }}
          onSubmit={handleEditSubmit}
          submitting={posting} 
        />
      </Modal>
      
      <ConfirmModal 
        open={deleteVisible}
        title='Delete Product Category'
        description={`Are you sure you want to delete this product category (${selected_customer?.name})`}
        onCancel={() => {
          setDeleteVisible(false)
          dispatch(Creators.setSelectedCustomer(null))
        }}
        onOk={() => {
          handleDelete(selected_customer as ICustomer)
        }}
        loading={posting}
      />
    </AppLayout>
  )
}

export default CustomerIndex