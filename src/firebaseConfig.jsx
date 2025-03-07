// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCnIkncy-q62TxHHlM5ww6_4LIhN9iZzYg",
    authDomain: "nextgen-connect.firebaseapp.com",
    projectId: "nextgen-connect",
    storageBucket: "nextgen-connect.firebasestorage.app",
    messagingSenderId: "585398006924",
    appId: "1:585398006924:web:926f39cd5f6f65569db7a9",
    measurementId: "G-W1PZ8C084B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth, analytics };