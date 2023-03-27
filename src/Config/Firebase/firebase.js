// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDt7ytqBc6-i3izCW4EtZZ-EZVGlAEazNo',
  authDomain: 'react-blog-e6cb5.firebaseapp.com',
  databaseURL:
    'https://react-blog-e6cb5-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'react-blog-e6cb5',
  storageBucket: 'react-blog-e6cb5.appspot.com',
  messagingSenderId: '339459286790',
  appId: '1:339459286790:web:c240e2e87b17171f34e087',
};

// Initialize Firebase
const fire = initializeApp(firebaseConfig);

export default fire;
