import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { AiFillControl } from "react-icons/ai";
import {
  FaParking,
  FaDumbbell,
  FaRecycle,
  FaLock,
  FaWifi,
  FaPeopleArrows,
  FaBell,
} from "react-icons/fa";
import { MdElevator, MdPayment } from "react-icons/md";

const features = [
  {
    icon: <FaLock className="text-lime-500 dark:text-lime-400 w-6 h-6" />,
    title: "24/7 Security",
    description: "Advanced surveillance system and smart access control ensure complete safety.",
  },
  {
    icon: <MdElevator className="text-lime-500 dark:text-lime-400 w-6 h-6" />,
    title: "Smart Elevators",
    description: "High-speed, sensor-enabled elevators for convenient vertical transport.",
  },
  {
    icon: <FaDumbbell className="text-lime-500 dark:text-lime-400 w-6 h-6" />,
    title: "Modern Gym",
    description: "A fully equipped fitness center accessible to all residents.",
  },
  {
    icon: <FaParking className="text-lime-500 dark:text-lime-400 w-6 h-6" />,
    title: "Secure Parking",
    description: "Ample and monitored parking space for residents and guests.",
  },
  {
    icon: <FaRecycle className="text-lime-500 dark:text-lime-400 w-6 h-6" />,
    title: "Eco-Friendly Design",
    description: "Sustainable architecture with energy-saving and recycling systems.",
  },
  {
    icon: <FaWifi className="text-lime-500 dark:text-lime-400 w-6 h-6" />,
    title: "High-Speed Wi-Fi",
    description: "Building-wide internet access to keep all residents connected at all times.",
  },
  {
    icon: <MdPayment className="text-lime-500 dark:text-lime-400 w-6 h-6" />,
    title: "Digital Payments",
    description: "Pay your rent, utilities, and service fees securely through the TowerTrack dashboard.",
  },
  {
    icon: <FaPeopleArrows className="text-lime-500 dark:text-lime-400 w-6 h-6" />,
    title: "Community Portal",
    description: "Stay engaged with neighbors, announcements, and events in a private social space.",
  },
  {
    icon: <FaBell className="text-lime-500 dark:text-lime-400 w-6 h-6" />,
    title: "Maintenance Alerts",
    description: "Get real-time notifications about maintenance schedules, water/electricity issues, and more.",
  },
  {
    icon: <AiFillControl className="text-lime-500 dark:text-lime-400 w-6 h-6" />,
    title: "Centralized Control",
    description: "Manage apartment utilities and service requests from a single platform.",
  },
];

const AboutTheBuilding = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="bg-gray-50 dark:bg-slate-800 py-16 px-4 sm:px-6 transition-all duration-500">
      <div className="mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold font-poppins text-gray-800 dark:text-gray-200 mb-2">
            About the Building
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg font-inter max-w-2xl mx-auto">
            TowerTrack is built to redefine modern apartment living — offering a blend of comfort, technology,
            and community for residents, members, and admins alike.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Building Image */}
          <div
            className="w-full h-full rounded-2xl overflow-hidden shadow-md"
            data-aos="slide-right"
          >
            <img
              src="https://i.ibb.co/WvmKtppX/about-Final.webp"
              alt="Tower Building"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Features List */}
          <div
            className="grid gap-6 sm:grid-cols-2 items-start"
            data-aos="slide-left"
          >
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-3">
                  {feature.icon}
                  <h4 className="text-lg font-semibold font-poppins text-gray-800 dark:text-gray-200">
                    {feature.title}
                  </h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-inter">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTheBuilding;
