import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions(
  {
    fetchProductCategories: ['query'],
    fetchProductCategoriesSuccess: ['data'],
    fetchProductCategoriesFailure: ['error'],

    fetchProductCategory: ['id'],
    fetchProductCategorySuccess: ['data', 'message'],
    fetchProductCategoryFailure: ['error'],

    postProductCategory: ['payload'],
    postProductCategorySuccess: ['data'],
    postProductCategoryFailure: ['error'],

    putProductCategory: ['id', 'payload'],
    putProductCategorySuccess: ['data'],
    putProductCategoryFailure: ['error'],

    deleteProductCategory: ['id'],
    deleteProductCategorySuccess: ['data'],
    deleteProductCategoryFailure: ['error'],

    setSelectedProductCategory: ['airline'],

    resetProductCategory: null
  }
)

export { Types, Creators  }