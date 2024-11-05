import { FALLBACK_PURCHASE_PRICE, FALLBACK_SALE_PRICE } from '@/constants/values'
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

  async function getFallbackRates(): Promise<{
    purchasePrice: number
    salePrice: number
  }> {
    return {
      purchasePrice: FALLBACK_PURCHASE_PRICE,
      salePrice: FALLBACK_SALE_PRICE,
    }
  }

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
        if (process.env.NODE_ENV === 'development') {
          console.error('Error getting rates from Firebase.', error)
        }

        getFallbackRates().then(data => {
          dispatch(setPurchasePrice(data.purchasePrice))
          dispatch(setSalePrice(data.salePrice))
          dispatch(setRatesIsLoading(false))
        })

        // Commented since firebase config is not working
        // dispatch(setRatesIsError(true))
      }
    )

    return () => {
      unsub()
    }
  }, [docRef, dispatch])
}
