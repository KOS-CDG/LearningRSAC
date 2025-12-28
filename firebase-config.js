// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Your web app's Firebase configuration
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

// Export the 'auth' variable so index.html can use it
export const auth = getAuth(app);
