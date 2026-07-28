// "use client";

// import React, { useState } from "react";
// import { Button, Input, Table, Dropdown } from "antd";
// import { motion, AnimatePresence } from "motion/react";
// import CustomModal from "@/components/CustomModal";
// import Link from "next/link";

// const page = () => {
//   const [activeTab, setActiveTab] = useState("All");
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedOrder, setselectedOrder] = useState(null);

//   const tabs = [
//     "All",
//     "In Progress",
//     "Pending",
//     "Completed",
//     "Cancelled",
//     "Accepted",
//     "Dispute",
//   ];

//   const statsCard = [
//     {
//       id: 1,
//       title: "Pending Orders",
//       value: "12",
//       img: "/images/yellow_cube.png",
//     },
//     {
//       id: 2,
//       title: "Accepted Orders",
//       value: "42",
//       img: "/images/green_cube.png",
//     },
//     { id: 3, title: "In Progress", value: "6", img: "/images/cube.png" },
//     { id: 4, title: "Completed Orders", value: "60", img: "/images/cube.png" },
//     {
//       id: 5,
//       title: "Cancelled Orders",
//       value: "6",
//       img: "/images/red_cube.png",
//     },
//   ];

//   // --- TIMELINE LOGIC START ---
//   const statusMap = {
//     "pending": 1,
//     "accepted": 2,
//     "in progress": 3,
//     "complete": 4,
//   };

//   const currentStep = selectedOrder ? statusMap[selectedOrder.status] || 1 : 1;

//   const getCircleStyle = (stepNumber) => {
//     if (currentStep >= stepNumber) {
//       return "bg-[#10B981] flex items-center justify-center";
//     }
//     return "bg-gray-200 border-4 border-white";
//   };
//   // --- TIMELINE LOGIC END ---

//   const columns = [
//     {
//       title: "",
//       render: () => <img src="/images/pen.png" className="w-5" />,
//     },
//     {
//       title: "ORDER ID",
//       dataIndex: "order_id",
//       key: "order_id",
//       render: (text) => (
//         <span className="font-bold text-[#1e293b]">{text}</span>
//       ),
//     },
//     {
//       title: "CUSTOMER NAME",
//       dataIndex: "customer_name",
//       key: "customer_name",
//     },
//     {
//       title: "BUSINESS NAME",
//       dataIndex: "business_name",
//       key: "business_name",
//     },
//     {
//       title: "DATE",
//       dataIndex: "date",
//       key: "date",
//     },
//     {
//       title: "AMOUNT",
//       dataIndex: "amount",
//       key: "amount",
//     },
//     {
//       title: "STATUS",
//       dataIndex: "status",
//       key: "status",
//     },
//     {
//       title: "",
//       key: "action",
//       render: (
//         record, // 'record' is the data for the current row
//       ) => (
//         <Dropdown
//           menu={{
//             items: [
//               {
//                 key: "1",
//                 label: (
//                   <span className="text-[10px] font-bold py-1 block">
//                     View Order
//                   </span>
//                 ),
//                 onClick: () => {
//                   setselectedOrder(record); // Pass the row data to state
//                   setIsOpen(true); // Open the modal
//                 },
//               },
//             ],
//           }}
//           trigger={["click"]}
//           placement="bottomRight"
//         >
//           <Button className="border-none! bg-transparent! outline-0! p-0! flex items-center justify-center h-8 w-8">
//             <img src="/images/dots.png" className="w-5" />
//           </Button>
//         </Dropdown>
//       ),
//     },
//   ];

//   const data = [
//     {
//       key: "1",
//       order_id: "#0045",
//       customer_name: "Joseph Grace",
//       business_name: "Tech Haven",
//       date: "09/12/2025",
//       amount: "250",
//       status: "in progress",
//     },
//     {
//       key: "2",
//       order_id: "#0086",
//       customer_name: "Lawrance Josh",
//       business_name: "Cafe Delight",
//       date: "09/12/2025",
//       amount: "250",
//       status: "pending",
//     },
//     {
//       key: "3", // Changed to 3 for uniqueness
//       order_id: "#0085",
//       customer_name: "Adams John",
//       business_name: "Love Catering",
//       date: "09/12/2025",
//       amount: "250",
//       status: "complete",
//     },
//   ];

