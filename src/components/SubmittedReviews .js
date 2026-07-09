
"use client";
import React, { useEffect } from "react";
import { Spin } from "antd";
import dayjs from "dayjs";
import { useCustomerManagementStore } from "@/store/customerManagementStore";

const SubmittedReviews = ({ customerId }) => {
  const { customerReviews, reviewsLoading, getCustomerReviews } =
    useCustomerManagementStore();

  useEffect(() => {
    if (customerId) {
      getCustomerReviews(customerId, { page: 1, limit: 10 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId]);

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Submitted Reviews</h2>

      {reviewsLoading ? (
        <div className="flex justify-center py-10">
          <Spin />
        </div>
      ) : customerReviews.length === 0 ? (
        <p className="text-sm text-gray-500">No reviews submitted yet.</p>
      ) : (
        <div className="space-y-4 overflow-y-auto pr-2">
          {customerReviews.map((review) => (
            <div
              key={review._id}
              className="bg-white border border-gray-100 rounded-sm p-4 shadow-sm"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <img
                        key={i}
                        src={
                          i < (review.rating || 0)
                            ? "/images/yellow_star.png"
                            : "/images/transparent_star.png"
                        }
                        alt="star"
                        className="w-3 h-3 object-contain"
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-[#64748B]">
                    {/* Adjust to your Review schema's populated target field */}
                    {review.reviewTarget?.businessName ||
                      review.reviewTarget?.title ||
                      "Unknown"}
                  </span>
                </div>
                <span className="text-[10px] text-gray-400 font-medium">
                  {review.createdAt
                    ? dayjs(review.createdAt).format("MMMM D, YYYY")
                    : ""}
                </span>
              </div>

              <p className="text-xs text-gray-700 leading-relaxed">
                {/* Adjust field name to match your Review model (comment / reviewText / text) */}
                {review.comment || review.reviewText || review.text || ""}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubmittedReviews;