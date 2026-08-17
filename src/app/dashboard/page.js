

"use client";

import React, { useEffect } from "react";
import {
  MoreOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useAuthStore } from "@/store/authStore";
import { useBusinessDashboardStore } from "@/store/businessDashboardStore";
import CustomModal from "@/components/CustomModal";

const statusColors = {
  pending: "text-orange-300",
  accepted: "text-[#060853]",
  in_progress: "text-blue-400",
  partially_completed: "text-blue-400",
  completed: "text-emerald-400",
  cancelled: "text-red-400",
};

const statusLabels = {
  pending: "Pending",
  accepted: "Accepted",
  in_progress: "In Progress",
  partially_completed: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "—";

const formatAmount = (value) => `$${Number(value || 0).toLocaleString()}`;

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const {
    overviewStats,
    recentOrders,
    revenueTrend,
    reviewBreakdown,
    customerRatio,
    demographics,
    overviewLoading,
    overviewError,
    getOverview,
  } = useBusinessDashboardStore();

  useEffect(() => {
    getOverview();
  }, [getOverview]);

  const statsCard = [
    { id: 1, title: "Total Orders", value: overviewStats?.totalOrders ?? 0 },
    { id: 2, title: "Total Revenue", value: formatAmount(overviewStats?.totalRevenue) },
    { id: 3, title: "Pending Orders", value: overviewStats?.pendingOrders ?? 0 },
    { id: 4, title: "Trust Score", value: overviewStats?.trustScore ?? 0, over: "100" },
  ];

  if (user?.business?.verificationStatus === "pending") {
    return (
      <div className="fixed inset-0 z-[10] flex items-center justify-center bg-[#ffffff10]">
        <CustomModal isOpen={true} size="max-w-md" showClose={false}>
          <div className="flex flex-col items-center justify-center py-6 text-center ">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <img src="/images/mail.png" alt="Pending" className="w-full" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Verification Pending</h2>
            <p className="text-gray-500 text-sm leading-relaxed px-4">
              Your business verification is under review.
              <br />
              You will receive an email once approval is completed.
            </p>
            <p className="text-gray-500 mt-5 text-sm">
              {" "}
              longer than expedcted? <span className="text-[#15BE87]">Contact Support</span>{" "}
            </p>
          </div>
        </CustomModal>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mt-5">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
        </div>
        <Button className="p-4.5! bg-[#060853]! rounded-lg border-none! text-white!">
          <img src="/images/upload.png" alt="export" className="h-7" />
          Export Report
        </Button>
      </div>

      {overviewError && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{overviewError}</p>
      )}

      {/* Stats Cards  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-[#E2EDFC] p-4 rounded-sm">
        {statsCard.map((card) => (
          <div key={card.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center border-b border-gray-100 pb-2">
              <img src="/images/cube.png" alt="cube" className="h-8" />
              <h3 className="font-bold text-gray-900">{card.title}</h3>
            </div>
            <p className="text-2xl font-bold text-[#060853]">
              {overviewLoading ? "…" : card.value}
              {card.over && <span className="text-sm font-medium text-gray-400">/{card.over}</span>}
            </p>
          </div>
        ))}
      </div>

      {/* Main Row: Revenue Chart */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">
              Statistics
            </span>
            <h2 className="text-lg font-bold text-[#060853]">Payment transactions.</h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
              <span className="w-2 h-2 rounded-full bg-[#060853]"></span> Revenue
            </div>
            <div className="flex bg-gray-100 p-1 rounded-md text-[10px] font-bold">
              <span className="px-3 py-1 bg-[#060853] text-white rounded shadow-sm">Month</span>
            </div>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueTrend} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#060853" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#060853" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#f1f1f5" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#9aa0ac", fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9aa0ac", fontSize: 11 }} tickFormatter={(v) => (v === 0 ? "0" : `${v / 1000}k`)} />
              <Tooltip formatter={(value) => [formatAmount(value), "Revenue"]} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="value" stroke="#060853" strokeWidth={2.5} fill="url(#revenueFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50">
          <h2 className="text-lg font-bold text-[#060853]">Recent Orders</h2>
        </div>
        <table className="w-full text-left">
          <thead className="bg-[#060853] text-white text-[10px] font-bold uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer Info</th>
              <th className="px-6 py-4">Service Type</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="text-xs font-medium text-gray-600">
            {recentOrders.length === 0 && !overviewLoading && (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                  No orders yet
                </td>
              </tr>
            )}
            {recentOrders.map((order) => (
              <OrderRow
                key={order.id}
                id={order.orderNumber}
                name={order.customerName}
                type={order.serviceType}
                date={formatDate(order.date)}
                amount={formatAmount(order.amount)}
                status={statusLabels[order.status] || order.status}
                statusColor={statusColors[order.status]}
              />
            ))}
          </tbody>
        </table>
        <div className="p-4 text-right">
          <a href="/dashboard/orders" className="text-[10px] font-bold text-emerald-500 hover:underline">
            View More...
          </a>
        </div>
      </div>

      {/* Bottom Widgets Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Reviews Widget */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-gray-400 text-[10px] font-bold uppercase">Community</span>
          <h2 className="text-sm font-bold text-[#060853] mb-6">Reviews qualification</h2>
          {reviewBreakdown?.total ? (
            <>
              <div className="flex h-4 w-full rounded-full overflow-hidden mb-8">
                <div
                  className="bg-[#8B0000]"
                  style={{ width: `${(reviewBreakdown.negative / reviewBreakdown.total) * 100}%` }}
                />
                <div
                  className="bg-[#FFBD3D]"
                  style={{ width: `${(reviewBreakdown.neutral / reviewBreakdown.total) * 100}%` }}
                />
                <div
                  className="bg-[#10B981]"
                  style={{ width: `${(reviewBreakdown.positive / reviewBreakdown.total) * 100}%` }}
                />
              </div>
              <div className="flex gap-8">
                <ReviewStat label="Negative" value={reviewBreakdown.negative} icon="😠" />
                <ReviewStat label="Neutral" value={reviewBreakdown.neutral} icon="😐" />
                <ReviewStat label="Positive" value={reviewBreakdown.positive} icon="😃" />
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-400">No reviews yet</p>
          )}
        </div>

        {/* User Ratio Widget */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
          <span className="text-gray-400 text-[10px] font-bold uppercase">
            Customer acquisition ratio
          </span>
          <h2 className="text-sm font-bold text-[#060853] mb-4">User ratio</h2>
          <div className="flex justify-center items-center h-48 relative">
            <div className="w-32 h-32 rounded-full bg-[#060853] flex items-center justify-center text-white text-2xl font-bold z-10 translate-x-4">
              {customerRatio?.returningPercent ?? 0}%
            </div>
            <div className="w-24 h-24 rounded-full bg-[#10B981] flex items-center justify-center text-white text-lg font-bold -translate-x-4">
              {customerRatio?.newPercent ?? 0}%
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500">
              <span className="w-2 h-2 rounded-full bg-[#060853]"></span> Return Customers
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500">
              <span className="w-2 h-2 rounded-full bg-[#10B981]"></span> New customers.
            </div>
          </div>
        </div>
      </div>

      {/* Age and Gender Statistics */}
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="text-gray-400 text-[10px] font-bold uppercase">Statistics</span>
            <h2 className="text-lg font-bold text-[#060853]">Age and gender</h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
              <span className="w-2 h-2 rounded-full bg-[#060853]"></span> Male
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
              <span className="w-2 h-2 rounded-full bg-[#8E92BC]"></span> Female
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Total:</p>
              <p className="text-lg font-black text-[#060853]">
                {demographics?.totalCounted ?? 0}
              </p>
            </div>
          </div>
        </div>

        {demographics?.totalCounted ? (
          <div className="space-y-6">
            {demographics.brackets.map((bracket) => (
              <AgeBar key={bracket.range} bracket={bracket} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400">
            No age/gender data yet — customers haven&apos;t added this to their profile.
          </p>
        )}
      </div>
    </div>
  );
}

function OrderRow({ id, name, type, date, amount, status, statusColor }) {
  return (
    <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 flex items-center gap-3">
        <CheckSquareOutlined className="text-gray-300" />
        <span className="font-bold text-gray-900">{id}</span>
      </td>
      <td className="px-6 py-4 text-gray-400">{name}</td>
      <td className="px-6 py-4 text-gray-400">{type}</td>
      <td className="px-6 py-4 text-gray-400 font-bold">{date}</td>
      <td className="px-6 py-4 text-[#060853] font-black">{amount}</td>
      <td className={`px-6 py-4 font-bold text-[10px] ${statusColor}`}>{status}</td>
      <td className="px-6 py-4 text-right">
        <MoreOutlined className="cursor-pointer" />
      </td>
    </tr>
  );
}

function AgeBar({ bracket }) {
  const largest = Math.max(bracket.male, bracket.female, 1);
  const maleWidth = `${(bracket.male / largest) * 100}%`;
  const femaleWidth = `${(bracket.female / largest) * 100}%`;

  return (
    <div className="flex items-center gap-6">
      <span className="text-[10px] font-bold text-gray-400 w-12">{bracket.range}</span>
      <div className="flex-1 h-2 bg-gray-50 rounded-full relative overflow-visible">
        <div
          className="absolute left-0 top-0 h-full bg-[#060853] rounded-full z-20"
          style={{ width: maleWidth }}
        ></div>
        <div
          className="absolute left-0 top-0 h-full bg-[#8E92BC] rounded-full z-10"
          style={{ width: femaleWidth }}
        ></div>
      </div>
      <span className="text-[10px] font-bold text-gray-400 w-10 text-right">
        {bracket.percentage}%
      </span>
    </div>
  );
}

function ReviewStat({ label, value, icon }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-bold text-gray-400 uppercase">{label}</p>
      <div className="flex items-center gap-2">
        <span className="text-xs">{icon}</span>
        <span className="text-sm font-black text-[#060853]">{value}</span>
      </div>
    </div>
  );
}
