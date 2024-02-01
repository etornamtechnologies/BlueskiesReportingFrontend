import { IAirline } from "./airline.model";
import { IAudit } from "./audit.model";
import { ICustomer } from "./customer.model";
import { IProduct } from "./product.model";

export interface IProductOrder extends IAudit {
  id: string
  product: IProduct
  customer: ICustomer
  quantity: number
  description: string
  airline: IAirline
  flight: string
}

export interface ICreateProductOrderRequest {
  productId: string
  customerId: string
  airlineId: string
  quantity: number
  description: string
  flight: string
}

export interface IProductOrderQueryParams extends QueryParams {
  filter?: string
}


export interface IProductOrderState {
  fetching: boolean
  product_orders: Array<IProductOrder>
  has_next: boolean
  product_order: IProductOrder | null
  selected_product_order: IProductOrder | null
  error: string
  posting: boolean
  post_success: boolean 
}

export interface IProductOrderAction {
  type: string
  query?: IProductOrderQueryParams
  payload?: ICreateProductOrderRequest
  data?: IProductOrder | Array<IProductOrder> | IPaginatedData<IProductOrder[]>
  filter?: string
  [other: string]: any
  error?: string
}