// src/pages/dashboard/AdminProfile.jsx
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../utils/useAxiosSecure";
import Loading from "../../utils/Loading";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaUserShield,
  FaEnvelope,
  FaBuilding,
  FaUsers,
  FaDoorOpen,
  FaClipboardCheck,
} from "react-icons/fa";

const AdminProfile = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // ✅ Get user role (merged snippet)
  const { data: roleData, isLoading: loadingRole } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data;
    },
  });

  // Fetch apartments
  const {
    data: apartments = [],
    isLoading: loadingApartments,
  } = useQuery({
    queryKey: ["apartments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/apartments");
      return res.data;
    },
  });

  // Fetch agreements
  const {
    data: agreements = [],
    isLoading: loadingAgreements,
  } = useQuery({
    queryKey: ["agreements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/agreements");
      return res.data;
    },
  });

  // Fetch all users
  const {
    data: users = [],
    isLoading: loadingUsers,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  if (loading || loadingRole || loadingApartments || loadingAgreements || loadingUsers) {
    return <Loading />;
  }

  const totalApartments = apartments.length;
  const totalAgreements = agreements.length;
  const totalUsers = users.length;
  const totalMembers = users.filter((u) => u.role === "member").length;

  const availablePercentage = totalApartments
    ? (((totalApartments - totalAgreements) / totalApartments) * 100).toFixed(1)
    : "0";

  const occupiedPercentage = totalApartments
    ? ((totalAgreements / totalApartments) * 100).toFixed(1)
    : "0";

  return (
    <div
      className="max-w-4xl mx-auto px-4 py-10 bg-gray-50 dark:bg-gray-900 rounded-xl shadow transition-all duration-500"
      data-aos="fade-up"
    >
      <h2 className="text-3xl font-semibold font-poppins text-center mb-8 text-gray-800 dark:text-gray-200">
        Admin Profile
      </h2>

      <div
        className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md flex flex-col sm:flex-row items-center gap-6 transition-all duration-500"
        data-aos="zoom-in"
      >
        <img
          src={user?.photoURL || "https://i.ibb.co/0jqHpnp/default-user.png"}
          alt="Admin Avatar"
          className="w-32 h-32 rounded-full object-cover border-4 border-lime-500"
        />

        <div className="flex-1 space-y-3 font-inter text-gray-800 dark:text-gray-200">
          <div className="flex items-center gap-2">
            <FaUserShield className="text-emerald-500" />
            <span>
              <strong>Name:</strong> {user?.displayName || "N/A"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-emerald-500" />
            <span>
              <strong>Email:</strong> {user?.email || "N/A"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaUserShield className="text-emerald-500" />
            <span>
              <strong>Role:</strong> {roleData?.role || "N/A"}
            </span>
          </div>

          <hr className="my-4 border-gray-300 dark:border-gray-700" />

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <FaBuilding className="text-lime-600" />
              <span>
                <strong>Total Rooms:</strong> {totalApartments}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaDoorOpen className="text-lime-600" />
              <span>
                <strong>Available Rooms (%):</strong> {availablePercentage}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaClipboardCheck className="text-lime-600" />
              <span>
                <strong>Occupied Rooms (%):</strong> {occupiedPercentage}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaUsers className="text-lime-600" />
              <span>
                <strong>Total Users:</strong> {totalUsers}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaUsers className="text-lime-600" />
              <span>
                <strong>Total Members:</strong> {totalMembers}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
