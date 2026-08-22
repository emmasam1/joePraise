"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dropdown, Table } from "antd";
import {
  CalendarDays,
  CheckCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  Grid2X2,
  List,
  MoreVertical,
  Search,
  X,
} from "lucide-react";
import { useCustomerOrderStore } from "@/store/customerOrderStore";

const tabs = [
  { label: "All", status: "all" },
  { label: "In Progress", status: "in_progress" },
  { label: "Pending", status: "pending" },
  { label: "Completed", status: "completed" },
  { label: "Cancelled", status: "cancelled" },
  { label: "Accepted", status: "accepted" },
  { label: "Dispute", status: "dispute" },
];

const statCards = [
  { key: "totalOrders", title: "Total Orders", icon: "/images/cube.png" },
  { key: "acceptedOrders", title: "Accepted Orders", icon: "/images/green_cube.png" },
  { key: "inProgressOrders", title: "In Progress", icon: "/images/cube.png" },
  { key: "pendingOrders", title: "Pending Orders", icon: "/images/yellow_cube.png" },
  { key: "completedOrders", title: "Completed Orders", icon: "/images/cube.png" },
];

const statusLabels = {
  pending: "Pending",
  accepted: "Accepted",
  in_progress: "In Progress",
  partially_completed: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

const statusStyles = {
  "In Progress": "text-[#218cff]",
  Pending: "text-[#ffbd31]",
  Completed: "text-[#11be88]",
  Accepted: "text-[#454545]",
  Cancelled: "text-[#e14949]",
  Dispute: "text-[#9a54dc]",
};

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "—";

const formatShort = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : null;

const formatAmount = (value) => `$${Number(value || 0).toLocaleString()}`;

const businessName = (order) =>
  order.business?.businessName ||
  (order.businesses?.length > 1 ? "Multiple Vendors" : "—");

const productName = (order) => {
  const first = order.items?.[0]?.title || "—";
  return order.items?.length > 1 ? `${first} +${order.items.length - 1} more` : first;
};

const orderStatusLabel = (order) =>
  order.hasActiveDispute ? "Dispute" : statusLabels[order.orderStatus] || order.orderStatus;

const columns = [
  {
    title: "",
    key: "marker",
    width: 48,
    render: () => <CheckCheck size={15} className="text-[#68707c]" />,
  },
  {
    title: "Order ID",
    dataIndex: "orderNumber",
    key: "orderNumber",
    render: (value) => <span className="font-bold text-[#242424]">{value}</span>,
  },
  {
    title: "Product/Service",
    key: "product",
    render: (_, record) => productName(record),
  },
  {
    title: "Business Name",
    key: "business",
    render: (_, record) => businessName(record),
  },
  {
    title: "Order Date",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (value) => formatDate(value),
  },
  {
    title: "Amount",
    dataIndex: "totalOriginalPrice",
    key: "totalOriginalPrice",
    render: (value) => formatAmount(value),
  },
  {
    title: "Status",
    key: "status",
    render: (_, record) => {
      const label = orderStatusLabel(record);
      return <span className={statusStyles[label]}>{label}</span>;
    },
  },
  {
    title: "",
    key: "actions",
    width: 52,
    render: (_, record) => (
      <Dropdown
        trigger={["click"]}
        placement="bottomRight"
        menu={{
          items: [
            {
              key: "view",
              label: (
                <Link href={`/customer-dashboard/orders/${record._id}`} className="block min-w-28 text-xs">
                  View more
                </Link>
              ),
            },
          ],
        }}
      >
        <button type="button" aria-label={`Actions for ${record.orderNumber}`} className="flex h-8 w-8 items-center justify-center">
          <MoreVertical size={17} />
        </button>
      </Dropdown>
    ),
  },
];

export default function CustomerOrdersPage() {
  const { orders, stats, pagination, ordersLoading, ordersError, getOrders } = useCustomerOrderStore();

  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });

  // Debounce search so we don't fire a request on every keystroke.
  useEffect(() => {
    const timeout = setTimeout(() => {
      getOrders({
        status: activeTab,
        search,
        page,
        limit: 10,
        startDate: dateRange.startDate || undefined,
        endDate: dateRange.endDate || undefined,
      });
    }, 350);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, search, page, dateRange]);

  const selectTab = (status) => {
    setActiveTab(status);
    setPage(1);
  };

  const applyDateRange = (range) => {
    setDateRange(range);
    setPage(1);
  };

  const hasOrders = (stats?.totalOrders || 0) > 0;
  const pageCount = pagination?.totalPages || 1;
  const total = pagination?.total || 0;
  const first = total === 0 ? 0 : (page - 1) * 10 + 1;
  const last = Math.min(page * 10, total);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-black">Orders</h1>
          <p className="mt-1 text-sm text-[#303036]">Keep track of your orders</p>
        </div>
        <DateRangeFilter value={dateRange} onApply={applyDateRange} />
      </div>

      {ordersError && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{ordersError}</p>
      )}

      <section className="grid grid-cols-1 gap-4 rounded-xl bg-[#E2EDFC] p-4 sm:grid-cols-2 xl:grid-cols-5">
        {statCards.map((item) => (
          <article key={item.key} className="rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
            <div className="flex items-center gap-2 border-b border-[#e1e4e9] pb-2">
              <Image src={item.icon} alt="" width={20} height={20} className="h-5 w-5 object-contain" />
              <h2 className="text-xs font-semibold text-[#57575b]">{item.title}</h2>
            </div>
            <p className="mt-2 text-[30px] font-semibold leading-none text-black">
              {ordersLoading ? "…" : stats?.[item.key] ?? 0}
            </p>
          </article>
        ))}
      </section>

      <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
        <div className="flex max-w-full overflow-x-auto rounded-full bg-[#E2EDFC] p-1 shadow-sm">
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab.status}
              onClick={() => selectTab(tab.status)}
              className={`shrink-0 rounded-full px-5 py-2 text-xs transition-colors ${
                activeTab === tab.status ? "bg-[#060853] text-white" : "text-[#202027] hover:bg-white/60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <label className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-lg border border-[#060853] bg-white px-3 xl:w-60">
            <Search size={17} className="text-[#060853]" />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search by order ID"
              className="min-w-0 flex-1 bg-transparent text-xs outline-none"
            />
          </label>
          <ViewButton label="Filter orders"><Filter size={17} /></ViewButton>
          <ViewButton label="Grid view"><Grid2X2 size={17} /></ViewButton>
          <ViewButton label="List view"><List size={18} /></ViewButton>
        </div>
      </div>

      {hasOrders || ordersLoading ? (
        <OrderTable
          data={orders}
          loading={ordersLoading}
          page={page}
          pageCount={pageCount}
          total={total}
          first={first}
          last={last}
          onPageChange={setPage}
        />
      ) : (
        <EmptyOrders />
      )}
    </div>
  );
}

function DateRangeFilter({ value, onApply }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value);
  const containerRef = useRef(null);

  useEffect(() => setDraft(value), [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const label =
    value.startDate && value.endDate
      ? `${formatShort(value.startDate)} - ${formatShort(value.endDate)}`
      : "All dates";

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-12 w-full items-center justify-between rounded-lg border border-[#060853] bg-white px-4 text-sm text-[#27272d] sm:min-w-[315px]"
      >
        <span className="flex items-center gap-3">
          <CalendarDays size={20} />
          {label}
        </span>
        <ChevronDown size={18} className={open ? "rotate-180 transition-transform" : "transition-transform"} />
      </button>

      {open && (
        <div className="absolute right-0 top-14 z-20 w-full min-w-[280px] rounded-lg border border-gray-200 bg-white p-4 shadow-lg sm:w-[300px]">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-[#27272d]">Filter by date</p>
            <button type="button" aria-label="Close" onClick={() => setOpen(false)}>
              <X size={16} />
            </button>
          </div>
          <div className="mt-3 space-y-3">
            <label className="block text-xs text-[#606066]">
              From
              <input
                type="date"
                value={draft.startDate}
                max={draft.endDate || undefined}
                onChange={(event) => setDraft((prev) => ({ ...prev, startDate: event.target.value }))}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
            </label>
            <label className="block text-xs text-[#606066]">
              To
              <input
                type="date"
                value={draft.endDate}
                min={draft.startDate || undefined}
                onChange={(event) => setDraft((prev) => ({ ...prev, endDate: event.target.value }))}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
            </label>
          </div>
          <div className="mt-4 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => {
                const cleared = { startDate: "", endDate: "" };
                setDraft(cleared);
                onApply(cleared);
                setOpen(false);
              }}
              className="text-xs font-semibold text-[#606066]"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => {
                onApply(draft);
                setOpen(false);
              }}
              className="rounded-lg bg-[#060853] px-4 py-2 text-xs font-medium text-white"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ViewButton({ label, children }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#060853] bg-white text-[#24243b]"
    >
      {children}
    </button>
  );
}

function OrderTable({ data, loading, page, pageCount, total, first, last, onPageChange }) {
  return (
    <section className="rounded-xl bg-[#E2EDFC] p-5 sm:p-7">
      <h2 className="mb-7 text-base font-semibold text-[#24242a]">Order Summary</h2>
      <div className="overflow-x-auto bg-white">
        <Table
          columns={columns}
          dataSource={data}
          rowKey="_id"
          loading={loading}
          pagination={false}
          className="custom-table min-w-[950px]"
          size="small"
          locale={{ emptyText: "No matching orders" }}
        />
      </div>

      <div className="mt-8 flex flex-col items-center justify-between gap-5 text-xs text-[#55555d] sm:flex-row">
        <p>Show {first} to {last} of {total} results</p>
        <div className="flex items-center gap-1.5">
          <PageButton
            label="Previous page"
            disabled={page === 1}
            onClick={() => onPageChange(Math.max(1, page - 1))}
          >
            <ChevronLeft size={17} />
          </PageButton>
          {Array.from({ length: pageCount }, (_, i) => i + 1)
            .filter((number) => number <= 4)
            .map((number) => (
              <PageButton key={number} active={page === number} onClick={() => onPageChange(number)}>
                {number}
              </PageButton>
            ))}
          {pageCount > 5 && <PageButton disabled>•••</PageButton>}
          {pageCount > 4 && <PageButton onClick={() => onPageChange(pageCount)}>{pageCount}</PageButton>}
          <PageButton
            label="Next page"
            disabled={page === pageCount || pageCount === 0}
            onClick={() => onPageChange(Math.min(pageCount, page + 1))}
          >
            <ChevronRight size={17} />
          </PageButton>
        </div>
      </div>
    </section>
  );
}

function PageButton({ children, active = false, disabled = false, label, onClick }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`flex h-10 min-w-10 items-center justify-center rounded-md px-3 transition-colors disabled:opacity-40 ${
        active ? "bg-[#060853] text-white" : "bg-white text-[#4d4d55]"
      }`}
    >
      {children}
    </button>
  );
}

function EmptyOrders() {
  return (
    <section className="flex min-h-[650px] flex-col items-center justify-center pb-16 text-center">
      <Image src="/images/no_order.png" alt="No orders yet" width={520} height={376} className="h-auto w-full max-w-[520px]" />
      <h2 className="mt-5 text-2xl font-bold text-black">No Orders Yet</h2>
      <Link
        href="/"
        className="mt-20 min-w-52 rounded-lg bg-[#060853] px-8 py-3 text-sm text-white hover:bg-[#111175]"
      >
        Make Order
      </Link>
    </section>
  );
}
