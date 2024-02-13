import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions(
  {
    setPagination: ['data'],
    resetPagination: null,
  }
)

export { Types, Creators  }