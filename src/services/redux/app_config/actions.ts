import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions(
  {
    setTheme: ['theme'],
    resetAppConfig: null
  }
)

export { Types, Creators  }