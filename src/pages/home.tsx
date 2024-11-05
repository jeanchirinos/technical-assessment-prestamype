import { InputExchangeInput } from '@/components/InputExchangeInput'
import { OutputExchangeInput } from '@/components/OutputExchangeInput'
import { ExchangeType } from '@/enums'
import { ExchangeIcon } from '@/icons'
import { calculateDollarExchange, calculateSolesExchange } from '@/services/calculateExchange'
import { useEffect, useState } from 'react'

export function Home() {
  const [exchangeType, setExchangeType] = useState(ExchangeType.PURCHASE)

  const [input, setInput] = useState(1000)
  const [output, setOutput] = useState<number>()

  function handleClickOnExchange() {
    const newExchangeType =
      exchangeType === ExchangeType.PURCHASE ? ExchangeType.SELL : ExchangeType.PURCHASE

    setExchangeType(newExchangeType)
  }

  useEffect(() => {
    if (exchangeType === ExchangeType.PURCHASE) {
      const output = calculateSolesExchange({
        amount: input,
        purchasePrice: 3.924,
      })

      setOutput(output)
    } else {
      const output = calculateDollarExchange({
        amount: input,
        salePrice: 3.945,
      })

      setOutput(output)
    }
  }, [exchangeType, input])

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
              <span className='hero-app__tab-content-number'>3.9240</span>
            </div>
          </button>
          <button className='hero-app__tab' onClick={() => setExchangeType(ExchangeType.SELL)}>
            <div
              className={`hero-app__tab-content ${
                exchangeType === ExchangeType.SELL ? 'selected' : ''
              }`}
            >
              <span>Dólar venta</span>
              <span className='hero-app__tab-content-number'>3.9450</span>
            </div>
          </button>
        </div>

        <form className='hero-app__form'>
          <div className='hero-app__inputs'>
            <InputExchangeInput exchangeType={exchangeType} input={input} setInput={setInput} />
            <OutputExchangeInput
              exchangeType={exchangeType}
              output={output}
              setOutput={setOutput}
              setInput={setInput}
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

          <button type='button' className='hero-app__submit'>
            Iniciar operación
          </button>
        </form>
      </section>
    </main>
  )
}
