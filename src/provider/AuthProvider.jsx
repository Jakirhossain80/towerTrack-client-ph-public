// src/provider/AuthProvider.jsx
import React, { createContext, useEffect, useState } from "react";
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
import axios from "axios";
import app from "../firebase.config";

// 🔐 Axios instance with credentials for HTTP-only cookie support
const axiosSecure = axios.create({
 baseURL: "https://tower-track-server.vercel.app",
  withCredentials: true,
});

// Create context
export const AuthContext = createContext();

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Firebase auth state listener with JWT sync and user DB creation
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      

      try {
        if (currentUser) {
          const idToken = await currentUser.getIdToken(true);

          console.log("🔥 Firebase ID Token:", idToken);


          // ✅ Exchange Firebase token for JWT (set HTTP-only cookie)
          await axiosSecure.post("/jwt", { token: idToken });


          // ✅ Check if user exists in DB
          const res = await axiosSecure.get(`/users/${currentUser.email}`).catch(() => null);

          if (!res?.data?.exists) {
            const userData = {
              email: currentUser.email,
              name: currentUser.displayName || "Unnamed",
              role: "user",
            };
            await axiosSecure.post("/users", userData);
          }
        } else {
          // ✅ Clear JWT on logout
          await axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, { withCredentials: true });
        }
      } catch (err) {
        console.error("❌ JWT or user handling error:", err);
      }
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
      await axiosSecure.post("/logout");
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

  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
