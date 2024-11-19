import axios from 'axios'
import router from '../router'

const URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const instance = axios.create({
  baseURL: URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    } else {
      router.push('/auth/sign-in')
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance
