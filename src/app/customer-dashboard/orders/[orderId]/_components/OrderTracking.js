"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, X, XCircle } from "lucide-react";
import { Button, Input, Rate, Select, message } from "antd";
import CustomModal from "@/components/CustomModal";
import { useCustomerOrderStore } from "@/store/customerOrderStore";
import { businessDisplayName, cancellationCopy, estimatedCompletion, formatDateTime, isBusinessRejection } from "./orderHelpers";

const statusBadgeStyles = {
  pending: "bg-[#fff6e5] text-[#f5b82e]",
  accepted: "bg-[#e7fbf3] text-[#12bd89]",
  in_progress: "bg-[#e6f2ff] text-[#218cff]",
  partially_completed: "bg-[#e6f2ff] text-[#218cff]",
  completed: "bg-[#e7fbf3] text-[#12bd89]",
  cancelled: "bg-[#fdeaea] text-[#e14949]",
};

const statusBadgeLabel = {
  pending: "Pending",
  accepted: "Confirmed",
  in_progress: "In Progress",
  partially_completed: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

const STEP_RANK = { pending: 0, accepted: 1, in_progress: 2, partially_completed: 2, completed: 3, cancelled: -1 };

export default function OrderTracking({ orderId }) {
  const {
    selectedOrder,
    orderLoading,
    orderError,
    reviewLoading,
    getOrderById,
    submitOrderReview,
  } = useCustomerOrderStore();
  const [dismissedModal, setDismissedModal] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [comment, setComment] = useState("");
  const [selectedReviewItemId, setSelectedReviewItemId] = useState("");

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
  const rank = STEP_RANK[order.orderStatus] ?? 0;
  const showRejectedModal = order.orderStatus === "cancelled" && !dismissedModal;
  const reviewableItems = (order.items || []).filter(
    (item) => !item.isReviewed && !item.reviewed && !item.review,
  );
  const canReview =
    order.orderStatus === "completed" && reviewableItems.length > 0;

  const handleSubmitReview = async () => {
    if (!rating) {
      message.error("Please select a rating");
      return;
    }

    if (!reviewTitle.trim()) {
      message.error("Please add a review title");
      return;
    }
    if (!comment.trim()) {
      message.error("Please add a comment about your experience");
      return;
    }

    const selectedItem = reviewableItems.find(
      (item) => item._id === selectedReviewItemId,
    );
    const listingId = selectedItem?.listing?._id || selectedItem?.listing;
    if (!selectedItem || !listingId) {
      message.error("Please select an item to review");
      return;
    }

    try {
      await submitOrderReview({
        orderId: order._id || orderId,
        orderItemId: selectedItem._id,
        listingId,
        rating,
        title: reviewTitle.trim(),
        comment: comment.trim(),
      });
      setReviewModalOpen(false);
      setRating(0);
      setReviewTitle("");
      setComment("");
      setSelectedReviewItemId("");
    } catch {
      // The store displays the API error and keeps the modal open for retry.
    }
  };

  const steps = [
    { key: "placed", label: "Order Placed", at: order.createdAt, rank: 0 },
    { key: "accepted", label: "Accepted by Business", at: order.acceptedAt, rank: 1 },
    { key: "in_progress", label: "In Progress", at: rank >= 2 ? order.updatedAt : null, rank: 2, note: "your order is being processed" },
    { key: "completed", label: "Completed", at: rank >= 3 ? order.updatedAt : null, rank: 3 },
  ];

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold uppercase tracking-wide text-[#20203d]">Order Tracking</h1>
        <span className={`rounded-full px-4 py-1.5 text-xs font-semibold ${statusBadgeStyles[order.orderStatus]}`}>
          {statusBadgeLabel[order.orderStatus]}
        </span>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Left column */}
        <section className="space-y-6 rounded-2xl border border-[#eff0f3] bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-sm font-semibold text-[#454545]">Customer</h2>
            <div className="mt-2 space-y-1 text-sm text-[#454545]">
              <p>{order.contactName || order.customer?.name}</p>
              <p>{order.customer?.email}</p>
              <p>{order.contactPhone || order.customer?.phoneNumber}</p>
              {order.deliveryAddress && (
                <p>
                  {[order.deliveryAddress.street, order.deliveryAddress.city, order.deliveryAddress.state]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              )}
            </div>
          </div>

          <div className="border-t border-[#ececf2] pt-5">
            <h2 className="text-sm font-semibold text-[#454545]">Business</h2>
            <div className="mt-2 space-y-1 text-sm text-[#454545]">
              <p>{businessDisplayName(order)}</p>
              <p>{order.business?.businessPhone}</p>
              <p>{order.business?.address}</p>
            </div>
          </div>

          <div className="border-t border-[#ececf2] pt-5">
            <h2 className="text-sm font-semibold text-[#454545]">Notifications</h2>
            <div className="mt-2 space-y-1 text-sm text-[#12bd89]">
              <p className="flex items-center gap-2"><Check size={14} /> Email notification sent</p>
              <p className="flex items-center gap-2"><Check size={14} /> In-app notification sent</p>
            </div>
          </div>
        </section>

        {/* Right column */}
        <section className="space-y-6 rounded-2xl border border-[#eff0f3] bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-sm font-semibold text-black">Order ID: {order.orderNumber}</h2>
            <p className="mt-1 text-xs text-[#8b8b93]">
              Reference: #{order._id?.slice(-6).toUpperCase()}
            </p>
            <p className="text-xs text-[#8b8b93]">Order date: {formatDateTime(order.createdAt)}</p>
          </div>

          <div className="border-t border-[#ececf2] pt-5">
            <h2 className="text-sm font-semibold text-[#454545]">Order Timeline</h2>
            <ol className="mt-4 space-y-4 border-l-2 border-[#ececf2] pl-5">
              {steps.map((step) => {
                const done = rank >= step.rank && rank !== -1;
                const current = rank === step.rank;
                return (
                  <li key={step.key} className="relative">
                    <span
                      className={`absolute -left-[27px] flex h-4 w-4 items-center justify-center rounded-full ${
                        done ? "bg-[#12bd89]" : current ? "bg-[#060853]" : "border-2 border-[#dcdce4] bg-white"
                      }`}
                    >
                      {done && <Check size={10} className="text-white" />}
                    </span>
                    <p className={`text-sm font-semibold ${current && !done ? "text-[#060853]" : "text-black"}`}>
                      {step.label}
                      {step.at && <span className="ml-2 text-xs font-normal text-[#8b8b93]">{formatDateTime(step.at)}</span>}
                    </p>
                    {current && step.note && <p className="text-xs text-[#8b8b93]">{step.note}</p>}
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="border-t border-[#ececf2] pt-5 text-sm">
            <h2 className="text-sm font-semibold text-[#454545]">Order Update</h2>
            <p className="mt-2 text-[#454545]">
              Estimated Completion - <span className="font-semibold text-black">{estimatedCompletion(order)}</span>
            </p>
            <p className="text-[#454545]">
              Last Update - <span className="font-semibold text-black">{formatDateTime(order.updatedAt)}</span>
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <Link href="/support" className="text-[#12bd89] underline">
                Need help? Contact Support
              </Link>
              {canReview && (
                <Button
                  type="primary"
                  onClick={() => {
                    setSelectedReviewItemId(reviewableItems[0]?._id || "");
                    setReviewModalOpen(true);
                  }}
                  className="h-10! bg-[#060853]! px-6! font-semibold"
                >
                  Leave a Review
                </Button>
              )}
            </div>
          </div>
        </section>
      </div>

      {showRejectedModal && <RejectedModal order={order} onClose={() => setDismissedModal(true)} />}
      <CustomModal
        isOpen={reviewModalOpen}
        onClose={() => !reviewLoading && setReviewModalOpen(false)}
        showClose={!reviewLoading}
        size="max-w-xl"
        title=""
        scrollable={false}
      >
        <div className="px-3 pb-2 text-center sm:px-8">
          <h2 className="text-2xl font-bold text-[#15BE87]">Review</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-5 text-[#7c8495]">
            Your feedback is valuable in helping us understand your needs and
            our services accordingly.
          </p>

          <h3 className="mt-4 text-base font-bold text-black">Rating</h3>
          <Rate
            value={rating}
            onChange={setRating}
            className="mt-2 text-2xl! text-[#ffad0d]!"
          />

          <div className="mx-auto mt-5 max-w-md text-left">
            {reviewableItems.length > 1 && (
              <div className="mb-4">
                <label className="mb-2 block text-sm font-bold text-[#252525]">
                  Item to review
                </label>
                <Select
                  value={selectedReviewItemId}
                  onChange={setSelectedReviewItemId}
                  className="w-full"
                  options={reviewableItems.map((item) => ({
                    value: item._id,
                    label: item.title || item.listing?.title || "Order item",
                  }))}
                />
              </div>
            )}
            <label className="mb-2 block text-sm font-bold text-[#252525]">
              Review title
            </label>
            <Input
              value={reviewTitle}
              onChange={(event) => setReviewTitle(event.target.value)}
              placeholder="e.g. Very good product"
              maxLength={120}
              className="mb-4 h-10 rounded-lg! border-[#060853]!"
            />
            <label className="mb-2 block text-base font-bold text-[#252525]">
              How was your experience?
            </label>
            <Input.TextArea
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Add a comment"
              rows={4}
              maxLength={1000}
              className="resize-none! rounded-xl! border-[#060853]! p-4! text-base!"
            />
          </div>

          <Button
            type="primary"
            loading={reviewLoading}
            onClick={handleSubmitReview}
            className="mt-6 h-10! bg-[#060853]! px-10! font-semibold"
          >
            Submit Review
          </Button>
        </div>
      </CustomModal>
    </div>
  );
}

function RejectedModal({ order, onClose }) {
  const copy = cancellationCopy(order);
  const rejected = isBusinessRejection(order);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 text-[#8b8b93]"
        >
          <X size={18} />
        </button>
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#e14949]">
          <XCircle size={26} className="text-[#e14949]" />
        </div>
        <h2 className="mt-5 text-xl font-bold text-black">{copy.title}</h2>
        <p className="mt-2 text-sm text-[#67676d]">{copy.message}</p>

        <div className="mt-4 flex items-center justify-center gap-2 text-xs">
          {order.refundStatus !== "not_applicable" && (
            <span className="text-[#67676d]">
              Refund {order.refundStatus === "refunded" ? "Initiated" : order.refundStatus},
            </span>
          )}
          {rejected && (
            <Link href="/customer-dashboard/products" className="font-semibold text-[#12bd89]">
              Suggest Similar Businesses
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
