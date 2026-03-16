import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { PrivateRoute, PublicRoute } from './routes'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AddMoney from './pages/AddMoney'
import SpendMoney from './pages/SpendMoney'
import EmergencySpend from './pages/EmergencySpend'
import Transactions from './pages/Transactions'
import SetLimit from './pages/SetLimit'
import './styles/global.css'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" />
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login"        element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register"     element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/dashboard"    element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/add-money"    element={<PrivateRoute><AddMoney /></PrivateRoute>} />
          <Route path="/spend"        element={<PrivateRoute><SpendMoney /></PrivateRoute>} />
          <Route path="/emergency"    element={<PrivateRoute><EmergencySpend /></PrivateRoute>} />
          <Route path="/transactions" element={<PrivateRoute><Transactions /></PrivateRoute>} />
          <Route path="/set-limit"    element={<PrivateRoute><SetLimit /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}