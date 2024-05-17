// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration

console.log(import.meta.env.VITE_API_KEY)
const firebaseConfig = {
    // String(import.meta.env.VITE_APPWRITE_URL)
  apiKey: String(import.meta.env.VITE_API_KEY),
  authDomain: String(import.meta.env.VITE_AUTH_DOMAIN),
  projectId: String(import.meta.env.VITE_PROJECT_ID),
  storageBucket: String(import.meta.env.VITE_STORAGE_BUCKET),
  messagingSenderId: String(import.meta.env.VITE_MESSAGE_SENDER_ID),
  appId: String(import.meta.env.VITE_APP_ID)
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)