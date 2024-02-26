import { createTypes } from 'reduxsauce'

export default createTypes(
  `
    SIGN_IN
    SIGN_IN_SUCCESS
    SIGN_IN_FAILURE

    FILTER_CUSTOMERS

    SIGN_UP
    SIGN_UP_SUCCESS
    SIGN_UP_FAILURE

    SIGN_OUT

    RESET_AUTH
  `,
)