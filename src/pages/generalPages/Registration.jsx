import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from "../../provider/AuthProvider";
import { updateProfile } from 'firebase/auth';
import LottieAnimation from '../../utils/LottieAnimation';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Registration = () => {
  const { createUser } = useContext(AuthContext); // ❌ removed setUser
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: '',
  });

  const [passwordError, setPasswordError] = useState('');
  const { name, email, photoURL, password } = formData;

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'password') setPasswordError('');
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (pwd) => {
    const hasUppercase = /[A-Z]/.test(pwd);
    const hasLowercase = /[a-z]/.test(pwd);
    const isLongEnough = pwd.length >= 6;

    if (!hasUppercase) {
      setPasswordError('Password must contain at least one uppercase letter.');
      return false;
    }
    if (!hasLowercase) {
      setPasswordError('Password must contain at least one lowercase letter.');
      return false;
    }
    if (!isLongEnough) {
      setPasswordError('Password must be at least 6 characters long.');
      return false;
    }

    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !photoURL || !password) {
      Swal.fire('Please fill in all fields.');
      return;
    }

    if (!validateEmail(email)) {
      Swal.fire('Invalid email format.');
      return;
    }

    if (!validatePassword(password)) return;

    try {
      const result = await createUser(email, password, name);
      const user = result.user;

      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });

      // ✅ No manual setUser — rely on Firebase listener
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'Your account has been created!',
        timer: 1500,
        showConfirmButton: false,
      });

      navigate('/');
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4 transition-all duration-500">
      <div
        className="flex flex-col md:flex-row items-center gap-10 px-8 py-12 rounded-3xl 
        bg-white dark:bg-slate-800 
        shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] 
        dark:shadow-[8px_8px_16px_#1f2937,-8px_-8px_16px_#374151]"
        data-aos="zoom-in"
      >
        <div
          className="w-full sm:w-96 bg-white dark:bg-slate-800 p-8 rounded-3xl 
          shadow-[inset_6px_6px_12px_#d1d9e6,inset_-6px_-6px_12px_#ffffff] 
          dark:shadow-[inset_6px_6px_12px_#1f2937,inset_-6px_-6px_12px_#374151] 
          transition-all duration-500"
        >
          <div className="text-center mb-6">
            <FaUserPlus className="text-3xl text-lime-600 dark:text-lime-500 mx-auto mb-2 transition-all duration-500" />
            <h2 className="text-2xl font-bold font-[Poppins] text-lime-600 dark:text-lime-500 transition-all duration-500">
              Create Your TowerTrack Account
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={name}
              onChange={handleChange}
              className="w-full p-3 rounded-xl mb-4 bg-gray-100 dark:bg-gray-700 shadow-inner border-none focus:outline-none focus:ring-2 focus:ring-lime-600 dark:focus:ring-lime-500 transition-all duration-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
              className="w-full p-3 rounded-xl mb-4 bg-gray-100 dark:bg-gray-700 shadow-inner border-none focus:outline-none focus:ring-2 focus:ring-lime-600 dark:focus:ring-lime-500 transition-all duration-500"
            />

            <input
              type="text"
              name="photoURL"
              placeholder="Photo URL"
              value={photoURL}
              onChange={handleChange}
              className="w-full p-3 rounded-xl mb-4 bg-gray-100 dark:bg-gray-700 shadow-inner border-none focus:outline-none focus:ring-2 focus:ring-lime-600 dark:focus:ring-lime-500 transition-all duration-500"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              className="w-full p-3 rounded-xl mb-2 bg-gray-100 dark:bg-gray-700 shadow-inner border-none focus:outline-none focus:ring-2 focus:ring-lime-600 dark:focus:ring-lime-500 transition-all duration-500"
            />
            {passwordError && (
              <p className="text-sm text-rose-500 mb-4 transition-all duration-500">{passwordError}</p>
            )}

            <button
              type="submit"
              className="w-full bg-lime-600 text-white py-2 px-4 rounded-xl hover:bg-lime-700 transition-all duration-500 cursor-pointer shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#1f2937,-4px_-4px_8px_#374151]"
            >
              Register
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-700 dark:text-gray-400 transition-all duration-500">
            Already have a TowerTrack account?{' '}
            <Link
              to="/login"
              className="text-lime-600 dark:text-lime-500 hover:underline font-medium transition-all duration-500"
            >
              Login here
            </Link>
          </p>
        </div>

        <div className="hidden md:block">
          <LottieAnimation src="/registration-lime.json" width="500px" height="500px" />
        </div>
      </div>
    </div>
  );
};

export default Registration;
