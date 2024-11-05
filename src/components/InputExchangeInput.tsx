import { ExchangeType } from '@/enums'
import { Dispatch, SetStateAction } from 'react'
import { ExchangeInput } from './ExchangeInput'

type InputExchangeInputProps = {
  exchangeType: ExchangeType
  input: number
  setInput: Dispatch<SetStateAction<number>>
}

export function InputExchangeInput(props: InputExchangeInputProps) {
  const { exchangeType, input, setInput } = props

  const currencyText = exchangeType === ExchangeType.PURCHASE ? 'Dólares' : 'Soles'
  const currencySymbol = exchangeType === ExchangeType.PURCHASE ? '$' : 'S/'

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value)

    setInput(value)
  }

  return (
    <ExchangeInput
      value={input}
      onChange={handleChange}
      currencyText={currencyText}
      operationText='Envías'
      currencySymbol={currencySymbol}
    />
  )
}
