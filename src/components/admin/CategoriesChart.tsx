import { Fragment, useState, useMemo } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";
import { useGetCategorySalesQuery } from "@/store/features/api/analitycsApi";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Label,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#15CAB8",
  "#44A6E9",
  "#E2362F",
  "#FEC600",
  "#FF8548",
  "#FB3BFA",
];

export default function CategoriesChart() {
  const periodOptions = [
    { label: "Week", value: "Week" },
    { label: "Month", value: "Month" },
    { label: "6 Months", value: "6 Months" },
    { label: "Year", value: "Year" },
  ];
  const [period, setPeriod] = useState("Week");
  const { data, isLoading, isError } = useGetCategorySalesQuery({ period });

  // prepare chart data
  const totalAll = data?.totalAll ?? 0;
  const pieData = useMemo(() => {
    return (data?.categories ?? []).map((c) => ({
      id: c.id,
      name: c.name,
      value: c.sales,
      itemsSold: c.itemsSold ?? 0,
      pct: c.percentage,
    }));
  }, [data]);

  return (
    <div className="relative border-2 border-[#FEC600] p-4 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">
          Sales by Categories
        </h3>
        <Menu as="div" className="relative inline-block text-left">
          <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm font-semibold text-white shadow-inner hover:bg-gray-700 focus:outline-none">
            {periodOptions.find((o) => o.value === period)?.label}
            <ChevronDownIcon className="w-5 h-5 fill-white/60" />
          </MenuButton>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems className="absolute right-0 mt-2 w-40 origin-top-right z-50 rounded-xl border border-white/5 bg-gray-800/90 p-1 text-sm text-white">
              {periodOptions.map((opt) => (
                <MenuItem key={opt.value}>
                  {({ active }) => (
                    <button
                      onClick={() => setPeriod(opt.value)}
                      className={`flex w-full items-center gap-2 rounded-lg py-1.5 px-3 ${
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
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="40%"
                cy="50%"
                innerRadius={76}
                outerRadius={100}
                paddingAngle={2}
              >
                {pieData.map((entry, idx) => (
                  <Cell key={entry.id} fill={COLORS[idx % COLORS.length]} />
                ))}
                <Label
                  value={`$${totalAll.toLocaleString("en-US")}`}
                  position="center"
                  fill="#fff"
                  fontSize={24}
                  className="font-semibold"
                />
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#F5A623",
                  border: "2px solid #F5A623",
                  borderRadius: "8px",
                  padding: "4px",
                }}
                itemStyle={{ color: "#000", fontWeight: 500 }}
                labelStyle={{ color: "#FEC600", fontWeight: "bold" }}
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
                verticalAlign="middle"
                wrapperStyle={{
                  marginTop: -20,
                  height: "100%",
                  overflowY: "auto",
                  paddingRight: "8px",
                }}
                formatter={(value, entry) => {
                  const { value: sales, itemsSold, pct } = entry.payload;
                  return (
                    <div className="flex flex-col mb-1 text-sm text-white">
                      <div className="flex items-center justify-between">
                        <span
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="flex-1">
                          {value} ({pct}%)
                        </span>
                        <span className="font-bold ml-2">
                          ${sales.toFixed(2)}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 ml-5">
                        {itemsSold} products
                      </span>
                    </div>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
