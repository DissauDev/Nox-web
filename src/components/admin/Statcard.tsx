import React from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

interface StatCardProps {
  title: string;
  value: string | number;
  percentage: number;
  isPositive: boolean;
  trendData: { value: number }[];
  comparisonText: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  percentage,
  isPositive,
  trendData,
  comparisonText,
}) => {
  return (
    <div className="px-4 py-2 rounded-lg shadow border-2 border-[#3948a4]">
      <p className="text-sm text-gray-400">{title}</p>
      <div className="flex justify-between items-start">
        <p className="text-2xl font-bold mt-2">{value}</p>
        <div className="w-24 h-12 ml-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient
                  id="negativeGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#FB3B3A" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#FEE8E8" stopOpacity={0.11} />
                </linearGradient>
                <linearGradient
                  id="positiveGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#15CAB8" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke={isPositive ? "#00C49F" : "#FF6384"}
                fill={
                  isPositive
                    ? "url(#positiveGradient)"
                    : "url(#negativeGradient)"
                }
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex items-center mt-2">
        <span className={isPositive ? "text-green-500" : "text-red-500"}>
          {isPositive ? "▲" : "▼"}
        </span>
        <span className="ml-1">{Math.abs(percentage)}%</span>
        <span className="ml-1 text-gray-400">{comparisonText}</span>
      </div>
    </div>
  );
};

export default StatCard;
