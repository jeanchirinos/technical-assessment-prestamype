export type ExchangeInputProps = {
  currencyText: string
  currencySymbol: string
  operationText: string
} & Required<Pick<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>>

export function ExchangeInput(props: ExchangeInputProps) {
  const { operationText, currencySymbol, currencyText, value, onChange } = props

  return (
    <label className='hero-app__label'>
      <span className='hero-app__label-currency'>{currencyText}</span>
      <span className='hero-app__currency-symbol'>{currencySymbol}</span>
      <input type='number' className='hero-app__input' value={value} onChange={onChange} />
      <span className='hero-app__label-operation'>{operationText}</span>
    </label>
  )
}
