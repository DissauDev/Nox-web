// MyAccount.tsx
import React from "react";
import { Home, Package, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@headlessui/react";

export const MyAccount = () => {
  return (
    <div className="min-h-screen text-gray-700 p-6 pt-20 ">
      {/* Top Navigation */}

      {/* Main Content */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <h1 className="text-xl font-bold mb-4">MY ACCOUNT</h1>
            <nav className="flex flex-col border-t">
              <a href="#" className="py-3 px-2 border-b hover:bg-gray-50">
                Dashboard
              </a>
              <a
                href="#"
                className="py-3 px-2 border-b hover:bg-gray-50 font-medium"
              >
                Orders
              </a>
              <a href="#" className="py-3 px-2 border-b hover:bg-gray-50">
                Downloads
              </a>
              <a href="#" className="py-3 px-2 border-b hover:bg-gray-50">
                Addresses
              </a>
              <a href="#" className="py-3 px-2 border-b hover:bg-gray-50">
                Account details
              </a>
              <a href="#" className="py-3 px-2 border-b hover:bg-gray-50">
                Wishlist
              </a>
              <a href="#" className="py-3 px-2 border-b hover:bg-gray-50">
                Log out
              </a>
            </nav>
          </div>

          {/* Orders Content */}
          <div className="flex-1">
            <div className="flex items-center mb-6">
              <Package className="w-8 h-8 text-gray-400 mr-3" />
              <h2 className="text-2xl font-medium">Orders</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left">
                    <th className="py-3 pr-4 font-semibold">ORDER</th>
                    <th className="py-3 pr-4 font-semibold">DATE</th>
                    <th className="py-3 pr-4 font-semibold">STATUS</th>
                    <th className="py-3 pr-4 font-semibold">TOTAL</th>
                    <th className="py-3 font-semibold text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="py-4 pr-4 text-gray-700">#8546</td>
                    <td className="py-4 pr-4 text-gray-700">
                      October 24, 2024
                    </td>
                    <td className="py-4 pr-4 text-gray-700">Completed</td>
                    <td className="py-4 pr-4 text-gray-700">
                      $8.35 for 2 items
                    </td>
                    <td className="py-4 text-right">
                      <Button className="font-medium">VIEW</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex justify-center">
              <Button className="bg-gray-800 hover:bg-black text-white px-8 py-2 font-medium">
                GO SHOPPING
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
