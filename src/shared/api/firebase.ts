// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDEVS3fyjltLzIZu6cfvHITkhehDK4F94k",
    authDomain: "movie-db-6d636.firebaseapp.com",
    projectId: "movie-db-6d636",
    storageBucket: "movie-db-6d636.firebasestorage.app",
    messagingSenderId: "383411208337",
    appId: "1:383411208337:web:666156e51908698ec43f30",
    // measurementId: "G-9WEF0GEN8P"
};

// Initialize Firebase
// Защита от повторной инициализации при перезагрузке модулей в Next.js
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();