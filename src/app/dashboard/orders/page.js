

// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { Input, Button, Table, Dropdown, Spin, message } from "antd";
// import { motion, AnimatePresence } from "motion/react";
// import dayjs from "dayjs";
// import CustomModal from "@/components/CustomModal";
// import { useBusinessOrderStore } from "@/store/businessOrderStore";

// const { TextArea } = Input;

// const tabs = ["All", "In Progress", "Pending", "Completed", "Cancelled", "Accepted"];

// // UI tab label -> backend `status` query value
// const TAB_TO_STATUS = {
//   All: "all",
//   "In Progress": "in_progress",
//   Pending: "pending",
//   Completed: "completed",
//   Cancelled: "cancelled",
//   Accepted: "accepted",
// };

// const STATUS_COLOR = {
//   pending: "text-yellow-500",
//   accepted: "text-orange-400",
//   in_progress: "text-blue-400",
//   partially_completed: "text-blue-400",
//   completed: "text-green-500",
//   cancelled: "text-red-400",
// };

// const STATUS_LABEL = {
//   pending: "Pending",
//   accepted: "Accepted",
//   in_progress: "In Progress",
//   partially_completed: "In Progress",
//   completed: "Completed",
//   cancelled: "Cancelled",
// };

// // Mirrors the backend's computeAggregateItemStatus bucket logic, so the
// // View Order modal (which gets raw `items` from getOrderById, already
// // scoped to this business by the backend, but no precomputed `myStatus`
// // field) shows the same status a business would see in the table.
// const computeMyStatus = (items) => {
//   if (!items || items.length === 0) return "cancelled";

//   const statuses = items.map((i) => i.itemStatus);
//   const isDone = (s) => s === "completed" || s === "delivered";
//   const isCancelled = (s) => s === "cancelled" || s === "refunded";
//   const isActive = (s) => ["in_progress", "ready_for_pickup", "shipped", "dispute"].includes(s);

//   if (statuses.every(isDone)) return "completed";
//   if (statuses.every(isCancelled)) return "cancelled";

//   const anyDone = statuses.some(isDone);
//   const anyUndone = statuses.some((s) => !isDone(s));
//   if (anyDone && anyUndone) return "partially_completed";

//   if (statuses.some(isActive)) return "in_progress";
//   if (statuses.some((s) => s === "processing")) return "accepted";

//   return "pending";
// };

// const buildPageNumbers = (current, totalPages) => {
//   if (!totalPages || totalPages <= 1) return [1];
//   const pages = new Set([1, totalPages, current]);
//   for (let i = current - 1; i <= current + 1; i++) {
//     if (i > 0 && i <= totalPages) pages.add(i);
//   }
//   const sorted = [...pages].sort((a, b) => a - b);
//   const withEllipsis = [];
//   sorted.forEach((p, idx) => {
//     if (idx > 0 && p - sorted[idx - 1] > 1) withEllipsis.push("...");
//     withEllipsis.push(p);
//   });
//   return withEllipsis;
// };

// export default function OrdersPage() {
//   const {
//     orders,
//     stats,
//     business,
//     pagination,
//     ordersLoading,
//     getOrders,

//     selectedOrder,
//     orderLoading,
//     getOrderById,
//     clearSelectedOrder,

//     actionLoading,
//     acceptOrder,
//     rejectOrder,
//   } = useBusinessOrderStore();

//   const [activeTab, setActiveTab] = useState("All");
//   const [searchInput, setSearchInput] = useState("");
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 10;

//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedRow, setSelectedRow] = useState(null);

//   const [rejectOpen, setRejectOpen] = useState(false);
//   const [rejectReason, setRejectReason] = useState("");

//   const searchDebounce = useRef(null);

//   const statsCard = [
//     { id: 1, title: "Total Orders", value: stats?.totalOrders ?? "0" },
//     { id: 2, title: "Accepted Orders", value: stats?.acceptedOrders ?? "0" },
//     { id: 3, title: "Orders in Progress", value: stats?.inProgressOrders ?? "0" },
//     { id: 4, title: "Completed Orders", value: stats?.completedOrders ?? "0" },
//   ];

//   /* ---------------- DEBOUNCED SEARCH ---------------- */
//   useEffect(() => {
//     if (searchDebounce.current) clearTimeout(searchDebounce.current);
//     searchDebounce.current = setTimeout(() => {
//       setSearch(searchInput);
//       setCurrentPage(1);
//     }, 400);
//     return () => clearTimeout(searchDebounce.current);
//   }, [searchInput]);

//   /* ---------------- FETCH ORDERS ---------------- */
//   useEffect(() => {
//     getOrders({
//       page: currentPage,
//       limit: pageSize,
//       search,
//       status: TAB_TO_STATUS[activeTab],
//     });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [activeTab, search, currentPage]);

