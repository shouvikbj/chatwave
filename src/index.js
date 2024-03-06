import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBus3bykjQCxq-iA5KB5afGRXTG16c7a4A",
  authDomain: "coding-ninjas-eef3e.firebaseapp.com",
  projectId: "coding-ninjas-eef3e",
  storageBucket: "coding-ninjas-eef3e.appspot.com",
  messagingSenderId: "658290960679",
  appId: "1:658290960679:web:9d4dfb61b630503a1e6102"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);
