"use client";
import React, { useState } from "react";
import {
  Table,
  Tag,
  Button,
  DatePicker,
  Avatar,
  Input,
  Form,
  Dropdown,
} from "antd";
import { motion, AnimatePresence } from "motion/react";
import CustomModal from "@/components/CustomModal";
import SubmittedReviews from "@/components/SubmittedReviews ";
import AccountActivity from "@/components/AccountActivity";
import OrderHistory from "@/components/OrderHistory";

const { RangePicker } = DatePicker;

const page = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [activeModalTab, setActiveModalTab] = useState("Personal Information");

  const tabs = ["All", "Active", "Inactive"];
  const modalTabs = [
    "Personal Information",
    "Order History",
    "Submitted Reviews",
    "Account Activity",
  ];

  const statsCard = [
    {
      id: 1,
      title: "Total Customers",
      value: "2500",
      img: "/images/user_transparent.png",
    },
    {
      id: 2,
      title: "Active Customers",
      value: "3500",
      img: "/images/user_green.png",
    },
    {
      id: 3,
      title: "Inactive Customers",
      value: "9870",
      img: "/images/user_red.png",
    },
    {
      id: 4,
      title: "New Customer",
      value: "9870",
      img: "/images/user_duble.png",
    },
  ];

  const columns = [
    {
      title: "",
      render: () => <img src="/images/pen.png" className="w-5" />,
    },
    {
      title: "CUSTOMER ID",
      dataIndex: "customer_id",
      key: "customer_id",
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
      title: "EMAIL",
      dataIndex: "customer_email",
      key: "customer_email",
    },
    {
      title: "NUMBER OF ORDERS",
      dataIndex: "number_order",
      key: "number_order",
    },
    {
      title: "ACCOUNT STATUS",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          style={{ color: status === "Active" ? "#15BE87" : "#FB2E2E" }}
          className="capitalize text-[11px]"
        >
          {status}
        </span>
      ),
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
                  <span className="text-[10px] font-bold py-1 block">View</span>
                ),
                onClick: () => {
                  setSelectedCustomer(record); // Pass the row data to state
                  setIsOpen(true); // Open the modal
                },
              },
              {
                key: "2",
                label: (
                  <span className="text-[10px] font-bold py-1 block">
                    Suspend Account
                  </span>
                ),
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
      customer_id: "CUS10045",
      customer_name: "Perlson Marvin",
      customer_email: "perlson@example.com",
      number_order: "20",
      status: "Active",
    },
    {
      key: "2",
      customer_id: "CUS10046",
      customer_name: "Lawrance Josh",
      customer_email: "lawrance@example.com",
      number_order: "15",
      status: "Inactive",
    },
    {
      key: "3",
      customer_id: "CUS10047",
      customer_name: "Adams John",
      customer_email: "adams@example.com",
      number_order: "25",
      status: "Active",
    },
  ];
  const tabVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  return (
    <div className="space-y-6 mt-3">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 mt-5">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            Customer Management
          </h1>
          <p className="text-xs text-black">Fast Customer Lookups</p>
        </div>
        <div className="flex gap-4">
          <RangePicker className="rounded-lg border-gray-200" />
          <Button className="p-4.5! bg-[#060853]! rounded-lg border-none! text-white!">
            <img src="/images/upload.png" alt="export" className="h-7" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-[#E2EDFC] p-4 rounded-sm">
        {statsCard.map((card) => {
          return (
            <div
              key={card.id}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center border-b border-gray-100 pb-2">
                <img src={card.img} alt="cube" className="h-8" />
                <h3 className="font-bold text-gray-900">{card.title}</h3>
              </div>

              <p className="text-2xl font-bold text-[#060853]">{card.value}</p>
            </div>
          );
        })}
      </div>

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
                Customer List
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
        </motion.div>
      </AnimatePresence>

<CustomModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      size="max-w-xl"
    >
      {/* Header Section */}
      <div className="border border-gray-100 p-2">
        <div className="flex items-center gap-3">
          <div className="rounded-full w-13 h-13 overflow-hidden">
            <img
              src="/images/image3.png"
              alt="Customer"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-black font-bold">
              {selectedCustomer?.customer_name || "Customer Details"}
            </h1>
            <span className="text-[#4A4A4A] text-xs">Fashion Designer</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 bg-[#E2EDFC] p-1 rounded-full border border-[#E0E7FF]/60 my-6">
          {modalTabs.map((tab) => {
            const isActive = activeModalTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveModalTab(tab)}
                className={`relative px-4 rounded-lg p-1.5 text-[10px] font-bold transition-colors z-10 
                  ${isActive ? "text-white" : "text-gray-500 hover:text-gray-700"}`}
              >
                {tab}
                {isActive && (
                  <motion.div
                    layoutId="modalTabPill"
                    className="absolute inset-0 bg-[#060853] rounded-full z-[-1]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="mt-5 px-2">
        {activeModalTab === "Personal Information" && (
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Personal Information</h3>
            <p className="text-gray-600 text-sm">
              Here you can view and edit the customer's personal information.
            </p>
          </div>
        )}

        {activeModalTab === "Order History" && (
            <div className="animate-in fade-in duration-300">
            <OrderHistory />
          </div>
        )}

        {/* UPDATED: Integrated SubmittedReviews Component */}
        {activeModalTab === "Submitted Reviews" && (
          <div className="animate-in fade-in duration-300">
            <SubmittedReviews />
          </div>
        )}

        {activeModalTab === "Account Activity" && (
          <div className="animate-in fade-in duration-300">
            <AccountActivity />
          </div>
        )}
      </div>
    </CustomModal>
    </div>
  );
};

export default page;
