import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import Loading from "../utils/Loading";

const UserOrMemberRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  const { data: roleData, isLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axios.get(
        `https://tower-track-server.vercel.app/users/role/${user.email}`
      );
      return res.data;
    },
  });

  if (loading || isLoading) return <Loading />;

  if (!user || !user.email) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roleData?.role === "user" || roleData?.role === "member") {
    return children;
  }

  return <Navigate to="/unauthorized" replace />;
};

export default UserOrMemberRoute;
