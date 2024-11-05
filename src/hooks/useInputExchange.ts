import { setOutput } from '@/context/exchange/exchangeSlice'
import { AppDispatch, RootState } from '@/context/store'
import { ExchangeType } from '@/enums'
import { fromDollarsToSoles, fromSolesToDollars } from '@/services/calculateExchange'
import { useDispatch, useSelector } from 'react-redux'

export function useInputExchange() {
  const { exchangeType, input } = useSelector((state: RootState) => state.exchange)
  const { purchasePrice, salePrice } = useSelector((state: RootState) => state.rates)
  const dispatch = useDispatch<AppDispatch>()

  function calculateOutput(args?: { newInput?: number }) {
    const { newInput = input } = args ?? {}

    if (!purchasePrice || !salePrice) return

    if (exchangeType === ExchangeType.PURCHASE) {
      const newOutput = fromDollarsToSoles({
        amount: {
          type: 'input',
          value: newInput,
        },
        purchasePrice,
      })

      dispatch(setOutput(newOutput))
    } else {
      const newOutput = fromSolesToDollars({
        amount: {
          type: 'input',
          value: newInput,
        },
        salePrice,
      })

      dispatch(setOutput(newOutput))
    }
  }

  return { calculateOutput }
}
