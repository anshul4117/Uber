import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserConetxt from './context/UserConetxt.jsx'
import CaptainContext from './context/CaptainContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CaptainContext>
      <UserConetxt>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserConetxt>
    </CaptainContext>
  </StrictMode>,
)
