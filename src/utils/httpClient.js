import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'https://together-server-py.onrender.com',
  // baseURL: 'http://localhost:5000',

  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
})

export default httpClient
