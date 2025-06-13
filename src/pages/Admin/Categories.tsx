import { Fragment, useState, useMemo } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, PlusIcon } from "lucide-react";

import AddCategoryForm from "@/components/atoms/admin/AddCategoriesForm";
import ActionMenu from "@/components/admin/ui/actionMenu";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesWhithSalesQuery,
  useUpdateCategoryMutation,
  useUpdateCategoryStatusMutation,
} from "@/store/features/api/categoriesApi";
import { Category } from "@/types/system";
import { DataError } from "@/components/atoms/DataError";
import { TableSkeleton } from "@/components/skeletons/TableSkeleton";

export const Categories = () => {
  // State for the list of categories
  const {
    data: categories = [],
    isLoading,
    isError,
  } = useGetCategoriesWhithSalesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [updateStatus, { isLoading: isUpdatingStatus }] =
    useUpdateCategoryStatusMutation();
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const [activeFilter, setActiveFilter] = useState<"all" | "active">("all");
  const [nameFilter, setNameFilter] = useState("");
  const [orderBy, setOrderBy] = useState<
    "Newest" | "Oldest" | "Best Selling" | "Worst Selling"
  >("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // States for showing the form and editing a category
  const [showForm, setShowForm] = useState(false);

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Helper to extract the date (safe default to empty string)
  const parseDate = (dateStr: string = "") => {
    const parts = dateStr.replace("Published ", "");
    return new Date(parts);
  };

  const parseMoney = (money) => {
    if (typeof money === "number") return money;
    if (!money) return 0;
    return parseFloat(money.replace(/[^0-9.]/g, "")) || 0;
  };
  // Combined filter and sort
  const filteredCategories = useMemo(() => {
    const filtered = categories.filter((cat) => {
      const statusCondition =
        activeFilter === "all" || cat.status === "AVAILABLE";
      const nameCondition = cat.name
        .toLowerCase()
        .includes(nameFilter.toLowerCase());
      return statusCondition && nameCondition;
    });

    // Sorting the filtered categories
    filtered.sort((a, b) => {
      if (orderBy === "Newest") {
        return (
          parseDate(b.createdAt).getTime() - parseDate(a.createdAt).getTime()
        );
      } else if (orderBy === "Oldest") {
        return (
          parseDate(a.createdAt).getTime() - parseDate(b.createdAt).getTime()
        );
      } else if (orderBy === "Best Selling") {
        return parseMoney(b.accumulated) - parseMoney(a.accumulated);
      } else if (orderBy === "Worst Selling") {
        return parseMoney(a.accumulated) - parseMoney(b.accumulated);
      }
      return 0;
    });
    return filtered;
  }, [categories, activeFilter, nameFilter, orderBy]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(
    startIndex + itemsPerPage,
    filteredCategories.length
  );
  const currentCategories = filteredCategories.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  // Function to open the form for adding or editing a category
  const openForm = (category?: Category) => {
    setEditingCategory(category || null);
    setShowForm(true);
  };

  // Function to close the form
  const closeForm = () => {
    setEditingCategory(null);
    setShowForm(false);
  };

  // 6️⃣ Handlers → call RTK mutations
  const handleSaveCategory = async (cat: Category) => {
    if (cat.id) {
      await updateCategory(cat).unwrap();
    } else {
      await createCategory(cat).unwrap();
    }
    closeForm();
  };
  const handleDeleteCategory = async (id: string) => {
    await deleteCategory(id).unwrap();
  };
  const handleToggleStatus = async (id: string) => {
    const p = categories.find((x) => x.id === id);
    if (!p) return;
    await updateStatus({
      id,
      status: p.status === "AVAILABLE" ? "DISABLED" : "AVAILABLE",
    }).unwrap();
  };

  if (isLoading) return <TableSkeleton />;
  if (isError)
    return <DataError darkTheme={true} title="Error to show categories" />;

  return (
    <div className="px-2 pb-6 md:p-6 text-white">
      <div className=" mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row  items-start md:justify-between md:items-center  mb-6">
          <h1 className="text-2xl font-bold sp my-4 justify-start text-left">
            Categories List
          </h1>
          <div className="flex gap-2 w-full md:w-auto">
            <button
              onClick={() => openForm()}
              className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-1" />
              Add Category
            </button>
            <button className="border border-gray-600 hover:bg-gray-800 text-white px-4 py-2 rounded-md">
              Import
            </button>
            <button className="border border-gray-600 hover:bg-gray-800 text-white px-4 py-2 rounded-md">
              Export
            </button>
          </div>
        </div>

        {/* Container with two columns (form and table) */}
        <div className="flex  gap-4">
          {/* Form column */}
          {showForm && (
            <div className="w-1/3">
              <AddCategoryForm
                onClose={closeForm}
                onSave={handleSaveCategory}
                category={editingCategory ?? undefined}
              />
            </div>
          )}
          {/* Table column */}
          <div
            className={`${
              showForm
                ? "w-2/3 p-6 border-2 border-[#7436A2] rounded-lg"
                : "w-full p-6 border-2 border-[#7436A2] rounded-lg"
            }`}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                className={`px-4 py-2 rounded-md ${
                  activeFilter === "all"
                    ? "bg-gray-800 text-white"
                    : "border border-gray-600 text-gray-300"
                }`}
                onClick={() => {
                  setActiveFilter("all");
                  setCurrentPage(1);
                }}
              >
                All Categories
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  activeFilter === "active"
                    ? "bg-gray-800 text-white"
                    : "border border-gray-600 text-gray-300"
                }`}
                onClick={() => {
                  setActiveFilter("active");
                  setCurrentPage(1);
                }}
              >
                Active
              </button>

              {/* Order by dropdown */}
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="border border-gray-600 text-gray-300 px-4 py-2 rounded-md flex items-center">
                  Order by: {orderBy}
                  <ChevronDownIcon className="h-5 w-5 ml-2" />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-left rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="py-1">
                      {[
                        "Newest",
                        "Oldest",
                        "Best Selling",
                        "Worst Selling",
                      ].map((order) => (
                        <Menu.Item key={order}>
                          {({ active }) => (
                            <button
                              onClick={() => {
                                setOrderBy(
                                  order as
                                    | "Newest"
                                    | "Oldest"
                                    | "Best Selling"
                                    | "Worst Selling"
                                );
                                setCurrentPage(1);
                              }}
                              className={`${
                                active
                                  ? "bg-gray-700 text-white"
                                  : "text-gray-300"
                              } block px-4 py-2 text-sm w-full text-left`}
                            >
                              {order}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <div className="relative flex-grow ml-2">
                <input
                  type="text"
                  placeholder="Filter by category name"
                  className="bg-transparent border border-gray-600 rounded-md px-4 py-2 pl-10 w-full"
                  value={nameFilter}
                  onChange={(e) => {
                    setNameFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                />
                <PlusIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>

              <button className="border border-gray-600 hover:bg-gray-800 text-white px-4 py-2 rounded-md">
                Apply
              </button>
            </div>

            <div className="flex justify-between items-center mb-2 text-sm text-gray-400">
              <span>
                {filteredCategories.length > 0
                  ? `${startIndex + 1}-${endIndex} items`
                  : "No items"}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="w-8 h-8 flex items-center justify-center rounded border border-gray-600 disabled:opacity-50"
                >
                  &lt;
                </button>
                <span className="px-2">{currentPage}</span>
                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
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

            <div className="w-full overflow-x-scroll md:overflow-x-auto scrollbar-thin  scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="  px-2 py-3 md:px-4 text-left">CATEGORY</th>
                    <th className="py-3 px-2 md:px-4 text-left">
                      MONEY COLLECTED
                    </th>
                    <th className="py-3 px-2 md:px-4 text-left">
                      CREATION DATE
                    </th>
                    <th className="py-3 px-2 md:px-4 text-left">STATUS</th>
                    <th className="py-3 px-2 md:px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCategories.map((category) => (
                    <tr
                      key={category.id}
                      className="border-b border-gray-800 hover:bg-gray-900"
                    >
                      <td className="py-3 px-4">
                        <div className="font-medium">{category.name}</div>
                        {category.shortDescription && (
                          <div className="text-xs text-gray-400">
                            {category.shortDescription}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        ${category.accumulated.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-400">
                        {new Date(category.createdAt).toLocaleDateString(
                          "es-ES",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full inline-block ${
                            category.status === "AVAILABLE"
                              ? "bg-teal-900 text-teal-300"
                              : "bg-red-900 text-red-300"
                          }`}
                        >
                          {category.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {/* Actions menu for each category */}
                        <ActionMenu
                          onEdit={() => openForm(category)}
                          isDeleting={isDeleting || isUpdatingStatus}
                          onDelete={() => handleDeleteCategory(category.id)}
                          onToggleStatus={() => handleToggleStatus(category.id)}
                          isAvailable={category.status === "AVAILABLE"}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>
                  {filteredCategories.length > 0
                    ? `${startIndex + 1}-${endIndex} items`
                    : "No items"}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="w-8 h-8 flex items-center justify-center rounded border border-gray-600 disabled:opacity-50"
                  >
                    &lt;
                  </button>
                  <span className="px-2">{currentPage}</span>
                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
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
        </div>
      </div>
    </div>
  );
};
