// src/hooks/useUserRole.js
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://tower-track-server.vercel.app",
});

const useUserRole = () => {
  const { user, loading } = useContext(AuthContext);

  const {
    data: roleData = null,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !loading && !!user?.email, // Prevents query when email is not ready
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data;
    },
  });

  return { roleData, isLoading, isError };
};

export default useUserRole;
