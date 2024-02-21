import { createReducer } from 'reduxsauce'
import Types from './actionTypes'
import { ICustomer, ICustomerAction, ICustomerState } from '../../../models/customer.model'
import { IAuthState, IAuthAction, ILoginResponse } from '../../../models/auth.model'


export const INITIAL_STATE: IAuthState = {
  access_token: '',
  expired_in: 0,
  posting: false,
  post_success: false,
  error: null
}


// ======== SIGN IN =======
export const signIn = (state = INITIAL_STATE, action: IAuthAction): IAuthState => {
  return {
    ...state,
    posting: true,
    post_success: false
  }
}

export const signInSuccess = (state = INITIAL_STATE, action: IAuthAction): IAuthState => {
  const { token, expiredIn } = action.data as ILoginResponse
  return {
    ...state,
    access_token: token,
    expired_in: expiredIn,
    posting: false,
    post_success: true
  }
}

export const signInFailure = (state = INITIAL_STATE, action: IAuthAction): IAuthState => {
  return {
    ...state,
    posting: false,
    post_success: false,
    error: action.error as string
  }
}


export const signUp = (state = INITIAL_STATE, action: IAuthAction): IAuthState => {
  return {
    ...state,
    posting: true,
    post_success: false
  }
}

export const signUpSuccess = (state = INITIAL_STATE, action: IAuthAction): IAuthState => {
  const { token, expiredIn } = action.data as ILoginResponse
  return {
    ...state,
    posting: false,
    post_success: true
  }
}

export const signUpFailure = (state = INITIAL_STATE, action: IAuthAction): IAuthState => {
  return {
    ...state,
    posting: false,
    post_success: false,
    error: action.error as string
  }
}


export const resetAuth = (state = INITIAL_STATE, action: IAuthAction): IAuthState => {
  return {
    ...state,
    access_token: '',
    expired_in: 0,
    post_success: false,
    posting: false,
    error: ''
  }
}

export const HANDLERS = {
  [Types.SIGN_IN]: signIn,
  [Types.SIGN_IN_SUCCESS]: signInSuccess,
  [Types.SIGN_IN_FAILURE]: signInFailure,

  [Types.SIGN_UP]: signUp,
  [Types.SIGN_UP_SUCCESS]: signUpSuccess,
  [Types.SIGN_UP_FAILURE]: signUpFailure,

  [Types.RESET_AUTH]: resetAuth,

}


export default createReducer(INITIAL_STATE, HANDLERS)