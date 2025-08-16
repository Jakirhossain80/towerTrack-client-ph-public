// src/components/ContactUs.jsx
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";


const ContactUs = ({ onSubmit, showMap = true, className = "" }) => {
  const [form, setForm] = useState({ name: "", email: "", message: "", honey: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 900, once: true, offset: 24, easing: "ease-out" });
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      e.name = "Please enter your name (min 2 characters).";
    }
    const email = form.email.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) e.email = "Please enter a valid email address.";
    if (!form.message.trim() || form.message.trim().length < 10) {
      e.message = "Please enter a message (min 10 characters).";
    }
    if (form.honey) {
      e.honey = "Bot detected.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    if (status.type) setStatus({ type: "", message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      if (onSubmit) {
        await onSubmit({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        });
      } else {
        // Mock async submit (replace with real API call if needed)
        await new Promise((r) => setTimeout(r, 900));
      }
      setStatus({ type: "success", message: "Thanks! Your message has been sent." });
      setForm({ name: "", email: "", message: "", honey: "" });
      setErrors({});
    } catch (err) {
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full rounded-lg border px-4 py-2.5 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500 font-inter transition-all duration-500";

  const errorText =
    "mt-1 text-sm text-rose-600 dark:text-rose-400 font-inter transition-all duration-500";

  return (
    <section
      className={`w-full bg-gray-50 dark:bg-gray-900 transition-all duration-500 ${className}`}
      aria-labelledby="contactus-heading"
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 md:py-20">
        {/* Heading */}
        <header className="text-center" data-aos="fade-up">
          <h2
            id="contactus-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-poppins font-semibold text-gray-800 dark:text-gray-200 transition-all duration-500"
          >
            Contact <span className="text-lime-600">Us</span>
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base font-inter text-gray-600 dark:text-gray-300 transition-all duration-500">
            Have a question, feedback, or partnership inquiry? We’d love to hear from you. Our team
            typically responds within 24 hours.
          </p>
        </header>

        {/* Status banners */}
        <div className="max-w-3xl mx-auto mt-6" data-aos="fade-up" data-aos-delay="50">
          {status.type === "success" && (
            <div className="flex items-center gap-3 rounded-lg border border-emerald-300/60 bg-emerald-50 dark:bg-gray-800 p-3 text-emerald-700 dark:text-emerald-400 transition-all duration-500">
              <FiCheckCircle className="text-xl shrink-0" />
              <p className="font-inter">{status.message}</p>
            </div>
          )}
          {status.type === "error" && (
            <div className="flex items-center gap-3 rounded-lg border border-rose-300/60 bg-rose-50 dark:bg-gray-800 p-3 text-rose-700 dark:text-rose-400 transition-all duration-500">
              <FiAlertCircle className="text-xl shrink-0" />
              <p className="font-inter">{status.message}</p>
            </div>
          )}
        </div>

        {/* Content grid */}
        <div
          className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {/* Form */}
          <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 sm:p-6 md:p-8 transition-all duration-500">
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Honeypot (hidden) */}
              <input
                type="text"
                name="honey"
                value={form.honey}
                onChange={handleChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div>
                <label
                  htmlFor="name"
                  className="block mb-1 font-poppins text-sm text-gray-700 dark:text-gray-300 transition-all duration-500"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`${inputBase} ${errors.name ? "border-rose-500 focus:ring-rose-500 focus:border-rose-500" : ""}`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className={errorText}>
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 font-poppins text-sm text-gray-700 dark:text-gray-300 transition-all duration-500"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`${inputBase} ${errors.email ? "border-rose-500 focus:ring-rose-500 focus:border-rose-500" : ""}`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className={errorText}>
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block mb-1 font-poppins text-sm text-gray-700 dark:text-gray-300 transition-all duration-500"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className={`${inputBase} resize-y ${errors.message ? "border-rose-500 focus:ring-rose-500 focus:border-rose-500" : ""}`}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                  <p id="message-error" className={errorText}>
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-70 text-white font-inter font-medium transition-all duration-500 cursor-pointer"
                >
                  <FiSend className={loading ? "animate-pulse" : ""} />
                  {loading ? "Sending..." : "Submit"}
                </button>
              </div>
            </form>
          </div>

          {/* Contact Details & Map */}
          <aside className="space-y-6">
            <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 sm:p-6 md:p-8 transition-all duration-500">
              <h3 className="text-lg sm:text-xl font-poppins font-semibold text-gray-800 dark:text-gray-200 transition-all duration-500">
                Get in Touch
              </h3>
              <p className="mt-1.5 text-sm sm:text-base font-inter text-gray-600 dark:text-gray-300 transition-all duration-500">
                We’re here to support residents and building admins. Reach us via phone, email, or visit our office.
              </p>

              <ul className="mt-4 space-y-3 font-inter text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex w-9 h-9 items-center justify-center rounded-lg bg-lime-50 dark:bg-gray-700 text-lime-600 text-lg">
                    <FiMapPin />
                  </span>
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-sm">TowerTrack HQ, 123 Green Avenue, Dhaka</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex w-9 h-9 items-center justify-center rounded-lg bg-lime-50 dark:bg-gray-700 text-lime-600 text-lg">
                    <FiPhone />
                  </span>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-sm">+880 1234-567890</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex w-9 h-9 items-center justify-center rounded-lg bg-lime-50 dark:bg-gray-700 text-lime-600 text-lg">
                    <FiMail />
                  </span>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-sm">support@towertrack.app</p>
                  </div>
                </li>
              </ul>
            </div>

            {showMap && (
              <div
                className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-500"
                data-aos="fade-up"
                data-aos-delay="150"
              >
                {/* Google Map Embed Placeholder (replace src with your coordinates) */}
                <div className="aspect-[16/10] w-full">
                  <iframe
                    title="TowerTrack Office Location"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d913.3360690278148!2d90.412518!3d23.810332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c71b5f1f%3A0x0000000000000000!2sDhaka!5e0!3m2!1sen!2sbd!4v1700000000000"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
