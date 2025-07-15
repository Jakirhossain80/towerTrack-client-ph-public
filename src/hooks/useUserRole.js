// src/hooks/useUserRole.js
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../utils/axiosSecure";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const useUserRole = () => {
  const { user } = useContext(AuthContext);

  const { data: role, isLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data.role;
    },
  });

  return { role, isLoading };
};

export default useUserRole;
