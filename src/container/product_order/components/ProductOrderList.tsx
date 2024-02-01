import { ColumnsType } from "antd/es/table"
import { Col, Row, Space, Tooltip, Table } from "antd"
import { IProductOrder } from "../../../models/product.order.model"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"

type Props = {
  product_orders: Array<IProductOrder>
  loading: boolean
  onEdit: (row: IProductOrder) => void
  onDelete: (row: IProductOrder) => void
}



const ProductOrderList: React.FC<Props> = ({
  product_orders,
  loading,
  onEdit,
  onDelete
}) => {

  const columns: ColumnsType<IProductOrder>  = [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      render: (text, row) => row.product?.name
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity'
    },
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
      key: 'createdAt'
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