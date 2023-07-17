// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIbesJaEJRSm2D3sQ4fQSkpEal3aTz8N0",
  authDomain: "tbd-coderelay.firebaseapp.com",
  projectId: "tbd-coderelay",
  storageBucket: "tbd-coderelay.appspot.com",
  messagingSenderId: "853747905468",
  appId: "1:853747905468:web:4c25b9256f4b6f722571b9",
  measurementId: "G-KGESJ3KEGM",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app
