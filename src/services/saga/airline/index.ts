import { all, call, put, takeLatest, takeLeading } from 'redux-saga/effects'
import { Types, Creators } from '../../redux/airline/actions'
import AirlineApiService from '../../api/airline.api'
import { getErrorMessageFromApiError } from '../../../utils/common.helper'
import { AxiosError } from 'axios'
import { IAirline, IAirlineAction, IAirlineQueryParams } from '../../../models/airline.model'

const airlineApiService: AirlineApiService = new AirlineApiService()

export function* fetchAirlines(action: IAirlineAction) {
  const { query } = action
  try {
    const response: IApiResponseDTO<IAirline[]> = yield call(airlineApiService.fetchAirlines, query as IAirlineQueryParams)
    if(response.code === 200) {
      console.log('bo-users', response.data)
      yield put(Creators.fetchAirlinesSuccess(response.data))
    } else {
      yield put(Creators.fetchAirlinesFailure(response.message))
    }
  } catch(error: AxiosError | unknown) {
    const errorMessage = getErrorMessageFromApiError(error) || 'Network Error!'
    yield put(Creators.fetchAirlinesFailure(errorMessage))
  }
}

export function* fetchAirline(action: IAirlineAction) {
  const { id } = action
  try {
    const response: IApiResponseDTO<IAirline> = yield call(airlineApiService.fetchAilineById, id)
    if(response.code === 200) {
      console.log('bo-users', response.data)
      yield put(Creators.fetchAirlineSuccess(response.data))
    } else {
      yield put(Creators.fetchAirlineFailure(response.message))
    }
  } catch(error: AxiosError | unknown) {
    const errorMessage = getErrorMessageFromApiError(error) || 'Network Error!'
    yield put(Creators.fetchAirlineFailure(errorMessage))
  }
}

export function* postAirline(action: IAirlineAction) {
  const { payload } = action
  try {
    const response: IApiResponseDTO<IAirline> = yield call(airlineApiService.postAirline, payload)
    if(response.code === 200) {
      yield put(Creators.postAirlineSuccess(response.data))
    } else {
      yield put(Creators.postAirlineFailure(response.message))
    }
  } catch(error: any | unknown) {
    yield put(Creators.postAirlineFailure(getErrorMessageFromApiError(error)))
  }
}

export function* putAirline(action: IAirlineAction) {
  const { id, payload } = action
  console.log('payload saga', payload)
  try {
    const response: IApiResponseDTO<IAirline> = yield call(airlineApiService.putAirline, id, payload)
    if(response.code === 200) {
      yield put(Creators.putAirlineSuccess(response.data))
    } else {
      yield put(Creators.putAirlineFailure(response.message))
    }
  } catch(error: any | unknown) {
    yield put(Creators.putAirlineFailure(getErrorMessageFromApiError(error)))
  }
}

export function* deleteAirline(action: IAirlineAction) {
  const { id } = action
  try {
    const response: IApiResponseDTO<IAirline> = yield call(airlineApiService.deleteAirline, id)
    if(response.code === 200) {
      yield put(Creators.deleteAirlineSuccess(response.data))
    } else {
      yield put(Creators.deleteAirlineFailure(response.message))
    }
  } catch(error: any | unknown) {
    yield put(Creators.deleteAirlineFailure(getErrorMessageFromApiError(error)))
  }
}

function* userSaga() {
  yield all([
    takeLatest(Types.FETCH_AIRLINES, fetchAirlines),
    takeLatest(Types.FETCH_AIRLINE, fetchAirline),
    takeLeading(Types.POST_AIRLINE, postAirline),
    takeLeading(Types.PUT_AIRLINE, putAirline),
    takeLeading(Types.DELETE_AIRLINE, deleteAirline),
  ])
}

export default userSaga