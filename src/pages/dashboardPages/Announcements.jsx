// src/components/Announcements.jsx
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import axios from "axios";
import Loading from "../../utils/Loading";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaBullhorn } from "react-icons/fa";

const Announcements = () => {
  const { user, loading } = useContext(AuthContext);

  // ✅ Fetch logged-in user's role
  const { data: roleData, isLoading: loadingRole } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `https://tower-track-server.vercel.app/users/role/${user.email}`
      );
      return res.data;
    },
  });

  // ✅ Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // ✅ Fetch announcements
  const { data: announcements, isLoading: loadingAnnouncements } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axios.get("https://tower-track-server.vercel.app/announcements");
      return res.data;
    },
  });

  if (loading || loadingRole || loadingAnnouncements) return <Loading />;

  return (
    <section
      className="bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-20 transition-all duration-500"
      data-aos="fade-up"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold font-poppins text-gray-800 dark:text-gray-200 mb-2">
            📢 Community Announcements
          </h2>
          <p className="text-gray-600 dark:text-gray-300 font-inter text-base sm:text-lg max-w-2xl mx-auto">
            Stay informed about important events, maintenance, and safety alerts in your building.
          </p>
        </div>

        {/* Announcements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {announcements?.map((item) => (
            <div
              key={item._id}
              className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow hover:shadow-lg transition-all duration-500"
              data-aos="zoom-in"
            >
              <div className="flex items-start gap-3 mb-3">
                <FaBullhorn className="text-lime-600 dark:text-lime-500 text-xl mt-1" />
                <h3 className="text-lg font-semibold font-poppins text-gray-800 dark:text-gray-100">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 font-inter leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Announcements;
