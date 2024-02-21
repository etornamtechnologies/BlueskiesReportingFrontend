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

    putProductOrderDetail: ['productOrderId', 'orderDetailId','payload'],
    putProductOrderDetailSuccess: ['data'],
    putProductOrderDetailFailure: ['error'],

    deleteProductOrder: ['id'],
    deleteProductOrderSuccess: ['data'],
    deleteProductOrderFailure: ['error'],

    setSelectedProductOrder: ['data'],

    addFulfillment: ['payload'],
    addFulfillmentSuccess: ['data'],
    addFulfillmentFailure: ['error'],

    filterByStatus: ['filter'],

    addNewOrder: ['data'],
    updateNewOrder: ['data'],
    resetNewOrder: null,
    addItemToNewOrder: ['data'],
    removeItemFromNewOrder: ['data'],

    resetProductOrder: null
  }
)

export { Types, Creators  }