//   const openViewModal = (record) => {
//     setSelectedRow(record);
//     setIsOpen(true);
//     getOrderById(record._id);
//   };

//   const closeModal = () => {
//     setIsOpen(false);
//     setSelectedRow(null);
//     clearSelectedOrder();
//   };

//   const handleAccept = async (record) => {
//     const res = await acceptOrder(record._id);
//     if (res?.success) {
//       message.success(res.message);
//     } else {
//       message.error(res?.message);
//     }
//   };

//   const openRejectModal = (record) => {
//     setSelectedRow(record);
//     setRejectReason("");
//     setRejectOpen(true);
//   };

//   const handleReject = async () => {
//     if (!rejectReason.trim()) {
//       message.error("Please provide a reason for rejecting this order.");
//       return;
//     }

//     const res = await rejectOrder(selectedRow._id, rejectReason.trim());

//     if (res?.success) {
//       message.success(res.message);
//       setRejectOpen(false);
//     } else {
//       message.error(res?.message);
//     }
//   };

//   const businessLink = business?.slug
//     ? `${process.env.NEXT_PUBLIC_SITE_URL || ""}/business/${business.slug}`
//     : "";

//   const columns = [
//     { title: "", render: () => <img src="/images/pen.png" className="w-5" /> },
//     {
//       title: "ORDER ID",
//       dataIndex: "orderNumber",
//       key: "orderNumber",
//       render: (text, record) => (
//         <span className="font-bold text-[#1e293b] flex items-center gap-2">
//           #{text}
//           {record.isMultiVendor && (
//             <span
//               title="This order includes items from other businesses too — you're only seeing your own."
//               className="text-[9px] font-bold bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-sm"
//             >
//               Multi-vendor
//             </span>
//           )}
//         </span>
//       ),
//     },
//     {
//       title: "CUSTOMER INFO",
//       key: "customer",
//       render: (record) => record.customer?.name || "—",
//     },
//     {
//       // Fixed: previously only showed items?.[0]?.title, silently
//       // dropping every other item in the order. `record.items` is already
//       // scoped to just this business's items by the backend, so we can
//       // safely list all of them here.
//       title: "SERVICE TYPE",
//       key: "service",
//       render: (record) => {
//         const items = record.items || [];
//         if (items.length === 0) return "—";
//         if (items.length === 1) return items[0].title;

//         return (
//           <div className="flex flex-col gap-0.5">
//             {items.map((item) => (
//               <span key={item._id}>
//                 {item.title} {item.quantity > 1 ? `x${item.quantity}` : ""}
//               </span>
//             ))}
//           </div>
//         );
//       },
//     },
//     {
//       title: "DATE",
//       dataIndex: "createdAt",
//       key: "date",
//       render: (date) => (date ? dayjs(date).format("MM/DD/YYYY") : "—"),
//     },
//     {
//       // Reflects this business's own share of the order, not the whole
//       // cart total (which may include other businesses' items).
//       title: "AMOUNT",
//       key: "amount",
//       render: (record) => `$${record.myItemsTotal ?? record.totalOriginalPrice ?? 0}`,
//     },
//     {
//       title: "STATUS",
//       key: "status",
//       render: (record) => (
//         <span className={`font-medium ${STATUS_COLOR[record.myStatus] || "text-gray-400"}`}>
//           {STATUS_LABEL[record.myStatus] || record.myStatus}
//         </span>
//       ),
//     },
//     {
//       title: "",
//       key: "action",
//       render: (record) => {
//         const menuItems = [
//           {
//             key: "1",
//             label: <span className="text-[10px] font-bold py-1 block">Order Details</span>,
//             onClick: () => openViewModal(record),
//           },
//         ];

//         if (record.myStatus === "pending") {
//           menuItems.push(
//             {
//               key: "2",
//               label: <span className="text-[10px] font-bold py-1 block">Accept Order</span>,
//               onClick: () => handleAccept(record),
//             },
//             {
//               key: "3",
//               label: <span className="text-[10px] font-bold py-1 block">Reject Order</span>,
//               onClick: () => openRejectModal(record),
//             },
//           );
//         }

//         return (
//           <Dropdown menu={{ items: menuItems }} trigger={["click"]} placement="bottomRight">
//             <Button className="border-none! bg-transparent! outline-0! p-0! flex items-center justify-center h-8 w-8">
//               <img src="/images/dots.png" className="w-5" />
//             </Button>
//           </Dropdown>
//         );
//       },
//     },
//   ];

//   const tableData = orders.map((o) => ({ ...o, key: o._id }));
//   const pageNumbers = buildPageNumbers(pagination?.page || 1, pagination?.totalPages || 1);

//   const tabVariants = {
//     initial: { opacity: 0, scale: 0.95 },
//     animate: { opacity: 1, scale: 1 },
//     exit: { opacity: 0, scale: 0.95 },
//   };

