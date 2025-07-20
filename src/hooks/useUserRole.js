// src/hooks/useUserRole.js
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://tower-track-server.vercel.app",
  withCredentials: true,
});

const useUserRole = () => {
  const { user } = useContext(AuthContext);

  const {
    data: role = null,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email, // Only run query if email is available
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data.role;
    },
  });

  return { role, isLoading, isError };
};

export default useUserRole;
