// src/pages/dashboard/PaymentHistory.jsx
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosSecure from "../../utils/useAxiosSecure";
import Loading from "../../utils/Loading";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaMoneyCheckAlt } from "react-icons/fa";

AOS.init();

const PaymentHistory = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: payments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/payments/user/${user.email}`);
        return res.data;
      } catch (error) {
        Swal.fire("Error", "Failed to fetch payment history.", "error");
        return [];
      }
    },
  });

  if (loading || isLoading) return <Loading />;

  return (
    <div
      className="max-w-6xl mx-auto px-4 py-8 font-inter"
      data-aos="fade-up"
    >
      <h2 className="text-2xl font-poppins font-semibold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
        <FaMoneyCheckAlt className="text-lime-600" /> Payment History
      </h2>

      {payments.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No payment records found.</p>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-500">
          <table className="table w-full bg-white dark:bg-slate-800">
            <thead className="bg-lime-500 text-white dark:bg-lime-600">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Amount (৳)</th>
                <th className="px-4 py-3">Block</th>
                <th className="px-4 py-3">Floor</th>
                <th className="px-4 py-3">Apartment</th>
                <th className="px-4 py-3">Month</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Transaction ID</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={payment._id} className="hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-500">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{payment.name}</td>
                  <td className="px-4 py-2">{payment.email}</td>
                  <td className="px-4 py-2">৳{payment.amount}</td>
                  <td className="px-4 py-2">{payment.block}</td>
                  <td className="px-4 py-2">{payment.floor}</td>
                  <td className="px-4 py-2">{payment.apartment}</td>
                  <td className="px-4 py-2">{payment.month}</td>
                  <td className="px-4 py-2 capitalize">{payment.status}</td>
                  <td className="px-4 py-2 text-emerald-500">{payment.transactionId}</td>
                  <td className="px-4 py-2">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
