/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";
import SkeletonCard from "../skeletons/SkeletonCard";
import StatCard from "./Statcard";
const getComparisonText = (period: string): string => {
  switch (period) {
    case "Day":
      return "vs yesterday";
    case "Week":
      return "vs last week";
    case "Month":
      return "vs last month";
    case "6 Months":
      return "vs last 6 months";
    case "Year":
      return "vs last year";
    default:
      return "vs yesterday";
  }
};

const generateTrendData = () =>
  Array.from({ length: 6 }, () => ({
    value: Math.floor(Math.random() * 100) + 20,
  }));

const StatsCards = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Day");
  const [cardsData, setCardsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      const generated = [
        { title: "Customers", value: Math.floor(Math.random() * 1000) },
        { title: "Orders", value: Math.floor(Math.random() * 500) },
        { title: "Earnings", value: `$${Math.floor(Math.random() * 10000)}` },
        { title: "Total Products", value: Math.floor(Math.random() * 300) },
      ];
      setCardsData(generated);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, [selectedPeriod]);

  return (
    <div className="mt-10">
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold">Dashboard Overview</h2>
        <Menu as="div" className="relative inline-block text-left">
          <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm font-semibold text-white hover:bg-gray-700">
            {selectedPeriod}
            <ChevronDownIcon className="w-5 h-5 fill-white/60" />
          </MenuButton>
          <MenuItems className="absolute right-0 mt-2 w-44 origin-top-right rounded-xl bg-gray-800 p-1 text-sm text-white shadow-lg z-50">
            {["Day", "Week", "Month", "6 Months", "Year"].map((option) => (
              <MenuItem key={option}>
                {({ active }) => (
                  <button
                    onClick={() => setSelectedPeriod(option)}
                    className={`group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 ${
                      active ? "bg-gray-700" : ""
                    }`}
                  >
                    {option}
                  </button>
                )}
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {loading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))
          : cardsData.map((card, idx) => {
              const percentage = Math.floor(Math.random() * 101) - 50;
              const isPositive = percentage >= 0;
              const trendData = generateTrendData();
              const compareText = getComparisonText(selectedPeriod);

              return (
                <StatCard
                  key={idx}
                  title={card.title}
                  value={card.value}
                  percentage={percentage}
                  isPositive={isPositive}
                  trendData={trendData}
                  comparisonText={compareText}
                />
              );
            })}
      </div>
    </div>
  );
};

export default StatsCards;
