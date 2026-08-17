"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Clock, Package, XCircle } from "lucide-react";
import { useCustomerOrderStore } from "@/store/customerOrderStore";
import {
  businessDisplayName,
  cancellationCopy,
  estimatedCompletion,
  formatAmount,
  formatDate,
  fulfillmentLabel,
  paymentMethodLabel,
} from "./orderHelpers";

const paymentStatusStyles = {
  paid: "bg-[#e7fbf3] text-[#12bd89]",
  pending: "bg-[#fff6e5] text-[#f5b82e]",
  failed: "bg-[#fdeaea] text-[#e14949]",
  refunded: "bg-[#f2ecfd] text-[#9a54dc]",
};

export default function OrderDetails({ orderId }) {
  const { selectedOrder, orderLoading, orderError, getOrderById } = useCustomerOrderStore();

  useEffect(() => {
    getOrderById(orderId);
  }, [orderId, getOrderById]);

  if (orderLoading) {
    return <p className="p-10 text-center text-sm text-[#67676d]">Loading order…</p>;
  }

  if (orderError) {
    return <p className="rounded-lg bg-red-50 p-6 text-center text-sm text-red-600">{orderError}</p>;
  }

  if (!selectedOrder) return null;

  const order = selectedOrder;
  const hero = getHero(order);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
      {/* Left: hero + actions */}
      <section className="rounded-2xl border border-[#eff0f3] bg-white p-8 text-center shadow-sm">
        <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${hero.bg}`}>
          <hero.Icon size={30} className={hero.tone} />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-black">{hero.title}</h1>
        <p className="mt-1 text-sm text-[#67676d]">{hero.subtitle}</p>

        <dl className="mt-8 space-y-4 text-left text-sm">
          <div className="flex items-center gap-3">
            <Package size={17} className="text-[#060853]" />
            <dt className="text-[#67676d]">Order Number:</dt>
            <dd className="font-semibold text-black">{order.orderNumber}</dd>
          </div>
          <div className="flex items-center gap-3">
            <dt className="ml-[29px] text-[#67676d]">Business:</dt>
            <dd className="font-semibold text-black">{businessDisplayName(order)}</dd>
          </div>
          <div className="flex items-center gap-3">
            <Clock size={17} className="text-[#060853]" />
            <dt className="text-[#67676d]">Estimated Completion:</dt>
            <dd className="font-semibold text-black">{estimatedCompletion(order)}</dd>
          </div>
        </dl>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href={`/customer-dashboard/orders/${order._id}/tracking`}
            className="min-w-40 rounded-lg border border-[#060853] px-6 py-3 text-sm font-medium text-[#060853]"
          >
            Track Order
          </Link>
          <Link
            href="/"
            className="min-w-40 rounded-lg bg-[#060853] px-6 py-3 text-sm font-medium text-white"
          >
            Return to Home
          </Link>
        </div>
      </section>

      {/* Right: order summary */}
      <section className="rounded-2xl border border-[#eff0f3] bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-[#20203d]">Order ID: {order.orderNumber}</h2>
          <div className="flex items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${paymentStatusStyles[order.paymentStatus] || "bg-gray-100 text-gray-600"}`}>
              {order.paymentStatus === "paid" ? "Paid" : order.paymentStatus}
            </span>
            <span className="rounded-full bg-[#eef1f8] px-3 py-1 text-xs font-semibold text-[#454545]">
              {paymentMethodLabel[order.paymentMethod] || order.paymentMethod}
            </span>
          </div>
        </div>
        <p className="mt-1 text-xs text-[#8b8b93]">Order date: {formatDate(order.createdAt)}</p>

        <div className="mt-6 border-t border-[#ececf2] pt-5">
          <h3 className="text-sm font-semibold text-[#454545]">Customer</h3>
          <p className="mt-2 text-sm text-black">{order.contactName || order.customer?.name}</p>
          <p className="text-sm text-[#67676d]">{order.contactPhone || order.customer?.phoneNumber}</p>
        </div>

        <div className="mt-6 border-t border-[#ececf2] pt-5">
          <h3 className="text-sm font-semibold text-[#454545]">Order Items ({order.items?.length || 0})</h3>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="rounded-lg bg-[#060853] text-xs text-white">
                  <th className="rounded-l-lg px-3 py-2 font-medium">Product/Service</th>
                  <th className="px-3 py-2 font-medium">Price</th>
                  <th className="px-3 py-2 font-medium">Qty</th>
                  <th className="rounded-r-lg px-3 py-2 font-medium">Final Price</th>
                </tr>
              </thead>
              <tbody>
                {(order.items || []).map((item) => (
                  <tr key={item._id} className="border-b border-[#f1f1f5] last:border-0">
                    <td className="flex items-center gap-2 px-3 py-3">
                      {item.listing?.images?.[0] && (
                        <Image
                          src={item.listing.images[0]}
                          alt={item.title}
                          width={32}
                          height={32}
                          className="h-8 w-8 rounded-md object-cover"
                        />
                      )}
                      {item.title}
                    </td>
                    <td className="px-3 py-3">{formatAmount(item.price)}</td>
                    <td className="px-3 py-3">x{item.quantity}</td>
                    <td className="px-3 py-3 font-semibold">{formatAmount(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 grid gap-5 border-t border-[#ececf2] pt-5 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold text-[#454545]">Delivery Method</h3>
            <p className="mt-2 text-sm text-black">
              {fulfillmentLabel[order.items?.[0]?.fulfillmentType] || "—"}
            </p>
            {order.deliveryAddress && (
              <p className="text-sm text-[#67676d] capitalize">{order.deliveryAddress.deliveryOption} delivery</p>
            )}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#454545]">Delivery Address</h3>
            {order.deliveryAddress ? (
              <p className="mt-2 text-sm text-black">
                {[
                  order.deliveryAddress.street,
                  order.deliveryAddress.city,
                  order.deliveryAddress.state,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            ) : (
              <p className="mt-2 text-sm text-[#67676d]">Not applicable for this order</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function getHero(order) {
  if (order.orderStatus === "cancelled") {
    const copy = cancellationCopy(order);
    return { Icon: XCircle, tone: "text-[#e14949]", bg: "bg-[#fdeaea]", title: copy.title, subtitle: copy.message };
  }
  if (order.orderStatus === "completed") {
    return {
      Icon: CheckCircle2,
      tone: "text-[#12bd89]",
      bg: "bg-[#e7fbf3]",
      title: "Order Completed",
      subtitle: "This order has been fulfilled and completed",
    };
  }
  if (order.orderStatus === "pending") {
    return {
      Icon: Clock,
      tone: "text-[#f5b82e]",
      bg: "bg-[#fff6e5]",
      title: "Order Placed",
      subtitle: "Your order has been received and is awaiting confirmation from the business",
    };
  }
  return {
    Icon: CheckCircle2,
    tone: "text-[#12bd89]",
    bg: "bg-[#e7fbf3]",
    title: "Order Confirmed",
    subtitle: "Your order has been successfully placed",
  };
}
