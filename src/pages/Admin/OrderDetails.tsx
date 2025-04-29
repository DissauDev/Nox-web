import React, { useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";
import { FaCheck, FaChevronLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export const OrderDetails = () => {
  // --- Dummy order data
  const [order, setOrder] = useState({
    id: 8811,
    date: "2025-03-18",
    timeHour: "19",
    timeMinute: "54",
    status: "Processing",
    customerType: "Guest", // Guest or Registered user
    billing: {
      name: "Mauricio García",
      street: "new colorado",
      city: "California, CA 33123",
      email: "mauricio@gmail.com",
      phone: "+1 690 902-6463",
    },
    items: [
      {
        image: "/placeholder.svg",
        name: "Regular Scoop Ice Cream - Cake Cone",
        sku: "IR",
        variationId: 8418,
        containers: "Cake Cone",
        flavors: "Rainbow Sherbet",
        cost: "$6.10",
        qty: 1,
        total: "$6.10",
      },
    ],
    totals: {
      subtotal: "$6.10",
      total: "$6.10",
    },
    attribution: {
      origin: "Direct",
      device: "Desktop",
      pageViews: 17,
    },
    customerHistory: {
      totalOrders: 3,
      totalRevenue: "$31.05",
      avgOrder: "$10.35",
    },
  });

  // --- State for dropdowns
  const [status, setStatus] = useState(order.status);
  const [customerType, setCustomerType] = useState(order.customerType);

  const borderColor = "border border-[#036666]";
  const focusBorder = "focus:border-[#15CAB8] ";
  const navigate = useNavigate();
  return (
    <div className="p-6  text-white">
      <div className="flex items-center">
        <button
          className="hover:text-gray-300"
          onClick={() => navigate("/dashboard/orders")}
        >
          <FaChevronLeft size={28} className="mx-4" />
        </button>

        <h1 className="text-2xl font-bold my-4">Orders Details</h1>
      </div>
      <div className="max-w-7xl mx-auto flex gap-6">
        {/* Main */}
        <div className="flex-1 space-y-6">
          {/* General + Billing */}
          <div className="border-2 border-[#7436A2] p-6 rounded-md">
            <div className="grid grid-cols-3 gap-6">
              {/* Left: General (spans 2 cols) */}
              <div className="col-span-2 space-y-6">
                <h2 className="text-lg font-semibold">General</h2>

                {/* Date & Time */}
                <div className="flex flex-wrap gap-4">
                  <label className="block">
                    <span className="text-sm text-gray-300">Date created:</span>
                    <div>
                      <input
                        type="date"
                        value={order.date}
                        onChange={(e) =>
                          setOrder((o) => ({ ...o, date: e.target.value }))
                        }
                        className={`mt-1 bg-transparent border border-[#036666]  focus:outline-none focus:ring-0
  focus:border-[#15CAB8] rounded px-3 py-2`}
                      />
                    </div>
                  </label>
                  <label className="block">
                    <span className="text-sm text-gray-300 ">Time:</span>
                    <div className="flex gap-2 mt-1">
                      <input
                        min="0"
                        max="23"
                        value={order.timeHour}
                        onChange={(e) =>
                          setOrder((o) => ({ ...o, timeHour: e.target.value }))
                        }
                        className={`w-16 bg-transparent border border-[#036666] 
                          rounded px-2 py-2 text-center  focus:outline-none focus:ring-0
  focus:border-[#15CAB8]`}
                      />
                      <span className="px-1 text-gray-400">:</span>
                      <input
                        min="0"
                        max="59"
                        value={order.timeMinute}
                        onChange={(e) =>
                          setOrder((o) => ({
                            ...o,
                            timeMinute: e.target.value,
                          }))
                        }
                        className={`w-16 bg-transparent border border-[#036666] 
                          rounded px-2 py-2 text-center  focus:outline-none focus:ring-0
  focus:border-[#15CAB8]`}
                      />
                    </div>
                  </label>
                </div>

                {/* Status & Customer */}
                <div className="grid grid-cols-2 gap-4">
                  <Dropdown
                    label={`Status: ${status}`}
                    options={[
                      "Processing",
                      "Completed",
                      "On Hold",
                      "Cancelled",
                    ]}
                    onSelect={(v) => {
                      setStatus(v);
                      setOrder((o) => ({ ...o, status: v }));
                    }}
                    borderColor={borderColor}
                    focusBorder={focusBorder}
                  />
                  <Dropdown
                    label={`Customer: ${customerType}`}
                    options={["Guest", "Registered"]}
                    onSelect={(v) => {
                      setCustomerType(v);
                      setOrder((o) => ({ ...o, customerType: v }));
                    }}
                    borderColor={borderColor}
                    focusBorder={focusBorder}
                  />
                </div>
              </div>

              {/* Right: Billing */}
              <div className="space-y-2 ml-2">
                <h3 className="text-lg font-ArialBold">Billing</h3>
                <p className="">{order.billing.name}</p>
                <p>{order.billing.street}</p>
                <p>{order.billing.city}</p>
                <a
                  href={`mailto:${order.billing.email}`}
                  className="text-blue-400 hover:underline block"
                >
                  {order.billing.email}
                </a>
                <a
                  href={`tel:${order.billing.phone}`}
                  className="text-blue-400 hover:underline block"
                >
                  {order.billing.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className={`border-2 border-[#7436A2] p-6 rounded-md`}>
            <h2 className="text-lg font-semibold mb-4">Items</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700 text-left text-gray-300">
                  <th className="px-4 py-2">Item</th>
                  <th className="px-4 py-2">Cost</th>
                  <th className="px-4 py-2">Qty</th>
                  <th className="px-4 py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((it, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-900 border-b border-gray-700"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-start gap-3">
                        <img
                          src={it.image}
                          alt=""
                          className="w-10 h-10 rounded"
                        />
                        <div>
                          <div className="font-medium">{it.name}</div>
                          <div className="text-xs text-gray-400">
                            SKU: {it.sku}
                          </div>
                          <div className="text-xs text-gray-400">
                            Variation ID: {it.variationId}
                          </div>
                          <div className="text-xs text-gray-400">
                            Containers: {it.containers}
                          </div>
                          <div className="text-xs text-gray-400">
                            Ice Cream Flavors: {it.flavors}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">{it.cost}</td>
                    <td className="px-4 py-3">{it.qty}</td>
                    <td className="px-4 py-3">{it.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals & Refund */}
            <div className="flex justify-between items-center mt-6">
              <button className="bg-rose-700 hover:bg-rose-800 font-ArialBold px-4 py-2 rounded">
                Refund
              </button>
              <div className="text-right space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Items Subtotal:</span>
                  <span>{order.totals.subtotal}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Order Total:</span>
                  <span>{order.totals.total}</span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-gray-500 text-xs">
              ● This order is no longer editable.
            </p>
          </div>
        </div>
        {/* Sidebar */}
        <aside className="w-80 space-y-6">
          {/* Order Actions */}
          <div className={`border-2 border-[#7436A2] p-6 rounded-md space-y-4`}>
            <h2 className="font-semibold">Order Actions</h2>
            <div className="flex gap-2 min-w-full">
              <Dropdown
                label={` ${status}`}
                options={[
                  "Chosse an action",
                  "Mark as Complete",
                  "Send Invoce",
                ]}
                onSelect={(v) => {
                  setStatus(v);
                  setOrder((o) => ({ ...o, status: v }));
                }}
                borderColor={borderColor}
                focusBorder={focusBorder}
              />
              {/* <select
                className={`bg-gray-900 ${borderColor} ${focusBorder} rounded px-3 py-2 flex-1`}
              >
                <option>Choose an action...</option>
                <option>Mark as Complete</option>
                <option>Send Invoice</option>
              </select> */}
              <button className="bg-[#036666] hover:bg-[#2a857c] px-4 py-2 rounded">
                <FaCheck />
              </button>
            </div>
            <button className="text-rose-600 hover:underline text-sm">
              Move to Trash
            </button>
          </div>

          {/* Order Attribution */}
          <div
            className={`border-2  border-[#7436A2]  p-6 rounded-md space-y-2`}
          >
            <h2 className="font-semibold">Order Attribution</h2>
            <div className="text-sm text-gray-300">
              <p>
                <span className="font-medium">Origin:</span>{" "}
                {order.attribution.origin}
              </p>
              <p>
                <span className="font-medium">Device type:</span>{" "}
                {order.attribution.device}
              </p>
              <p>
                <span className="font-medium">Session page views:</span>{" "}
                {order.attribution.pageViews}
              </p>
            </div>
          </div>

          {/* Customer History */}
          <div
            className={`border-2  border-[#7436A2]  p-6 rounded-md space-y-2`}
          >
            <h2 className="font-semibold">Customer History</h2>
            <div className="text-sm text-gray-300">
              <p>
                <span className="font-medium">Total orders:</span>{" "}
                {order.customerHistory.totalOrders}
              </p>
              <p>
                <span className="font-medium">Total revenue:</span>{" "}
                {order.customerHistory.totalRevenue}
              </p>
              <p>
                <span className="font-medium">Average order value:</span>{" "}
                {order.customerHistory.avgOrder}
              </p>
            </div>
          </div>

          {/* Order Notes */}
          <div className={`border-2  border-[#7436A2]  p-6 rounded-md`}>
            <h2 className="font-semibold">Order Notes</h2>
            <p className="text-gray-500 text-sm">No notes yet.</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

// Simple Headless UI dropdown
function Dropdown({ label, options, onSelect, borderColor, focusBorder }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button
        className={`w-full text-left  ${borderColor} ${focusBorder} rounded px-4 py-2 flex items-center justify-between`}
      >
        <span className="text-gray-200">{label}</span>
        <ChevronDownIcon className="h-5 w-5 text-gray-400" />
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
        <Menu.Items className="absolute right-0 mt-1 w-full bg-gray-800 rounded shadow-lg ring-1 ring-black ring-opacity-5 z-10">
          {options.map((opt) => (
            <Menu.Item key={opt}>
              {({ active }) => (
                <button
                  onClick={() => onSelect(opt)}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    active ? "bg-[#036666] text-white" : "text-gray-300"
                  }`}
                >
                  {opt}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
