// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {Firestore, getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0EKJsbt6ArRlG4z6L4kVBKOnr7bjMjic",
  authDomain: "find-dev-4364d.firebaseapp.com",
  projectId: "find-dev-4364d",
  storageBucket: "find-dev-4364d.appspot.com",
  messagingSenderId: "51151729224",
  appId: "1:51151729224:web:28baec0e8ea43508575e7d",
  measurementId: "G-N9H0186802"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
// const timestamp = firebase.Firestore.FieldValue.serverTimestamp;


export {auth,db,app}
