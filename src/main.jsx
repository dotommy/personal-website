import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider, createBrowserRouter, Navigate} from 'react-router-dom'
import App from './App.jsx'
import './index.css'

const router = createBrowserRouter([
{ 
  path: "/", 
  element: <App/> },
{
  path: "*",
  element: <Navigate replace to="/" />,
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
