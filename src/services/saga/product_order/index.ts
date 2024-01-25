import { all, call, put, takeLatest, takeLeading } from 'redux-saga/effects'
import { Types, Creators } from '../../redux/product_order/actions'
import ApiService from '../../api/product.order.api'
import { getErrorMessageFromApiError } from '../../../utils/common.helper'
import { AxiosError } from 'axios'
import { IProductOrder, IProductOrderAction, IProductOrderQueryParams } from '../../../models/product.order.model'

const apiService: ApiService = new ApiService()

export function* fetchProductOrders(action: IProductOrderAction) {
  const { query } = action
  try {
    const response: IApiResponseDTO<IProductOrder[]> = yield call(apiService.fetchProductOrders, query as IProductOrderQueryParams)
    if(response.code === 200) {
      console.log('bo-users', response.data)
      yield put(Creators.fetchProductOrdersSuccess(response.data))
    } else {
      yield put(Creators.fetchProductOrdersFailure(response.message))
    }
  } catch(error: AxiosError | unknown) {
    const errorMessage = getErrorMessageFromApiError(error) || 'Network Error!'
    yield put(Creators.fetchProductOrdersFailure(errorMessage))
  }
}

export function* fetchProductOrder(action: IProductOrderAction) {
  const { id } = action
  try {
    const response: IApiResponseDTO<IProductOrder> = yield call(apiService.fetchProductOrderById, id)
    if(response.code === 200) {
      console.log('bo-users', response.data)
      yield put(Creators.fetchProductOrderSuccess(response.data))
    } else {
      yield put(Creators.fetchProductOrderFailure(response.message))
    }
  } catch(error: AxiosError | unknown) {
    const errorMessage = getErrorMessageFromApiError(error) || 'Network Error!'
    yield put(Creators.fetchProductOrderFailure(errorMessage))
  }
}

export function* postProductOrder(action: IProductOrderAction) {
  const { payload } = action
  try {
    const response: IApiResponseDTO<IProductOrder> = yield call(apiService.postProductOrder, payload)
    if(response.code === 200) {
      yield put(Creators.postProductOrderSuccess(response.data))
    } else {
      yield put(Creators.postProductOrderFailure(response.message))
    }
  } catch(error: any | unknown) {
    yield put(Creators.postProductOrderFailure(getErrorMessageFromApiError(error)))
  }
}

export function* putProductOrder(action: IProductOrderAction) {
  const { id, payload } = action
  console.log('payload saga', payload)
  try {
    const response: IApiResponseDTO<IProductOrder> = yield call(apiService.putProductOrder, id, payload)
    if(response.code === 200) {
      yield put(Creators.putProductOrderSuccess(response.data))
    } else {
      yield put(Creators.putProductOrderFailure(response.message))
    }
  } catch(error: any | unknown) {
    yield put(Creators.putProductOrderFailure(getErrorMessageFromApiError(error)))
  }
}

export function* deleteProductOrder(action: IProductOrderAction) {
  const { id } = action
  try {
    const response: IApiResponseDTO<IProductOrder> = yield call(apiService.deleteProductOrder, id)
    if(response.code === 200) {
      yield put(Creators.deleteProductOrderSuccess(response.data))
    } else {
      yield put(Creators.deleteProductOrderFailure(response.message))
    }
  } catch(error: any | unknown) {
    yield put(Creators.deleteProductOrderFailure(getErrorMessageFromApiError(error)))
  }
}

function* userSaga() {
  yield all([
    takeLatest(Types.FETCH_PRODUCT_ORDERS, fetchProductOrders),
    takeLatest(Types.FETCH_PRODUCT_ORDER, fetchProductOrder),
    takeLeading(Types.POST_PRODUCT_ORDER, postProductOrder),
    takeLeading(Types.PUT_PRODUCT_ORDER, putProductOrder),
    takeLeading(Types.DELETE_PRODUCT_ORDER, deleteProductOrder),
  ])
}

export default userSaga