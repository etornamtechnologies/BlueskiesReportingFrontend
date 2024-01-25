import { IAudit } from "./audit.model"

export interface IProductCategory extends IAudit{
  id: string
  name: string
  description: string

}

export interface ICreateProductCategoryRequest {
  name: string
  description: string
}

export interface IProductCategoryQueryParams extends QueryParams {
  filter?: string
}


export interface IProductCategoryState {
  fetching: boolean
  product_categories: Array<IProductCategory>
  product_category: IProductCategory | null
  selected_product_category: IProductCategory | null
  error: string
  posting: boolean
  post_success: boolean 
}

export interface IProductCategoryAction {
  type: string
  query?: IProductCategoryQueryParams
  payload?: ICreateProductCategoryRequest
  data?: IProductCategory | Array<IProductCategory>
  filter?: string
  [other: string]: any
  error?: string
}