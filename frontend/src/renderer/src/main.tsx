import './css/main.css';

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Register from './screen/auth/register/Register';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Register />
  </React.StrictMode>
)
