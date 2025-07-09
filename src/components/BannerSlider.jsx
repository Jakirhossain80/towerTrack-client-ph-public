import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Sample images (replace with real URLs)
const slides = [
  {
    image: "https://i.postimg.cc/wTFQSXqk/banner1.webp",
    heading: "Share Surplus, Spread Smiles",
    text: "Help reduce food waste by sharing your extra food with the community.",
    button: "Share Now",
    buttonLink: "/addfood",
  },
  {
    image: "https://i.postimg.cc/mg5NrTFz/banner2.webp",
    heading: "Find Meals, Fight Hunger",
    text: "Access wholesome meals near you. Because no one should go hungry.",
    button: "Find Food",
    buttonLink: "/availablefoods",
  },
  {
    image: "https://i.postimg.cc/YC9zkvjB/banner3.webp",
    heading: "Join the FoodCircle Movement",
    text: "Be part of a caring community making a difference with every bite.",
    button: "Get Involved",
    buttonLink: "/registration",
  },
];

const BannerSlider = () => {
  const swiperRef = useRef(null);

  return (
    <div
      className="w-full h-[300px] md:h-[650px] relative transition-all duration-500"
      onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
      onMouseLeave={() => swiperRef.current?.autoplay?.start()}
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
                <h2 className="text-2xl md:text-5xl font-bold font-poppins mb-3 text-amber-400 transition-all duration-500">
                  {slide.heading}
                </h2>
                <p className="text-sm md:text-lg font-inter mb-4 max-w-lg text-white dark:text-gray-200 transition-all duration-500">
                  {slide.text}
                </p>
                <a
                  href={slide.buttonLink}
                  className="bg-green-600 hover:bg-green-700 transition-all duration-500 px-5 py-2 rounded text-white font-medium"
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
