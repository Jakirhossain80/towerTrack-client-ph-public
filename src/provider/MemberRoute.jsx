// src/routes/MemberRoute.jsx
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import useUserRole from "../hooks/useUserRole";
import Loading from "../utils/Loading";

const MemberRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { role, isLoading } = useUserRole();
  const location = useLocation();

  // Show loading spinner while checking auth or role
  if (loading || isLoading) return <Loading />;

  // Allow access only if user is authenticated and has "member" role
  if (user && role === "member") return children;

  // Redirect to unauthorized page if not a member
  return <Navigate to="/unauthorized" state={{ from: location }} replace />;
};

export default MemberRoute;
