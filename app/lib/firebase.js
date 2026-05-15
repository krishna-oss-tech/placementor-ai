const firebaseConfig = {
  apiKey: "AIzaSyBgQPk2-5DSyxGJX1lJfW6LsMtfWoNBRmI",
  authDomain: "placementor-ai-20122.firebaseapp.com",
  projectId: "placementor-ai-20122",
  storageBucket: "placementor-ai-20122.firebasestorage.app",
  messagingSenderId: "576903407397",
  appId: "1:576903407397:web:e70e6765029e4c7f885ccc"
};
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);