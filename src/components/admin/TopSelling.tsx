import { Fragment, useState, useMemo } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";

export default function TopSelling() {
  const products = [
    {
      id: "12345",
      name: "Leather Tote Bag",
      image: "/placeholder.svg?height=40&width=40",
      price: "$225.00",
      status: "In Stock",
      sold: "306 pcs",
      earnings: "$2,236",
    },
    {
      id: "45678",
      name: "Gloss Super Pushup Bra",
      image: "/placeholder.svg?height=40&width=40",
      price: "$69.99",
      status: "Low Stock",
      sold: "124 pcs",
      earnings: "$112,228",
    },
    {
      id: "13566",
      name: "Hammered Drop Earrings",
      image: "/placeholder.svg?height=40&width=40",
      price: "$220.99",
      status: "In Stock",
      sold: "1000 pcs",
      earnings: "$12,236",
    },
    {
      id: "78901",
      name: "Women's Crossbody Bag",
      image: "/placeholder.svg?height=40&width=40",
      price: "$189.99",
      status: "In Stock",
      sold: "532 pcs",
      earnings: "$8,456",
    },
  ];

  const sortOptions = [
    "Highest Sales",
    "Lowest Sales",
    "Highest Earnings",
    "Lowest Earnings",
  ];
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);

  // Función para limpiar y convertir texto a número
  const parseNumber = (str: string) =>
    Number(str.replace(/[^0-9.]/g, "").replace(/,/g, ""));

  // Ordenar productos según opción seleccionada
  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    switch (selectedSort) {
      case "Highest Sales":
        sorted.sort((a, b) => parseNumber(b.sold) - parseNumber(a.sold));
        break;
      case "Lowest Sales":
        sorted.sort((a, b) => parseNumber(a.sold) - parseNumber(b.sold));
        break;
      case "Highest Earnings":
        sorted.sort(
          (a, b) => parseNumber(b.earnings) - parseNumber(a.earnings)
        );
        break;
      case "Lowest Earnings":
        sorted.sort(
          (a, b) => parseNumber(a.earnings) - parseNumber(b.earnings)
        );
        break;
    }
    return sorted;
  }, [selectedSort]);

  return (
    <div className="bg-black border-2 mt-10 border-[#F5A623] rounded-lg p-4 md:p-6 w-full mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-xl font-bold">Top Selling</h2>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-1.5 text-sm font-medium text-gray-900">
              {selectedSort}
              <ChevronDownIcon
                className="-mr-1 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {sortOptions.map((option) => (
                  <Menu.Item key={option}>
                    {({ active }) => (
                      <button
                        onClick={() => setSelectedSort(option)}
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        } block px-4 py-2 text-sm w-full text-left ${
                          selectedSort === option ? "font-medium" : ""
                        }`}
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
                PRICE <ChevronDownIcon className="inline h-4 w-4" />
              </th>

              <th className="py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                SOLD <ChevronDownIcon className="inline h-4 w-4" />
              </th>
              <th className="py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                TOTAL EARNINGS <ChevronDownIcon className="inline h-4 w-4" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {sortedProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-900/50">
                <td className="py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 rounded-md overflow-hidden bg-gray-800">
                      <img
                        className="h-10 w-10 object-cover"
                        src={product.image || "/placeholder.svg"}
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-white">
                        {product.name}
                      </div>
                      <div className="text-xs text-gray-400">
                        PRODUCT ID: {product.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 whitespace-nowrap text-sm text-white">
                  {product.price}
                </td>

                <td className="py-4 whitespace-nowrap text-sm text-white">
                  {product.sold}
                </td>
                <td className="py-4 whitespace-nowrap text-sm text-white">
                  {product.earnings}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
