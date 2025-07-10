import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../utils/Loading";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const location = useLocation();

  const {
    data: roleData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/users/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (loading || isLoading) return <Loading />;

  // ✅ Allow super admin by email OR anyone with admin role
  const isSuperAdmin = user?.email === "jakir.devbd@gmail.com";
  const isAdmin = roleData?.role === "admin";

  if (user && (isAdmin || isSuperAdmin)) return children;

  if (isError || (!isAdmin && !isSuperAdmin)) {
    Swal.fire("Access Denied", "Admins Only", "error");
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }
};

export default AdminRoute;
