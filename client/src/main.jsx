import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import UserProvider from './context/userContext.jsx'
import Layout from './Layout.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import "./index.css"
import Home from './pages/Home.jsx'
import ProtectedRoute from './pages/ProtectedRoute.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Register />} />
          <Route path="" element={<Layout />} >
            <Route path='/' element={<ProtectedRoute children={<Home />} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </StrictMode>,
)