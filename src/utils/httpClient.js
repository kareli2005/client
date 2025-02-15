import axios from 'axios'

const httpClient = axios.create({
  // baseURL: 'https://together-server-py.onrender.com',
  baseURL: 'http://localhost:5000',

  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
})

httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default httpClient
