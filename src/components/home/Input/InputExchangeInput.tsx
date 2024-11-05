import { setInput } from '@/context/exchange/exchangeSlice'
import { AppDispatch, RootState } from '@/context/store'
import { ExchangeType } from '@/enums'
import { useInputExchange } from '@/hooks/useInputExchange'
import { useDispatch, useSelector } from 'react-redux'
import { ExchangeInput } from './ExchangeInput'

export function InputExchangeInput() {
  const { exchangeType, input } = useSelector((state: RootState) => state.exchange)

  const dispatch = useDispatch<AppDispatch>()

  const currencyText = exchangeType === ExchangeType.PURCHASE ? 'Dólares' : 'Soles'
  const currencySymbol = exchangeType === ExchangeType.PURCHASE ? '$' : 'S/'

  const { calculateOutput } = useInputExchange()

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newInput = Number(event.target.value)

    dispatch(setInput(newInput))

    calculateOutput({ newInput })
  }

  return (
    <ExchangeInput
      value={input.text}
      onChange={handleChange}
      currencyText={currencyText}
      operationText='Envías'
      currencySymbol={currencySymbol}
    />
  )
}
