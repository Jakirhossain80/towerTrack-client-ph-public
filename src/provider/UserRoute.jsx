// src/routes/UserRoute.jsx
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../hooks/axiosSecure";
import Loading from "../utils/Loading";

const UserRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  const { data: roleData, isLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data; // { role: "user" | "member" | "admin" }
    },
  });

  if (loading || isLoading) return <Loading />;

  if (!user || !user.email) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roleData?.role === "user") {
    return children;
  }

  return <Navigate to="/unauthorized" replace />;
};

export default UserRoute;
