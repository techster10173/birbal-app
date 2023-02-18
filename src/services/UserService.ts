import { Preferences } from '@capacitor/preferences';
import api from './axios';

export const signUp = async (email: string, password: string) => {
  return api.put('/user/auth', {
    email,
    password,
  });
};

export const signIn = async (email: string, password: string) => {
  return api.post('/user/auth', {
    email,
    password,
  });
};

export const signOut = async () => {
  return Preferences.remove({ key: 'token' });
};
