/* Firebase Messaging background service worker.
   FCM displays notification payloads while the page is in the background. */
importScripts("https://www.gstatic.com/firebasejs/13.3.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/13.3.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAey4K4hOcuBvZea__WGPqv5Tahm8OEPpNQ",
  authDomain: "aurix15-push-test-9e9fe.firebaseapp.com",
  projectId: "aurix15-push-test-9e9fe",
  storageBucket: "aurix15-push-test-9e9fe.firebasestorage.app",
  messagingSenderId: "831973947031",
  appId: "1:831973947031:web:a3d2bb33958d0a9d13dbd2"
});

firebase.messaging();