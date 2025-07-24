// src/hooks/axiosSecure.js
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://tower-track-server.vercel.app", // match your API
  withCredentials: true, // 🚨 send cookies
});

// Optional global error handler
axiosSecure.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 || err.response?.status === 403) {
      // Optional: redirect to login
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default axiosSecure;


