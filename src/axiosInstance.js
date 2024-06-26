import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const idRol = localStorage.getItem('role');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (idRol) {
    config.headers['id_rol'] = idRol;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
