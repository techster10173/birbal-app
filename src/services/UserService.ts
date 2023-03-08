import { Preferences } from '@capacitor/preferences';
import api from './axios';

export const signUp = (email: string, password: string) => {
  return api.put('/user/auth', {
    email,
    password,
  });
};

export const signIn = (email: string, password: string) => {
  return api.post('/user/auth', {
    email,
    password,
  });
};

export const signOut = () => {
  return Preferences.remove({ key: 'token' });
};
