// src/components/Communities.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

// React Icons (feel free to add more as needed)
import {
  FiUsers,
  FiMessageCircle,
  FiBell,
  FiShield,
  FiHome,
  FiHeart,
  FiStar,
  FiMapPin,
} from "react-icons/fi";

/**
 * Communities (TowerTrack)
 * - Fonts: Poppins (headings), Inter (body)
 * - Colors: Primary lime-500/600, Accent emerald-400/500
 * - Dark/Light supported via Tailwind `dark:` classes
 * - AOS reveal animations
 * - Responsive with Tailwind (Mobile → Desktop)
 *
 * Props:
 *  - communities: Array of community objects to display
 *  - onJoin: (communityId) => void   // optional callback for "Join Community"
 *  - className: string               // optional extra wrapper classes
 *
 * Data shape:
 * {
 *   id: string|number,
 *   name: string,
 *   location: string,
 *   households: number,
 *   amenities: string[],
 *   highlight: string,
 *   cover: string (image url),
 * }
 */

const defaultCommunities = [
  {
    id: "c-01",
    name: "Greenwood Residency",
    location: "Block A, Tower-1",
    households: 120,
    amenities: ["Gym", "Rooftop Garden", "Kids Zone"],
    highlight: "Active events calendar with monthly community meetups.",
    cover: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "c-02",
    name: "Skyline Apartments",
    location: "Block B, Tower-3",
    households: 95,
    amenities: ["Pool", "24/7 Security", "EV Charging"],
    highlight: "Family-friendly with a responsive maintenance squad.",
    cover: "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "c-03",
    name: "Lime View Homes",
    location: "Block C, Tower-2",
    households: 80,
    amenities: ["Community Hall", "Co-working", "Smart Access"],
    highlight: "Tech-forward access and announcement system.",
    cover: "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1600&auto=format&fit=crop",
  },
];

const Communities = ({ communities = defaultCommunities, onJoin, className = "" }) => {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, offset: 24, easing: "ease-out" });
  }, []);

  return (
    <section
      className={`w-full bg-gray-50 dark:bg-gray-900 transition-all duration-500 ${className}`}
      aria-labelledby="communities-heading"
    >
      {/* Container */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 md:py-20">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16" data-aos="fade-up">
          <span className="inline-flex items-center gap-2 text-emerald-500 font-inter text-sm sm:text-base">
            <FiUsers className="text-lg" />
            Vibrant Communities
          </span>
          <h2
            id="communities-heading"
            className="mt-2 text-2xl sm:text-3xl md:text-4xl font-poppins font-semibold text-gray-800 dark:text-gray-200 transition-all duration-500"
          >
            Live Better with Connected <span className="text-lime-600">Communities</span>
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base font-inter text-gray-600 dark:text-gray-300 transition-all duration-500">
            Discover resident-centric spaces powered by announcements, maintenance, and secure access—
            all streamlined by TowerTrack.
          </p>
        </div>

        {/* Feature highlights (top badges) */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-10 sm:mb-12"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <FeatureBadge
            icon={<FiBell />}
            title="Announcements"
            desc="Stay updated"
          />
          <FeatureBadge
            icon={<FiMessageCircle />}
            title="Maintenance"
            desc="Request & track"
          />
          <FeatureBadge
            icon={<FiShield />}
            title="Secure Access"
            desc="Role-based control"
          />
          <FeatureBadge
            icon={<FiHome />}
            title="Agreements"
            desc="Apply & manage"
          />
        </div>

        {/* Community cards */}
        <div
          className="grid gap-6 sm:gap-8 md:gap-10 md:grid-cols-2 lg:grid-cols-3"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          {communities.map((c) => (
            <CommunityCard key={c.id} data={c} onJoin={onJoin} />
          ))}
        </div>

        {/* Bottom CTA / Stats */}
        <div
          className="mt-12 sm:mt-16 md:mt-20 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 sm:p-6 md:p-8 transition-all duration-500"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-poppins font-semibold text-gray-800 dark:text-gray-200 transition-all duration-500">
                Ready to join a <span className="text-lime-600">thriving community</span>?
              </h3>
              <p className="mt-2 text-sm sm:text-base font-inter text-gray-600 dark:text-gray-300 transition-all duration-500">
                Create your account, explore apartments, and access your role-based dashboard for
                payments, requests, and updates.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-gray-700 dark:text-gray-300 font-inter">
                <Stat label="Active Households" value="295+" />
                <Dot />
                <Stat label="Avg. Response Time" value="&lt; 2h" />
                <Dot />
                <Stat label="Communities Onboarded" value="12" />
              </div>
            </div>
            <div className="shrink-0 flex gap-3">
              <Link
                to="/registration"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-inter font-medium transition-all duration-500"
              >
                Get Started
              </Link>
              <Link
                to="/apartments"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-lime-600 text-lime-600 hover:bg-lime-50 dark:hover:bg-gray-700 font-inter font-medium transition-all duration-500"
              >
                Explore Apartments
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- Subcomponents ---------- */

const FeatureBadge = ({ icon, title, desc }) => (
  <div className="flex items-center gap-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 sm:p-4 transition-all duration-500">
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-lime-50 dark:bg-gray-700 text-lime-600 text-xl">
      {icon}
    </span>
    <div className="min-w-0">
      <p className="font-poppins text-gray-800 dark:text-gray-200 font-semibold text-sm sm:text-base transition-all duration-500">
        {title}
      </p>
      <p className="font-inter text-gray-600 dark:text-gray-300 text-xs sm:text-sm transition-all duration-500">
        {desc}
      </p>
    </div>
  </div>
);

const CommunityCard = ({ data, onJoin }) => {
  const { id, name, location, households, amenities, highlight, cover } = data || {};
  return (
    <article className="group rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-500 hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={cover}
          alt={`${name} cover`}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
        {/* Top label */}
        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 text-white backdrop-blur-sm text-xs font-inter">
          <FiMapPin className="text-sm" />
          {location}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-poppins text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 transition-all duration-500">
            {name}
          </h3>
          <span
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-inter text-emerald-500"
            title="Households"
          >
            <FiUsers />
            {households}
          </span>
        </div>

        <p className="mt-2 text-sm font-inter text-gray-600 dark:text-gray-300 transition-all duration-500">
          {highlight}
        </p>

        {/* Amenities */}
        <div className="mt-3 flex flex-wrap gap-2">
          {amenities?.slice(0, 4).map((a, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-lime-50 dark:bg-gray-700 text-lime-600 text-xs font-inter transition-all duration-500"
            >
              <FiStar className="text-xs" />
              {a}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center justify-between">
          <Link
            to="/announcements"
            className="inline-flex items-center gap-2 text-emerald-500 hover:text-emerald-600 font-inter text-sm transition-all duration-500"
          >
            <FiBell />
            Announcements
          </Link>

          <button
            type="button"
            onClick={() => onJoin?.(id)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-inter text-sm font-medium transition-all duration-500"
          >
            <FiHeart />
            Join Community
          </button>
        </div>
      </div>
    </article>
  );
};

const Stat = ({ label, value }) => (
  <span className="inline-flex items-center gap-2 font-inter text-sm">
    <strong className="font-semibold text-gray-900 dark:text-gray-100" dangerouslySetInnerHTML={{ __html: value }} />
    <span className="text-gray-600 dark:text-gray-300">{label}</span>
  </span>
);

const Dot = () => <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 inline-block" />;

export default Communities;
