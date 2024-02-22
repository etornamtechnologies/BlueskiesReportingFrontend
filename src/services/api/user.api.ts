
import { IUser, ICreateUserRequest, IUserQueryParams } from '../../models/user.model'
import { serializeQueryParamsOnNull } from '../../utils/common.helper'
import apiService from './api.service'

class UserApiService {

  public async fetchUsers(query: IUserQueryParams): Promise<IUser[]> {
    const queryStr = serializeQueryParamsOnNull(query)
    return apiService.axiosCall<IUser[]>({
      method: 'GET',
      url: `/users${queryStr}`
    })
  }

  public async fetchUserById(id: number): Promise<IUser[]> {
    return apiService.axiosCall<IUser[]>({
      method: 'GET',
      url: `/users/${id}`
    })
  }

  public async postUser(payload: ICreateUserRequest): Promise<IUser> {
    return apiService.axiosCall<IUser>({
      method: 'POST',
      url: `/users`,
      data: payload
    })
  }

  public async putUser(id: string, payload: any): Promise<IUser> {
    return apiService.axiosCall<IUser>({
      method: 'PUT',
      url: `/users/${id}`,
      data: payload
    })
  }

  public async deleteUser(id: string): Promise<IUser> {
    return apiService.axiosCall<IUser>({
      method: 'DELETE',
      url: `/users/${id}`
    })
  }



  
  
  

  
}

export default UserApiService