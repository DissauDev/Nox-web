/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";
import React, { useState } from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetSalesTrendQuery } from "@/store/features/api/analitycsApi";

// Formatea eje Y
function formatNumber(num) {
  if (num < 1000) return num;
  if (num < 1000000) {
    const n = (num / 1000).toFixed(2).replace(/\.0+$/, "");
    return n + "k";
  }
  const n = (num / 1000000).toFixed(2).replace(/\.0+$/, "");
  return n + "M";
}

// Tooltip personalizado
const CustomTooltip = ({ active, label, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{ backgroundColor: "#F5A623", borderRadius: 8, padding: 4 }}
        className="shadow"
      >
        <span className="font-ArialRegular text-black text-[17px]">
          {label}: ${payload[0].value}
        </span>
      </div>
    );
  }
  return null;
};

export default function SalesChart() {
  const periodOptions = [
    { label: "Week", value: "Week" },
    { label: "Month", value: "Month" },
    { label: "6 Months", value: "6 Months" },
    { label: "Year", value: "Year" },
  ];
  const [period, setPeriod] = useState("Week");

  //@ts-ignore
  const { data, isLoading, isError } = useGetSalesTrendQuery({ period });
  const chartData = data?.data ?? [];

  const xAxisProps =
    period === "Year"
      ? { tick: { angle: -45, textAnchor: "end", dx: -5 }, interval: 0 }
      : {};
  const chartMargins = { top: 0, right: 4, left: -24, bottom: 6 };

  return (
    <div className="relative border-2 border-[#FEC600] p-4 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Sales Variation</h3>
        <Menu as="div" className="relative inline-block text-left">
          <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm font-semibold text-white shadow-inner focus:outline-none hover:bg-gray-700">
            {period}
            <ChevronDownIcon className="w-5 h-5 fill-white/60" />
          </MenuButton>
          <Transition
            as={React.Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems className="absolute right-0 mt-2 w-40 origin-top-right rounded-xl border border-white/5 bg-gray-800/90 p-1 text-sm text-white shadow-lg z-50">
              {periodOptions.map((opt) => (
                <MenuItem key={opt.value}>
                  {({ active }) => (
                    <button
                      onClick={() => setPeriod(opt.value)}
                      className={`group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 ${
                        active ? "bg-gray-700" : ""
                      } ${period === opt.value ? "font-medium" : ""}`}
                    >
                      {opt.label}
                    </button>
                  )}
                </MenuItem>
              ))}
            </MenuItems>
          </Transition>
        </Menu>
      </div>

      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-10 rounded-xl">
            <div className="w-8 h-8 border-4 border-[#FEC600] border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {isError ? (
          <p className="text-red-500 text-center py-6">Error loading data</p>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chartData} margin={chartMargins}>
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF8548" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0.11} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis dataKey="time" stroke="#ccc" {...xAxisProps} />
              <YAxis stroke="#ccc" tickFormatter={formatNumber} />
              <Tooltip
                content={
                  <CustomTooltip
                    active={undefined}
                    label={undefined}
                    payload={undefined}
                  />
                }
                cursor={{ fill: "transparent" }}
              />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#F5A623"
                fill="url(#gradient)"
                fillOpacity={1}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
