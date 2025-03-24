import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFaZh9gY4YkmxF_y8wp2ZJ2367KNDZEpE",
  authDomain: "smarttrace-209c9.firebaseapp.com",
  projectId: "smarttrace-209c9",
  storageBucket: "smarttrace-209c9.firebasestorage.app",
  messagingSenderId: "291360288319",
  appId: "1:291360288319:web:9bc5b7fd4c44996ff6528a",
  measurementId: "G-0H6QD84200",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

export { db, ref, onValue };
