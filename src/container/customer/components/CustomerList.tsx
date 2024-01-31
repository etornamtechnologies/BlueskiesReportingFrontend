import { ColumnsType } from "antd/es/table"
import { Col, Row, Space, Tooltip, Table } from "antd"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { ICustomer } from "../../../models/customer.model"

type Props = {
  customers: Array<ICustomer>
  loading: boolean
  onEdit: (row: ICustomer) => void
  onDelete: (row: ICustomer) => void
}



const CustomerList: React.FC<Props> = ({
  customers,
  loading,
  onEdit,
  onDelete
}) => {

  const columns: ColumnsType<ICustomer>  = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber'
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      align: 'right',
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
            dataSource={customers}
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

export default CustomerList