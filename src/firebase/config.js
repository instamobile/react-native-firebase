import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAOWHBpPhKoNhcGFKHH_Q_0AtL2gV-imgQ',
  authDomain: 'production-a9404.firebaseapp.com',
  databaseURL: 'https://production-a9404.firebaseio.com',
  projectId: 'production-a9404',
  storageBucket: 'production-a9404.appspot.com',
  messagingSenderId: '525472070731',
  appId: '1:525472070731:web:ee873bd62c0deb7eba61ce',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
