import axios from 'axios'

const api = axios.create({
  baseURL: 'https://smartspend-student-wallet-backend.onrender.com/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 60000
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
}, error => Promise.reject(error))

api.interceptors.response.use(
  res => res,
  err => {
    console.error('API Error:', err.response?.status, err.response?.data)
    return Promise.reject(err)
  }
)

export default api