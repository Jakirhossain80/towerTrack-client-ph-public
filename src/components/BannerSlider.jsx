// src/components/BannerSlider.jsx
import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import AOS from "aos";
import "aos/dist/aos.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// TowerTrack-themed slides (unchanged)
const slides = [
  {
    image: "https://i.ibb.co/d0BKtS9t/bannerone.webp",
    heading: "Seamless Apartment Management",
    text: "Manage residents, track payments, and simplify building operations — all in one place.",
    button: "Explore Features",
    buttonLink: "/apartment",
  },
  {
    image: "https://i.ibb.co/yc31Pg4B/bannertwo.webp",
    heading: "Empowering Residents Daily",
    text: "From maintenance requests to community updates — TowerTrack keeps you connected.",
    button: "Join TowerTrack",
    buttonLink: "/registration",
  },
  {
    image: "https://i.ibb.co/G4R7s8ry/bannerthree.webp",
    heading: "Smart Living Starts Here",
    text: "Experience modern tools for smarter living in your apartment community.",
    button: "Get Started",
    buttonLink: "/login",
  },
];

const BannerSlider = () => {
  const swiperRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div
      className="w-full relative transition-all duration-500 overflow-hidden"
      onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
      onMouseLeave={() => swiperRef.current?.autoplay?.start()}
      data-aos="zoom-in"
    >
      {/* Responsive height that works in device toolbar */}
      <div className="min-h-[280px] sm:min-h-[360px] md:min-h-[520px] lg:min-h-[650px]">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          loop={true}
          speed={1000}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
          }}
          className="w-full h-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="select-none">
              <div className="relative w-full h-full transition-all duration-500">
                <img
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover rounded-md transition-all duration-500"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black/40 rounded-md flex">
                  {/* Content wrapper: left-aligned on md+, centered on mobile */}
                  <div className="flex flex-col justify-center items-start md:items-start gap-2 md:gap-3 p-4 sm:p-8 md:p-16 w-full">
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-poppins mb-2 md:mb-3 text-lime-400 transition-all duration-500">
                      {slide.heading}
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg font-inter mb-3 md:mb-4 max-w-lg text-white dark:text-gray-200 transition-all duration-500">
                      {slide.text}
                    </p>
                    <a
                      href={slide.buttonLink}
                      className="bg-emerald-500 hover:bg-emerald-600 transition-all duration-500 px-4 sm:px-5 py-2 rounded text-white font-medium inline-block"
                    >
                      {slide.button}
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Navigation buttons */}
          <div className="swiper-button-prev !text-white transition-all duration-500" />
          <div className="swiper-button-next !text-white transition-all duration-500" />

          {/* Pagination bullets */}
          <div className="swiper-pagination !bottom-4 transition-all duration-500" />
        </Swiper>
      </div>
    </div>
  );
};

export default BannerSlider;
