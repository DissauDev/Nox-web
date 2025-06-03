import React from "react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg- p-6 bg-red-300">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Dashboard</h2>
      </div>
      <nav>
        <ul>
          <li className="mb-4">
            <a
              href="#"
              className="flex items-center p-2 hover:bg-[#5C2C8A] rounded transition-colors"
            >
              <span className="ml-3">Inicio</span>
            </a>
          </li>
          <li className="mb-4">
            <a
              href="#"
              className="flex items-center p-2 hover:bg-[#5C2C8A] rounded transition-colors"
            >
              <span className="ml-3">Ventas</span>
            </a>
          </li>
          <li className="mb-4">
            <a
              href="#"
              className="flex items-center p-2 hover:bg-[#5C2C8A] rounded transition-colors"
            >
              <span className="ml-3">Categorías</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
