import { IoSyncOutline } from 'react-icons/io5'
import { ExchangeInput } from '@/components/ExchangeInput'

export function App() {
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
          <button className='hero-app__tab selected'>
            <span>Dólar compra</span>
            <span>3.9240</span>
          </button>
          <button className='hero-app__tab'>
            <span>Dólar venta</span>
            <span>3.9450</span>
          </button>
        </div>

        <form className='hero-app__form'>
          <div className='hero-app__inputs'>
            <ExchangeInput currencyText='Dólares' operationText='Envías' currencySymbol='$' />
            <ExchangeInput currencyText='Soles' operationText='Recibes' currencySymbol='S/' />
            <button type='button' className='hero-app__change-type'>
              <IoSyncOutline />
            </button>
          </div>

          <button className='hero-app__submit'>Iniciar operación</button>
        </form>
      </section>
    </main>
  )
}
