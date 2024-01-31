import { ColumnsType } from "antd/es/table"
import { Button, Col, Row, Space, Tooltip, Table } from "antd"
import { IProduct } from "../../../models/product.model"

type Props = {
  products: Array<IProduct>
  loading: boolean
  onEdit: (row: IProduct) => void
  onDelete: (row: IProduct) => void
}



const ProductList: React.FC<Props> = ({
  products,
  loading,
  onEdit,
  onDelete
}) => {

  const columns: ColumnsType<IProduct>  = [
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
      render: (text, row) => (
        <Space wrap>
          <Tooltip title='Edit'>
            <Button onClick={() => onEdit(row)}>Edit</Button>
          </Tooltip>
          <Tooltip title='Delete'>
            <Button onClick={() => onDelete(row)}>Delete</Button>
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
            dataSource={products}
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

export default ProductList