import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import AOS from "aos";
import "aos/dist/aos.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// TowerTrack-themed slides
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
      className="w-full max-w-[1600px] mx-auto h-[300px] md:h-[650px] relative transition-all duration-500"
      onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
      onMouseLeave={() => swiperRef.current?.autoplay?.start()}
      data-aos="zoom-in"
    >
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
          <SwiperSlide key={index}>
            <div className="relative w-full h-full transition-all duration-500">
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover rounded-md transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-start justify-center p-6 md:p-16 rounded-md transition-all duration-500">
                <h2 className="text-2xl md:text-5xl font-bold font-poppins mb-3 text-lime-400 transition-all duration-500">
                  {slide.heading}
                </h2>
                <p className="text-sm md:text-lg font-inter mb-4 max-w-lg text-white dark:text-gray-200 transition-all duration-500">
                  {slide.text}
                </p>
                <a
                  href={slide.buttonLink}
                  className="bg-emerald-500 hover:bg-emerald-600 transition-all duration-500 px-5 py-2 rounded text-white font-medium"
                >
                  {slide.button}
                </a>
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
  );
};

export default BannerSlider;
