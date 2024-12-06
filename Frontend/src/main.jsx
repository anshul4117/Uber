import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserConetxt from './context/UserConetxt.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserConetxt>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserConetxt>
  </StrictMode>,
)
