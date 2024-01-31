
import { ICreateProductCategoryRequest, IProductCategory, IProductCategoryQueryParams } from '../../models/product.category.model'
import apiService from './api.service'

class ProductCategoryApiService {

  public async fetchProductCategories(query: IProductCategoryQueryParams): Promise<IPaginatedData<IProductCategory[]>> {
    return apiService.axiosCall<IPaginatedData<IProductCategory[]>>({
      method: 'GET',
      url: `/productCategories`
    })
  }

  public async fetchProductCategoryById(id: number): Promise<IProductCategory> {
    return apiService.axiosCall<IProductCategory>({
      method: 'GET',
      url: `/productCategories/${id}`
    })
  }

  public async postProductCategory(payload: ICreateProductCategoryRequest): Promise<IProductCategory> {
    return apiService.axiosCall<IProductCategory>({
      method: 'POST',
      url: `/productCategories`,
      data: payload
    })
  }

  public async putProductCategory(id: string, payload: any): Promise<IProductCategory> {
    return apiService.axiosCall<IProductCategory>({
      method: 'PUT',
      url: `/productCategories/${id}`,
      data: payload
    })
  }

  public async deleteProductCategory(id: string): Promise<IProductCategory> {
    return apiService.axiosCall<IProductCategory>({
      method: 'DELETE',
      url: `/productCategories/${id}`
    })
  }



  
  
  

  
}

export default ProductCategoryApiService