import { ExchangeType } from '@/enums'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type ExchangeState = {
  exchangeType: ExchangeType
  input: number
  output: number | undefined
}

const initialState: ExchangeState = {
  exchangeType: ExchangeType.PURCHASE,
  input: 1000,
  output: undefined,
}

const exchangeSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    setExchangeType: (state, action: PayloadAction<ExchangeType>) => {
      state.exchangeType = action.payload
    },
    toggleExchangeType: state => {
      const newExchangeType =
        state.exchangeType === ExchangeType.PURCHASE ? ExchangeType.SELL : ExchangeType.PURCHASE

      state.exchangeType = newExchangeType
    },
    setInput: (state, action: PayloadAction<number>) => {
      state.input = action.payload
    },
    setOutput: (state, action: PayloadAction<number>) => {
      state.output = action.payload
    },
  },
})

export const { setExchangeType, toggleExchangeType, setInput, setOutput } = exchangeSlice.actions

export default exchangeSlice.reducer
