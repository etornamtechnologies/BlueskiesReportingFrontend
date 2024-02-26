
import { IAddFulfillmentRequest, IProductOrder, IProductOrderQueryParams, IUpdateProductOrderDetailRequest, IUpdateProductOrderRequest } from '../../models/product.order.model'
import { serializeQueryParamsOnNull } from '../../utils/common.helper'
import apiService from './api.service'

class ProductOrderApiService {

  public async fetchProductOrders(query: IProductOrderQueryParams): Promise<IProductOrder[]> {
    const queryStr = serializeQueryParamsOnNull(query)
    return apiService.axiosCall<IProductOrder[]>({
      method: 'GET',
      url: `/productOrders${queryStr}`
    })
  }

  public async fetchProductOrderById(id: number): Promise<IProductOrder> {
    return apiService.axiosCall<IProductOrder>({
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

  public async putProductOrder(id: string, payload: IUpdateProductOrderRequest): Promise<IProductOrder> {
    return apiService.axiosCall<IProductOrder>({
      method: 'PUT',
      url: `/productOrders/${id}`,
      data: payload
    })
  }

  public async putProductOrderDetail(id: string, orderDetailId: string, payload: IUpdateProductOrderDetailRequest): Promise<IProductOrder> {
    return apiService.axiosCall<IProductOrder>({
      method: 'PUT',
      url: `/productOrders/${id}/orderDetails/${orderDetailId}`,
      data: payload
    })
  }

  public async putProductOrderFulfillment(id: string, orderFulfillmentId: string, payload: {quantity: number}): Promise<IProductOrder> {
    return apiService.axiosCall<IProductOrder>({
      method: 'PUT',
      url: `/productOrders/${id}/orderFulfillments/${orderFulfillmentId}`,
      data: payload
    })
  }

  public async deleteProductOrder(id: string): Promise<IProductOrder> {
    return apiService.axiosCall<IProductOrder>({
      method: 'DELETE',
      url: `/productOrders/${id}`
    })
  }

  public async postFulfillment(payload: IAddFulfillmentRequest): Promise<IProductOrder> {
    return apiService.axiosCall<IProductOrder>({
      method: 'POST',
      url: `/productOrders/${payload.productOrderId}/fulfillment`,
      data: payload
    })
  }

  
  
}

export default ProductOrderApiService