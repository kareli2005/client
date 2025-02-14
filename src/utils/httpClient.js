import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'https://together-server-py.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
})

export default httpClient
