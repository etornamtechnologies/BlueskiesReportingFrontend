import { Breadcrumb, Col, FloatButton, Form, Modal, Row } from "antd"
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem"
import React, { useEffect, useState } from "react"
import AirlineList from "./components/AirlineList"
import { useAppDispatch, useAppSelector } from '../../redux_store/hook'
import { IPostAirlineRequest, IAirline } from "../../models/airline.model"
import { Creators } from '../../services/redux/airline/actions'
import AppLayout from "../../layout"
import AddAirlineForm from "./components/AddAirlineForm"
import { PlusOutlined } from "@ant-design/icons"
import ConfirmModal from "../../components/ConfirmModal"

const AirlineIndex: React.FC = () => {
  const {
    airlines,
    selected_airline,
    post_success,
    posting,
    fetching
  } = useAppSelector(state => state.airline)

  const [createVisible, setCreateVisible] = useState<boolean>(false)
  const [editVisible, setEditVisible] = useState<boolean>(false)
  const [deleteVisible, setDeleteVisible] = useState<boolean>(false)

  const [editForm] = Form.useForm()
  const [createForm] = Form.useForm()

  const dispatch = useAppDispatch()

  const handleCreateSubmit = (values: any) => {
    const payload: IPostAirlineRequest = {
      name: values.name,
      description: values.description,
    }
    dispatch(Creators.postAirline(payload))
  }

  const handleEditSubmit = (values: any) => {
    const payload: IPostAirlineRequest = {
      name: values.name, 
      description: values.description,
    }
    dispatch(Creators.putAirline(selected_airline?.id, payload))
  }

  const handleDelete = (row: IAirline) => {
    dispatch(Creators.deleteAirline(row.id))
  }

  useEffect(() => {
    dispatch(Creators.resetAirline())
    dispatch(Creators.fetchAirlines({}))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if(post_success && !posting) {
      setCreateVisible(false)
      setEditVisible(false)
      setDeleteVisible(false)
      dispatch(Creators.fetchAirlines({}))
      dispatch(Creators.setSelectedAirline(null))
    }
  }, [dispatch, post_success, posting])

  return (
    <AppLayout
      header={(
        <Row>
          <Col span={24}>
            <Breadcrumb>
              <BreadcrumbItem>AIRLINES</BreadcrumbItem>
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
          <AirlineList
            airlines={airlines}
            loading={fetching}
            onEdit={(row: IAirline) => {
              dispatch(Creators.setSelectedAirline(row))
              editForm.setFieldsValue({
                name: row?.name, 
                description: row.description,
              })
              setEditVisible(true)
            }}
            onDelete={(row: IAirline) => {
              dispatch(Creators.setSelectedAirline(row))
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
        <AddAirlineForm 
          form={createForm}
          initialValues={{ 
            name: '',
            description: '',
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
          dispatch(Creators.setSelectedAirline(null))
        }}
      >
        <AddAirlineForm 
          form={editForm}
          initialValues={{ 
            name: selected_airline?.name as string,
            description: selected_airline?.description as string,
           }}
          onSubmit={handleEditSubmit}
          submitting={posting} 
        />
      </Modal>
      
      <ConfirmModal 
        open={deleteVisible}
        title='Delete Product Category'
        description={`Are you sure you want to delete this product category (${selected_airline?.name})`}
        onCancel={() => {
          setDeleteVisible(false)
          dispatch(Creators.setSelectedAirline(null))
        }}
        onOk={() => {
          handleDelete(selected_airline as IAirline)
        }}
        loading={posting}
      />
    </AppLayout>
  )
}

export default AirlineIndex