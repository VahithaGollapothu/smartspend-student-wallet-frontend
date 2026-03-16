import { Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

// Wraps protected pages — redirects to /login if not authenticated
export function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return null
  return user ? children : <Navigate to="/login" replace />
}

// Redirects logged-in users away from login/register
export function PublicRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return null
  return user ? <Navigate to="/dashboard" replace /> : children
}