import { createTypes } from 'reduxsauce'

export default createTypes(
  `
    FETCH_CUSTOMERS
    FETCH_CUSTOMERS_SUCCESS
    FETCH_CUSTOMERS_FAILURE

    FILTER_CUSTOMERS

    FETCH_CUSTOMER
    FETCH_CUSTOMER_SUCCESS
    FETCH_CUSTOMER_FAILURE

    POST_CUSTOMER
    POST_CUSTOMER_SUCCESS
    POST_CUSTOMER_FAILURE

    PUT_CUSTOMER
    PUT_CUSTOMER_SUCCESS
    PUT_CUSTOMER_FAILURE

    DELETE_CUSTOMER
    DELETE_CUSTOMER_SUCCESS
    DELETE_CUSTOMER_FAILURE

    SET_SELECTED_CUSTOMER

    RESET_CUSTOMER
  `,
)