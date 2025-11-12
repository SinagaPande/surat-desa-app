import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import AdminDashboard from './components/AdminDashboard'
import UserDashboard from './components/UserDashboard'
import './styles/globals.css'

// Buat router dengan dua route terpisah
const router = createBrowserRouter([
  {
    path: "/",
    element: <UserDashboard />,
  },
  {
    path: "/admin", 
    element: <AdminDashboard />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)