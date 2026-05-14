"use client";
import React, { useState } from "react";
import { Input, Button, Table, Dropdown } from "antd";

import { motion, AnimatePresence } from "motion/react";
export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = [
    "All",
    "In Progress",
    "Pending",
    "Completed",
    "Cancelled",
    "Accepted",
  ];

  const tabVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  const statsCard = [
    {
      id: 1,
      title: "Total Orders",
      value: "0",
    },
    {
      id: 2,
      title: "Accepted Orders",
      value: "0",
    },
    {
      id: 3,
      title: "Orders in Progress",
      value: "0",
    },
    {
      id: 4,
      title: "Completed Orders",
      value: "0",
    },
  ];

  const data = [
    {
      key: "1",
      id: "#0045",
      customer: "Joseph Grace",
      service: "Cleaning",
      date: "09/12/2025",
      amount: "$250",
      status: "In Progress",
    },
    {
      key: "2",
      id: "#0067",
      customer: "Lawrance Josh",
      service: "Plumbing",
      date: "15/12/2025",
      amount: "$100",
      status: "Pending",
    },
    {
      key: "3",
      id: "#0085",
      customer: "Adams John",
      service: "Catering",
      date: "18/12/2025",
      amount: "$50",
      status: "Completed",
    },
    {
      key: "4",
      id: "#0045",
      customer: "Joseph Grace",
      service: "Cleaning",
      date: "09/12/2025",
      amount: "$250",
      status: "Cancelled",
    },
    {
      key: "5",
      id: "#0067",
      customer: "Lawrance Josh",
      service: "Plumbing",
      date: "15/12/2025",
      amount: "$100",
      status: "Accepted",
    },
    {
      key: "6",
      id: "#0085",
      customer: "Adams John",
      service: "Catering",
      date: "18/12/2025",
      amount: "$50",
      status: "Completed",
    },
  ];

  // 2. STATUS COLOR LOGIC
  const getStatusColor = (status) => {
    switch (status) {
      case "In Progress":
        return "text-blue-400";
      case "Pending":
        return "text-yellow-400";
      case "Completed":
        return "text-green-400";
      case "Cancelled":
        return "text-red-400";
      case "Accepted":
        return "text-orange-400";
      default:
        return "text-gray-400";
    }
  };

  // 3. ACTION MENU (The "Order Details" dropdown)
  const items = [
    {
      key: "1",
      label: (
        <span className="text-[10px] font-bold py-1 block">Order Details</span>
      ),
    },
    {
      key: "2",
      label: (
        <span className="text-[10px] font-bold py-1 block">Accept Order</span>
      ),
    },
    {
      key: "3",
      label: (
        <span className="text-[10px] font-bold py-1 block">Reject Order</span>
      ),
    },
  ];

  // 4. COLUMN DEFINITIONS
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
      title: "CUSTOMER INFO",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "SERVICE TYPE",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      key: "amount",
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
    {
      title: "",
      key: "action",
      render: () => (
        <Dropdown
          menu={{ items }}
          trigger={["click"]}
          placement="bottomRight"
          // overlayClassName="custom-dropdown"
        >
          <Button className="border-none! bg-transparent! outline-0! p-0! flex items-center justify-center h-8 w-8">
            <img src="/images/dots.png" className="w-5" />
          </Button>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mt-5">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Order Management</h1>
          <p className="text-xs text-[#4A4A4A]">
            View and manage your customer orders here.
          </p>
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

      <div className="min-h-screen">
        {/* HEADER SECTION (Filter Bar) */}
        <div className="flex items-center justify-between mb-6">
          {/* LEFT: ANIMATED TABS */}
          <div className="flex items-center gap-1 bg-[#E2EDFC] p-1 rounded-full border border-[#E0E7FF]/60">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)} // <-- Switch Content here
                  className={`relative px-4 rounded-lg p-1.5 text-xs font-bold transition-colors z-10 
                  ${isActive ? "text-white" : "text-gray-500 hover:text-gray-700"}`}
                >
                  {tab}
                  {/* Framer Motion Background Indicator (Smooth Pill) */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill" // Crucial: shared layoutId makes it animate
                      className="absolute inset-0 bg-[#060853] rounded-full z-[-1]"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* RIGHT: SEARCH & TOOLS */}
          <div className="flex items-center gap-2 pr-2">
            <Input
              prefix={
                <img src="/images/search.png" alt="search" className="h-7" />
              }
              placeholder="Search"
              className="w-72 rounded-lg bg-gray-50 border border-gray-200 h-10 text-xs"
            />

            <Button className="flex items-center justify-center border-gray-200 rounded-lg h-10!  overflow-hidden">
              <img
                src="/images/funnel.png"
                alt="list"
                className="h-8 w-8 object-contain" // Reduce the size of the image relative to the 10x10 button
              />
            </Button>
            <Button className="flex items-center justify-center border-gray-200 rounded-lg h-10!  overflow-hidden">
              <img
                src="/images/grid.png"
                alt="list"
                className="h-8 w-8 object-contain" // Reduce the size of the image relative to the 10x10 button
              />
            </Button>
            <Button className="flex items-center justify-center border-gray-200 rounded-lg h-10! overflow-hidden">
              <img
                src="/images/list.png"
                alt="list"
                className="h-8 w-8 object-contain" // Reduce the size of the image relative to the 10x10 button
              />
            </Button>
          </div>
        </div>

        {/* 3. SWITCHING PAGE CONTENT SECTION */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab} // Changing key forces re-animation on tab switch
            initial="initial"
            animate="animate"
            exit="exit"
            variants={tabVariants}
            transition={{ duration: 0.2 }}
            className=""
          >
            {/* SWITCH LOGIC based on state */}
            {activeTab === "All" && (
              <div className="bg-[#f0f5ff] p-8 min-h-screen">
                <h2 className="text-sm font-bold mb-4 text-[#1e293b]">
                  Order List
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
                      <img
                        src="/images/arrow_left.png"
                        alt="prev"
                        className="h-4"
                      />
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
                      <img
                        src="/images/arrow_right.png"
                        alt="next"
                        className="h-4"
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "In Progress" && (
              <div className="flex justify-center items-center flex-col gap-2 text-center ">
                <img src="/images/no_order.png" className="w-100" />
                <p className="font-bold mt-1 text-black">No Orders Yet</p>

                <div className="mt-10">
                  <Button className="text-white! h-10! px-8 bg-[#060853]! rounded-lg border-none font-medium">
                    Promote Business
                  </Button>
                </div>

                <div className="w-full max-w-150 mt-10 pt-6 border-t border-gray-100">
                  {/* Title */}
                  <h2 className="text-sm font-bold text-gray-800 mb-4 text-left">
                    Your Business Link
                  </h2>

                  {/* Link Container */}
                  <div className="flex justify-between items-center bg-[#F3F4F6] rounded-xl p-2 pl-4 border border-gray-50">
                    {/* The URL Text */}
                    <span className="text-[13px] text-gray-500 font-medium truncate pr-4">
                      https://mybusinesswebsite.com
                    </span>

                    {/* The Copy Button */}
                    <button
                      className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 hover:bg-gray-50 transition-all group"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          "https://mybusinesswebsite.com",
                        );
                        // Optional: add a toast message here
                      }}
                    >
                      <img
                        src="/images/copy.png" // Replace with your actual icon path
                        alt="copy"
                        className="w-4 h-4 opacity-60 group-hover:opacity-100"
                      />
                      <span className="text-xs font-bold text-gray-700">
                        Copy Link
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Pending" && (
              <div className="text-yellow-600">
                You have 5 new pending orders. Click to accept them.
              </div>
            )}

            {/* Add cases for "Completed", "Cancelled", "Accepted" as needed */}
            {(activeTab === "Completed" ||
              activeTab === "Cancelled" ||
              activeTab === "Accepted") && (
              <div className="text-gray-400 italic">
                No historical data found for {activeTab} orders.
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
