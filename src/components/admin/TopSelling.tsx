import { Fragment, useState, useMemo } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";
import { useGetProductAnalyticsQuery } from "@/store/features/api/analitycsApi";
import TopSellingSkeleton from "../skeletons/TopSellingSkeleton";

export default function TopSelling() {
  const sortOptions = [
    "Highest Sales",
    "Lowest Sales",
    "Highest Earnings",
    "Lowest Earnings",
  ];
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const sortMap = {
    "Highest Sales": "highestSales",
    "Lowest Sales": "lowestSales",
    "Highest Earnings": "highestEarnings",
    "Lowest Earnings": "lowestEarnings",
  };

  // 1️⃣ Hook siempre invocado
  const { data, isLoading } = useGetProductAnalyticsQuery({
    sort: sortMap[selectedSort],
  });

  // 2️⃣ Siempre definimos sortedProducts con useMemo
  const sortedProducts = useMemo(() => {
    const prods = data?.products ?? [];
    const copy = [...prods];
    switch (selectedSort) {
      case "Highest Sales":
        copy.sort((a, b) => b.totalSold - a.totalSold);
        break;
      case "Lowest Sales":
        copy.sort((a, b) => a.totalSold - b.totalSold);
        break;
      case "Highest Earnings":
        copy.sort((a, b) => b.revenue - a.revenue);
        break;
      case "Lowest Earnings":
        copy.sort((a, b) => a.revenue - b.revenue);
        break;
    }
    return copy;
  }, [data, selectedSort]);

  // 3️⃣ Early return solo después de definir hooks
  if (isLoading) {
    return <TopSellingSkeleton />;
  }

  return (
    <div className="bg-black border-2 mt-10 border-[#F5A623] rounded-lg p-4 md:p-6 w-full mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-xl font-bold">Top Selling</h2>
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-1.5 text-sm font-medium text-gray-900">
            {selectedSort}
            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                {sortOptions.map((option) => (
                  <Menu.Item key={option}>
                    {({ active }) => (
                      <button
                        onClick={() => setSelectedSort(option)}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        } ${selectedSort === option ? "font-medium" : ""}`}
                      >
                        {option}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                PRODUCT NAME
              </th>
              <th className="py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                PRICE
                <ChevronDownIcon className="inline h-4 w-4 ml-1" />
              </th>
              <th className="py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                SOLD
                <ChevronDownIcon className="inline h-4 w-4 ml-1" />
              </th>
              <th className="py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                TOTAL EARNINGS
                <ChevronDownIcon className="inline h-4 w-4 ml-1" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {sortedProducts.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-900/50 transition-colors"
              >
                <td className="py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 rounded-md overflow-hidden bg-gray-800">
                      <img
                        className="h-10 w-10 object-cover"
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-white">
                        {product.name}
                      </div>
                      <div className="text-xs text-gray-400">
                        Category: {product.category}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 whitespace-nowrap text-sm text-white">
                  $ {product.price.toFixed(2)}
                </td>
                <td className="py-4 whitespace-nowrap text-sm text-white">
                  {product.totalSold}
                </td>
                <td className="py-4 whitespace-nowrap text-sm text-white">
                  $ {product.revenue.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
