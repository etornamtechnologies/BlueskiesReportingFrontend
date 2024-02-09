import { AutoComplete, Col, Input, Row } from "antd"
import { IProduct } from "../../../models/product.model";

type Props = {
  products: Array<IProduct>
  loading: boolean
  onSearch: (search: string) => void
  onSelect: (val: any, row: any) => void
  style?: React.CSSProperties
  size?: 'small' | 'large' | 'middle'
}



const renderItem = (product: IProduct) => ({
  id: product?.id,
  row: product,
  value: product.name,
  label: (
    <div
      key={product?.id}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        minWidth: "100%",
      }}
    >
      <Row style={{ width: "100%" }}>
        <Col span={13} style={{ width: "100%", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
          <span>{product?.name}</span>
        </Col>
        <Col span={10} offset={1}>
          {product?.productCategory?.name}
        </Col>
      </Row>
    </div>
  ),
});





const ProductAutoComplete: React.FC<Props> = ({
  style,
  products,
  loading,
  onSelect,
  onSearch,
  size = 'middle'
}) => {


  const options = products.map(product => renderItem(product))

  return (
    <>
      <AutoComplete
        popupMatchSelectWidth={500}
        style={{ ...style }}
        options={options}
        size={size}
        onChange={(val: string) => {
          console.log('search', val)
          onSearch(val)
        }}
        onSelect={(value, options) => {
          console.log('selected value', value, 'row', options.row)
          onSelect(value, options.row)
        }}
      >
        <Input.Search size="large" placeholder="input here" />
      </AutoComplete>
    </>
  )
}

export default ProductAutoComplete