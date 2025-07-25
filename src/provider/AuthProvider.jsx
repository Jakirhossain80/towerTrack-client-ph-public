// src/provider/AuthProvider.jsx
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import app from "../firebase.config";

// Create context
export const AuthContext = createContext();

const issueToken = async (user) => {
  if (user?.email) {
    await axios.post(
      "https://tower-track-server.vercel.app/jwt",
      { email: user.email },
      { withCredentials: true } // send cookie
    );
  }
};

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Firebase auth state listener (no JWT logic)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      setUser(currentUser);
      // ✅ Issue JWT token via HTTP-only cookie
      if (currentUser) {
        await issueToken(currentUser);
      }

       setTimeout(() => setLoading(false), 100);
    });

    return () => unsubscribe();
  }, []);

  const createUser = async (email, password, name) => {
    setLoading(true);
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: name });
    return result;
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth); // Firebase sign-out
      await axios.post(
        "https://tower-track-server.vercel.app/logout",
        {},
        { withCredentials: true } // send cookie for clearing
      );
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
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
