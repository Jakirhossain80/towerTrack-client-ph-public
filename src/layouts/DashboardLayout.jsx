import React, { useContext, useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import {
  FiMenu,
  FiX,
  FiLogOut,
  FiUser,
  FiHome,
} from "react-icons/fi";
import logo from "../assets/logo-towertrack-final.png";
import Loading from "../utils/Loading";
import "../index.css";
import { Link } from "react-router";

const DashboardLayout = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Default role simulation without superadmin
    setRole("user");
  }, [user]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleLogout = () => logOut();

  const navLinks = [
    { path: "/", label: "Home", icon: <FiHome /> },
    { path: "/dashboard/profile", label: "Profile", icon: <FiUser /> },
  ];

  if (loading || !role) return <Loading />;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div
        className={`fixed z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-white dark:bg-gray-800 border-r dark:border-gray-700 lg:static lg:translate-x-0 shadow-lg
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Link
          to="/dashboard"
          className="flex items-center justify-between p-4 border-b dark:border-gray-700"
        >
          <img src={logo} alt="ZafShift Logo" className="h-10" />
          <span className="font-semibold dark:border-gray-700">
            Dashboard
          </span>
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-gray-800 dark:text-white"
          >
            <FiX size={20} />
          </button>
        </Link>

        {/* User Info */}
        <Link to="/" className="p-4 border-b dark:border-gray-700">
          <div className="text-center">
            <img
              src={
                user?.photoURL ||
                "https://i.ibb.co/0jqHpnp/default-user.png"
              }
              alt="User"
              className="mx-auto h-16 w-16 rounded-full object-cover border-2 border-blue-600"
            />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mt-2">
              {user?.displayName || "User"}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {user?.email}
            </p>
            <span className="text-xs text-blue-500">Role: {role}</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md transition duration-200 font-medium
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-blue-100 dark:text-gray-300 dark:hover:bg-gray-700"
                }`
              }
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="mt-auto p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white py-2 rounded-md font-medium cursor-pointer"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="lg:hidden p-4">
          <button
            onClick={toggleSidebar}
            className="text-gray-800 dark:text-white focus:outline-none"
          >
            <FiMenu size={24} />
          </button>
        </div>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
