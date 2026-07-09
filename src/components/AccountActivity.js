
"use client";
import React, { useEffect } from "react";
import { Spin } from "antd";
import dayjs from "dayjs";
import { useCustomerManagementStore } from "@/store/customerManagementStore";

const formatEvent = (action = "") =>
  action
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");

const AccountActivity = ({ customerId }) => {
  const { customerActivities, activitiesLoading, getCustomerActivities } =
    useCustomerManagementStore();

  useEffect(() => {
    if (customerId) {
      getCustomerActivities(customerId, { page: 1, limit: 20 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId]);

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Account Activity</h2>

      {activitiesLoading ? (
        <div className="flex justify-center py-10">
          <Spin />
        </div>
      ) : customerActivities.length === 0 ? (
        <p className="text-sm text-gray-500">No recent activity.</p>
      ) : (
        <div className="relative space-y-8 max-h-[450px] overflow-y-auto pr-4 custom-scrollbar">
          {customerActivities.map((item) => (
            <div key={item._id} className="relative pl-8">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                    {formatEvent(item.action)}
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-1">
                    {/* Adjust field name to match your UserActionLog model */}
                    {item.description || item.details || ""}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-gray-400 uppercase">
                    {item.createdAt
                      ? dayjs(item.createdAt).format("MMMM D, YYYY")
                      : ""}
                  </p>
                  <p className="text-[9px] text-gray-300 font-medium mt-0.5">
                    {item.createdAt ? dayjs(item.createdAt).format("hh:mm A") : ""}
                  </p>
                </div>
              </div>

              <div className="mt-4 border-b border-gray-50" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountActivity;