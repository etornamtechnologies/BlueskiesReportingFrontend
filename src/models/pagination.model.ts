export interface IPagination {
  hasNext: boolean
  pageNo: number
  pageSize: number
}

export interface IPaginationState {
  has_next: boolean
  page_no: number
  page_size: number
}

export interface IPaginationAction {
  type: string
  data?: IPagination
}