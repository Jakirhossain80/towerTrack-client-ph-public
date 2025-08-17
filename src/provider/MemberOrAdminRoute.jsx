// src/routes/MemberOrAdminRoute.jsx
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../provider/AuthProvider";
import axiosSecure from "../hooks/axiosSecure";
import Loading from "../utils/Loading";

const MemberOrAdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  const { data: roleData, isLoading, isError } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/role/${user.email}`);
      return data; // { role: "user" | "member" | "admin" }
    },
    staleTime: 5 * 60 * 1000, // small perf win
  });

  if (loading || isLoading) return <Loading />;

  // If no user or role fetch failed, bounce to login
  if (!user || isError) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roleData?.role === "member" || roleData?.role === "admin") {
    return children;
  }

  // Not authorized -> send to login (or a 403 page if you have one)
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default MemberOrAdminRoute;
