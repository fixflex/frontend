import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCNFR3HNLO9L-1446WfFiYAlw0WNz3QVVQ',
  authDomain: 'fixflex-63e56.firebaseapp.com',
  projectId: 'fixflex-63e56',
  storageBucket: 'fixflex-63e56.appspot.com',
  messagingSenderId: '154130007067',
  appId: '1:154130007067:web:ac094a7e67dd15d29b24be',
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
