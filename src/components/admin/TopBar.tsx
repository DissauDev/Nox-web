import React from "react";

const Topbar = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4">
      <h1 className="text-xl font-semibold">Panel de Control</h1>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Buscar..."
          className="px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
        />
        <button className="p-2 hover:bg-gray-700 rounded">
          <span role="img" aria-label="notificaciones">
            🔔
          </span>
        </button>
      </div>
    </header>
  );
};

export default Topbar;
