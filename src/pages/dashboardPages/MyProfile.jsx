// src/pages/dashboard/MyProfile.jsx
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaUser, FaEnvelope, FaRegBuilding, FaCheckCircle } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../utils/axiosSecure";
import useUserRole from "../../hooks/useUserRole";
import Loading from "../../utils/Loading";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { role, isLoading: roleLoading } = useUserRole();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // 🔁 Fetch agreement data only for member role
  const {
    data: agreement,
    isLoading: agreementLoading,
  } = useQuery({
    queryKey: ["memberAgreement", user?.email],
    enabled: role === "member" && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/agreements/member/${user.email}`);
      return res.data;
    },
  });

  if (roleLoading || (role === "member" && agreementLoading)) {
    return <Loading />;
  }

  return (
    <div
      className="max-w-3xl mx-auto px-4 py-10 bg-gray-50 dark:bg-gray-900 rounded-xl shadow transition-all duration-500"
      data-aos="fade-up"
    >
      <h2 className="text-3xl font-poppins font-semibold mb-8 text-center text-gray-800 dark:text-gray-200">
        My Profile
      </h2>

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6" data-aos="zoom-in">
        <img
          src={user?.photoURL || "https://i.ibb.co/0jqHpnp/default-user.png"}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-lime-500"
        />

        <div className="flex-1 space-y-3 text-gray-800 dark:text-gray-200 font-inter">
          <div className="flex items-center gap-2">
            <FaUser className="text-emerald-500" />
            <span><strong>Name:</strong> {user?.displayName || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-emerald-500" />
            <span><strong>Email:</strong> {user?.email || "N/A"}</span>
          </div>

          <hr className="my-4 border-gray-300 dark:border-gray-700" />

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-lime-600" />
              <span>
                <strong>Agreement Accepted Date:</strong>{" "}
                {role === "member" && agreement?.updatedAt
                  ? new Date(agreement.updatedAt).toLocaleDateString()
                  : "None"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaRegBuilding className="text-lime-600" />
              <span>
                <strong>Floor No:</strong>{" "}
                {role === "member" && agreement?.floorNo ? agreement.floorNo : "None"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaRegBuilding className="text-lime-600" />
              <span>
                <strong>Block Name:</strong>{" "}
                {role === "member" && agreement?.blockName ? agreement.blockName : "None"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaRegBuilding className="text-lime-600" />
              <span>
                <strong>Room / Apartment No:</strong>{" "}
                {role === "member" && agreement?.apartmentNo ? agreement.apartmentNo : "None"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
