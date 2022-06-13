import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './components/App'
import Facade from './lib/Facade'

const root = document.getElementById('root')

ReactDOM.createRoot(root!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

Facade.getEvents()