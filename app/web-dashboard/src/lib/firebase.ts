// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7oG6MycZ-AVWZag5xKl4zoBkLi9pUwOg",
  authDomain: "esp32-iodetect.firebaseapp.com",
  databaseURL: "https://esp32-iodetect-default-rtdb.firebaseio.com",
  projectId: "esp32-iodetect",
  storageBucket: "esp32-iodetect.firebasestorage.app",
  messagingSenderId: "103449406740",
  appId: "1:103449406740:web:e4bb5ea05894d71f7da601",
  measurementId: "G-NEWQ82FJE4"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);