//   // The View modal's `selectedOrder` comes from getOrderById, which
//   // returns raw items (already scoped to this business) but no
//   // precomputed myStatus — so we derive it the same way the table does.
//   const selectedOrderStatus = selectedOrder ? computeMyStatus(selectedOrder.items) : null;

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center mt-5">
//         <div>
//           <h1 className="text-xl font-bold text-gray-900">Order Management</h1>
//           <p className="text-xs text-[#4A4A4A]">View and manage your customer orders here.</p>
//         </div>
//         <Button className="p-4.5! bg-[#060853]! rounded-lg border-none! text-white!">
//           <img src="/images/upload.png" alt="export" className="h-7" />
//           Export Report
//         </Button>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-[#E2EDFC] p-4 rounded-sm">
//         {statsCard.map((card) => (
//           <div key={card.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//             <div className="flex items-center border-b border-gray-100 pb-2">
//               <img src="/images/cube.png" alt="cube" className="h-8" />
//               <h3 className="font-bold text-gray-900">{card.title}</h3>
//             </div>
//             <p className="text-2xl font-bold text-[#060853]">{card.value}</p>
//           </div>
//         ))}
//       </div>

//       <div className="min-h-screen">
//         {/* HEADER SECTION (Filter Bar) */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-1 bg-[#E2EDFC] p-1 rounded-full border border-[#E0E7FF]/60">
//             {tabs.map((tab) => {
//               const isActive = activeTab === tab;
//               return (
//                 <button
//                   key={tab}
//                   onClick={() => {
//                     setActiveTab(tab);
//                     setCurrentPage(1);
//                   }}
//                   className={`relative px-4 rounded-lg p-1.5 text-xs font-bold transition-colors z-10 
//                   ${isActive ? "text-white" : "text-gray-500 hover:text-gray-700"}`}
//                 >
//                   {tab}
//                   {isActive && (
//                     <motion.div
//                       layoutId="activeTabPill"
//                       className="absolute inset-0 bg-[#060853] rounded-full z-[-1]"
//                       initial={false}
//                       transition={{ type: "spring", stiffness: 350, damping: 30 }}
//                     />
//                   )}
//                 </button>
//               );
//             })}
//           </div>

//           <div className="flex items-center gap-2 pr-2">
//             <Input
//               prefix={<img src="/images/search.png" alt="search" className="h-7" />}
//               placeholder="Search"
//               value={searchInput}
//               onChange={(e) => setSearchInput(e.target.value)}
//               className="w-72 rounded-lg bg-gray-50 border border-gray-200 h-10 text-xs"
//             />

//             <Button className="flex items-center justify-center border-gray-200 rounded-lg h-10! overflow-hidden">
//               <img src="/images/funnel.png" alt="list" className="h-8 w-8 object-contain" />
//             </Button>
//             <Button className="flex items-center justify-center border-gray-200 rounded-lg h-10! overflow-hidden">
//               <img src="/images/grid.png" alt="list" className="h-8 w-8 object-contain" />
//             </Button>
//             <Button className="flex items-center justify-center border-gray-200 rounded-lg h-10! overflow-hidden">
//               <img src="/images/list.png" alt="list" className="h-8 w-8 object-contain" />
//             </Button>
//           </div>
//         </div>

//         <AnimatePresence mode="wait">
//           <motion.div
//             key={activeTab}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             variants={tabVariants}
//             transition={{ duration: 0.2 }}
//           >
//             {ordersLoading ? (
//               <div className="flex justify-center py-24">
//                 <Spin size="large" />
//               </div>
//             ) : tableData.length === 0 ? (
//               /* ---------------- EMPTY STATE (reused for any tab with no results) ---------------- */
//               <div className="flex justify-center items-center flex-col gap-2 text-center">
//                 <img src="/images/no_order.png" className="w-100" />
//                 <p className="font-bold mt-1 text-black">No Orders Yet</p>

//                 <div className="mt-10">
//                   <Button className="text-white! h-10! px-8 bg-[#060853]! rounded-lg border-none font-medium">
//                     Promote Business
//                   </Button>
//                 </div>

//                 {businessLink && (
//                   <div className="w-full max-w-150 mt-10 pt-6 border-t border-gray-100">
//                     <h2 className="text-sm font-bold text-gray-800 mb-4 text-left">
//                       Your Business Link
//                     </h2>

//                     <div className="flex justify-between items-center bg-[#F3F4F6] rounded-xl p-2 pl-4 border border-gray-50">
//                       <span className="text-[13px] text-gray-500 font-medium truncate pr-4">
//                         {businessLink}
//                       </span>

