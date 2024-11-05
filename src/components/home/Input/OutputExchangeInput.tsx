import { setInput, setOutput } from '@/context/exchange/exchangeSlice'
import { AppDispatch, RootState } from '@/context/store'
import { ExchangeType } from '@/enums'
import { fromDollarsToSoles, fromSolesToDollars } from '@/services/calculateExchange'
import { useDispatch, useSelector } from 'react-redux'
import { ExchangeInput } from './ExchangeInput'

export function OutputExchangeInput() {
  const { exchangeType, output } = useSelector((state: RootState) => state.exchange)
  const { purchasePrice, salePrice } = useSelector((state: RootState) => state.rates)

  const dispatch = useDispatch<AppDispatch>()

  const currencyText = exchangeType === ExchangeType.PURCHASE ? 'Soles' : 'Dólares'
  const currencySymbol = exchangeType === ExchangeType.PURCHASE ? 'S/' : '$'

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newOutput = Number(event.target.value)

    dispatch(setOutput(newOutput))

    if (!purchasePrice || !salePrice) return

    if (exchangeType === ExchangeType.PURCHASE) {
      const input = fromDollarsToSoles({
        amount: {
          type: 'output',
          value: newOutput,
        },
        purchasePrice,
      })

      dispatch(setInput(input))
    } else {
      const input = fromSolesToDollars({
        amount: {
          type: 'output',
          value: newOutput,
        },
        salePrice,
      })

      dispatch(setInput(input))
    }
  }

  return (
    <ExchangeInput
      value={output ?? 0}
      onChange={handleChange}
      currencyText={currencyText}
      operationText='Recibes'
      currencySymbol={currencySymbol}
    />
  )
}
