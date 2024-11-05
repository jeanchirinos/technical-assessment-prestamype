import { fireEvent, render, screen } from '@testing-library/react'
import { HeroApp } from '@/components/home/Hero/HeroApp'
import { Provider } from 'react-redux'
import { store } from '@/context/store'

describe('HeroApp Component', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <HeroApp />
      </Provider>
    )
  })

  it('displays the correct initial exchange type', () => {
    expect(screen.getByTestId('dollar-purchase-tab-content')).toHaveClass('selected')
  })

  it('toggles exchange type when button is clicked', () => {
    const toggleButton = screen.getByTitle('Cambiar moneda')
    fireEvent.click(toggleButton)

    expect(screen.getByTestId('dollar-sell-tab-content')).toHaveClass('selected')
  })

  // Should work if firebase config is working
  // it('displays error message when rates are not available', async () => {
  //   await new Promise(resolve => setTimeout(resolve, 4000))

  //   expect(screen.getByText('Servicio no disponible')).toBeInTheDocument()
  // })

  it('disables submit button when rates are loading', () => {
    const submitButton = screen.getByText('Iniciar operación')
    expect(submitButton).toBeDisabled()
  })
})
