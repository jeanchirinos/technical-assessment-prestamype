import { HeroApp } from './HeroApp'
import { HeroText } from './HeroText'
import './Hero.scss'

export function Hero() {
  return (
    <main className='hero'>
      <HeroText />
      <HeroApp />
    </main>
  )
}
