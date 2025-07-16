// ✅ ManageCoupons.jsx
import { useContext, useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../provider/AuthProvider";
import axiosSecure from "../../utils/axiosSecure";
import Swal from "sweetalert2";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import Loading from "../../utils/Loading";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const ManageCoupons = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons");
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (coupon) => {
      const method = editData ? "patch" : "post";
      const url = editData ? `/coupons/${editData._id}` : "/coupons";
      return axiosSecure[method](url, coupon);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["coupons"]);
      Swal.fire("Success", `Coupon ${editData ? "updated" : "added"} successfully!`, "success");
      setModalOpen(false);
      setEditData(null);
    },
    onError: () => {
      Swal.fire("Error", "Something went wrong!", "error");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const discount = parseFloat(form.discount.value);
    const validTill = form.validTill.value;
    const code = form.code.value;
    if (!title || !description || !discount || !validTill || !code) return;

    const coupon = { title, description, discount, validTill, code };
    mutation.mutate(coupon);
  };

  const handleEdit = (coupon) => {
    setEditData(coupon);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/coupons/${id}`).then(() => {
          queryClient.invalidateQueries(["coupons"]);
          Swal.fire("Deleted!", "Coupon has been deleted.", "success");
        });
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-4 transition-all duration-500" data-aos="fade-up">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold font-poppins text-gray-800 dark:text-gray-200">Manage Coupons</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-lime-600 hover:bg-lime-700 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FaPlus /> Add Coupon
        </button>
      </div>

      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full text-sm text-gray-800 dark:text-gray-200 font-inter">
          <thead className="bg-gray-200 dark:bg-slate-700">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Discount %</th>
              <th className="px-4 py-2 text-left">Valid Till</th>
              <th className="px-4 py-2 text-left">Code</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon._id} className="border-b border-gray-300 dark:border-gray-600">
                <td className="px-4 py-2">{coupon.title}</td>
                <td className="px-4 py-2">{coupon.description}</td>
                <td className="px-4 py-2">{coupon.discount}%</td>
                <td className="px-4 py-2">{coupon.validTill}</td>
                <td className="px-4 py-2">{coupon.code}</td>
                <td className="px-4 py-2 space-x-2 text-center">
                  {user?.role === "admin" && (
                    <>
                      <button
                        onClick={() => handleEdit(coupon)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(coupon._id)}
                        className="text-rose-600 hover:text-rose-800"
                      >
                        <FaTrash />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-slate-800 p-6 rounded-md w-full max-w-lg shadow-xl space-y-4"
            data-aos="zoom-in"
          >
            <h3 className="text-xl font-semibold font-poppins text-gray-800 dark:text-gray-200">
              {editData ? "Edit Coupon" : "Add New Coupon"}
            </h3>

            <input
              name="title"
              defaultValue={editData?.title}
              placeholder="Coupon Title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-slate-700 dark:text-white"
              required
            />
            <textarea
              name="description"
              defaultValue={editData?.description}
              placeholder="Coupon Description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-slate-700 dark:text-white"
              required
            ></textarea>
            <input
              name="discount"
              type="number"
              defaultValue={editData?.discount}
              placeholder="Discount %"
              className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-slate-700 dark:text-white"
              required
            />
            <input
              name="validTill"
              type="date"
              defaultValue={editData?.validTill}
              className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-slate-700 dark:text-white"
              required
            />
            <input
              name="code"
              defaultValue={editData?.code}
              placeholder="Coupon Code"
              className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-slate-700 dark:text-white"
              required
            />

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-lime-600 hover:bg-lime-700 text-white px-4 py-2 rounded"
              >
                {editData ? "Update" : "Submit"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setModalOpen(false);
                  setEditData(null);
                }}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageCoupons;
