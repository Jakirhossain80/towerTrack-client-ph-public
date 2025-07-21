// src/routes/UserRoute.jsx
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../utils/Loading";

const UserRoute = ({ children }) => {
  const { user, loading, userRole } = useContext(AuthContext);
  const location = useLocation();

  // 🔄 Show loading state while checking auth
  if (loading) return <Loading />;

  // ✅ Allow only users with "user" role
  if (user && userRole === "user") return children;

  // 🚫 Redirect unauthorized users to a fallback page
  return <Navigate to="/unauthorized" state={{ from: location }} replace />;
};

export default UserRoute;
