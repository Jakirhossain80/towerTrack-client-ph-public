// src/hooks/useUserRole.js
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "./axiosSecure"; // ✅ Uses shared secure axios instance
import { AuthContext } from "../provider/AuthProvider";

const useUserRole = () => {
  const { user, loading } = useContext(AuthContext);

  const { data: roleData, isLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email && !loading, // Only run when user is ready
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data; // { role: "user" | "member" | "admin" }
    },
  });

  return { roleData, isLoading };
};

export default useUserRole;
