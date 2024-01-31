import { createReducer } from 'reduxsauce'
import Types from './actionTypes'
import { ICustomer, ICustomerAction, ICustomerState } from '../../../models/customer.model'


export const INITIAL_STATE: ICustomerState = {
  fetching: false,
  customers: [],
  has_next: false,
  customer: null,
  selected_customer: null,
  error: '',
  posting: false,
  post_success: false
}


// ======== FETCH ALL CUSTOMERS =======
export const fetchCustomers = (state = INITIAL_STATE, action: ICustomerAction): ICustomerState => {
  return {
    ...state,
    fetching: true
  }
}

export const fetchCustomersSuccess = (state = INITIAL_STATE, action: ICustomerAction): ICustomerState => {
  const { hasNext, data } = action.data as IPaginatedData<ICustomer[]>
  return {
    ...state,
    fetching: false,
    customers: data,
    has_next: hasNext
  }
}

export const fetchCustomersFailure = (state = INITIAL_STATE, action: ICustomerAction): ICustomerState => {
  return {
    ...state,
    fetching: false,
    error: action.error as string
  }
}

// ============== GET CUSTOMER =========
export const fetchCustomer = (state = INITIAL_STATE, action: ICustomerAction): ICustomerState => {
  return {
    ...state,
    fetching: true
  }
}

export const fetchCustomerSuccess = (state = INITIAL_STATE, action: ICustomerAction): ICustomerState => {
  const data: ICustomer = action.data as ICustomer
  return {
    ...state,
    fetching: false,
    customer: data,
    error: ''
  }
}

export const fetchCustomerFailure = (state = INITIAL_STATE, action: ICustomerAction): ICustomerState => {
  return {
    ...state,
    fetching: false,
    error: action.error as string
  }
}


//======================Put=============

export const putCustomer = (state = INITIAL_STATE, actions: ICustomerAction): ICustomerState => {
  return {
    ...state,
    posting: true,
    error: ''
  }
}

export const putCustomerSuccess = (state = INITIAL_STATE, actions: ICustomerAction): ICustomerState => {
  const data = actions.data as ICustomer
  return {
    ...state,
    posting: false,
    customer: data,
    post_success: true
  }
}

export const putCustomerFailure = (state = INITIAL_STATE, actions: ICustomerAction): ICustomerState => {
  return {
    ...state,
    posting: false,
    error: actions.error as string
  }
}


//======================Create=============

export const postCustomer = (state = INITIAL_STATE, actions: ICustomerAction): ICustomerState => {
  return {
    ...state,
    posting: true,
    customer: null,
    post_success: false,
    error: ''
  }
}

export const postCustomerSuccess = (state = INITIAL_STATE, actions: ICustomerAction): ICustomerState => {
  const { data } = actions
  return {
    ...state,
    posting: false,
    customer: data as ICustomer,
    post_success: true,
    error: ''
  }
}

export const postCustomerFailure = (state = INITIAL_STATE, actions: ICustomerAction): ICustomerState => {
  return {
    ...state,
    posting: false,
    post_success: false,
    error: actions.error as string
  }
}

//======================Delete=============

export const deleteCustomer = (state = INITIAL_STATE, actions: ICustomerAction): ICustomerState => {
  return {
    ...state,
    posting: true,
    post_success: false,
  }
}

export const deleteCustomerSuccess = (state = INITIAL_STATE, actions: ICustomerAction): ICustomerState => {
  const data = actions.data as ICustomer

  return {
    ...state,
    posting: false,
    customers: state.customers.filter(it => it.id !== data?.id),
    post_success: true
  }
}

export const deleteCustomerFailure = (state = INITIAL_STATE, actions: ICustomerAction): ICustomerState => {
  return {
    ...state,
    posting: false,
    post_success: false,
    error: actions.error as string
  }
}



export const setSelectedCustomer = (state = INITIAL_STATE, action: ICustomerAction): ICustomerState => {
  const data  = action.data as ICustomer
  return {
    ...state,
    selected_customer: data
  }
}

export const resetCustomer = (state = INITIAL_STATE, action: { data: ICustomer }): ICustomerState => {
  return {
    ...state,
    fetching: false,
    customers: [],
    customer: null,
    selected_customer: null,
    error: '',
    posting: false,
    post_success: false
  }
}

export const HANDLERS = {
  [Types.FETCH_CUSTOMERS]: fetchCustomers,
  [Types.FETCH_CUSTOMERS_SUCCESS]: fetchCustomersSuccess,
  [Types.FETCH_CUSTOMERS_FAILURE]: fetchCustomersFailure,

  [Types.FETCH_CUSTOMER]: fetchCustomer,
  [Types.FETCH_CUSTOMER_SUCCESS]: fetchCustomerSuccess,
  [Types.FETCH_CUSTOMER_FAILURE]: fetchCustomerFailure,

  [Types.POST_CUSTOMER]: postCustomer,
  [Types.POST_CUSTOMER_SUCCESS]: postCustomerSuccess,
  [Types.POST_CUSTOMER_FAILURE]: postCustomerFailure,

  [Types.PUT_CUSTOMER]: putCustomer,
  [Types.PUT_CUSTOMER_SUCCESS]: putCustomerSuccess,
  [Types.PUT_CUSTOMER_FAILURE]: putCustomerFailure,

  [Types.DELETE_CUSTOMER]: deleteCustomer,
  [Types.DELETE_CUSTOMER_SUCCESS]: deleteCustomerSuccess,
  [Types.DELETE_CUSTOMER_FAILURE]: deleteCustomerFailure,

  [Types.RESET_CUSTOMER]: resetCustomer,

  [Types.SET_SELECTED_CUSTOMER]: setSelectedCustomer,

}


export default createReducer(INITIAL_STATE, HANDLERS)