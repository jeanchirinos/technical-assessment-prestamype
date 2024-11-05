import { ExchangeType } from '@/enums'
import { ExchangeInput } from './ExchangeInput'
import { Dispatch, SetStateAction } from 'react'
import { calculateSolesExchange, calculateDollarExchange } from '@/services/calculateExchange'

type OutputExchangeInputProps = {
  exchangeType: ExchangeType
  output: number | undefined
  setOutput: Dispatch<SetStateAction<number | undefined>>
  setInput: Dispatch<SetStateAction<number>>
}

export function OutputExchangeInput(props: OutputExchangeInputProps) {
  const { exchangeType, output, setOutput, setInput } = props

  const currencyText = exchangeType === ExchangeType.PURCHASE ? 'Soles' : 'Dólares'
  const currencySymbol = exchangeType === ExchangeType.PURCHASE ? 'S/' : '$'

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value)

    setOutput(value)

    if (!output) return

    if (exchangeType === ExchangeType.PURCHASE) {
      const input = calculateSolesExchange({
        amount: output,
        purchasePrice: 3.924,
      })

      setInput(input)
    } else {
      const input = calculateDollarExchange({
        amount: output,
        salePrice: 3.945,
      })

      setInput(input)
    }
  }

  return (
    <ExchangeInput
      value={output ?? 0}
      onChange={handleChange}
      currencyText={currencyText}
      operationText='Envías'
      currencySymbol={currencySymbol}
    />
  )
}
