// src/pages/dashboard/MyProfile.jsx
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaUser, FaEnvelope, FaRegBuilding, FaCheckCircle } from "react-icons/fa";

const MyProfile = () => {
  const { user } = useContext(AuthContext); // 🔐 Get user info from Firebase Auth Context

  useEffect(() => {
    AOS.init({ duration: 800, once: true }); // 🎬 Initialize AOS animation
  }, []);

  return (
    <div
      className="max-w-3xl mx-auto px-4 py-10 bg-gray-50 dark:bg-gray-900 rounded-xl shadow transition-all duration-500"
      data-aos="fade-up"
    >
      <h2 className="text-3xl font-poppins font-semibold mb-8 text-center text-gray-800 dark:text-gray-200">
        My Profile
      </h2>

      <div
        className="flex flex-col sm:flex-row items-center sm:items-start gap-6"
        data-aos="zoom-in"
      >
        {/* 👤 Profile Image */}
        <img
          src={user?.photoURL}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-lime-500"
        />

        {/* 🧑 User Info */}
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

          {/* 🏠 Placeholder Apartment Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-lime-600" />
              <span><strong>Agreement Accepted Date:</strong> None</span>
            </div>
            <div className="flex items-center gap-2">
              <FaRegBuilding className="text-lime-600" />
              <span><strong>Floor No:</strong> None</span>
            </div>
            <div className="flex items-center gap-2">
              <FaRegBuilding className="text-lime-600" />
              <span><strong>Block Name:</strong> None</span>
            </div>
            <div className="flex items-center gap-2">
              <FaRegBuilding className="text-lime-600" />
              <span><strong>Room / Apartment No:</strong> None</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
