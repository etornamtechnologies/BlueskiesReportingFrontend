
import { ICustomer, ICustomerQueryParams } from '../../models/customer.model'
import apiService from './api.service'

class CustomerApiService {

  public async fetchCustomers(query: ICustomerQueryParams): Promise<ICustomer[]> {
    return apiService.axiosCall<ICustomer[]>({
      method: 'GET',
      url: '/customers'
    })
  }

  public async fetchCustomerById(id: number): Promise<ICustomer[]> {
    return apiService.axiosCall<ICustomer[]>({
      method: 'GET',
      url: `/customers/${id}`
    })
  }

  public async postCustomer(payload: any): Promise<ICustomer> {
    return apiService.axiosCall<ICustomer>({
      method: 'POST',
      url: `/customers`,
      data: payload
    })
  }

  public async putCustomer(id: string, payload: any): Promise<ICustomer> {
    return apiService.axiosCall<ICustomer>({
      method: 'PUT',
      url: `/customers/${id}`,
      data: payload
    })
  }

  public async deleteCustomer(id: string): Promise<ICustomer> {
    return apiService.axiosCall<ICustomer>({
      method: 'DELETE',
      url: `/customers/${id}`
    })
  }



  
  
  

  
}

export default CustomerApiService