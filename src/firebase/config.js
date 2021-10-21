import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBYrr4ybNcEPK4ibf18ZLbCf8UlYr-Enno",
  authDomain: "myflock-1.firebaseapp.com",
  projectId: "myflock-1",
  storageBucket: "myflock-1.appspot.com",
  messagingSenderId: "1077454033359",
  appId: "1:1077454033359:web:eeb9fa9f96c6922c0c82ba",
  measurementId: "G-8VJQ81DEWM"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
