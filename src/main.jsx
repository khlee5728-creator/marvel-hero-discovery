import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QuizProvider } from './context/QuizContext.jsx'
import { initScaling } from './utils/scaling.js'
import './index.css'
import App from './App.jsx'

initScaling()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <QuizProvider>
        <App />
      </QuizProvider>
    </BrowserRouter>
  </StrictMode>,
)
