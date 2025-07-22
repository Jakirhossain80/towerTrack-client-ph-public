import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { AuthContext } from "../../provider/AuthProvider";
import { useLocation } from "react-router";
import { showSuccessAlert, showErrorAlert } from "../../utils/SweetAlert";
import LottieAnimation from "../../utils/LottieAnimation";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const Login = () => {
  const { signIn, googleLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showErrorAlert("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const result = await signIn(email, password);
      const loggedInUser = result.user;

      const saveUser = {
        email: loggedInUser.email,
        name: loggedInUser.displayName || "No Name",
        role: "user",
      };

      await axios.post("https://tower-track-server.vercel.app/users", saveUser);
      navigate(location.state || "/");
      showSuccessAlert("Welcome back to TowerTrack!");
    } catch (err) {
      showErrorAlert("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await googleLogin();
      const user = result.user;

      const saveUser = {
        email: user.email,
        name: user.displayName || "Google User",
        role: "user",
      };

      await axios.post("https://tower-track-server.vercel.app/users", saveUser);
      navigate(location.state || "/");
      showSuccessAlert("Google login successful! Redirecting to TowerTrack...");

      try {
        if (window.opener != null) window.close();
      } catch (err) {
        console.warn("window.close blocked by policy:", err);
      }
    } catch (err) {
      showErrorAlert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 transition-all duration-500">
      <div
        data-aos="zoom-in"
        className="flex flex-col md:flex-row items-center gap-12 px-8 py-12 rounded-3xl 
        border border-white/20 dark:border-white/10 shadow-2xl 
        backdrop-blur-md bg-white/30 dark:bg-white/10"
      >
        {/* Login Card */}
        <div className="w-full sm:w-96 p-8 rounded-3xl backdrop-blur-lg bg-white/30 dark:bg-white/10 border border-white/20 dark:border-white/10 shadow-lg transition-all duration-500">
          <h2 className="text-2xl font-bold text-lime-600 dark:text-lime-500 mb-8 text-center font-poppins">
            Login to TowerTrack
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              autoComplete="email"
              className="w-full px-4 py-3 rounded-xl bg-gray-200/60 dark:bg-white/10 border border-white/20 dark:border-white/10 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-lime-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                autoComplete="current-password"
                className="w-full px-4 py-3 rounded-xl bg-gray-200/60 dark:bg-white/10 border border-white/20 dark:border-white/10 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-lime-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-600 dark:text-gray-400"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="text-xl" />
                ) : (
                  <AiOutlineEye className="text-xl" />
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-lime-600 hover:bg-lime-700 text-white font-medium py-3 rounded-xl transition-all duration-300 flex items-center justify-center shadow-md cursor-pointer"
            >
              {loading ? (
                <span className="loader border-2 border-white border-t-transparent rounded-full w-5 h-5 animate-spin"></span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="flex items-center gap-2 my-5">
            <div className="flex-grow border-t border-white/30 dark:border-white/20" />
            <span className="text-sm text-gray-600 dark:text-gray-400">or</span>
            <div className="flex-grow border-t border-white/30 dark:border-white/20" />
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full bg-gray-100 dark:bg-white/10 py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-white/20 text-gray-800 dark:text-gray-200 border border-white/20 dark:border-white/10 flex items-center justify-center gap-3 cursor-pointer"
          >
            <FcGoogle className="text-2xl" />
            Continue with Google
          </button>

          <p className="mt-1 text-center text-sm text-gray-700 dark:text-gray-400">
            Don’t have an account?{" "}
            <Link
              to="/registration"
              className="text-lime-600 dark:text-lime-500 hover:underline font-medium"
            >
              Register here
            </Link>
          </p>
        </div>

        {/* Lottie Animation */}
        <div className="hidden md:block">
          <LottieAnimation
            src="/login-lime.json"
            width="500px"
            height="500px"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
