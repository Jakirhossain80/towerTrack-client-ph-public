// src/pages/dashboard/NoticeBoard.jsx
import { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../provider/AuthProvider";
import axios from "axios";
import axiosSecure from "../../hooks/axiosSecure";
import Loading from "../../utils/Loading";
import Swal from "sweetalert2";
import { FaExclamationTriangle } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const NoticeBoard = () => {
  const { user, loading } = useContext(AuthContext);

  // ✅ Fetch user role
  const {
    data: roleData,
    isLoading: roleLoading,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/role/${user.email}`
      );
      return res.data;
    },
  });

  // 📦 Fetch rent notices
  const {
    data: notices = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userNotices", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `https://tower-track-server.vercel.app/notices/users/${user.email}`
      );
      return res.data;
    },
  });

  // 🚨 Fire alert if maximum notices reached
  useEffect(() => {
    if (
      notices.length &&
      notices[0].status === "active" &&
      notices[0].noticeCount === 3
    ) {
      Swal.fire(
        "Account Update",
        "You have reached the maximum number of rent notices. Your access has been limited.",
        "warning"
      );
    }
  }, [notices]);

  if (isLoading || roleLoading) return <Loading />;
  if (isError) Swal.fire("Error", "Failed to load notices.", "error");

  return (
    <div
      className="max-w-4xl mx-auto p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md mt-6 transition-all duration-500"
      data-aos="fade-up"
    >
      <h2 className="text-2xl font-poppins font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
        <FaExclamationTriangle className="text-yellow-400" /> Rent Notices
      </h2>

      {notices.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">You have no notices.</p>
      ) : (
        <div className="grid gap-4">
          {notices.map((notice, idx) => (
            <div
              key={idx}
              className="border border-yellow-300 dark:border-yellow-500 bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg shadow-sm"
            >
              <p className="text-gray-800 dark:text-yellow-100">
                <span className="font-semibold">Notice #{notice.noticeCount}:</span>{" "}
                {notice.reason}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Issued on: {new Date(notice.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoticeBoard;
