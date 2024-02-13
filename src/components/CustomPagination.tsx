import { Pagination } from "antd"
import { useAppDispatch, useAppSelector } from "../redux_store/hook"
type Props = {
  onChange: (page: number, pageSize: number) => void
}

const CustomePagination: React.FC<Props> = ({
  onChange,
}) => {
  const {
    has_next,
    page_no,
    page_size
  } = useAppSelector(state => state.pagination)
  return (
    <>
      <Pagination 
        current={page_no}
        onChange={onChange}
        pageSize={page_size}
        
      />
    </>
  )
}

export default CustomePagination