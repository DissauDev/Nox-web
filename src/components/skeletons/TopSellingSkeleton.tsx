import React from "react";

export default function TopSellingSkeleton() {
  return (
    <div className="bg-black border-2 mt-10 border-[#F5A623] rounded-lg p-4 md:p-6 w-full mx-auto animate-pulse">
      {/* Header skeleton */}
      <div className="flex justify-between items-center mb-4">
        <div className="h-6 bg-gray-700 rounded w-1/4"></div>
        <div className="h-6 bg-gray-700 rounded w-1/6"></div>
      </div>

      {/* Table skeleton */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-700">
              {Array(4)
                .fill(null)
                .map((_, idx) => (
                  <th key={idx} className="py-3 px-2">
                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {Array(5)
              .fill(null)
              .map((_, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-gray-900/50">
                  {Array(4)
                    .fill(null)
                    .map((__, colIdx) => (
                      <td key={colIdx} className="py-4 px-2">
                        <div className="h-4 bg-gray-700 rounded w-full"></div>
                      </td>
                    ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
