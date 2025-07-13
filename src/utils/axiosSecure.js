import axios from "axios";

// Create a secure Axios instance
const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  withCredentials: true, // Required to send HTTP-only cookies automatically
});

// Optional: Global response error logging (optional but useful)
axiosSecure.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios Secure Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosSecure;


