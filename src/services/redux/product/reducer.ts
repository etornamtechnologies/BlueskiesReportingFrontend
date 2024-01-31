import { createReducer } from 'reduxsauce'
import Types from './actionTypes'
import { IProduct, IProductAction, IProductState } from '../../../models/product.model'


export const INITIAL_STATE: IProductState = {
  fetching: false,
  products: [],
  has_next: false,
  product: null,
  selected_product: null,
  error: '',
  posting: false,
  post_success: false
}


// ======== FETCH ALL PRODUCTS =======
export const fetchProducts = (state = INITIAL_STATE, action: IProductAction): IProductState => {
  return {
    ...state,
    fetching: true
  }
}

export const fetchProductsSuccess = (state = INITIAL_STATE, action: IProductAction): IProductState => {
  console.log('reducer fetch prodctio action', action)
  const { hasNext, data } = action.data as IPaginatedData<IProduct[]>
  return {
    ...state,
    fetching: false,
    products: data,
    has_next: hasNext
  }
}

export const fetchProductsFailure = (state = INITIAL_STATE, action: IProductAction): IProductState => {
  return {
    ...state,
    fetching: false,
    error: action.error as string
  }
}

// ============== GET PRODUCT =========
export const fetchProduct = (state = INITIAL_STATE, action: IProductAction): IProductState => {
  return {
    ...state,
    fetching: true
  }
}

export const fetchProductSuccess = (state = INITIAL_STATE, action: IProductAction): IProductState => {
  const data: IProduct = action.data as IProduct
  return {
    ...state,
    fetching: false,
    product: data,
    error: ''
  }
}

export const fetchProductFailure = (state = INITIAL_STATE, action: IProductAction): IProductState => {
  return {
    ...state,
    fetching: false,
    error: action.error as string
  }
}


//======================Put=============

export const putProduct = (state = INITIAL_STATE, actions: IProductAction): IProductState => {
  return {
    ...state,
    posting: true,
    error: ''
  }
}

export const putProductSuccess = (state = INITIAL_STATE, actions: IProductAction): IProductState => {
  const data = actions.data as IProduct
  return {
    ...state,
    posting: false,
    product: data,
    post_success: true
  }
}

export const putProductFailure = (state = INITIAL_STATE, actions: IProductAction): IProductState => {
  return {
    ...state,
    posting: false,
    error: actions.error as string
  }
}


//======================Create=============

export const postProduct = (state = INITIAL_STATE, actions: IProductAction): IProductState => {
  return {
    ...state,
    posting: true,
    product: null,
    post_success: false,
    error: ''
  }
}

export const postProductSuccess = (state = INITIAL_STATE, actions: IProductAction): IProductState => {
  const { data } = actions
  return {
    ...state,
    posting: false,
    product: data as IProduct,
    post_success: true,
    error: ''
  }
}

export const postProductFailure = (state = INITIAL_STATE, actions: IProductAction): IProductState => {
  return {
    ...state,
    posting: false,
    post_success: false,
    error: actions.error as string
  }
}

//======================Delete=============

export const deleteProduct = (state = INITIAL_STATE, actions: IProductAction): IProductState => {
  return {
    ...state,
    posting: true,
    post_success: false,
  }
}

export const deleteProductSuccess = (state = INITIAL_STATE, actions: IProductAction): IProductState => {
  const data = actions.data as IProduct

  return {
    ...state,
    posting: false,
    products: state.products.filter(it => it.id !== data?.id),
    post_success: true
  }
}

export const deleteProductFailure = (state = INITIAL_STATE, actions: IProductAction): IProductState => {
  return {
    ...state,
    posting: false,
    post_success: false,
    error: actions.error as string
  }
}



export const setSelectedProduct = (state = INITIAL_STATE, action: { data: IProduct }): IProductState => {
  const data = action.data as IProduct
  return {
    ...state,
    selected_product: data
  }
}

export const resetProduct = (state = INITIAL_STATE, action: { data: IProduct }): IProductState => {
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
  [Types.FETCH_PRODUCTS]: fetchProducts,
  [Types.FETCH_PRODUCTS_SUCCESS]: fetchProductsSuccess,
  [Types.FETCH_PRODUCTS_FAILURE]: fetchProductsFailure,

  [Types.FETCH_PRODUCT]: fetchProduct,
  [Types.FETCH_PRODUCT_SUCCESS]: fetchProductSuccess,
  [Types.FETCH_PRODUCT_FAILURE]: fetchProductFailure,

  [Types.POST_PRODUCT]: postProduct,
  [Types.POST_PRODUCT_SUCCESS]: postProductSuccess,
  [Types.POST_PRODUCT_FAILURE]: postProductFailure,

  [Types.PUT_PRODUCT]: putProduct,
  [Types.PUT_PRODUCT_SUCCESS]: putProductSuccess,
  [Types.PUT_PRODUCT_FAILURE]: putProductFailure,

  [Types.DELETE_PRODUCT]: deleteProduct,
  [Types.DELETE_PRODUCT_SUCCESS]: deleteProductSuccess,
  [Types.DELETE_PRODUCT_FAILURE]: deleteProductFailure,

  [Types.RESET_PRODUCT]: resetProduct,

  [Types.SET_SELECTED_PRODUCT]: setSelectedProduct,

}


export default createReducer(INITIAL_STATE, HANDLERS)