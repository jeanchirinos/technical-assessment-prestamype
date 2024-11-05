import { act, fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { OutputExchangeInput } from '@/components/home/Input/OutputExchangeInput'
import { store } from '@/context/store'

describe('OutputExchangeInput', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <OutputExchangeInput />
      </Provider>
    )
  })

  it('should render with initial state', () => {
    expect(screen.getByText('Soles')).toBeInTheDocument()
    expect(screen.getByText('Recibes')).toBeInTheDocument()
    expect(screen.getByDisplayValue(0)).toBeInTheDocument()
  })

  it('should change on input change', async () => {
    const inputElement = screen.getByDisplayValue(0)

    const newValue = 200

    act(() => {
      fireEvent.change(inputElement, { target: { value: newValue } })
    })

    const output = store.getState().exchange.output?.amount

    expect(output).toBe(newValue)
  })
})
