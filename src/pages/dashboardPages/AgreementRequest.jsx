// src/components/dashboard/AgreementRequest.jsx
import { useContext, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../utils/useAxiosSecure";
import { AuthContext } from "../../provider/AuthProvider";
import Loading from "../../utils/Loading";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

const AgreementRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  const queryClient = useQueryClient();

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  // ✅ Fetch logged-in user's role
  const { data: roleData, isLoading: loadingRole } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data;
    },
  });

  // ✅ Fetch pending agreements
  const {
    data: requests = [],
    isLoading: loadingRequests,
  } = useQuery({
    queryKey: ["pendingAgreements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/agreements?status=pending");
      return res.data;
    },
  });

  // ✅ Accept or Reject Agreement
  const handleAction = async (id, email, action) => {
    try {
      // 1. Update agreement status to "checked"
      await axiosSecure.patch(`/agreements/${id}/status`, { status: "checked" });

      // 2. If accepted, update user role to "member"
      if (action === "accept") {
        await axiosSecure.patch("/users/role", {
          email,
          role: "member",
        });
      }

      // 3. Refetch data
      queryClient.invalidateQueries(["pendingAgreements"]);
      Swal.fire("Success", `Request has been ${action}ed.`, "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  if (loading || loadingRole || loadingRequests) return <Loading />;

  return (
    <section
      className="p-4 sm:p-8 bg-gray-50 dark:bg-gray-900 transition-all duration-500"
      data-aos="fade-up"
    >
      <h2 className="text-2xl font-semibold font-poppins text-gray-800 dark:text-gray-200 mb-6">
        Pending Agreement Requests
      </h2>

      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full text-sm text-gray-800 dark:text-gray-200 font-inter text-center">
          <thead className="bg-gray-200 dark:bg-slate-700">
            <tr>
              <th className="px-4 py-2">User Name</th>
              <th className="px-4 py-2">User Email</th>
              <th className="px-4 py-2">Floor No</th>
              <th className="px-4 py-2">Block</th>
              <th className="px-4 py-2">Room No</th>
              <th className="px-4 py-2">Rent</th>
              <th className="px-4 py-2">Request Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr
                key={req._id}
                className="border-b border-gray-300 dark:border-gray-600"
              >
                <td className="px-4 py-2">{req.userName}</td>
                <td className="px-4 py-2">{req.userEmail}</td>
                <td className="px-4 py-2">{req.floorNo}</td>
                <td className="px-4 py-2">{req.blockName}</td>
                <td className="px-4 py-2">{req.apartmentNo || req.roomNo}</td>
                <td className="px-4 py-2">${req.rent}</td>
                <td className="px-4 py-2">
                  {new Date(req.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleAction(req._id, req.userEmail, "accept")}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded duration-300 cursor-pointer"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleAction(req._id, req.userEmail, "reject")}
                    className="bg-rose-500 hover:bg-rose-600 text-white px-3 py-1 rounded duration-300 cursor-pointer"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td
                  colSpan="8"
                  className="text-center px-4 py-6 text-gray-500 dark:text-gray-400"
                >
                  No pending requests.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AgreementRequest;
