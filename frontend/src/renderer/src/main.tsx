import './css/main.css';

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Login from './screen/auth/login/Login';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './screen/auth/register/Register';

const router = createBrowserRouter([
  {
    path: "/",
    // element: <ProtectedRoute element={App} />,
    element: <App />,
  },
  {
    path: "/auth/register",
    element: <Register />
  },
  {
    path: "/auth/login",
    element: <Login />
  },


]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)