// src/components/Buildings.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";
import { FiHome, FiExternalLink, FiX } from "react-icons/fi";
import axios from "axios";
import Loading from "../utils/Loading";

const API_BASE = import.meta?.env?.VITE_API_URL || "";

const Buildings = () => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 900, once: true, offset: 24, easing: "ease-out" });
  }, []);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["buildings"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE}/buildings`, {
        withCredentials: true, // keep if you rely on cookies; otherwise harmless
      });
      // ✅ Always return an array
      return Array.isArray(res?.data) ? res.data : [];
    },
    staleTime: 60 * 1000,
  });

  useEffect(() => {
    if (isError) {
      Swal.fire({
        icon: "error",
        title: "Failed to load buildings",
        text: error?.message || "Please try again later.",
      });
    }
  }, [isError, error]);

  const closeModal = useCallback(() => setSelected(null), []);
  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, closeModal]);

  if (isLoading) return <Loading />;

  return (
    <section
      className="w-full bg-gray-50 dark:bg-gray-900 transition-all duration-500"
      aria-labelledby="buildings-heading"
    >
      <div className="max-w-[1980px] mx-auto px-6 py-10">
        {/* Header */}
        <header className="text-center mb-10 sm:mb-12 md:mb-16" data-aos="fade-up">
          <span className="inline-flex items-center gap-2 text-emerald-500 font-inter text-sm sm:text-base">
            <FiHome className="text-lg" />
            Our Buildings
          </span>
          <h2
            id="buildings-heading"
            className="mt-2 text-2xl sm:text-3xl md:text-4xl font-poppins font-semibold text-gray-800 dark:text-gray-200 transition-all duration-500"
          >
            Explore <span className="text-lime-600">Residences</span>
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base font-inter text-gray-600 dark:text-gray-300 transition-all duration-500">
            Browse apartments by tower and learn more about each community.
          </p>
        </header>

        {/* Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {(Array.isArray(data) ? data : []).map((bld, idx) => (
            <article
              key={bld?._id ?? idx}
              className="group rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-500 hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={bld?.image}
                  alt={bld?.title || "Building"}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="p-4 sm:p-5 md:p-6">
                <h3 className="font-poppins text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 transition-all duration-500 line-clamp-2">
                  {bld?.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base font-inter text-gray-600 dark:text-gray-300 transition-all duration-500 line-clamp-3">
                  {bld?.shortDescription}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelected(bld)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-inter text-sm font-medium transition-all duration-500 cursor-pointer"
                    aria-label={`See more about ${bld?.title ?? "building"}`}
                  >
                    <FiExternalLink />
                    See More
                  </button>

                  {/* Accent bar */}
                  <div className="h-1 w-16 rounded bg-emerald-400/50 group-hover:bg-emerald-500 transition-all duration-500" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="building-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="w-full max-w-2xl rounded-2xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-500">
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 dark:border-gray-700">
              <h3
                id="building-modal-title"
                className="font-poppins text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 transition-all duration-500"
              >
                {selected?.title}
              </h3>
              <button
                type="button"
                aria-label="Close"
                className="text-gray-600 hover:text-lime-600 dark:text-gray-300 transition-all duration-500"
                onClick={closeModal}
                autoFocus
              >
                <FiX className="text-2xl" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-5">
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <img
                  src={selected?.image}
                  alt={selected?.title || "Building image"}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-4 text-sm sm:text-base font-inter text-gray-700 dark:text-gray-300 transition-all duration-500 whitespace-pre-line">
                {selected?.detailDescription}
              </p>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-5 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-lime-600 text-lime-600 hover:bg-lime-50 dark:hover:bg-gray-700 font-inter text-sm font-medium transition-all duration-500 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Buildings;