//   const tabVariants = {
//     initial: { opacity: 0, scale: 0.95 },
//     animate: { opacity: 1, scale: 1 },
//     exit: { opacity: 0, scale: 0.95 },
//   };

//   return (
//     <div className="mt-3 space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-gray-900">Order Monitoring</h1>
//         <Button className="p-4.5! bg-[#060853]! rounded-lg border-none! text-white!">
//           <img src="/images/upload.png" alt="export" className="h-7" />
//           Export Report
//         </Button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-[#E2EDFC] p-6 rounded-xl">
//         {statsCard.map((card) => (
//           <div
//             key={card.id}
//             className="bg-white p-5 rounded-xl shadow-sm border border-blue-50"
//           >
//             <div className="flex items-center gap-3 mb-2 border-b border-gray-50 pb-3">
//               <img src={card.img} alt={card.title} className="h-5 w-5" />

//               <h3 className="text-sm font-semibold text-gray-600">
//                 {card.title}
//               </h3>
//             </div>
//             <p className="text-2xl text-center font-bold text-[#060853]">
//               {card.value}
//             </p>
//           </div>
//         ))}
//       </div>

//       <div className="flex items-center justify-between mb-6">
//         {/* LEFT: ANIMATED TABS */}
//         <div className="flex items-center gap-1 bg-[#E2EDFC] p-1 rounded-full border border-[#E0E7FF]/60">
//           {tabs.map((tab) => {
//             const isActive = activeTab === tab;
//             return (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)} 
//                 className={`relative px-4 rounded-lg p-1.5 text-xs font-bold transition-colors z-10 
//                               ${isActive ? "text-white" : "text-gray-500 hover:text-gray-700"}`}
//               >
//                 {tab}
//                 {isActive && (
//                   <motion.div
//                     layoutId="activeTabPill" 
//                     className="absolute inset-0 bg-[#060853] rounded-full z-[-1]"
//                     initial={false}
//                     transition={{
//                       type: "spring",
//                       stiffness: 350,
//                       damping: 30,
//                     }}
//                   />
//                 )}
//               </button>
//             );
//           })}
//         </div>

//         {/* RIGHT: SEARCH & TOOLS */}
//         <div className="flex items-center gap-2 pr-2">
//           <Input
//             prefix={
//               <img src="/images/search.png" alt="search" className="h-7" />
//             }
//             placeholder="Search"
//             className="w-72 rounded-lg bg-gray-50 border border-gray-200 h-10 text-xs"
//           />

//           <Button className="flex items-center justify-center border-gray-200 rounded-lg h-10!  overflow-hidden">
//             <img
//               src="/images/funnel.png"
//               alt="list"
//               className="h-8 w-8 object-contain"
//             />
//           </Button>
//           <Button className="flex items-center justify-center border-gray-200 rounded-lg h-10!  overflow-hidden">
//             <img
//               src="/images/grid.png"
//               alt="list"
//               className="h-8 w-8 object-contain"
//             />
//           </Button>
//           <Button className="flex items-center justify-center border-gray-200 rounded-lg h-10! overflow-hidden">
//             <img
//               src="/images/list.png"
//               alt="list"
//               className="h-8 w-8 object-contain"
//             />
//           </Button>
//         </div>
//       </div>

//       <AnimatePresence mode="wait">
//         <motion.div
//           key={activeTab}
//           initial="initial"
//           animate="animate"
//           exit="exit"
//           variants={tabVariants}
//           transition={{ duration: 0.2 }}
//         >
//           {activeTab === "All" && (
//             <div className="bg-[#f0f5ff] p-8 min-h-screen">
//               <h2 className="text-sm font-bold mb-4 text-[#1e293b]">
//                 Customer List
//               </h2>

//               <div className="bg-white rounded-xl overflow-hidden shadow-sm">
//                 <Table
//                   columns={columns}
//                   dataSource={data}
//                   pagination={false} 
//                   className="custom-table"
//                   size="small"
//                   rowClassName="hover:bg-gray-50 transition-colors"
//                 />
//               </div>

