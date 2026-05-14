"use client";
import React, { useState } from "react";
import { Input, Button, Table, Dropdown } from "antd";
import { motion, AnimatePresence } from "motion/react";
import CustomModal from "@/components/CustomModal";

const page = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(null);

  const tabs = ["All", "Frequent customers", "High Spenders", "New customers"];

  const tabVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  const columns = [
    {
      title: "",
      render: () => <img src="/images/pen.png" className="w-5" />,
    },
    {
      title: "Customer Name",
      dataIndex: "title",
      key: "id",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          {/* IMAGE */}
          <img
            src={record.image}
            alt={record.title}
            className="w-10 h-10 rounded-lg object-cover"
          />

          {/* TEXT */}
          <div className="flex flex-col">
            <span className="font-semibold text-[#1e293b] text-sm">
              {record.title}
            </span>

            <span className="text-[10px] text-gray-500">{record.role}</span>
          </div>
        </div>
      ),
    },
    {
      title: "PHONE NUMBER",
      dataIndex: "phone",
      key: "phone",
      render: (_, record) => (
        <span className="font-semibold text-black">{record.phone}</span>
      ),
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
      render: (_, record) => <span className="text-black">{record.email}</span>,
    },
    {
      title: "TOTAL ORDERS",
      dataIndex: "orders",
      key: "orders",
      render: (_, record) => (
        <span className="text-black">{record.orders}</span>
      ),
    },
    {
      title: "TOTAL SPEND",
      dataIndex: "spend",
      key: "spend",
      render: (_, record) => (
        <span className="text-black">${record.spend}</span>
      ),
    },
    {
      title: "LAST ORDER DATE",
      dataIndex: "lastOrderDate",
      key: "lastOrderDate",
      render: (_, record) => (
        <span className="text-black">{record.lastOrderDate}</span>
      ),
    },
    {
      title: "",
      key: "action",
      render: (_, record) => {
        const items = [
          {
            key: "1",
            label: (
              <span className="text-[10px] font-bold py-1 block">Add</span>
            ),
          },
          {
            key: "view",
            label: (
              <span
                onClick={() => {
                  setViewModalOpen(true);
                  setIsSelected(record);
                }}
                className="text-[10px] font-bold py-1 block cursor-pointer"
              >
                View
              </span>
            ),
          },
          {
            key: "3",
            label: (
              <span className="text-[10px] font-bold py-1 block">Edit</span>
            ),
          },
          {
            key: "4",
            label: (
              <span
                onClick={() => {
                  setReportModalOpen(true);
                  setIsSelected(record);
                }}
                className="text-[10px] font-bold py-1 block"
              >
                Report
              </span>
            ),
          },
        ];

        return (
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Button className="border-none! bg-transparent! outline-0! p-0! flex items-center justify-center h-8 w-8">
              <img src="/images/dots.png" className="w-5" />
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  const data = [
    {
      key: "1",
      image: "/images/cake.png",
      title: "Orama joy",
      role: "Event Planner",
      phone: "09073854839",
      email: "orama.joy@example.com",
      orders: "67",
      spend: "250",
      lastOrderDate: "2023/10/15",
    },
  ];

  const statsCard = [
    {
      id: 1,
      title: "Total Customer",
      value: "1093",
      rate: "12",
    },
    {
      id: 2,
      title: "New Customers",
      value: "15",
    },
    {
      id: 3,
      title: "Repeat Customers",
      value: "34",
    },
    {
      id: 4,
      title: "Weekly Active Customers",
      value: "53",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-end mt-5">
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
                <img
                  src="/images/user-remix.png"
                  alt={card.title}
                  className={`
                          object-contain mr-2 h-7
                          `}
                />
                <h3 className="font-bold text-gray-900">{card.title}</h3>
              </div>

              <p className="text-2xl font-bold text-[#060853]">{card.value}</p>

              {card.rate && (
                <div className="flex items-center mt-2">
                  <img src="/images/arrow-up-fill.png" className="w-4" />
                  <p className="text-green-500 font-bold">
                    {card.rate}
                    <span className="text-[#4A4A4A]! font-normal! ml-2">
                      this month
                    </span>
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="">
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
                  Customers
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

      {/* VIEW MODAL */}
      <CustomModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        size="max-w-2xl"
        title="Customer ID: #0045"
      >
        <div className="flex flex-col bg-white text-[#1e293b] -m-6">
          {" "}
          {/* Negative margin to handle modal padding */}
          {/* 1. TOP HEADER SECTION */}
          <div className="px-8 py-6">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img
                    src="/images/image15.png"
                    alt="Orama Felix"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h2 className="text-2xl font-bold text-[#060853]">
                    Orama Felix
                  </h2>
                  <p className="text-gray-500 text-sm">Fashion designer</p>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-2">
                <img src="/images/calendar.png" className="w-5" />
                <div>
                  <p className="text-[11px] text-black font-bold uppercase">
                    Date joined
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    26/03/2026
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-bold text-[#060853] mb-4">
                Contact Info
              </h3>
              <div className="grid grid-cols-2 gap-y-4 border-t border-[#EFF1F0] pt-4">
                <div>
                  <div className="flex items-center gap-2 text-sm">
                    <img src="/images/mi_email.png" className="w-5 mt-1" />
                    <span className="text-gray-700">oramafelix@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <img src="/images/phone_call.png" className="w-5 mt-1" />
                    <span className="text-gray-700">+1 34699976830</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm row-span-2">
                  <img src="/images/address-marker.png" className="w-5 mt-1" />
                  <span className="text-gray-700 leading-relaxed">
                    832, Thompson Drive, San Francisco CA 94107, United Kingdom
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* 2. BLUE BACKGROUND SECTION */}
          <div className="bg-[#E9F2FF] px-8 py-6 border-t border-[#EFF1F0]">
            <h3 className="text-sm font-bold text-[#060853] mb-4">
              Order History
            </h3>

            <div className="flex gap-6">
              {/* Order History Table */}
              <div className="flex-1 bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="space-y-3 max-h-55 overflow-y-auto pr-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center text-[11px] font-bold text-gray-600 border-b border-gray-50 pb-2 last:border-0"
                    >
                      <span>#10235 - Completed - March 25, 2026 - $126</span>
                      <button className="text-[#15BE87] hover:underline">
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Column */}
              <div className="w-44 flex flex-col gap-4">
                <div className="bg-white p-5 rounded-lg text-center ">
                  <p className="text-[13px] text-[#4A4A4A] font-bold mb-2">
                    Total Spend
                  </p>

                  <p className="text-2xl font-bold text-[#060853]">$ 20,430</p>
                </div>
                <div className="bg-white p-5 rounded-lg text-center">
                  <p className="text-[13px] text-[#4A4A4A] font-bold mb-2">
                    Reviews Given
                  </p>
                  <div className="bg-[#EFF1F0] h-0.5 mb-1" />
                  <p className="text-sm font-bold text-[#060853] mb-1">
                    4 Reviews
                  </p>
                  <div className="flex justify-center gap-0.5 text-yellow-400 text-xs">
                    {"★★★★★".split("").map((s, i) => (
                      <span key={i}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. CUSTOMER REVIEWS SECTION */}
            <div className="mt-8">
              <h3 className="text-sm font-bold text-[#060853] mb-4">
                Customer Reviews
              </h3>
              <div className="space-y-4">
                {[1, 2].map((r) => (
                  <div key={r} className="bg-white p-5 rounded-lg ">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex text-yellow-400 text-xs">
                        {"★★★★★"}
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold">
                        March 26, 2026
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                      Great Product. Loved the quality and fast shipping. Will
                      buy again
                    </p>
                    <p className="text-right text-[11px] text-gray-400 font-medium">
                      Posted by{" "}
                      <span className="text-[#060853] font-bold">Sarah J.</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CustomModal>

      {/* REPORT MODAL */}
      <CustomModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        size="max-w-2xl"
      >
        {/* Modal Content Start */}
        <div className="flex flex-col gap-6 text-[#1e293b]">
          {/* HEADER SECTION */}
          <div className="flex items-center justify-center gap-3">
            <div className="bg-[#FF4D4D] p-2 rounded-lg text-white">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-[#1e293b]">
              Report Customer
            </h1>
          </div>

          {/* DISCLAIMER BOX */}
          <div className="bg-[#FFF5F5] border border-[#FFDADA] p-4 rounded-lg flex gap-3">
            <div className="text-[#FF4D4D] mt-1">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="18"
                width="18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"></path>
              </svg>
            </div>
            <p className="text-sm leading-relaxed">
              <span className="font-bold">Disclaimer:</span>{" "}
              <span className="text-[#FF4D4D]">
                Please report customer only for genuine and specific reasons
                such as fraud, abuse, or other clear policy violations.
                Submitting false reports can lead to penalties or account
                suspension.
              </span>
            </p>
          </div>

          {/* FORM FIELDS */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-[#1e293b]">
                Reason for Report *
              </label>
              <select className="w-full border border-gray-200 rounded-lg p-3 text-sm text-gray-500 bg-white focus:outline-none focus:ring-1 focus:ring-gray-300 transition-all appearance-none cursor-pointer">
                <option>Select a reason</option>
                <option value="fraud">Fraud</option>
                <option value="abuse">Abuse</option>
                <option value="policy">Policy Violation</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-[#1e293b]">
                Description
              </label>
              <textarea
                placeholder="Please provide any additional details (optional)"
                rows={6}
                className="w-full border border-gray-200 rounded-lg p-4 text-sm text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-300 transition-all resize-none"
              />
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-end gap-4 mt-2">
            <button
              onClick={() => setReportModalOpen(false)}
              className="px-8 py-2 rounded-lg border border-[#060853] text-[#060853] font-bold text-sm hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button className="px-8 py-2 rounded-lg bg-[#060853] text-white font-bold text-sm hover:bg-[#0a0d6e] transition-colors shadow-md">
              Submit Report
            </button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default page;
