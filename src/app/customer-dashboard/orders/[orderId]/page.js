import OrderDetails from "./_components/OrderDetails";

export default async function CustomerOrderDetailsPage({ params }) {
  const { orderId } = await params;

  return <OrderDetails orderId={orderId} />;
}
