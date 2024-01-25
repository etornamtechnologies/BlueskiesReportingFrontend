import { IAudit } from "./audit.model"

export interface ICustomer extends IAudit{
  id: string
  name: string
  description: string
  location?: string
  email: string
  phoneNumber: string
}

export interface IPostCustomerRequest {
  name: string
  description: string
  location: string
  email: string
  phoneNumber: string
}

export interface ICustomerQueryParams extends QueryParams {
  filter?: string
}

export interface ICustomerState {
  fetching: boolean
  customers: Array<ICustomer>
  customer: ICustomer | null
  selected_customer: ICustomer | null
  error: string
  posting: boolean
  post_success: boolean 
}

export interface ICustomerAction {
  type: string
  query?: ICustomerQueryParams
  payload?: IPostCustomerRequest
  data?: ICustomer | Array<ICustomer>
  filter?: string
  [other: string]: any
  error?: string
}