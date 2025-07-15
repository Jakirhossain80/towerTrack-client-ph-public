// src/routes/UserRoute.jsx
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import useUserRole from "../hooks/useUserRole";
import Loading from "../utils/Loading";

const UserRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { role, isLoading } = useUserRole();
  const location = useLocation();

  // 🔄 Show loading state while checking auth or fetching role
  if (loading || isLoading) return <Loading />;

  // ✅ Allow only users with "user" role
  if (user && role === "user") return children;

  // 🚫 Redirect unauthorized users to a fallback page
  return <Navigate to="/unauthorized" state={{ from: location }} replace />;
};

export default UserRoute;


