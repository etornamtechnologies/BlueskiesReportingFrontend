import { createReducer } from 'reduxsauce'
import Types from './actionTypes'
import { IProduct, IProductAction, IProductState } from '../../../models/product.model'


export const INITIAL_STATE: IProductState = {
  fetching: false,
  products: [],
  product: null,
  selected_product: null,
  error: '',
  posting: false,
  post_success: false
}


// ======== FETCH ALL CUSTOMERS =======
export const fetchAirlines = (state = INITIAL_STATE, action: IProductAction): IProductState => {
  return {
    ...state,
    fetching: true
  }
}

export const fetchAirlinesSuccess = (state = INITIAL_STATE, action: { data: IProduct[], message: string }): IProductState => {
  const { data } = action
  return {
    ...state,
    fetching: false,
    products: data
  }
}

export const fetchAirlinesFailure = (state = INITIAL_STATE, action: IProductAction): IProductState => {
  return {
    ...state,
    fetching: false,
    error: action.error as string
  }
}

// ============== GET CUSTOMER =========
export const fetchAirline = (state = INITIAL_STATE, action: IProductAction): IProductState => {
  return {
    ...state,
    fetching: true
  }
}

export const fetchAirlineSuccess = (state = INITIAL_STATE, action: IProductAction): IProductState => {
  const data: IProduct = action.data as IProduct
  return {
    ...state,
    fetching: false,
    product: data,
    error: ''
  }
}

export const fetchAirlineFailure = (state = INITIAL_STATE, action: IProductAction): IProductState => {
  return {
    ...state,
    fetching: false,
    error: action.error as string
  }
}


//======================Put=============

export const putAirline = (state = INITIAL_STATE, actions: IProductAction): IProductState => {
  return {
    ...state,
    posting: true,
    error: ''
  }
}

export const putAirlineSuccess = (state = INITIAL_STATE, actions: IProductAction): IProductState => {
  const data = actions.data as IProduct
  return {
    ...state,
    posting: false,
    product: data,
    post_success: true
  }
}

export const putAirlineFailure = (state = INITIAL_STATE, actions: IProductAction): IProductState => {
  return {
    ...state,
    posting: false,
    error: actions.error as string
  }
}


//======================Create=============

export const postAirline = (state = INITIAL_STATE, actions: IProductAction): IProductState => {
  return {
    ...state,
    posting: true,
    product: null,
    post_success: false,
    error: ''
  }
}

export const postAirlineSuccess = (state = INITIAL_STATE, actions: IProductAction): IProductState => {
  const { data } = actions
  return {
    ...state,
    posting: false,
    product: data as IProduct,
    post_success: true,
    error: ''
  }
}

export const postAirlineFailure = (state = INITIAL_STATE, actions: IProductAction): IProductState => {
  return {
    ...state,
    posting: false,
    post_success: false,
    error: actions.error as string
  }
}

//======================Delete=============

export const deleteAirline = (state = INITIAL_STATE, actions: IProductAction): IProductState => {
  return {
    ...state,
    posting: true,
    post_success: false,
  }
}

export const deleteAirlineSuccess = (state = INITIAL_STATE, actions: IProductAction): IProductState => {
  const data = actions.data as IProduct

  return {
    ...state,
    posting: false,
    products: state.products.filter(it => it.id !== data?.id),
    post_success: true
  }
}

export const deleteAirlineFailure = (state = INITIAL_STATE, actions: IProductAction): IProductState => {
  return {
    ...state,
    posting: false,
    post_success: false,
    error: actions.error as string
  }
}



export const setSelectedAirline = (state = INITIAL_STATE, action: { data: IProduct }): IProductState => {
  const data = action.data as IProduct
  return {
    ...state,
    selected_product: data
  }
}

export const resetAirline = (state = INITIAL_STATE, action: { data: IProduct }): IProductState => {
  return {
    ...state,
    fetching: false,
    products: [],
    product: null,
    selected_product: null,
    error: '',
    posting: false,
    post_success: false
  }
}

export const HANDLERS = {
  [Types.FETCH_CUSTOMERS]: fetchAirlines,
  [Types.FETCH_CUSTOMERS_SUCCESS]: fetchAirlinesSuccess,
  [Types.FETCH_CUSTOMERS_FAILURE]: fetchAirlinesFailure,

  [Types.FETCH_CUSTOMER]: fetchAirline,
  [Types.FETCH_CUSTOMER_SUCCESS]: fetchAirlineSuccess,
  [Types.FETCH_CUSTOMER_FAILURE]: fetchAirlineFailure,

  [Types.POST_CUSTOMER]: postAirline,
  [Types.POST_CUSTOMER_SUCCESS]: postAirlineSuccess,
  [Types.POST_CUSTOMER_FAILURE]: postAirlineFailure,

  [Types.PUT_CUSTOMER]: putAirline,
  [Types.PUT_CUSTOMER_SUCCESS]: putAirlineSuccess,
  [Types.PUT_CUSTOMER_FAILURE]: putAirlineFailure,

  [Types.DELETE_CUSTOMER]: deleteAirline,
  [Types.DELETE_CUSTOMER_SUCCESS]: deleteAirlineSuccess,
  [Types.DELETE_CUSTOMER_FAILURE]: deleteAirlineFailure,

  [Types.RESET_CUSTOMER]: resetAirline,

  [Types.SET_SELECTED_CUSTOMER]: setSelectedAirline,

}


export default createReducer(INITIAL_STATE, HANDLERS)