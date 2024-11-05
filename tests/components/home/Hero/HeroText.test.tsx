import { render, screen } from '@testing-library/react'
import { HeroText } from '@/components/home/Hero/HeroText'

describe('HeroText Component', () => {
  beforeEach(() => {
    render(<HeroText />)
  })

  it('renders the correct title', () => {
    expect(
      screen.getByText(content => {
        return content.includes('El mejor') && content.includes('tipo de cambio')
      })
    ).toBeInTheDocument()
  })

  it('renders the correct subtitle', () => {
    expect(
      screen.getByText(content => {
        return (
          content.includes('para cambiar dólares y soles') && content.includes('online en Perú')
        )
      })
    ).toBeInTheDocument()
  })
})
