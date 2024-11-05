import { setInput, setOutput } from '@/context/exchange/exchangeSlice'
import { AppDispatch, RootState } from '@/context/store'
import { ExchangeType } from '@/enums'
import { useDispatch, useSelector } from 'react-redux'
import { ExchangeInput } from './ExchangeInput'
import { fromDollarsToSoles, fromSolesToDollars } from '@/services/calculateExchange'

export function InputExchangeInput() {
  const { exchangeType, input } = useSelector((state: RootState) => state.exchange)
  const { purchasePrice, salePrice } = useSelector((state: RootState) => state.rates)
  const dispatch = useDispatch<AppDispatch>()

  const currencyText = exchangeType === ExchangeType.PURCHASE ? 'Dólares' : 'Soles'
  const currencySymbol = exchangeType === ExchangeType.PURCHASE ? '$' : 'S/'

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newInput = Number(event.target.value)

    dispatch(setInput(newInput))

    if (!purchasePrice || !salePrice) return

    if (exchangeType === ExchangeType.PURCHASE) {
      const output = fromDollarsToSoles({
        amount: {
          type: 'input',
          value: newInput,
        },
        purchasePrice,
      })

      dispatch(setOutput(output))
    } else {
      const output = fromSolesToDollars({
        amount: {
          type: 'input',
          value: newInput,
        },
        salePrice,
      })

      dispatch(setOutput(output))
    }
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
