// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAb25TXHiklBsL1bH4Syvx2W1du5aRKVs",
  authDomain: "blogging-app-738e1.firebaseapp.com",
  projectId: "blogging-app-738e1",
  storageBucket: "blogging-app-738e1.appspot.com",
  messagingSenderId: "308880680702",
  appId: "1:308880680702:web:73bd50e04c02f5b66227af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);