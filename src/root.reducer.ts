import { combineReducers } from 'redux'
import airlineReducer from './services/redux/airline/reducer'
import customerReducer from './services/redux/customer/reducer'
import productReducer from './services/redux/product/reducer'
import productCategoryReducer from './services/redux/product_category/reducer'
import productOrderReducer from './services/redux/product_order/reducer'
import AppConfigReducer from './services/redux/app_config/reducer'
import PaginationReducer from './services/redux/pagination/reducer'
import AuthReducer from './services/redux/auth/reducer'
import UserReducer from './services/redux/user/reducer'

const rootReducer = combineReducers({
  airline: airlineReducer,
  customer: customerReducer,
  product: productReducer,
  product_category: productCategoryReducer,
  product_order: productOrderReducer,
  app_config: AppConfigReducer,
  pagination: PaginationReducer,
  auth: AuthReducer,
  user: UserReducer
})

//export type AppState = ReturnType<typeof rootReducer>

export default rootReducer