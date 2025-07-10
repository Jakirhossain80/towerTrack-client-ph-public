// AboutTheBuilding.jsx
import React from "react";
import { FaBuilding, FaParking, FaDumbbell, FaRecycle, FaLock } from "react-icons/fa";
import { MdElevator } from "react-icons/md";
import { motion } from "motion/react";

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
];

const AboutTheBuilding = () => {
  return (
    <section className="bg-gray-50 dark:bg-slate-800 py-16 px-4 sm:px-6 lg:px-20 transition-all duration-500">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-12">
          <FaBuilding className="text-lime-500 dark:text-lime-400 text-4xl mx-auto mb-3" />
          <h2 className="text-3xl sm:text-4xl font-bold font-poppins text-gray-800 dark:text-gray-200 mb-2">
            About the Building
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg font-inter max-w-2xl mx-auto">
            TowerTrack is built to redefine modern apartment living — offering a blend of comfort, technology,
            and community for residents, members, and admins alike.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
      </motion.div>
    </section>
  );
};

export default AboutTheBuilding;
