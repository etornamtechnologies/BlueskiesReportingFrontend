import { ColumnsType } from "antd/es/table"
import { IProductCategory } from "../../../models/product.category.model"
import { Button, Col, Row, Space, Tooltip, Table } from "antd"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"

type Props = {
  product_categories: Array<IProductCategory>
  loading: boolean
  onEdit: (row: IProductCategory) => void
  onDelete: (row: IProductCategory) => void
}

type ProductCategoryTableProps = {
  onEdit: (row: IProductCategory) => void,
  onDelete: (row: IProductCategory) => void,
}



const ProductCategoryList: React.FC<Props> = ({
  product_categories,
  loading,
  onEdit,
  onDelete
}) => {

  const columns: ColumnsType<IProductCategory>  = [
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
            dataSource={product_categories}
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

export default ProductCategoryList