import { InputExchangeInput } from '@/components/InputExchangeInput'
import { OutputExchangeInput } from '@/components/OutputExchangeInput'
import { ExchangeType } from '@/enums'
import { ExchangeIcon } from '@/icons'
import { db } from '@/lib/firebaseConfig'
import { fromSolesToDollars, fromDollarsToSoles } from '@/services/calculateExchange'
import { doc, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'

export function Home() {
  const [exchangeType, setExchangeType] = useState(ExchangeType.PURCHASE)
  const [input, setInput] = useState(1000)
  const [output, setOutput] = useState<number>()

  const [purchasePrice, setPurchasePrice] = useState<number>()
  const [salePrice, setSalePrice] = useState<number>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>()

  function handleClickOnExchange() {
    const newExchangeType =
      exchangeType === ExchangeType.PURCHASE ? ExchangeType.SELL : ExchangeType.PURCHASE

    setExchangeType(newExchangeType)
  }

  const docRef = doc(db, 'rates', 'TDmXIypgLKKfNggHHSnw')

  useEffect(() => {
    const unsub = onSnapshot(
      docRef,
      doc => {
        if (!doc.exists()) {
          setIsError(true)
          return
        }

        const { purchase_price: purchasePrice, sale_price: salePrice } = doc.data()

        setPurchasePrice(purchasePrice)
        setSalePrice(salePrice)
        setIsLoading(false)
        setIsError(false)
      },
      error => {
        console.error(error)
        setIsLoading(false)
        setIsError(true)
      }
    )

    return () => {
      unsub()
    }
  }, [docRef])

  useEffect(() => {
    if (!purchasePrice || !salePrice) return

    if (exchangeType === ExchangeType.PURCHASE) {
      const output = fromDollarsToSoles({
        amount: input,
        purchasePrice,
      })

      setOutput(output)
    } else {
      const output = fromSolesToDollars({
        amount: input,
        salePrice,
      })

      setOutput(output)
    }
  }, [exchangeType, input, purchasePrice, salePrice])

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
          <button className='hero-app__tab' onClick={() => setExchangeType(ExchangeType.PURCHASE)}>
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
          <button className='hero-app__tab' onClick={() => setExchangeType(ExchangeType.SELL)}>
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
          {isError ? (
            <p>Servicio no disponible</p>
          ) : (
            <>
              <div className='hero-app__inputs'>
                <InputExchangeInput exchangeType={exchangeType} input={input} setInput={setInput} />
                <OutputExchangeInput
                  exchangeType={exchangeType}
                  output={output}
                  setOutput={setOutput}
                  setInput={setInput}
                  purchasePrice={purchasePrice}
                  salePrice={salePrice}
                />
                <button
                  type='button'
                  className='hero-app__change-type'
                  onClick={handleClickOnExchange}
                  title='Cambiar moneda'
                >
                  <ExchangeIcon />
                </button>
              </div>

              <button type='button' className='hero-app__submit' disabled={!isLoading}>
                Iniciar operación
              </button>
            </>
          )}
        </form>
      </section>
    </main>
  )
}
