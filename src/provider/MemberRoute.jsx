// src/routes/MemberRoute.jsx
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../utils/Loading";
import useUserRole from "../hooks/useUserRole";

const MemberRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { role, isLoading } = useUserRole();
  const location = useLocation();

  if (loading || isLoading) {
    return <Loading />;
  }

  // ✅ Allow both "user" and "member" roles
  if (user && (role === "user" || role === "member")) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default MemberRoute;
