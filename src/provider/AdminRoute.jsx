// src/routes/AdminRoute.jsx
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import useUserRole from "../hooks/useUserRole";
import Loading from "../utils/Loading";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { roleData, isLoading } = useUserRole();
  const location = useLocation();

  // Wait for both Firebase and role info
  if (loading || isLoading) return <Loading />;

  if (user && roleData?.role === "admin") {
    return children;
  }

  // Redirect unauthorized users
  return <Navigate to="/unauthorized" state={{ from: location }} replace />;
};

export default AdminRoute;
