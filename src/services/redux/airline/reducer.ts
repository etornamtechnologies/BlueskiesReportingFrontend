import { createReducer } from 'reduxsauce'
import Types from './actionTypes'
import { IAirline, IAirlineAction, IAirlineState } from '../../../models/airline.model'


export const INITIAL_STATE: IAirlineState = {
  fetching: false,
  airlines: [],
  has_next: false,
  airline: null,
  selected_airline: null,
  error: '',
  posting: false,
  post_success: false
}


// ======== FETCH ALL AIRLINES =======
export const fetchAirlines = (state = INITIAL_STATE, action: IAirlineAction): IAirlineState => {
  return {
    ...state,
    fetching: true
  }
}

export const fetchAirlinesSuccess = (state = INITIAL_STATE, action: IAirlineAction): IAirlineState => {
 
  const data = action.data as IAirline[]
  console.log('airline reducer fetch success', action)
  return {
    ...state,
    fetching: false,
    airlines: data,
  }
}

export const fetchAirlinesFailure = (state = INITIAL_STATE, action: IAirlineAction): IAirlineState => {
  return {
    ...state,
    fetching: false,
    error: action.error as string
  }
}

// ============== GET AIRLINE =========
export const fetchAirline = (state = INITIAL_STATE, action: IAirlineAction): IAirlineState => {
  return {
    ...state,
    fetching: true
  }
}

export const fetchAirlineSuccess = (state = INITIAL_STATE, action: IAirlineAction): IAirlineState => {
  const data: IAirline = action.data as IAirline
  return {
    ...state,
    fetching: false,
    airline: data,
    error: ''
  }
}

export const fetchAirlineFailure = (state = INITIAL_STATE, action: IAirlineAction): IAirlineState => {
  return {
    ...state,
    fetching: false,
    error: action.error as string
  }
}


//======================Put=============

export const putAirline = (state = INITIAL_STATE, actions: IAirlineAction): IAirlineState => {
  return {
    ...state,
    posting: true,
    error: ''
  }
}

export const putAirlineSuccess = (state = INITIAL_STATE, actions: IAirlineAction): IAirlineState => {
  const data = actions.data as IAirline
  return {
    ...state,
    posting: false,
    airline: data,
    post_success: true
  }
}

export const putAirlineFailure = (state = INITIAL_STATE, actions: IAirlineAction): IAirlineState => {
  return {
    ...state,
    posting: false,
    error: actions.error as string
  }
}


//======================Create=============

export const postAirline = (state = INITIAL_STATE, actions: IAirlineAction): IAirlineState => {
  return {
    ...state,
    posting: true,
    airline: null,
    post_success: false,
    error: ''
  }
}

export const postAirlineSuccess = (state = INITIAL_STATE, actions: IAirlineAction): IAirlineState => {
  const { data } = actions
  return {
    ...state,
    posting: false,
    airline: data as IAirline,
    post_success: true,
    error: ''
  }
}

export const postAirlineFailure = (state = INITIAL_STATE, actions: IAirlineAction): IAirlineState => {
  return {
    ...state,
    posting: false,
    post_success: false,
    error: actions.error as string
  }
}

//======================Delete=============

export const deleteAirline = (state = INITIAL_STATE, actions: IAirlineAction): IAirlineState => {
  return {
    ...state,
    posting: true,
    post_success: false,
  }
}

export const deleteAirlineSuccess = (state = INITIAL_STATE, actions: IAirlineAction): IAirlineState => {
  const data = actions.data as IAirline

  return {
    ...state,
    posting: false,
    airlines: state.airlines.filter(it => it.id !== data?.id),
    post_success: true
  }
}

export const deleteAirlineFailure = (state = INITIAL_STATE, actions: IAirlineAction): IAirlineState => {
  return {
    ...state,
    posting: false,
    post_success: false,
    error: actions.error as string
  }
}



export const setSelectedAirline = (state = INITIAL_STATE, action: { data: IAirline }): IAirlineState => {
  const data = action.data as IAirline
  return {
    ...state,
    selected_airline: data
  }
}

export const resetAirline = (state = INITIAL_STATE, action: { data: IAirline }): IAirlineState => {
  return {
    ...state,
    fetching: false,
    airlines: [],
    airline: null,
    selected_airline: null,
    error: '',
    posting: false,
    post_success: false
  }
}

export const HANDLERS = {
  [Types.FETCH_AIRLINES]: fetchAirlines,
  [Types.FETCH_AIRLINES_SUCCESS]: fetchAirlinesSuccess,
  [Types.FETCH_AIRLINES_FAILURE]: fetchAirlinesFailure,

  [Types.FETCH_AIRLINE]: fetchAirline,
  [Types.FETCH_AIRLINE_SUCCESS]: fetchAirlineSuccess,
  [Types.FETCH_AIRLINE_FAILURE]: fetchAirlineFailure,

  [Types.POST_AIRLINE]: postAirline,
  [Types.POST_AIRLINE_SUCCESS]: postAirlineSuccess,
  [Types.POST_AIRLINE_FAILURE]: postAirlineFailure,

  [Types.PUT_AIRLINE]: putAirline,
  [Types.PUT_AIRLINE_SUCCESS]: putAirlineSuccess,
  [Types.PUT_AIRLINE_FAILURE]: putAirlineFailure,

  [Types.DELETE_AIRLINE]: deleteAirline,
  [Types.DELETE_AIRLINE_SUCCESS]: deleteAirlineSuccess,
  [Types.DELETE_AIRLINE_FAILURE]: deleteAirlineFailure,

  [Types.RESET_AIRLINE]: resetAirline,

  [Types.SET_SELECTED_AIRLINE]: setSelectedAirline,

}


export default createReducer(INITIAL_STATE, HANDLERS)