/* eslint-disable @typescript-eslint/ban-ts-comment */
// src/components/Employees.tsx
import React, { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight, Edit2, Trash2 } from "lucide-react";
import {
  useGetStaffUsersQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
} from "@/store/features/api/userApi";
import { User } from "@/types/system";

import { useForm, Controller } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { FaPlus } from "react-icons/fa6";
import { useToast } from "@/hooks/use-toast";
import DeleteModal from "@/components/ui/DeleteModal";

interface FormValues {
  name: string;
  email: string;
  password?: string;
  role: "ADMIN" | "EMPLOYEE";
}

export const Employees: React.FC = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data: result,
    isLoading,
    isError,
  } = useGetStaffUsersQuery(
    { search, page, limit },
    { refetchOnMountOrArgChange: true }
  );
  const users = result?.data || [];
  const meta = result?.meta;
  // after your other useState calls
  const [roleValue, setRoleValue] = useState<"ADMIN" | "EMPLOYEE">("EMPLOYEE");

  const [deleteUser] = useDeleteUserMutation();
  const [createUser, { isLoading: creating }] = useCreateUserMutation();
  const [updateUser, { isLoading: updating }] = useUpdateUserMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [toDeleteId, setToDeleteId] = useState<string | null>(null);

  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    if (editingUser) {
      reset({
        name: editingUser.name!,
        email: editingUser.email,
        //@ts-ignore
        role: editingUser.role,
      });
      //@ts-ignore
      setRoleValue(editingUser.role);
    } else {
      reset({ name: "", email: "", password: "", role: "EMPLOYEE" });
      setRoleValue("EMPLOYEE");
    }
  }, [editingUser, reset]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id).unwrap();
      toast({
        title: "Success",
        description: "User deleted successfully.",
      });
    } catch (err) {
      toast({
        title: "Fail to delete",
        description: err.data?.message || err.error || "Operation failed",
      });
    }
  };
  // Called by modal's confirm button
  const confirmDelete = async () => {
    if (!toDeleteId) return;
    await handleDelete(toDeleteId);
    setDeleteModalOpen(false);
    setToDeleteId(null);
  };
  const openCreateModal = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const onSubmit = async (data: FormValues) => {
    try {
      if (editingUser) {
        //@ts-ignore
        await updateUser({ id: editingUser.id, data }).unwrap();
        toast({
          title: "Success",
          description: "User updated successfully.",
        });
      } else {
        //@ts-ignore
        await createUser(data).unwrap();
        toast({
          title: "Success",
          description: "Form submitted successfully.",
        });
      }
      setIsModalOpen(false);
    } catch (err) {
      toast({
        title: "Fail",
        description: err.data?.message || err.error || "Operation failed",
      });
    }
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl my-4 font-semibold">Employees</h1>

      <div className="border-2 border-[#7436A2] rounded-lg shadow p-6">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-3 md:space-y-0">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-3 flex items-center">
              <Search className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search employees..."
              className="w-3/5 pl-10 pr-4 py-2 bg-transparent border-[#036666] border-2 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#3acaca]"
            />
          </div>
          <button
            onClick={openCreateModal}
            className="bg-yellow-400 flex justify-center items-center hover:bg-yellow-500 text-xl text-black font-bold py-2 px-6 rounded transition"
          >
            <FaPlus className="mr-2" /> Add
          </button>
        </div>

        {/* Table */}
        <div className="w-full md:overflow-x-auto overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          <table className="min-w-max divide-y divide-gray-700 w-full">
            <thead>
              <tr className="bg-gray-800">
                {["Name", "Email", "Role", "Created At", "Actions"].map(
                  (hdr) => (
                    <th
                      key={hdr}
                      className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400 whitespace-nowrap"
                    >
                      {hdr}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {isLoading &&
                Array.from({ length: 3 }).map((_, i) => (
                  <tr
                    key={i}
                    className="hover:bg-transparent transition-colors duration-150"
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="h-4 bg-gray-700 rounded w-24" />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="h-4 bg-gray-700 rounded w-32" />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="h-4 bg-gray-700 rounded w-20" />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="h-4 bg-gray-700 rounded w-28" />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap space-x-2">
                      <div className="inline-block h-5 w-5 bg-gray-700 rounded" />
                      <div className="inline-block h-5 w-5 bg-gray-700 rounded" />
                    </td>
                  </tr>
                ))}
              {isError && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-3 text-center text-red-500 font-ArialBold"
                  >
                    Error loading employees
                  </td>
                </tr>
              )}
              {!isLoading && !isError && users.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-3 text-center text-gray-400"
                  >
                    No employees found
                  </td>
                </tr>
              )}
              {!isLoading &&
                !isError &&
                users.map((u: User) => (
                  <tr
                    key={u.id}
                    className="hover:bg-gray-700 transition-colors duration-150"
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      {u.name || "—"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{u.email}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{u.role}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {formatDate(u.createdAt)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap space-x-2">
                      <button
                        onClick={() => openEditModal(u)}
                        className="p-1 hover:text-green-400"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="p-1 hover:text-red-400"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {meta && (
          <div className="mt-4 flex justify-center items-center space-x-4">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
            >
              <ChevronLeft className="inline h-4 w-4" />
            </button>
            <span className="text-gray-400 text-sm">
              Page {page} of {meta.totalPages}
            </span>
            <button
              onClick={() => setPage((p) => (p < meta.totalPages ? p + 1 : p))}
              disabled={page === meta.totalPages}
              className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
            >
              <ChevronRight className="inline h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-gray-900 text-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingUser ? "Edit Employee" : "Add Employee"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className="mt-1 block w-full border border-gray-700 rounded-md p-2 bg-gray-800"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              {/* Email */}
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email",
                    },
                  })}
                  className="mt-1 block w-full border border-gray-700 rounded-md p-2 bg-gray-800"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              {/* Password (only for add) */}
              {!editingUser && (
                <div>
                  <label className="block text-sm font-medium">Password</label>
                  <input
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Min 6 chars" },
                    })}
                    className="mt-1 block w-full border border-gray-700 rounded-md p-2 bg-gray-800"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              )}
              {/* Role */}
              <div>
                <label className="block text-sm font-medium">Role</label>
                <Controller
                  name="role"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      onValueChange={(val) => {
                        field.onChange(val);
                        //@ts-ignore
                        setRoleValue(val);
                      }}
                      value={roleValue}
                    >
                      <SelectTrigger className="mt-1 w-full border border-gray-700 rounded-md p-2 bg-gray-800">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EMPLOYEE">Employee</SelectItem>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              {/* Actions */}
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-grape-800 rounded hover:bg-grape-900 disabled:opacity-50"
                  disabled={creating || updating}
                >
                  {editingUser
                    ? updating
                      ? "Saving..."
                      : "Save"
                    : creating
                    ? "Creating..."
                    : "Create"}
                </button>
              </div>
              <DeleteModal
                isOpen={deleteModalOpen}
                onClose={() => {
                  setDeleteModalOpen(false);
                  setToDeleteId(null);
                }}
                onConfirm={confirmDelete}
                message="Do you really want to delete this user?"
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
