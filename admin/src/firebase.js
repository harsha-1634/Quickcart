// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWRIlBQ3LOUefPXheuJAhKazRh012eNdA",
  authDomain: "shop-aac9b.firebaseapp.com",
  projectId: "shop-aac9b",
  storageBucket: "shop-aac9b.appspot.com",
  messagingSenderId: "614068300752",
  appId: "1:614068300752:web:f2c9f1f0af3ec0bf3027d5",
  measurementId: "G-992158TH5G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;