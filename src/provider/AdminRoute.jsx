// src/routes/AdminRoute.jsx
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import useUserRole from "../hooks/useUserRole";
import Loading from "../utils/Loading";

const AdminRoute = ({ children }) => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const { roleData, isLoading: roleLoading } = useUserRole();
  const location = useLocation();

  // ✅ While auth or role is loading, show loader
  if (authLoading || roleLoading) return <Loading />;

  // ✅ Still waiting for roleData? Render nothing until it's resolved
  if (!roleData) return null;

  // ✅ Allow only admin
  if (user && roleData?.role === "admin") {
    return children;
  }

  // ❌ Redirect to /unauthorized if not admin
  return <Navigate to="/unauthorized" state={{ from: location }} replace />;
};

export default AdminRoute;
