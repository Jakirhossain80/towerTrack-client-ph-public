import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MdApartment } from "react-icons/md";
import { FaMoneyBill } from "react-icons/fa";
import { LiaWarehouseSolid } from "react-icons/lia";
import { CiSquareAlert } from "react-icons/ci";
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";
import useAxiosSecure from "../../utils/useAxiosSecure";

import Loading from "../../utils/Loading";

const Apartment = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [hasApplied, setHasApplied] = useState(false);

  const [minRent, setMinRent] = useState(0);
  const [maxRent, setMaxRent] = useState(Infinity);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // ✅ Fetch user role
  const {
    data: roleData,
    isLoading: roleLoading,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data;
    },
  });

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

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/agreements?email=${user.email}`)
        .then((res) => {
          if (res.data?.hasAgreement) setHasApplied(true);
        })
        .catch(() => {});
    }
  }, [user?.email]);

  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.post("/agreements", data);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success", "Agreement submitted successfully!", "success");
      setHasApplied(true);
      queryClient.invalidateQueries(["apartments"]);
    },
    onError: (error) => {
      if (error.response?.status === 409) {
        Swal.fire(
          "Duplicate",
          "You've already applied for an apartment.",
          "warning"
        );
        setHasApplied(true);
      } else {
        Swal.fire(
          "Error",
          error.response?.data?.message || "Something went wrong!",
          "error"
        );
      }
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

  const filteredApartments = apartments?.filter(
    (apt) => apt.rent >= minRent && apt.rent <= maxRent
  );

  const totalPages = Math.ceil(filteredApartments?.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedApartments = filteredApartments?.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  if (loading || isLoading || roleLoading) return <Loading />;
  if (isError)
    return (
      <p className="text-center text-rose-500">Failed to load apartments.</p>
    );

  return (
    <div className="px-4 py-12 bg-gray-50 dark:bg-gray-900 transition-all duration-500 min-h-screen">
      <h1
        data-aos="fade-up"
        className="text-3xl md:text-4xl font-poppins font-semibold text-center mb-10 text-gray-800 dark:text-gray-200"
      >
        Available Apartments
      </h1>

      {/* 🔍 Rent Range Filter */}
      <div className="max-w-3xl mx-auto mb-10 flex flex-col sm:flex-row items-center gap-4">
        <input
          type="number"
          value={minRent === 0 ? "" : minRent}
          onChange={(e) => setMinRent(Number(e.target.value) || 0)}
          placeholder="Min Rent"
          className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-200 w-full sm:w-auto"
        />
        <input
          type="number"
          value={maxRent === Infinity ? "" : maxRent}
          onChange={(e) => setMaxRent(Number(e.target.value) || Infinity)}
          placeholder="Max Rent"
          className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-200 w-full sm:w-auto"
        />
        <button
          onClick={() => {
            setMinRent(0);
            setMaxRent(Infinity);
          }}
          className="px-4 py-2 rounded-md bg-rose-500 text-white hover:bg-rose-600 cursor-pointer"
        >
          Clear Filter
        </button>
      </div>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedApartments?.map((apt) => (
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
                <span className="text-lg font-medium">Apartment No: {apt.apartmentNo}</span>
              </div>
              <p className="flex items-center gap-2">
                <LiaWarehouseSolid className="text-green-500" />
                <span>Floor: {apt.floor}</span>
              </p>
              <p className="flex items-center gap-2">
                <CiSquareAlert className="text-green-500" />
                <span>Block: {apt.block}</span>
              </p>
              <p className="flex items-center gap-2">
                <FaMoneyBill className="text-green-500" />
                <span>Rent: ৳{apt.rent}</span>
              </p>
              <button
                onClick={() => handleAgreement(apt)}
                disabled={hasApplied}
                className="mt-4 w-full py-2 px-4 rounded-full bg-lime-600 hover:bg-lime-700 text-white font-semibold transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Agreement
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 📄 Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center items-center gap-2 flex-wrap">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md border dark:border-white/20 bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-3 py-1 rounded-md border dark:border-white/20 font-medium transition-all duration-300 cursor-pointer ${
                page === currentPage
                  ? "bg-lime-600 text-white"
                  : "bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md border dark:border-white/20 bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Apartment;
