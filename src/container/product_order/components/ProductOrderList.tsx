import { ColumnsType } from "antd/es/table"
import { Col, Row, Space, Tooltip, Table } from "antd"
import { IProductOrder } from "../../../models/product.order.model"
import { InfoCircleTwoTone } from "@ant-design/icons"
import { prettifyDateTime } from "../../../utils/common.helper"

type Props = {
  product_orders: Array<IProductOrder>
  loading: boolean
  onEdit?: (row: IProductOrder) => void
  onDelete: (row: IProductOrder) => void
  onView: (row: IProductOrder) => void
}



const ProductOrderList: React.FC<Props> = ({
  product_orders,
  loading,
  onEdit,
  onView
}) => {

  const columns: ColumnsType<IProductOrder>  = [
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
      render: (text, row) => row.customer?.name
    },
    {
      title: 'Airline',
      dataIndex: 'airline',
      key: 'airline',
      render: (text, row) => row.airline?.name
    },
    {
      title: 'Flight',
      dataIndex: 'flight',
      key: 'flight',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: text => prettifyDateTime(text)
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, row) => (
        <Space wrap>
          <Tooltip title='Details'>
            <InfoCircleTwoTone style={{ color: 'black' }} onClick={() => onView(row)} />
          </Tooltip>
          {/* <Tooltip title='Edit'>
            <EditOutlined style={{ color: 'black' }}/>
          </Tooltip> */}
        </Space>
      )
    }
  ]
  
  return (
    <>
      <Row>
        <Col span={24}>
          <Table 
            dataSource={product_orders}
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

export default ProductOrderList