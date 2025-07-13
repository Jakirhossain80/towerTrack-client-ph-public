import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MdApartment } from "react-icons/md";
import { FaMoneyBill } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";
import axiosSecure from "../../utils/axiosSecure";
import Loading from "../../utils/Loading";

const Apartment = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const {
    data: apartments,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["apartments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/apartments");
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.post("/agreements", data);
      return res.data;
    },
    onSuccess: (data) => {
      Swal.fire("Success", "Agreement submitted successfully!", "success");
      queryClient.invalidateQueries(["apartments"]);
    },
    onError: (error) => {
      Swal.fire("Error", error.response?.data?.message || "Something went wrong!", "error");
    },
  });

  const handleAgreement = (apartment) => {
    if (!user) {
      navigate("/login");
      return;
    }

    const agreementData = {
      userName: user.displayName,
      userEmail: user.email,
      floorNo: apartment.floor,
      blockName: apartment.block,
      apartmentNo: apartment.apartmentNo,
      rent: apartment.rent,
      status: "pending",
    };

    mutation.mutate(agreementData);
  };

  if (loading || isLoading) return <Loading />;
  if (isError) return <p className="text-center text-rose-500">Failed to load apartments.</p>;

  return (
    <div className="px-4 py-12 bg-gray-50 dark:bg-gray-900 transition-all duration-500 min-h-screen">
      <h1
        data-aos="fade-up"
        className="text-3xl md:text-4xl font-poppins font-semibold text-center mb-10 text-gray-800 dark:text-gray-200"
      >
        Available Apartments
      </h1>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {apartments?.map((apt) => (
          <div
            key={apt._id}
            data-aos="zoom-in"
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-gray-300 dark:border-white/10 transition-all duration-500"
          >
            <img
              src={apt.image}
              alt={apt.apartmentNo}
              className="w-full h-56 object-cover"
            />
            <div className="p-6 space-y-2 text-gray-800 dark:text-gray-200 font-inter">
              <div className="flex items-center gap-2">
                <MdApartment className="text-xl text-emerald-500" />
                <span className="text-lg font-medium">{apt.apartmentNo}</span>
              </div>
              <p>Floor: <span className="font-semibold">{apt.floor}</span></p>
              <p>Block: <span className="font-semibold">{apt.block}</span></p>
              <p className="flex items-center gap-2">
                <FaMoneyBill className="text-green-500" />
                <span>Rent: ৳{apt.rent}</span>
              </p>
              <button
                onClick={() => handleAgreement(apt)}
                className="mt-4 w-full py-2 px-4 rounded-full bg-lime-600 hover:bg-lime-700 text-white font-semibold transition-all duration-300 cursor-pointer"
              >
                Agreement
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Apartment;
