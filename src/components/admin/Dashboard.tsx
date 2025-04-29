import React from "react";

import SalesChart from "./SalesChart";
import CategoriesChart from "./CategoriesChart";

const Dashboard = () => {
  return (
    <div className="space-x-2 flex">
      {/* Gráfico de Ventas */}
      <div className="bg-gray-800 p-6 rounded shadow">
        <h3 className="text-lg font-medium mb-4">Ventas</h3>
        <SalesChart />
      </div>

      {/* Gráfico de Categorías */}
      <div className="bg-gray-800 p-6 rounded shadow">
        <h3 className="text-lg font-medium mb-4">Categorías</h3>
        <CategoriesChart />
      </div>
    </div>
  );
};

export default Dashboard;
