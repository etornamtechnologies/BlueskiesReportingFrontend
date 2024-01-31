import { combineReducers } from 'redux'
import airlineReducer from './services/redux/airline/reducer'
import customerReducer from './services/redux/customer/reducer'
import productReducer from './services/redux/product/reducer'
import productCategoryReducer from './services/redux/product_category/reducer'
import productOrderReducer from './services/redux/product_order/reducer'
import AppConfigReducer from './services/redux/app_config/reducer'

const rootReducer = combineReducers({
  airline: airlineReducer,
  customer: customerReducer,
  product: productReducer,
  product_category: productCategoryReducer,
  product_order: productOrderReducer,
  app_config: AppConfigReducer
})

//export type AppState = ReturnType<typeof rootReducer>

export default rootReducer