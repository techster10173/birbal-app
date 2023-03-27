// Your web app's Firebase configuration
import { initializeApp } from "firebase/app";
import { getAuth, indexedDBLocalPersistence, initializeAuth } from "firebase/auth";
import { Capacitor } from "@capacitor/core";

const firebaseConfig = {
    apiKey: "AIzaSyBD_0wzbK40TsVFUJcTRl7H2FeEaP04Mm8",
    authDomain: "birbal-app.firebaseapp.com",
    projectId: "birbal-app",
    storageBucket: "birbal-app.appspot.com",
    messagingSenderId: "688908186725",
    appId: "1:688908186725:web:195f3ab91e8bc78e10428c"
};

const app = initializeApp(firebaseConfig);
  
  // Initialize Firebase
const getFirebaseAuth = () => {
  if (Capacitor.isNativePlatform()) {
    return initializeAuth(app, {
      persistence: indexedDBLocalPersistence
    });
  } else {
    return getAuth();
  }
};

export default getFirebaseAuth;