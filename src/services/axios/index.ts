import { Preferences } from '@capacitor/preferences';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3333' : 'https://birbal-backend.onrender.com',
});

api.interceptors.request.use(async config => {
  const { value } = await Preferences.get({
    key: 'token',
  });
  if (value) {
    config.headers.Authorization = `Bearer ${value}`;
  }
  return config;
});

export default api;