import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
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

// Función para formatear el eje Y
function formatNumber(num) {
  if (num < 1000) return num;
  else if (num < 1000000) {
    let n = (num / 1000).toFixed(2).replace(/\.?0+$/, "");
    return n + "k";
  } else {
    let n = (num / 1000000).toFixed(2).replace(/\.?0+$/, "");
    return n + "M";
  }
}

// Custom Tooltip: muestra en una sola línea la etiqueta y el valor
const CustomTooltip = ({ active, label, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#F5A623", // naranja
          borderRadius: "8px",
          padding: 4,
        }}
        className="shadow"
      >
        <span
          className="font-ArialRegular"
          style={{ color: "#000", fontSize: "17px" }}
        >
          {label}: ${payload[0].value}
        </span>
      </div>
    );
  }
  return null;
};

// Datos dummy para cada período
const weekData = [
  { time: "Mon", sales: 450 },
  { time: "Tue", sales: 500 },
  { time: "Wed", sales: 480 },
  { time: "Thu", sales: 530 },
  { time: "Fri", sales: 610 },
  { time: "Sat", sales: 700 },
  { time: "Sun", sales: 650 },
];

const monthData = [
  { time: "1-8 Jun", sales: 3000 },
  { time: "9-16 Jun", sales: 3500 },
  { time: "17-24 Jun", sales: 3200 },
  { time: "25-31 Jun", sales: 4000 },
];

const sixMonthsData = [
  { time: "Jan", sales: 9000 },
  { time: "Feb", sales: 9500 },
  { time: "Mar", sales: 10000 },
  { time: "Apr", sales: 10500 },
  { time: "May", sales: 9800 },
  { time: "Jun", sales: 10200 },
];

const yearData = [
  { time: "Jan", sales: 12000 },
  { time: "Feb", sales: 11000 },
  { time: "Mar", sales: 13000 },
  { time: "Apr", sales: 12500 },
  { time: "May", sales: 14000 },
  { time: "Jun", sales: 13500 },
  { time: "Jul", sales: 15000 },
  { time: "Aug", sales: 14500 },
  { time: "Sep", sales: 13800 },
  { time: "Oct", sales: 14200 },
  { time: "Nov", sales: 15500 },
  { time: "Dec", sales: 16000 },
];

const salesMockData = {
  week: weekData,
  month: monthData,
  sixMonths: sixMonthsData,
  year: yearData,
};

export default function SalesChart() {
  const [period, setPeriod] = useState("week");
  const [data, setData] = useState(salesMockData[period]);
  const [loading, setLoading] = useState(false);

  // Función para obtener la etiqueta del dropdown
  const getLabel = (p) => {
    switch (p) {
      case "week":
        return "Week";
      case "month":
        return "Month";
      case "sixMonths":
        return "6M";
      case "year":
        return "Year";
      default:
        return "Period";
    }
  };

  // Simula una llamada a API con retardo de 2 segundos
  const handlePeriodChange = (newPeriod) => {
    setLoading(true);
    setTimeout(() => {
      setData(salesMockData[newPeriod]);
      setPeriod(newPeriod);
      setLoading(false);
    }, 2000);
  };

  // Configuración condicional para el XAxis: para 'year' rotamos los ticks y ajustamos margen
  const xAxisProps =
    period === "year"
      ? { tick: { angle: -45, textAnchor: "end", dx: -5 }, interval: 0 }
      : {};

  // Configuración condicional para el gráfico (ajuste de márgenes)
  const chartMargins =
    period === "year"
      ? { top: 0, right: 4, left: -24, bottom: 6 }
      : { top: 0, right: 4, left: -24, bottom: 6 };

  return (
    <div className="relative border-2 border-[#FEC600] p-4 rounded-xl">
      {/* Encabezado: Título y Dropdown */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Sales Variation</h3>
        <Menu as="div" className="relative inline-block text-left">
          <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm font-semibold text-white shadow-inner focus:outline-none hover:bg-gray-700">
            {getLabel(period)}
            <ChevronDownIcon className="w-5 h-5 fill-white/60" />
          </MenuButton>
          <MenuItems
            className="absolute right-0 mt-2 w-40 origin-top-right rounded-xl border border-white/5 bg-gray-800/90
           p-1 text-sm text-white shadow-lg z-50 transition duration-100 ease-out focus:outline-none"
          >
            <div>
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={() => handlePeriodChange("week")}
                    className={`group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 ${
                      active ? "bg-gray-700" : ""
                    }`}
                  >
                    Week
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={() => handlePeriodChange("month")}
                    className={`group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 ${
                      active ? "bg-gray-700" : ""
                    }`}
                  >
                    Month
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={() => handlePeriodChange("sixMonths")}
                    className={`group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 ${
                      active ? "bg-gray-700" : ""
                    }`}
                  >
                    6M
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={() => handlePeriodChange("year")}
                    className={`group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 ${
                      active ? "bg-gray-700" : ""
                    }`}
                  >
                    Year
                  </button>
                )}
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      </div>

      {/* Contenedor del gráfico con Spinner */}
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-10 rounded-xl">
            <div className="w-8 h-8 border-4 border-[#FEC600] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data} margin={chartMargins}>
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
              cursor={{
                fill: "#FFA500",
                stroke: "transparent",
                strokeWidth: 0,
              }}
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
      </div>
    </div>
  );
}
