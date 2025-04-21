// src/firebasecomponent/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔑 Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAm6SsdOgphmr_5fbPWGQva8YTH0LUDwsw",
  authDomain: "rvaf-83b51.firebaseapp.com",
  projectId: "rvaf-83b51",
  storageBucket: "rvaf-83b51.firebasestorage.app",
  messagingSenderId: "167596798061",
  appId: "1:167596798061:web:1786e026de571d8daf8f64"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export required Firebase services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
