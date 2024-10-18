// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDTpdiilmgu3-f3cAUkw8jmnwAYLBs6OEM',
  authDomain: 'templl-7d34a.firebaseapp.com',
  projectId: 'templl-7d34a',
  storageBucket: 'templl-7d34a.appspot.com',
  messagingSenderId: '916862173983',
  appId: '1:916862173983:web:204dc2ad4c08bbfce8662a',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
