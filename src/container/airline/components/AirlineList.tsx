import { ColumnsType } from "antd/es/table"
import { Col, Row, Space, Tooltip, Table } from "antd"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { IAirline } from "../../../models/airline.model"

type Props = {
  airlines: Array<IAirline>
  loading: boolean
  onEdit: (row: IAirline) => void
  onDelete: (row: IAirline) => void
}



const AirlineList: React.FC<Props> = ({
  airlines,
  loading,
  onEdit,
  onDelete
}) => {

  const columns: ColumnsType<IAirline>  = [
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
            dataSource={airlines}
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

export default AirlineList