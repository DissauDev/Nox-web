import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";

export default function PeriodDropdown({ period, setPeriod }) {
  // Función para mostrar el label del período en español
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
        return "Seleccione";
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm font-semibold text-white shadow-inner focus:outline-none hover:bg-gray-700">
        {getLabel(period)}
        <ChevronDownIcon className="w-5 h-5 fill-white/60" />
      </Menu.Button>

      <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm text-white transition duration-100 ease-out focus:outline-none">
        <div>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => setPeriod("week")}
                className={`group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 ${
                  active ? "bg-white/10" : ""
                }`}
              >
                Semana
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => setPeriod("month")}
                className={`group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 ${
                  active ? "bg-white/10" : ""
                }`}
              >
                Mes
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => setPeriod("sixMonths")}
                className={`group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 ${
                  active ? "bg-white/10" : ""
                }`}
              >
                6 Meses
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => setPeriod("year")}
                className={`group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 ${
                  active ? "bg-white/10" : ""
                }`}
              >
                1 Año
              </button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
}
