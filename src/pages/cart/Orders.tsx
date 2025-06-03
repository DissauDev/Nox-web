// src/components/pages/Orders.tsx
import React from "react";
import { motion } from "framer-motion";
import { FaChevronRight } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOrderQuery } from "@/store/features/api/ordersApi";

export const Orders: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading, isError } = useGetOrderQuery(id!);

  if (isLoading) return <p className="text-center">Loading order…</p>;
  if (isError || !order)
    return <p className="text-center text-red-500">Error loading order.</p>;

  const date = new Date(order.createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen py-10 mt-10 px-4">
      {/* Breadcrumbs */}
      <div className="flex justify-center mt-6 items-center font-ArialBold text-sm md:text-xl text-grape-800 space-x-2 mb-8">
        <button onClick={() => navigate("/cart")} className="hover:underline">
          Shopping Cart
        </button>
        <FaChevronRight className="text-grape-800" />
        <button
          onClick={() => navigate("/checkout")}
          className="hover:underline"
        >
          Checkout
        </button>
        <FaChevronRight className="text-grape-800" />
        <span className="text-gray-500">Order Complete</span>
      </div>

      {/* Confirmation card */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="max-w-4xl mx-auto p-8 border-grape-800 shadow-2xl border-b-8 border-r-8 rounded-md"
      >
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-grape-800 text-center mb-6"
        >
          ✅ Thank you. Your order has been received.
        </motion.h2>

        {/* Order summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-between items-center text-gray-800 mb-8 border-b border-gray-300 pb-4"
        >
          {/** Order meta */}
          <div className="w-full sm:w-auto mb-3 sm:mb-0 px-2">
            <p className="text-base font-semibold">
              <span className="text-pompadour-950 font-ArialBold">#:</span>{" "}
              {order.orderNumber}
            </p>
          </div>
          <div className="w-full sm:w-auto mb-3 sm:mb-0 px-2">
            <p className="text-base font-semibold">
              <span className="text-pompadour-950 font-ArialBold">Status:</span>{" "}
              {order.status}
            </p>
          </div>
          <div className="w-full sm:w-auto mb-3 sm:mb-0 px-2">
            <p className="text-base font-semibold">
              <span className="text-pompadour-950 font-ArialBold">Date:</span>{" "}
              {date}
            </p>
          </div>
          <div className="w-full sm:w-auto mb-3 sm:mb-0 px-2">
            <p className="text-base font-semibold">
              <span className="text-pompadour-950 font-ArialBold">Total:</span>{" "}
              ${order.totalAmount.toFixed(2)}
            </p>
          </div>
          <div className="w-full sm:w-auto px-2">
            <p className="text-base font-semibold">
              <span className="text-pompadour-950 font-ArialBold">
                Payment method:
              </span>{" "}
              {order.paymentMethod}
            </p>
          </div>
        </motion.div>

        {/* Ordered items */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-6 text-grape-800"
        >
          <h3 className="text-xl font-semibold mb-4">Your order</h3>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row justify-between items-start p-4 border border-grape-800 rounded-md"
              >
                <div>
                  <p className="font-medium">
                    {item.product.name}{" "}
                    <span className="text-sm text-gray-500">
                      × {item.quantity}
                    </span>
                  </p>
                  {item.chosenOptions?.length > 0 && (
                    <div className="mt-1 space-y-1 text-xs text-gray-500">
                      {item.chosenOptions.map((opt) => (
                        <p key={opt.id}>
                          <span className="font-ArialBold">
                            {opt.groupName}:
                          </span>{" "}
                          {opt.name}
                          {opt.extraPrice > 0 && (
                            <span> (+${opt.extraPrice.toFixed(2)})</span>
                          )}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
                <p className="font-medium mt-2 sm:mt-0">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            viewport={{ once: true }}
            className="my-6 text-gray-600"
          >
            <p className="text-sm">
              <span className="font-ArialBold text-grape-800">Note:</span>{" "}
              {order.specifications}
            </p>
          </motion.div>

          {/* Totals breakdown */}
          <div className="mt-6 space-y-2 text-right">
            <p className="text-gray-800 font-medium">
              <span className="font-bold text-grape-800">Subtotal:</span> $
              {order.subtotal.toFixed(2)}
            </p>
            {/*  <p className="text-gray-800 font-medium">
              <span className="font-bold text-grape-800">Tax:</span>{" "}
              ${order.tax?.toFixed(2) ?? "0.00"}
            </p> */}
            <p className="text-xl font-bold text-gray-800">
              <span className="font-ArialBold text-grape-800">Total:</span> $
              {order.totalAmount.toFixed(2)}
            </p>
          </div>
        </motion.div>

        {/* Billing address */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-900">
            Billing Address
          </h3>
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner border-l-4 border-grape-800">
            <p className="font-semibold text-gray-800">{order.customerName}</p>
            <p className="text-gray-600">{order.customerAddress}</p>
            <p className="text-gray-600">{order.customerPhone}</p>
            <p className="text-gray-900 underline">{order.customerEmail}</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Orders;
