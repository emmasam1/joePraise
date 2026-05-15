// src/app/dashboard/page.js
"use client";

import React from "react";
import {
  MoreOutlined,
  ArrowUpOutlined,
  CheckSquareOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { Button } from "antd"


export default function DashboardPage() {
  const statsCard = [
    {
      id: 1,
      title: "Total Orders",
      value: "1,234",
    },
    {
      id: 2,
      title: "Total Revenue",
      value: "$18,223",
    },
    {
      id: 3,
      title: "Pending Orders",
      value: "1,234",
    },
    {
      id: 4,
      title: "Trust Score",
      value: "92",
      over: "100",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mt-5">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Business Dashboard</h1>
        </div>
        <Button className="p-4.5! bg-[#060853]! rounded-lg border-none! text-white!">
          <img src="/images/upload.png" alt="export" className="h-7" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-[#E2EDFC] p-4 rounded-sm">
        {statsCard.map((card) => {
          return (
            <div
              key={card.id}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center border-b border-gray-100 pb-2">
                <img src="/images/cube.png" alt="cube" className="h-8" />
                <h3 className="font-bold text-gray-900">{card.title}</h3>
              </div>

              <p className="text-2xl font-bold text-[#060853]">{card.value}</p>
            </div>
          );
        })}
      </div>

      {/* Main Row: Transactions Chart */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">
              Statistics
            </span>
            <h2 className="text-lg font-bold text-[#060853]">
              Payment transactions.
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
              <span className="w-2 h-2 rounded-full bg-[#060853]"></span>{" "}
              Payment
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
              <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>{" "}
              Withdrawals
            </div>
            <div className="flex bg-gray-100 p-1 rounded-md text-[10px] font-bold">
              <span className="px-3 py-1">Day</span>
              <span className="px-3 py-1">Week</span>
              <span className="px-3 py-1 bg-[#060853] text-white rounded shadow-sm">
                Month
              </span>
              <span className="px-3 py-1">Year</span>
            </div>
          </div>
        </div>

        {/* Mock Chart Area */}
        <div className="h-64 w-full relative mt-4 border-b border-l border-gray-100">
          <img
            src="/images/mock-graph.png"
            alt="Graph"
            className="w-full h-full object-contain opacity-80"
          />
          <div className="absolute top-10 right-[25%] bg-[#1E293B] text-white text-[10px] px-2 py-1 rounded shadow-lg">
            $2,714
          </div>
        </div>
        <div className="flex justify-between mt-4 text-[10px] font-bold text-gray-400 uppercase">
          <span>1 Oct</span>
          <span>3 Oct</span>
          <span>7 Oct</span>
          <span>10 Oct</span>
          <span>14 Oct</span>
          <span>20 Oct</span>
          <span>23 Oct</span>
          <span>27 Oct</span>
          <span>30 Oct</span>
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
            <OrderRow
              id="#0045"
              name="Joseph Grace"
              type="Cleaning"
              date="09/12/2025"
              amount="$250"
              status="In Progress"
              statusColor="text-blue-400"
            />
            <OrderRow
              id="#0087"
              name="Lawrence Josh"
              type="Plumbing"
              date="15/12/2025"
              amount="$100"
              status="Pending"
              statusColor="text-orange-300"
            />
            <OrderRow
              id="#0065"
              name="Adams John"
              type="Catering"
              date="19/12/2025"
              amount="$50"
              status="Completed"
              statusColor="text-emerald-400"
            />
            <OrderRow
              id="#0087"
              name="Lawrence Josh"
              type="Plumbing"
              date="15/12/2025"
              amount="$100"
              status="Pending"
              statusColor="text-orange-300"
            />
            <OrderRow
              id="#0065"
              name="Adams John"
              type="Catering"
              date="19/12/2025"
              amount="$50"
              status="Completed"
              statusColor="text-emerald-400"
            />
          </tbody>
        </table>
        <div className="p-4 text-right">
          <button className="text-[10px] font-bold text-emerald-500 hover:underline">
            View More...
          </button>
        </div>
      </div>

      {/* Bottom Widgets Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Reviews Widget */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-gray-400 text-[10px] font-bold uppercase">
            Community
          </span>
          <h2 className="text-sm font-bold text-[#060853] mb-6">
            Reviews qualification
          </h2>
          <div className="flex h-4 w-full rounded-full overflow-hidden mb-8">
            <div className="bg-[#8B0000] w-[10%]"></div>
            <div className="bg-[#FFBD3D] w-[20%]"></div>
            <div className="bg-[#10B981] w-[70%]"></div>
          </div>
          <div className="flex gap-8">
            <ReviewStat
              label="Negative"
              value="16"
              color="bg-[#8B0000]"
              icon="😠"
            />
            <ReviewStat
              label="Neutral"
              value="45"
              color="bg-[#FFBD3D]"
              icon="😐"
            />
            <ReviewStat
              label="Positive"
              value="2,113"
              color="bg-[#10B981]"
              icon="😃"
            />
          </div>
        </div>

        {/* User Ratio Widget */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
          <span className="text-gray-400 text-[10px] font-bold uppercase">
            Customer acquisition ratio
          </span>
          <h2 className="text-sm font-bold text-[#060853] mb-4">User ratio</h2>
          <div className="flex justify-center items-center h-48 relative">
            <div className="w-32 h-32 rounded-full bg-[#060853] flex items-center justify-center text-white text-2xl font-bold z-10 translate-x-4">
              70%
            </div>
            <div className="w-24 h-24 rounded-full bg-[#10B981] flex items-center justify-center text-white text-lg font-bold -translate-x-4">
              30%
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500">
              <span className="w-2 h-2 rounded-full bg-[#060853]"></span> Return
              Customers
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500">
              <span className="w-2 h-2 rounded-full bg-[#10B981]"></span> New
              customers.
            </div>
          </div>
        </div>
      </div>

      {/* Age and Gender Statistics */}
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="text-gray-400 text-[10px] font-bold uppercase">
              Statistics
            </span>
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
              <p className="text-[10px] font-bold text-gray-400 uppercase">
                Total:
              </p>
              <p className="text-lg font-black text-[#060853]">31,863</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <AgeBar
            range="18-24"
            maleWidth="20%"
            femaleWidth="10%"
            percentage="3.3%"
          />
          <AgeBar
            range="25-34"
            maleWidth="45%"
            femaleWidth="25%"
            percentage="12.7%"
          />
          <AgeBar
            range="35-44"
            maleWidth="30%"
            femaleWidth="40%"
            percentage="15.2%"
            showBubble
            val="4,578"
          />
          <AgeBar
            range="45-64"
            maleWidth="45%"
            femaleWidth="100%"
            percentage="25.3%"
          />
          <AgeBar
            range="65+"
            rangeClass="mt-2"
            maleWidth="100%"
            femaleWidth="80%"
            percentage="33.5%"
          />
        </div>
      </div>
    </div>
  );
}

// Sub-components for cleaner structure
function StatCard({ title, value, change, icon, color, hideChange }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-lg">{icon}</span>
        <span className="text-xs font-bold text-gray-400 uppercase tracking-tight">
          {title}
        </span>
      </div>
      <div className="flex items-baseline justify-between">
        <h3 className="text-xl font-black text-[#060853]">{value}</h3>
        {!hideChange && (
          <div
            className={`text-[10px] font-bold ${color} flex items-center gap-1`}
          >
            <ArrowUpOutlined className="text-[8px]" /> {change}{" "}
            <span className="text-gray-300 font-medium">this month</span>
          </div>
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
      <td className={`px-6 py-4 font-bold text-[10px] ${statusColor}`}>
        {status}
      </td>
      <td className="px-6 py-4 text-right">
        <MoreOutlined className="cursor-pointer" />
      </td>
    </tr>
  );
}

function ReviewStat({ label, value, color, icon }) {
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

function AgeBar({
  range,
  maleWidth,
  femaleWidth,
  percentage,
  showBubble,
  val,
}) {
  return (
    <div className="flex items-center gap-6">
      <span className="text-[10px] font-bold text-gray-400 w-12">{range}</span>
      <div className="flex-1 h-2 bg-gray-50 rounded-full relative overflow-visible">
        <div
          className="absolute left-0 top-0 h-full bg-[#060853] rounded-full z-20"
          style={{ width: maleWidth }}
        ></div>
        <div
          className="absolute left-0 top-0 h-full bg-[#8E92BC] rounded-full z-10"
          style={{ width: femaleWidth }}
        ></div>
        {showBubble && (
          <div className="absolute top-4 left-[20%] bg-[#1E293B] text-white text-[10px] px-2 py-1 rounded shadow-lg after:content-[''] after:absolute after:-top-1 after:left-1/2 after:-translate-x-1/2 after:border-l-4 after:border-r-4 after:border-b-4 after:border-l-transparent after:border-r-transparent after:border-b-[#1E293B]">
            {val}
          </div>
        )}
      </div>
      <span className="text-[10px] font-bold text-gray-400 w-10 text-right">
        {percentage}
      </span>
    </div>
  );
}
