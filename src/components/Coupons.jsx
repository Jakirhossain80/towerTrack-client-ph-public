// src/components/Coupons.jsx
import React, { useEffect } from "react";
import { FaTag, FaCalendarAlt, FaPercentage, FaCopy } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const mockCoupons = [
  {
    _id: "c1",
    title: "Early Bird Rent Discount",
    description: "Get 10% off your rent by paying before the 5th of the month.",
    discount: "10% OFF",
    validTill: "2025-12-31",
  },
  {
    _id: "c2",
    title: "Maintenance Savings",
    description: "Enjoy 15% off on maintenance fees this quarter.",
    discount: "15% OFF",
    validTill: "2025-10-15",
  },
  {
    _id: "c3",
    title: "Gym Subscription Offer",
    description: "Save 20% on your 6-month gym subscription.",
    discount: "20% OFF",
    validTill: "2025-09-30",
  },
  {
    _id: "c4",
    title: "Referral Bonus",
    description: "Refer a new resident and get a service fee waiver.",
    discount: "100% OFF",
    validTill: "2025-11-01",
  },
];

const Coupons = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Copied "${code}" to clipboard!`);
  };

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
          {mockCoupons.map((coupon) => (
            <div
              key={coupon._id}
              data-aos="zoom-in"
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-lime-500 dark:text-lime-400 mb-2">
                  <FaTag className="w-5 h-5" />
                  <h3 className="text-lg font-semibold font-poppins text-gray-800 dark:text-gray-200">
                    {coupon.title}
                  </h3>
                </div>
                <p className="text-sm font-inter text-gray-600 dark:text-gray-400 mb-4">
                  {coupon.description}
                </p>
                <div className="flex items-center gap-2 mb-2">
                  <FaPercentage className="text-emerald-500 dark:text-emerald-400 w-4 h-4" />
                  <span className="text-sm font-medium font-inter text-gray-700 dark:text-gray-300">
                    {coupon.discount}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-emerald-500 dark:text-emerald-400 w-4 h-4" />
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-inter">
                    Valid Till: {coupon.validTill}
                  </span>
                </div>
              </div>

              {/* Copy button */}
              <button
                onClick={() => handleCopy(coupon.title)}
                className="mt-6 flex items-center justify-center gap-2 bg-lime-500 hover:bg-lime-600 text-white text-sm font-medium py-2 px-4 rounded-md transition-all duration-300 cursor-pointer"
                title="Copy Coupon Title"
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
