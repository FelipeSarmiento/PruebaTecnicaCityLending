import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
// @ts-ignore
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from './Components/NavBar'
import { Login } from './Auth/Login/Login';
import { Register } from './Auth/Register/Register';
import { Home } from './Home/Home';
import {AuthProvider} from "./context/AuthContext.tsx";
import {Management} from "./Management/Management.tsx";
import {ProtectedRoute, UnProtectedRoute} from "./Components/ProtectedRoute.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Router>
          <AuthProvider>
              <Routes>
                  <Route path="/" element={ <NavBar/> } >
                      <Route element={ <ProtectedRoute/> }>
                          <Route path="/" element={ <Home/> } />
                          <Route path="management" element={ <Management/> } />
                          <Route path="*" element={ <Home/> } />
                      </Route>
                      <Route element={ <UnProtectedRoute/> }>
                          <Route path="auth/login" element={ <Login/> } />
                          <Route path="auth/register" element={ <Register/> } />
                      </Route>
                  </Route>
              </Routes>
          </AuthProvider>
      </Router>
    
  </StrictMode>,
)

