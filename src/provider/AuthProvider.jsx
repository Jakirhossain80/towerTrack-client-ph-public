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

// 🔐 Axios instance with credentials for HTTP-only cookie support
const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  withCredentials: true,
});

// Create context
export const AuthContext = createContext();

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Firebase auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        try {
          const idToken = await currentUser.getIdToken(true);

          // 🔐 Send Firebase token to backend to get JWT cookie
          await axiosSecure.post("/jwt", { token: idToken });

          // 🧩 Check if user already exists in DB
          const checkRes = await axiosSecure.get(`/users/${currentUser.email}`).catch(() => null);

          if (!checkRes?.data?.exists) {
            // ✅ Insert user if not exists
            const userData = {
              email: currentUser.email,
              name: currentUser.displayName || "Unnamed",
              role: "user",
            };

            await axiosSecure.post("/users", userData);
            console.log("✅ User created in DB");
          } else {
            console.log("⚠️ User already exists, skipping DB insert");
          }
        } catch (error) {
          console.error("❌ JWT exchange or user handling failed:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Register
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login with email/password
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Login with Google
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Logout from both client and backend
  const logout = async () => {
    setLoading(true);
    try {
      await axiosSecure.post("/logout"); // clears HTTP-only cookie
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
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
