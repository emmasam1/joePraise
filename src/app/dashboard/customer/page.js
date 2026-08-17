


"use client";
import React, { useEffect, useState } from "react";
import { Input, Button, Table, Dropdown } from "antd";
import { motion, AnimatePresence } from "motion/react";
import CustomModal from "@/components/CustomModal";
import { useBusinessDashboardStore } from "@/store/businessDashboardStore";

const TABS = [
  { label: "All", value: "all" },
  { label: "Frequent customers", value: "frequent" },
  { label: "High Spenders", value: "high_spenders" },
  { label: "New customers", value: "new" },
];

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "—";

const formatAmount = (value) => Number(value || 0).toLocaleString();

const statusLabels = {
  pending: "Pending",
  accepted: "Accepted",
  in_progress: "In Progress",
  partially_completed: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

const Page = () => {
  const {
    customers,
    customerStats,
    pagination,
    customersLoading,
    customersError,
    getCustomers,
    selectedCustomer,
    customerDetailLoading,
    getCustomerDetail,
    clearSelectedCustomer,
    reportCustomer,
    reportLoading,
  } = useBusinessDashboardStore();

  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportTarget, setReportTarget] = useState(null);
  const [reportReason, setReportReason] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [reportFeedback, setReportFeedback] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      getCustomers({ tab: activeTab, search, page, limit: 10 });
    }, 350);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, search, page]);

  const openCustomer = (customerId) => {
    getCustomerDetail(customerId);
    setViewModalOpen(true);
  };

  const closeReportModal = () => {
    setReportModalOpen(false);
    setReportTarget(null);
    setReportReason("");
    setReportDescription("");
    setReportFeedback(null);
  };

  const submitReport = async () => {
    if (!reportTarget || !reportReason) {
      setReportFeedback({ type: "error", message: "Please select a reason." });
      return;
    }
    const result = await reportCustomer(reportTarget._id, {
      reason: reportReason,
      description: reportDescription,
    });
    if (result.success) {
      setReportFeedback({ type: "success", message: result.message });
      setTimeout(closeReportModal, 1200);
    } else {
      setReportFeedback({ type: "error", message: result.message });
    }
  };

  const tabVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  const columns = [
    {
      title: "",
      key: "pen",
      render: () => <img src="/images/pen.png" className="w-5" />,
    },
    {
      title: "Customer Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record.avatar?.url || "/images/user-remix.png"}
            alt={record.name}
            className="w-10 h-10 rounded-lg object-cover"
          />
          <span className="font-semibold text-[#1e293b] text-sm">{record.name}</span>
        </div>
      ),
    },
    {
      title: "PHONE NUMBER",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (value) => <span className="font-semibold text-black">{value || "—"}</span>,
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
      render: (value) => <span className="text-black">{value}</span>,
    },
    {
      title: "TOTAL ORDERS",
      dataIndex: "totalOrders",
      key: "totalOrders",
      render: (value) => <span className="text-black">{value}</span>,
    },
    {
      title: "TOTAL SPEND",
      dataIndex: "totalSpent",
      key: "totalSpent",
      render: (value) => <span className="text-black">${formatAmount(value)}</span>,
    },
    {
      title: "LAST ORDER DATE",
      dataIndex: "lastOrderDate",
      key: "lastOrderDate",
      render: (value) => <span className="text-black">{formatDate(value)}</span>,
    },
    {
      title: "",
      key: "action",
      render: (_, record) => {
        const items = [
          { key: "1", label: <span className="text-[10px] font-bold py-1 block">Add</span> },
          {
            key: "view",
            label: (
              <span
                onClick={() => openCustomer(record._id)}
                className="text-[10px] font-bold py-1 block cursor-pointer"
              >
                View
              </span>
            ),
          },
          { key: "3", label: <span className="text-[10px] font-bold py-1 block">Edit</span> },
          {
            key: "4",
            label: (
              <span
                onClick={() => {
                  setReportTarget(record);
                  setReportModalOpen(true);
                }}
                className="text-[10px] font-bold py-1 block"
              >
                Report
              </span>
            ),
          },
        ];

        return (
          <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
            <Button className="border-none! bg-transparent! outline-0! p-0! flex items-center justify-center h-8 w-8">
              <img src="/images/dots.png" className="w-5" />
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  const statsCard = [
    { id: 1, title: "Total Customer", value: customerStats?.totalCustomers ?? 0 },
    { id: 2, title: "New Customers", value: customerStats?.newCustomers ?? 0 },
    { id: 3, title: "Repeat Customers", value: customerStats?.repeatCustomers ?? 0 },
    { id: 4, title: "Weekly Active Customers", value: customerStats?.weeklyActiveCustomers ?? 0 },
  ];

  const pageCount = pagination?.totalPages || 1;
  const total = pagination?.total || 0;
  const first = total === 0 ? 0 : (page - 1) * 10 + 1;
  const last = Math.min(page * 10, total);

  return (
    <div className="space-y-6">
      <div className="flex justify-end mt-5">
        <Button className="p-4.5! bg-[#060853]! rounded-lg border-none! text-white!">
          <img src="/images/upload.png" alt="export" className="h-7" />
          Export Report
        </Button>
      </div>

      {customersError && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{customersError}</p>
      )}

      {/* Stats Cards  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-[#E2EDFC] p-4 rounded-sm">
        {statsCard.map((card) => (
          <div key={card.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center border-b border-gray-100 pb-2">
              <img src="/images/user-remix.png" alt={card.title} className="object-contain mr-2 h-7" />
              <h3 className="font-bold text-gray-900">{card.title}</h3>
            </div>
            <p className="text-2xl font-bold text-[#060853]">
              {customersLoading ? "…" : card.value}
            </p>
          </div>
        ))}
      </div>

      <div>
        {/* HEADER SECTION (Filter Bar) */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          {/* LEFT: ANIMATED TABS */}
          <div className="flex items-center gap-1 bg-[#E2EDFC] p-1 rounded-full border border-[#E0E7FF]/60 flex-wrap">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => {
                    setActiveTab(tab.value);
                    setPage(1);
                  }}
                  className={`relative px-4 rounded-lg p-1.5 text-xs font-bold transition-colors z-10
                                ${isActive ? "text-white" : "text-gray-500 hover:text-gray-700"}`}
                >
                  {tab.label}
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

          {/* RIGHT: SEARCH */}
          <div className="flex items-center gap-2 pr-2">
            <Input
              prefix={<img src="/images/search.png" alt="search" className="h-7" />}
              placeholder="Search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              className="w-72 rounded-lg bg-gray-50 border border-gray-200 h-10 text-xs"
            />
            <Button className="flex items-center justify-center border-gray-200 rounded-lg h-10! overflow-hidden">
              <img src="/images/funnel.png" alt="filter" className="h-8 w-8 object-contain" />
            </Button>
            <Button className="flex items-center justify-center border-gray-200 rounded-lg h-10! overflow-hidden">
              <img src="/images/grid.png" alt="grid" className="h-8 w-8 object-contain" />
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
            {customers.length === 0 && !customersLoading ? (
              <div className="flex justify-center items-center flex-col gap-2 text-center py-20">
                <img src="/images/no_order.png" className="w-100" />
                <p className="font-bold mt-1 text-black">No customers found</p>
              </div>
            ) : (
              <div className="bg-[#f0f5ff] p-8">
                <h2 className="text-sm font-bold mb-4 text-[#1e293b]">Customers</h2>

                <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                  <Table
                    columns={columns}
                    dataSource={customers}
                    rowKey="_id"
                    loading={customersLoading}
                    pagination={false}
                    className="custom-table"
                    size="small"
                    rowClassName="hover:bg-gray-50 transition-colors"
                  />
                </div>

                {/* FOOTER / PAGINATION */}
                <div className="flex items-center justify-between px-6 py-4 mt-5">
                  <span className="text-[11px] text-black">
                    Show {first} to {last} of {total} results
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      className="p-2 text-gray-400 hover:text-black disabled:opacity-40"
                      disabled={page === 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                    >
                      <img src="/images/arrow_left.png" alt="prev" className="h-4" />
                    </button>
                    {Array.from({ length: pageCount }, (_, i) => i + 1)
                      .filter((n) => n <= 4)
                      .map((n) => (
                        <button
                          key={n}
                          onClick={() => setPage(n)}
                          className={`w-8 h-8 flex items-center justify-center rounded text-xs font-bold ${
                            page === n
                              ? "bg-[#060853] text-white"
                              : "bg-white border border-gray-100 text-gray-400"
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    {pageCount > 5 && <span className="px-1 text-gray-400">...</span>}
                    {pageCount > 4 && (
                      <button
                        onClick={() => setPage(pageCount)}
                        className="w-8 h-8 flex items-center justify-center rounded bg-white border border-gray-100 text-gray-400 text-xs"
                      >
                        {pageCount}
                      </button>
                    )}
                    <button
                      className="p-2 text-gray-400 hover:text-black disabled:opacity-40"
                      disabled={page === pageCount || pageCount === 0}
                      onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
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

      {/* VIEW MODAL */}
      <CustomModal
        isOpen={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          clearSelectedCustomer();
        }}
        size="max-w-2xl"
        title={selectedCustomer ? `Customer: ${selectedCustomer.customer?.name}` : ""}
      >
        {customerDetailLoading || !selectedCustomer ? (
          <p className="p-10 text-center text-sm text-gray-400">Loading customer…</p>
        ) : (
          <div className="flex flex-col bg-white text-[#1e293b] -m-6">
            {/* 1. TOP HEADER SECTION */}
            <div className="px-8 py-6">
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img
                      src={selectedCustomer.customer?.avatar?.url || "/images/user-remix.png"}
                      alt={selectedCustomer.customer?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-[#060853]">
                      {selectedCustomer.customer?.name}
                    </h2>
                  </div>
                </div>
                <div className="flex items-start gap-2 pt-2">
                  <img src="/images/calendar.png" className="w-5" />
                  <div>
                    <p className="text-[11px] text-black font-bold uppercase">First ordered</p>
                    <p className="text-sm font-semibold text-gray-700">
                      {formatDate(selectedCustomer.joinedAt)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-sm font-bold text-[#060853] mb-4">Contact Info</h3>
                <div className="grid grid-cols-2 gap-y-4 border-t border-[#EFF1F0] pt-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm">
                      <img src="/images/mi_email.png" className="w-5 mt-1" />
                      <span className="text-gray-700">{selectedCustomer.customer?.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <img src="/images/phone_call.png" className="w-5 mt-1" />
                      <span className="text-gray-700">
                        {selectedCustomer.customer?.phoneNumber || "—"}
                      </span>
                    </div>
                  </div>
                  {selectedCustomer.customer?.address && (
                    <div className="flex items-start gap-3 text-sm row-span-2">
                      <img src="/images/address-marker.png" className="w-5 mt-1" />
                      <span className="text-gray-700 leading-relaxed">
                        {[
                          selectedCustomer.customer.address.street,
                          selectedCustomer.customer.address.city,
                          selectedCustomer.customer.address.state,
                          selectedCustomer.customer.address.country,
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 2. BLUE BACKGROUND SECTION */}
            <div className="bg-[#E9F2FF] px-8 py-6 border-t border-[#EFF1F0]">
              <h3 className="text-sm font-bold text-[#060853] mb-4">Order History</h3>

              <div className="flex gap-6 flex-col sm:flex-row">
                <div className="flex-1 bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                  <div className="space-y-3 max-h-55 overflow-y-auto pr-2">
                    {selectedCustomer.orderHistory?.map((order) => (
                      <div
                        key={order.orderNumber}
                        className="flex justify-between items-center text-[11px] font-bold text-gray-600 border-b border-gray-50 pb-2 last:border-0"
                      >
                        <span>
                          {order.orderNumber} - {statusLabels[order.status] || order.status} -{" "}
                          {formatDate(order.date)} - ${formatAmount(order.amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full sm:w-44 flex flex-col gap-4">
                  <div className="bg-white p-5 rounded-lg text-center ">
                    <p className="text-[13px] text-[#4A4A4A] font-bold mb-2">Total Spend</p>
                    <p className="text-2xl font-bold text-[#060853]">
                      ${formatAmount(selectedCustomer.totalSpent)}
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-lg text-center">
                    <p className="text-[13px] text-[#4A4A4A] font-bold mb-2">Reviews Given</p>
                    <div className="bg-[#EFF1F0] h-0.5 mb-1" />
                    <p className="text-sm font-bold text-[#060853] mb-1">
                      {selectedCustomer.reviews?.length || 0} Reviews
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. CUSTOMER REVIEWS SECTION */}
              {selectedCustomer.reviews?.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-sm font-bold text-[#060853] mb-4">Customer Reviews</h3>
                  <div className="space-y-4">
                    {selectedCustomer.reviews.map((review, i) => (
                      <div key={i} className="bg-white p-5 rounded-lg ">
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex text-yellow-400 text-xs">
                            {"★".repeat(review.rating)}
                            {"☆".repeat(5 - review.rating)}
                          </div>
                          <span className="text-[10px] text-gray-400 font-bold">
                            {formatDate(review.createdAt)}
                          </span>
                        </div>
                        {review.comment && (
                          <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                            {review.comment}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </CustomModal>

      {/* REPORT MODAL */}
      <CustomModal isOpen={reportModalOpen} onClose={closeReportModal} size="max-w-2xl">
        <div className="flex flex-col gap-6 text-[#1e293b]">
          <div className="flex items-center justify-center gap-3">
            <div className="bg-[#FF4D4D] p-2 rounded-lg text-white">
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-[#1e293b]">
              Report {reportTarget?.name || "Customer"}
            </h1>
          </div>

          <div className="bg-[#FFF5F5] border border-[#FFDADA] p-4 rounded-lg flex gap-3">
            <div className="text-[#FF4D4D] mt-1">
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"></path>
              </svg>
            </div>
            <p className="text-sm leading-relaxed">
              <span className="font-bold">Disclaimer:</span>{" "}
              <span className="text-[#FF4D4D]">
                Please report customer only for genuine and specific reasons such as fraud, abuse, or
                other clear policy violations. Submitting false reports can lead to penalties or
                account suspension.
              </span>
            </p>
          </div>

          {reportFeedback && (
            <p
              className={`text-sm ${
                reportFeedback.type === "success" ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {reportFeedback.message}
            </p>
          )}

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-[#1e293b]">Reason for Report *</label>
              <select
                value={reportReason}
                onChange={(event) => setReportReason(event.target.value)}
                className="w-full border border-gray-200 rounded-lg p-3 text-sm text-gray-500 bg-white focus:outline-none focus:ring-1 focus:ring-gray-300 transition-all appearance-none cursor-pointer"
              >
                <option value="">Select a reason</option>
                <option value="fraud">Fraud</option>
                <option value="abuse">Abuse</option>
                <option value="policy">Policy Violation</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-[#1e293b]">Description</label>
              <textarea
                value={reportDescription}
                onChange={(event) => setReportDescription(event.target.value)}
                placeholder="Please provide any additional details (optional)"
                rows={6}
                className="w-full border border-gray-200 rounded-lg p-4 text-sm text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-300 transition-all resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-2">
            <button
              onClick={closeReportModal}
              className="px-8 py-2 rounded-lg border border-[#060853] text-[#060853] font-bold text-sm hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={submitReport}
              disabled={reportLoading}
              className="px-8 py-2 rounded-lg bg-[#060853] text-white font-bold text-sm hover:bg-[#0a0d6e] transition-colors shadow-md disabled:opacity-50"
            >
              {reportLoading ? "Submitting…" : "Submit Report"}
            </button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default Page;


