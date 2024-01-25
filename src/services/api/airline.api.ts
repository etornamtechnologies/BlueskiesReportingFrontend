
import { IAirline, IAirlineQueryParams } from '../../models/airline.model'
import apiService from './api.service'

class AirlineApiService {

  public async fetchAirlines(query: IAirlineQueryParams): Promise<IApiResponseDTO<IAirline[]>> {
    return apiService.axiosCall<IAirline[]>({
      method: 'GET',
      url: '/airlines'
    })
  }

  public async fetchAilineById(id: number): Promise<IApiResponseDTO<IAirline[]>> {
    return apiService.axiosCall<IAirline[]>({
      method: 'GET',
      url: `/airlines/${id}`
    })
  }

  public async postAirline(payload: any): Promise<IApiResponseDTO<IAirline>> {
    return apiService.axiosCall<IAirline>({
      method: 'POST',
      url: `/airlines`
    })
  }

  public async putAirline(id: string, payload: any): Promise<IApiResponseDTO<IAirline>> {
    return apiService.axiosCall<IAirline>({
      method: 'PUT',
      url: `/airlines/${id}`
    })
  }

  public async deleteAirline(id: string): Promise<IApiResponseDTO<IAirline>> {
    return apiService.axiosCall<IAirline>({
      method: 'DELETE',
      url: `/airlines/${id}`
    })
  }



  
  
  

  
}

export default AirlineApiService