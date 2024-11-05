import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type RatesState = {
  purchasePrice: number | undefined
  salePrice: number | undefined
  ratesIsLoading: boolean
  ratesIsError: boolean | undefined
}

const initialState: RatesState = {
  purchasePrice: undefined,
  salePrice: undefined,
  ratesIsLoading: true,
  ratesIsError: undefined,
}

const ratesSlice = createSlice({
  name: 'rates',
  initialState,
  reducers: {
    setPurchasePrice: (state, action: PayloadAction<number>) => {
      state.purchasePrice = action.payload
    },
    setSalePrice: (state, action: PayloadAction<number>) => {
      state.salePrice = action.payload
    },
    setRatesIsLoading: (state, action: PayloadAction<boolean>) => {
      state.ratesIsLoading = action.payload
    },
    setRatesIsError: (state, action: PayloadAction<boolean>) => {
      state.ratesIsError = action.payload
    },
  },
})

export const { setPurchasePrice, setRatesIsError, setRatesIsLoading, setSalePrice } =
  ratesSlice.actions

export default ratesSlice.reducer
