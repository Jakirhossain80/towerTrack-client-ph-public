// src/pages/dashboard/MyProfile.jsx
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../utils/useAxiosSecure";
import Loading from "../../utils/Loading";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaUser,
  FaEnvelope,
  FaRegBuilding,
  FaDollarSign,
  FaCalendarCheck,
} from "react-icons/fa";

const MyProfile = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // ✅ Fetch user role (merged)
  const {
    data: roleData,
    isLoading: roleLoading,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data;
    },
  });

  // 📦 Fetch agreement data
  const {
    data: agreement,
    isLoading,
  } = useQuery({
    queryKey: ["agreement", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/agreements/member/${user.email}`);
      return res.data;
    },
    retry: false,
  });

  if (isLoading || roleLoading) return <Loading />;

  return (
    <div
      className="max-w-3xl mx-auto px-4 py-10 bg-gray-50 dark:bg-gray-900 rounded-xl shadow transition-all duration-500"
      data-aos="fade-up"
    >
      <h2 className="text-3xl font-semibold font-poppins text-center mb-8 text-gray-800 dark:text-gray-200">
        My Profile
      </h2>

      <div
        className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md flex flex-col sm:flex-row items-center gap-6 transition-all duration-500"
        data-aos="zoom-in"
      >
        <img
          src={user?.photoURL || "https://i.ibb.co/0jqHpnp/default-user.png"}
          alt="User Avatar"
          className="w-32 h-32 rounded-full object-cover border-4 border-lime-500"
        />

        <div className="flex-1 space-y-3 font-inter text-gray-800 dark:text-gray-200">
          <div className="flex items-center gap-2">
            <FaUser className="text-emerald-500" />
            <span><strong>Name:</strong> {user?.displayName || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-emerald-500" />
            <span><strong>Email:</strong> {user?.email || "N/A"}</span>
          </div>

          {/* Optional Role Display */}
          {/* <div className="flex items-center gap-2">
            <FaUserShield className="text-blue-500" />
            <span><strong>Role:</strong> {roleData?.role || "N/A"}</span>
          </div> */}

          <hr className="my-4 border-gray-300 dark:border-gray-700" />

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <FaRegBuilding className="text-lime-600" />
              <span><strong>Floor No:</strong> {agreement?.floorNo || "None"}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaRegBuilding className="text-lime-600" />
              <span><strong>Block Name:</strong> {agreement?.blockName || "None"}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaRegBuilding className="text-lime-600" />
              <span><strong>Apartment No:</strong> {agreement?.apartmentNo || "None"}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaDollarSign className="text-lime-600" />
              <span><strong>Rent:</strong> {agreement?.rent || "None"}</span>
            </div>
            <div className="flex items-center gap-2 col-span-2">
              <FaCalendarCheck className="text-lime-600" />
              <span>
                <strong>Agreement Accepted Date:</strong>{" "}
                {agreement?.updatedAt
                  ? new Date(agreement?.updatedAt).toLocaleDateString()
                  : "None"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
