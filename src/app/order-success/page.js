"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Spin, Button } from "antd";
import { CheckCircleFilled, LoadingOutlined, ShoppingOutlined, HomeOutlined } from "@ant-design/icons";
import api from "@/api/axios";

const POLL_INTERVAL_MS = 2500;
const MAX_POLL_ATTEMPTS = 8; // ~20 seconds of polling before giving up

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pollAttempt, setPollAttempt] = useState(0);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    // Path A: wallet-only checkout — order data already stashed locally.
    const stashed = sessionStorage.getItem("joepraise-last-order");
    if (stashed && !sessionId) {
      setOrders(JSON.parse(stashed));
      setLoading(false);
      sessionStorage.removeItem("joepraise-last-order");
      return;
    }

    // Path B: Stripe redirect — poll briefly for the webhook to land,
    // since it fires asynchronously and may take a moment after redirect.
    if (!sessionId) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const poll = async () => {
      try {
        const res = await api.get(`/orders/by-session/${sessionId}`);
        if (!cancelled && res.data.success) {
          setOrders(res.data.orders);
          setLoading(false);
          return;
        }
      } catch {
        // 404 expected while webhook hasn't landed yet — keep polling.
      }

      if (!cancelled) {
        setPollAttempt((prev) => {
          const next = prev + 1;
          if (next >= MAX_POLL_ATTEMPTS) {
            setLoading(false);
            setTimedOut(true);
          } else {
            setTimeout(poll, POLL_INTERVAL_MS);
          }
          return next;
        });
      }
    };

    poll();

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] px-4">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} />
        <p className="mt-6 text-gray-500 font-medium text-center">
          Confirming your payment
          {pollAttempt > 0 && <span className="block text-xs mt-1">This can take a few seconds…</span>}
        </p>
      </div>
    );
  }

  if (timedOut || !orders || orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center mb-6">
          <span className="text-3xl">⏳</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Payment received</h1>
        <p className="text-gray-500 max-w-md mb-8">
          We're still finalizing your order in the background. It'll appear in your order history shortly —
          you don't need to do anything else.
        </p>
        <Link href="/customer-dashboard/orders">
          <Button type="primary" className="h-11! bg-[#060853]! border-none! font-bold px-8!">
            View My Orders
          </Button>
        </Link>
      </div>
    );
  }

  const grandTotal = orders.reduce((sum, o) => sum + (o.totalOriginalPrice || 0), 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
            <CheckCircleFilled className="text-emerald-500 text-4xl" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-500">
            Thank you for your purchase. A confirmation has been sent to your email.
          </p>
        </div>

        {/* Order cards */}
        <div className="space-y-4 mb-8">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <img
                    src={order.business?.logo?.url || "/images/no-image.png"}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{order.business?.businessName}</p>
                    <p className="text-xs text-gray-400">Order #{order.orderNumber}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase">
                  {order.orderStatus?.replace("_", " ")}
                </span>
              </div>

              <div className="px-6 py-4 space-y-3">
                {order.items?.map((item) => (
                  <div key={item._id} className="flex justify-between items-center text-sm">
                    <div>
                      <p className="font-semibold text-slate-800">{item.title}</p>
                      <p className="text-xs text-gray-400">Qty {item.quantity}</p>
                    </div>
                    <span className="font-bold text-slate-900">${item.total?.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                <span className="text-xs font-bold text-gray-500 uppercase">Total</span>
                <span className="font-bold text-slate-900">${order.totalOriginalPrice?.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>

        {orders.length > 1 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4 flex justify-between items-center mb-8">
            <span className="font-bold text-slate-900">Grand Total</span>
            <span className="font-bold text-xl text-slate-900">${grandTotal.toLocaleString()}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/customer-dashboard/orders" className="flex-1">
            <Button
              block
              icon={<ShoppingOutlined />}
              className="h-12! font-bold border-[#060853]! text-[#060853]!"
            >
              View My Orders
            </Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button
              type="primary"
              block
              icon={<HomeOutlined />}
              className="h-12! bg-[#060853]! border-none! font-bold"
            >
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />} />
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}