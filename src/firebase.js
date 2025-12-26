import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging/sw";
// import { getMessaging } from "firebase/messaging";


const firebaseConfig = {
  apiKey: "AIzaSyDqzmJXYkhXmNQmXfInAhWKmVsFQEMgrFE",
  authDomain: "habits-tracker-2e0a5.firebaseapp.com",
  projectId: "habits-tracker-2e0a5",
  storageBucket: "habits-tracker-2e0a5.firebasestorage.app",
  messagingSenderId: "998120328732",
  appId: "1:998120328732:web:0e7ad06413a14f454f99d9",
  measurementId: "G-8YL1YBCKS2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const messaging = getMessaging(app);