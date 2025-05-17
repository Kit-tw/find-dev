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
  apiKey: process.env.VUE_APP_ApiKey,
  authDomain: process.env.VUE_APP_AuthDomain,
  projectId: process.env.VUE_APP_ProjectId,
  storageBucket: process.env.VUE_APP_StorageBucket,
  messagingSenderId: process.env.VUE_APP_MessagingSenderId,
  appId: process.env.VUE_APP_AppId,
  measurementId: process.env.VUE_APP_MeasurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
// const timestamp = firebase.Firestore.FieldValue.serverTimestamp;


export {auth,db,app}
