import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GlobalState from './context/index.jsx'
import {Provider} from './components/ui/provider'
import App from './App.jsx'
// import theme from './theme.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalState>
      <Provider>
        <App />
      </Provider>
    </GlobalState>
  </StrictMode>,
)
