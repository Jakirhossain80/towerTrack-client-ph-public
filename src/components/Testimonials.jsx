// src/components/Testimonials.jsx
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FiStar } from "react-icons/fi";
import { FaQuoteLeft } from "react-icons/fa";



const defaultTestimonials = [
  {
    id: "t-1",
    name: "Farhana Sultana",
    role: "Resident",
    quote:
      "Rent payments are a breeze now. I get receipts instantly and never miss announcements.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "t-2",
    name: "Rahim Uddin",
    role: "Member",
    quote:
      "Maintenance requests are transparent—submitted, tracked, resolved. Love the clarity.",
    rating: 4,
    avatar:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "t-3",
    name: "Nusrat Jahan",
    role: "Tenant",
    quote:
      "The dashboard keeps everything in one place—payments, notices, and my agreement.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "t-4",
    name: "Imran Hossain",
    role: "Resident",
    quote:
      "Clean design, fast responses, and role-based access that actually makes sense.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1200&auto=format&fit=crop",
  },
];

const Testimonials = ({
  items = defaultTestimonials,
  title = "What Our Residents Say",
  subtitle = "Real feedback from people using TowerTrack every day.",
  className = "",
}) => {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, offset: 24, easing: "ease-out" });
  }, []);

  return (
    <section
      className={`w-full bg-gray-50 dark:bg-gray-900 transition-all duration-500 ${className}`}
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 md:py-20">
        {/* Header */}
        <header className="text-center mb-10 sm:mb-12 md:mb-16" data-aos="fade-up">
          <h2
            id="testimonials-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-poppins font-semibold text-gray-800 dark:text-gray-200 transition-all duration-500"
          >
            {title} <span className="text-lime-600">on TowerTrack</span>
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base font-inter text-gray-600 dark:text-gray-300 transition-all duration-500">
            {subtitle}
          </p>
        </header>

        {/* Grid (1 / 2 / 3 columns) */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {items.map((t, idx) => (
            <TestimonialCard key={t.id ?? idx} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- Subcomponents ---------- */

const TestimonialCard = ({ name, role, avatar, quote, rating = 5 }) => {
  return (
    <article className="group rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-500 hover:shadow-lg hover:border-lime-500/70">
      {/* Header Row */}
      <div className="flex items-center gap-3 p-4 sm:p-5">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-lime-600 shrink-0">
          <img
            src={avatar}
            alt={`${name} avatar`}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.05]"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="min-w-0">
          <h3 className="font-poppins text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 transition-all duration-500 truncate">
            {name}
          </h3>
          <p className="font-inter text-sm text-emerald-600 dark:text-emerald-400 transition-all duration-500">
            {role}
          </p>
        </div>
        <div className="ml-auto text-lime-600/70">
          <FaQuoteLeft className="text-2xl" />
        </div>
      </div>

      {/* Quote */}
      <div className="px-4 sm:px-5">
        <p className="font-inter text-sm sm:text-base text-gray-700 dark:text-gray-300 transition-all duration-500">
          “{quote}”
        </p>
      </div>

      {/* Footer: Rating */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-4">
        <StarRating value={rating} />
        <div className="h-1 w-16 rounded bg-emerald-400/50 group-hover:bg-emerald-500 transition-all duration-500" />
      </div>
    </article>
  );
};

const StarRating = ({ value = 0, max = 5 }) => {
  return (
    <div className="flex items-center gap-1" aria-label={`Rating: ${value} out of ${max}`}>
      {Array.from({ length: max }).map((_, i) => {
        const active = i < value;
        return (
          <FiStar
            key={i}
            className={`text-base sm:text-lg transition-all duration-500 ${
              active ? "text-emerald-500" : "text-gray-300 dark:text-gray-600"
            }`}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
};

export default Testimonials;
