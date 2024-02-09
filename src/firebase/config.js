// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app);

export { app , auth, db }