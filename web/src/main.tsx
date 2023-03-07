import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

import { Register } from './pages/Register'
import { Home } from './pages/Home'
import { Info } from './components/Info'
import { Login } from './pages/Login'

import './global.css'
import { Coisas } from './components/Coisas'
import { AuthProvider } from './context/Auth/AuthProvider'
import { RequireAuth } from './context/Auth/RequireAuth'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="home" element={<RequireAuth><Home /></RequireAuth>} >
            <Route path="info" element={<Info />} />
            <Route path="coisas" element={<Coisas />} />
          </Route>
          <Route path="create" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
)
