// src/routes/AllRolesRoute.jsx
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../hooks/axiosSecure";
import Loading from "../utils/Loading";


const AllRolesRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // Fetch the current user's role (same pattern as your sample)
  const { data: roleData, isLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      // Server in your project already defaults to "user" when no role is found
      return res.data; // { role: "user" | "member" | "admin" }
    },
  });

  if (loading || isLoading) return <Loading />;

  // Allow access to any authenticated role
  const role = roleData?.role ?? "user";
  const allowedRoles = ["user", "member", "admin"];

  if (user && allowedRoles.includes(role)) {
    return children;
  }

  // Not authenticated -> go to login
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AllRolesRoute;
