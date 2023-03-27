import {
  signOut as signOutFirebase,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail as resetEmail,
  deleteUser,
} from 'firebase/auth';
import api from './axios';
import getAuth from './firebase';

export const signUp = async (email: string, password: string) => {
  await createUserWithEmailAndPassword(getAuth(), email, password);
  return api.put('/user/auth', {
    email,
  });
};

export const sendPasswordResetEmail = (email: string) => {
  return resetEmail(getAuth(), email);
};

export const signIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(getAuth(), email, password);
};

export const signOut = () => {
  return signOutFirebase(getAuth());
};

export const deleteAccount = async () => {
  await api.delete('/user');
  const auth = getAuth();
  return deleteUser(auth.currentUser!);
};
