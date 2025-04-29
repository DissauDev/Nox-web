"use client";

import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, PlusIcon } from "lucide-react";
// Se asume que el componente AddProductsForm.tsx ya existe e importa sus props
import AddProductsForm from "./AddProductsForm";

export interface Product {
  id: number;
  name: string;
  image: string;
  vendor: string;
  price: string;
  status: "Available" | "Disabled";
  categories: string[];
  type: "Seasonal" | "Regular" | "Limited";
  tags: string[];
  date: string;
}

export const Products = () => {
  // Estado para la lista de productos (para poder actualizarla)
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Limited Fall Goodies",
      image: "/placeholder.svg?height=40&width=40",
      vendor: "Cookiees",
      price: "$554.226",
      status: "Available",
      categories: ["Desserts"],
      type: "Limited",
      tags: ["Fall", "Cookies"],
      date: "Published 10/12/2023",
    },
    {
      id: 2,
      name: "Chocolate Chunks",
      image: "/placeholder.svg?height=40&width=40",
      vendor: "Cookiees",
      price: "$12.99",
      status: "Disabled",
      categories: ["Cookiees"],
      type: "Regular",
      tags: ["Chocolate"],
      date: "Published 08/15/2023",
    },
    {
      id: 3,
      name: "Seasonal Shortbread",
      image: "/placeholder.svg?height=40&width=40",
      vendor: "Cookiees",
      price: "$9.99",
      status: "Available",
      categories: ["Desserts"],
      type: "Seasonal",
      tags: ["Shortbread"],
      date: "Published 09/01/2023",
    },
    {
      id: 4,
      name: "Vanilla Wafers",
      image: "/placeholder.svg?height=40&width=40",
      vendor: "Cookiees",
      price: "$7.50",
      status: "Available",
      categories: ["For-you"],
      type: "Regular",
      tags: ["Vanilla"],
      date: "Published 07/22/2023",
    },
    {
      id: 5,
      name: "Oatmeal Raisin",
      image: "/placeholder.svg?height=40&width=40",
      vendor: "Cookiees",
      price: "$8.75",
      status: "Available",
      categories: ["Mashoops"],
      type: "Regular",
      tags: ["Oatmeal", "Raisin"],
      date: "Published 06/30/2023",
    },
    {
      id: 6,
      name: "Peanut Butter",
      image: "/placeholder.svg?height=40&width=40",
      vendor: "Cookiees",
      price: "$10.25",
      status: "Available",
      categories: ["Mashoops"],
      type: "Regular",
      tags: ["Peanut Butter"],
      date: "Published 05/15/2023",
    },
    {
      id: 7,
      name: "Gingerbread Special",
      image: "/placeholder.svg?height=40&width=40",
      vendor: "Cookiees",
      price: "$11.50",
      status: "Available",
      categories: ["Desserts"],
      type: "Seasonal",
      tags: ["Gingerbread", "Holiday"],
      date: "Published 11/01/2023",
    },
    {
      id: 8,
      name: "Lemon & Raspberry",
      image: "/placeholder.svg?height=40&width=40",
      vendor: "Cookiees",
      price: "$9.25",
      status: "Disabled",
      categories: ["Ice-cream"],
      type: "Limited",
      tags: ["Lemon", "Raspberry"],
      date: "Published 04/10/2023",
    },
    {
      id: 9,
      name: "Coconut Macaroons",
      image: "/placeholder.svg?height=40&width=40",
      vendor: "Cookiees",
      price: "$12.75",
      status: "Available",
      categories: ["Drinks"],
      type: "Regular",
      tags: ["Coconut"],
      date: "Published 03/22/2023",
    },
    {
      id: 10,
      name: "Almond Biscotti",
      image: "/placeholder.svg?height=40&width=40",
      vendor: "Cookiees",
      price: "$13.50",
      status: "Disabled",
      categories: ["Cookiees"],
      type: "Regular",
      tags: ["Almond", "Biscotti"],
      date: "Published 02/14/2023",
    },
    {
      id: 11,
      name: "Extra Crunchy",
      image: "/placeholder.svg?height=40&width=40",
      vendor: "Cookiees",
      price: "$15.00",
      status: "Available",
      categories: ["For-you"],
      type: "Limited",
      tags: ["Crunch"],
      date: "Published 12/01/2023",
    },
  ]);

  // Estados para selección, filtros y paginación
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "active">("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [nameFilter, setNameFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Estados para mostrar formulario y editar producto
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Filtro combinado
  const filteredProducts = products.filter((product) => {
    const statusCondition =
      activeFilter === "all" || product.status === "Available";
    const nameCondition = product.name
      .toLowerCase()
      .includes(nameFilter.toLowerCase());
    const categoryCondition =
      categoryFilter === "all" || product.categories.includes(categoryFilter);
    return statusCondition && nameCondition && categoryCondition;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredProducts.length);
  const currentProducts = filteredProducts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Función para abrir el formulario ya sea para agregar o editar
  const openForm = (product?: Product) => {
    setEditingProduct(product || null);
    setShowForm(true);
  };

  // Función para cerrar el formulario
  const closeForm = () => {
    setEditingProduct(null);
    setShowForm(false);
  };

  // Función para guardar (agregar o actualizar) producto desde el formulario
  const handleSaveProduct = (newProduct: Product) => {
    if (editingProduct) {
      // Actualizar producto existente
      setProducts((prev) =>
        prev.map((p) => (p.id === newProduct.id ? newProduct : p))
      );
    } else {
      // Agregar nuevo producto: se asigna un id único
      setProducts((prev) => [...prev, { ...newProduct, id: prev.length + 1 }]);
    }
    closeForm();
  };

  // Funciones de acciones en el menú de cada producto
  const handleDeleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleToggleStatus = (id: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status: p.status === "Available" ? "Disabled" : "Available",
            }
          : p
      )
    );
  };

  // Lógica de selección de productos
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map((product) => product.id));
    }
    setSelectAll(!selectAll);
  };

  const toggleProductSelection = (productId: number) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
      setSelectAll(false);
    } else {
      const newSelection = [...selectedProducts, productId];
      setSelectedProducts(newSelection);
      if (newSelection.length === filteredProducts.length) {
        setSelectAll(true);
      }
    }
  };

  return (
    <div className="p-6 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Products List</h1>
          <div className="flex gap-2">
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

        {/* Contenedor con dos columnas (formulario y tabla) */}
        <div className="flex gap-4">
          {/* Columna del formulario */}
          {showForm && (
            <div className="w-1/3">
              <AddProductsForm
                onClose={closeForm}
                onSave={handleSaveProduct}
                product={editingProduct || undefined}
              />
            </div>
          )}
          {/* Columna de la tabla */}
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
                All Products
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

              {/* Dropdown para filtrar por categoría */}
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="border border-gray-600 text-gray-300 px-4 py-2 rounded-md flex items-center">
                  {categoryFilter === "all"
                    ? "Select a category"
                    : categoryFilter}
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
                        "For-you",
                        "Desserts",
                        "Ice-cream",
                        "Mashoops",
                        "Drinks",
                        "Cookiees",
                      ].map((cat) => (
                        <Menu.Item key={cat}>
                          {({ active }) => (
                            <button
                              onClick={() => {
                                setCategoryFilter(cat);
                                setCurrentPage(1);
                              }}
                              className={`${
                                active
                                  ? "bg-gray-700 text-white"
                                  : "text-gray-300"
                              } block px-4 py-2 text-sm w-full text-left`}
                            >
                              {cat}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              setCategoryFilter("all");
                              setCurrentPage(1);
                            }}
                            className={`${
                              active
                                ? "bg-gray-700 text-white"
                                : "text-gray-300"
                            } block px-4 py-2 text-sm w-full text-left`}
                          >
                            Todas las categorías
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

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

              <button className="border border-gray-600 hover:bg-gray-800 text-white px-4 py-2 rounded-md">
                Filter
              </button>
            </div>

            <div className="flex justify-between items-center mb-2 text-sm text-gray-400">
              <span>
                {filteredProducts.length > 0
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
                    <th className="py-3 px-4 text-left">PRODUCT</th>
                    <th className="py-3 px-4 text-left">VENDOR</th>
                    <th className="py-3 px-4 text-left">PRICE</th>
                    <th className="py-3 px-4 text-left">CATEGORIES</th>
                    <th className="py-3 px-4 text-left">TYPE</th>
                    <th className="py-3 px-4 text-left">TAGS</th>
                    <th className="py-3 px-4 text-left">DATE</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-gray-800 hover:bg-gray-900"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-10 h-10 rounded-md mr-3"
                          />
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div
                              className={`text-xs mt-1 px-2 py-0.5 rounded-full inline-block ${
                                product.status === "Available"
                                  ? "bg-teal-900 text-teal-300"
                                  : "bg-red-900 text-red-300"
                              }`}
                            >
                              {product.status}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">{product.vendor}</td>
                      <td className="py-3 px-4">{product.price}</td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {product.categories.map((category, index) => (
                            <span key={index} className="text-xs">
                              {category}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-xs">{product.type}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {product.tags.map((tag, index) => (
                            <span key={index} className="text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-400">
                        {product.date}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {/* Menú de acciones para cada producto */}
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
                                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
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
                                      onClick={() => openForm(product)}
                                      className={`${
                                        active
                                          ? "bg-gray-700 text-white"
                                          : "text-gray-300"
                                      } block px-4 py-2 text-sm w-full text-left`}
                                    >
                                      Editar
                                    </button>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() =>
                                        handleDeleteProduct(product.id)
                                      }
                                      className={`${
                                        active
                                          ? "bg-gray-700 text-white"
                                          : "text-gray-300"
                                      } block px-4 py-2 text-sm w-full text-left`}
                                    >
                                      Eliminar
                                    </button>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() =>
                                        handleToggleStatus(product.id)
                                      }
                                      className={`${
                                        active
                                          ? "bg-gray-700 text-white"
                                          : "text-gray-300"
                                      } block px-4 py-2 text-sm w-full text-left`}
                                    >
                                      {product.status === "Available"
                                        ? "Marcar as Disabled"
                                        : "Marcar as Available"}
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
                  {filteredProducts.length > 0
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
