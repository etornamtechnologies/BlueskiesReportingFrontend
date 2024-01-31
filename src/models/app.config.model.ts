
export interface IAppConfigState {
  theme: 'dark' | 'light'
}


export interface IAppConfigAction {
  type: string
  theme: 'dark' | 'light'
}