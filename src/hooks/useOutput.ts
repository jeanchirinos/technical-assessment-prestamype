import { RootState } from '@/context/store'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useInputExchange } from './useInputExchange'

export function useOutput() {
  const { exchangeType, output } = useSelector((state: RootState) => state.exchange)
  const { purchasePrice, salePrice } = useSelector((state: RootState) => state.rates)

  const { calculateOutput } = useInputExchange()

  useEffect(() => {
    if (output) return

    calculateOutput()
  }, [calculateOutput, output])

  useEffect(() => {
    calculateOutput()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exchangeType, purchasePrice, salePrice])
}
