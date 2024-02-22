import { IAudit } from "./audit.model"

export interface IUser extends IAudit{
  id: string
  firstName: string
  lastName: string
  password?: string
  email: string
  lastLogin: string
  changedDefaultPassword: boolean
  role: ERole
}

export interface ICreateUserRequest {
  firstName: string
  lastName: string
  password?: string
  email: string
  role: ERole
}

export enum ERole {
  UPDATER = 'UPDATER',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN'
}

export interface IUserQueryParams {
  search?: string
}



export interface IUserState {
  fetching: boolean
  users: Array<IUser>
  has_next: boolean
  user: IUser | null
  selected_user: IUser | null
  error: string
  posting: boolean
  post_success: boolean 
}

export interface IUserAction {
  type: string
  query?: IUserQueryParams
  payload?: ICreateUserRequest
  data?: IUser | Array<IUser> | IPaginatedData<IUser[]>
  filter?: string
  [other: string]: any
  error?: string
}