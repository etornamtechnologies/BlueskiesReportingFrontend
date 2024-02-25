import { Breadcrumb, Col, FloatButton, Form, Modal, Row } from "antd"
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem"
import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from '../../redux_store/hook'
import { ERole, ICreateUserRequest, IUser } from "../../models/user.model"
import { Creators } from '../../services/redux/user/actions'
import AppLayout from "../../layout"
import AddUserForm from "./components/AddUserForm"
import { PlusOutlined } from "@ant-design/icons"
import ConfirmModal from "../../components/ConfirmModal"
import UserList from "./components/UserList"

const UserIndex: React.FC = () => {
  const {
    users,
    selected_user,
    post_success,
    posting,
    fetching
  } = useAppSelector(state => state.user)

  const [createVisible, setCreateVisible] = useState<boolean>(false)
  const [editVisible, setEditVisible] = useState<boolean>(false)
  const [deleteVisible, setDeleteVisible] = useState<boolean>(false)

  const [editForm] = Form.useForm()
  const [createForm] = Form.useForm()

  const dispatch = useAppDispatch()

  const handleCreateSubmit = (values: any) => {
    console.log('values', values)
    const payload: ICreateUserRequest = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      role: values.role,
    }
    dispatch(Creators.postUser(payload))
  }

  const handleEditSubmit = (values: any) => {
    const payload: ICreateUserRequest = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      role: values.role,
    }
    dispatch(Creators.putUser(selected_user?.id, payload))
  }

  const handleDelete = (row: IUser) => {
    dispatch(Creators.deleteUser(row.id))
  }

  useEffect(() => {
    dispatch(Creators.resetUser())
    dispatch(Creators.fetchUsers({}))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if(post_success && !posting) {
      setCreateVisible(false)
      setEditVisible(false)
      setDeleteVisible(false)
      dispatch(Creators.fetchUsers({}))
      dispatch(Creators.setSelectedUser(null))
    }
  }, [dispatch, post_success, posting])

  return (
    <AppLayout
      header={(
        <Row>
          <Col span={24}>
            <Breadcrumb>
              <BreadcrumbItem>USERS</BreadcrumbItem>
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
          <UserList
            users={users}
            loading={fetching}
            onEdit={(row: IUser) => {
              dispatch(Creators.setSelectedUser(row))
              editForm.setFieldsValue({
                firstName: row?.firstName, 
                lastName: row.lastName,
                email: row.email,
                role: row?.role
              })
              setEditVisible(true)
            }}
            onDelete={(row: IUser) => {
              dispatch(Creators.setSelectedUser(row))
              setDeleteVisible(true)
            }}
          />
        </Col>
      </Row>

      <Modal
        open={createVisible}
        title='ADD NEW USER'
        footer={false}
        onCancel={() => {
          setCreateVisible(false)
        }}
      >
        <AddUserForm 
          form={createForm}
          initialValues={{ 
            firstName: '', 
            lastName: '',
            email: '',
            role: ERole.UPDATER
           }}
          onSubmit={handleCreateSubmit}
          submitting={posting}
        />
      </Modal>

      <Modal
        open={editVisible}
        title='EDIT PRODUCT'
        footer={false}
        onCancel={() => {
          setEditVisible(false)
          dispatch(Creators.setSelectedUser(null))
        }}
      >
        <AddUserForm 
          form={editForm}
          initialValues={{ 
            firstName: selected_user?.firstName as string,
            lastName: selected_user?.lastName as string,
            email: selected_user?.email as string,
            role: selected_user?.role as ERole,
           }}
          onSubmit={handleEditSubmit}
          submitting={posting}
        />
      </Modal>
      
      <ConfirmModal 
        open={deleteVisible}
        title='Delete User'
        description={`Are you sure you want to delete this user (${selected_user?.email})`}
        onCancel={() => {
          setDeleteVisible(false)
          dispatch(Creators.setSelectedUser(null))
        }}
        onOk={() => {
          handleDelete(selected_user as IUser)
        }}
        loading={posting}
      />
    </AppLayout>
  )
}

export default UserIndex