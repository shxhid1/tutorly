// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbtpK4HYaaorQ2vaJq8s8Kk_vSxw_6fis",
  authDomain: "gettutorly.firebaseapp.com",
  databaseURL: "https://gettutorly-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gettutorly",
  storageBucket: "gettutorly.firebasestorage.app",
  messagingSenderId: "240379067662",
  appId: "1:240379067662:web:941dc77def55c03be3ab5f",
  measurementId: "G-MF9XX03TS0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
