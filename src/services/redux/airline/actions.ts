import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions(
  {
    fetchAirlines: ['query'],
    fetchAirlineSuccess: ['data'],
    fetchAirlinesFailure: ['error'],

    fetchAirline: ['id'],
    fetchAirlinesSuccess: ['data', 'message'],
    fetchAirlineFailure: ['error'],

    postAirline: ['payload'],
    postAirlineSuccess: ['data'],
    postAirlineFailure: ['error'],

    putAirline: ['id', 'payload'],
    putAirlineSuccess: ['data'],
    putAirlineFailure: ['error'],

    deleteAirline: ['id'],
    deleteAirlineSuccess: ['data'],
    deleteAirlineFailure: ['error'],

    setSelectedAirline: ['airline'],

    resetAirline: null
  }
)

export { Types, Creators  }