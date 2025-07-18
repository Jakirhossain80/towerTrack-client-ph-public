// src/pages/dashboard/MakePaymentDetails.jsx
import { useLocation } from "react-router-dom";
import { useState } from "react";
import useAxiosSecure from "../../utils/useAxiosSecure";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

AOS.init();

const MakePaymentDetails = () => {
  const { state } = useLocation();
  const axiosSecure = useAxiosSecure();
  const [coupon, setCoupon] = useState("");
  const [discountedRent, setDiscountedRent] = useState(state?.rent);
  const [couponApplied, setCouponApplied] = useState(false);

  const handleApplyCoupon = async () => {
    try {
      const res = await axiosSecure.post("/validate-coupon", { code: coupon });
      const { valid, discountPercentage } = res.data;
      if (valid) {
        const discounted = state.rent - (state.rent * discountPercentage) / 100;
        setDiscountedRent(discounted);
        setCouponApplied(true);
        Swal.fire("Coupon Applied!", `You got ${discountPercentage}% off.`, "success");
      } else {
        throw new Error("Invalid or expired coupon");
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
      setCouponApplied(false);
    }
  };

  return (
    <div
      className="max-w-4xl mx-auto px-8 py-10 bg-white dark:bg-slate-800 rounded-xl shadow-lg mt-6 font-inter"
      data-aos="zoom-in"
    >
      <h2 className="text-2xl font-poppins font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Payment Summary
      </h2>
      <div className="space-y-2 mb-4">
        {Object.entries(state || {}).map(([key, value]) => {
          if (
            key === "_id" ||
            key === "status" ||
            key === "createdAt" ||
            key === "updatedAt"
          ) {
            return null;
          }

          return (
            <p key={key} className="text-gray-800 dark:text-gray-200">
              <span className="font-semibold capitalize">
                {key.replace(/([A-Z])/g, " $1")}:{" "}
              </span>
              {value}
            </p>
          );
        })}
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter Coupon Code"
          className="input input-bordered flex-1"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
        />
        <button
          onClick={handleApplyCoupon}
          className="btn bg-emerald-500 hover:bg-emerald-600 text-white transition-all duration-500"
        >
          Apply Coupon
        </button>
      </div>

      {couponApplied && (
        <p className="text-green-600 font-semibold mb-2">
          New Rent Amount: ৳{discountedRent}
        </p>
      )}

      <button
        className="btn bg-lime-500 hover:bg-lime-600 text-white mt-4 transition-all duration-500"
        onClick={() =>
          Swal.fire(
            "Payment Simulated",
            "This is where Stripe will be integrated.",
            "success"
          )
        }
      >
        Pay Now
      </button>
    </div>
  );
};

export default MakePaymentDetails;
