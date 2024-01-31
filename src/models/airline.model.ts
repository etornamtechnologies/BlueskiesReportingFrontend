import { IAudit } from "./audit.model";

export interface IAirline extends IAudit {
  id: string
  name: string
  description: string
}

export interface IPostAirlineRequest {
  name: string
  description: string
}

export interface IAirlineQueryParams extends QueryParams {
  filter?: string
}


export interface IAirlineState {
  fetching: boolean
  airlines: Array<IAirline>
  has_next: boolean
  airline: IAirline | null
  selected_airline: IAirline | null
  error: string
  posting: boolean
  post_success: boolean 
}

export interface IAirlineAction {
  type: string
  query?: IAirlineQueryParams
  payload?: IPostAirlineRequest
  data?: IAirline | Array<IAirline> | IPaginatedData<IAirline[]>
  filter?: string
  [other: string]: any
  error?: string
}