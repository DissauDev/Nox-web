import { DataError } from "@/components/atoms/DataError";
import { useGetUserOrdersQuery } from "@/store/features/api/ordersApi";
import { RootState } from "@/store/store";
import { Button } from "@headlessui/react";
import { format } from "date-fns";
import { Package } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const OrderContent = () => {
  const userState = useSelector((state: RootState) => state.auth.user);

  console.log("userState:--" + userState.email);
  const navigate = useNavigate();
  const { isLoading, data, isError } = useGetUserOrdersQuery(userState.email);

  if (isLoading) return <h3>...</h3>;
  if (isError)
    return <DataError title={"Error to show orders"} darkTheme={false} />;
  return (
    <div className="flex-1 text-gray-800 py-6">
      <div className="flex items-center mb-6">
        <Package className="w-8 h-8 text-gray-400 mr-3" />
        <h2 className="text-2xl font-medium">Orders</h2>
      </div>

      <div className="overflow-x-scroll md:overflow-x-auto">
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
            {isLoading && (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  Loading orders…
                </td>
              </tr>
            )}

            {!isLoading && data?.orders?.length === 0 && (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-600">
                  No orders to show
                </td>
              </tr>
            )}
            {data.orders.map((o) => (
              <tr className="border-t" key={o.id}>
                <td className="py-4 pr-4 text-gray-700">{o.orderNumber}</td>
                <td className="py-4 pr-4 text-gray-700">
                  {format(o.createdAt, "MMMM d, yyyy")}
                </td>
                <td className="py-4 pr-4 text-gray-700">{o.status}</td>
                <td className="py-4 pr-4 text-gray-700">
                  ${o.totalAmount} for {o.items.length} items
                </td>
                <td className="py-4 text-right">
                  <Button
                    className="font-medium"
                    onClick={() => navigate(`/account/ordersView/:${o.id}`)}
                  >
                    VIEW
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          className="bg-gray-800 hover:bg-black rounded-sm text-white px-8 py-2 font-medium"
          onClick={() => navigate("/menu")}
        >
          GO SHOPPING
        </Button>
      </div>
    </div>
  );
};