//               {/* FOOTER / PAGINATION */}
//               <div className="flex items-center justify-between px-6 py-4 mt-5">
//                 <span className="text-[11px] text-black">
//                   Show 1 to 4 of 20 results
//                 </span>

//                 <div className="flex items-center gap-1">
//                   <button className="p-2 text-gray-400 hover:text-black">
//                     <img
//                       src="/images/arrow_left.png"
//                       alt="prev"
//                       className="h-4"
//                     />
//                   </button>
//                   <button className="w-8 h-8 flex items-center justify-center rounded bg-[#060853] text-white text-xs font-bold">
//                     1
//                   </button>
//                   <button className="w-8 h-8 flex items-center justify-center rounded bg-white border border-gray-100 text-gray-400 text-xs">
//                     2
//                   </button>
//                   <button className="w-8 h-8 flex items-center justify-center rounded bg-white  border border-gray-100 text-gray-400 text-xs">
//                     3
//                   </button>
//                   <button className="w-8 h-8 flex items-center justify-center rounded bg-white  border border-gray-100 text-gray-400 text-xs">
//                     4
//                   </button>
//                   <span className="px-1 text-gray-400">...</span>
//                   <button className="w-8 h-8 flex items-center justify-center rounded bg-white  border border-gray-100 text-gray-400 text-xs">
//                     10
//                   </button>
//                   <button className="w-8 h-8 flex items-center justify-center rounded bg-white  border border-gray-100 text-gray-400 text-xs">
//                     11
//                   </button>
//                   <button className="p-2 text-gray-400 hover:text-black">
//                     {" "}
//                     <img
//                       src="/images/arrow_right.png"
//                       alt="next"
//                       className="h-4"
//                     />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === "In Progress" && (
//             <div className="flex justify-center items-center flex-col gap-2 text-center ">
//               <img src="/images/no_order.png" className="w-100" />
//               <p className="font-bold mt-1 text-black">No Orders Yet</p>

//               <div className="mt-10">
//                 <Button className="text-white! h-10! px-8 bg-[#060853]! rounded-lg border-none font-medium">
//                   Promote Business
//                 </Button>
//               </div>

//               <div className="w-full max-w-150 mt-10 pt-6 border-t border-gray-100">
//                 <h2 className="text-sm font-bold text-gray-800 mb-4 text-left">
//                   Your Business Link
//                 </h2>

//                 <div className="flex justify-between items-center bg-[#F3F4F6] rounded-xl p-2 pl-4 border border-gray-50">
//                   <span className="text-[13px] text-gray-500 font-medium truncate pr-4">
//                     https://mybusinesswebsite.com
//                   </span>

//                   <button
//                     className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 hover:bg-gray-50 transition-all group"
//                     onClick={() => {
//                       navigator.clipboard.writeText(
//                         "https://mybusinesswebsite.com",
//                       );
//                     }}
//                   >
//                     <img
//                       src="/images/copy.png"
//                       alt="copy"
//                       className="w-4 h-4 opacity-60 group-hover:opacity-100"
//                     />
//                     <span className="text-xs font-bold text-gray-700">
//                       Copy Link
//                     </span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </motion.div>
//       </AnimatePresence>

//       <CustomModal
//         isOpen={isOpen}
//         onClose={() => setIsOpen(false)}
//         title={
//           selectedOrder
//             ? `Order ID: ${selectedOrder.order_id}`
//             : "Order Details"
//         }
//         size="max-w-md"
//       >
//         <div className="space-y-6">
//           {/* Info Card */}
//           <div className="bg-white border border-gray-100 rounded-sm p-4 flex justify-between items-start text-sm">
//             <div className="space-y-2">
//               <p className="text-[#2A2A2A] font-normal">
//                 <span className="font-bold text-gray-900">Customer:</span>{" "}
//                 {selectedOrder?.customer_name}
//               </p>
//               <p className="text-[#2A2A2A] font-normal">
//                 <span className="font-bold text-gray-900">Business:</span>{" "}
//                 {selectedOrder?.business_name}
//               </p>
//             </div>
//             <div className="flex items-center gap-2">
//               <span className="font-bold text-gray-900">Status:</span>
//               <span className="bg-[#FEF3CC] text-[#2A2A2A] px-3 py-1 rounded-sm text-[10px] font-bold uppercase">
//                 {selectedOrder?.status || "Unknown"}
//               </span>
//             </div>
//           </div>

