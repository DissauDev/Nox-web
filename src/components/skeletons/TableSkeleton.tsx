import React from "react";

export const TableSkeleton = () => {
  return (
    <div className="px-2 pb-6 md:p-6 text-white">
      <div className="mx-auto">
        {/* Header skeleton */}
        <div className="animate-pulse flex flex-col md:flex-row items-start md:justify-between md:items-center mb-6">
          <div className="h-8 bg-gray-700 rounded w-1/3 mb-4 md:mb-0" />
          <div className="flex gap-2 w-full md:w-auto">
            <div className="h-8 bg-gray-700 rounded w-32" />
            <div className="h-8 bg-gray-700 rounded w-24" />
            <div className="h-8 bg-gray-700 rounded w-24" />
          </div>
        </div>

        {/* Table skeleton */}
        <div className="w-full overflow-x-scroll md:overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                {[
                  "CATEGORY",
                  "MONEY COLLECTED",
                  "CREATION DATE",
                  "STATUS",
                  "Actions",
                ].map((_, i) => (
                  <th key={i} className="px-2 py-3 text-left">
                    <div className="h-4 bg-gray-700 rounded w-24 animate-pulse" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, row) => (
                <tr
                  key={row}
                  className="border-b border-gray-800 animate-pulse"
                >
                  {Array(5)
                    .fill(0)
                    .map((__, col) => (
                      <td key={col} className="py-3 px-4">
                        <div className="h-4 bg-gray-700 rounded w-full" />
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
