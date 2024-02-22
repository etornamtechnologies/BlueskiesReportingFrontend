
import { ILoginRequest, ILoginResponse, ISignUpRequest } from '../../models/auth.model'
import { IUser } from '../../models/user.model'
import apiService from './api.service'

class AuthApiService {

  public async signIn(payload: ILoginRequest): Promise<ILoginResponse> {
    return apiService.axiosCall<ILoginResponse>({
      method: 'POST',
      url: '/auth/login',
      data: payload
    })
  }

  public async signUp(payload: ISignUpRequest): Promise<IUser> {
    return apiService.axiosCall<IUser>({
      method: 'POST',
      url: `/auth/signup`,
      data: payload
    })
  }
  
}

export default AuthApiService