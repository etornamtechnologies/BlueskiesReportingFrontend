
import { IProductOrder, IProductOrderQueryParams } from '../../models/product.order.model'
import apiService from './api.service'

class ProductOrderApiService {

  public async fetchProductOrders(query: IProductOrderQueryParams): Promise<IProductOrder[]> {
    return apiService.axiosCall<IProductOrder[]>({
      method: 'GET',
      url: '/productOrders'
    })
  }

  public async fetchProductOrderById(id: number): Promise<IProductOrder[]> {
    return apiService.axiosCall<IProductOrder[]>({
      method: 'GET',
      url: `/productOrders/${id}`
    })
  }

  public async postProductOrder(payload: any): Promise<IProductOrder> {
    return apiService.axiosCall<IProductOrder>({
      method: 'POST',
      url: `/productOrders`,
      data: payload
    })
  }

  public async putProductOrder(id: string, payload: any): Promise<IProductOrder> {
    return apiService.axiosCall<IProductOrder>({
      method: 'PUT',
      url: `/productOrders/${id}`,
      data: payload
    })
  }

  public async deleteProductOrder(id: string): Promise<IProductOrder> {
    return apiService.axiosCall<IProductOrder>({
      method: 'DELETE',
      url: `/productOrders/${id}`
    })
  }



  
  
  

  
}

export default ProductOrderApiService