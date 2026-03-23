import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token     = localStorage.getItem('ss_token')
    const studentId = localStorage.getItem('ss_studentId')
    const name      = localStorage.getItem('ss_name')
    const email     = localStorage.getItem('ss_email')
    if (token && studentId) {
      setUser({ token, studentId: Number(studentId), name, email })
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (email, password) => {
    const res  = await api.post('/auth/login', { email, password })
    const data = res.data
    localStorage.setItem('ss_token',     data.token)
    localStorage.setItem('ss_studentId', String(data.studentId))
    localStorage.setItem('ss_name',      data.name)
    localStorage.setItem('ss_email',     data.email)
    setUser({
      token:     data.token,
      studentId: data.studentId,
      name:      data.name,
      email:     data.email
    })
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
    localStorage.setItem('ss_token',     data.token)
    localStorage.setItem('ss_studentId', String(data.studentId))
    localStorage.setItem('ss_name',      data.name)
    localStorage.setItem('ss_email',     data.email)
    setUser({
      token:     data.token,
      studentId: data.studentId,
      name:      data.name,
      email:     data.email
    })
    return data
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('ss_token')
    localStorage.removeItem('ss_studentId')
    localStorage.removeItem('ss_name')
    localStorage.removeItem('ss_email')
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)