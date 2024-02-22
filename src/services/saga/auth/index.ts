import { all, call, put, takeLeading } from 'redux-saga/effects'
import { Types, Creators } from '../../redux/auth/actions'
import ApiService from '../../api/auth.api'
import { getErrorMessageFromApiError, history } from '../../../utils/common.helper'
// eslint-disable-next-line
import { AxiosError } from 'axios'
import { IAuthAction, ILoginRequest, ILoginResponse, ISignUpRequest } from '../../../models/auth.model'
import { message } from 'antd'
import { IUser } from '../../../models/user.model'

const apiService: ApiService = new ApiService()

export function* signIn(action: IAuthAction) {
  const payload = action.payload as ILoginRequest
  try {
    const response: ILoginResponse = yield call(apiService.signIn, payload)
    console.log('response auth login', response)
    yield put(Creators.signInSuccess(response))
    message.success("Login successful")
    localStorage.setItem('AUTH-TOKEN', response.token)
    localStorage.setItem('AUTH-USER', JSON.stringify(response.user))
    // history.replace('/app')
    window.location.replace('/app');
  } catch(error: AxiosError | unknown) {
    const errorMessage = getErrorMessageFromApiError(error) || 'Network Error!'
    yield put(Creators.signInFailure(errorMessage))
    message.error("Username/Password invalid!")
  }
}

export function* signUp(action: IAuthAction) {
  const payload = action.payload as ISignUpRequest
  try {
    const response: IUser = yield call(apiService.signUp, payload)
    console.log('response auth signup', response)
    yield put(Creators.signUpSuccess(response))
  } catch(error: AxiosError | unknown) {
    const errorMessage = getErrorMessageFromApiError(error) || 'Network Error!'
    yield put(Creators.signUpFailure(errorMessage))
  }
}


function* userSaga() {
  yield all([
    takeLeading(Types.SIGN_IN, signIn),
    takeLeading(Types.SIGN_UP, signUp),
  ])
}

export default userSaga