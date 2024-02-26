import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions(
  {
    signIn: ['payload'],
    signInSuccess: ['data'],
    signInFailure: ['error'],

    signUp: ['payload'],
    signUpSuccess: ['data', 'message'],
    signUpFailure: ['error'],

    signOut: null,
  

    resetAuth: null
  }
)

export { Types, Creators  }