//           {/* Items */}
//           <div>
//             <h3 className="font-bold text-gray-900 mb-3 text-sm">
//               Order Items
//             </h3>
//             <div className="space-y-3 text-xs">
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Laptop</span>
//                 <span className="font-bold text-gray-900">$85,000</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Wireless Mouse</span>
//                 <span className="font-bold text-gray-900">$25,000</span>
//               </div>
//               <div className="flex justify-between border-b border-gray-50">
//                 <span className="text-gray-600">Monitor</span>
//                 <span className="font-bold text-gray-900">$95,000</span>
//               </div>
//               <div className="flex justify-end items-center gap-4">
//                 <span className="text-gray-500 font-medium">Total:</span>
//                 <span className="text-lg font-bold text-gray-900">
//                   $195,000
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Product Images */}
//           <div className="grid grid-cols-3 gap-2">
//             <img
//               src="/images/laptop.png"
//               className="w-full h-24 object-cover rounded-sm"
//               alt="Laptop"
//             />
//             <img
//               src="/images/mouse.png"
//               className="w-full h-24 object-cover rounded-sm"
//               alt="Mouse"
//             />
//             <img
//               src="/images/monitor.png"
//               className="w-full h-24 object-cover rounded-sm"
//               alt="Monitor"
//             />
//           </div>

//           {/* Payment Status */}
//           <div className="text-xs">
//             <span className="font-bold text-gray-900">Payment Status:</span>
//             <span className="text-red-800 font-bold ml-2">Unpaid</span>
//           </div>

//           {/* Order Tracking Timeline */}
//           <div className="border border-gray-100 rounded-sm p-4 bg-white">
//             <div className="space-y-4 relative">
//               <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gray-100" />

//               {/* Step 1 */}
//               <div className="relative pl-7 flex items-center text-[11px]">
//                 <div className={`absolute left-0 w-4 h-4 rounded-full ${getCircleStyle(1)}`}>
//                   {currentStep >= 1 && (
//                     <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
//                     </svg>
//                   )}
//                 </div>
//                 <p>
//                   <span className="font-bold text-gray-900">Order Placed -</span>{" "}
//                   <span className="text-gray-400">{selectedOrder?.date}</span>
//                 </p>
//               </div>

//               {/* Step 2 */}
//               <div className="relative pl-7 flex items-center text-[11px]">
//                 <div className={`absolute left-0 w-4 h-4 rounded-full ${getCircleStyle(2)}`}>
//                   {currentStep >= 2 && (
//                     <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
//                     </svg>
//                   )}
//                 </div>
//                 <p>
//                   <span className={`font-bold ${currentStep >= 2 ? "text-gray-900" : "text-gray-400"}`}>Order -</span>{" "}
//                   <span className="text-gray-400">Accepted</span>
//                 </p>
//               </div>

//               {/* Step 3 */}
//               <div className="relative pl-7 flex items-center text-[11px]">
//                 <div className={`absolute left-0 w-4 h-4 rounded-full ${getCircleStyle(3)}`}>
//                   {currentStep >= 3 && (
//                     <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
//                     </svg>
//                   )}
//                 </div>
//                 <p className={`${currentStep >= 3 ? "text-blue-500" : "text-gray-400"} font-medium`}>
//                   In Progress
//                 </p>
//               </div>

