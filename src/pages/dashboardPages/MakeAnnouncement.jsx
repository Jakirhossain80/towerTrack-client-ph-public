import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../provider/AuthProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { MdAnnouncement } from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

const MakeAnnouncement = () => {
  const { user, loading } = useContext(AuthContext);

  // ✅ Fetch logged-in user's role
  const { data: roleData, isLoading: loadingRole } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `https://tower-track-server.vercel.app/users/role/${user.email}`
      );
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const res = await axios.post("https://tower-track-server.vercel.app/announcements", formData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success", "Announcement posted!", "success");
      reset();
    },
    onError: () => {
      Swal.fire("Error", "Failed to post announcement", "error");
    },
  });

  const onSubmit = (data) => {
    const announcement = {
      title: data.title,
      description: data.description,
      createdAt: new Date(),
      postedBy: user?.email || "anonymous",
    };
    mutation.mutate(announcement);
  };

  return (
    <div
      className="max-w-3xl mx-auto mt-10 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md transition-all duration-500"
      data-aos="fade-up"
    >
      <h2 className="text-2xl font-semibold font-poppins text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2 transition-all duration-500">
        <MdAnnouncement className="text-lime-500" /> Post Announcement
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-inter">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1 transition-all duration-500">
            Title
          </label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-gray-200 focus:outline-lime-500 transition-all duration-500"
          />
          {errors.title && (
            <p className="text-rose-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1 transition-all duration-500">
            Description
          </label>
          <textarea
            {...register("description", { required: "Description is required" })}
            rows="5"
            className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-gray-200 focus:outline-lime-500 transition-all duration-500"
          ></textarea>
          {errors.description && (
            <p className="text-rose-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-lime-500 hover:bg-lime-600 text-white px-6 py-3 rounded-lg font-semibold font-poppins transition-all duration-500 disabled:opacity-60 cursor-pointer"
        >
          {mutation.isPending ? "Posting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default MakeAnnouncement;
