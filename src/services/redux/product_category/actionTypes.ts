import { createTypes } from 'reduxsauce'

export default createTypes(
  `
    FETCH_PRODUCT_CATEGORIES
    FETCH_PRODUCT_CATEGORIES_SUCCESS
    FETCH_PRODUCT_CATEGORIES_FAILURE

    FILTER_PRODUCT_CATEGORYS

    FETCH_PRODUCT_CATEGORY
    FETCH_PRODUCT_CATEGORY_SUCCESS
    FETCH_PRODUCT_CATEGORY_FAILURE

    POST_PRODUCT_CATEGORY
    POST_PRODUCT_CATEGORY_SUCCESS
    POST_PRODUCT_CATEGORY_FAILURE

    PUT_PRODUCT_CATEGORY
    PUT_PRODUCT_CATEGORY_SUCCESS
    PUT_PRODUCT_CATEGORY_FAILURE

    DELETE_PRODUCT_CATEGORY
    DELETE_PRODUCT_CATEGORY_SUCCESS
    DELETE_PRODUCT_CATEGORY_FAILURE

    SET_SELECTED_PRODUCT_CATEGORY

    RESET_PRODUCT_CATEGORY
  `,
)