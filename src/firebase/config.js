import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAOWHBpPhKoNhcGFKHH_Q_0AtL2gV-imgQ',
  authDomain: 'production-a9404.firebaseapp.com',
  databaseURL: 'https://production-a9404.firebaseio.com',
  projectId: 'production-a9404',
  storageBucket: 'production-a9404.appspot.com',
  messagingSenderId: '525472070731',
  appId: '1:525472070731:web:ee873bd62c0deb7eba61ce',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);

export { app, auth, db };