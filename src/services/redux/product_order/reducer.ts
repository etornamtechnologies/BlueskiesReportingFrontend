import { createReducer } from 'reduxsauce'
import Types from './actionTypes'
import { INewOrder, IProductOrder, IProductOrderAction, IProductOrderState } from '../../../models/product.order.model'


export const INITIAL_STATE: IProductOrderState = {
  fetching: false,
  product_orders: [],
  has_next: false,
  product_order: null,
  selected_product_order: null,
  error: '',
  posting: false,
  post_success: false,
  new_order: null,
  posting_fulfillment: false,
  post_fulfillment_success: false,
}


// ======== FETCH ALL PRODUCT_ORDERS =======
export const fetchProductOrders = (state = INITIAL_STATE, action: IProductOrderAction): IProductOrderState => {
  return {
    ...state,
    fetching: true
  }
}

export const fetchProductOrdersSuccess = (state = INITIAL_STATE, action: IProductOrderAction): IProductOrderState => {
  const { hasNext, data } = action.data as IPaginatedData<IProductOrder[]>
  return {
    ...state,
    fetching: false,
    product_orders: data.map(item => {
      return {
        ...item, orderDetails: item.orderDetails.map(od => {
          return {...od, orderFulfillments: item.orderFulfillments?.filter(of => of.product.id === od.product.id)}
        })
      }
    }),
    has_next: hasNext
  }
}

export const fetchProductOrdersFailure = (state = INITIAL_STATE, action: IProductOrderAction): IProductOrderState => {
  return {
    ...state,
    fetching: false,
    error: action.error as string
  }
}

// ============== GET PRODUCT_ORDER =========
export const fetchProductOrder = (state = INITIAL_STATE, action: IProductOrderAction): IProductOrderState => {
  return {
    ...state,
    fetching: true
  }
}

export const fetchProductOrderSuccess = (state = INITIAL_STATE, action: IProductOrderAction): IProductOrderState => {
  const data: IProductOrder = action.data as IProductOrder
  return {
    ...state,
    fetching: false,
    product_order: {...data, orderDetails: data.orderDetails.map(od => {
      return {...od, orderFulfillments: data.orderFulfillments?.filter(of => of.product.id === od.product.id)}
    })},
    error: ''
  }
}

export const fetchProductOrderFailure = (state = INITIAL_STATE, action: IProductOrderAction): IProductOrderState => {
  return {
    ...state,
    fetching: false,
    error: action.error as string
  }
}


//======================Put=============

export const putProductOrder = (state = INITIAL_STATE, actions: IProductOrderAction): IProductOrderState => {
  return {
    ...state,
    posting: true,
    error: ''
  }
}

export const putProductOrderSuccess = (state = INITIAL_STATE, actions: IProductOrderAction): IProductOrderState => {
  const data = actions.data as IProductOrder
  return {
    ...state,
    posting: false,
    product_order: data,
    post_success: true
  }
}

export const putProductOrderFailure = (state = INITIAL_STATE, actions: IProductOrderAction): IProductOrderState => {
  return {
    ...state,
    posting: false,
    error: actions.error as string
  }
}


//======================Create=============

export const postProductOrder = (state = INITIAL_STATE, actions: IProductOrderAction): IProductOrderState => {
  return {
    ...state,
    posting: true,
    product_order: null,
    post_success: false,
    error: ''
  }
}

export const postProductOrderSuccess = (state = INITIAL_STATE, actions: IProductOrderAction): IProductOrderState => {
  const { data } = actions
  return {
    ...state,
    posting: false,
    product_order: data as IProductOrder,
    post_success: true,
    error: ''
  }
}

export const postProductOrderFailure = (state = INITIAL_STATE, actions: IProductOrderAction): IProductOrderState => {
  return {
    ...state,
    posting: false,
    post_success: false,
    error: actions.error as string
  }
}

//======================Delete=============

export const deleteProductOrder = (state = INITIAL_STATE, actions: IProductOrderAction): IProductOrderState => {
  return {
    ...state,
    posting: true,
    post_success: false,
  }
}

