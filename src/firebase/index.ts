// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJ1LjEeOJvX_riUFXGLUbhRE-rTSzlGLI",
  authDomain: "vue3-chat-app-3773d.firebaseapp.com",
  projectId: "vue3-chat-app-3773d",
  storageBucket: "vue3-chat-app-3773d.appspot.com",
  messagingSenderId: "841195739273",
  appId: "1:841195739273:web:afc17daabecd7bbe4e0e58",
  measurementId: "G-XHMB1FXTNE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export { app, auth, db, storage };
