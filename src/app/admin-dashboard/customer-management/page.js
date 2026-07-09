
"use client";
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import {
  Table,
  Button,
  DatePicker,
  Input,
  Dropdown,
  Spin,
  message,
  Modal,
} from "antd";
import { motion, AnimatePresence } from "motion/react";
import dayjs from "dayjs";
import CustomModal from "@/components/CustomModal";
import { useCustomerManagementStore } from "@/store/customerManagementStore";

const SubmittedReviews = dynamic(
  () => import("@/components/SubmittedReviews "),
  {
    loading: () => (
      <div className="flex justify-center items-center py-16">
        <Spin />
      </div>
    ),
    ssr: false,
  }
);

const AccountActivity = dynamic(
  () => import("@/components/AccountActivity"),
  {
    loading: () => (
      <div className="flex justify-center items-center py-16">
        <Spin />
      </div>
    ),
    ssr: false,
  }
);

const OrderHistory = dynamic(() => import("@/components/OrderHistory"), {
  loading: () => (
    <div className="flex justify-center items-center py-16">
      <Spin />
    </div>
  ),
  ssr: false,
});

const { RangePicker } = DatePicker;

// Maps the UI tab labels to the "status" query param the API expects
const TAB_TO_STATUS = {
  All: "all",
  Active: "active",
  Inactive: "suspended",
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
    if (idx > 0 && p - sorted[idx - 1] > 1) {
      withEllipsis.push("...");
    }
    withEllipsis.push(p);
  });

  return withEllipsis;
};

