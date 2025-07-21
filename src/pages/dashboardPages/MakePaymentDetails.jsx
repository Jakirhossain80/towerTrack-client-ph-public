// src/pages/dashboard/MakePaymentDetails.jsx
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosSecure from "../../utils/useAxiosSecure";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import Loading from "../../utils/Loading";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

AOS.init();
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK); // 🔐 Your publishable key

const CheckoutForm = ({ rent, data }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [processing, setProcessing] = useState(false);

  const mutation = useMutation({
    mutationFn: async (paymentData) => {
      const res = await axiosSecure.post("/payments", paymentData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success", "Payment completed and saved!", "success");
    },
    onError: () => {
      Swal.fire("Error", "Payment recorded failed!", "error");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    try {
      const { data: clientSecret } = await axiosSecure.post("/create-payment-intent", {
        amount: rent,
        email: data.userEmail,
      });

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: data.userEmail,
          },
        },
      });

      if (result.error) {
        Swal.fire("Payment Failed", result.error.message, "error");
      } else if (result.paymentIntent.status === "succeeded") {
        mutation.mutate({
          name: data.userName,
          email: data.userEmail,
          amount: rent,
          apartment: data.apartmentNo,
          floor: data.floorNo,
          block: data.blockName,
          month: data.month,
          transactionId: result.paymentIntent.id,
          status: "completed",
          createdAt: new Date(),
        });

        const cardElement = elements.getElement(CardElement);
        if (cardElement) cardElement.clear();
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <CardElement className="p-4 border border-gray-300 rounded-md bg-white dark:bg-slate-700" />
      <button
        type="submit"
        disabled={!stripe || processing}
        className="btn bg-lime-500 hover:bg-lime-600 text-white w-full transition-all duration-500"
      >
        {processing ? "Processing..." : `Pay ৳${rent}`}
      </button>
    </form>
  );
};

const MakePaymentDetails = () => {
  const { state } = useLocation();
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [coupon, setCoupon] = useState("");
  const [discountedRent, setDiscountedRent] = useState(state?.rent);
  const [couponApplied, setCouponApplied] = useState(false);

  // ✅ Get user role from secure API
  const { data: roleData, isLoading: isRoleLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (state?.rent) setDiscountedRent(state.rent);
  }, [state]);

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

  if (loading || isRoleLoading || !state) return <Loading />;

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
          if (["_id", "status", "createdAt", "updatedAt"].includes(key)) return null;
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

      <Elements stripe={stripePromise}>
        <CheckoutForm rent={discountedRent} data={state} />
      </Elements>
    </div>
  );
};

export default MakePaymentDetails;
