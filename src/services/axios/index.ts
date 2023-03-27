import axios from 'axios';
import getFirebaseAuth from '../firebase';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3333' : 'https://birbal-backend.onrender.com',
});

api.interceptors.request.use(async config => {
  const auth = getFirebaseAuth();
  const token = await auth.currentUser?.getIdToken(true)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;