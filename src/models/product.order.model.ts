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
  orderDetails: Array<OrderDetail>
  status?: string
}

export interface IOrderFulfillment extends IAudit {
  id: string
  quantity: number
  productOrder: IProductOrder
  product: IProduct
}

export interface OrderDetail {
  id?: string
  product: IProduct
  quantity: number
  createdAt?: string
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

export interface IProductOrderQueryParams extends QueryParams {
  filter?: string
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
  payload?: ICreateProductOrderRequest | IAddFulfillmentRequest
  data?: IProductOrder | Array<IProductOrder> | IPaginatedData<IProductOrder[]> | INewOrder
  filter?: string
  [other: string]: any
  error?: string
}