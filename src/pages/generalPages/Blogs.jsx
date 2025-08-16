// src/components/Blogs.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FiTag,
  FiClock,
  FiUser,
  FiArrowRight,
} from "react-icons/fi";

/**
 * Blogs (TowerTrack)
 * - Fonts: Poppins (headings), Inter (body)
 * - Colors: Primary lime-500/600, Accent emerald-400/500
 * - Background: gray-50 / gray-900
 * - Text: gray-800 / gray-200
 * - Transitions: transition-all duration-500
 *
 * Props:
 *  - posts: Array<{
 *      id: string|number,
 *      slug?: string,             // for router link
 *      title: string,
 *      description: string,
 *      thumbnail: string,         // image url
 *      author?: string,
 *      category?: string,
 *      date?: string              // e.g. "Aug 2025"
 *    }>
 *  - title?: string               // section heading
 *  - subtitle?: string
 *  - readMoreBase?: string        // e.g. "/blog"
 *  - onReadMore?: (post) => void  // optional callback
 *  - className?: string
 */

const samplePosts = [
  {
    id: "b-01",
    slug: "smart-rent-payments-with-coupons",
    title: "Smart Rent Payments with Coupons",
    description:
      "Learn how TowerTrack streamlines monthly rent with secure payments, coupon support, and instant receipts.",
    thumbnail:
      "https://images.unsplash.com/photo-1567427013953-1d3e27f7f1c1?q=80&w=1600&auto=format&fit=crop",
    author: "Admin",
    category: "Payments",
    date: "Aug 2025",
  },
  {
    id: "b-02",
    slug: "keeping-residents-informed-with-announcements",
    title: "Keeping Residents Informed with Announcements",
    description:
      "Post real-time updates and events so residents always stay in the loop—right inside their dashboard.",
    thumbnail:
      "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&w=1600&auto=format&fit=crop",
    author: "Community Lead",
    category: "Engagement",
    date: "Aug 2025",
  },
  {
    id: "b-03",
    slug: "maintenance-requests-that-get-done",
    title: "Maintenance Requests That Get Done",
    description:
      "From submission to resolution—see how TowerTrack makes maintenance transparent and trackable.",
    thumbnail:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop",
    author: "Ops Team",
    category: "Maintenance",
    date: "Aug 2025",
  },
];

const Blogs = ({
  posts = samplePosts,
  title = "Insights & Updates",
  subtitle = "Stories, tips, and news from the TowerTrack community.",
  readMoreBase = "/blog",
  onReadMore,
  className = "",
}) => {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, offset: 24, easing: "ease-out" });
  }, []);

  return (
    <section
      className={`w-full bg-gray-50 dark:bg-gray-900 transition-all duration-500 ${className}`}
      aria-labelledby="blogs-heading"
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 md:py-20">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16" data-aos="fade-up">
          <h2
            id="blogs-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-poppins font-semibold text-gray-800 dark:text-gray-200 transition-all duration-500"
          >
            {title} <span className="text-lime-600">for Residents & Admins</span>
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base font-inter text-gray-600 dark:text-gray-300 transition-all duration-500">
            {subtitle}
          </p>
        </div>

        {/* Grid */}
        <div
          className="grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {posts.map((post, idx) => (
            <BlogCard
              key={post.id ?? idx}
              post={post}
              readMoreBase={readMoreBase}
              onReadMore={onReadMore}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- Subcomponents ---------- */

const BlogCard = ({ post, readMoreBase, onReadMore }) => {
  const {
    slug,
    title,
    description,
    thumbnail,
    author = "TowerTrack Team",
    category = "General",
    date = "",
  } = post || {};

  const to = slug ? `${readMoreBase}/${slug}` : readMoreBase;

  return (
    <article className="group rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-500 hover:shadow-lg">
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
        {/* Category pill */}
        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 text-white backdrop-blur-sm text-xs font-inter">
          <FiTag className="text-sm" />
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 md:p-6">
        <h3 className="font-poppins text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 transition-all duration-500 line-clamp-2">
          {title}
        </h3>

        <p className="mt-2 text-sm sm:text-base font-inter text-gray-600 dark:text-gray-300 transition-all duration-500 line-clamp-3">
          {description}
        </p>

        {/* Meta */}
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs sm:text-sm font-inter text-gray-500 dark:text-gray-400">
          <span className="inline-flex items-center gap-1">
            <FiUser /> {author}
          </span>
          {date && (
            <>
              <Dot />
              <span className="inline-flex items-center gap-1">
                <FiClock /> {date}
              </span>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center justify-between">
          <Link
            to={to}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-inter text-sm font-medium transition-all duration-500"
            onClick={() => onReadMore?.(post)}
          >
            Read More <FiArrowRight />
          </Link>

          <Link
            to="/apartments"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-lime-600 text-lime-600 hover:bg-lime-50 dark:hover:bg-gray-700 font-inter text-sm font-medium transition-all duration-500"
            aria-label="Explore Apartments"
          >
            Explore
          </Link>
        </div>
      </div>
    </article>
  );
};

const Dot = () => (
  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 inline-block" />
);

export default Blogs;
