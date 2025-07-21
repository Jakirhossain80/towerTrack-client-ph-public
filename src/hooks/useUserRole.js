// src/hooks/useUserRole.js
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://tower-track-server.vercel.app",
  withCredentials: true,
});

const useUserRole = () => {
  const { user, loading } = useContext(AuthContext); // ✅ Updated to include loading

  const {
    data: role = null,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !loading && !!user?.email, // ✅ Prevent query from firing too early
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data.role;
    },
  });

  return { role, isLoading, isError };
};

export default useUserRole;
