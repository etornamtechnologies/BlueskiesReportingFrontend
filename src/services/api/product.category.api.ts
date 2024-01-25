
import { IProductCategory, IProductCategoryQueryParams } from '../../models/product.category.model'
import apiService from './api.service'

class ProductCategoryApiService {

  public async fetchProductCategories(query: IProductCategoryQueryParams): Promise<IApiResponseDTO<IProductCategory[]>> {
    return apiService.axiosCall<IProductCategory[]>({
      method: 'GET',
      url: `/productCategorie`
    })
  }

  public async fetchProductCategoryById(id: number): Promise<IApiResponseDTO<IProductCategory[]>> {
    return apiService.axiosCall<IProductCategory[]>({
      method: 'GET',
      url: `/productCategories/${id}`
    })
  }

  public async postProductCategory(payload: any): Promise<IApiResponseDTO<IProductCategory>> {
    return apiService.axiosCall<IProductCategory>({
      method: 'POST',
      url: `/productCategories`
    })
  }

  public async putProductCategory(id: string, payload: any): Promise<IApiResponseDTO<IProductCategory>> {
    return apiService.axiosCall<IProductCategory>({
      method: 'PUT',
      url: `/productCategories/${id}`
    })
  }

  public async deleteProductCategory(id: string): Promise<IApiResponseDTO<IProductCategory>> {
    return apiService.axiosCall<IProductCategory>({
      method: 'DELETE',
      url: `/productCategories/${id}`
    })
  }



  
  
  

  
}

export default ProductCategoryApiService