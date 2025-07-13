import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import axios from "axios";
import app from "../firebase.config";

// 🔐 Axios instance to communicate with backend JWT endpoints
const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  withCredentials: true, // Important for sending/receiving cookies
});

// Create the context
export const AuthContext = createContext();

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Firebase Auth State Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // 🔐 Send Firebase ID token to backend to get JWT in HTTP-only cookie
        const idToken = await currentUser.getIdToken();
        try {
          await axiosSecure.post("/jwt", { token: idToken });
        } catch (error) {
          console.error("Failed to set JWT cookie:", error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Signup
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Email/Password Login
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Login
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // 🔐 Logout (client + backend)
  const logout = async () => {
    setLoading(true);
    try {
      await axiosSecure.post("/logout"); // clears HTTP-only cookie
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const authData = {
    user,
    loading,
    createUser,
    signIn,
    googleLogin,
    logout,
    setLoading,
  };

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