const page = () => {
  const {
    customers,
    analytics,
    pagination,
    customersLoading,
    getCustomers,

    selectedCustomer,
    customerStatistics,
    customerLoading,
    getCustomerById,

    getCustomerOrders,
    getCustomerReviews,
    getCustomerActivities,

    updateCustomerStatus,
    statusUpdating,
    clearSelectedCustomer,
  } = useCustomerManagementStore();

  const [activeTab, setActiveTab] = useState("All");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [activeModalTab, setActiveModalTab] = useState("Personal Information");
  const [loadedTabs, setLoadedTabs] = useState(new Set());

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [suspendOpen, setSuspendOpen] = useState(false);
  const [suspendTarget, setSuspendTarget] = useState(null);
  const [suspendReason, setSuspendReason] = useState("");

  const searchDebounce = useRef(null);

  const tabs = ["All", "Active", "Inactive"];
  const modalTabs = [
    "Personal Information",
    "Order History",
    "Submitted Reviews",
    "Account Activity",
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

  /* ---------------- FETCH CUSTOMERS ---------------- */
  useEffect(() => {
    const [startDate, endDate] = dateRange || [];

    getCustomers({
      page: currentPage,
      limit: pageSize,
      search,
      status: TAB_TO_STATUS[activeTab],
      startDate: startDate ? startDate.format("YYYY-MM-DD") : undefined,
      endDate: endDate ? endDate.format("YYYY-MM-DD") : undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, search, dateRange, currentPage]);

  /* ---------------- LAZY-LOAD MODAL TAB DATA ---------------- */
  useEffect(() => {
    if (!isOpen || !selectedRow) return;
    if (loadedTabs.has(activeModalTab)) return;

    const id = selectedRow._id;

    if (activeModalTab === "Personal Information") {
      getCustomerById(id);
    } else if (activeModalTab === "Order History") {
      getCustomerOrders(id, { page: 1, limit: 10 });
    } else if (activeModalTab === "Submitted Reviews") {
      getCustomerReviews(id, { page: 1, limit: 10 });
    } else if (activeModalTab === "Account Activity") {
      getCustomerActivities(id, { page: 1, limit: 20 });
    }

    setLoadedTabs((prev) => new Set(prev).add(activeModalTab));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, activeModalTab, selectedRow]);

  const openViewModal = (record) => {
    setSelectedRow(record);
    setLoadedTabs(new Set());
    setActiveModalTab("Personal Information");
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedRow(null);
    clearSelectedCustomer();
  };

  const openSuspendModal = (record) => {
    setSuspendTarget(record);
    setSuspendReason("");
    setSuspendOpen(true);
  };

  const confirmSuspend = async () => {
    if (!suspendReason.trim()) {
      message.error("Please provide a suspension reason.");
      return;
    }

    const res = await updateCustomerStatus(
      suspendTarget._id,
      "suspended",
      suspendReason.trim()
    );

    if (res?.success) {
      message.success(res.message);
      setSuspendOpen(false);
    } else {
      message.error(res?.message);
    }
  };

  const handleActivate = (record) => {
    Modal.confirm({
      title: "Activate this account?",
      content: `${record.name} will regain full access immediately.`,
      okText: "Activate",
      onOk: async () => {
        const res = await updateCustomerStatus(record._id, "active");
        if (res?.success) {
          message.success(res.message);
        } else {
          message.error(res?.message);
        }
      },
    });
  };

  const statsCard = [
    {
      id: 1,
      title: "Total Customers",
      value: analytics?.totalCustomers ?? "—",
      img: "/images/user_transparent.png",
    },
    {
      id: 2,
      title: "Active Customers",
      value: analytics?.activeCustomers ?? "—",
      img: "/images/user_green.png",
    },
    {
      id: 3,
      title: "Inactive Customers",
      value: analytics?.inactiveCustomers ?? "—",
      img: "/images/user_red.png",
    },
    {
      id: 4,
      title: "New Customer",
      value: analytics?.newCustomers ?? "—",
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
      dataIndex: "customerID",
      key: "customerID",
      render: (text) => (
        <span className="font-bold text-[#1e293b]">{text}</span>
      ),
    },
    {
      title: "CUSTOMER NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "NUMBER OF ORDERS",
      dataIndex: "totalOrders",
      key: "totalOrders",
    },
    {
      title: "ACCOUNT STATUS",
      dataIndex: "accountStatus",
      key: "accountStatus",
      render: (status) => (
        <span
          style={{ color: status === "active" ? "#15BE87" : "#FB2E2E" }}
          className="capitalize text-[11px]"
        >
          {status === "active" ? "Active" : "Inactive"}
        </span>
      ),
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
                label: (
                  <span className="text-[10px] font-bold py-1 block">
                    View
                  </span>
                ),
                onClick: () => openViewModal(record),
              },
              {
                key: "2",
                label: (
                  <span className="text-[10px] font-bold py-1 block">
                    {record.accountStatus === "active"
                      ? "Suspend Account"
                      : "Activate Account"}
                  </span>
                ),
                onClick: () =>
                  record.accountStatus === "active"
                    ? openSuspendModal(record)
                    : handleActivate(record),
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

  const tableData = customers.map((c) => ({ ...c, key: c._id }));

  const pageNumbers = buildPageNumbers(
    pagination?.page || 1,
    pagination?.totalPages || 1
  );

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-[#E2EDFC] p-4 rounded-sm">
        {statsCard.map((card) => (
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

        {/* RIGHT: SEARCH & TOOLS */}
        <div className="flex items-center gap-2 pr-2">
          <Input
            prefix={
              <img src="/images/search.png" alt="search" className="h-7" />
            }
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
            <h2 className="text-sm font-bold mb-4 text-[#1e293b]">
              Customer List
            </h2>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <Table
                columns={columns}
                dataSource={tableData}
                pagination={false}
                loading={customersLoading}
                className="custom-table"
                size="small"
                rowClassName="hover:bg-gray-50 transition-colors"
                locale={{ emptyText: customersLoading ? " " : "No customers found" }}
              />
            </div>

            {/* FOOTER / PAGINATION */}
            <div className="flex items-center justify-between px-6 py-4 mt-5">
              <span className="text-[11px] text-black">
                {pagination
                  ? `Showing ${(pagination.page - 1) * pagination.limit + 1} to ${Math.min(
                      pagination.page * pagination.limit,
                      pagination.total
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
                  )
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

      {/* VIEW CUSTOMER MODAL */}
      <CustomModal isOpen={isOpen} onClose={closeModal} size="max-w-xl">
        <div className="border border-gray-100 p-2">
          <div className="flex items-center gap-3">
            <div className="rounded-full w-13 h-13 overflow-hidden bg-gray-100">
              <img
                src={selectedCustomer?.avatar?.url || "/images/image3.png"}
                alt="Customer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-black font-bold">
                {selectedRow?.name || "Customer Details"}
              </h1>
              <span className="text-[#4A4A4A] text-xs">
                {selectedRow?.customerID}
              </span>
            </div>
          </div>

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

        <div className="mt-5 px-2">
          {activeModalTab === "Personal Information" && (
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Personal Information
              </h3>

              {customerLoading ? (
                <div className="flex justify-center py-10">
                  <Spin />
                </div>
              ) : selectedCustomer ? (
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <InfoRow label="Full Name" value={selectedCustomer.name} />
                  <InfoRow label="Email" value={selectedCustomer.email} />
                  <InfoRow label="Phone" value={selectedCustomer.phoneNumber} />
                  <InfoRow
                    label="Status"
                    value={
                      selectedCustomer.accountStatus === "active"
                        ? "Active"
                        : "Suspended"
                    }
                  />
                  <InfoRow
                    label="Verified"
                    value={selectedCustomer.isVerified ? "Yes" : "No"}
                  />
                  <InfoRow
                    label="Joined"
                    value={
                      selectedCustomer.createdAt
                        ? dayjs(selectedCustomer.createdAt).format("MMMM D, YYYY")
                        : "—"
                    }
                  />
                  <InfoRow
                    label="Total Orders"
                    value={customerStatistics?.totalOrders ?? 0}
                  />
                  <InfoRow
                    label="Total Spent"
                    value={`$${customerStatistics?.totalSpent ?? 0}`}
                  />
                  <InfoRow
                    label="Wallet Balance"
                    value={`$${customerStatistics?.walletBalance ?? 0}`}
                  />
                  {selectedCustomer.accountStatus === "suspended" && (
                    <InfoRow
                      label="Suspension Reason"
                      value={selectedCustomer.suspensionReason || "—"}
                    />
                  )}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No data available.</p>
              )}
            </div>
          )}

          {activeModalTab === "Order History" && selectedRow && (
            <OrderHistory customerId={selectedRow._id} />
          )}

          {activeModalTab === "Submitted Reviews" && selectedRow && (
            <SubmittedReviews customerId={selectedRow._id} />
          )}

          {activeModalTab === "Account Activity" && selectedRow && (
            <AccountActivity customerId={selectedRow._id} />
          )}
        </div>
      </CustomModal>

      {/* SUSPEND MODAL */}
      <CustomModal
        isOpen={suspendOpen}
        onClose={() => setSuspendOpen(false)}
        title="Suspend Customer"
        size="max-w-md"
      >
        <p className="text-sm text-gray-600 mb-3">
          Suspending <strong>{suspendTarget?.name}</strong> will restrict their
          account access. Please provide a reason.
        </p>
        <textarea
          value={suspendReason}
          onChange={(e) => setSuspendReason(e.target.value)}
          rows={3}
          className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#060853]"
          placeholder="Reason for suspension..."
        />
        <div className="flex justify-end gap-3 mt-4">
          <Button onClick={() => setSuspendOpen(false)}>Cancel</Button>
          <Button
            onClick={confirmSuspend}
            loading={statusUpdating}
            className="bg-[#FB2E2E]! text-white! border-none!"
          >
            Suspend
          </Button>
        </div>
      </CustomModal>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div>
    <p className="text-[10px] uppercase text-gray-400 font-bold">{label}</p>
    <p className="text-gray-800 font-medium">{value ?? "—"}</p>
  </div>
);

export default page;