// src/hooks/useUserRole.js
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";

// Basic Axios instance without JWT credentials
const axiosSecure = axios.create({
  baseURL: "https://tower-track-server.vercel.app",
});

const useUserRole = () => {
  const { user, loading } = useContext(AuthContext);

  const {
    data: role = null,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data.role;
    },
  });

  return { role, isLoading, isError };
};

export default useUserRole;
