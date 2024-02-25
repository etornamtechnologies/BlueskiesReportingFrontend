import { all, call, put, takeLatest, takeLeading } from 'redux-saga/effects'
import { Types, Creators } from '../../redux/product_order/actions'
import ApiService from '../../api/product.order.api'
import { getErrorMessageFromApiError } from '../../../utils/common.helper'
// eslint-disable-next-line
import { AxiosError } from 'axios'
import { IAddFulfillmentRequest, IProductOrder, IProductOrderAction, IProductOrderQueryParams, IUpdateProductOrderDetailRequest, IUpdateProductOrderRequest } from '../../../models/product.order.model'
import { message } from 'antd'


const apiService: ApiService = new ApiService()

export function* fetchProductOrders(action: IProductOrderAction) {
  const { query } = action
  try {
    const response: IPaginatedData<IProductOrder[]> = yield call(apiService.fetchProductOrders, query as IProductOrderQueryParams)
    yield put(Creators.fetchProductOrdersSuccess(response))
  } catch(error: AxiosError | unknown) {
    const errorMessage = getErrorMessageFromApiError(error) || 'Network Error!'
    yield put(Creators.fetchProductOrdersFailure(errorMessage))
  }
}

export function* fetchProductOrder(action: IProductOrderAction) {
  const { id } = action
  try {
    const response: IProductOrder = yield call(apiService.fetchProductOrderById, id)
    console.log('----- fetch product order response', response)
    yield put(Creators.fetchProductOrderSuccess(response))
  } catch(error: AxiosError | unknown) {
    console.log('errors data 000', error)
    //const errorMessage = getErrorMessageFromApiError(error) || 'Network Error!'
    yield put(Creators.fetchProductOrderFailure("Failed"))
  }
}

export function* postProductOrder(action: IProductOrderAction) {
  const { payload } = action
  try {
    const response: IProductOrder = yield call(apiService.postProductOrder, payload)
    yield put(Creators.postProductOrderSuccess(response))
    message.success('Order created!')
  } catch(error: any | unknown) {
    yield put(Creators.postProductOrderFailure(getErrorMessageFromApiError(error)))
  }
}

export function* addFulfillment(action: IProductOrderAction) {
  const { payload } = action
  try {
    const response: IProductOrder = yield call(apiService.postFulfillment, payload as IAddFulfillmentRequest)
    yield put(Creators.addFulfillmentSuccess(response))
    message.success('Fulfillment created!')
  } catch(error: any | unknown) {
    yield put(Creators.addFulfillmentFailure(getErrorMessageFromApiError(error)))
  }
}

export function* putProductOrder(action: IProductOrderAction) {
  const id = action.id
  const payload = action.payload as IUpdateProductOrderRequest
  try {
    const response: IProductOrder = yield call(apiService.putProductOrder, id, payload)
    yield put(Creators.putProductOrderSuccess(response))
    message.success('Order updated!')
    yield put(Creators.fetchProductOrder(id))
  } catch(error: any | unknown) {
    yield put(Creators.putProductOrderFailure(getErrorMessageFromApiError(error)))
  }
}

export function* putProductOrderDetail(action: IProductOrderAction) {
  const productOrderId = action.productOrderId as string
  const orderDetailId = action.orderDetailId as string
  const payload = action.payload as IUpdateProductOrderDetailRequest
  try {
    const response: IProductOrder = yield call(apiService.putProductOrderDetail, productOrderId, orderDetailId, payload)
    yield put(Creators.putProductOrderSuccess(response))
    message.success('Order updated!')
    yield put(Creators.fetchProductOrder(productOrderId))
  } catch(error: any | unknown) {
    yield put(Creators.putProductOrderFailure(getErrorMessageFromApiError(error)))
  }
}

export function* deleteProductOrder(action: IProductOrderAction) {
  const { id } = action
  console.log('delete order id', id)
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
    takeLeading(Types.ADD_FULFILLMENT, addFulfillment),
    takeLeading(Types.PUT_PRODUCT_ORDER_DETAIL, putProductOrderDetail)
  ])
}

export default userSaga