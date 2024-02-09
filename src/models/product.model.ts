import { IAudit } from "./audit.model"
import { IProductCategory } from "./product.category.model"

export interface IProduct extends IAudit{
  id: string
  name: string
  description: string
  quantityPerPack: number
  measurementUnits: Measurementunits
  weight: number
  packWeightInKg: number
  productCategory?: IProductCategory
}

export interface ICreateProductRequest {
  name: string
  description: string
  weight: number
  measurementUnits: Measurementunits
  quantityPerPack: number
  productCategoryId: string
}

export interface IProductQueryParams extends QueryParams {
  productName?: string
}

export enum Measurementunits {
  KILOGRAM = "KILOGRAM",
  GRAM = "GRAM"
}


export interface IProductState {
  fetching: boolean
  products: Array<IProduct>
  has_next: boolean
  product: IProduct | null
  selected_product: IProduct | null
  error: string
  posting: boolean
  post_success: boolean 
}

export interface IProductAction {
  type: string
  query?: IProductQueryParams
  payload?: ICreateProductRequest
  data?: IProduct | Array<IProduct> | IPaginatedData<IProduct[]>
  filter?: string
  [other: string]: any
  error?: string
}