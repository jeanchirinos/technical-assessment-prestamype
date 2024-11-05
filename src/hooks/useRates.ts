import {
  setPurchasePrice,
  setRatesIsError,
  setRatesIsLoading,
  setSalePrice,
} from '@/context/rates/ratesSlice'
import { AppDispatch } from '@/context/store'
import { db } from '@/lib/firebaseConfig'
import { doc, onSnapshot } from 'firebase/firestore'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export function useRates() {
  const dispatch = useDispatch<AppDispatch>()

  const docRef = doc(db, 'rates', 'TDmXIypgLKKfNggHHSnw')

  useEffect(() => {
    const unsub = onSnapshot(
      docRef,
      doc => {
        if (!doc.exists()) {
          dispatch(setRatesIsError(true))
          return
        }

        const { purchase_price: purchasePrice, sale_price: salePrice } = doc.data()

        dispatch(setPurchasePrice(purchasePrice))
        dispatch(setSalePrice(salePrice))
        dispatch(setRatesIsLoading(false))
        dispatch(setRatesIsError(false))
      },
      error => {
        dispatch(setPurchasePrice(3.768))
        dispatch(setSalePrice(3.789))

        console.error(error)
        dispatch(setRatesIsLoading(false))
        // dispatch(setRatesIsError(true))
      }
    )

    return () => {
      unsub()
    }
  }, [docRef, dispatch])
}
