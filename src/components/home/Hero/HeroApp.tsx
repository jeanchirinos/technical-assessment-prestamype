import { InputExchangeInput } from '@/components/home/Input/InputExchangeInput'
import { OutputExchangeInput } from '@/components/home/Input/OutputExchangeInput'
import { setExchangeType, toggleExchangeType } from '@/context/exchange/exchangeSlice'
import { AppDispatch, RootState } from '@/context/store'
import { ExchangeType } from '@/enums'
import { useOutput } from '@/hooks/useOutput'
import { useRates } from '@/hooks/useRates'
import { ExchangeIcon } from '@/icons'
import { useDispatch, useSelector } from 'react-redux'
import './HeroApp.scss'

export function HeroApp() {
  const { exchangeType } = useSelector((state: RootState) => state.exchange)
  const { purchasePrice, salePrice, ratesIsLoading, ratesIsError } = useSelector(
    (state: RootState) => state.rates
  )
  const dispatch = useDispatch<AppDispatch>()

  useRates()
  useOutput()

  return (
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
  )
}
