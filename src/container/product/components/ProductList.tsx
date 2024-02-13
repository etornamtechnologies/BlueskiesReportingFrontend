import { ColumnsType } from "antd/es/table"
import { Col, Row, Space, Tooltip, Table } from "antd"
import { IProduct } from "../../../models/product.model"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"

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
      title: 'Product Category',
      dataIndex: 'productCategory',
      key: 'productCategory',
      render: (text, row) => row.productCategory?.name
    },
    {
      title: 'Measurement Unit',
      dataIndex: 'measurementUnits',
      key: 'measurementUnits',
    },
    {
      title: 'Weight',
      dataIndex: 'weight',
      key: 'weight',
    },
    {
      title: 'Pack Weight In Kg',
      dataIndex: 'packWeightInKg',
      key: 'packWeightInKg',
    },
    {
      title: 'Quantity Per Pack',
      dataIndex: 'quantityPerPack',
      key: 'quantityPerPack',
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