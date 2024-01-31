import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions(
  {
    fetchProducts: ['query'],
    fetchProductSuccess: ['data'],
    fetchProductsFailure: ['error'],

    fetchProduct: ['id'],
    fetchProductsSuccess: ['data', 'message'],
    fetchProductFailure: ['error'],

    postProduct: ['payload'],
    postProductSuccess: ['data'],
    postProductFailure: ['error'],

    putProduct: ['id', 'payload'],
    putProductSuccess: ['data'],
    putProductFailure: ['error'],

    deleteProduct: ['id'],
    deleteProductSuccess: ['data'],
    deleteProductFailure: ['error'],

    setSelectedProduct: ['data'],

    resetProduct: null
  }
)

export { Types, Creators  }