// src/components/Navbar.jsx
import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { ThemeContext } from "../provider/ThemeProvider";
import { signOut, getAuth } from "firebase/auth";
import app from "../firebase.config";
import { FiSun, FiMoon } from "react-icons/fi";
import { MdLogin } from "react-icons/md";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import logoImage from "../assets/logo-towertrack-final.png";

const auth = getAuth(app);

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => navigate("/login"))
      .catch((error) => console.error("Logout error:", error));
  };

  const linkClasses = (isActive) =>
    `hover:text-lime-600 transition-all duration-500 ${
      isActive ? "text-lime-500 font-medium" : ""
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 w-full max-w-[1980px] mx-auto bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 px-16 py-8 flex justify-between items-center z-50 transition-all duration-500 border-b">
      {/* Left: Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img src={logoImage} alt="Logo" className="h-8 w-8" />
        <h1 className="text-xl font-bold text-lime-600 font-poppins transition-all duration-500">
          TowerTrack
        </h1>
      </Link>

      {/* Center: Desktop NavLinks */}
      <div className="hidden md:flex gap-6 text-gray-800 dark:text-gray-200 font-inter transition-all duration-500">
        <NavLink to="/" className={({ isActive }) => linkClasses(isActive)}>
          Home
        </NavLink>
        <NavLink
          to="/apartment"
          className={({ isActive }) => linkClasses(isActive)}
        >
          Apartment
        </NavLink>
        <NavLink
          to="/communities"
          className={({ isActive }) => linkClasses(isActive)}
        >
          Communities
        </NavLink>
      </div>

      {/* Right: Auth, Theme, User Menu */}
      <div className="hidden md:flex items-center gap-6 text-gray-800 dark:text-gray-200 font-inter transition-all duration-500">
        <button
          id="toggleDesktop"
          onClick={toggleTheme}
          className="text-xl cursor-pointer transition-all duration-500"
        >
          {theme === "light" ? <FiMoon /> : <FiSun />}
        </button>

        {!user && (
          <>
            <div className="relative group">
              <NavLink
                to="/login"
                className="text-emerald-500 font-semibold hover:text-emerald-600 transition-all duration-500"
              >
                <MdLogin className="w-6 h-6" />
              </NavLink>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                Login
              </div>
            </div>

            <NavLink
              to="/registration"
              className="text-emerald-500 font-semibold hover:text-emerald-600 transition-all duration-500"
            >
              Signup
            </NavLink>
          </>
        )}

        {user && (
          <div
            className="relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <img
              src={user.photoURL}
              alt="User"
              className="h-10 w-10 rounded-full border-2 border-lime-600 cursor-pointer transition-all duration-500"
            />
            {showDropdown && (
              <div className="absolute right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 shadow-md rounded text-sm w-44 transition-all duration-500">
                <p className="font-medium text-gray-800 dark:text-gray-200 transition-all duration-500">
                  {user.displayName}
                </p>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `block mt-2 ${linkClasses(isActive)}`
                  }
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="mt-2 w-full text-left text-rose-500 hover:text-rose-600 cursor-pointer transition-all duration-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button
          className="text-2xl text-lime-600 cursor-pointer transition-all duration-500"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
        </button>
      </div>

      {/* Mobile NavMenu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 z-40 flex flex-col gap-4 p-5 shadow-md text-gray-800 dark:text-gray-200 font-inter md:hidden transition-all duration-500">
          {[
            ["/", "Home"],
            ["/apartment", "Apartment"],
            ["/communities", "Communities"],
          ].map(([path, label]) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => linkClasses(isActive)}
            >
              {label}
            </NavLink>
          ))}

          {user && (
            <NavLink
              to="/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => linkClasses(isActive)}
            >
              Dashboard
            </NavLink>
          )}

          <button
            id="toggleMobile"
            onClick={toggleTheme}
            className="text-xl w-fit cursor-pointer transition-all duration-500"
          >
            {theme === "light" ? <FiMoon /> : <FiSun />}
          </button>

          {!user && (
            <>
              <NavLink
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-emerald-500 font-semibold hover:text-emerald-600 transition-all duration-500"
              >
                <MdLogin className="w-6 h-6" />
              </NavLink>

              <NavLink
                to="/registration"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-emerald-500 font-semibold hover:text-emerald-600 transition-all duration-500"
              >
                Signup
              </NavLink>
            </>
          )}

          {user && (
            <div className="flex items-center gap-3">
              <img
                src={user.photoURL}
                alt="User"
                className="h-10 w-10 rounded-full border-2 border-lime-600 transition-all duration-500"
              />
              <div>
                <p className="font-medium transition-all duration-500">
                  {user.displayName}
                </p>
                <button
                  onClick={handleLogout}
                  className="text-rose-500 hover:text-rose-600 text-sm cursor-pointer transition-all duration-500"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
