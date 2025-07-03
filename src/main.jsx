import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './Components/App'
import './assets/CSS/style.css'
import Context from './Context/Context'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Context>
      <App/>
    
  </Context>,
)
