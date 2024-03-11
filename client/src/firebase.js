import { initializeApp } from "firebase/app";

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "mern-auth-1fa0c.firebaseapp.com",
  projectId: "mern-auth-1fa0c",
  storageBucket: "mern-auth-1fa0c.appspot.com",
  messagingSenderId: "904288557546",
  appId: "1:904288557546:web:bd4888149671bf75707a93",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
