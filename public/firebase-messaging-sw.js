importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyA43KvPi7n2u-swECtR-GbyZtJoii88Vio",
  authDomain: "fashio-4e3c4.firebaseapp.com",
  projectId: "fashio-4e3c4",
  storageBucket: "fashio-4e3c4.firebasestorage.app",
  messagingSenderId: "702597248549",
  appId: "1:702597248549:web:e5acc55069061600dc31cc",
});

const messaging = firebase.messaging();