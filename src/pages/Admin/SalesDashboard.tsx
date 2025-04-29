import DateRangeSelector, {
  DateRange,
} from "@/components/admin/DateRangeSelector";
import SalesCompareCharts from "@/components/admin/SalesCompareCharts";
import StatCard from "@/components/admin/Statcard";
import React, { useState, useEffect } from "react";

const generateTrendData = () => {
  return Array.from({ length: 7 }, () => ({
    value: Math.floor(Math.random() * 100) + 10,
  }));
};

const simulateFetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalSales: {
          title: "Total Sales",
          value: "$5,420.00",
          percentage: 12,
          isPositive: true,
          comparisonText: "vs. Previous year",
        },
        orders: {
          title: "Orders",
          value: 124,
          percentage: -8,
          isPositive: false,
          comparisonText: "vs. Previous year",
        },
        productsSold: {
          title: "Products Sold",
          value: 312,
          percentage: 5,
          isPositive: true,
          comparisonText: "vs. Previous year",
        },
        variationsSold: {
          title: "Variations Sold",
          value: 87,
          percentage: 3,
          isPositive: true,
          comparisonText: "vs. Previous year",
        },
      });
    }, 1000);
  });
};

const SalesDashboard = () => {
  const [dateRangeLabel, setDateRangeLabel] = useState("Month to date");
  const [compareLabel, setCompareLabel] = useState("Previous year");
  const [selectedRange, setSelectedRange] = useState<DateRange | null>(null);
  const [compareRange, setCompareRange] = useState<DateRange | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    simulateFetchData().then((res: any) => {
      setData({
        totalSales: { ...res.totalSales, trendData: generateTrendData() },
        orders: { ...res.orders, trendData: generateTrendData() },
        productsSold: { ...res.productsSold, trendData: generateTrendData() },
        variationsSold: {
          ...res.variationsSold,
          trendData: generateTrendData(),
        },
      });
    });
  }, [dateRangeLabel, compareLabel]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Performance</h2>
        <div className="w-full max-w-md">
          <DateRangeSelector
            onUpdate={(rangeText, compareText, range, compare) => {
              setDateRangeLabel(rangeText);
              setCompareLabel(compareText);
              setSelectedRange(range);
              setCompareRange(compare);
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {data ? (
          <>
            <StatCard {...data.totalSales} />
            <StatCard {...data.orders} />
            <StatCard {...data.productsSold} />
            <StatCard {...data.variationsSold} />
          </>
        ) : (
          <div className="col-span-4 text-center text-gray-500">
            Loading data...
          </div>
        )}
      </div>

      {selectedRange && compareRange && (
        <SalesCompareCharts
          selectedRange={selectedRange}
          compareRange={compareRange}
        />
      )}
    </div>
  );
};

export default SalesDashboard;
