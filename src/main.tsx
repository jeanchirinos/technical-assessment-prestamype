import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/rubik/400.css'
import '@fontsource/rubik/500.css'
import '@/styles/index.scss'
// import { Provider } from 'react-redux'
import { Home } from '@/pages/home'
// import { store } from '@/context/store.ts'

createRoot(document.getElementById('root')!).render(
  // <Provider store={store}>
  <StrictMode>
    <Home />
  </StrictMode>
  // </Provider>
)
