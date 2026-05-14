"use client";

import React, { useState } from "react";
import { Button, Input, Table, Dropdown } from "antd";
import { motion, AnimatePresence } from "motion/react";
import CustomModal from "@/components/CustomModal";
import Link from "next/link";

const page = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrder, setselectedOrder] = useState(null);

  const tabs = [
    "All",
    "In Progress",
    "Pending",
    "Completed",
    "Cancelled",
    "Accepted",
    "Dispute",
  ];

  const statsCard = [
    {
      id: 1,
      title: "Pending Orders",
      value: "12",
      img: "/images/yellow_cube.png",
    },
    {
      id: 2,
      title: "Accepted Orders",
      value: "42",
      img: "/images/green_cube.png",
    },
    { id: 3, title: "In Progress", value: "6", img: "/images/cube.png" },
    { id: 4, title: "Completed Orders", value: "60", img: "/images/cube.png" },
    {
      id: 5,
      title: "Cancelled Orders",
      value: "6",
      img: "/images/red_cube.png",
    },
  ];

  // --- TIMELINE LOGIC START ---
  const statusMap = {
    "pending": 1,
    "accepted": 2,
    "in progress": 3,
    "complete": 4,
  };

  const currentStep = selectedOrder ? statusMap[selectedOrder.status] || 1 : 1;

  const getCircleStyle = (stepNumber) => {
    if (currentStep >= stepNumber) {
      return "bg-[#10B981] flex items-center justify-center";
    }
    return "bg-gray-200 border-4 border-white";
  };
  // --- TIMELINE LOGIC END ---

  const columns = [
    {
      title: "",
      render: () => <img src="/images/pen.png" className="w-5" />,
    },
    {
      title: "ORDER ID",
      dataIndex: "order_id",
      key: "order_id",
      render: (text) => (
        <span className="font-bold text-[#1e293b]">{text}</span>
      ),
    },
    {
      title: "CUSTOMER NAME",
      dataIndex: "customer_name",
      key: "customer_name",
    },
    {
      title: "BUSINESS NAME",
      dataIndex: "business_name",
      key: "business_name",
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
    },
    {
      title: "",
      key: "action",
      render: (
        record, // 'record' is the data for the current row
      ) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "1",
                label: (
                  <span className="text-[10px] font-bold py-1 block">
                    View Order
                  </span>
                ),
                onClick: () => {
                  setselectedOrder(record); // Pass the row data to state
                  setIsOpen(true); // Open the modal
                },
              },
            ],
          }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Button className="border-none! bg-transparent! outline-0! p-0! flex items-center justify-center h-8 w-8">
            <img src="/images/dots.png" className="w-5" />
          </Button>
        </Dropdown>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      order_id: "#0045",
      customer_name: "Joseph Grace",
      business_name: "Tech Haven",
      date: "09/12/2025",
      amount: "250",
      status: "in progress",
    },
    {
      key: "2",
      order_id: "#0086",
      customer_name: "Lawrance Josh",
      business_name: "Cafe Delight",
      date: "09/12/2025",
      amount: "250",
      status: "pending",
    },
    {
      key: "3", // Changed to 3 for uniqueness
      order_id: "#0085",
      customer_name: "Adams John",
      business_name: "Love Catering",
      date: "09/12/2025",
      amount: "250",
      status: "complete",
    },
  ];

  const tabVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  return (
    <div className="mt-3 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Order Monitoring</h1>
        <Button className="p-4.5! bg-[#060853]! rounded-lg border-none! text-white!">
          <img src="/images/upload.png" alt="export" className="h-7" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-[#E2EDFC] p-6 rounded-xl">
        {statsCard.map((card) => (
          <div
            key={card.id}
            className="bg-white p-5 rounded-xl shadow-sm border border-blue-50"
          >
            <div className="flex items-center gap-3 mb-2 border-b border-gray-50 pb-3">
              <img src={card.img} alt={card.title} className="h-5 w-5" />

              <h3 className="text-sm font-semibold text-gray-600">
                {card.title}
              </h3>
            </div>
            <p className="text-2xl text-center font-bold text-[#060853]">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-6">
        {/* LEFT: ANIMATED TABS */}
        <div className="flex items-center gap-1 bg-[#E2EDFC] p-1 rounded-full border border-[#E0E7FF]/60">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)} 
                className={`relative px-4 rounded-lg p-1.5 text-xs font-bold transition-colors z-10 
                              ${isActive ? "text-white" : "text-gray-500 hover:text-gray-700"}`}
              >
                {tab}
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill" 
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
              className="h-8 w-8 object-contain"
            />
          </Button>
          <Button className="flex items-center justify-center border-gray-200 rounded-lg h-10!  overflow-hidden">
            <img
              src="/images/grid.png"
              alt="list"
              className="h-8 w-8 object-contain"
            />
          </Button>
          <Button className="flex items-center justify-center border-gray-200 rounded-lg h-10! overflow-hidden">
            <img
              src="/images/list.png"
              alt="list"
              className="h-8 w-8 object-contain"
            />
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={tabVariants}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "All" && (
            <div className="bg-[#f0f5ff] p-8 min-h-screen">
              <h2 className="text-sm font-bold mb-4 text-[#1e293b]">
                Customer List
              </h2>

              <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={false} 
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
                <h2 className="text-sm font-bold text-gray-800 mb-4 text-left">
                  Your Business Link
                </h2>

                <div className="flex justify-between items-center bg-[#F3F4F6] rounded-xl p-2 pl-4 border border-gray-50">
                  <span className="text-[13px] text-gray-500 font-medium truncate pr-4">
                    https://mybusinesswebsite.com
                  </span>

                  <button
                    className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 hover:bg-gray-50 transition-all group"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        "https://mybusinesswebsite.com",
                      );
                    }}
                  >
                    <img
                      src="/images/copy.png"
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
        </motion.div>
      </AnimatePresence>

      <CustomModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={
          selectedOrder
            ? `Order ID: ${selectedOrder.order_id}`
            : "Order Details"
        }
        size="max-w-md"
      >
        <div className="space-y-6">
          {/* Info Card */}
          <div className="bg-white border border-gray-100 rounded-sm p-4 flex justify-between items-start text-sm">
            <div className="space-y-2">
              <p className="text-[#2A2A2A] font-normal">
                <span className="font-bold text-gray-900">Customer:</span>{" "}
                {selectedOrder?.customer_name}
              </p>
              <p className="text-[#2A2A2A] font-normal">
                <span className="font-bold text-gray-900">Business:</span>{" "}
                {selectedOrder?.business_name}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900">Status:</span>
              <span className="bg-[#FEF3CC] text-[#2A2A2A] px-3 py-1 rounded-sm text-[10px] font-bold uppercase">
                {selectedOrder?.status || "Unknown"}
              </span>
            </div>
          </div>

          {/* Items */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3 text-sm">
              Order Items
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Laptop</span>
                <span className="font-bold text-gray-900">$85,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Wireless Mouse</span>
                <span className="font-bold text-gray-900">$25,000</span>
              </div>
              <div className="flex justify-between border-b border-gray-50">
                <span className="text-gray-600">Monitor</span>
                <span className="font-bold text-gray-900">$95,000</span>
              </div>
              <div className="flex justify-end items-center gap-4">
                <span className="text-gray-500 font-medium">Total:</span>
                <span className="text-lg font-bold text-gray-900">
                  $195,000
                </span>
              </div>
            </div>
          </div>

          {/* Product Images */}
          <div className="grid grid-cols-3 gap-2">
            <img
              src="/images/laptop.png"
              className="w-full h-24 object-cover rounded-sm"
              alt="Laptop"
            />
            <img
              src="/images/mouse.png"
              className="w-full h-24 object-cover rounded-sm"
              alt="Mouse"
            />
            <img
              src="/images/monitor.png"
              className="w-full h-24 object-cover rounded-sm"
              alt="Monitor"
            />
          </div>

          {/* Payment Status */}
          <div className="text-xs">
            <span className="font-bold text-gray-900">Payment Status:</span>
            <span className="text-red-800 font-bold ml-2">Unpaid</span>
          </div>

          {/* Order Tracking Timeline */}
          <div className="border border-gray-100 rounded-sm p-4 bg-white">
            <div className="space-y-4 relative">
              <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gray-100" />

              {/* Step 1 */}
              <div className="relative pl-7 flex items-center text-[11px]">
                <div className={`absolute left-0 w-4 h-4 rounded-full ${getCircleStyle(1)}`}>
                  {currentStep >= 1 && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <p>
                  <span className="font-bold text-gray-900">Order Placed -</span>{" "}
                  <span className="text-gray-400">{selectedOrder?.date}</span>
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative pl-7 flex items-center text-[11px]">
                <div className={`absolute left-0 w-4 h-4 rounded-full ${getCircleStyle(2)}`}>
                  {currentStep >= 2 && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <p>
                  <span className={`font-bold ${currentStep >= 2 ? "text-gray-900" : "text-gray-400"}`}>Order -</span>{" "}
                  <span className="text-gray-400">Accepted</span>
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative pl-7 flex items-center text-[11px]">
                <div className={`absolute left-0 w-4 h-4 rounded-full ${getCircleStyle(3)}`}>
                  {currentStep >= 3 && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <p className={`${currentStep >= 3 ? "text-blue-500" : "text-gray-400"} font-medium`}>
                  In Progress
                </p>
              </div>

              {/* Step 4 */}
              <div className="relative pl-7 flex items-center text-[11px]">
                <div className={`absolute left-0 w-4 h-4 rounded-full ${getCircleStyle(4)}`}>
                  {currentStep >= 4 && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <p className={`${currentStep >= 4 ? "text-emerald-400" : "text-gray-400"} font-medium`}>
                  Completed
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {selectedOrder?.status === "complete" ? (
            ""
          ) : (
            <div className="flex gap-3 pt-4">
             <Link className="flex-1 text-center bg-[#610C0C] text-white py-3 rounded-sm font-bold text-xs hover:bg-red-950 transition-colors" href={`/admin-dashboard/order-monitoring/${selectedOrder?.key}`}>
                Investigate Dispute
             
             </Link>
              <button className="flex-1 bg-[#5A6270] text-white py-3 rounded-sm font-bold text-xs hover:bg-[#474e59] transition-colors">
                Force Cancel Order
              </button>
            </div>
          )}
        </div>
      </CustomModal>
    </div>
  );
};

export default page;