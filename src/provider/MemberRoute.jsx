// src/routes/MemberRoute.jsx
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../utils/Loading";

const MemberRoute = ({ children }) => {
  const { user, loading, userRole } = useContext(AuthContext); // assumes userRole is provided by AuthProvider
  const location = useLocation();

  if (loading) return <Loading />;

  // ✅ Allow both "user" and "member" roles
  if (user && (userRole === "user" || userRole === "member")) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default MemberRoute;
