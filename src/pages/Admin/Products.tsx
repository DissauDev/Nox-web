/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { PlusIcon } from "lucide-react";
import AddProductsForm from "./AddProductsForm";
import OptionsManager from "./OptionsManager";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUpdateProductStatusMutation,
} from "@/store/features/api/productsApi";
import type { Product } from "@/types/system";
import ActionMenu from "@/components/admin/ui/actionMenu";
import { DropDownCategories } from "@/components/admin/ui/dropDownCategories";
import { DataError } from "@/components/atoms/DataError";
import { TableSkeleton } from "@/components/skeletons/TableSkeleton";
import { toast } from "@/hooks/use-toast";

export const Products = () => {
  // 1️⃣ Load products from server
  const { data: products, isLoading, isError } = useGetProductsQuery();

  // 2️⃣ Mutations
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [updateStatus, { isLoading: isUpdatingStatus }] =
    useUpdateProductStatusMutation();

  // 3️⃣ Local UI state
  const [activeFilter, setActiveFilter] = useState<"all" | "AVAILABLE">("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [nameFilter, setNameFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<"products" | "options">(
    "products"
  );

  if (isLoading) return <TableSkeleton />;
  // 4️⃣ Filter & paginate (now using p.category, not p.categories)
  const filtered = products.filter((p) => {
    const byStatus = activeFilter === "all" || p.status === "AVAILABLE";
    const byName = p.name.toLowerCase().includes(nameFilter.toLowerCase());

    const byCategory =
      categoryFilter === "all" || p.category.name === categoryFilter;
    return byStatus && byName && byCategory;
  });
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filtered.length);
  const currentProducts = filtered.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  // 5️⃣ Form open/close
  const openForm = (prod?: Product) => {
    setEditingProduct(prod ?? null);
    setShowForm(true);
  };
  const closeForm = () => {
    setEditingProduct(null);
    setShowForm(false);
  };

  // 6️⃣ Handlers → call RTK mutations
  const handleSaveProduct = async (prod: Product) => {
    if (prod.id) {
      try {
        await updateProduct(prod).unwrap();
        toast({
          className:
            "bg-white text-gray-800 border border-gray-200 shadow-lg rounded-lg p-4",
          title: "✅ Success",
          description: "Save Successfully",
        });
      } catch (err) {
        toast({
          className:
            "bg-white text-gray-800 border border-gray-200 shadow-lg rounded-lg p-4",
          title: "❌ Error",
          description: err.message || "error to save product",
        });
      }
    } else {
      try {
        await createProduct(prod).unwrap();
        toast({
          className:
            "bg-white text-gray-800 border border-gray-200 shadow-lg rounded-lg p-4",
          title: "✅ Success",
          description: "Product created successfully",
        });
      } catch (err) {
        toast({
          className:
            "bg-white text-gray-800 border border-gray-200 shadow-lg rounded-lg p-4",
          title: "❌ Error",
          description: err.message || "error to create product",
        });
      }
    }
    closeForm();
  };
  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id).unwrap();
  };
  const handleToggleStatus = async (id: string) => {
    const p = products.find((x) => x.id === id);
    if (!p) return;
    await updateStatus({
      id,
      status: p.status === "AVAILABLE" ? "DISABLED" : "AVAILABLE",
    }).unwrap();
  };

  return (
    <div className="p-6 text-white">
      <div className="max-w-7xl mx-auto">
        {/* BREADCRUMB */}
        <div className="flex items-center space-x-2 mb-6 text-sm">
          <button
            onClick={() => setActiveTab("products")}
            className={`font-medium ${
              activeTab === "products" ? "text-white" : "text-gray-400"
            }`}
          >
            Products
          </button>
          <FaChevronRight className="text-gray-400" />
          <button
            onClick={() => setActiveTab("options")}
            className={`font-medium ${
              activeTab === "options" ? "text-white" : "text-gray-400"
            }`}
          >
            Options
          </button>
        </div>

        {activeTab === "products" ? (
          <>
            {/* HEADER */}
            <div className="flex flex-col md:flex-row items-start md:justify-between md:items-center mb-6">
              <h1 className="text-2xl font-bold my-4 text-white">
                Products List
              </h1>
              <div className="flex gap-2 w-full md:w-auto">
                <button
                  onClick={() => openForm()}
                  className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md flex items-center"
                >
                  <PlusIcon className="h-5 w-5 mr-1" />
                  Add Product
                </button>
                <button className="border border-gray-600 hover:bg-gray-800 text-white px-4 py-2 rounded-md">
                  Import
                </button>
                <button className="border border-gray-600 hover:bg-gray-800 text-white px-4 py-2 rounded-md">
                  Export
                </button>
              </div>
            </div>

            <div className="flex gap-4 z-20">
              {/* FORM COLUMN */}
              {showForm && (
                <div className="w-1/3">
                  <AddProductsForm
                    onClose={closeForm}
                    //@ts-ignore
                    onSave={handleSaveProduct}
                    //@ts-ignore
                    product={editingProduct ?? undefined}
                  />
                </div>
              )}

              {/* TABLE COLUMN */}
              <div
                className={`${
                  showForm ? "w-2/3" : "w-full"
                } p-6 border-2 border-[#7436A2] rounded-lg`}
              >
                {/* Filters */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {(["all", "active"] as const).map((f) => (
                    <button
                      key={f}
                      className={`px-4 py-2 rounded-md ${
                        activeFilter === f
                          ? "bg-gray-800 text-white"
                          : "border border-gray-600 text-gray-300"
                      }`}
                      onClick={() => {
                        //@ts-ignore
                        setActiveFilter(f);
                        setCurrentPage(1);
                      }}
                    >
                      {f === "all" ? "All Products" : "Active"}
                    </button>
                  ))}

                  <DropDownCategories
                    categoryFilter={categoryFilter}
                    setCategoryFilter={(c) => {
                      setCategoryFilter(c);
                      setCurrentPage(1);
                    }}
                    setCurrentPage={setCurrentPage}
                  />

                  <div className="relative flex-grow ml-2">
                    <input
                      type="text"
                      placeholder="Filter by product name"
                      className="bg-transparent border border-gray-600 rounded-md px-4 py-2 pl-10 w-full"
                      value={nameFilter}
                      onChange={(e) => {
                        setNameFilter(e.target.value);
                        setCurrentPage(1);
                      }}
                    />
                    <PlusIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-700">
                        {[
                          "PRODUCT",
                          "PRICE",
                          "CATEGORIES",
                          "TYPE",
                          "DATE",
                          "Actions",
                        ].map((th) => (
                          <th key={th} className="py-3 px-4 text-left">
                            {th}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {isError ? (
                        <DataError
                          title={"Error to show products"}
                          darkTheme={false}
                        />
                      ) : (
                        currentProducts.map((p) => (
                          <tr
                            key={p.id}
                            className="border-b border-gray-800 hover:bg-gray-900"
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <img
                                  src={p.imageLeft.url || "/placeholder.svg"}
                                  alt={p.name}
                                  className="w-10 h-10 rounded-md mr-3"
                                />
                                <div>
                                  <div className="font-medium">{p.name}</div>
                                  <div
                                    className={`text-xs mt-1 px-2 py-0.5 rounded-full inline-block ${
                                      p.status === "AVAILABLE"
                                        ? "bg-teal-900 text-teal-300"
                                        : "bg-red-900 text-red-300"
                                    }`}
                                  >
                                    {p.status}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">${p.price}</td>
                            <td className="py-3 px-4">
                              {" "}
                              <div className="flex flex-wrap gap-1">
                                <span className="text-xs">
                                  {p.category.name}
                                </span>{" "}
                              </div>{" "}
                            </td>
                            <td className="py-3 px-4 text-xs">{p.type}</td>
                            <td className="py-3 px-4 text-sm text-gray-400">
                              {new Date(p.createdAt).toLocaleDateString(
                                "es-ES",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                }
                              )}
                            </td>

                            <td className="py-3 px-4 text-center relative">
                              <ActionMenu
                                onEdit={() => openForm(p)}
                                isDeleting={isDeleting || isUpdatingStatus}
                                onDelete={() => handleDeleteProduct(p.id)}
                                onToggleStatus={() => handleToggleStatus(p.id)}
                                isAvailable={p.status === "AVAILABLE"}
                              />
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
                  <div>
                    {filtered.length > 0
                      ? `${startIndex + 1}-${endIndex} of ${
                          filtered.length
                        } items`
                      : "No items"}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="w-8 h-8 flex items-center justify-center rounded border border-gray-600 disabled:opacity-50"
                    >
                      &lt;
                    </button>
                    <span className="px-2">{currentPage}</span>
                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages || totalPages === 0}
                      className="w-8 h-8 flex items-center justify-center rounded border border-gray-600 disabled:opacity-50"
                    >
                      &gt;
                    </button>
                    <span className="px-2">of</span>
                    <span className="px-2">{totalPages}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <OptionsManager />
        )}
      </div>
    </div>
  );
};
