// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYDIaHfAn_V9CWnvWZA28N0TASSDwnSCM",
  authDomain: "realtor-site-5c6a7.firebaseapp.com",
  projectId: "realtor-site-5c6a7",
  storageBucket: "realtor-site-5c6a7.appspot.com",    
  messagingSenderId: "873888482179",
  appId: "1:873888482179:web:e0077251922f6597722cb6",
  measurementId: "G-M90XXZ71C3",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
// const analytics = getAnalytics(app);
