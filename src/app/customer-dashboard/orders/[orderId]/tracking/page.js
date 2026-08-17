import OrderTracking from "../_components/OrderTracking";

export default async function CustomerOrderTrackingPage({ params }) {
  const { orderId } = await params;

  return <OrderTracking orderId={orderId} />;
}

