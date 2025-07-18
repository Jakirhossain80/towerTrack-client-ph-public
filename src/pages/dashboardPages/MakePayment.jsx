// src/pages/dashboard/MakePayment.jsx
import { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosSecure from "../../utils/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import Loading from "../../utils/Loading";
import AOS from "aos";
import "aos/dist/aos.css";


AOS.init();

const MakePayment = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: agreement = {},
    isLoading,
  } = useQuery({
    queryKey: ["agreement", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agreements/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    navigate("/dashboard/make-payment-details", { state: { ...agreement, ...data } });
  };

  if (isLoading) return <Loading />;

  return (
    <div
      className="max-w-3xl mx-auto p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg mt-6"
      data-aos="fade-up"
    >
      <h2 className="text-2xl font-poppins font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Rent Payment
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 font-inter"
      >
        <input
          readOnly
          {...register("userName")}
          value={agreement.userName || ""}
          className="input input-bordered"
        />
        <input
          readOnly
          {...register("userEmail")}
          value={agreement.userEmail || ""}
          className="input input-bordered"
        />
        <input
          readOnly
          {...register("floorNo")}
          value={agreement.floorNo || ""}
          className="input input-bordered"
        />
        <input
          readOnly
          {...register("blockName")}
          value={agreement.blockName || ""}
          className="input input-bordered"
        />
        <input
          readOnly
          {...register("apartmentNo")}
          value={agreement.apartmentNo || ""}
          className="input input-bordered"
        />
        <input
          readOnly
          {...register("rent")}
          value={agreement.rent || ""}
          className="input input-bordered"
        />

        <select
          {...register("month", { required: true })}
          className="select select-bordered col-span-1 md:col-span-2"
        >
          <option value="">Select Month</option>
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="btn bg-lime-500 hover:bg-lime-600 text-white col-span-1 md:col-span-2 transition-all duration-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default MakePayment;
