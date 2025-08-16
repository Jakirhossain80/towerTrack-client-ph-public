import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";
import { FiMail, FiSend } from "react-icons/fi";



const Newsletter = ({
  title = "Stay in the Loop",
  subtitle = "Subscribe to receive building announcements, maintenance tips, and TowerTrack updates.",
  onSubscribe,
  className = "",
}) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 900, once: true, offset: 24, easing: "ease-out" });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = email.trim();

    if (!value) {
      Swal.fire({
        icon: "warning",
        title: "Please enter your email",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    try {
      setLoading(true);
      // Optional: wire up your API (e.g., POST /newsletter)
      if (onSubscribe) {
        await onSubscribe(value);
      } else {
        // Mock async delay for UX parity
        await new Promise((r) => setTimeout(r, 750));
      }

      Swal.fire({
        icon: "success",
        title: "Thank you for subscribing!",
        timer: 1500,
        showConfirmButton: false,
      });
      setEmail("");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Subscription failed",
        text: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className={`w-full bg-gray-50 dark:bg-gray-900 transition-all duration-500 ${className}`}
      aria-labelledby="newsletter-heading"
    >
      <div className="max-w-[1980px] mx-auto px-6 py-10">
        {/* Header */}
        <header className="text-center" data-aos="fade-up">
          <span className="inline-flex items-center gap-2 text-emerald-500 font-inter text-sm sm:text-base">
            <FiMail className="text-lg" />
            Newsletter
          </span>
          <h2
            id="newsletter-heading"
            className="mt-2 text-2xl sm:text-3xl md:text-4xl font-poppins font-semibold text-gray-800 dark:text-gray-200 transition-all duration-500"
          >
            {title} <span className="text-lime-600">from TowerTrack</span>
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base font-inter text-gray-600 dark:text-gray-300 transition-all duration-500">
            {subtitle}
          </p>
        </header>

        {/* Card */}
        <div
          className="mt-8 sm:mt-10 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 sm:p-6 md:p-8 transition-all duration-500"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row items-stretch md:items-center gap-3 sm:gap-4"
            noValidate
          >
            <div className="relative flex-1">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-lime-600" />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500 font-inter transition-all duration-500"
                aria-label="Email address"
                autoComplete="email"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 disabled:opacity-70 text-white font-inter font-medium transition-all duration-500"
            >
              <FiSend className={loading ? "animate-pulse" : ""} />
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          {/* Helper text */}
          <p className="mt-3 text-xs sm:text-sm font-inter text-gray-500 dark:text-gray-400 transition-all duration-500">
            We respect your privacy. Unsubscribe anytime.
          </p>

          {/* Decorative/Status Accent */}
          <div className="mt-6 h-1 w-20 rounded bg-emerald-400/50 hover:bg-emerald-500 transition-all duration-500" />
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