//                       <button
//                         className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 hover:bg-gray-50 transition-all group"
//                         onClick={() => {
//                           navigator.clipboard.writeText(businessLink);
//                           message.success("Link copied!");
//                         }}
//                       >
//                         <img
//                           src="/images/copy.png"
//                           alt="copy"
//                           className="w-4 h-4 opacity-60 group-hover:opacity-100"
//                         />
//                         <span className="text-xs font-bold text-gray-700">Copy Link</span>
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               /* ---------------- ORDER LIST TABLE (same for every tab) ---------------- */
//               <div className="bg-[#f0f5ff] p-8 min-h-screen">
//                 <h2 className="text-sm font-bold mb-4 text-[#1e293b]">Order List</h2>

//                 <div className="bg-white rounded-xl overflow-hidden shadow-sm">
//                   <Table
//                     columns={columns}
//                     dataSource={tableData}
//                     pagination={false}
//                     className="custom-table"
//                     size="small"
//                     rowClassName="hover:bg-gray-50 transition-colors"
//                   />
//                 </div>

//                 <div className="flex items-center justify-between px-6 py-4 mt-5">
//                   <span className="text-[11px] text-black">
//                     {pagination
//                       ? `Showing ${(pagination.page - 1) * pagination.limit + 1} to ${Math.min(
//                           pagination.page * pagination.limit,
//                           pagination.total,
//                         )} of ${pagination.total} results`
//                       : ""}
//                   </span>

//                   <div className="flex items-center gap-1">
//                     <button
//                       className="p-2 text-gray-400 hover:text-black disabled:opacity-30"
//                       disabled={!pagination?.hasPreviousPage}
//                       onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//                     >
//                       <img src="/images/arrow_left.png" alt="prev" className="h-4" />
//                     </button>

//                     {pageNumbers.map((p, idx) =>
//                       p === "..." ? (
//                         <span key={`ellipsis-${idx}`} className="px-1 text-gray-400">
//                           ...
//                         </span>
//                       ) : (
//                         <button
//                           key={p}
//                           onClick={() => setCurrentPage(p)}
//                           className={`w-8 h-8 flex items-center justify-center rounded text-xs font-bold ${
//                             p === (pagination?.page || 1)
//                               ? "bg-[#060853] text-white"
//                               : "bg-white border border-gray-100 text-gray-400"
//                           }`}
//                         >
//                           {p}
//                         </button>
//                       ),
//                     )}

//                     <button
//                       className="p-2 text-gray-400 hover:text-black disabled:opacity-30"
//                       disabled={!pagination?.hasNextPage}
//                       onClick={() => setCurrentPage((p) => p + 1)}
//                     >
//                       <img src="/images/arrow_right.png" alt="next" className="h-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       {/* VIEW ORDER MODAL */}
//       <CustomModal
//         isOpen={isOpen}
//         onClose={closeModal}
//         title={selectedRow ? `Order ID: #${selectedRow.orderNumber}` : "Order Details"}
//         size="max-w-md"
//       >
//         {orderLoading || !selectedOrder ? (
//           <div className="flex justify-center py-16">
//             <Spin />
//           </div>
//         ) : (
//           <div className="space-y-5 text-xs">
//             {selectedOrder.businesses?.length > 1 && (
//               <div className="bg-blue-50 text-blue-700 text-[11px] font-medium rounded-sm p-2">
//                 This order includes items from other businesses too — you're only seeing and
//                 managing your own items below.
//               </div>
//             )}

//             <div className="bg-white border border-gray-100 rounded-sm p-4 space-y-2">
//               <p>
//                 <span className="font-bold text-gray-900">Customer:</span>{" "}
//                 {selectedOrder.customer?.name}
//               </p>
//               <p>
//                 <span className="font-bold text-gray-900">Email:</span>{" "}
//                 {selectedOrder.customer?.email}
//               </p>
//               <p>
//                 <span className="font-bold text-gray-900">Status:</span>{" "}
//                 <span className={STATUS_COLOR[selectedOrderStatus]}>
//                   {STATUS_LABEL[selectedOrderStatus] || selectedOrderStatus}
//                 </span>
//               </p>
//             </div>

//             <div>
//               <h3 className="font-bold text-gray-900 mb-2 text-sm">Order Items</h3>
//               <div className="space-y-2">
//                 {selectedOrder.items?.map((item) => (
//                   <div key={item._id} className="flex justify-between border-b border-gray-50 pb-1">
//                     <span className="text-gray-600">
//                       {item.title} {item.quantity > 1 ? `x${item.quantity}` : ""}
//                     </span>
//                     <span className="font-bold text-gray-900">${item.total}</span>
//                   </div>
//                 ))}
//                 <div className="flex justify-end items-center gap-4 pt-2">
//                   <span className="text-gray-500 font-medium">Your Total:</span>
//                   <span className="text-base font-bold text-gray-900">
//                     $
//                     {selectedOrder.items?.reduce((sum, item) => sum + (item.total || 0), 0) ?? 0}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <p>
//               <span className="font-bold text-gray-900">Payment Status:</span>{" "}
//               <span className="capitalize">{selectedOrder.paymentStatus}</span>
//             </p>

