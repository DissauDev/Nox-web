import React, { useState, Fragment, useMemo } from "react";
import { Menu, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon, MailIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const initialOrders = [
  {
    id: 8811,
    registered: true,
    customer: "Mauricio García",
    date: "Mar 18, 2025",
    status: "Processing",
    total: "$6.10",
    origin: "Direct",
    reviewReminder: "Automatic review reminders are disabled",
  },
  {
    id: 8810,
    registered: true,
    customer: "Mauricio García",
    date: "Mar 1, 2025",
    status: "Processing",
    total: "$19.60",
    origin: "Direct",
    reviewReminder: "Automatic review reminders are disabled",
  },
  {
    id: 8809,
    registered: false,
    customer: "cgfd fsda",
    date: "Feb 26, 2025",
    status: "Processing",
    total: "$5.35",
    origin: "Direct",
    reviewReminder: "No customer consent received",
  },
  {
    id: 8808,
    registered: false,
    customer: "David Bueno",
    date: "Feb 22, 2025",
    status: "Processing",
    total: "$49.50",
    origin: "Direct",
    reviewReminder: "No customer consent received",
  },
  {
    id: 8546,
    registered: true,
    customer: "David Bueno",
    date: "Oct 24, 2024",
    status: "Completed",
    total: "$8.35",
    origin: "Direct",
    reviewReminder: "No customer consent received",
  },
];

const STATUS_OPTIONS = ["all", "Processing", "Completed"];
const CUSTOMER_OPTIONS = ["all", "registered", "unregistered"];
const DATE_OPTIONS = ["all", "today", "this_week", "this_month"];

function parseOrderDate(str) {
  // Assumes format "Mon DD, YYYY"
  return new Date(str);
}

export const OrdersDashboard = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all");
  const [customerFilter, setCustomerFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [orderNumber, setOrderNumber] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const filtered = useMemo(() => {
    return initialOrders.filter((o) => {
      // by status
      if (statusFilter !== "all" && o.status !== statusFilter) return false;
      // by customer type
      if (customerFilter === "registered" && !o.registered) return false;
      if (customerFilter === "unregistered" && o.registered) return false;
      // by order number
      if (orderNumber && !String(o.id).includes(orderNumber)) return false;
      // by date
      const od = parseOrderDate(o.date);
      const diffMs = today.getTime() - od.getTime();
      const diffDays = diffMs / (1000 * 60 * 60 * 24);
      switch (dateFilter) {
        case "today":
          if (od.toDateString() !== today.toDateString()) return false;
          break;
        case "this_week":
          if (diffDays < 0 || diffDays > 7) return false;
          break;
        case "this_month":
          if (
            od.getMonth() !== today.getMonth() ||
            od.getFullYear() !== today.getFullYear()
          )
            return false;
          break;
        default:
          break;
      }
      return true;
    });
  }, [statusFilter, customerFilter, dateFilter, orderNumber, today]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentOrders = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    (currentPage - 1) * itemsPerPage + itemsPerPage
  );

  return (
    <div className="p-6 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">Orders</h1>

          <div className="flex flex-wrap gap-2">
            {/* Status */}
            <Dropdown
              label={`Status: ${statusFilter}`}
              options={STATUS_OPTIONS}
              onSelect={setStatusFilter}
              labels={undefined}
            />
            {/* Customer */}
            <Dropdown
              label={`Customer: ${customerFilter}`}
              options={CUSTOMER_OPTIONS}
              onSelect={setCustomerFilter}
              labels={undefined}
            />
            {/* Date */}
            <Dropdown
              label={
                {
                  all: "All Dates",
                  today: "Today",
                  this_week: "This Week",
                  this_month: "This Month",
                }[dateFilter]
              }
              options={DATE_OPTIONS}
              onSelect={setDateFilter}
              labels={{
                all: "All Dates",
                today: "Today",
                this_week: "This Week",
                this_month: "This Month",
              }}
            />
            {/* Order # */}
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
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="border-b border-gray-700 text-left text-gray-300">
                <th className="px-4 py-2">Order</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Actions</th>
                <th className="px-4 py-2">Origin</th>
                <th className="px-4 py-2">Review Reminder</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((o) => (
                <tr
                  key={o.id}
                  className="hover:bg-gray-900 border-b border-gray-800"
                >
                  <td className="px-4 py-3">
                    <a
                      onClick={() => navigate(`/dashboard/orders/${o.id}`)}
                      className="text-blue-400 hover:underline"
                    >
                      #{o.id} {o.customer}
                    </a>
                  </td>
                  <td className="px-4 py-3">{o.date}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${
                        o.status === "Processing"
                          ? "bg-green-800 text-green-300"
                          : "bg-blue-800 text-blue-300"
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{o.total}</td>
                  <td className="px-4 py-3 flex space-x-2">
                    <button className="p-1 hover:bg-gray-800 rounded-md">
                      <CheckIcon className="h-5 w-5 text-gray-300" />
                    </button>
                    <button className="p-1 hover:bg-gray-800 rounded-md">
                      <MailIcon className="h-5 w-5 text-gray-300" />
                    </button>
                  </td>
                  <td className="px-4 py-3">{o.origin}</td>
                  <td className="px-4 py-3 text-gray-400 text-sm">
                    {o.reviewReminder}
                  </td>
                </tr>
              ))}
              {currentOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-4 text-center text-gray-500">
                    No matching orders.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 text-sm text-gray-400">
          <div>
            Showing {(currentPage - 1) * itemsPerPage + 1}–{" "}
            {Math.min(currentPage * itemsPerPage, filtered.length)} of{" "}
            {filtered.length} orders
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

// Reusable dropdown component
function Dropdown({ label, options, onSelect, labels }) {
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
                  onClick={() => {
                    onSelect(opt);
                  }}
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
