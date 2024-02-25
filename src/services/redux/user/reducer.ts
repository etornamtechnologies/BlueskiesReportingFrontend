import { createReducer } from 'reduxsauce'
import Types from './actionTypes'
import { IUser, IUserAction, IUserState } from '../../../models/user.model'


export const INITIAL_STATE: IUserState = {
  fetching: false,
  users: [],
  has_next: false,
  user: null,
  selected_user: null,
  error: '',
  posting: false,
  post_success: false
}


// ======== FETCH ALL USERS =======
export const fetchUsers = (state = INITIAL_STATE, action: IUserAction): IUserState => {
  return {
    ...state,
    fetching: true
  }
}

export const fetchUsersSuccess = (state = INITIAL_STATE, action: IUserAction): IUserState => {
  console.log('reducer fetch prodctio action', action)
  const data = action.data as IUser[]
  return {
    ...state,
    fetching: false,
    users: data,
  }
}

export const fetchUsersFailure = (state = INITIAL_STATE, action: IUserAction): IUserState => {
  return {
    ...state,
    fetching: false,
    error: action.error as string
  }
}

// ============== GET USER =========
export const fetchUser = (state = INITIAL_STATE, action: IUserAction): IUserState => {
  return {
    ...state,
    fetching: true
  }
}

export const fetchUserSuccess = (state = INITIAL_STATE, action: IUserAction): IUserState => {
  const data: IUser = action.data as IUser
  return {
    ...state,
    fetching: false,
    user: data,
    error: ''
  }
}

export const fetchUserFailure = (state = INITIAL_STATE, action: IUserAction): IUserState => {
  return {
    ...state,
    fetching: false,
    error: action.error as string
  }
}


//======================Put=============

export const putUser = (state = INITIAL_STATE, actions: IUserAction): IUserState => {
  return {
    ...state,
    posting: true,
    error: ''
  }
}

export const putUserSuccess = (state = INITIAL_STATE, actions: IUserAction): IUserState => {
  const data = actions.data as IUser
  return {
    ...state,
    posting: false,
    user: data,
    post_success: true
  }
}

export const putUserFailure = (state = INITIAL_STATE, actions: IUserAction): IUserState => {
  return {
    ...state,
    posting: false,
    error: actions.error as string
  }
}


//======================Create=============

export const postUser = (state = INITIAL_STATE, actions: IUserAction): IUserState => {
  return {
    ...state,
    posting: true,
    user: null,
    post_success: false,
    error: ''
  }
}

export const postUserSuccess = (state = INITIAL_STATE, actions: IUserAction): IUserState => {
  const { data } = actions
  return {
    ...state,
    posting: false,
    user: data as IUser,
    post_success: true,
    error: ''
  }
}

export const postUserFailure = (state = INITIAL_STATE, actions: IUserAction): IUserState => {
  return {
    ...state,
    posting: false,
    post_success: false,
    error: actions.error as string
  }
}

//======================Delete=============

export const deleteUser = (state = INITIAL_STATE, actions: IUserAction): IUserState => {
  return {
    ...state,
    posting: true,
    post_success: false,
  }
}

export const deleteUserSuccess = (state = INITIAL_STATE, actions: IUserAction): IUserState => {
  const data = actions.data as IUser

  return {
    ...state,
    posting: false,
    users: state.users.filter(it => it.id !== data?.id),
    post_success: true
  }
}

export const deleteUserFailure = (state = INITIAL_STATE, actions: IUserAction): IUserState => {
  return {
    ...state,
    posting: false,
    post_success: false,
    error: actions.error as string
  }
}



export const setSelectedUser = (state = INITIAL_STATE, action: { data: IUser }): IUserState => {
  const data = action.data as IUser
  return {
    ...state,
    selected_user: data
  }
}

export const resetUser = (state = INITIAL_STATE, action: { data: IUser }): IUserState => {
  return {
    ...state,
    fetching: false,
    users: [],
    user: null,
    selected_user: null,
    error: '',
    posting: false,
    post_success: false
  }
}

export const HANDLERS = {
  [Types.FETCH_USERS]: fetchUsers,
  [Types.FETCH_USERS_SUCCESS]: fetchUsersSuccess,
  [Types.FETCH_USERS_FAILURE]: fetchUsersFailure,

  [Types.FETCH_USER]: fetchUser,
  [Types.FETCH_USER_SUCCESS]: fetchUserSuccess,
  [Types.FETCH_USER_FAILURE]: fetchUserFailure,

  [Types.POST_USER]: postUser,
  [Types.POST_USER_SUCCESS]: postUserSuccess,
  [Types.POST_USER_FAILURE]: postUserFailure,

  [Types.PUT_USER]: putUser,
  [Types.PUT_USER_SUCCESS]: putUserSuccess,
  [Types.PUT_USER_FAILURE]: putUserFailure,

  [Types.DELETE_USER]: deleteUser,
  [Types.DELETE_USER_SUCCESS]: deleteUserSuccess,
  [Types.DELETE_USER_FAILURE]: deleteUserFailure,

  [Types.RESET_USER]: resetUser,

  [Types.SET_SELECTED_USER]: setSelectedUser,

}


export default createReducer(INITIAL_STATE, HANDLERS)