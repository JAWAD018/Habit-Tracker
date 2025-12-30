import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged
} from "firebase/auth";
import { Navigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import AuthCard from "../components/Auth/AuthCard";

const Login = () => {
  const [currentUser, setCurrentUser] = useState(undefined); // 🔑 IMPORTANT
  const [loginMode, setLoginMode] = useState("login");
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      setCurrentUser(user ?? null);
    });
    return () => unsub();
  }, []);

  // ⛔ DO NOT render anything until Firebase responds
  if (currentUser === undefined) {
    return null; // or full-screen loader
  }

  // ✅ Already logged in → dashboard (NO flicker)
  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleAuth = async () => {
    try {
      if (loginMode === "signup") {
        await createUserWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password
        );
      } else {
        await signInWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password
        );
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <AuthCard
      loginMode={loginMode}
      setLoginMode={setLoginMode}
      credentials={credentials}
      setCredentials={setCredentials}
      onAuth={handleAuth}
      onGoogle={handleGoogleLogin}
    />
  );
};

export default Login;
