
import { IProduct, IProductQueryParams } from '../../models/product.model'
import apiService from './api.service'

class ProductApiService {

  public async fetchProducts(query: IProductQueryParams): Promise<IApiResponseDTO<IProduct[]>> {
    return apiService.axiosCall<IProduct[]>({
      method: 'GET',
      url: '/products'
    })
  }

  public async fetchProductById(id: number): Promise<IApiResponseDTO<IProduct[]>> {
    return apiService.axiosCall<IProduct[]>({
      method: 'GET',
      url: `/products/${id}`
    })
  }

  public async postProduct(payload: any): Promise<IApiResponseDTO<IProduct>> {
    return apiService.axiosCall<IProduct>({
      method: 'POST',
      url: `/products`
    })
  }

  public async putProduct(id: string, payload: any): Promise<IApiResponseDTO<IProduct>> {
    return apiService.axiosCall<IProduct>({
      method: 'PUT',
      url: `/products/${id}`
    })
  }

  public async deleteProduct(id: string): Promise<IApiResponseDTO<IProduct>> {
    return apiService.axiosCall<IProduct>({
      method: 'DELETE',
      url: `/products/${id}`
    })
  }



  
  
  

  
}

export default ProductApiService