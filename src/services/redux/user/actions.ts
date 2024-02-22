import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions(
  {
    fetchUsers: ['query'],
    fetchUserSuccess: ['data'],
    fetchUsersFailure: ['error'],

    fetchUser: ['id'],
    fetchUsersSuccess: ['data', 'message'],
    fetchUserFailure: ['error'],

    postUser: ['payload'],
    postUserSuccess: ['data'],
    postUserFailure: ['error'],

    putUser: ['id', 'payload'],
    putUserSuccess: ['data'],
    putUserFailure: ['error'],

    deleteUser: ['id'],
    deleteUserSuccess: ['data'],
    deleteUserFailure: ['error'],

    setSelectedUser: ['data'],

    resetUser: null
  }
)

export { Types, Creators  }