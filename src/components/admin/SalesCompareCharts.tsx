import React, { useEffect, useState } from "react";
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
import { format } from "date-fns";

// Generador de datos aleatorios para simular API
const generateRandomData = (startDate, endDate) => {
  const data = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    data.push({
      date: new Date(current),
      value: Math.floor(Math.random() * 1000),
    });
    current.setDate(current.getDate() + 1);
  }

  return data;
};

const formatLabel = (date) => format(new Date(date), "dd MMM");

const mergeComparisonData = (currentPeriod, comparePeriod) => {
  return currentPeriod.map((entry, index) => ({
    date: formatLabel(entry.date),
    current: entry.value,
    compare: comparePeriod[index] ? comparePeriod[index].value : 0,
    tooltip: {
      currentDate: format(entry.date, "dd MMM yyyy"),
      compareDate: format(
        comparePeriod[index]?.date ?? new Date(),
        "dd MMM yyyy"
      ),
      currentValue: entry.value,
      compareValue: comparePeriod[index]?.value ?? 0,
    },
  }));
};

const CustomTooltip = ({ active, payload, type }) => {
  if (!active || !payload || !payload[0]) return null;
  const { tooltip } = payload[0].payload;
  return (
    <div className="bg-white text-black text-xs p-2 rounded-md shadow-md">
      <div className="flex items-center font-ArialRegular text-sm">
        <div className="bg-[#F5A623] rounded-full size-2 mr-2" />
        <h3>{tooltip.currentDate}</h3>
        <h3 className="font-ArialBold">
          : {`${type === "Order" ? "" : "$"}`}
          {tooltip.currentValue}
        </h3>
      </div>
      <div className="flex items-center font-ArialRegular text-sm">
        <div className="bg-[#6EE7B7] rounded-full size-2 mr-2" />
        <h3>{tooltip.compareDate}</h3>
        <h3 className="font-ArialBold">
          : {`${type === "Order" ? "" : "$"}`} {tooltip.compareValue}
        </h3>
      </div>
    </div>
  );
};

interface Props {
  selectedRange: { startDate: Date; endDate: Date };
  compareRange: { startDate: Date; endDate: Date };
}

const SalesCompareCharts = ({ selectedRange, compareRange }: Props) => {
  const [salesData, setSalesData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    if (!selectedRange || !compareRange) return;

    const simulatedSales = mergeComparisonData(
      generateRandomData(selectedRange.startDate, selectedRange.endDate),
      generateRandomData(compareRange.startDate, compareRange.endDate)
    );

    const simulatedOrders = mergeComparisonData(
      generateRandomData(selectedRange.startDate, selectedRange.endDate),
      generateRandomData(compareRange.startDate, compareRange.endDate)
    );

    setSalesData(simulatedSales);
    setOrdersData(simulatedOrders);
  }, [selectedRange, compareRange]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
