import { act, fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { InputExchangeInput } from '@/components/home/Input/InputExchangeInput'
import { store } from '@/context/store'
import { DEFAULT_INPUT_EXCHANGE_DATA } from '@/constants/values'

describe('InputExchangeInput', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <InputExchangeInput />
      </Provider>
    )
  })

  it('should render with initial state', () => {
    expect(screen.getByText('Dólares')).toBeInTheDocument()
    expect(screen.getByText('Envías')).toBeInTheDocument()
    expect(screen.getByDisplayValue(DEFAULT_INPUT_EXCHANGE_DATA.text)).toBeInTheDocument()
  })

  it('should change on input change', async () => {
    const inputElement = screen.getByDisplayValue(DEFAULT_INPUT_EXCHANGE_DATA.text)

    const newValue = 100

    act(() => {
      fireEvent.change(inputElement, { target: { value: newValue } })
    })

    const input = store.getState().exchange.input.amount

    expect(input).toBe(newValue)
  })
})
