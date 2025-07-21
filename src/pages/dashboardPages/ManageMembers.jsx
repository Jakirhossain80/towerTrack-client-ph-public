import React, { useContext, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import useAxiosSecure from "../../utils/useAxiosSecure"; // 🔐 Secure Axios instance
import Loading from "../../utils/Loading"; // ⏳ Reusable loading spinner
import AOS from "aos";
import "aos/dist/aos.css";

const ManageMembers = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // 🔐 Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  // ✅ Fetch user role securely
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

  const role = roleData?.role;

  // 📦 Fetch all members
  const {
    data: members = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data?.filter((u) => u?.role === "member");
    },
  });

  // 🔁 Mutation to remove member (make them 'user')
  const mutation = useMutation({
    mutationFn: async (email) => {
      const res = await axiosSecure.patch(`/users/${email}`, {
        role: "user",
      });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Updated!", "Member has been removed.", "success");
      queryClient.invalidateQueries(["members"]);
    },
    onError: () => {
      Swal.fire("Error", "Failed to remove member.", "error");
    },
  });

  // 🔘 Remove handler with confirmation
  const handleRemove = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "They will lose access to the member dashboard.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#84cc16", // lime-500
      cancelButtonColor: "#ef4444", // rose-500
      confirmButtonText: "Yes, remove",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(email);
      }
    });
  };

  if (loading || isLoading || roleLoading) return <Loading />;
  if (isError) return <p className="text-center text-rose-500">Failed to load members.</p>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-all duration-500">
      <h1
        className="text-3xl font-poppins font-semibold text-gray-800 dark:text-gray-200 mb-8 text-center"
        data-aos="fade-up"
      >
        <FaUsers className="inline mr-2 text-lime-500" />
        Manage Members
      </h1>

      <div
        className="overflow-x-auto shadow-lg rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-slate-800 transition-all duration-500"
        data-aos="zoom-in"
      >
        <table className="min-w-full text-sm text-left text-gray-800 dark:text-gray-200 font-inter">
          <thead className="text-xs uppercase bg-gray-100 dark:bg-slate-700">
            <tr>
              <th scope="col" className="px-6 py-4">#</th>
              <th scope="col" className="px-6 py-4">Name</th>
              <th scope="col" className="px-6 py-4">Email</th>
              <th scope="col" className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {members?.map((member, index) => (
              <tr key={member._id} className="border-t border-gray-300 dark:border-white/10">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{member?.name || "N/A"}</td>
                <td className="px-6 py-4">{member?.email}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleRemove(member?.email)}
                    className="px-4 py-1 text-sm bg-rose-500 hover:bg-rose-600 text-white rounded-md shadow-md transition-all duration-300 flex items-center gap-2 mx-auto cursor-pointer"
                  >
                    <FaTrashAlt /> Remove
                  </button>
                </td>
              </tr>
            ))}
            {members?.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-6 text-gray-500 dark:text-gray-400"
                >
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMembers;
