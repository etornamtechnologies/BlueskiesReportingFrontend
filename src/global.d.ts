interface IApiResponseDTO<T> {
  code: number
  message: string
  data: T
}

interface QueryParams {
  pageNo?: number
  pageSize?: number
}