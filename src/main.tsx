import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/rubik/400.css'
import '@fontsource/rubik/500.css'
import '@/styles/index.scss'
import { Home } from '@/pages/home'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Home />
  </StrictMode>
)
