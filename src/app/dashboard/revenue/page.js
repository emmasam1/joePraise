"use client";
import React, { useState } from "react";
import { Button, Dropdown, Table, Select, DatePicker } from "antd";
import { CalendarOutlined, DownOutlined } from "@ant-design/icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import WeeklyRevenueCard from "@/components/WeeklyRevenueCard";
import MonthlyRevenueCard from "@/components/MonthlyRevenueCard";

const page = () => {
  // 1. STATE FOR TABS
  const [activeTab, setActiveTab] = useState("Day");

  // 2. DATA MAPPING
  const chartDataMap = {
    Day: [
      { name: "Mon", payment: 2200, withdrawals: 400 },
      { name: "Tue", payment: 3300, withdrawals: 1200 },
      { name: "Wed", payment: 2500, withdrawals: 1500 },
      { name: "Thur", payment: 4500, withdrawals: 600 },
      { name: "Fri", payment: 2100, withdrawals: 3500 },
      { name: "Sat", payment: 1200, withdrawals: 2800 },
      { name: "Sun", payment: 4100, withdrawals: 1800 },
    ],
    Week: [
      { name: "W1", payment: 8000, withdrawals: 3000 },
      { name: "W2", payment: 12000, withdrawals: 5000 },
      { name: "W3", payment: 7000, withdrawals: 9000 },
      { name: "W4", payment: 15000, withdrawals: 4000 },
    ],
    Month: [
      { name: "Jan", payment: 4000, withdrawals: 2400 },
      { name: "Feb", payment: 3000, withdrawals: 1398 },
      { name: "Mar", payment: 9000, withdrawals: 3800 },
      { name: "Apr", payment: 2780, withdrawals: 3908 },
    ],
    Year: [
      { name: "2023", payment: 50000, withdrawals: 20000 },
      { name: "2024", payment: 80000, withdrawals: 35000 },
      { name: "2025", payment: 120000, withdrawals: 45000 },
    ],
  };

  const statsCard = [
    { id: 1, title: "Total Revenue", value: "$0", img: "/images/dollar.png" },
    {
      id: 2,
      title: "Platform Commission Deducted",
      value: "0%",
      img: "/images/carbon.png",
    },
    { id: 3, title: "Net Earnings", value: "$0", img: "/images/pay.png" },
    {
      id: 4,
      title: "Pending Earnings",
      value: "$0",
      img: "/images/material.png",
    },
  ];

  const data = [
    {
      key: "1",
      id: "#0045",
      service: "Cleaning",
      amount: "$250",
      commission: "5",
      netPayout: "$245",
      status: "In Progress",
    },
    {
      key: "2",
      id: "#0067",
      service: "Plumbing",
      amount: "$100",
      commission: "5",
      netPayout: "$95",
      status: "Accepted",
    },
    {
      key: "3",
      id: "#0085",
      service: "Catering",
      amount: "$50",
      commission: "2",
      netPayout: "$48",
      status: "Completed",
    },
    {
      key: "4",
      id: "#0045",
      service: "Cleaning",
      amount: "$250",
      commission: "3",
      netPayout: "$247",
      status: "In Progress",
    },
    {
      key: "5",
      id: "#0067",
      service: "Plumbing",
      amount: "$100",
      commission: "4",
      netPayout: "$96",
      status: "Completed",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "In Progress":
        return "#060853";
      case "Completed":
        return "#15BE87";
      case "Accepted":
        return "#4A3AFF";
      default:
        return "text-gray-400";
    }
  };

  const columns = [
    {
      title: "",
      render: () => <img src="/images/pen.png" className="w-5" />,
    },
    {
      title: "ORDER ID",
      dataIndex: "id",
      key: "id",
      render: (text) => (
        <span className="font-bold text-[#1e293b]">{text}</span>
      ),
    },
    {
      title: "SERVICE/PRODUCT",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "COMMISSION",
      dataIndex: "commission",
      key: "commission",
    },
    {
      title: "NET PAYOUT",
      dataIndex: "netPayout",
      key: "netPayout",
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span className={`font-medium ${getStatusColor(status)}`}>
          {status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mt-5">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Revenue Overview</h1>
          <p className="text-xs text-black">
            visibility into earnings and financial performance
          </p>
        </div>
        <Button className="p-4.5! bg-[#060853]! rounded-lg border-none! text-white!">
          <img src="/images/upload.png" alt="export" className="h-7" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-[#E2EDFC] p-4 rounded-sm">
        {statsCard.map((card) => (
          <div
            key={card.id}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center border-b border-gray-100 pb-2">
              <img src={card.img} alt="icon" className="h-8 mr-2" />
              <h3 className="text-gray-900">{card.title}</h3>
            </div>
            <p className="text-2xl text-[#060853]">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Filters Section */}
      <div className="flex justify-between items-center">
        <Dropdown
          trigger={["click"]}
          placement="bottomLeft"
          dropdownRender={() => (
            <div className="bg-white p-6 rounded-xl shadow-2xl border border-gray-100 w-112.5">
              <h3 className="text-sm font-bold text-gray-900 mb-6">
                Custom Range
              </h3>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-[10px] text-gray-400 mb-2 uppercase font-bold tracking-wider">
                    Start Date
                  </label>
                  <DatePicker
                    format="DD/MM/YYYY"
                    className="w-full rounded-lg border-[#060853]/20 h-10 text-xs"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[10px] text-gray-400 mb-2 uppercase font-bold tracking-wider">
                    End Date
                  </label>
                  <DatePicker
                    format="DD/MM/YYYY"
                    className="w-full rounded-lg border-[#060853]/20 h-10 text-xs"
                  />
                </div>
              </div>
            </div>
          )}
        >
          <div className="flex items-center justify-between w-64 px-4 py-2 bg-white border border-[#060853]/30 rounded-lg cursor-pointer hover:border-[#060853] transition-all">
            <div className="flex items-center gap-3">
              <CalendarOutlined className="text-gray-500" />
              <span className="text-xs text-gray-700 font-medium">
                May 1, 2026 - Jun 22, 2026
              </span>
            </div>
            <DownOutlined className="text-[10px] text-gray-400" />
          </div>
        </Dropdown>

        <Select
          placeholder="Service Type"
          className="w-64 custom-select"
          classNames={{ popup: { root: "custom-select-dropdown" } }}
          suffixIcon={<DownOutlined className="text-[10px] text-gray-400" />}
          options={[
            { value: "cleaning", label: "Cleaning" },
            { value: "plumbing", label: "Plumbing" },
          ]}
        />
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm w-full">
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-gray-400 text-sm uppercase tracking-tighter">
              Statistics
            </p>
            <h2 className="text-xl text-[#060853]">Revenue Performance</h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-6 text-[12px] font-medium text-gray-500">
              <div className="flex items-center gap-2">
                <img src="/images/blue_dot.png" className="w-2" /> Payment
              </div>
              <div className="flex items-center gap-2">
                <img src="/images/green_dot.png" className="w-2" /> Withdrawals
              </div>
            </div>

            {/* INTERACTIVE TABS */}
            <div className="flex bg-[#F8FAFC] p-1 rounded-xl border border-gray-100">
              {["Day", "Week", "Month", "Year"].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveTab(item)} // Updates Chart Data
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all duration-300 ease-in-out ${
                    activeTab === item
                      ? "bg-[#1E1B4B] text-white shadow-md transform scale-105"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="h-87.5 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartDataMap[activeTab]}>
              <CartesianGrid
                vertical={false}
                strokeDasharray="0"
                stroke="#F1F5F9"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94A3B8", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94A3B8", fontSize: 12 }}
                tickFormatter={(v) => `${v >= 1000 ? v / 1000 + "k" : v}`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-[#1E1B4B] text-white px-3 py-1.5 rounded-md text-xs font-bold shadow-xl animate-in fade-in zoom-in duration-200">
                        ${payload[0].value.toLocaleString()}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1E1B4B] rotate-45" />
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="payment"
                stroke="#060853"
                strokeWidth={2}
                dot={{ r: 5, fill: "white", strokeWidth: 2 }}
                animationDuration={1000} // Motion for switching tabs
              />
              <Line
                type="monotone"
                dataKey="withdrawals"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ r: 5, fill: "white", strokeWidth: 2 }}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid-cols-1 lg:grid-cols-2 gap-20 grid">
        <WeeklyRevenueCard />
        <MonthlyRevenueCard />
      </div>

      <div className="bg-[#f0f5ff] p-8 min-h-screen">
        <h2 className="text-sm font-bold mb-4 text-[#1e293b]">
          Transaction List
        </h2>

        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          <Table
            columns={columns}
            dataSource={data}
            pagination={false} // Custom pagination below
            className="custom-table"
            size="small"
            rowClassName="hover:bg-gray-50 transition-colors"
          />
        </div>

        {/* FOOTER / PAGINATION */}
        <div className="flex items-center justify-between px-6 py-4 mt-5">
          <span className="text-[11px] text-black">
            Show 1 to 4 of 20 results
          </span>

          <div className="flex items-center gap-1">
            <button className="p-2 text-gray-400 hover:text-black">
              <img src="/images/arrow_left.png" alt="prev" className="h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-[#060853] text-white text-xs font-bold">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-white border border-gray-100 text-gray-400 text-xs">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-white  border border-gray-100 text-gray-400 text-xs">
              3
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-white  border border-gray-100 text-gray-400 text-xs">
              4
            </button>
            <span className="px-1 text-gray-400">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-white  border border-gray-100 text-gray-400 text-xs">
              10
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-white  border border-gray-100 text-gray-400 text-xs">
              11
            </button>
            <button className="p-2 text-gray-400 hover:text-black">
              {" "}
              <img src="/images/arrow_right.png" alt="next" className="h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
