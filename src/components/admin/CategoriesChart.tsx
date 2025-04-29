import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";
import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Label,
  Tooltip,
} from "recharts";

// Datos iniciales
const mockData = {
  week: [
    { name: "For-you", value: 400 },
    { name: "Ice-cream", value: 300 },
    { name: "Desserts", value: 370 },
    { name: "Coockies", value: 200 },
    { name: "Mashoops", value: 100 },
    { name: "Drinks", value: 460 },
  ],
  month: [
    { name: "For-you", value: 450 },
    { name: "Ice-cream", value: 330 },
    { name: "Desserts", value: 390 },
    { name: "Coockies", value: 289 },
    { name: "Mashoops", value: 350 },
    { name: "Drinks", value: 415 },
  ],
  sixMonths: [
    { name: "For-you", value: 300 },
    { name: "Ice-cream", value: 320 },
    { name: "Desserts", value: 350 },
    { name: "Coockies", value: 300 },
    { name: "Mashoops", value: 190 },
    { name: "Drinks", value: 600 },
  ],
  year: [
    { name: "For-you", value: 400 },
    { name: "Ice-cream", value: 200 },
    { name: "Desserts", value: 310 },
    { name: "Coockies", value: 220 },
    { name: "Mashoops", value: 800 },
    { name: "Drinks", value: 360 },
  ],
};

// Colores para cada categoría
const COLORS = [
  "#15CAB8",
  "#44A6E9",
  "#E2362F",
  "#FEC600",
  "#FF8548",
  "#FB3BFA",
];

export default function CategoriesChart() {
  // Estado del período seleccionado, datos y spinner de carga
  const [period, setPeriod] = useState("week");
  const [categoryData, setCategoryData] = useState(mockData[period]);
  const [loading, setLoading] = useState(false);

  // Calcula el total a partir de los datos actuales
  const totalValue = categoryData.reduce((acc, cur) => acc + cur.value, 0);

  // Función para mostrar la etiqueta según el período seleccionado
  const getLabel = (period) => {
    switch (period) {
      case "week":
        return "Semana";
      case "month":
        return "Mes";
      case "sixMonths":
        return "6 Meses";
      case "year":
        return "1 Año";
      default:
        return "Periodo";
    }
  };

  // Función para cambiar el período: simula 2 segundos de carga
  const handlePeriodChange = (newPeriod) => {
    setLoading(true);
    setTimeout(() => {
      setCategoryData(mockData[newPeriod]);
      setPeriod(newPeriod);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="relative border-2 border-[#FEC600] p-4 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Sales By Categories</h3>
        {/* Dropdown con Headless UI */}
        <Menu as="div" className="relative inline-block text-left">
          <MenuButton
            className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 
          px-3 text-sm font-semibold text-white shadow-inner focus:outline-none hover:bg-gray-700"
          >
            {getLabel(period)}
            <ChevronDownIcon className="w-5 h-5 fill-white/60" />
          </MenuButton>
          <MenuItems className="absolute right-0 mt-2 w-40 origin-top-right z-50 rounded-xl border border-white/5 bg-gray-800/90 p-1 text-sm text-white transition duration-100 ease-out focus:outline-none">
            <div>
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={() => handlePeriodChange("week")}
                    className={`group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 ${
                      active ? "bg-gray-700" : ""
                    }`}
                  >
                    Semana
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
                    Mes
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
                    6 Meses
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
                    1 Año
                  </button>
                )}
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      </div>

      {/* Contenedor del gráfico */}
      <div className="relative">
        {/* Capa de carga: se muestra sobre el gráfico con opacidad y spinner */}
        {loading && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-10 rounded-xl">
            <div className="w-8 h-8 border-4 border-[#FEC600] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="40%"
              cy="50%"
              innerRadius={76}
              outerRadius={100}
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
              <Label
                value={`$${totalValue.toLocaleString("en-US")}`}
                position="center"
                className="label-top font-ArialRegular"
                fill="#fff"
                fontSize={24}
              />
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#F5A623",
                border: "2px solid #F5A623",
                borderRadius: "8px",
                color: "#000",
                paddingTop: 2,
                paddingBottom: 2,
                paddingLeft: 2,
                paddingRight: 2,
              }}
              itemStyle={{
                color: "#000",
                fontSize: "16px",
                fontWeight: 500,
                marginBottom: 0,
              }}
              labelStyle={{
                color: "#FEC600",
                fontSize: "16px",
                fontWeight: "bold",
                marginBottom: 4,
              }}
              cursor={{
                fill: "transparent",
                stroke: "#FEC600",
                strokeWidth: 1,
              }}
            />
            <Legend
              iconSize={0}
              layout="vertical"
              align="right"
              verticalAlign="top"
              wrapperStyle={{ marginTop: -20 }} // <- Ajustá este valor a lo que necesites
              formatter={(value, entry) => {
                const category = entry.payload;
                const percentage = (
                  (category.value / totalValue) *
                  100
                ).toFixed(0);
                const sold = Math.floor(category.value / 10);

                return (
                  <div className="flex flex-col h-3 ">
                    <div className="flex items-center justify-between w-50">
                      <span
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-white text-sm flex-1">
                        {value} ({percentage}%)
                      </span>
                      <span className="text-sm font-bold text-white ml-4">
                        ${category.value}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 ml-5">
                      {sold} products
                    </span>
                  </div>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
