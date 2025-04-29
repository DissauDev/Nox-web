import { Fragment, useState, useMemo } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, PlusIcon } from "lucide-react";
// Assumes that AddProductsForm.tsx already exists and imports its props
import AddProductsForm from "./AddProductsForm";

export interface Category {
  id: number;
  name: string;
  moneyCollected: string; // e.g. "$554.226"
  status: "Available" | "Disabled";
  date: string; // e.g. "Published 10/12/2023"
  shortPhrase?: string;
  longPhrase?: string;
}

export const Categories = () => {
  // State for the list of categories
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      name: "Cookies",
      moneyCollected: "$554.226",
      status: "Available",
      date: "Published 10/12/2023",
      shortPhrase: "Crunchy Bites",
      longPhrase: "Freshly baked cookies with irresistible crunchy textures",
    },
    {
      id: 2,
      name: "Ice Cream",
      moneyCollected: "$12.99",
      status: "Disabled",
      date: "Published 08/15/2023",
      shortPhrase: "Chilled Treats",
      longPhrase: "Refreshing and delicious ice cream for every season",
    },
    {
      id: 3,
      name: "Pastries",
      moneyCollected: "$9.99",
      status: "Available",
      date: "Published 09/01/2023",
      shortPhrase: "Sweet Delights",
      longPhrase: "Artfully baked pastries that melt in your mouth",
    },
    {
      id: 4,
      name: "Breads",
      moneyCollected: "$7.50",
      status: "Available",
      date: "Published 07/22/2023",
      shortPhrase: "Daily Fresh",
      longPhrase: "Handcrafted breads with traditional recipes",
    },
    {
      id: 5,
      name: "Muffins",
      moneyCollected: "$8.75",
      status: "Available",
      date: "Published 06/30/2023",
      shortPhrase: "Morning Treats",
      longPhrase: "Soft and delicious muffins baked fresh every day",
    },
    {
      id: 6,
      name: "Pies",
      moneyCollected: "$10.25",
      status: "Available",
      date: "Published 05/15/2023",
      shortPhrase: "Sweet & Savory",
      longPhrase: "Delectable pies with rich and varied fillings",
    },
    {
      id: 7,
      name: "Donuts",
      moneyCollected: "$11.50",
      status: "Available",
      date: "Published 11/01/2023",
      shortPhrase: "Glazed Perfection",
      longPhrase: "Irresistible donuts with a perfect balance of sweetness",
    },
    {
      id: 8,
      name: "Brownies",
      moneyCollected: "$9.25",
      status: "Disabled",
      date: "Published 04/10/2023",
      shortPhrase: "Fudgy Goodness",
      longPhrase: "Rich brownies that satisfy any chocolate craving",
    },
    {
      id: 9,
      name: "Cupcakes",
      moneyCollected: "$12.75",
      status: "Available",
      date: "Published 03/22/2023",
      shortPhrase: "Mini Delights",
      longPhrase: "Colorful cupcakes bursting with flavor",
    },
    {
      id: 10,
      name: "Pancakes",
      moneyCollected: "$13.50",
      status: "Disabled",
      date: "Published 02/14/2023",
      shortPhrase: "Fluffy Stack",
      longPhrase: "Light and airy pancakes served with syrup",
    },
    {
      id: 11,
      name: "Waffles",
      moneyCollected: "$15.00",
      status: "Available",
      date: "Published 12/01/2023",
      shortPhrase: "Crispy & Soft",
      longPhrase: "Waffles with a perfect blend of crispiness and softness",
    },
  ]);

  // States for selection, filters and pagination
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
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

  // Helper to extract the date (assuming the format "Published MM/DD/YYYY")
  const parseDate = (dateStr: string) => {
    const parts = dateStr.replace("Published ", "");
    return new Date(parts);
  };

  // Helper to parse money collected (removing $ and commas)
  const parseMoney = (moneyStr: string) => {
    return parseFloat(moneyStr.replace(/[^0-9.]/g, ""));
  };

  // Combined filter and sort
  const filteredCategories = useMemo(() => {
    const filtered = categories.filter((cat) => {
      const statusCondition =
        activeFilter === "all" || cat.status === "Available";
      const nameCondition = cat.name
        .toLowerCase()
        .includes(nameFilter.toLowerCase());
      return statusCondition && nameCondition;
    });

    // Sorting the filtered categories
    filtered.sort((a, b) => {
      if (orderBy === "Newest") {
        return parseDate(b.date).getTime() - parseDate(a.date).getTime();
      } else if (orderBy === "Oldest") {
        return parseDate(a.date).getTime() - parseDate(b.date).getTime();
      } else if (orderBy === "Best Selling") {
        return parseMoney(b.moneyCollected) - parseMoney(a.moneyCollected);
      } else if (orderBy === "Worst Selling") {
        return parseMoney(a.moneyCollected) - parseMoney(b.moneyCollected);
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

  // Function to save (add or update) a category from the form
  const handleSaveCategory = (newCategory: Category) => {
    if (editingCategory) {
      // Update existing category
      setCategories((prev) =>
        prev.map((cat) => (cat.id === newCategory.id ? newCategory : cat))
      );
    } else {
      // Add new category with a unique id
      setCategories((prev) => [
        ...prev,
        { ...newCategory, id: prev.length + 1 },
      ]);
    }
    closeForm();
  };

  // Actions for each category in the menu
  const handleDeleteCategory = (id: number) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  const handleToggleStatus = (id: number) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === id
          ? {
              ...cat,
              status: cat.status === "Available" ? "Disabled" : "Available",
            }
          : cat
      )
    );
  };

  // Logic for selecting categories
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(filteredCategories.map((cat) => cat.id));
    }
    setSelectAll(!selectAll);
  };

  const toggleCategorySelection = (categoryId: number) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
      setSelectAll(false);
    } else {
      const newSelection = [...selectedCategories, categoryId];
      setSelectedCategories(newSelection);
      if (newSelection.length === filteredCategories.length) {
        setSelectAll(true);
      }
    }
  };

  return (
    <div className="p-6 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Categories List</h1>
          <div className="flex gap-2">
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
        <div className="flex gap-4">
          {/* Form column */}
          {showForm && (
            <div className="w-1/3">
              <AddProductsForm
                onClose={closeForm}
                onSave={handleSaveCategory}
                product={editingCategory || undefined}
              />
            </div>
          )}
          {/* Table column */}
          <div className={`${showForm ? "w-2/3" : "w-full"}`}>
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

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-3 px-4 text-left">CATEGORY</th>
                    <th className="py-3 px-4 text-left">MONEY COLLECTED</th>
                    <th className="py-3 px-4 text-left">CREATION DATE</th>
                    <th className="py-3 px-4 text-left">STATUS</th>
                    <th className="py-3 px-4 text-center">Actions</th>
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
                        {category.shortPhrase && (
                          <div className="text-xs text-gray-400">
                            {category.shortPhrase}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">{category.moneyCollected}</td>
                      <td className="py-3 px-4 text-sm text-gray-400">
                        {category.date}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full inline-block ${
                            category.status === "Available"
                              ? "bg-teal-900 text-teal-300"
                              : "bg-red-900 text-red-300"
                          }`}
                        >
                          {category.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {/* Actions menu for each category */}
                        <Menu
                          as="div"
                          className="relative inline-block text-left"
                        >
                          <Menu.Button className="p-1 rounded-full hover:bg-gray-700">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 5v.01M12 12v.01M12 19v.01"
                              />
                            </svg>
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
                            <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                              <div className="py-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() => openForm(category)}
                                      className={`${
                                        active
                                          ? "bg-gray-700 text-white"
                                          : "text-gray-300"
                                      } block px-4 py-2 text-sm w-full text-left`}
                                    >
                                      Edit
                                    </button>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() =>
                                        handleDeleteCategory(category.id)
                                      }
                                      className={`${
                                        active
                                          ? "bg-gray-700 text-white"
                                          : "text-gray-300"
                                      } block px-4 py-2 text-sm w-full text-left`}
                                    >
                                      Delete
                                    </button>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() =>
                                        handleToggleStatus(category.id)
                                      }
                                      className={`${
                                        active
                                          ? "bg-gray-700 text-white"
                                          : "text-gray-300"
                                      } block px-4 py-2 text-sm w-full text-left`}
                                    >
                                      {category.status === "Available"
                                        ? "Mark as Disabled"
                                        : "Mark as Available"}
                                    </button>
                                  )}
                                </Menu.Item>
                              </div>
                            </Menu.Items>
                          </Transition>
                        </Menu>
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
