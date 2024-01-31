import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions(
  {
    fetchCustomers: ['query'],
    fetchCustomerSuccess: ['data'],
    fetchCustomersFailure: ['error'],

    fetchCustomer: ['id'],
    fetchCustomersSuccess: ['data', 'message'],
    fetchCustomerFailure: ['error'],

    postCustomer: ['payload'],
    postCustomerSuccess: ['data'],
    postCustomerFailure: ['error'],

    putCustomer: ['id', 'payload'],
    putCustomerSuccess: ['data'],
    putCustomerFailure: ['error'],

    deleteCustomer: ['id'],
    deleteCustomerSuccess: ['data'],
    deleteCustomerFailure: ['error'],

    setSelectedCustomer: ['data'],

    resetCustomer: null
  }
)

export { Types, Creators  }