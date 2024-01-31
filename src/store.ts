// import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import { legacy_createStore, applyMiddleware } from 'redux'
import rootReducer from './root.reducer'
import rootSaga from './root.saga'


const logger = createLogger()

const sagaMiddleware = createSagaMiddleware()

const store = legacy_createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, logger as any)
)


sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store