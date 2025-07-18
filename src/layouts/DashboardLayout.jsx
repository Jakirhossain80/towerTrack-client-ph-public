// Updated DashboardLayout.jsx
import React, { useContext, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { FiMenu, FiX, FiLogOut, FiUser } from "react-icons/fi";
import { TfiAnnouncement } from "react-icons/tfi";
import { FaUsersCog } from "react-icons/fa";
import { MdApartment } from "react-icons/md";
import { TbUsersGroup } from "react-icons/tb";
import { RiCouponLine } from "react-icons/ri";
import { LuHandshake } from "react-icons/lu";
import logo from "../assets/logo-towertrack-final.png";
import Loading from "../utils/Loading";
import "../index.css";
import { Link } from "react-router";
import useUserRole from "../hooks/useUserRole";

const DashboardLayout = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { role, isLoading } = useUserRole();
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading || isLoading) return <Loading />;

  // ✅ Allow both "user" and "member" roles
  const navLinks = [];

  if (role === "user" || role === "member") {
    navLinks.push(
      { path: "/dashboard/my-profile", label: "My Profile", icon: <FiUser /> },
      {
        path: "/dashboard/announcements",
        label: "Announcements",
        icon: <TfiAnnouncement />,
      }
    );
  }

  if (role === "admin") {
    navLinks.push(
      {
        path: "/dashboard/adminProfile",
        label: "Admin Profile",
        icon: <FaUsersCog />,
      },
      {
        path: "/dashboard/makeAnnouncement",
        label: "Make Announcement",
        icon: <TfiAnnouncement />,
      },
      {
        path: "/dashboard/manageCoupons",
        label: "Manage Coupons",
        icon: <RiCouponLine />,
      },

      {
        path: "/dashboard/agreementRequest",
        label: "Agreement Request",
        icon: <LuHandshake />,
      }
    );
  }

  if (role === "member") {
    navLinks.push(
    //   {
    //   path: "/dashboard/my-residents",
    //   label: "My Residents",
    //   icon: <TbUsersGroup />,
    // }
  );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 transition-all duration-500">
      {/* Sidebar */}
      <div
        className={`fixed z-30 inset-y-0 left-0 w-64 transform bg-white dark:bg-slate-100 border-r dark:border-gray-700 lg:static lg:translate-x-0 shadow-lg transition-all duration-500
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Link
          to="/dashboard"
          className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 transition-all duration-500"
        >
          <img src={logo} alt="TowerTrack Logo" className="h-10" />
          <span className="font-semibold text-gray-800 dark:text-gray-800 transition-all duration-500">
            Dashboard
          </span>
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-gray-800 dark:text-gray-800 transition-all duration-500"
          >
            <FiX size={20} />
          </button>
        </Link>

        {/* User Info */}
        <Link
          to="/"
          className="p-4 border-b border-gray-200 dark:border-gray-700 transition-all duration-500"
        >
          <div className="text-center transition-all duration-500">
            <img
              src={
                user?.photoURL || "https://i.ibb.co/0jqHpnp/default-user.png"
              }
              alt="User"
              className="mx-auto h-16 w-16 rounded-full object-cover border-2 border-lime-500 transition-all duration-500"
            />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-800 mt-2 transition-all duration-500">
              {user?.displayName || "User"}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-600 transition-all duration-500">
              {user?.email}
            </p>
            <span className="text-xs text-lime-500 transition-all duration-500">
              Role: {role}
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="p-4 space-y-2 transition-all duration-500">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md font-medium transition-all duration-500
                ${
                  isActive
                    ? "bg-lime-600 text-white"
                    : "text-gray-700 hover:bg-lime-100 dark:text-gray-600 dark:hover:bg-gray-200"
                }`
              }
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="mt-auto p-4 transition-all duration-500">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white py-2 rounded-md font-medium cursor-pointer transition-all duration-500"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto transition-all duration-500">
        <div className="lg:hidden p-4">
          <button
            onClick={toggleSidebar}
            className="text-gray-800 dark:text-gray-200 focus:outline-none transition-all duration-500"
          >
            <FiMenu size={24} />
          </button>
        </div>
        <div className="flex-1 p-4 transition-all duration-500">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
