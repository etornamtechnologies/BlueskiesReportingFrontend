import { all, call, put, takeLatest, takeLeading } from 'redux-saga/effects'
import { Types, Creators } from '../../redux/product/actions'
import ApiService from '../../api/product.api'
import { getErrorMessageFromApiError } from '../../../utils/common.helper'
import { AxiosError } from 'axios'
import { IProduct, IProductAction, IProductQueryParams } from '../../../models/product.model'

const apiService: ApiService = new ApiService()

export function* fetchProducts(action: IProductAction) {
  const { query } = action
  try {
    const response: IApiResponseDTO<IProduct[]> = yield call(apiService.fetchProducts, query as IProductQueryParams)
    if(response.code === 200) {
      yield put(Creators.fetchProductsSuccess(response.data))
    } else {
      yield put(Creators.fetchProductsFailure(response.message))
    }
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
    const response: IApiResponseDTO<IProduct> = yield call(apiService.postProduct, payload)
    if(response.code === 200) {
      yield put(Creators.postProductSuccess(response.data))
    } else {
      yield put(Creators.postProductFailure(response.message))
    }
  } catch(error: any | unknown) {
    yield put(Creators.postProductFailure(getErrorMessageFromApiError(error)))
  }
}

export function* putProduct(action: IProductAction) {
  const { id, payload } = action
  console.log('payload saga', payload)
  try {
    const response: IApiResponseDTO<IProduct> = yield call(apiService.putProduct, id, payload)
    if(response.code === 200) {
      yield put(Creators.putProductSuccess(response.data))
    } else {
      yield put(Creators.putProductFailure(response.message))
    }
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