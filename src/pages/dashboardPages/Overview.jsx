// src/pages/dashboard/Overview.jsx
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import axios from "axios";
import axiosSecure from "../../hooks/axiosSecure";
import Loading from "../../utils/Loading";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaBuilding,
  FaUsers,
  FaDoorOpen,
  FaClipboardCheck,
  FaUserFriends,
} from "react-icons/fa";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

const Overview = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // ✅ Fetch apartments — plain axios (public)
  const {
    data: apartments = [],
    isLoading: loadingApartments,
    isError: errorApartments,
  } = useQuery({
    queryKey: ["apartments"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/apartments`, {
        withCredentials: true,
      });
      return Array.isArray(res?.data) ? res.data : [];
    },
  });

  // ✅ Fetch agreements — protected
  const {
    data: agreements = [],
    isLoading: loadingAgreements,
    isError: errorAgreements,
  } = useQuery({
    queryKey: ["agreements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/agreements");
      return Array.isArray(res?.data) ? res.data : [];
    },
  });

  // ✅ Fetch users — protected
  const {
    data: users = [],
    isLoading: loadingUsers,
    isError: errorUsers,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return Array.isArray(res?.data) ? res.data : [];
    },
  });

  const isLoading = loadingApartments || loadingAgreements || loadingUsers;
  const isError = errorApartments || errorAgreements || errorUsers;

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="px-4 py-10 text-center text-rose-500">
        Failed to load dashboard overview.
      </div>
    );

  // ---------- Derived Stats ----------
  const totalRooms = apartments.length;
  const occupiedRooms = agreements.length;
  const availableRooms = Math.max(totalRooms - occupiedRooms, 0);

  const availablePct = totalRooms
    ? Number(((availableRooms / totalRooms) * 100).toFixed(1))
    : 0;

  const occupiedPct = totalRooms
    ? Number(((occupiedRooms / totalRooms) * 100).toFixed(1))
    : 0;

  const totalUsers = users.length;
  const totalMembers = users.filter((u) => u?.role === "member").length;

  // ---------- Charts Data ----------
  // Pie: Occupancy Breakdown (live numbers)
  const occupancyData = [
    { name: "Occupied", value: occupiedRooms },
    { name: "Available", value: availableRooms },
  ];
  const PIE_COLORS = ["#22c55e", "#84cc16"]; // emerald-500, lime-500

  // Bar: Dummy monthly rent collections (BDT) — sample only
  const monthlyRentData = [
    { month: "Jan", rent: 180000 },
    { month: "Feb", rent: 175000 },
    { month: "Mar", rent: 192000 },
    { month: "Apr", rent: 205000 },
    { month: "May", rent: 198000 },
    { month: "Jun", rent: 210000 },
  ];

  // Line: Dummy new signups (Users vs Members) — sample only
  const signupTrend = [
    { month: "Jan", users: 18, members: 6 },
    { month: "Feb", users: 21, members: 7 },
    { month: "Mar", users: 25, members: 8 },
    { month: "Apr", users: 22, members: 10 },
    { month: "May", users: 27, members: 12 },
    { month: "Jun", users: 30, members: 14 },
  ];

  return (
    <section className="w-full bg-gray-50 dark:bg-gray-900 transition-all duration-500">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10">
        {/* Header */}
        <header
          className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2"
          data-aos="fade-up"
        >
          <div>
            <h1 className="font-poppins text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-200 transition-all duration-500">
              Dashboard Overview
            </h1>
            <p className="font-inter text-sm sm:text-base text-gray-600 dark:text-gray-300 transition-all duration-500">
              Hi{user?.displayName ? `, ${user.displayName}` : ""}! Here’s a quick snapshot of
              TowerTrack.
            </p>
          </div>
        </header>

        {/* Summary Cards */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 mb-6 sm:mb-10"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {/* Total Rooms */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 transition-all duration-500">
            <div className="flex items-center justify-between">
              <div className="rounded-xl p-2 bg-lime-100 dark:bg-gray-700">
                <FaBuilding className="text-lime-600 text-xl" />
              </div>
            </div>
            <p className="mt-4 font-inter text-gray-600 dark:text-gray-300 text-sm">
              Total Rooms
            </p>
            <h3 className="font-poppins text-2xl font-semibold text-gray-800 dark:text-gray-200">
              {totalRooms}
            </h3>
          </div>

          {/* Occupied Rooms */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 transition-all duration-500">
            <div className="flex items-center justify-between">
              <div className="rounded-xl p-2 bg-emerald-100 dark:bg-gray-700">
                <FaClipboardCheck className="text-emerald-500 text-xl" />
              </div>
            </div>
            <p className="mt-4 font-inter text-gray-600 dark:text-gray-300 text-sm">
              Occupied Rooms
            </p>
            <h3 className="font-poppins text-2xl font-semibold text-gray-800 dark:text-gray-200">
              {occupiedRooms}
            </h3>
          </div>

          {/* Available Rooms (%) */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 transition-all duration-500">
            <div className="flex items-center justify-between">
              <div className="rounded-xl p-2 bg-lime-100 dark:bg-gray-700">
                <FaDoorOpen className="text-lime-600 text-xl" />
              </div>
            </div>
            <p className="mt-4 font-inter text-gray-600 dark:text-gray-300 text-sm">
              Available Rooms (%)
            </p>
            <h3 className="font-poppins text-2xl font-semibold text-gray-800 dark:text-gray-200">
              {availablePct}%
            </h3>
          </div>

          {/* Total Members */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 transition-all duration-500">
            <div className="flex items-center justify-between">
              <div className="rounded-xl p-2 bg-emerald-100 dark:bg-gray-700">
                <FaUserFriends className="text-emerald-500 text-xl" />
              </div>
            </div>
            <p className="mt-4 font-inter text-gray-600 dark:text-gray-300 text-sm">
              Total Members
            </p>
            <h3 className="font-poppins text-2xl font-semibold text-gray-800 dark:text-gray-200">
              {totalMembers}
            </h3>
          </div>

          {/* Total Users */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 transition-all duration-500">
            <div className="flex items-center justify-between">
              <div className="rounded-xl p-2 bg-lime-100 dark:bg-gray-700">
                <FaUsers className="text-lime-600 text-xl" />
              </div>
            </div>
            <p className="mt-4 font-inter text-gray-600 dark:text-gray-300 text-sm">
              Total Users
            </p>
            <h3 className="font-poppins text-2xl font-semibold text-gray-800 dark:text-gray-200">
              {totalUsers}
            </h3>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6" data-aos="fade-up" data-aos-delay="150">
          {/* Pie: Occupancy Breakdown */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 transition-all duration-500">
            <h4 className="font-poppins text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Occupancy Breakdown
            </h4>
            <div className="h-60 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={occupancyData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={4}
                  >
                    {occupancyData.map((entry, index) => (
                      <Cell key={`slice-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "var(--tw-colors-white)",
                      borderRadius: "0.5rem",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 font-inter text-sm text-gray-600 dark:text-gray-300">
              Occupied: <span className="font-semibold">{occupiedPct}%</span> • Available:{" "}
              <span className="font-semibold">{availablePct}%</span>
            </p>
          </div>

          {/* Bar: Monthly Rent (Dummy) */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 transition-all duration-500 xl:col-span-2">
            <h4 className="font-poppins text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Monthly Rent Collected (BDT)
            </h4>
            <div className="h-60 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyRentData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.3)" />
                  <XAxis dataKey="month" stroke="currentColor" />
                  <YAxis stroke="currentColor" />
                  <Tooltip
                    formatter={(v) => `৳${v.toLocaleString()}`}
                    contentStyle={{
                      background: "var(--tw-colors-white)",
                      borderRadius: "0.5rem",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  />
                  <Bar dataKey="rent" fill="#22c55e" className="transition-all duration-500" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Line: Signups (Dummy) */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 transition-all duration-500 xl:col-span-3">
            <h4 className="font-poppins text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              New Signups (Users vs Members)
            </h4>
            <div className="h-60 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={signupTrend} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.3)" />
                  <XAxis dataKey="month" stroke="currentColor" />
                  <YAxis stroke="currentColor" />
                  <Tooltip
                    contentStyle={{
                      background: "var(--tw-colors-white)",
                      borderRadius: "0.5rem",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#84cc16" // lime-500
                    strokeWidth={2}
                    dot={false}
                    className="transition-all duration-500"
                  />
                  <Line
                    type="monotone"
                    dataKey="members"
                    stroke="#22c55e" // emerald-500
                    strokeWidth={2}
                    dot={false}
                    className="transition-all duration-500"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
