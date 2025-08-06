/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState, useEffect } from "react";

import { FaCheck, FaChevronLeft } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteOrderMutation,
  useGetOrderQuery,
  useGetUserOrdersQuery,
  useRefundOrderMutation,
  useUpdateOrderStatusMutation,
} from "@/store/features/api/ordersApi";
import { toast } from "@/hooks/use-toast";
import { Spinner } from "@/components/ui/Spinner";
import { DataError } from "@/components/atoms/DataError";
import animationData from "../../assets/lotties/Animation 8.json"; // o usa una URL remota
import Lottie from "lottie-react";
import { Dropdown } from "@/components/atoms/DropDown";

export const OrderDetails: React.FC = () => {
  const navigate = useNavigate();
  const { orderkey } = useParams<{ orderkey: string }>();

  const ACTIONS = ["Choose an action", "Mark as Complete"];
  const [action, setAction] = useState(ACTIONS[0]);

  // 1️⃣ Consulta la orden
  const {
    data: order,
    isLoading: loadingOrder,
    isError: errorOrder,
  } = useGetOrderQuery(orderkey!);

  // 2️⃣ Consulta el historial del usuario sólo cuando tengamos order.customerEmail
  const {
    data: userOrders,
    isLoading: loadingUserOrders,
    isError: errorUserOrders,
  } = useGetUserOrdersQuery(order?.customerEmail ?? "", {
    skip: !order?.customerEmail,
  });

  const [refundOrder, { isLoading: isRefunding }] = useRefundOrderMutation();

  const handleRefund = async () => {
    if (!order) return;
    try {
      //@ts-ignore
      await refundOrder({
        id: order.id,
        totalAmount: order.totalAmount,
      }).unwrap();
      toast({
        className:
          "bg-white text-gray-800 border border-gray-200 shadow-lg rounded-lg p-4",
        title: "✅ Success",
        description: "Refund Successfully",
      });
    } catch (err) {
      toast({
        className:
          "bg-white text-gray-800 border border-gray-200 shadow-lg rounded-lg p-4",
        title: "❌ Error",
        description: err.message || "refund Failed",
      });
    }
  };
  const [status, setStatus] = useState<string>("");

  const [updateOrderStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();

  const handleChangeStatus = async (newStatus: string) => {
    try {
      // Llamamos a la mutation
      const updated = await updateOrderStatus({
        id: order.id,
        //@ts-ignore
        status: newStatus,
      }).unwrap();
      setStatus(updated.status);
      toast({
        className:
          "bg-white text-gray-800 border border-gray-200 shadow-lg rounded-lg p-4",
        title: "✅ Success",
        description: `Order status changed to "${newStatus}".`,
      });
    } catch (err) {
      toast({
        className:
          "bg-white text-gray-800 border border-gray-200 shadow-lg rounded-lg p-4",
        title: "❌ Error",
        description: err.data?.message || err.message || "Update failed",
      });
    } finally {
      setStatus(newStatus);
    }
  };

  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();

  // Handler de reembolso, ahora sí usa order.id solo cuando order ya está definido
  const handleDelete = async () => {
    if (!order) return;
    try {
      //@ts-ignore
      await deleteOrder(order.id).unwrap();
      toast({
        className:
          "bg-white text-gray-800 border border-gray-200 shadow-lg rounded-lg p-4",
        title: "✅ Success",
        description: "Order Delete Successfull",
      });
      navigate("/dashboard/orders");
    } catch (err) {
      toast({
        className:
          "bg-white text-gray-800 border border-gray-200 shadow-lg rounded-lg p-4",
        title: "❌ Error",
        description: err.message || "Was an error to delete order",
      });
    }
  };

  // 3️⃣ Inicializa el estado `status` cuando llegue la orden
  useEffect(() => {
    if (order) {
      setStatus(order.status);
    }
  }, [order]);

  const handleAction = () => {
    if (action === "Mark as Complete") {
      handleChangeStatus("COMPLETED");
    }
  };

  if (loadingOrder)
    return (
      <div className="flex items-center justify-center h-64">
        <Lottie
          animationData={animationData}
          loop
          height={200}
          width={200}
          // clases responsive
          className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48"
        />
      </div>
    );

  if (errorOrder || !order) {
    return <DataError title={"Error to load order"} darkTheme={true} />;
  }

  if (errorUserOrders) {
    return <DataError title={"Error to load order"} darkTheme={true} />;
  }

  // A estas alturas ya tienes `order` y `userOrders` seguros
  const borderColor = "border border-[#b9d3ff]";
  const focusBorder = "focus:border-[#92b1d9]";
  const date = new Date(order.createdAt).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return (
    <div className="p-6 text-white">
      <div className="flex items-center">
        <button
          className="hover:text-gray-300"
          onClick={() => navigate("/dashboard/orders")}
        >
          <FaChevronLeft size={28} className="mx-4" />
        </button>
        <h1 className="text-2xl font-bold my-4">Order Details</h1>
      </div>

      <div className="max-w-7xl mx-auto flex  gap-6">
        {/* ── MAIN ── */}
        <div className="flex-1 space-y-6">
          {/* General + Billing */}
          <div className="border-2 border-[#3948a4] p-6 rounded-md">
            <div className="flex lg:flex-row justify-around flex-col ">
              {/* General (2 cols) */}
              <div className="col-span-2 space-y-6">
                <h2 className="text-lg font-semibold">General</h2>

                {/* Date created */}
                <div className="flex flex-wrap gap-4">
                  <label className="block">
                    <span className="text-sm text-gray-300">Date created:</span>
                    <h3
                      className={`${borderColor} ${focusBorder} mt-1 rounded px-3 py-2 bg-transparent`}
                    >
                      {date}
                    </h3>
                  </label>
                </div>

                {/* Status & CustomerType */}
                <div className="flex gap-2 text-sm ">
                  <Dropdown
                    label={`Status: ${status}`}
                    styles="rounded px-4 py-2"
                    options={[
                      "PAID",
                      "PROCESSING",
                      "FAILED",
                      "READY_FOR_PICKUP",
                      "CANCELLED",
                    ]}
                    onSelect={(v) => setStatus(v)}
                    borderColor={borderColor}
                    focusBorder={focusBorder}
                  />
                  <button
                    className="bg-sapphire-400 hover:bg-sapphire-500 px-4 py-2 rounded flex items-center justify-center"
                    disabled={isUpdating}
                    onClick={() => handleChangeStatus(status)}
                  >
                    {isUpdating ? <Spinner className="w-6 h-6" /> : <FaCheck />}
                  </button>
                </div>
              </div>

              {/* Billing */}
              <div className="space-y-2 ml-2">
                <h3 className="text-lg font-ArialBold">Billing</h3>
                <p>{order.customerName}</p>
                <p>{order.customerAddress}</p>
                <a
                  href={`mailto:${order.customerEmail}`}
                  className="text-blue-400 hover:underline block"
                >
                  {order.customerEmail}
                </a>
                <a
                  href={`tel:${order.customerPhone}`}
                  className="text-blue-400 hover:underline block"
                >
                  {order.customerPhone}
                </a>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="border-2 border-[#3948a4] p-6 rounded-md">
            <h2 className="text-lg font-semibold mb-4">Items</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700 text-left text-gray-300">
                  <th className="px-4 py-2">Item</th>
                  <th className="px-4 py-2">Cost</th>
                  <th className="px-4 py-2">Qty</th>
                  <th className="px-4 py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((it) => (
                  <tr
                    key={it.id}
                    className="hover:bg-gray-900 border-b border-gray-700"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-start gap-3">
                        <img
                          src={it.product.imageLeft.url}
                          className="w-10 h-10 rounded"
                          alt=""
                        />
                        <div>
                          <div className="font-medium">{it.product.name}</div>

                          {/* Opciones de item */}
                          {it.chosenOptions.length > 0 && (
                            <div className="text-xs text-gray-400 space-y-1">
                              {it.chosenOptions.map((opt) => (
                                <p key={opt.id}>
                                  <span className="font-ArialBold">
                                    {opt.groupName}:
                                  </span>{" "}
                                  {opt.name}
                                  {opt.extraPrice! > 0 &&
                                    ` (+$${opt.extraPrice.toFixed(2)})`}
                                </p>
                              ))}
                            </div>
                          )}
                          {/* Specifications opcional */}
                          {it.product.specifications && (
                            <p className="text-xs italic text-gray-500 mt-1">
                              Specs: {it.product.specifications}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">${it.price.toFixed(2)}</td>
                    <td className="px-4 py-3">{it.quantity}</td>
                    <td className="px-4 py-3">
                      ${(it.price * it.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals & Refund */}
            <div className="flex justify-between items-center mt-6">
              <button
                className="bg-mustard-yellow-500 hover:bg-mustard-yellow-600 font-ArialBold px-4 py-2 rounded"
                onClick={handleRefund}
                disabled={isRefunding}
              >
                {isRefunding ? <Spinner className="w-6 h-6" /> : "Refund"}
              </button>
              <div className="text-right space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Items Subtotal:</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Order Total:</span>
                  <span>${order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-gray-500 text-xs">
              ● This order is no longer editable.
            </p>
          </div>
        </div>

        {/* ── SIDEBAR ── */}
        <aside className=" space-y-6">
          {/* Order Actions */}
          <div className="border-2 border-[#3948a4] p-2 rounded-md space-y-4">
            <h2 className="font-semibold">Order Actions</h2>
            <div className="flex gap-2 text-sm">
              <Dropdown
                label={`Action: ${action}`}
                options={ACTIONS}
                onSelect={setAction}
                borderColor={borderColor}
                focusBorder={focusBorder}
              />
              <button
                className="bg-sapphire-400 hover:bg-sapphire-500 px-4 py-2 rounded flex items-center justify-center disabled:opacity-50"
                onClick={handleAction}
                disabled={action === ACTIONS[0] || isUpdating}
              >
                {isUpdating ? <Spinner className="w-5 h-5" /> : <FaCheck />}
              </button>
            </div>
            <button
              disabled={isDeleting || isRefunding || isUpdating}
              className="text-mustard-yellow-500 hover:underline text-sm h-6"
              onClick={handleDelete}
            >
              {isDeleting ? "Deleting..." : " Move to Trash"}
            </button>
          </div>

          <div className="border-2 border-[#3948a4] p-6 rounded-md space-y-2">
            <h2 className="font-semibold">Order Attribution</h2>
            <div className="text-sm text-gray-300">
              <p>
                <span className="font-medium">Origin:</span>{" "}
                {order.customerAddress ===
                "422 E Campbell Ave, Campbell, CA 95008"
                  ? "Pickup"
                  : "Delivery"}
              </p>
            </div>
          </div>

          <div className="border-2 border-[#3948a4] p-6 rounded-md space-y-2">
            <h2 className="font-semibold">Customer History</h2>
            {loadingUserOrders ? (
              <div className="text-sm text-gray-300 space-y-2">
                <div className="h-4 bg-gray-700 rounded w-1/3 animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-2/5 animate-pulse"></div>
              </div>
            ) : (
              <div className="text-sm text-gray-300">
                <p>
                  <span className="font-medium">Total orders:</span>{" "}
                  {userOrders.resume.count}
                </p>
                <p>
                  <span className="font-medium">Total revenue:</span> $
                  {userOrders.resume.totalSpent}
                </p>
                <p>
                  <span className="font-medium">Avg. order:</span> $
                  {userOrders.resume.average}
                </p>
              </div>
            )}
          </div>

          {/* Order Notes */}
          <div className="border-2 border-[#3948a4] p-6 rounded-md">
            <h2 className="font-semibold">Order Notes</h2>
            <p className="text-gray-500 text-sm">
              {order.specifications || "No notes yet."}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};
