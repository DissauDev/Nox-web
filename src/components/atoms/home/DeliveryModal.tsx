import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

export default function DeliveryModal({ isOpen, onClose }) {
  const [mode, setMode] = useState("Delivery");

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-md"
        onClick={onClose}
      ></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative bg-gray-900 text-white rounded-2xl shadow-2xl p-6 w-96"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-4 text-purple-400">
          Select Order Type
        </h2>

        <div className="flex items-center justify-between bg-gray-800 rounded-full p-1 relative">
          <motion.div
            layout
            className={`absolute top-0 left-0 h-full w-1/2 bg-purple-500 rounded-full transition-all duration-300 ${
              mode === "Pick Up" ? "translate-x-full" : ""
            }`}
          />
          <button
            className={`relative z-10 w-1/2 py-2 text-center font-semibold ${
              mode === "Delivery" ? "text-white" : "text-gray-400"
            }`}
            onClick={() => setMode("Delivery")}
          >
            Delivery
          </button>
          <button
            className={`relative z-10 w-1/2 py-2 text-center font-semibold ${
              mode === "Pick Up" ? "text-white" : "text-gray-400"
            }`}
            onClick={() => setMode("Pick Up")}
          >
            Pick Up
          </button>
        </div>

        <p className="text-center text-gray-400 mt-4">
          {mode === "Delivery"
            ? "We will deliver your order to your address."
            : "Pick up your order at the store."}
        </p>

        <button
          className="mt-6 w-full py-2 bg-purple-600 hover:bg-purple-500 rounded-xl font-semibold transition-all"
          onClick={onClose}
        >
          Confirm
        </button>
      </motion.div>
    </Dialog>
  );
}
