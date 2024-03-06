import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBus3bykjQCxq-iA5KB5afGRXTG16c7a4A",
  authDomain: "coding-ninjas-eef3e.firebaseapp.com",
  projectId: "coding-ninjas-eef3e",
  storageBucket: "coding-ninjas-eef3e.appspot.com",
  messagingSenderId: "658290960679",
  appId: "1:658290960679:web:9d4dfb61b630503a1e6102"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
