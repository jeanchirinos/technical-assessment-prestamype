import { configureStore } from '@reduxjs/toolkit'
import exchangeReducer from './exchange/exchangeSlice'
import ratesReducer from './rates/ratesSlice'

export const store = configureStore({
  reducer: {
    exchange: exchangeReducer,
    rates: ratesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
