
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbtpK4HYaaorQ2vaJq8s8Kk_vSxw_6fis",
  authDomain: "gettutorly.firebaseapp.com",
  projectId: "gettutorly",
  storageBucket: "gettutorly.appspot.com",
  messagingSenderId: "240379067662",
  appId: "1:240379067662:web:941dc77def55c03be3ab5f",
  measurementId: "G-MF9XX03TS0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only in browser environment
let analytics = null;
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.error("Analytics initialization failed:", error);
  }
}

export { app, analytics };
