
import { IAirline, IAirlineQueryParams } from '../../models/airline.model'
import apiService from './api.service'

class AirlineApiService {

  public async fetchAirlines(query: IAirlineQueryParams): Promise<IAirline[]> {
    
    return apiService.axiosCall<IAirline[]>({
      method: 'GET',
      url: `/airlines`
    })
  }

  public async fetchAilineById(id: number): Promise<IAirline[]> {
    return apiService.axiosCall<IAirline[]>({
      method: 'GET',
      url: `/airlines/${id}`
    })
  }

  public async postAirline(payload: any): Promise<IAirline> {
    return apiService.axiosCall<IAirline>({
      method: 'POST',
      url: `/airlines`,
      data: payload
    })
  }

  public async putAirline(id: string, payload: any): Promise<IAirline> {
    return apiService.axiosCall<IAirline>({
      method: 'PUT',
      url: `/airlines/${id}`,
      data: payload
    })
  }

  public async deleteAirline(id: string): Promise<IAirline> {
    return apiService.axiosCall<IAirline>({
      method: 'DELETE',
      url: `/airlines/${id}`
    })
  }



  
  
  

  
}

export default AirlineApiService