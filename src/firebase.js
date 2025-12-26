import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging/sw";
// import { getMessaging } from "firebase/messaging";


const firebaseConfig = {
  apiKey: "AIzaSyCi1XOZyoVMn1RZPc_hCGv31KROYHqgSKc",
  authDomain: "restro-31c40.firebaseapp.com",
  projectId: "restro-31c40",
  storageBucket: "restro-31c40.firebasestorage.app",
  messagingSenderId: "186809340089",
  appId: "1:186809340089:web:8b944f161696eecb4c8b68"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const messaging = getMessaging(app);