import React, { useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon, MailIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetOrdersQuery } from "@/store/features/api/ordersApi";
import { TiMinus } from "react-icons/ti";
import { DataError } from "@/components/atoms/DataError";

const STATUS_OPTIONS = [
  "all",
  "PENDING",
  "PAID",
  "PROCESSING",
  "READY_FOR_PICKUP",
  "OUT_FOR_DELIVERY",
  "COMPLETED",
  "CANCELLED",
];
const CUSTOMER_OPTIONS = ["all", "registered", "unregistered"];
const DATE_OPTIONS = ["all", "today", "this_week", "this_month"];

export const OrdersDashboard = () => {
  const navigate = useNavigate();

  // 1️⃣ Estados de filtros y paginación
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [customerFilter, setCustomerFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [originFilter, setOriginFilter] = useState<
    "all" | "pickup" | "delivery"
  >("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  // 2️⃣ Hook RTK para obtener órdenes
  const {
    data: result,
    isLoading,
    isError,
  } = useGetOrdersQuery({
    status: statusFilter !== "all" ? statusFilter.toUpperCase() : undefined,
    customerType: customerFilter,
    dateFilter: dateFilter !== "all" ? dateFilter : undefined,
    page: currentPage,
    origin: originFilter !== "all" ? originFilter : undefined,
    perPage: itemsPerPage,
    orderNumber: orderNumber
      ? orderNumber.startsWith("ORD-")
        ? orderNumber
        : `ORD-${orderNumber}`
      : undefined,
  });

  if (isError)
    return <DataError title={"Error to show orders"} darkTheme={true} />;
  const orders = result?.orders ?? [];
  const totalPage = result?.totalPage ?? 0;

  const totalPages = Math.ceil(totalPage / itemsPerPage);

  return (
    <div className="px-2 py-10 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* — Filtros */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">Orders</h1>
          <div className="flex flex-wrap gap-2">
            <Dropdown
              label={`Status: ${statusFilter}`}
              options={STATUS_OPTIONS}
              onSelect={(v) => {
                setStatusFilter(v);
                setCurrentPage(1);
              }}
            />
            <Dropdown
              label={`Customer: ${customerFilter}`}
              options={CUSTOMER_OPTIONS}
              onSelect={(v) => {
                setCustomerFilter(v);
                setCurrentPage(1);
              }}
            />
            <Dropdown
              label={
                {
                  all: "All Dates",
                  today: "Today",
                  this_week: "This Week",
                  this_month: "This Month",
                }[dateFilter]!
              }
              options={DATE_OPTIONS}
              labels={{
                all: "All Dates",
                today: "Today",
                this_week: "This Week",
                this_month: "This Month",
              }}
              onSelect={(v) => {
                setDateFilter(v);
                setCurrentPage(1);
              }}
            />
            <div className="relative">
              <input
                type="text"
                placeholder="Order #"
                className="bg-transparent border border-gray-600 rounded-md px-4 py-2 pl-10 w-40 placeholder-gray-500 text-gray-200"
                value={orderNumber}
                onChange={(e) => {
                  setOrderNumber(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <span className="absolute left-3 top-2.5 text-gray-500">#</span>
            </div>

            <Dropdown
              label={`Origin: ${originFilter}`}
              options={["all", "pickup", "delivery"]}
              labels={{ all: "All", pickup: "Pickup", delivery: "Delivery" }}
              onSelect={(v) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                setOriginFilter(v);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {/* — Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="border-b border-gray-700 text-left text-gray-300">
                {["Order", "Date", "Status", "Total", "Actions", "Origin"].map(
                  (th) => (
                    <th key={th} className="px-4 py-2">
                      {th}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-800 animate-pulse"
                    >
                      {/* Order # y Cliente */}
                      <td className="px-4 py-3">
                        <div className="h-4 bg-gray-700 rounded w-3/4" />
                      </td>

                      {/* Fecha formateada */}
                      <td className="px-4 py-3">
                        <div className="h-4 bg-gray-700 rounded w-1/3 mx-auto" />
                      </td>

                      {/* Estado */}
                      <td className="px-4 py-3">
                        <div className="inline-block h-4 bg-gray-700 rounded-full w-16" />
                      </td>

                      {/* Total */}
                      <td className="px-4 py-3">
                        <div className="h-4 bg-gray-700 rounded w-1/5" />
                      </td>

                      {/* Acciones */}
                      <td className="px-4 py-3 flex space-x-2">
                        <div className="h-5 w-5 bg-gray-700 rounded" />
                        <div className="h-5 w-5 bg-gray-700 rounded" />
                      </td>

                      {/* Origen */}
                      <td className="px-4 py-3">
                        <div className="h-4 bg-gray-700 rounded w-1/4 mx-auto" />
                      </td>
                    </tr>
                  ))
                : orders.map((o) => (
                    <tr
                      key={o.id}
                      className="hover:bg-gray-900 border-b border-gray-800"
                    >
                      {/* Order # y Cliente */}
                      <td
                        onClick={() => navigate(`/dashboard/orders/${o.id}`)}
                        className="px-4 py-3 cursor-pointer text-sapphire-600 hover:underline"
                      >
                        #{o.orderNumber} {o.customerName}
                      </td>
                      {/* Fecha formateada */}
                      <td className="px-4 py-3">
                        {new Intl.DateTimeFormat("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }).format(new Date(o.createdAt))}
                      </td>
                      {/* Estado */}
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${
                            o.status === "COMPLETED"
                              ? "bg-green-800 text-green-300"
                              : o.status === "REFUNDED"
                              ? "bg-red-600"
                              : "bg-yellow-800 text-yellow-300"
                          }`}
                        >
                          {o.status}
                        </span>
                      </td>
                      {/* Total */}
                      <td className="px-4 py-3">${o.totalAmount.toFixed(2)}</td>
                      {/* Acciones */}
                      <td className="px-4 py-3 flex space-x-2">
                        <button className="p-1 hover:bg-gray-800 rounded-md">
                          {o.userId ? (
                            <CheckIcon className="h-5 w-5 text-gray-300" />
                          ) : (
                            <TiMinus className="h-5 w-5 text-gray-300" />
                          )}
                        </button>
                        <button className="p-1 hover:bg-gray-800 rounded-md">
                          <MailIcon className="h-5 w-5 text-gray-300" />
                        </button>
                      </td>
                      {/* Origen: Pickup vs Delivery */}
                      <td className="px-4 py-3">
                        {o.customerAddress ===
                        "422 E Campbell Ave, Campbell, CA 95008"
                          ? "Pickup"
                          : "Delivery"}
                      </td>
                    </tr>
                  ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-4 text-center text-gray-500">
                    No matching orders.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* — Paginación */}
        <div className="flex justify-between items-center mt-6 text-sm text-gray-400">
          <div>
            Showing {(currentPage - 1) * itemsPerPage + 1}–{" "}
            {Math.min(currentPage * itemsPerPage, totalPage)} of {totalPage}{" "}
            orders
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-600 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-3 py-1 border border-gray-600 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// — Componente Dropdown reutilizable
function Dropdown({
  label,
  options,
  onSelect,
  labels,
}: {
  label: string;
  options: string[];
  onSelect: (v: string) => void;
  labels?: Record<string, string>;
}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="border border-gray-600 text-gray-300 px-4 py-2 rounded-md flex items-center">
        {label}
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
        <Menu.Items className="absolute right-0 mt-2 w-44 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 z-10">
          {options.map((opt) => (
            <Menu.Item key={opt}>
              {({ active }) => (
                <button
                  onClick={() => onSelect(opt)}
                  className={`${
                    active ? "bg-gray-700 text-white" : "text-gray-300"
                  } block px-4 py-2 text-sm w-full text-left`}
                >
                  {labels ? labels[opt] : opt}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
