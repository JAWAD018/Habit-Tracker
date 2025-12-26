importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCi1XOZyoVMn1RZPc_hCGv31KROYHqgSKc",
  authDomain: "restro-31c40.firebaseapp.com",
  projectId: "restro-31c40",
  storageBucket: "restro-31c40.firebasestorage.app",
  messagingSenderId: "186809340089",
  appId: "1:186809340089:web:8b944f161696eecb4c8b68"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Background message received:", payload);

  self.registration.showNotification(
    payload.notification.title,
    {
      body: payload.notification.body,
      icon: "/icon-192.png"
    }
  );
});
