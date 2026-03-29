import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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

const app = initializeApp(firebaseConfig);
const db = getDatabase();

// 🔹 Reference the location where Arduino pushed data
const dataRef = ref(db, "/");  // If you pushed to root
// If you pushed to "/tests", use: ref(db, "/tests");
/*
// Listen for changes
const data = snapshot.val();
console.log("Full data:", data);

if (data) {
  const keys = Object.keys(data);
  const lastKey = keys[keys.length - 1];   // get newest test
  const latest = data[lastKey];

  document.getElementById("sex").innerText = latest.sex;
  document.getElementById("pregnant").innerText = latest.pregnant;
  document.getElementById("lactating").innerText = latest.lactating;
  document.getElementById("iodineConcentration").innerText = latest.iodineConcentration;
  document.getElementById("iodineLevel").innerText = latest.iodineLevel;
}

*/

onValue(dataRef, (snapshot) => {

    const data = snapshot.val();
    console.log("Full data:", data);
  
    if (!data) return;
  
    const keys = Object.keys(data);
    const lastKey = keys[keys.length - 1];   // get newest test
    const latest = data[lastKey];
  
    document.getElementById("sex").innerText = latest.sex;
    document.getElementById("pregnant").innerText = latest.pregnant;
    document.getElementById("lactating").innerText = latest.lactating;
    document.getElementById("iodineConcentration").innerText = latest.iodineConcentration;
    document.getElementById("iodineLevel").innerText = latest.iodineLevel;
  
  });