import { DEFAULT_INPUT_EXCHANGE_DATA } from '@/constants/values'
import { setOutput } from '@/context/exchange/exchangeSlice'
import { AppDispatch, RootState } from '@/context/store'
import { ExchangeType } from '@/enums'
import { fromDollarsToSoles, fromSolesToDollars } from '@/services/calculateExchange'
import { useDispatch, useSelector } from 'react-redux'

export function useInputExchange() {
  const { exchangeType } = useSelector((state: RootState) => state.exchange)
  const { purchasePrice, salePrice } = useSelector((state: RootState) => state.rates)
  const dispatch = useDispatch<AppDispatch>()

  function calculateOutput(args?: { newInput?: number }) {
    const { newInput = DEFAULT_INPUT_EXCHANGE_DATA.amount } = args ?? {}

    if (!purchasePrice || !salePrice) return

    if (exchangeType === ExchangeType.PURCHASE) {
      const newOutput = fromDollarsToSoles({
        amount: {
          type: 'input',
          value: newInput,
        },
        purchasePrice,
      })

      dispatch(setOutput(newOutput.amount))
    } else {
      const newOutput = fromSolesToDollars({
        amount: {
          type: 'input',
          value: newInput,
        },
        salePrice,
      })

      dispatch(setOutput(newOutput.amount))
    }
  }

  return { calculateOutput }
}
