// src/components/ResidentBenefits.jsx
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FiCreditCard,
  FiBell,
  FiTool,
  FiShield,
  FiClock,
  FiMessageCircle,
  FiFileText,
  FiMapPin,
} from "react-icons/fi";



const defaultBenefits = [
  {
    id: "rb-pay",
    title: "One-Tap Rent Payments",
    description:
      "Pay securely with Stripe and view receipts in your dashboard. Coupon support included.",
    icon: <FiCreditCard />,
  },
  {
    id: "rb-ann",
    title: "Real-Time Announcements",
    description:
      "Never miss an update—news and notices delivered to your dashboard instantly.",
    icon: <FiBell />,
  },
  {
    id: "rb-maint",
    title: "Trackable Maintenance",
    description:
      "Submit issues with details and monitor progress until they’re resolved.",
    icon: <FiTool />,
  },
  {
    id: "rb-sec",
    title: "Secure Access",
    description:
      "Role-based permissions protect your data and keep actions transparent.",
    icon: <FiShield />,
  },
  {
    id: "rb-speed",
    title: "Faster Responses",
    description:
      "Smart routing and clear SLAs reduce wait time for approvals and fixes.",
    icon: <FiClock />,
  },
  {
    id: "rb-chat",
    title: "Direct Communication",
    description:
      "Message building staff and get replies right where you manage everything.",
    icon: <FiMessageCircle />,
  },
  {
    id: "rb-agr",
    title: "Agreement at a Glance",
    description:
      "See rent, dates, and status—no paperwork hunting required.",
    icon: <FiFileText />,
  },
  {
    id: "rb-local",
    title: "Community & Nearby",
    description:
      "Stay connected with on-site events and location-aware notices.",
    icon: <FiMapPin />,
  },
];

const ResidentBenefits = ({
  benefits = defaultBenefits,
  title = "Resident Benefits",
  subtitle = "Everything residents need to live comfortably and stay informed—centralized in one secure dashboard.",
  className = "",
}) => {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, offset: 24, easing: "ease-out" });
  }, []);

  return (
    <section
      className={`w-full bg-gray-50 dark:bg-gray-900 transition-all duration-500 ${className}`}
      aria-labelledby="resident-benefits-heading"
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 md:py-20">
        {/* Header */}
        <header className="text-center mb-10 sm:mb-12 md:mb-16" data-aos="fade-up">
          <h2
            id="resident-benefits-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-poppins font-semibold text-gray-800 dark:text-gray-200 transition-all duration-500"
          >
            {title} <span className="text-lime-600">with TowerTrack</span>
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base font-inter text-gray-600 dark:text-gray-300 transition-all duration-500">
            {subtitle}
          </p>
        </header>

        {/* Benefits Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {benefits.map((b, idx) => (
            <BenefitCard key={b.id ?? idx} {...b} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- Subcomponents ---------- */

const BenefitCard = ({ title, description, icon }) => {
  return (
    <article className="group h-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 sm:p-6 transition-all duration-500 hover:shadow-lg hover:border-lime-500/70">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-lime-50 dark:bg-gray-700 text-lime-600 text-2xl transition-all duration-500 group-hover:scale-105 group-hover:text-emerald-500">
        {icon}
      </div>
      <h3 className="mt-3 text-lg sm:text-xl font-poppins font-semibold text-gray-800 dark:text-gray-200 transition-all duration-500">
        {title}
      </h3>
      <p className="mt-1.5 text-sm sm:text-base font-inter text-gray-600 dark:text-gray-300 transition-all duration-500">
        {description}
      </p>

      {/* Subtle hover accent */}
      <div className="mt-4 h-1 w-16 rounded bg-emerald-400/50 group-hover:bg-emerald-500 transition-all duration-500" />
    </article>
  );
};

export default ResidentBenefits;
