import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { format, parseISO } from "date-fns";

const formatLabel = (dateStr) => format(parseISO(dateStr), "dd MMM");

const CustomTooltip = ({ active, payload, type }) => {
  if (!active || !payload || !payload[0]) return null;
  const { tooltip } = payload[0].payload;
  return (
    <div className="bg-white text-black text-xs p-2 rounded-md shadow-md">
      <div className="flex items-center font-ArialRegular text-sm">
        <div className="bg-[#F5A623] rounded-full w-2 h-2 mr-2" />
        <h3>{tooltip.currentDate}</h3>
        <h3 className="font-ArialBold">
          : {type === "Order" ? "" : "$"}
          {tooltip.currentValue}
        </h3>
      </div>
      <div className="flex items-center font-ArialRegular text-sm">
        <div className="bg-[#6EE7B7] rounded-full w-2 h-2 mr-2" />
        <h3>{tooltip.compareDate}</h3>
        <h3 className="font-ArialBold">
          : {type === "Order" ? "" : "$"}
          {tooltip.compareValue}
        </h3>
      </div>
    </div>
  );
};

/**
 * Props:
 *  salesTrend: Array<{ time: string; current: number; compare: number }>
 *  ordersTrend: Array<{ time: string; current: number; compare: number }>
 */
const SalesCompareCharts = ({ salesTrend, ordersTrend }) => {
  // Build union of dates for sales
  const allSalesDates = Array.from(
    new Set([
      ...salesTrend.map((e) => e.time),
      ...salesTrend
        .map((e) => e.time)
        .filter((t) => !salesTrend.some((e) => e.time === t)),
    ])
  ).sort();
  const salesData = allSalesDates.map((time) => {
    const rec = salesTrend.find((e) => e.time === time) || {
      current: 0,
      compare: 0,
    };
    return {
      date: formatLabel(time),
      current: rec.current,
      compare: rec.compare,
      tooltip: {
        currentDate: format(parseISO(time), "dd MMM yyyy"),
        compareDate: format(parseISO(time), "dd MMM yyyy"),
        currentValue: rec.current,
        compareValue: rec.compare,
      },
    };
  });
  // Build union of dates for orders
  const allOrdersDates = Array.from(
    new Set([
      ...ordersTrend.map((e) => e.time),
      ...ordersTrend
        .map((e) => e.time)
        .filter((t) => !ordersTrend.some((e) => e.time === t)),
    ])
  ).sort();
  const ordersData = allOrdersDates.map((time) => {
    const rec = ordersTrend.find((e) => e.time === time) || {
      current: 0,
      compare: 0,
    };
    return {
      date: formatLabel(time),
      current: rec.current,
      compare: rec.compare,
      tooltip: {
        currentDate: format(parseISO(time), "dd MMM yyyy"),
        compareDate: format(parseISO(time), "dd MMM yyyy"),
        currentValue: rec.current,
        compareValue: rec.compare,
      },
    };
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {/* Sales Chart */}
      <div className="p-4 border-2 border-[#FEC600] bg-black rounded-xl">
        <h4 className="text-md font-semibold mb-2 text-white">
          Sales Comparison
        </h4>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={salesData}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis
              dataKey="date"
              interval={Math.floor(salesData.length / 5)}
              stroke="#ccc"
            />
            <YAxis stroke="#ccc" />
            <Tooltip
              content={
                <CustomTooltip
                  type="Sales"
                  active={undefined}
                  payload={undefined}
                />
              }
              cursor={{ fill: "#333" }}
            />
            <Legend wrapperStyle={{ color: "white" }} />
            <Bar
              dataKey="current"
              fill="#F5A623"
              name="Current Period"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="compare"
              fill="#6EE7B7"
              name="Compared Period"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* Orders Chart */}
      <div className="p-4 border-2 border-[#FEC600] bg-black rounded-xl">
        <h4 className="text-md font-semibold mb-2 text-white">
          Orders Comparison
        </h4>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={ordersData}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis
              dataKey="date"
              interval={Math.floor(ordersData.length / 5)}
              stroke="#ccc"
            />
            <YAxis stroke="#ccc" />
            <Tooltip
              content={
                <CustomTooltip
                  type="Order"
                  active={undefined}
                  payload={undefined}
                />
              }
              cursor={{ fill: "#333" }}
            />
            <Legend wrapperStyle={{ color: "white" }} />
            <Bar
              dataKey="current"
              fill="#F5A623"
              name="Current Period"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="compare"
              fill="#6EE7B7"
              name="Compared Period"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesCompareCharts;
