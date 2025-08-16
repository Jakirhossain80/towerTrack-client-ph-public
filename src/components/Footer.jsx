// src/components/Footer.jsx
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { NavLink, Link } from "react-router-dom";
import {
  FaBuilding,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const navLinkClass = ({ isActive }) =>
    `transition hover:text-lime-600 ${
      isActive ? "text-lime-500 font-semibold" : ""
    }`;

  return (
    <footer
      className="bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-gray-200 font-inter border-t border-gray-200 dark:border-gray-700 transition-all duration-500"
      data-aos="zoom-in"
    >
      <div className="max-w-[1600px] mx-auto px-8 py-16 grid justify-center items-center gap-8 sm:grid-cols-2 md:grid-cols-3">
        {/* Left: Logo & Tagline */}
        <div className="text-center md:text-left space-y-2">
          <Link
            to="/"
            className="flex items-center justify-center md:justify-start space-x-2"
          >
            <FaBuilding className="text-lime-500 text-2xl transition-all duration-500" />
            <span className="text-xl font-bold font-poppins text-lime-500 transition-all duration-500">
              TowerTrack
            </span>
          </Link>
          <p className="text-sm">Simplifying Residential Living.</p>
        </div>

        {/* Center: Quick Links */}
        <div className="text-center md:text-left space-y-2">
          <h4 className="text-md font-semibold font-poppins">Quick Links</h4>
          <nav className="flex flex-col space-y-1">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/apartment" className={navLinkClass}>
              Apartment
            </NavLink>
          </nav>
        </div>

        {/* Right: Socials & Contact */}
        <div className="text-center md:text-right space-y-2">
          <h4 className="text-md font-semibold font-poppins">
            Connect With Us
          </h4>
          <div className="flex justify-center md:justify-end space-x-4 text-xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-lime-500 transition-all duration-500"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-500 transition-all duration-500"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition-all duration-500"
            >
              <FaTwitter />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-800 dark:hover:text-white transition-all duration-500"
            >
              <FaGithub />
            </a>
          </div>
          <p className="text-sm">contact@towertrack.com</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 dark:border-gray-700 py-4 text-center text-sm text-gray-600 dark:text-gray-400 transition-all duration-500">
        &copy; {new Date().getFullYear()} TowerTrack. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
