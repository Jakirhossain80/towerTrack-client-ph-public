// src/hooks/useUserRole.js
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "./axiosSecure";
import { AuthContext } from "../provider/AuthProvider";

const useUserRole = () => {
  const { user, loading } = useContext(AuthContext);

  const {
    data: roleData = null,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data; // { role: "admin" | "member" | "user" }
    },
    retry: false, // 🔒 Prevents auto-retry loop if 401
  });

  // Optional: Log if needed
  if (isError) {
    console.error("🔴 Role fetch error:", error?.message || error);
  }

  return { roleData, isLoading, isError };
};

export default useUserRole;

