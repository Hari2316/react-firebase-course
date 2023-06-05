import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyC7Emen-rF0s4LCDhYvTlwZdtn8RdbN8yE",
  authDomain: "fir-course-aed8f.firebaseapp.com",
  projectId: "fir-course-aed8f",
  storageBucket: "fir-course-aed8f.appspot.com",
  messagingSenderId: "828662314339",
  appId: "1:828662314339:web:1916d1c85e8cc0d01c4f56",
  measurementId: "G-6W054200XX"
};
 

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app)

export const storage = getStorage(app)