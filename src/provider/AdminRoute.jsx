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

  // ✅ Wait for Firebase Auth or role loading
  if (loading || isLoading) {
    return <Loading />;
  }

  // ✅ While roleData is not yet resolved (null), prevent premature redirect
  if (!roleData) {
    return null;
  }

  // ✅ If user is admin, allow access
  if (user && roleData?.role === "admin") {
    return children;
  }

  // ❌ Otherwise redirect to /unauthorized
  return <Navigate to="/unauthorized" state={{ from: location }} replace />;
};

export default AdminRoute;
