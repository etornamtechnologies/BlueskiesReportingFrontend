import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions(
  {
    fetchProductOrders: ['query'],
    fetchProductOrderSuccess: ['data'],
    fetchProductOrdersFailure: ['error'],

    fetchProductOrder: ['id'],
    fetchProductOrdersSuccess: ['data', 'message'],
    fetchProductOrderFailure: ['error'],

    postProductOrder: ['payload'],
    postProductOrderSuccess: ['data'],
    postProductOrderFailure: ['error'],

    putProductOrder: ['id', 'payload'],
    putProductOrderSuccess: ['data'],
    putProductOrderFailure: ['error'],

    deleteProductOrder: ['id'],
    deleteProductOrderSuccess: ['data'],
    deleteProductOrderFailure: ['error'],

    setSelectedProductOrder: ['airline'],

    resetProductOrder: null
  }
)

export { Types, Creators  }