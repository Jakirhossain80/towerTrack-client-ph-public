// src/components/KeyFeatures.jsx
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FiHome,
  FiCreditCard,
  FiBell,
  FiTool,
  FiUsers,
  FiShield,
  FiFileText,
  FiTrendingUp,
} from "react-icons/fi";


const defaultFeatures = [
  {
    id: "f-apt",
    title: "Apartment Listings",
    description:
      "Browse available units with rent, size, and facilities. Apply and track agreement status.",
    icon: <FiHome />,
  },
  {
    id: "f-pay",
    title: "Secure Payments",
    description:
      "Stripe-powered rent payments with receipts and coupon support for promotions.",
    icon: <FiCreditCard />,
  },
  {
    id: "f-ann",
    title: "Announcements",
    description:
      "Instant building updates so residents never miss important notices or events.",
    icon: <FiBell />,
  },
  {
    id: "f-mnt",
    title: "Maintenance Requests",
    description:
      "Submit, track, and resolve issues with transparent status updates.",
    icon: <FiTool />,
  },
  {
    id: "f-role",
    title: "Role-Based Access",
    description:
      "Admins, members, and users see exactly what they need—nothing more.",
    icon: <FiShield />,
  },
  {
    id: "f-comm",
    title: "Community & Residents",
    description:
      "Directory and engagement tools to keep your community connected.",
    icon: <FiUsers />,
  },
  {
    id: "f-agr",
    title: "Agreements",
    description:
      "Create, approve, and manage agreements with clear status and history.",
    icon: <FiFileText />,
  },
  {
    id: "f-rep",
    title: "Reports & Insights",
    description:
      "Track rent collection, notices, and activity trends to inform decisions.",
    icon: <FiTrendingUp />,
  },
];

const KeyFeatures = ({
  features = defaultFeatures,
  title = "Key Features",
  subtitle = "Everything you need to manage your residential community efficiently.",
  className = "",
}) => {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, offset: 24, easing: "ease-out" });
  }, []);

  return (
    <section
      className={`w-full bg-gray-50 dark:bg-gray-900 transition-all duration-500 ${className}`}
      aria-labelledby="keyfeatures-heading"
    >
      <div className="max-w-[1980px] mx-auto px-6 py-10">
        {/* Header */}
        <header className="text-center mb-10 sm:mb-12 md:mb-16" data-aos="fade-up">
          <h2
            id="keyfeatures-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-poppins font-semibold text-gray-800 dark:text-gray-200 transition-all duration-500"
          >
            {title} <span className="text-lime-600">for TowerTrack</span>
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base font-inter text-gray-600 dark:text-gray-300 transition-all duration-500">
            {subtitle}
          </p>
        </header>

        {/* Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {features.map((f, idx) => (
            <FeatureCard key={f.id ?? idx} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- Subcomponents ---------- */

const FeatureCard = ({ title, description, icon }) => {
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

export default KeyFeatures;
