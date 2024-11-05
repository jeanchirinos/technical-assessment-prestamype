import { ExchangeType } from '@/enums'
import { ExchangeInput } from './ExchangeInput'
import { Dispatch, SetStateAction } from 'react'
import { fromDollarsToSoles, fromSolesToDollars } from '@/services/calculateExchange'

type OutputExchangeInputProps = {
  exchangeType: ExchangeType
  output: number | undefined
  setOutput: Dispatch<SetStateAction<number | undefined>>
  setInput: Dispatch<SetStateAction<number>>
  purchasePrice: number | undefined
  salePrice: number | undefined
}

export function OutputExchangeInput(props: OutputExchangeInputProps) {
  const { exchangeType, output, setOutput, setInput, purchasePrice, salePrice } = props

  const currencyText = exchangeType === ExchangeType.PURCHASE ? 'Soles' : 'Dólares'
  const currencySymbol = exchangeType === ExchangeType.PURCHASE ? 'S/' : '$'

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value)

    setOutput(value)

    if (!output || !purchasePrice || !salePrice) return

    if (exchangeType === ExchangeType.PURCHASE) {
      const input = fromDollarsToSoles({
        amount: output,
        purchasePrice,
      })

      setInput(input)
    } else {
      const input = fromSolesToDollars({
        amount: output,
        salePrice,
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
