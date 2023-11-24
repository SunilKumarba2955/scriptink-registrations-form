// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATQaBFz54TGYKmbPYSdzW49SoB-xKO4MI",
  authDomain: "scriptink-2k23.firebaseapp.com",
  databaseURL: "https://scriptink-2k23-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "scriptink-2k23",
  storageBucket: "scriptink-2k23.appspot.com",
  messagingSenderId: "1094274895677",
  appId: "1:1094274895677:web:91139ba5e6544e22a4ff54",
  measurementId: "G-5PDLYQ73FD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);