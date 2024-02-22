import { all, fork } from '@redux-saga/core/effects'

import airlineSaga from './services/saga/airline'
import customerSaga from './services/saga/customer'
import productSaga from './services/saga/product'
import productCategorySaga from './services/saga/product_category'
import productOrderSaga from './services/saga/product_order'
import authSaga from './services/saga/auth'
import userSaga from './services/saga/user'


export default function* rootSaga() {
  yield all([
    fork(airlineSaga),
    fork(customerSaga),
    fork(productSaga),
    fork(productCategorySaga),
    fork(productOrderSaga),
    fork(authSaga),
    fork(userSaga)
  ])
}