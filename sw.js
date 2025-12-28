  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCSrwo7nOGDNhc_8saPZsztWIj1Slvqd_E",
    authDomain: "login-lrsac.firebaseapp.com",
    projectId: "login-lrsac",
    storageBucket: "login-lrsac.firebasestorage.app",
    messagingSenderId: "1010022369196",
    appId: "1:1010022369196:web:2dae7503a956b2adde1c09",
    measurementId: "G-HWFGGMJ905"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
