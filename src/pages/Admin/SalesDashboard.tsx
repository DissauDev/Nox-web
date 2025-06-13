/* eslint-disable @typescript-eslint/ban-ts-comment */
import DateRangeSelector, {
  DateRange,
} from "@/components/admin/DateRangeSelector";
import SalesCompareCharts from "@/components/admin/SalesCompareCharts";
import StatCard from "@/components/admin/Statcard";
import React, { useState, useMemo } from "react";
import { useGetPerformanceQuery } from "@/store/features/api/analitycsApi";
import SkeletonCard from "@/components/skeletons/SkeletonCard";
import TopSellingSkeleton from "@/components/skeletons/TopSellingSkeleton";

const generateTrendData = () => {
  return Array.from({ length: 7 }, () => ({
    value: Math.floor(Math.random() * 100) + 10,
  }));
};

const SalesDashboard = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dateRangeLabel, setDateRangeLabel] = useState("Month to date");
  const [compareLabel, setCompareLabel] = useState("Previous year");
  const [selectedRange, setSelectedRange] = useState<DateRange | null>(null);
  const [compareRange, setCompareRange] = useState<DateRange | null>(null);

  // 1️⃣ Memoiza los argumentos para que no cambien de referencia en cada render
  const queryArgs = useMemo(
    () => ({
      start: selectedRange?.startDate.toISOString() ?? "",
      end: selectedRange?.endDate.toISOString() ?? "",
      compareStart: compareRange?.startDate.toISOString() ?? "",
      compareEnd: compareRange?.endDate.toISOString() ?? "",
    }),
    [selectedRange, compareRange]
  );

  // 2️⃣ Desactiva refetch en cada mount//arg change
  const {
    data: perfData,
    isLoading,
    isError,
  } = useGetPerformanceQuery(queryArgs, {
    skip: !selectedRange || !compareRange,
    refetchOnMountOrArgChange: false,
  });

  const stats = useMemo(() => {
    if (!perfData) return null;
    return {
      totalSales: {
        title: "Total Sales",
        value: `$${perfData.totalSales.current.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
        percentage: perfData.totalSales.pctChange,
        isPositive: perfData.totalSales.pctChange >= 0,
        comparisonText: `vs ${compareLabel}`,
        trendData: generateTrendData(),
      },
      orders: {
        title: "Orders",
        value: perfData.orders.current,
        percentage: perfData.orders.pctChange,
        isPositive: perfData.orders.pctChange >= 0,
        comparisonText: `vs ${compareLabel}`,
        trendData: generateTrendData(),
      },
      productsSold: {
        title: "Products Sold",
        value: perfData.productsSold.current,
        percentage: perfData.productsSold.pctChange,
        isPositive: perfData.productsSold.pctChange >= 0,
        comparisonText: `vs ${compareLabel}`,
        trendData: generateTrendData(),
      },
      variationsSold: {
        title: "Variations Sold",
        value: perfData.variationsSold.current,
        percentage: perfData.variationsSold.pctChange,
        isPositive: perfData.variationsSold.pctChange >= 0,
        comparisonText: `vs ${compareLabel}`,
        trendData: generateTrendData(),
      },
    };
  }, [perfData, compareLabel]);

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
        {isLoading || !stats ? (
          <div className="col-span-4 text-center text-gray-500">
            <div className="flex-col">
              <div className="flex-row">
                <SkeletonCard />
              </div>

              <div className="flex gap-4">
                <TopSellingSkeleton />
                <TopSellingSkeleton />
              </div>
            </div>
          </div>
        ) : isError ? (
          <div className="col-span-4 text-center text-red-500">
            Error loading data.
          </div>
        ) : (
          <>
            <StatCard {...stats.totalSales} />
            <StatCard {...stats.orders} />
            <StatCard {...stats.productsSold} />
            <StatCard {...stats.variationsSold} />
          </>
        )}
      </div>
      {/* @ts-ignore */}
      {selectedRange && compareRange && perfData?.trends && (
        <SalesCompareCharts
          //@ts-ignore
          salesTrend={perfData.trends.sales}
          //@ts-ignore
          ordersTrend={perfData.trends.orders}
        />
      )}
    </div>
  );
};

export default SalesDashboard;
