// src/pages/dashboard/MakePayment.jsx
import { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../utils/Loading";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const MakePayment = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ Fetch user role
  const { data: roleData, isLoading: loadingRole } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`https://tower-track-server.vercel.app/users/role/${user.email}`);
      return res.data;
    },
  });

  // ✅ Fetch user's agreement
  const {
    data: agreement = {},
    isLoading,
  } = useQuery({
    queryKey: ["agreement", user?.email],
    queryFn: async () => {
      const res = await axios.get(`https://tower-track-server.vercel.app/agreements/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    navigate("/dashboard/make-payment-details", { state: { ...agreement, ...data } });
  };

  if (isLoading || loadingRole) return <Loading />;

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
        <div className="form-control">
          <label className="label">
            <span className="label-text dark:text-gray-200">Member Name</span>
          </label>
          <input
            readOnly
            {...register("userName")}
            value={agreement.userName || ""}
            className="input input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text dark:text-gray-200">Member Email</span>
          </label>
          <input
            readOnly
            {...register("userEmail")}
            value={agreement.userEmail || ""}
            className="input input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text dark:text-gray-200">Floor</span>
          </label>
          <input
            readOnly
            {...register("floorNo")}
            value={agreement.floorNo || ""}
            className="input input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text dark:text-gray-200">Block Name</span>
          </label>
          <input
            readOnly
            {...register("blockName")}
            value={agreement.blockName || ""}
            className="input input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text dark:text-gray-200">Apartment / Room No</span>
          </label>
          <input
            readOnly
            {...register("apartmentNo")}
            value={agreement.apartmentNo || ""}
            className="input input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text dark:text-gray-200">Rent Amount (৳)</span>
          </label>
          <input
            readOnly
            {...register("rent")}
            value={agreement.rent || ""}
            className="input input-bordered"
          />
        </div>

        <div className="form-control col-span-1 md:col-span-2">
          <label className="label">
            <span className="label-text dark:text-gray-200 px-2">Select Month</span>
          </label>
          <select
            {...register("month", { required: true })}
            className="select select-bordered"
          >
            <option value="">Select Month</option>
            {[
              "January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December",
            ].map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

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
