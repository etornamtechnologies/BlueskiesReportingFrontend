import { createTypes } from 'reduxsauce'

export default createTypes(
  `
    FETCH_PRODUCT_ORDERS
    FETCH_PRODUCT_ORDERS_SUCCESS
    FETCH_PRODUCT_ORDERS_FAILURE

    FETCH_PRODUCT_ORDER
    FETCH_PRODUCT_ORDER_SUCCESS
    FETCH_PRODUCT_ORDER_FAILURE

    POST_PRODUCT_ORDER
    POST_PRODUCT_ORDER_SUCCESS
    POST_PRODUCT_ORDER_FAILURE

    PUT_PRODUCT_ORDER
    PUT_PRODUCT_ORDER_SUCCESS
    PUT_PRODUCT_ORDER_FAILURE

    DELETE_PRODUCT_ORDER
    DELETE_PRODUCT_ORDER_SUCCESS
    DELETE_PRODUCT_ORDER_FAILURE

    ADD_FULFILLMENT
    ADD_FULFILLMENT_SUCCESS
    ADD_FULFILLMENT_FAILURE

    SET_SELECTED_PRODUCT_ORDER

    ADD_NEW_ORDER
    RESET_NEW_ORDER
    UPDATE_NEW_ORDER
    ADD_ITEM_TO_NEW_ORDER
    REMOVE_ITEM_FROM_NEW_ORDER

    RESET_PRODUCT_ORDER
  `,
)