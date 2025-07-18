// src/hooks/useAxiosSecure.jsx
import axios              from "axios";
import { useContext, useEffect } from "react";
import { useNavigate }    from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import app                from "../firebase.config";
import { AuthContext }    from "../provider/AuthProvider";   // ✅ grab current user

const auth = getAuth(app);

/* ───────────────────────────── secure instance ─────────────────────────── */
const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { user }  = useContext(AuthContext);                // ✅ logged-in user
  const navigate   = useNavigate();

  useEffect(() => {
    /* ---------- request interceptor: attach Firebase ID token ---------- */
    const reqId = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          const token = await user.getIdToken();            // fresh JWT
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    /* ---------- response interceptor: handle auth errors ---------- */
    const resId = axiosSecure.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
          signOut(auth).finally(() => navigate("/login"));
        }
        return Promise.reject(err);
      }
    );

    /* eject interceptors on unmount */
    return () => {
      axiosSecure.interceptors.request.eject(reqId);
      axiosSecure.interceptors.response.eject(resId);
    };
  }, [user, navigate]);

  return axiosSecure;                                       // ✅ expose instance
};

export default useAxiosSecure;



