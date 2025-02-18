import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Cambia esto si tu API está en otro dominio
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token a las peticiones
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { api };
