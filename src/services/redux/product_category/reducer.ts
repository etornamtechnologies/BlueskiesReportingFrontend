import { createReducer } from 'reduxsauce'
import Types from './actionTypes'
import { IProductCategory, IProductCategoryAction, IProductCategoryState } from '../../../models/product.category.model'


export const INITIAL_STATE: IProductCategoryState = {
  fetching: false,
  product_categories: [],
  has_next: false,
  product_category: null,
  selected_product_category: null,
  error: '',
  posting: false,
  post_success: false
}


// ======== FETCH ALL PRODUCT_CATEGORYS =======
export const fetchProductCategories = (state = INITIAL_STATE, action: IProductCategoryAction): IProductCategoryState => {
  return {
    ...state,
    fetching: true
  }
}

export const fetchProductCategoriesSuccess = (state = INITIAL_STATE, action: IProductCategoryAction): IProductCategoryState => {
  const { hasNext, data } = action.data as IPaginatedData<IProductCategory[]>

  return {
    ...state,
    fetching: false,
    product_categories: data,
    has_next: hasNext
  }
}

export const fetchProductCategoriesFailure = (state = INITIAL_STATE, action: IProductCategoryAction): IProductCategoryState => {
  return {
    ...state,
    fetching: false,
    error: action.error as string
  }
}

// ============== GET PRODUCT_CATEGORY =========
export const fetchProductCategory = (state = INITIAL_STATE, action: IProductCategoryAction): IProductCategoryState => {
  return {
    ...state,
    fetching: true
  }
}

export const fetchProductCategorySuccess = (state = INITIAL_STATE, action: IProductCategoryAction): IProductCategoryState => {
  const data: IProductCategory = action.data as IProductCategory
  return {
    ...state,
    fetching: false,
    product_category: data,
    error: ''
  }
}

export const fetchProductCategoryFailure = (state = INITIAL_STATE, action: IProductCategoryAction): IProductCategoryState => {
  return {
    ...state,
    fetching: false,
    error: action.error as string
  }
}


//======================Put=============

export const putProductCategory = (state = INITIAL_STATE, actions: IProductCategoryAction): IProductCategoryState => {
  return {
    ...state,
    posting: true,
    error: ''
  }
}

export const putProductCategorySuccess = (state = INITIAL_STATE, actions: IProductCategoryAction): IProductCategoryState => {
  const data = actions.data as IProductCategory
  return {
    ...state,
    posting: false,
    product_category: data,
    post_success: true
  }
}

export const putProductCategoryFailure = (state = INITIAL_STATE, actions: IProductCategoryAction): IProductCategoryState => {
  return {
    ...state,
    posting: false,
    error: actions.error as string
  }
}


//======================Create=============

export const postProductCategory = (state = INITIAL_STATE, actions: IProductCategoryAction): IProductCategoryState => {
  return {
    ...state,
    posting: true,
    product_category: null,
    post_success: false,
    error: ''
  }
}

export const postProductCategorySuccess = (state = INITIAL_STATE, actions: IProductCategoryAction): IProductCategoryState => {
  const { data } = actions
  return {
    ...state,
    posting: false,
    product_category: data as IProductCategory,
    post_success: true,
    error: ''
  }
}

export const postProductCategoryFailure = (state = INITIAL_STATE, actions: IProductCategoryAction): IProductCategoryState => {
  return {
    ...state,
    posting: false,
    post_success: false,
    error: actions.error as string
  }
}

//======================Delete=============

export const deleteProductCategory = (state = INITIAL_STATE, actions: IProductCategoryAction): IProductCategoryState => {
  return {
    ...state,
    posting: true,
    post_success: false,
  }
}

export const deleteProductCategorySuccess = (state = INITIAL_STATE, actions: IProductCategoryAction): IProductCategoryState => {
  const data = actions.data as IProductCategory

  return {
    ...state,
    posting: false,
    product_categories: state.product_categories.filter(it => it.id !== data?.id),
    post_success: true
  }
}

export const deleteProductCategoryFailure = (state = INITIAL_STATE, actions: IProductCategoryAction): IProductCategoryState => {
  return {
    ...state,
    posting: false,
    post_success: false,
    error: actions.error as string
  }
}



export const setSelectedProductCategory = (state = INITIAL_STATE, action: { data: IProductCategory }): IProductCategoryState => {
  const data = action.data as IProductCategory
  return {
    ...state,
    selected_product_category: data
  }
}

export const resetProductCategory = (state = INITIAL_STATE, action: { data: IProductCategory }): IProductCategoryState => {
  return {
    ...state,
    fetching: false,
    product_categories: [],
    has_next: false,
    product_category: null,
    selected_product_category: null,
    error: '',
    posting: false,
    post_success: false
  }
}

export const HANDLERS = {
  [Types.FETCH_PRODUCT_CATEGORIES]: fetchProductCategories,
  [Types.FETCH_PRODUCT_CATEGORIES_SUCCESS]: fetchProductCategoriesSuccess,
  [Types.FETCH_PRODUCT_CATEGORIES_FAILURE]: fetchProductCategoriesFailure,

  [Types.FETCH_PRODUCT_CATEGORY]: fetchProductCategory,
  [Types.FETCH_PRODUCT_CATEGORY_SUCCESS]: fetchProductCategorySuccess,
  [Types.FETCH_PRODUCT_CATEGORY_FAILURE]: fetchProductCategoryFailure,

  [Types.POST_PRODUCT_CATEGORY]: postProductCategory,
  [Types.POST_PRODUCT_CATEGORY_SUCCESS]: postProductCategorySuccess,
  [Types.POST_PRODUCT_CATEGORY_FAILURE]: postProductCategoryFailure,

  [Types.PUT_PRODUCT_CATEGORY]: putProductCategory,
  [Types.PUT_PRODUCT_CATEGORY_SUCCESS]: putProductCategorySuccess,
  [Types.PUT_PRODUCT_CATEGORY_FAILURE]: putProductCategoryFailure,

  [Types.DELETE_PRODUCT_CATEGORY]: deleteProductCategory,
  [Types.DELETE_PRODUCT_CATEGORY_SUCCESS]: deleteProductCategorySuccess,
  [Types.DELETE_PRODUCT_CATEGORY_FAILURE]: deleteProductCategoryFailure,

  [Types.RESET_PRODUCT_CATEGORY]: resetProductCategory,

  [Types.SET_SELECTED_PRODUCT_CATEGORY]: setSelectedProductCategory,

}


export default createReducer(INITIAL_STATE, HANDLERS)