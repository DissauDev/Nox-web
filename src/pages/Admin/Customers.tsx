// CustomersTable.jsx
import React, { Fragment, useState } from "react";
import { Menu, Transition, Switch } from "@headlessui/react";
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Search,
} from "lucide-react";
import {
  useGetCustomersQuery,
  useGetUsersStatsQuery,
} from "@/store/features/api/userApi";

const columnsConfig = [
  { key: "name", label: "Name", sortable: false },
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
];

export const Customers = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [visibleCols, setVisibleCols] = useState(() =>
    columnsConfig.reduce((acc, col) => {
      acc[col.key] = true;
      return acc;
    }, {})
  );

  // RTK Query hooks, ahora con page en deps
  const {
    data: customersData,
    isLoading: loadingCustomers,
    isError: errorCustomers,
  } = useGetCustomersQuery({ search, page, limit });

  const {
    data: stats,
    isLoading: loadingStats,
    isError: errorStats,
  } = useGetUsersStatsQuery();

  const customers = customersData?.data || [];
  const meta = customersData?.meta;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl my-4 font-semibold">Customers</h1>

      {/* Card */}
      <div className="border-2 border-[#3948a4] rounded-lg shadow p-6">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-3 md:space-y-0">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-3 flex items-center">
              <Search className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search customers..."
              className="w-3/5 pl-10 pr-4 py-2 bg-transparent border-[#a3c1f5] border-2 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#3acaca]"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="p-2 bg-gray-700 rounded hover:bg-gray-600">
                <MoreVertical className="h-5 w-5" />
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
                <Menu.Items
                  className={[
                    "absolute right-0 mt-2 w-48 bg-gray-800 rounded shadow-lg z-10",
                    "max-h-60 overflow-y-auto",
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
                              ? "bg-sapphire-600"
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
        <div className="w-full overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          <table className="min-w-max divide-y divide-gray-700">
            <thead>
              <tr className="bg-gray-800">
                {columnsConfig.map(
                  (col) =>
                    visibleCols[col.key] && (
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
                    )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {loadingCustomers &&
                Array.from({ length: 5 }).map((_, rowIdx) => (
                  <tr
                    key={rowIdx}
                    className="border-b border-gray-800 animate-pulse"
                  >
                    {columnsConfig.map((col) =>
                      visibleCols[col.key] ? (
                        <td
                          key={col.key}
                          className="px-4 py-3 whitespace-nowrap"
                        >
                          {/* placeholder genérico; ajusta w-? según columna si quieres */}
                          <div className="h-4 bg-gray-700 rounded w-3/4" />
                        </td>
                      ) : null
                    )}
                  </tr>
                ))}
              {errorCustomers && (
                <tr>
                  <td
                    colSpan={columnsConfig.length}
                    className="px-4 py-3 text-center font-ArialBold text-red-500"
                  >
                    Error fetching customers
                  </td>
                </tr>
              )}
              {!loadingCustomers &&
                customers.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-gray-700 transition-colors duration-150"
                  >
                    {columnsConfig.map((col) =>
                      visibleCols[col.key] ? (
                        <td
                          key={col.key}
                          className="px-4 py-3 whitespace-nowrap"
                        >
                          {(() => {
                            switch (col.key) {
                              case "name":
                                return c.name;
                              case "lastActive":
                                return c.lastOrderDate
                                  ? new Date(
                                      c.lastOrderDate
                                    ).toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    })
                                  : "—";
                              case "dateRegistered":
                                return new Date(
                                  c.registeredAt
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                });
                              case "email":
                                return c.email;
                              case "orders":
                                return c.totalOrders;
                              case "totalSpend":
                                return `$${c.totalSpent.toFixed(2)}`;
                              case "aov":
                                return `$${c.averageOrderValue.toFixed(2)}`;
                              default:
                                return null;
                            }
                          })()}
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
          <div>
            {loadingStats
              ? "…"
              : errorStats
              ? "Error"
              : `${stats.totalUsers} customers`}
          </div>
          <div>
            {loadingStats
              ? "…"
              : errorStats
              ? "Error"
              : `${stats?.averageOrdersPerUser?.toFixed(2)} Average orders`}
          </div>
          <div>
            {loadingStats
              ? "…"
              : errorStats
              ? "Error"
              : `$${stats.averageLifetimeSpend.toFixed(
                  2
                )} Average lifetime spend`}
          </div>
          <div>
            {loadingStats
              ? "…"
              : errorStats
              ? "Error"
              : `$${stats.averageOrderValue.toFixed(2)} Average order value`}
          </div>
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
            <span className="text-sm">
              Page {page} of {meta.totalPages}
            </span>
            <button
              onClick={() =>
                setPage((p) => (meta && p < meta.totalPages ? p + 1 : p))
              }
              disabled={page === meta.totalPages}
              className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
            >
              <ChevronRight className="inline h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
