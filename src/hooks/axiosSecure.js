// src/hooks/axiosSecure.js
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`, // match your API
  withCredentials: true, // 🚨 send cookies
});

// Optional global error handler
axiosSecure.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 || err.response?.status === 403) {
      // Optional: redirect to login
      window.location.href = "/";
    }
    return Promise.reject(err);
  }
);

export default axiosSecure;


