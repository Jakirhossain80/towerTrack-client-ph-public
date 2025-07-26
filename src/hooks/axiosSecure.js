// src/hooks/axiosSecure.js
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`, // 📦 API from .env
  withCredentials: true, // 🚨 Send cookies (for JWT)
});

// 🛡️ Optional global response error handler
axiosSecure.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 || err.response?.status === 403) {
      console.warn("🔒 Auth error:", err?.response?.data?.message || err.message);
      // ❗ Avoid redirecting here. Use route-level guards for navigation.
      // Optionally show toast, modal, or custom error UI.
    }
    return Promise.reject(err);
  }
);

export default axiosSecure;
