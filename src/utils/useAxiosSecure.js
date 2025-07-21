// src/hooks/useAxiosSecure.jsx
import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import app from "../firebase.config";
import { AuthContext } from "../provider/AuthProvider";

const auth = getAuth(app);

// ─────────────── Secure Axios Instance ───────────────
const axiosSecure = axios.create({
  baseURL: "https://tower-track-server.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Request Interceptor — Add Firebase ID Token
    const reqId = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          const token = await user.getIdToken();
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // ✅ Response Interceptor — Auto Sign-out on 401/403
    const resId = axiosSecure.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
          signOut(auth).finally(() => navigate("/login"));
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqId);
      axiosSecure.interceptors.response.eject(resId);
    };
  }, [user, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
