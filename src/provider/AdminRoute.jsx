// src/routes/AdminRoute.jsx
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../utils/Loading";

const AdminRoute = ({ children }) => {
  const { user, loading, userRole } = useContext(AuthContext); // assumes userRole is provided by AuthProvider
  const location = useLocation();

  if (loading) return <Loading />;

  if (user && userRole === "admin") return children;

  return <Navigate to="/unauthorized" state={{ from: location }} replace />;
};

export default AdminRoute;
