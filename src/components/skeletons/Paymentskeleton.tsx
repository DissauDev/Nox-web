import React from "react";

interface Props {
  isTip?: boolean;
}
export const Paymentskeleton = ({ isTip }: Props) => {
  return (
    // ✅ Skeleton de carga
    <div className="flex flex-col lg:max-w-lg w-full bg-white rounded-lg shadow-lg border border-gray-300 p-6 text-sapphire-900 animate-pulse">
      <div className="h-6 w-1/3 bg-gray-300 rounded mb-4" />
      <div className="flex justify-between mb-2">
        <div className="h-4 w-1/4 bg-gray-300 rounded" />
        <div className="h-4 w-1/4 bg-gray-300 rounded" />
      </div>
      <div className="flex justify-between mb-2">
        <div className="h-4 w-1/4 bg-gray-300 rounded" />
        <div className="h-4 w-1/4 bg-gray-300 rounded" />
      </div>
      <div className="flex justify-between mb-2">
        <div className="h-4 w-1/4 bg-gray-300 rounded" />
        <div className="h-4 w-1/4 bg-gray-300 rounded" />
      </div>
      <div className="h-4 w-full bg-gray-300 rounded my-4" />
      {isTip && (
        <div className="flex space-x-2 mb-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-8 w-16 bg-gray-300 rounded" />
          ))}
        </div>
      )}
      <div className="h-10 w-full bg-gray-300 rounded mt-4" />
    </div>
  );
};
