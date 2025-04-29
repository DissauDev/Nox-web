// CustomersTable.jsx
import React, { Fragment, useState } from "react";
import { Menu, Transition, Switch } from "@headlessui/react";
import {
  ChevronDown,
  ChevronUp,
  DownloadCloud,
  MoreVertical,
  Search,
} from "lucide-react";

const columnsConfig = [
  { key: "name", label: "Name", sortable: false },
  { key: "username", label: "Username", sortable: true, sortDir: "desc" },
  { key: "lastActive", label: "Last active", sortable: true, sortDir: "desc" },
  {
    key: "dateRegistered",
    label: "Date registered",
    sortable: true,
    sortDir: "desc",
  },
  { key: "email", label: "Email", sortable: false },
  { key: "orders", label: "Orders", sortable: true, sortDir: "desc" },
  { key: "totalSpend", label: "Total spend", sortable: true, sortDir: "desc" },
  { key: "aov", label: "AOV", extra: "Average order value", sortable: false },
  {
    key: "country",
    label: "Country / Region",
    sortable: true,
    sortDir: "desc",
  },
  { key: "city", label: "City", sortable: true, sortDir: "desc" },
  { key: "region", label: "Region", sortable: true, sortDir: "asc" },
  { key: "postalCode", label: "Postal code", sortable: false },
];

const dummyCustomers = [
  {
    name: "Mauricio García",
    username: "guest8811",
    lastActive: "March 18, 2025",
    dateRegistered: "—",
    email: "mauricio@gmail.com",
    orders: 3,
    totalSpend: "$31.05",
    aov: "$10.35",
    country: "US",
    city: "Los Angeles",
    region: "CA",
    postalCode: "33123",
  },
  {
    name: "David Bueno",
    username: "devDissau",
    lastActive: "February 22, 2025",
    dateRegistered: "September 27, 2024",
    email: "developer@dissau.net",
    orders: 1,
    totalSpend: "$8.35",
    aov: "$8.35",
    country: "US",
    city: "San Jose",
    region: "CA",
    postalCode: "95112",
  },
  // ... más filas
];

export const Customers = () => {
  const [showFilter, setShowFilter] = useState("All Customers");
  const [search, setSearch] = useState("");
  const [visibleCols, setVisibleCols] = useState(() =>
    columnsConfig.reduce((acc, col) => {
      acc[col.key] = true;
      return acc;
    }, {})
  );

  return (
    <div className="p-6  text-white">
      <h1 className="text-3xl my-4 font-semibold">Customers</h1>
      {/* Filter “Show:” */}
      <div className="mb-4 inline-block">
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="inline-flex items-center px-4 py-2 bg-gray-800 rounded-md hover:bg-gray-700">
            <span className="mr-2">Show:</span>
            <span className="font-medium">{showFilter}</span>
            <ChevronDown className="ml-2 h-4 w-4" />
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
            <Menu.Items className="absolute mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-10">
              <div className="py-1">
                {["All Customers", "Registered", "Guests"].map((opt) => (
                  <Menu.Item key={opt}>
                    {({ active }) => (
                      <button
                        onClick={() => setShowFilter(opt)}
                        className={`${
                          active ? "bg-gray-700" : ""
                        } block w-full text-left px-4 py-2 text-sm`}
                      >
                        {opt}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      {/* Card */}
      <div className=" border-2 border-[#7436A2] rounded-lg shadow p-6">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-3 md:space-y-0">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-3 flex items-center">
              <Search className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customers..."
              className="w-3/5 pl-10 pr-4 py-2 bg-transparent border-[#036666] border-2 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#3acaca]"
            />
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 bg-gray-700 rounded-md hover:bg-gray-600">
              <DownloadCloud className="h-5 w-5" />
            </button>
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="p-2 bg-gray-700 rounded hover:bg-gray-600">
                <MoreVertical className="h-5 w-5" />
              </Menu.Button>
              <Transition /* …igual… */>
                <Menu.Items
                  className={[
                    "absolute right-0 mt-2 w-48 bg-gray-800 rounded shadow-lg z-10",
                    "max-h-60 overflow-y-auto", // garantiza scroll interno
                  ].join(" ")}
                >
                  <div className="px-4 py-2">
                    <p className="text-sm font-semibold text-gray-300 mb-2">
                      Columns:
                    </p>
                    {columnsConfig.map((col) => (
                      <div
                        key={col.key}
                        className="flex items-center justify-between py-1"
                      >
                        <span className="text-sm">{col.label}</span>
                        <Switch
                          checked={visibleCols[col.key]}
                          onChange={(val) =>
                            setVisibleCols((prev) => ({
                              ...prev,
                              [col.key]: val,
                            }))
                          }
                          className={`${
                            visibleCols[col.key]
                              ? "bg-grape-600"
                              : "bg-gray-700"
                          } relative inline-flex items-center h-5 rounded-full w-9 focus:outline-none`}
                        >
                          <span className="sr-only">Toggle {col.label}</span>
                          <span
                            className={`${
                              visibleCols[col.key]
                                ? "translate-x-4"
                                : "translate-x-0"
                            } inline-block w-4 h-4 transform bg-white rounded-full transition`}
                          />
                        </Switch>
                      </div>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-scroll scrollbar-thin  scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          <table className="min-w-max divide-y divide-gray-700">
            <thead>
              <tr className="bg-gray-800">
                {columnsConfig.map((col) =>
                  visibleCols[col.key] ? (
                    <th
                      key={col.key}
                      className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400 whitespace-nowrap"
                    >
                      <div className="flex items-center">
                        <span>{col.label}</span>
                        {col.extra && (
                          <span className="ml-1 text-[10px] uppercase text-gray-500">
                            {col.extra}
                          </span>
                        )}
                        {col.sortable &&
                          (col.sortDir === "desc" ? (
                            <ChevronDown className="ml-1 h-4 w-4 text-gray-400" />
                          ) : (
                            <ChevronUp className="ml-1 h-4 w-4 text-gray-400" />
                          ))}
                      </div>
                    </th>
                  ) : null
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {dummyCustomers.map((c, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-700 transition-colors duration-150"
                >
                  {columnsConfig.map((col) =>
                    visibleCols[col.key] ? (
                      <td key={col.key} className="px-4 py-3 whitespace-nowrap">
                        {c[col.key]}
                      </td>
                    ) : null
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="mt-4 flex flex-col md:flex-row md:justify-between text-gray-400 text-sm space-y-2 md:space-y-0">
          <div>{dummyCustomers.length} customers</div>
          <div>
            {(
              dummyCustomers.reduce((sum, c) => sum + c.orders, 0) /
              dummyCustomers.length
            ).toFixed(4)}{" "}
            Average orders
          </div>
          <div>
            {dummyCustomers
              .reduce(
                (sum, c) => sum + parseFloat(c.totalSpend.replace("$", "")),
                0
              )
              .toFixed(2)}{" "}
            Average lifetime spend
          </div>
          <div>
            {(
              dummyCustomers.reduce(
                (sum, c) => sum + parseFloat(c.totalSpend.replace("$", "")),
                0
              ) / dummyCustomers.reduce((sum, c) => sum + c.orders, 0)
            ).toFixed(2)}{" "}
            Average order value
          </div>
        </div>
      </div>
    </div>
  );
};
