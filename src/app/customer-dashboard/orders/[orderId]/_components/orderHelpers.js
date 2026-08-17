export const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "—";

export const formatDateTime = (value) =>
  value
    ? new Date(value).toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : "—";

export const formatAmount = (value) => `$${Number(value || 0).toLocaleString()}`;

export const businessDisplayName = (order) =>
  order.business?.businessName ||
  (order.businesses?.length > 1 ? "Multiple Vendors" : "—");

export const fulfillmentLabel = {
  seller_location: "Pickup at the store",
  client_location: "Home Delivery",
  online_virtual: "Online / Virtual",
};

export const paymentMethodLabel = {
  stripe: "Card Payment",
  wallet: "Wallet",
  wallet_and_stripe: "Wallet + Card",
};

export const estimatedCompletion = (order) => {
  const dates = (order.items || [])
    .map((item) => item.expectedCompletionAt)
    .filter(Boolean)
    .map((d) => new Date(d));

  if (dates.length === 0) return "Not yet available";
  return formatDate(new Date(Math.max(...dates)));
};

export const isBusinessRejection = (order) =>
  order.orderStatus === "cancelled" &&
  (order.refundReason || "").toLowerCase().includes("reject");

export const cancellationCopy = (order) => {
  if (isBusinessRejection(order)) {
    return {
      title: "Order Rejected",
      message: "Sorry, your order has been declined by the business",
    };
  }
  return {
    title: "Order Cancelled",
    message: order.refundReason || "This order has been cancelled",
  };
};
