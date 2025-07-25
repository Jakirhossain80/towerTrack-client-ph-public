import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../hooks/axiosSecure";
import Loading from "../utils/Loading";

const UserOrMemberRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  const { data: roleData, isLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data; // expects { role: "user" | "member" | "admin" }
    },
  });

  if (loading || isLoading) return <Loading />;

  if (
    user &&
    (roleData?.role === "user" || roleData?.role === "member")
  ) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default UserOrMemberRoute;