export const deleteProductOrderSuccess = (state = INITIAL_STATE, actions: IProductOrderAction): IProductOrderState => {
  const data = actions.data as IProductOrder

  return {
    ...state,
    posting: false,
    product_orders: state.product_orders.filter(it => it.id !== data?.id),
    post_success: true
  }
}

export const deleteProductOrderFailure = (state = INITIAL_STATE, actions: IProductOrderAction): IProductOrderState => {
  return {
    ...state,
    posting: false,
    post_success: false,
    error: actions.error as string
  }
}



export const setSelectedProductOrder = (state = INITIAL_STATE, action: { data: IProductOrder }): IProductOrderState => {
  const data = action.data as IProductOrder
  return {
    ...state,
    selected_product_order: data
  }
}

//Fulfillment
export const addFulfillment = (state = INITIAL_STATE, action: IProductOrderAction): IProductOrderState => {
  return {
    ...state,
    posting_fulfillment: true,
    post_fulfillment_success: false
  }
}
export const addFulfillmentSuccess = (state = INITIAL_STATE, action: IProductOrderAction): IProductOrderState => {
  return {
    ...state,
    posting_fulfillment: false,
    post_fulfillment_success: true
  }
}
export const addFulfillmentFailure = (state = INITIAL_STATE, action: IProductOrderAction): IProductOrderState => {
  return {
    ...state,
    posting_fulfillment: false,
    post_fulfillment_success: false
  }
}

export const resetProductOrder = (state = INITIAL_STATE, action: { data: IProductOrder }): IProductOrderState => {
  return {
    ...state,
    fetching: false,
    product_orders: [],
    product_order: null,
    selected_product_order: null,
    error: '',
    posting: false,
    post_success: false
  }
}

export const addNewOrder = (state = INITIAL_STATE, action: IProductOrderAction) => {
  const data: INewOrder = action.data as INewOrder
  return {
    ...state,
    new_order: data
  }
}


export const HANDLERS = {
  [Types.FETCH_PRODUCT_ORDERS]: fetchProductOrders,
  [Types.FETCH_PRODUCT_ORDERS_SUCCESS]: fetchProductOrdersSuccess,
  [Types.FETCH_PRODUCT_ORDERS_FAILURE]: fetchProductOrdersFailure,

  [Types.FETCH_PRODUCT_ORDER]: fetchProductOrder,
  [Types.FETCH_PRODUCT_ORDER_SUCCESS]: fetchProductOrderSuccess,
  [Types.FETCH_PRODUCT_ORDER_FAILURE]: fetchProductOrderFailure,

  [Types.POST_PRODUCT_ORDER]: postProductOrder,
  [Types.POST_PRODUCT_ORDER_SUCCESS]: postProductOrderSuccess,
  [Types.POST_PRODUCT_ORDER_FAILURE]: postProductOrderFailure,

  [Types.PUT_PRODUCT_ORDER]: putProductOrder,
  [Types.PUT_PRODUCT_ORDER_SUCCESS]: putProductOrderSuccess,
  [Types.PUT_PRODUCT_ORDER_FAILURE]: putProductOrderFailure,

  [Types.DELETE_PRODUCT_ORDER]: deleteProductOrder,
  [Types.DELETE_PRODUCT_ORDER_SUCCESS]: deleteProductOrderSuccess,
  [Types.DELETE_PRODUCT_ORDER_FAILURE]: deleteProductOrderFailure,

  [Types.ADD_FULFILLMENT]: addFulfillment,
  [Types.ADD_FULFILLMENT_SUCCESS]: addFulfillmentSuccess,
  [Types.ADD_FULFILLMENT_FAILURE]: addFulfillmentFailure,

  [Types.RESET_PRODUCT_ORDER]: resetProductOrder,

  [Types.SET_SELECTED_PRODUCT_ORDER]: setSelectedProductOrder,

}


export default createReducer(INITIAL_STATE, HANDLERS)