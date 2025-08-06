const SkeletonCard = () => (
  <div className="px-4 py-4 rounded-lg shadow border-2 border-[#3948a4] animate-pulse bg-gray-800">
    <div className="h-4 bg-gray-700 rounded w-1/3 mb-2" />
    <div className="flex justify-between items-start">
      <div className="h-6 bg-gray-700 rounded w-1/4" />
      <div className="w-24 h-10 bg-gray-700 rounded" />
    </div>
    <div className="h-4 bg-gray-700 rounded w-1/2 mt-2" />
  </div>
);

export default SkeletonCard;
