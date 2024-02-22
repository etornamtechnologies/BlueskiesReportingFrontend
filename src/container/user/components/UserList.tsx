import { ColumnsType } from "antd/es/table"
import { Col, Row, Space, Tooltip, Table } from "antd"
import { IUser } from "../../../models/user.model"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"

type Props = {
  users: Array<IUser>
  loading: boolean
  onEdit: (row: IUser) => void
  onDelete: (row: IUser) => void
}



const UserList: React.FC<Props> = ({
  users,
  loading,
  onEdit,
  onDelete
}) => {

  const columns: ColumnsType<IUser>  = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, row) => `${row?.firstName} ${row?.lastName}`
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, row) => (
        <Space wrap>
          <Tooltip title='Edit'>
            <EditOutlined style={{ color: 'black' }} onClick={() => onEdit(row)}/>
          </Tooltip>
          <Tooltip title='Delete'>
            <DeleteOutlined style={{ color: 'red' }} onClick={() => onDelete(row)} />
          </Tooltip>
        </Space>
      )
    }
  ]
  
  return (
    <>
      <Row>
        <Col span={24}>
          <Table 
            dataSource={users}
            columns={columns}
            loading={loading}
            bordered
            size='small'
            pagination={{
              pageSize: 40
            }}
            rowKey='id'
          />
        </Col>
      </Row>
    </>
  )
}

export default UserList