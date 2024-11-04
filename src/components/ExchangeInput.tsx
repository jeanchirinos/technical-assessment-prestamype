type ExchangeInputProps = {
  currencyText: string
  currencySymbol: string
  operationText: string
}

export function ExchangeInput(props: ExchangeInputProps) {
  const { currencyText, operationText, currencySymbol } = props

  return (
    <label className='hero-app__label'>
      <span className='hero-app__label-currency'>{currencyText}</span>
      <span className='hero-app__currency-symbol'>{currencySymbol}</span>
      <input type='number' className='hero-app__input' />
      <span className='hero-app__label-operation'>{operationText}</span>
    </label>
  )
}
