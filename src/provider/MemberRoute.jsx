import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../provider/AuthProvider";
import axiosSecure from "../hooks/axiosSecure";
import Loading from "../utils/Loading";

const MemberRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  const { data: roleData, isLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/role/${user.email}`
      );
      return res.data;
    },
  });

  if (loading || isLoading) return <Loading />;

  if (!user || !user.email) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Allow access if role is either 'member' or 'user'
  if (roleData?.role !== "member" && roleData?.role !== "user") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default MemberRoute;
