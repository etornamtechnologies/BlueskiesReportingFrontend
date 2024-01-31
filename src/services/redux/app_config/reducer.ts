import { createReducer } from 'reduxsauce'
import Types from './actionTypes'
import { IAppConfigAction, IAppConfigState } from '../../../models/app.config.model'


export const INITIAL_STATE: IAppConfigState = {
  theme: 'light'
}


export const setTheme = (state = INITIAL_STATE, action: IAppConfigAction): IAppConfigState => {
  const theme = action.theme
  return {
    ...state,
    theme: theme
  }
}


export const resetAppConfig = (state = INITIAL_STATE, action: any): IAppConfigState => {
  return {
    ...state,
    theme: 'light'
  }
}

export const HANDLERS = {
  [Types.SET_THEME]: setTheme,
  [Types.RESET_APP_CONFIG]: resetAppConfig,

}


export default createReducer(INITIAL_STATE, HANDLERS)