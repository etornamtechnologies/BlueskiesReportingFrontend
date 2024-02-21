export interface IUser {
  id: string
  firstName: string
  lastname: string
  email: string
  role: ERole
}

export enum ERole {
  ADMIN = 'ADMIN'
}

export interface ILoginRequest {
  email: string
  password: string
}

export interface ILoginResponse {
  token: string
  expiredIn: number
}

export interface ISignUpRequest {
  firstName: string
  lastName: string
  email: string
  password: string
  role: ERole
}

export interface IAuthState {
  access_token: string
  expired_in: number
  posting: boolean
  post_success: boolean
  error: string | null
}

export interface IAuthAction {
  type: string
  payload?: ILoginRequest | ISignUpRequest
  data?: IUser | Array<IUser> | IPaginatedData<IUser[]> | ILoginResponse
  filter?: string
  [other: string]: any
  error?: string
}