//             {selectedOrderStatus === "pending" && (
//               <div className="flex gap-3 pt-4">
//                 <button
//                   onClick={() => handleAccept(selectedOrder)}
//                   className="flex-1 bg-[#060853] text-white py-3 rounded-sm font-bold text-xs hover:bg-[#0a0d6e] transition-colors"
//                 >
//                   Accept Order
//                 </button>
//                 <button
//                   onClick={() => {
//                     closeModal();
//                     openRejectModal(selectedOrder);
//                   }}
//                   className="flex-1 bg-[#610C0C] text-white py-3 rounded-sm font-bold text-xs hover:bg-red-950 transition-colors"
//                 >
//                   Reject Order
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </CustomModal>

//       {/* REJECT ORDER MODAL */}
//       <CustomModal
//         isOpen={rejectOpen}
//         onClose={() => setRejectOpen(false)}
//         title="Reject Order"
//         size="max-w-md"
//       >
//         <p className="text-sm text-gray-600 mb-3">
//           This will cancel your items on this order and refund the customer for your portion.
//           Please tell us why.
//         </p>
//         <TextArea
//           value={rejectReason}
//           onChange={(e) => setRejectReason(e.target.value)}
//           rows={3}
//           placeholder="e.g. Out of stock, unable to fulfill in time..."
//         />
//         <div className="flex justify-end items-center mt-5 gap-3">
//           <Button onClick={() => setRejectOpen(false)} className="bg-transparent! rounded-sm! border-gray-300!">
//             Cancel
//           </Button>
//           <Button
//             onClick={handleReject}
//             loading={actionLoading}
//             className="bg-[#610C0C]! rounded-sm! text-white! border-none!"
//           >
//             Reject & Refund
//           </Button>
//         </div>
//       </CustomModal>
//     </div>
//   );
// }


"use client";

import React, { useState, useEffect, useRef } from "react";
import { Input, Button, Table, Dropdown, Select, Spin, message } from "antd";
import { motion, AnimatePresence } from "motion/react";
import dayjs from "dayjs";
import CustomModal from "@/components/CustomModal";
import { useBusinessOrderStore } from "@/store/businessOrderStore";

const { TextArea } = Input;

const ITEM_STATUS_LABEL = {
  pending: "Pending",
  processing: "Accepted — Not Started",
  in_progress: "In Progress",
  ready_for_pickup: "Ready for Pickup",
  shipped: "Shipped",
  delivered: "Delivered",
  completed: "Completed",
  cancelled: "Cancelled",
  dispute: "Under Dispute",
  refunded: "Refunded",
};

const TERMINAL_ITEM_STATUSES = ["completed", "delivered", "cancelled", "refunded"];

// Suggests sensible next steps based on item type/fulfillment, rather than
// exposing the full raw status enum regardless of context (e.g. a service
// booking should never be offered "shipped").
const nextStatusOptions = (item) => {
  if (TERMINAL_ITEM_STATUSES.includes(item.itemStatus)) return [];

  if (item.type === "service") {
    return ["in_progress", "completed", "cancelled"];
  }

  if (item.type === "digital_product") {
    return ["delivered", "completed", "cancelled"];
  }

  // physical_product
  if (item.fulfillmentType === "seller_location") {
    return ["ready_for_pickup", "completed", "cancelled"];
  }

  return ["shipped", "delivered", "completed", "cancelled"];
};

const tabs = ["All", "In Progress", "Pending", "Completed", "Cancelled", "Accepted"];

// UI tab label -> backend `status` query value
const TAB_TO_STATUS = {
  All: "all",
  "In Progress": "in_progress",
  Pending: "pending",
  Completed: "completed",
  Cancelled: "cancelled",
  Accepted: "accepted",
};

const STATUS_COLOR = {
  pending: "text-yellow-500",
  accepted: "text-orange-400",
  in_progress: "text-blue-400",
  partially_completed: "text-blue-400",
  completed: "text-green-500",
  cancelled: "text-red-400",
};

