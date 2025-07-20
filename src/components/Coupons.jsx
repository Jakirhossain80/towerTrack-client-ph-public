// ✅ Fully Updated Coupons.jsx
import React, { useEffect } from "react";
import { FaTag, FaCalendarAlt, FaPercentage, FaCopy } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import useAxiosSecure from "../utils/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../utils/Loading";

const Coupons = () => {
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ["public-coupons"],
    queryFn: async () => {
      // ✅ Updated to call public endpoint for Coupons component
      const res = await axiosSecure.get("/public/coupons");
      return res.data;
    },
  });

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    Swal.fire({
      title: "Copied!",
      text: `"${code}" copied to clipboard.`,
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  if (isLoading) return <Loading />;

  return (
    <section className="bg-gray-50 dark:bg-slate-800 py-16 px-4 sm:px-6 lg:px-20 transition-all duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold font-poppins text-gray-800 dark:text-gray-200 mb-2">
            Available Coupons
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg font-inter max-w-2xl mx-auto">
            Save more with exclusive TowerTrack coupons for rent, services, and amenities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {coupons?.map((coupon) => (
            <div
              key={coupon?._id}
              data-aos="zoom-in"
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-lime-500 dark:text-lime-400 mb-2">
                  <FaTag className="w-5 h-5" />
                  <h3 className="text-lg font-semibold font-poppins text-gray-800 dark:text-gray-200">
                    {coupon?.title}
                  </h3>
                </div>
                <p className="text-sm font-inter text-gray-600 dark:text-gray-400 mb-4">
                  {coupon?.description}
                </p>
                <div className="flex items-center gap-2 mb-2">
                  <FaPercentage className="text-emerald-500 dark:text-emerald-400 w-4 h-4" />
                  <span className="text-sm font-medium font-inter text-gray-700 dark:text-gray-300">
                    {coupon?.discount}% OFF
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-emerald-500 dark:text-emerald-400 w-4 h-4" />
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-inter">
                    Valid Till: {coupon?.validTill}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleCopy(coupon?.code)}
                className="mt-6 flex items-center justify-center gap-2 bg-lime-500 hover:bg-lime-600 text-white text-sm font-medium py-2 px-4 rounded-md transition-all duration-300 cursor-pointer"
                title="Copy Coupon Code"
              >
                <FaCopy className="w-4 h-4" />
                Copy Code
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Coupons;