//               {/* Step 4 */}
//               <div className="relative pl-7 flex items-center text-[11px]">
//                 <div className={`absolute left-0 w-4 h-4 rounded-full ${getCircleStyle(4)}`}>
//                   {currentStep >= 4 && (
//                     <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
//                     </svg>
//                   )}
//                 </div>
//                 <p className={`${currentStep >= 4 ? "text-emerald-400" : "text-gray-400"} font-medium`}>
//                   Completed
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           {selectedOrder?.status === "complete" ? (
//             ""
//           ) : (
//             <div className="flex gap-3 pt-4">
//              <Link className="flex-1 text-center bg-[#610C0C] text-white py-3 rounded-sm font-bold text-xs hover:bg-red-950 transition-colors" href={`/admin-dashboard/order-monitoring/${selectedOrder?.key}`}>
//                 Investigate Dispute
             
//              </Link>
//               <button className="flex-1 bg-[#5A6270] text-white py-3 rounded-sm font-bold text-xs hover:bg-[#474e59] transition-colors">
//                 Force Cancel Order
//               </button>
//             </div>
//           )}
//         </div>
//       </CustomModal>
//     </div>
//   );
// };

// export default page;

"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button, Input, Table, Dropdown, DatePicker, Spin, message } from "antd";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import dayjs from "dayjs";
import CustomModal from "@/components/CustomModal";
import { useOrderManagementStore } from "@/store/orderManagementStore";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const tabs = [
  "All",
  "In Progress",
  "Pending",
  "Completed",
  "Cancelled",
  "Accepted",
  "Dispute",
];

// UI tab label -> backend `status` query value
const TAB_TO_STATUS = {
  All: "all",
  "In Progress": "in_progress",
  Pending: "pending",
  Completed: "completed",
  Cancelled: "cancelled",
  Accepted: "accepted",
  Dispute: "dispute",
};

const STATUS_BADGE = {
  pending: { bg: "#FEF3CC", text: "#8A6D1E", label: "Pending" },
  accepted: { bg: "#DCFCE7", text: "#166534", label: "Accepted" },
  in_progress: { bg: "#DBEAFE", text: "#1D4ED8", label: "In Progress" },
  partially_completed: { bg: "#DBEAFE", text: "#1D4ED8", label: "In Progress" },
  completed: { bg: "#DCFCE7", text: "#15803D", label: "Complete" },
  cancelled: { bg: "#FEE2E2", text: "#B91C1C", label: "Cancelled" },
};

const buildPageNumbers = (current, totalPages) => {
  if (!totalPages || totalPages <= 1) return [1];

  const pages = new Set([1, totalPages, current]);
  for (let i = current - 1; i <= current + 1; i++) {
    if (i > 0 && i <= totalPages) pages.add(i);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const withEllipsis = [];
  sorted.forEach((p, idx) => {
    if (idx > 0 && p - sorted[idx - 1] > 1) withEllipsis.push("...");
    withEllipsis.push(p);
  });

  return withEllipsis;
};

const page = () => {
  const {
    orders,
    stats,
    pagination,
    ordersLoading,
    getOrders,

    selectedOrder,
    orderLoading,
    getOrderById,
    clearSelectedOrder,

    orderError,
    
    forceCancelling,
    forceCancelOrder,
  } = useOrderManagementStore();

  const [activeTab, setActiveTab] = useState("All");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [forceCancelOpen, setForceCancelOpen] = useState(false);
  const [forceCancelReason, setForceCancelReason] = useState("");

  const searchDebounce = useRef(null);

  const statsCard = [
    { id: 1, title: "Pending Orders", value: stats?.pendingOrders ?? "—", img: "/images/yellow_cube.png" },
    { id: 2, title: "Accepted Orders", value: stats?.acceptedOrders ?? "—", img: "/images/green_cube.png" },
    { id: 3, title: "In Progress", value: stats?.inProgressOrders ?? "—", img: "/images/cube.png" },
    { id: 4, title: "Completed Orders", value: stats?.completedOrders ?? "—", img: "/images/cube.png" },
    { id: 5, title: "Cancelled Orders", value: stats?.cancelledOrders ?? "—", img: "/images/red_cube.png" },
  ];

  /* ---------------- DEBOUNCED SEARCH ---------------- */
  useEffect(() => {
    if (searchDebounce.current) clearTimeout(searchDebounce.current);
    searchDebounce.current = setTimeout(() => {
      setSearch(searchInput);
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(searchDebounce.current);
  }, [searchInput]);

  /* ---------------- FETCH ORDERS ---------------- */
  useEffect(() => {
    const [startDate, endDate] = dateRange || [];

    getOrders({
      page: currentPage,
      limit: pageSize,
      search,
      status: TAB_TO_STATUS[activeTab],
      startDate: startDate ? startDate.format("YYYY-MM-DD") : undefined,
      endDate: endDate ? endDate.format("YYYY-MM-DD") : undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, search, dateRange, currentPage]);

  const openViewModal = (record) => {
    setSelectedRow(record);
    setIsOpen(true);
    getOrderById(record._id);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedRow(null);
    clearSelectedOrder();
  };

  const handleForceCancel = async () => {
    if (!forceCancelReason.trim()) {
      message.error("Please provide a cancellation reason.");
      return;
    }

    const res = await forceCancelOrder(selectedOrder._id, forceCancelReason.trim());

    if (res?.success) {
      message.success(res.message);
      setForceCancelOpen(false);
      setForceCancelReason("");
      closeModal();
    } else {
      message.error(res?.message);
    }
  };

  const columns = [
    { title: "", render: () => <img src="/images/pen.png" className="w-5" /> },
    {
      title: "ORDER ID",
      dataIndex: "orderNumber",
      key: "orderNumber",
      render: (text) => <span className="font-bold text-[#1e293b]">#{text}</span>,
    },
    {
      title: "CUSTOMER NAME",
      key: "customer_name",
      render: (record) => record.customer?.name || "—",
    },
    {
      title: "BUSINESS NAME",
      key: "business_name",
      render: (record) => record.business?.businessName || "—",
    },
    {
      title: "DATE",
      dataIndex: "createdAt",
      key: "date",
      render: (date) => (date ? dayjs(date).format("MM/DD/YYYY") : "—"),
    },
    {
      title: "AMOUNT",
      dataIndex: "totalOriginalPrice",
      key: "amount",
      render: (val) => `$${val ?? 0}`,
    },
    {
      title: "STATUS",
      key: "status",
      render: (record) => {
        const badge = STATUS_BADGE[record.orderStatus] || STATUS_BADGE.pending;
        return (
          <div className="flex items-center gap-2">
            <span
              className="px-2 py-1 rounded-sm text-[10px] font-bold capitalize"
              style={{ backgroundColor: badge.bg, color: badge.text }}
            >
              {badge.label}
            </span>
            {record.hasActiveDispute && (
              <span className="px-2 py-1 rounded-sm text-[10px] font-bold bg-[#FEE2E2] text-[#B91C1C]">
                Dispute
              </span>
            )}
          </div>
        );
      },
    },
    {
      title: "",
      key: "action",
      render: (record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "1",
                label: <span className="text-[10px] font-bold py-1 block">View Order</span>,
                onClick: () => openViewModal(record),
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

  const tableData = orders.map((o) => ({ ...o, key: o._id }));
  const pageNumbers = buildPageNumbers(pagination?.page || 1, pagination?.totalPages || 1);

  const tabVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  const paymentStatusDisplay = {
    paid: { label: "Paid", color: "text-[#10B981]" },
    pending: { label: "Unpaid", color: "text-red-800" },
    failed: { label: "Failed", color: "text-red-800" },
    refunded: { label: "Refunded", color: "text-gray-500" },
  };

  return (
    <div className="mt-3 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Order Monitoring</h1>
        <div className="flex gap-4">
          <RangePicker
            className="rounded-lg border-gray-200"
            onChange={(dates) => {
              setDateRange(dates);
              setCurrentPage(1);
            }}
          />
          <Button className="p-4.5! bg-[#060853]! rounded-lg border-none! text-white!">
            <img src="/images/upload.png" alt="export" className="h-7" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-[#E2EDFC] p-6 rounded-xl">
        {statsCard.map((card) => (
          <div key={card.id} className="bg-white p-5 rounded-xl shadow-sm border border-blue-50">
            <div className="flex items-center gap-3 mb-2 border-b border-gray-50 pb-3">
              <img src={card.img} alt={card.title} className="h-5 w-5" />
              <h3 className="text-sm font-semibold text-gray-600">{card.title}</h3>
            </div>
            <p className="text-2xl text-center font-bold text-[#060853]">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-1 bg-[#E2EDFC] p-1 rounded-full border border-[#E0E7FF]/60">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1);
                }}
                className={`relative px-4 rounded-lg p-1.5 text-xs font-bold transition-colors z-10 
                              ${isActive ? "text-white" : "text-gray-500 hover:text-gray-700"}`}
              >
                {tab}
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-[#060853] rounded-full z-[-1]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 pr-2">
          <Input
            prefix={<img src="/images/search.png" alt="search" className="h-7" />}
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-72 rounded-lg bg-gray-50 border border-gray-200 h-10 text-xs"
          />

          <Button className="flex items-center justify-center border-gray-200 rounded-lg h-10! overflow-hidden">
            <img src="/images/funnel.png" alt="list" className="h-8 w-8 object-contain" />
          </Button>
          <Button className="flex items-center justify-center border-gray-200 rounded-lg h-10! overflow-hidden">
            <img src="/images/grid.png" alt="list" className="h-8 w-8 object-contain" />
          </Button>
          <Button className="flex items-center justify-center border-gray-200 rounded-lg h-10! overflow-hidden">
            <img src="/images/list.png" alt="list" className="h-8 w-8 object-contain" />
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
          <div className="bg-[#f0f5ff] p-8 min-h-screen">
            <h2 className="text-sm font-bold mb-4 text-[#1e293b]">Order List</h2>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <Table
                columns={columns}
                dataSource={tableData}
                pagination={false}
                loading={ordersLoading}
                className="custom-table"
                size="small"
                rowClassName="hover:bg-gray-50 transition-colors"
                locale={{ emptyText: ordersLoading ? " " : "No orders found" }}
              />
            </div>

            <div className="flex items-center justify-between px-6 py-4 mt-5">
              <span className="text-[11px] text-black">
                {pagination
                  ? `Showing ${(pagination.page - 1) * pagination.limit + 1} to ${Math.min(
                      pagination.page * pagination.limit,
                      pagination.total,
                    )} of ${pagination.total} results`
                  : ""}
              </span>

              <div className="flex items-center gap-1">
                <button
                  className="p-2 text-gray-400 hover:text-black disabled:opacity-30"
                  disabled={!pagination?.hasPreviousPage}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  <img src="/images/arrow_left.png" alt="prev" className="h-4" />
                </button>

                {pageNumbers.map((p, idx) =>
                  p === "..." ? (
                    <span key={`ellipsis-${idx}`} className="px-1 text-gray-400">
                      ...
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p)}
                      className={`w-8 h-8 flex items-center justify-center rounded text-xs font-bold ${
                        p === (pagination?.page || 1)
                          ? "bg-[#060853] text-white"
                          : "bg-white border border-gray-100 text-gray-400"
                      }`}
                    >
                      {p}
                    </button>
                  ),
                )}

                <button
                  className="p-2 text-gray-400 hover:text-black disabled:opacity-30"
                  disabled={!pagination?.hasNextPage}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  <img src="/images/arrow_right.png" alt="next" className="h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* VIEW ORDER MODAL */}
      <CustomModal
        isOpen={isOpen}
        onClose={closeModal}
        title={selectedRow ? `Order ID: #${selectedRow.orderNumber}` : "Order Details"}
        size="max-w-md"
      >
       {orderLoading ? (
          <div className="flex justify-center py-16">
            <Spin />
          </div>
        ) : !selectedOrder ? (
          <div className="text-center py-16 text-sm text-red-600">
            {orderError || "Failed to load order details."}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Info Card */}
            <div className="bg-white border border-gray-100 rounded-sm p-4 flex justify-between items-start text-sm">
              <div className="space-y-2">
                <p className="text-[#2A2A2A] font-normal">
                  <span className="font-bold text-gray-900">Customer:</span>{" "}
                  {selectedOrder.customer?.name}
                </p>
                <p className="text-[#2A2A2A] font-normal">
                  <span className="font-bold text-gray-900">Business:</span>{" "}
                  {selectedOrder.business?.businessName}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900">Status:</span>
                <span className="bg-[#FEF3CC] text-[#2A2A2A] px-3 py-1 rounded-sm text-[10px] font-bold uppercase">
                  {(STATUS_BADGE[selectedOrder.orderStatus] || {}).label || selectedOrder.orderStatus}
                </span>
              </div>
            </div>

            {/* Items */}
            <div>
              <h3 className="font-bold text-gray-900 mb-3 text-sm">Order Items</h3>
              <div className="space-y-3 text-xs">
                {selectedOrder.items?.map((item) => (
                  <div key={item._id} className="flex justify-between border-b border-gray-50 pb-1">
                    <span className="text-gray-600">
                      {item.title} {item.quantity > 1 ? `x${item.quantity}` : ""}
                    </span>
                    <span className="font-bold text-gray-900">${item.total}</span>
                  </div>
                ))}
                <div className="flex justify-end items-center gap-4 pt-2">
                  <span className="text-gray-500 font-medium">Total:</span>
                  <span className="text-lg font-bold text-gray-900">
                    ${selectedOrder.totalOriginalPrice}
                  </span>
                </div>
              </div>
            </div>

            {/* Product Images */}
            {selectedOrder.items?.some((i) => i.listing?.images?.[0]?.url) && (
              <div className="grid grid-cols-3 gap-2">
                {selectedOrder.items
                  .filter((i) => i.listing?.images?.[0]?.url)
                  .slice(0, 3)
                  .map((item) => (
                    <img
                      key={item._id}
                      src={item.listing.images[0].url}
                      className="w-full h-24 object-cover rounded-sm"
                      alt={item.title}
                    />
                  ))}
              </div>
            )}

            {/* Payment Status */}
            <div className="text-xs">
              <span className="font-bold text-gray-900">Payment Status:</span>
              <span
                className={`font-bold ml-2 ${
                  (paymentStatusDisplay[selectedOrder.paymentStatus] || {}).color || "text-gray-500"
                }`}
              >
                {(paymentStatusDisplay[selectedOrder.paymentStatus] || {}).label ||
                  selectedOrder.paymentStatus}
              </span>
            </div>

            {/* Order Tracking Timeline */}
            <div className="border border-gray-100 rounded-sm p-4 bg-white">
              <div className="space-y-4 relative">
                <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gray-100" />

                {selectedOrder.stages?.map((stage) => (
                  <div key={stage.key} className="relative pl-7 flex items-center text-[11px]">
                    <div
                      className={`absolute left-0 w-4 h-4 rounded-full flex items-center justify-center ${
                        stage.completed ? "bg-[#10B981]" : "bg-gray-200 border-4 border-white"
                      }`}
                    >
                      {stage.completed && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <p className={stage.completed ? "font-bold text-gray-900" : "text-gray-400 font-medium"}>
                      {stage.label}
                      {stage.at && (
                        <span className="text-gray-400 font-normal ml-1">
                          - {dayjs(stage.at).format("MM/DD/YYYY")}
                        </span>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            {selectedOrder.orderStatus !== "completed" && (
              <div className="flex gap-3 pt-4">
                <Link
                  className="flex-1 text-center bg-[#610C0C] text-white py-3 rounded-sm font-bold text-xs hover:bg-red-950 transition-colors"
                  href={`/admin-dashboard/order-monitoring/${selectedOrder._id}`}
                >
                  Investigate Dispute
                </Link>
                {selectedOrder.canForceCancel && (
                  <button
                    onClick={() => setForceCancelOpen(true)}
                    className="flex-1 bg-[#5A6270] text-white py-3 rounded-sm font-bold text-xs hover:bg-[#474e59] transition-colors"
                  >
                    Force Cancel Order
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </CustomModal>

      {/* FORCE CANCEL REASON MODAL */}
      <CustomModal
        isOpen={forceCancelOpen}
        onClose={() => setForceCancelOpen(false)}
        title="Force Cancel Order"
        size="max-w-md"
      >
        <p className="text-sm text-gray-600 mb-3">
          This will cancel the order and refund the customer in full. Please provide a reason.
        </p>
        <TextArea
          value={forceCancelReason}
          onChange={(e) => setForceCancelReason(e.target.value)}
          rows={3}
          placeholder="Reason for force-cancelling this order..."
        />
        <div className="flex justify-end items-center mt-5 gap-3">
          <Button onClick={() => setForceCancelOpen(false)} className="bg-transparent! rounded-sm! border-gray-300!">
            Cancel
          </Button>
          <Button
            onClick={handleForceCancel}
            loading={forceCancelling}
            className="bg-[#610C0C]! rounded-sm! text-white! border-none!"
          >
            Force Cancel & Refund
          </Button>
        </div>
      </CustomModal>
    </div>
  );
};

export default page;