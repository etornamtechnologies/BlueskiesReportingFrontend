import { all, call, put, takeLatest, takeLeading } from 'redux-saga/effects'
import { Types, Creators } from '../../redux/product/actions'
import ApiService from '../../api/product.api'
import { getErrorMessageFromApiError } from '../../../utils/common.helper'
// eslint-disable-next-line
import { AxiosError } from 'axios'
import { IProduct, IProductAction, IProductQueryParams } from '../../../models/product.model'
import { message } from 'antd'

const apiService: ApiService = new ApiService()

export function* fetchProducts(action: IProductAction) {
  const { query } = action
  try {
    const response: IPaginatedData<IProduct[]> = yield call(apiService.fetchProducts, query as IProductQueryParams)
    yield put(Creators.fetchProductsSuccess(response))
  } catch(error: AxiosError | unknown) {
    const errorMessage = getErrorMessageFromApiError(error) || 'Network Error!'
    yield put(Creators.fetchProductsFailure(errorMessage))
  }
}

export function* fetchProduct(action: IProductAction) {
  const { id } = action
  try {
    const response: IApiResponseDTO<IProduct> = yield call(apiService.fetchProductById, id)
    if(response.code === 200) {
      yield put(Creators.fetchProductSuccess(response.data))
    } else {
      yield put(Creators.fetchProductFailure(response.message))
    }
  } catch(error: AxiosError | unknown) {
    const errorMessage = getErrorMessageFromApiError(error) || 'Network Error!'
    yield put(Creators.fetchProductFailure(errorMessage))
  }
}

export function* postProduct(action: IProductAction) {
  const { payload } = action
  try {
    const response: IProduct = yield call(apiService.postProduct, payload)
    yield put(Creators.postProductSuccess(response))
    message.success('Product added successfully!')
  } catch(error: any | unknown) {
    yield put(Creators.postProductFailure(getErrorMessageFromApiError(error)))
  }
}

export function* putProduct(action: IProductAction) {
  const { id, payload } = action
  console.log('payload saga', payload)
  try {
    const response: IProduct = yield call(apiService.putProduct, id, payload)
    yield put(Creators.putProductSuccess(response))
  } catch(error: any | unknown) {
    yield put(Creators.putProductFailure(getErrorMessageFromApiError(error)))
  }
}

export function* deleteProduct(action: IProductAction) {
  const { id } = action
  try {
    const response: IApiResponseDTO<IProduct> = yield call(apiService.deleteProduct, id)
    if(response.code === 200) {
      yield put(Creators.deleteProductSuccess(response.data))
    } else {
      yield put(Creators.deleteProductFailure(response.message))
    }
  } catch(error: any | unknown) {
    yield put(Creators.deleteProductFailure(getErrorMessageFromApiError(error)))
  }
}

function* userSaga() {
  yield all([
    takeLatest(Types.FETCH_PRODUCTS, fetchProducts),
    takeLatest(Types.FETCH_PRODUCT, fetchProduct),
    takeLeading(Types.POST_PRODUCT, postProduct),
    takeLeading(Types.PUT_PRODUCT, putProduct),
    takeLeading(Types.DELETE_PRODUCT, deleteProduct),
  ])
}

export default userSaga