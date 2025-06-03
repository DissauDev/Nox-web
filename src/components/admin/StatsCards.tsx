import React, { useState, useMemo } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";
import SkeletonCard from "../skeletons/SkeletonCard";
import StatCard from "./Statcard";
import { useGetDashboardOverviewQuery } from "@/store/features/api/analitycsApi";

const getComparisonText = (period) => {
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
    case "All":
      return "since inception";
    default:
      return "vs yesterday";
  }
};

const StatsCards = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Day");
  const { data, isLoading, isError } = useGetDashboardOverviewQuery({
    period: selectedPeriod,
  });

  const cardsData = useMemo(() => {
    if (!data) return [];
    return [
      {
        title: "Customers",
        value: data.customers,
        pct: data.customersPctChange,
      },
      { title: "Orders", value: data.orders, pct: data.ordersPctChange },
      {
        title: "Earnings",
        value: `$${data.earnings.toFixed(2)}`,
        pct: data.earningsPctChange,
      },
      {
        title: "Products Sell",
        value: data.productsSold,
        pct: data.productsPctChange,
      },
    ];
  }, [data]);

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
            {["Day", "Week", "Month", "6 Months", "Year", "All"].map(
              (option) => (
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
              )
            )}
          </MenuItems>
        </Menu>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {isLoading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))
          : cardsData.map((card, idx) => {
              const isPositive = card.pct >= 0;
              const compareText = getComparisonText(selectedPeriod);
              const trendData = Array.from({ length: 6 }, () => ({
                value: card.pct,
              }));

              return (
                <StatCard
                  key={idx}
                  title={card.title}
                  value={card.value}
                  percentage={Math.round(card.pct)}
                  isPositive={isPositive}
                  trendData={trendData}
                  comparisonText={compareText}
                />
              );
            })}
        {isError && <p className="text-red-500">Error loading statistics.</p>}
      </div>
    </div>
  );
};

export default StatsCards;
