import { all, call, put, takeLatest, takeLeading } from 'redux-saga/effects'
import { Types, Creators } from '../../redux/user/actions'
import ApiService from '../../api/user.api'
import { getErrorMessageFromApiError } from '../../../utils/common.helper'
// eslint-disable-next-line
import { AxiosError } from 'axios'
import { ICreateUserRequest, IUser, IUserAction, IUserQueryParams } from '../../../models/user.model'
import { message } from 'antd'

const apiService: ApiService = new ApiService()

export function* fetchUsers(action: IUserAction) {
  const { query } = action
  try {
    const response: IPaginatedData<IUser[]> = yield call(apiService.fetchUsers, query as IUserQueryParams)
    yield put(Creators.fetchUsersSuccess(response))
  } catch(error: AxiosError | unknown) {
    const errorMessage = getErrorMessageFromApiError(error) || 'Network Error!'
    yield put(Creators.fetchUsersFailure(errorMessage))
  }
}

export function* fetchUser(action: IUserAction) {
  const { id } = action
  try {
    const response: IApiResponseDTO<IUser> = yield call(apiService.fetchUserById, id)
    if(response.code === 200) {
      yield put(Creators.fetchUserSuccess(response.data))
    } else {
      yield put(Creators.fetchUserFailure(response.message))
    }
  } catch(error: AxiosError | unknown) {
    const errorMessage = getErrorMessageFromApiError(error) || 'Network Error!'
    yield put(Creators.fetchUserFailure(errorMessage))
  }
}

export function* postUser(action: IUserAction) {
  const { payload } = action
  try {
    const response: IUser = yield call(apiService.postUser, payload as ICreateUserRequest)
    yield put(Creators.postUserSuccess(response))
    message.success('User added successfully!')
  } catch(error: any | unknown) {
    yield put(Creators.postUserFailure(getErrorMessageFromApiError(error)))
  }
}

export function* putUser(action: IUserAction) {
  const { id, payload } = action
  console.log('payload saga', payload)
  try {
    const response: IUser = yield call(apiService.putUser, id, payload)
    yield put(Creators.putUserSuccess(response))
  } catch(error: any | unknown) {
    yield put(Creators.putUserFailure(getErrorMessageFromApiError(error)))
  }
}

export function* deleteUser(action: IUserAction) {
  const { id } = action
  try {
    const response: IApiResponseDTO<IUser> = yield call(apiService.deleteUser, id)
    if(response.code === 200) {
      yield put(Creators.deleteUserSuccess(response.data))
    } else {
      yield put(Creators.deleteUserFailure(response.message))
    }
  } catch(error: any | unknown) {
    yield put(Creators.deleteUserFailure(getErrorMessageFromApiError(error)))
  }
}

function* userSaga() {
  yield all([
    takeLatest(Types.FETCH_USERS, fetchUsers),
    takeLatest(Types.FETCH_USER, fetchUser),
    takeLeading(Types.POST_USER, postUser),
    takeLeading(Types.PUT_USER, putUser),
    takeLeading(Types.DELETE_USER, deleteUser),
  ])
}

export default userSaga