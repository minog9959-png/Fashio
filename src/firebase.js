// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA43KvPi7n2u-swECtR-GbyZtJoii88Vio",
  authDomain: "fashio-4e3c4.firebaseapp.com",
  projectId: "fashio-4e3c4",
  storageBucket: "fashio-4e3c4.firebasestorage.app",
  messagingSenderId: "702597248549",
  appId: "1:702597248549:web:e5acc55069061600dc31cc",
  measurementId: "G-7L7L0R73Z5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;

