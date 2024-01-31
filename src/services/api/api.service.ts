// eslint-disable-next-line
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { applicationConfig } from '../../config/app.config'
import { getAccessTokenFromLocalStorage } from "../../utils/common.helper";


class ApiService {
  private axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: applicationConfig.BASE_URL
    })

    this.axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      
      if(getAccessTokenFromLocalStorage() && !config.url?.startsWith('/auth')) {
        config['headers']['AUTHORIZATION'] = `Bearer ${getAccessTokenFromLocalStorage()}`
      }
      console.log('request config', config)
      return config
    }, (error: AxiosError) => Promise.reject(error))

    this.axiosInstance.interceptors.response.use((response: AxiosResponse) => {
      return response
    }, (error: AxiosError) => {
      console.log('hey catch error', error)
      if(error?.code === "ERR_NETWORK") {
        console.error("API NOT AVAILABLE")
        return
      } else if (error?.code === '"ERR_BAD_REQUEST"') {
        console.error("BAD REQUEST")
      }
      //const responseData = error?.response?.data as any
      //const errorMessage = responseData?.message || error?.message
      if(error?.response?.status === 401) {
        window.location.replace('/auth/login')
      }
      Promise.reject(error)
    })
  }

  public async axiosCall<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.request<IApiResponseDTO<T>>(config)
      return Promise.resolve(response.data as T)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

const service = new ApiService()

export default service