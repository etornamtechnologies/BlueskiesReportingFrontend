import { all, call, put, takeLatest, takeLeading } from 'redux-saga/effects'
import { Types, Creators } from '../../redux/customer/actions'
import ApiService from '../../api/customer.api'
import { getErrorMessageFromApiError } from '../../../utils/common.helper'
// eslint-disable-next-line
import { AxiosError } from 'axios'
import { ICustomer, ICustomerAction, ICustomerQueryParams } from '../../../models/customer.model'
import { message } from 'antd'

const apiService: ApiService = new ApiService()

export function* fetchCustomers(action: ICustomerAction) {
  const { query } = action
  try {
    const response: IPaginatedData<ICustomer[]> = yield call(apiService.fetchCustomers, query as ICustomerQueryParams)
    console.log('response customers', response)
    yield put(Creators.fetchCustomersSuccess(response))
  } catch(error: AxiosError | unknown) {
    const errorMessage = getErrorMessageFromApiError(error) || 'Network Error!'
    yield put(Creators.fetchCustomersFailure(errorMessage))
  }
}

export function* fetchCustomer(action: ICustomerAction) {
  const { id } = action
  try {
    const response: IApiResponseDTO<ICustomer> = yield call(apiService.fetchCustomerById, id)
    if(response.code === 200) {
      console.log('bo-users', response.data)
      yield put(Creators.fetchCustomerSuccess(response.data))
    } else {
      yield put(Creators.fetchCustomerFailure(response.message))
    }
  } catch(error: AxiosError | unknown) {
    const errorMessage = getErrorMessageFromApiError(error) || 'Network Error!'
    yield put(Creators.fetchCustomerFailure(errorMessage))
  }
}

export function* postCustomer(action: ICustomerAction) {
  const { payload } = action
  try {
    const response: IApiResponseDTO<ICustomer> = yield call(apiService.postCustomer, payload)
    yield put(Creators.postCustomerSuccess(response))
    message.success("Customer created successfully")
  } catch(error: any | unknown) {
    yield put(Creators.postCustomerFailure(getErrorMessageFromApiError(error)))
  }
}

export function* putCustomer(action: ICustomerAction) {
  const { id, payload } = action
  console.log('payload saga', payload)
  console.log('id saga', id)
  try {
    const response: IApiResponseDTO<ICustomer> = yield call(apiService.putCustomer, id, payload)
    yield put(Creators.putCustomerSuccess(response))
    message.success("Customer updated")
  } catch(error: any | unknown) {
    yield put(Creators.putCustomerFailure(getErrorMessageFromApiError(error)))
  }
}

export function* deleteCustomer(action: ICustomerAction) {
  const { id } = action
  try {
    const response: IApiResponseDTO<ICustomer> = yield call(apiService.deleteCustomer, id)
    yield put(Creators.deleteCustomerSuccess(response.data))
    message.success("Customer deleted!")
  } catch(error: any | unknown) {
    yield put(Creators.deleteCustomerFailure(getErrorMessageFromApiError(error)))
  }
}

function* userSaga() {
  yield all([
    takeLatest(Types.FETCH_CUSTOMERS, fetchCustomers),
    takeLatest(Types.FETCH_CUSTOMER, fetchCustomer),
    takeLeading(Types.POST_CUSTOMER, postCustomer),
    takeLeading(Types.PUT_CUSTOMER, putCustomer),
    takeLeading(Types.DELETE_CUSTOMER, deleteCustomer),
  ])
}

export default userSaga