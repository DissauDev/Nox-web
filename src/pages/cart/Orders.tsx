import React from "react";
import { motion } from "framer-motion";
import { FaChevronRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export const Orders = () => {
  const navigate = useNavigate();

  // Variantes para la animación al aparecer
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
      <div className="flex justify-center mt-6 items-center font-ArialBold text-sm  md:text-xl text-grape-800 space-x-2 mb-8">
        <a className=" transition-colors" href="#">
          Shopping Cart
        </a>
        <FaChevronRight className="text-grape-800" />
        <button
          className=" transition-colors"
          onClick={() => navigate("/checkout")}
        >
          Checkout
        </button>
        <FaChevronRight className="text-grape-800" />
        <span className="text-grape-800">Order Complete</span>
      </div>

      {/* Contenedor de confirmación de orden */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="max-w-4xl mx-auto p-8  border-grape-800 shadow-2xl border-b-8 border-r-8 rounded-md"
      >
        {/* Mensaje de confirmación */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-grape-800 text-center mb-6"
        >
          ✅ Thank you. Your order has been received.
        </motion.h2>

        {/* Resumen de detalles de la orden */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-between items-center text-gray-800 mb-8 border-b border-gray-300 pb-4"
        >
          <div className="w-full sm:w-auto mb-3 sm:mb-0 px-2">
            <p className="text-base font-semibold">
              <span className="text-pompadour-950 font-ArialBold">
                Order Number:
              </span>{" "}
              8810
            </p>
          </div>
          <div className="w-full sm:w-auto mb-3 sm:mb-0 px-2">
            <p className="text-base font-semibold">
              <span className="text-pompadour-950 font-ArialBold">Status:</span>{" "}
              Processing
            </p>
          </div>
          <div className="w-full sm:w-auto mb-3 sm:mb-0 px-2">
            <p className="text-base font-semibold">
              <span className="text-pompadour-950 font-ArialBold">Date:</span>{" "}
              March 1, 2025
            </p>
          </div>
          <div className="w-full sm:w-auto mb-3 sm:mb-0 px-2">
            <p className="text-base font-semibold">
              <span className="text-pompadour-950 font-ArialBold">Total:</span>{" "}
              $19.60
            </p>
          </div>
          <div className="w-full sm:w-auto px-2">
            <p className="text-base font-semibold">
              <span className="text-pompadour-950 font-ArialBold">
                Payment method:
              </span>{" "}
              Cash on delivery
            </p>
          </div>
        </motion.div>

        {/* Lista de productos */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-6 text-grape-800"
        >
          <h3 className="text-xl font-semibold mb-4">Your order</h3>
          <div className="space-y-4">
            {/* Producto 1 */}
            <div className="flex flex-col sm:flex-row justify-between items-start p-4 border border-grape-800 rounded-md">
              <div>
                <p className="font-medium">
                  Regular Scoop Ice Cream - Cake Cone{" "}
                  <span className="text-sm text-gray-500">× 1</span>
                </p>
                <p className="text-xs text-gray-500">Containers: Cake Cone</p>
                <p className="text-xs text-gray-500">
                  Ice Cream Flavors: Chocolate
                </p>
              </div>
              <p className="font-medium mt-2 sm:mt-0">$6.10</p>
            </div>
            {/* Producto 2 */}
            <div className="flex flex-col sm:flex-row justify-between items-center p-4 border border-grape-800 rounded-md">
              <p className="font-medium">
                Chocolate Chip 'n Chunk with Sea Salt{" "}
                <span className="text-sm text-gray-500">× 3</span>
              </p>
              <p className="font-medium">$8.10</p>
            </div>
            {/* Producto 3 */}
            <div className="flex flex-col sm:flex-row justify-between items-center p-4 border border-grape-800 rounded-md">
              <p className="font-medium">
                Snickerdoodle <span className="text-sm text-gray-500">× 1</span>
              </p>
              <p className="font-medium">$2.70</p>
            </div>
            {/* Producto 4 */}
            <div className="flex flex-col sm:flex-row justify-between items-center p-4 border border-grape-800 rounded-md">
              <p className="font-medium">
                Peanut Butter <span className="text-sm text-gray-500">× 1</span>
              </p>
              <p className="font-medium">$2.70</p>
            </div>
          </div>

          {/* Totales */}
          <div className="mt-6 space-y-2 text-right">
            <p className="text-gray-800 font-medium">
              <span className="font-bold text-grape-800">Subtotal:</span> $19.60
            </p>
            <p className="text-gray-800 font-medium">
              <span className="font-bold text-grape-800">Payment method:</span>{" "}
              Cash on delivery
            </p>
            <p className="text-xl font-bold text-gray-800">
              <span className="font-ArialBold text-grape-800">Total:</span>{" "}
              $19.60
            </p>
          </div>
        </motion.div>

        {/* Dirección de facturación */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          {/* Billing Address */}

          <h3 className="text-xl font-semibold mb-4">Billing Address</h3>
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner border-l-4 border-grape-800 ">
            <p className="font-semibold text-gray-800">Mauricio García</p>
            <p className="text-gray-600">New Colorado</p>
            <p className="text-gray-600">California, CA 33123</p>
            <p className="text-gray-600">+1 690 902-6463</p>
            <p className="text-gray-900 underline">mauricio@gmail.com</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
