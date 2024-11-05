import { InputExchangeInput } from '@/components/InputExchangeInput'
import { OutputExchangeInput } from '@/components/OutputExchangeInput'
import { setExchangeType, setOutput, toggleExchangeType } from '@/context/exchange/exchangeSlice'
import { setPurchasePrice, setSalePrice } from '@/context/rates/ratesSlice'
import { AppDispatch, RootState } from '@/context/store'
import { ExchangeType } from '@/enums'
import { ExchangeIcon } from '@/icons'
import { db } from '@/lib/firebaseConfig'
import { fromDollarsToSoles, fromSolesToDollars } from '@/services/calculateExchange'
import { doc } from 'firebase/firestore'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export function Home() {
  const { exchangeType, input, output } = useSelector((state: RootState) => state.exchange)
  const { purchasePrice, salePrice, ratesIsLoading, ratesIsError } = useSelector(
    (state: RootState) => state.rates
  )
  const dispatch = useDispatch<AppDispatch>()

  const docRef = doc(db, 'rates', 'TDmXIypgLKKfNggHHSnw')

  useEffect(() => {
    dispatch(setPurchasePrice(3.8))
    dispatch(setSalePrice(3.9))

    // const unsub = onSnapshot(
    //   docRef,
    //   doc => {
    //     if (!doc.exists()) {
    //       dispatch(setRatesIsError(true))
    //       return
    //     }

    //     const { purchase_price: purchasePrice, sale_price: salePrice } = doc.data()

    //     dispatch(setPurchasePrice(purchasePrice))
    //     dispatch(setSalePrice(salePrice))
    //     dispatch(setRatesIsLoading(false))
    //     dispatch(setRatesIsError(false))
    //   },
    //   error => {
    //     console.error(error)
    //     dispatch(setRatesIsLoading(false))
    //     dispatch(setRatesIsError(true))
    //   }
    // )

    // return () => {
    //   unsub()
    // }
  }, [docRef, dispatch])

  useEffect(() => {
    if (output) return

    if (!purchasePrice || !salePrice) return

    const newOutput = fromDollarsToSoles({
      amount: {
        type: 'input',
        value: input,
      },
      purchasePrice,
    })

    dispatch(setOutput(newOutput))
  }, [input, output, purchasePrice, salePrice, dispatch])

  useEffect(() => {
    if (!purchasePrice || !salePrice) return

    if (exchangeType === ExchangeType.PURCHASE) {
      const output = fromDollarsToSoles({
        amount: {
          type: 'input',
          value: input,
        },
        purchasePrice,
      })

      dispatch(setOutput(output))
    } else {
      const output = fromSolesToDollars({
        amount: {
          type: 'input',
          value: input,
        },
        salePrice,
      })

      dispatch(setOutput(output))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exchangeType])

  return (
    <main className='hero'>
      <section className='hero-text'>
        <h2 className='hero-text__title'>
          El mejor <br /> tipo de cambio
        </h2>
        <p className='hero-text__description'>
          para cambiar dólares y soles <br /> online en Perú
        </p>
      </section>

      <section className='hero-app'>
        <div className='hero-app__tabs'>
          <button
            className='hero-app__tab'
            onClick={() => dispatch(setExchangeType(ExchangeType.PURCHASE))}
          >
            <div
              className={`hero-app__tab-content ${
                exchangeType === ExchangeType.PURCHASE ? 'selected' : ''
              }`}
            >
              <span>Dólar compra</span>
              <span className='hero-app__tab-content-number'>
                {purchasePrice ? purchasePrice : '-'}
              </span>
            </div>
          </button>
          <button
            className='hero-app__tab'
            onClick={() => dispatch(setExchangeType(ExchangeType.SELL))}
          >
            <div
              className={`hero-app__tab-content ${
                exchangeType === ExchangeType.SELL ? 'selected' : ''
              }`}
            >
              <span>Dólar venta</span>
              <span className='hero-app__tab-content-number'>{salePrice ? salePrice : '-'}</span>
            </div>
          </button>
        </div>

        <form className='hero-app__form'>
          {ratesIsError ? (
            <p>Servicio no disponible</p>
          ) : (
            <>
              <div className='hero-app__inputs'>
                <InputExchangeInput />
                <OutputExchangeInput />
                <button
                  type='button'
                  className='hero-app__change-type'
                  onClick={() => dispatch(toggleExchangeType())}
                  title='Cambiar moneda'
                >
                  <ExchangeIcon />
                </button>
              </div>

              <button type='button' className='hero-app__submit' disabled={!ratesIsLoading}>
                Iniciar operación
              </button>
            </>
          )}
        </form>
      </section>
    </main>
  )
}
