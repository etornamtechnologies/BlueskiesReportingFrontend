import { IAirline } from "./airline.model";
import { IAudit } from "./audit.model";
import { ICustomer } from "./customer.model";
import { IProduct } from "./product.model";

export interface IProductOrder extends IAudit {
  id: string
  airline: IAirline
  customer: ICustomer
  quantity: number
  description: string
  flight: string,
  requiredDate: string
  orderDetails: Array<IOrderDetail>
  status?: string
  orderFulfillments?: Array<IOrderFulfillment>
}

export interface IOrderFulfillment extends IAudit {
  id: string
  quantity: number
  productOrder: IProductOrder
  product: IProduct
}

export interface IOrderDetail {
  id?: string
  product: IProduct
  quantity: number
  createdAt?: string
  orderFulfillments?: Array<IOrderFulfillment>
}

export enum OrderStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED"
}

export interface ICreateProductOrderRequest {
  customerId: string
  airlineId: string
  description: string
  flight: string
  requiredDate: string
  products: Array<{productId: string, quantity: number}>
}

export interface IAddFulfillmentRequest {
  productOrderId: string
  orderDetails: Array<{ productId: string, quantity: number }>
}

export interface ICreateMultipleProductOrderRequest {
  products: Array<{productId: string, quantity: number}>
  customerId: string
  airlineId: string
  description: string
  flight: string
}

export interface IUpdateProductOrderRequest {
  customerId: string
  airlineId: string
  description: string
  flight: string,
  requiredDate: string
}

export interface IUpdateProductOrderDetailRequest {
  productId: string
  quantity: number
}

export interface IProductOrderQueryParams extends QueryParams {
  filter?: string
  pageNo?: number
  pageSize?: number
}

export interface INewOrder {
  customerId: string | undefined,
  airlineId: string | undefined,
  flight: string | undefined
  description: string | undefined
  productQuantity: Array<{productId: string, quantity: number}>
}

export interface OrderData {
  customer: ICustomer,
  airlineId: string | undefined,
  flight: string | undefined
  description: string | undefined
  productQuantity: Array<{productId: string, quantity: number}>
}


export interface IProductOrderState {
  fetching: boolean
  product_orders: Array<IProductOrder>
  has_next: boolean
  page_no: number
  page_size: number
  new_order: INewOrder | null
  product_order: IProductOrder | null
  selected_product_order: IProductOrder | null
  error: string
  posting: boolean
  post_success: boolean 
  posting_fulfillment: boolean
  post_fulfillment_success: boolean
}

export interface IProductOrderAction {
  type: string
  query?: IProductOrderQueryParams
  payload?: ICreateProductOrderRequest | IAddFulfillmentRequest | IUpdateProductOrderDetailRequest
  data?: IProductOrder | Array<IProductOrder> | IPaginatedData<IProductOrder[]> | INewOrder
  filter?: string
  [other: string]: any
  error?: string
}