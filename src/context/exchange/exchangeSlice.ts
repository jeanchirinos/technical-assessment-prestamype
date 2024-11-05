import { DEFAULT_INPUT_EXCHANGE_DATA } from '@/constants/values'
import { ExchangeType } from '@/enums'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type InputData = {
  amount: number
  text: string
}

type ExchangeState = {
  exchangeType: ExchangeType
  input: InputData
  output: InputData | undefined
}

const initialState: ExchangeState = {
  exchangeType: ExchangeType.PURCHASE,
  input: {
    amount: DEFAULT_INPUT_EXCHANGE_DATA.amount,
    text: DEFAULT_INPUT_EXCHANGE_DATA.text,
  },
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
      state.input = {
        amount: action.payload,
        text: action.payload.toFixed(2),
      }
    },
    setOutput: (state, action: PayloadAction<number>) => {
      state.output = {
        amount: action.payload,
        text: action.payload.toFixed(2),
      }
    },
  },
})

export const { setExchangeType, toggleExchangeType, setInput, setOutput } = exchangeSlice.actions

export default exchangeSlice.reducer
