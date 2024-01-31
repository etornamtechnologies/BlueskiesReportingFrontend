import { all, call, put, takeLatest, takeLeading } from 'redux-saga/effects'
import { Types, Creators } from '../../redux/product_category/actions'
import ApiService from '../../api/product.category.api'
import { getErrorMessageFromApiError } from '../../../utils/common.helper'
// eslint-disable-next-line
import { AxiosError } from 'axios'
import { ICreateProductCategoryRequest, IProductCategory, IProductCategoryAction, IProductCategoryQueryParams } from '../../../models/product.category.model'
import { message } from 'antd'

const apiService: ApiService = new ApiService()

export function* fetchProductCategories(action: IProductCategoryAction) {
  const { query } = action
  try {
    const response: IPaginatedData<IProductCategory[]> = yield call(apiService.fetchProductCategories, query as IProductCategoryQueryParams)
    yield put(Creators.fetchProductCategoriesSuccess(response))
  } catch(error: AxiosError | unknown) {
    const errorMessage = getErrorMessageFromApiError(error) || 'Network Error!'
    yield put(Creators.fetchProductCategoriesFailure(errorMessage))
  }
}

export function* fetchProductCategory(action: IProductCategoryAction) {
  const { id } = action
  try {
    const response: IApiResponseDTO<IProductCategory> = yield call(apiService.fetchProductCategoryById, id)
    if(response.code === 200) {
      console.log('bo-users', response.data)
      yield put(Creators.fetchProductCategorySuccess(response.data))
    } else {
      yield put(Creators.fetchProductCategoryFailure(response.message))
    }
  } catch(error: AxiosError | unknown) {
    const errorMessage = getErrorMessageFromApiError(error) || 'Network Error!'
    yield put(Creators.fetchProductCategoryFailure(errorMessage))
  }
}

export function* postProductCategory(action: IProductCategoryAction) {
  const { payload } = action
  try {
    const response: IApiResponseDTO<IProductCategory> = yield call(apiService.postProductCategory, payload as ICreateProductCategoryRequest)
    yield put(Creators.postProductCategorySuccess(response))
    message.info("Product Category created!")
  } catch(error: any | unknown) {
    yield put(Creators.postProductCategoryFailure(getErrorMessageFromApiError(error)))
  }
}

export function* putProductCategory(action: IProductCategoryAction) {
  const { id, payload } = action
  console.log('payload saga', payload)
  try {
    const response: IApiResponseDTO<IProductCategory> = yield call(apiService.putProductCategory, id, payload)
    yield put(Creators.putProductCategorySuccess(response))
    message.info("Product category updated!")
  } catch(error: any | unknown) {
    yield put(Creators.putProductCategoryFailure(getErrorMessageFromApiError(error)))
  }
}

export function* deleteProductCategory(action: IProductCategoryAction) {
  const { id } = action
  try {
    const response: IApiResponseDTO<IProductCategory> = yield call(apiService.deleteProductCategory, id)
    yield put(Creators.deleteProductCategorySuccess(response))
    message.info("product category deleted!")
  } catch(error: any | unknown) {
    yield put(Creators.deleteProductCategoryFailure(getErrorMessageFromApiError(error)))
  }
}

function* userSaga() {
  yield all([
    takeLatest(Types.FETCH_PRODUCT_CATEGORIES, fetchProductCategories),
    takeLatest(Types.FETCH_PRODUCT_CATEGORY, fetchProductCategory),
    takeLeading(Types.POST_PRODUCT_CATEGORY, postProductCategory),
    takeLeading(Types.PUT_PRODUCT_CATEGORY, putProductCategory),
    takeLeading(Types.DELETE_PRODUCT_CATEGORY, deleteProductCategory),
  ])
}

export default userSaga