const STATUS_LABEL = {
  pending: "Pending",
  accepted: "Accepted",
  in_progress: "In Progress",
  partially_completed: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

// Mirrors the backend's computeAggregateItemStatus bucket logic, so the
// View Order modal (which gets raw `items` from getOrderById, already
// scoped to this business by the backend, but no precomputed `myStatus`
// field) shows the same status a business would see in the table.
const computeMyStatus = (items) => {
  if (!items || items.length === 0) return "cancelled";

  const statuses = items.map((i) => i.itemStatus);
  const isDone = (s) => s === "completed" || s === "delivered";
  const isCancelled = (s) => s === "cancelled" || s === "refunded";
  const isActive = (s) => ["in_progress", "ready_for_pickup", "shipped", "dispute"].includes(s);

  if (statuses.every(isDone)) return "completed";
  if (statuses.every(isCancelled)) return "cancelled";

  const anyDone = statuses.some(isDone);
  const anyUndone = statuses.some((s) => !isDone(s));
  if (anyDone && anyUndone) return "partially_completed";

  if (statuses.some(isActive)) return "in_progress";
  if (statuses.some((s) => s === "processing")) return "accepted";

  return "pending";
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

export default function OrdersPage() {
  const {
    orders,
    stats,
    business,
    pagination,
    ordersLoading,
    getOrders,

    selectedOrder,
    orderLoading,
    getOrderById,
    clearSelectedOrder,

    actionLoading,
    acceptOrder,
    rejectOrder,
    updateItemStatus,
  } = useBusinessOrderStore();

  const [itemStatusDrafts, setItemStatusDrafts] = useState({});
  const [updatingItemId, setUpdatingItemId] = useState(null);

  const [activeTab, setActiveTab] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const searchDebounce = useRef(null);

  const statsCard = [
    { id: 1, title: "Total Orders", value: stats?.totalOrders ?? "0" },
    { id: 2, title: "Accepted Orders", value: stats?.acceptedOrders ?? "0" },
    { id: 3, title: "Orders in Progress", value: stats?.inProgressOrders ?? "0" },
    { id: 4, title: "Completed Orders", value: stats?.completedOrders ?? "0" },
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
    getOrders({
      page: currentPage,
      limit: pageSize,
      search,
      status: TAB_TO_STATUS[activeTab],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, search, currentPage]);

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

  const handleAccept = async (record) => {
    const res = await acceptOrder(record._id);
    if (res?.success) {
      message.success(res.message);
    } else {
      message.error(res?.message);
    }
  };

  const openRejectModal = (record) => {
    setSelectedRow(record);
    setRejectReason("");
    setRejectOpen(true);
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      message.error("Please provide a reason for rejecting this order.");
      return;
    }

    const res = await rejectOrder(selectedRow._id, rejectReason.trim());

    if (res?.success) {
      message.success(res.message);
      setRejectOpen(false);
    } else {
      message.error(res?.message);
    }
  };

  const handleUpdateItemStatus = async (item) => {
    const nextStatus = itemStatusDrafts[item._id];

    if (!nextStatus) {
      message.error("Please choose a status to update to.");
      return;
    }

    setUpdatingItemId(item._id);
    const res = await updateItemStatus(selectedOrder._id, item._id, nextStatus);
    setUpdatingItemId(null);

    if (res?.success) {
      message.success(res.message);
      // Refetch so item statuses / order rollup reflect the change —
      // simplest way to stay consistent with the backend's computed state.
      await getOrderById(selectedOrder._id);
      getOrders({ page: currentPage, limit: pageSize, search, status: TAB_TO_STATUS[activeTab] });
    } else {
      message.error(res?.message);
    }
  };

  const businessLink = business?.slug
    ? `${process.env.NEXT_PUBLIC_SITE_URL || ""}/business/${business.slug}`
    : "";

  const columns = [
    { title: "", render: () => <img src="/images/pen.png" className="w-5" /> },
    {
      title: "ORDER ID",
      dataIndex: "orderNumber",
      key: "orderNumber",
      render: (text, record) => (
        <span className="font-bold text-[#1e293b] flex items-center gap-2">
          #{text}
          {record.isMultiVendor && (
            <span
              title="This order includes items from other businesses too — you're only seeing your own."
              className="text-[9px] font-bold bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-sm"
            >
              Multi-vendor
            </span>
          )}
        </span>
      ),
    },
    {
      title: "CUSTOMER INFO",
      key: "customer",
      render: (record) => record.customer?.name || "—",
    },
    {
      // Fixed: previously only showed items?.[0]?.title, silently
      // dropping every other item in the order. `record.items` is already
      // scoped to just this business's items by the backend, so we can
      // safely list all of them here.
      title: "SERVICE TYPE",
      key: "service",
      render: (record) => {
        const items = record.items || [];
        if (items.length === 0) return "—";
        if (items.length === 1) return items[0].title;

        return (
          <div className="flex flex-col gap-0.5">
            {items.map((item) => (
              <span key={item._id}>
                {item.title} {item.quantity > 1 ? `x${item.quantity}` : ""}
              </span>
            ))}
          </div>
        );
      },
    },
    {
      title: "DATE",
      dataIndex: "createdAt",
      key: "date",
      render: (date) => (date ? dayjs(date).format("MM/DD/YYYY") : "—"),
    },
    {
      // Reflects this business's own share of the order, not the whole
      // cart total (which may include other businesses' items).
      title: "AMOUNT",
      key: "amount",
      render: (record) => `$${record.myItemsTotal ?? record.totalOriginalPrice ?? 0}`,
    },
    {
      title: "STATUS",
      key: "status",
      render: (record) => (
        <span className={`font-medium ${STATUS_COLOR[record.myStatus] || "text-gray-400"}`}>
          {STATUS_LABEL[record.myStatus] || record.myStatus}
        </span>
      ),
    },
    {
      title: "",
      key: "action",
      render: (record) => {
        const menuItems = [
          {
            key: "1",
            label: <span className="text-[10px] font-bold py-1 block">Order Details</span>,
            onClick: () => openViewModal(record),
          },
        ];

        if (record.myStatus === "pending") {
          menuItems.push(
            {
              key: "2",
              label: <span className="text-[10px] font-bold py-1 block">Accept Order</span>,
              onClick: () => handleAccept(record),
            },
            {
              key: "3",
              label: <span className="text-[10px] font-bold py-1 block">Reject Order</span>,
              onClick: () => openRejectModal(record),
            },
          );
        }

        return (
          <Dropdown menu={{ items: menuItems }} trigger={["click"]} placement="bottomRight">
            <Button className="border-none! bg-transparent! outline-0! p-0! flex items-center justify-center h-8 w-8">
              <img src="/images/dots.png" className="w-5" />
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  const tableData = orders.map((o) => ({ ...o, key: o._id }));
  const pageNumbers = buildPageNumbers(pagination?.page || 1, pagination?.totalPages || 1);

  const tabVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  // The View modal's `selectedOrder` comes from getOrderById, which
  // returns raw items (already scoped to this business) but no
  // precomputed myStatus — so we derive it the same way the table does.
  const selectedOrderStatus = selectedOrder ? computeMyStatus(selectedOrder.items) : null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mt-5">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Order Management</h1>
          <p className="text-xs text-[#4A4A4A]">View and manage your customer orders here.</p>
        </div>
        <Button className="p-4.5! bg-[#060853]! rounded-lg border-none! text-white!">
          <img src="/images/upload.png" alt="export" className="h-7" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-[#E2EDFC] p-4 rounded-sm">
        {statsCard.map((card) => (
          <div key={card.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center border-b border-gray-100 pb-2">
              <img src="/images/cube.png" alt="cube" className="h-8" />
              <h3 className="font-bold text-gray-900">{card.title}</h3>
            </div>
            <p className="text-2xl font-bold text-[#060853]">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="min-h-screen">
        {/* HEADER SECTION (Filter Bar) */}
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
            {ordersLoading ? (
              <div className="flex justify-center py-24">
                <Spin size="large" />
              </div>
            ) : tableData.length === 0 ? (
              /* ---------------- EMPTY STATE (reused for any tab with no results) ---------------- */
              <div className="flex justify-center items-center flex-col gap-2 text-center">
                <img src="/images/no_order.png" className="w-100" />
                <p className="font-bold mt-1 text-black">No Orders Yet</p>

                <div className="mt-10">
                  <Button className="text-white! h-10! px-8 bg-[#060853]! rounded-lg border-none font-medium">
                    Promote Business
                  </Button>
                </div>

                {businessLink && (
                  <div className="w-full max-w-150 mt-10 pt-6 border-t border-gray-100">
                    <h2 className="text-sm font-bold text-gray-800 mb-4 text-left">
                      Your Business Link
                    </h2>

                    <div className="flex justify-between items-center bg-[#F3F4F6] rounded-xl p-2 pl-4 border border-gray-50">
                      <span className="text-[13px] text-gray-500 font-medium truncate pr-4">
                        {businessLink}
                      </span>

                      <button
                        className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 hover:bg-gray-50 transition-all group"
                        onClick={() => {
                          navigator.clipboard.writeText(businessLink);
                          message.success("Link copied!");
                        }}
                      >
                        <img
                          src="/images/copy.png"
                          alt="copy"
                          className="w-4 h-4 opacity-60 group-hover:opacity-100"
                        />
                        <span className="text-xs font-bold text-gray-700">Copy Link</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* ---------------- ORDER LIST TABLE (same for every tab) ---------------- */
              <div className="bg-[#f0f5ff] p-8 min-h-screen">
                <h2 className="text-sm font-bold mb-4 text-[#1e293b]">Order List</h2>

                <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                  <Table
                    columns={columns}
                    dataSource={tableData}
                    pagination={false}
                    className="custom-table"
                    size="small"
                    rowClassName="hover:bg-gray-50 transition-colors"
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
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* VIEW ORDER MODAL */}
      <CustomModal
        isOpen={isOpen}
        onClose={closeModal}
        title={selectedRow ? `Order ID: #${selectedRow.orderNumber}` : "Order Details"}
        size="max-w-md"
      >
        {orderLoading || !selectedOrder ? (
          <div className="flex justify-center py-16">
            <Spin />
          </div>
        ) : (
          <div className="space-y-5 text-xs">
            {selectedOrder.businesses?.length > 1 && (
              <div className="bg-blue-50 text-blue-700 text-[11px] font-medium rounded-sm p-2">
                This order includes items from other businesses too — you're only seeing and
                managing your own items below.
              </div>
            )}

            <div className="bg-white border border-gray-100 rounded-sm p-4 space-y-2">
              <p>
                <span className="font-bold text-gray-900">Customer:</span>{" "}
                {selectedOrder.customer?.name}
              </p>
              <p>
                <span className="font-bold text-gray-900">Email:</span>{" "}
                {selectedOrder.customer?.email}
              </p>
              <p>
                <span className="font-bold text-gray-900">Status:</span>{" "}
                <span className={STATUS_COLOR[selectedOrderStatus]}>
                  {STATUS_LABEL[selectedOrderStatus] || selectedOrderStatus}
                </span>
              </p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-sm">Order Items</h3>
              <div className="space-y-3">
                {selectedOrder.items?.map((item) => {
                  const options = nextStatusOptions(item);
                  const isTerminal = TERMINAL_ITEM_STATUSES.includes(item.itemStatus);

                  return (
                    <div key={item._id} className="border border-gray-50 rounded-sm p-3">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-gray-700 font-medium">
                          {item.title} {item.quantity > 1 ? `x${item.quantity}` : ""}
                        </span>
                        <span className="font-bold text-gray-900">${item.total}</span>
                      </div>

                      <p className="text-[10px] text-gray-400 mb-2">
                        Status:{" "}
                        <span className="font-bold text-gray-600">
                          {ITEM_STATUS_LABEL[item.itemStatus] || item.itemStatus}
                        </span>
                      </p>

                      {/* Only shown once this item has been accepted (itemStatus is
                          past "pending") and isn't already in a terminal state —
                          i.e. exactly the gap you flagged: something needs to
                          replace Accept/Reject once an item moves forward. */}
                      {item.itemStatus !== "pending" && !isTerminal && options.length > 0 && (
                        <div className="flex items-center gap-2">
                          <Select
                            size="small"
                            placeholder="Update status..."
                            className="flex-1"
                            value={itemStatusDrafts[item._id]}
                            onChange={(val) =>
                              setItemStatusDrafts((prev) => ({ ...prev, [item._id]: val }))
                            }
                            options={options.map((s) => ({
                              value: s,
                              label: ITEM_STATUS_LABEL[s] || s,
                            }))}
                          />
                          <Button
                            size="small"
                            loading={updatingItemId === item._id}
                            onClick={() => handleUpdateItemStatus(item)}
                            className="bg-[#060853]! text-white! border-none! rounded-sm!"
                          >
                            Update
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })}

                <div className="flex justify-end items-center gap-4 pt-2">
                  <span className="text-gray-500 font-medium">Your Total:</span>
                  <span className="text-base font-bold text-gray-900">
                    $
                    {selectedOrder.items?.reduce((sum, item) => sum + (item.total || 0), 0) ?? 0}
                  </span>
                </div>
              </div>
            </div>

            <p>
              <span className="font-bold text-gray-900">Payment Status:</span>{" "}
              <span className="capitalize">{selectedOrder.paymentStatus}</span>
            </p>

            {selectedOrderStatus === "pending" && (
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => handleAccept(selectedOrder)}
                  className="flex-1 bg-[#060853] text-white py-3 rounded-sm font-bold text-xs hover:bg-[#0a0d6e] transition-colors"
                >
                  Accept Order
                </button>
                <button
                  onClick={() => {
                    closeModal();
                    openRejectModal(selectedOrder);
                  }}
                  className="flex-1 bg-[#610C0C] text-white py-3 rounded-sm font-bold text-xs hover:bg-red-950 transition-colors"
                >
                  Reject Order
                </button>
              </div>
            )}
          </div>
        )}
      </CustomModal>

      {/* REJECT ORDER MODAL */}
      <CustomModal
        isOpen={rejectOpen}
        onClose={() => setRejectOpen(false)}
        title="Reject Order"
        size="max-w-md"
      >
        <p className="text-sm text-gray-600 mb-3">
          This will cancel your items on this order and refund the customer for your portion.
          Please tell us why.
        </p>
        <TextArea
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          rows={3}
          placeholder="e.g. Out of stock, unable to fulfill in time..."
        />
        <div className="flex justify-end items-center mt-5 gap-3">
          <Button onClick={() => setRejectOpen(false)} className="bg-transparent! rounded-sm! border-gray-300!">
            Cancel
          </Button>
          <Button
            onClick={handleReject}
            loading={actionLoading}
            className="bg-[#610C0C]! rounded-sm! text-white! border-none!"
          >
            Reject & Refund
          </Button>
        </div>
      </CustomModal>
    </div>
  );
}