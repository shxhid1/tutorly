
// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbtpK4HYaaorQ2vaJq8s8Kk_vSxw_6fis",
  authDomain: "gettutorly.firebaseapp.com",
  projectId: "gettutorly",
  storageBucket: "gettutorly.appspot.com",
  messagingSenderId: "240379067662",
  appId: "1:240379067662:web:941dc77def55c03be3ab5f",
  measurementId: "G-MF9XX03TS0",
  databaseURL: "https://gettutorly-default-rtdb.firebaseio.com" // Add this for Realtime Database
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const rtdb = getDatabase(app);
const storage = getStorage(app);
const functions = getFunctions(app);

// Initialize Analytics only in browser environment with proper checks
let analytics = null;
const initAnalytics = async () => {
  if (typeof window !== 'undefined') {
    try {
      // Check if analytics is supported in this browser environment
      const isAnalyticsSupported = await isSupported();
      if (isAnalyticsSupported) {
        analytics = getAnalytics(app);
        console.log("Firebase Analytics initialized successfully");
      } else {
        console.log("Firebase Analytics is not supported in this environment");
      }
    } catch (error) {
      console.error("Analytics initialization failed:", error);
    }
  }
};

// Initialize analytics
initAnalytics();

export { app, auth, db, rtdb, storage, functions, analytics };
