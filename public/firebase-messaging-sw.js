importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js");

firebase.initializeApp({
   apiKey: "AIzaSyDqzmJXYkhXmNQmXfInAhWKmVsFQEMgrFE",
  authDomain: "habits-tracker-2e0a5.firebaseapp.com",
  projectId: "habits-tracker-2e0a5",
  storageBucket: "habits-tracker-2e0a5.firebasestorage.app",
  messagingSenderId: "998120328732",
  appId: "1:998120328732:web:0e7ad06413a14f454f99d9",
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
