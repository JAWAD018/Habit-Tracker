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
  const [currentUser, setCurrentUser] = useState(null);
  const [loginMode, setLoginMode] = useState("login");
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });
    return () => unsub();
  }, []);

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
      setCredentials({ email: "", password: "" });
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

  // ✅ Already logged in → go to dashboard
  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

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
