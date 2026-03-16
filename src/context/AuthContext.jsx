import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token     = localStorage.getItem('token')
    const studentId = localStorage.getItem('studentId')
    const name      = localStorage.getItem('name')
    const email     = localStorage.getItem('email')
    if (token && studentId) {
      setUser({ token, studentId: Number(studentId), name, email })
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (email, password) => {
    const res  = await api.post('/auth/login', { email, password })
    const data = res.data
    localStorage.setItem('token',     data.token)
    localStorage.setItem('studentId', String(data.studentId))
    localStorage.setItem('name',      data.name)
    localStorage.setItem('email',     data.email)
    setUser({ token: data.token, studentId: data.studentId, name: data.name, email: data.email })
    return data
  }, [])

  const register = useCallback(async (form) => {
    const res  = await api.post('/auth/register', {
      name:      form.name,
      email:     form.email,
      password:  form.password,
      studentId: form.studentId
    })
    const data = res.data
    localStorage.setItem('token',     data.token)
    localStorage.setItem('studentId', String(data.studentId))
    localStorage.setItem('name',      data.name)
    localStorage.setItem('email',     data.email)
    setUser({ token: data.token, studentId: data.studentId, name: data.name, email: data.email })
    return data
  }, [])

  const logout = useCallback(() => {
    localStorage.clear()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)