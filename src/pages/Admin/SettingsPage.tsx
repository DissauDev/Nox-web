import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import {
  useGetStoreConfigQuery,
  useUpdateStoreConfigMutation,
} from "@/store/features/api/storeConfigApi";

import { InputNumber } from "@/components/ui/InputNumber";
import { MdOutlineDone } from "react-icons/md";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";

export const SettingsPage = () => {
  // 1️⃣ Traer datos desde el backend
  const { data, isLoading, isError, refetch } = useGetStoreConfigQuery();

  // 2️⃣ Mutación para update
  const [updateStoreConfig, { isLoading: isUpdating }] =
    useUpdateStoreConfigMutation();

  // 3️⃣ Estado local para editar
  const [taxEnabled, setTaxEnabled] = useState(false);
  const [taxPercent, setTaxPercent] = useState(0);
  const [taxFixed, setTaxFixed] = useState(0);

  // 4️⃣ Sincronizar cuando cargue data
  useEffect(() => {
    if (data) {
      setTaxEnabled(data.taxEnabled);
      setTaxPercent(data.taxPercent);
      setTaxFixed(data.taxFixed);
    }
  }, [data]);

  // 5️⃣ Guardar cambios
  const handleSave = async () => {
    try {
      await updateStoreConfig({
        taxEnabled,
        taxPercent,
        taxFixed,
      }).unwrap();

      // Optionally refetch
      refetch();
      toast({
        className: "border-l-4 border-green-500",
        title: "✅  Success",
        description: "Your value vas created",
      });
    } catch (error) {
      console.error(error);
      toast({
        className: "border-l-4 border-red-500 ",
        title: "❌  Error",
        description: error.message || "Was an error to add value",
      });
    }
  };

  // 6️⃣ Loading/Error UI
  if (isLoading) {
    return (
      <div className="p-6 text-white">
        <h1 className="text-3xl my-4 font-ArialBold">Settings</h1>
        <div className="text-gray-400">Loading store config...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-white">
        <h1 className="text-3xl my-4 font-ArialBold">Settings</h1>
        <div className="text-red-400">
          Error loading store config. Please try again.
        </div>
      </div>
    );
  }

  // 7️⃣ UI final
  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl my-4 font-ArialBold">Settings</h1>

      <div className="w-2/3 bg-[#15203a] border border-sapphire-700 p-4 rounded-2xl ml-4 space-y-4">
        <h3 className="text-xl mb-2 font-ArialRegular">Tax Config</h3>

        <div className="flex items-center space-x-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={taxEnabled}
              onChange={(e) => setTaxEnabled(e.target.checked)}
              className="hidden"
            />
            <motion.div
              whileTap={{ scale: 0.9 }}
              className={`w-6 h-6 flex-shrink-0 border-2 rounded transition-all duration-200 flex justify-center items-center ${
                taxEnabled
                  ? "bg-sapphire-500 border-sapphire-400"
                  : "bg-transparent border-gray-500"
              }`}
            >
              {taxEnabled && <MdOutlineDone className="w-4 h-4 text-white" />}
            </motion.div>
          </label>
          <span className="font-ArialRegular">Enable Tax</span>
        </div>

        <div className="space-y-2">
          <label className="block">
            <span className="text-sm font-ArialRegular">Tax Percent (%)</span>
            <InputNumber
              variant="price"
              placeholder="Tax Percent"
              value={taxPercent}
              onChange={setTaxPercent}
            />
          </label>

          <label className="block">
            <span className="text-sm font-ArialRegular">Tax Fixed ($)</span>
            <InputNumber
              variant="price"
              placeholder="Tax Fixed"
              value={taxFixed}
              onChange={setTaxFixed}
            />
          </label>
        </div>

        <Button
          onClick={handleSave}
          disabled={isUpdating}
          className="flex items-center justify-center w-full mt-4 bg-sapphire-900 hover:bg-sapphire-800"
        >
          {isUpdating ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};
