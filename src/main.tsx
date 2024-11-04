import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import '@fontsource/rubik/400.css'
import '@fontsource/rubik/500.css'
import { App } from '@/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
