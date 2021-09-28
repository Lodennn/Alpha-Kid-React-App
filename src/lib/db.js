import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Initialize Cloud Firestore through Firebase
initializeApp({
  apiKey: "AIzaSyAGXrdQ9F8Kmt0GMxuqW2qpl-95Xc-ZBnE",
  authDomain: "alpha-kid.firebaseapp.com",
  databaseURL: "https://alpha-kid-default-rtdb.firebaseio.com",
  projectId: "alpha-kid",
  storageBucket: "alpha-kid.appspot.com",
  messagingSenderId: "1031746376042",
  appId: "1:1031746376042:web:2e6c9de409aa027f001513",
  measurementId: "G-T01HFSLNKK",
});

const db = getFirestore();

export default db;
