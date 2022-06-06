import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import { CategoriesProvider } from './context/CategoriesContext'
import { CartProvider } from './context/CartContext'
import './index.scss'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <CategoriesProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CategoriesProvider>
      </UserProvider>
    </Router>
  </React.StrictMode>
)
