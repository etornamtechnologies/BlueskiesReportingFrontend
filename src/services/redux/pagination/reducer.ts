import { createReducer } from 'reduxsauce'
import Types from './actionTypes'
import { IPagination, IPaginationAction, IPaginationState } from '../../../models/pagination.model'


export const INITIAL_STATE: IPaginationState = {
  has_next: false,
  page_no: 0,
  page_size: 0
}




export const setPagination = (state = INITIAL_STATE, actions: IPaginationAction): IPaginationState => {
  const { 
    hasNext,
    pageNo,
    pageSize
   } = actions.data as IPagination

  return {
    ...state,
    has_next: hasNext,
    page_no: pageNo,
    page_size: pageSize
  }
}


export const resetPagination = (state = INITIAL_STATE, action: IPaginationAction): IPaginationState => {
  return {
    ...state,
    has_next: false,
    page_no: 0,
    page_size: 5
  }
}

export const HANDLERS = {
  [Types.SET_PAGINATION]: setPagination,
  [Types.RESET_PAGINATION]: resetPagination,
}


export default createReducer(INITIAL_STATE, HANDLERS)