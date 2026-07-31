"use client";

import Image from "next/image";
import { Table } from "antd";
import {
  ArrowUp,
  Box,
  CheckCheck,
  EllipsisVertical,
  Upload,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const recentOrders = [
  { key: "1", id: "#0045", product: "Consulting", business: "Tech Haven", date: "09/12/2025", amount: "$250", status: "Accepted" },
  { key: "2", id: "#0067", product: "Furniture", business: "Home Essentials", date: "15/12/2025", amount: "$100", status: "Pending" },
  { key: "3", id: "#0085", product: "Catering", business: "Bie Kitchen", date: "19/12/2025", amount: "$50", status: "Completed" },
  { key: "4", id: "#0067", product: "Mechanic", business: "Auto Works", date: "15/12/2025", amount: "$100", status: "Accepted" },
  { key: "5", id: "#0085", product: "Clothing", business: "Fashion Hub", date: "19/12/2025", amount: "$50", status: "Completed" },
];

const spendingData = [
  { month: "Feb", value: 1900 },
  { month: "", value: 1850 },
  { month: "Mar", value: 1950 },
  { month: "", value: 2250 },
  { month: "Mar", value: 2850 },
  { month: "", value: 2450 },
  { month: "April", value: 3250 },
  { month: "", value: 4000 },
  { month: "April", value: 3200 },
  { month: "", value: 2850 },
  { month: "May", value: 2200 },
  { month: "", value: 1950 },
  { month: "May", value: 2550 },
  { month: "", value: 2150 },
];

const orderStatusData = [
  { month: "Jan", Completed: 15, Pending: 8, Accepted: 4 },
  { month: "Feb", Completed: 17, Pending: 3, Accepted: 1 },
  { month: "Mar", Completed: 13, Pending: 3, Accepted: 4 },
  { month: "Apr", Completed: 13, Pending: 8, Accepted: 6 },
];

const stats = [
  { title: "Total Orders", value: 100, change: "12%", color: "#060853", icon: "/images/cube.png" },
  { title: "Completed Orders", value: 50, change: "12%", color: "#16bd89", icon: "/images/green_cube.png" },
  { title: "Pending Orders", value: 5, change: "-1.2%", color: "#ffc400", icon: "/images/yellow_cube.png", negative: true },
  { title: "Accepted Orders", value: 45, change: "12%", color: "#060853", icon: "/images/cube.png" },
];

const statusColors = {
  Accepted: "text-[#060853]",
  Pending: "text-[#f5b82e]",
  Completed: "text-[#12bd89]",
};

const columns = [
  {
    title: "",
    key: "select",
    width: 45,
    render: () => <CheckCheck size={15} className="text-[#6d7481]" />,
  },
  {
    title: "Order ID",
    dataIndex: "id",
    key: "id",
    render: (value) => <span className="font-bold text-[#252525]">{value}</span>,
  },
  { title: "Product/Service", dataIndex: "product", key: "product" },
  { title: "Business Name", dataIndex: "business", key: "business" },
  { title: "Date", dataIndex: "date", key: "date" },
  { title: "Amount", dataIndex: "amount", key: "amount" },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (value) => <span className={statusColors[value]}>{value}</span>,
  },
  {
    title: "",
    key: "action",
    width: 45,
    render: () => <button aria-label="Order actions"><EllipsisVertical size={17} /></button>,
  },
];

export default function CustomerDashboardPage() {
  const hasOrders = recentOrders.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-black sm:text-2xl">Customer Overview</h1>
        <button className="flex h-10 items-center gap-2 rounded-lg bg-[#060853] px-4 text-xs font-medium text-white hover:bg-[#101079]">
          <Upload size={15} />
          Export Report
        </button>
      </div>

      <section className="grid grid-cols-1 gap-4 rounded-xl bg-[#E2EDFC] p-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <article key={item.title} className="rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm">
            <div className="flex items-center gap-3 border-b border-[#e2e5ea] pb-2">
              <Image src={item.icon} alt="" width={22} height={22} className="h-[22px] w-[22px] object-contain" />
              <h2 className="text-sm font-semibold text-[#555]">{item.title}</h2>
            </div>
            <p className="mt-2 text-[30px] leading-none text-black">{hasOrders ? item.value : 0}</p>
            <div className="mt-2 flex items-center gap-1 text-xs text-[#606066]">
              <ArrowUp size={13} strokeWidth={2.5} style={{ color: item.negative ? "#ff4444" : "#12bd89" }} />
              <span style={{ color: item.negative ? "#ff4444" : "#12bd89" }}>{hasOrders ? item.change : "0%"}</span>
              <span>this month</span>
            </div>
          </article>
        ))}
      </section>

      {hasOrders ? <PopulatedDashboard /> : <EmptyDashboard />}
    </div>
  );
}

function PopulatedDashboard() {
  return (
    <>
      <ChartCard
        eyebrow="Analytics"
        title="Total Spending Trends"
        legend={<><span className="h-2 w-2 rounded-full bg-[#060853]" /> Average Monthly Orders: <strong>150k</strong></>}
      >
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
          <AreaChart data={spendingData} margin={{ top: 15, right: 15, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="spendingFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#cbc8ff" stopOpacity={0.85} />
                <stop offset="100%" stopColor="#ffffff" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#e9eaf2" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#66668b", fontSize: 12 }} dy={13} />
            <YAxis axisLine={false} tickLine={false} domain={[0, 4500]} ticks={[0, 1000, 2000, 3000, 4000]} tickFormatter={(v) => v === 0 ? "0" : `${v / 1000}k`} tick={{ fill: "#66668b", fontSize: 12 }} />
            <Tooltip contentStyle={{ borderRadius: 8, background: "#20203c", color: "white", border: 0 }} formatter={(value) => [`$${value}`, "Spending"]} />
            <Area type="monotone" dataKey="value" stroke="#060853" strokeWidth={3} fill="url(#spendingFill)" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard
        eyebrow="Statistics"
        title="Orders Status"
        legend={
          <>
            <Legend color="#16bd89" label="Completed" />
            <Legend color="#ffc241" label="Pending" />
            <Legend color="#060853" label="Accepted" />
          </>
        }
      >
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
          <BarChart data={orderStatusData} margin={{ top: 20, right: 15, left: -10, bottom: 0 }} barGap={12}>
            <CartesianGrid vertical={false} stroke="#eef0f5" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#66668b", fontSize: 13, fontWeight: 600 }} dy={13} />
            <YAxis axisLine={false} tickLine={false} domain={[0, 20]} tick={{ fill: "#66668b", fontSize: 11 }} />
            <Tooltip cursor={{ fill: "#f6f7fc" }} />
            <Bar dataKey="Completed" fill="#16bd89" radius={[9, 9, 9, 9]} maxBarSize={42} />
            <Bar dataKey="Pending" fill="#ffc241" radius={[9, 9, 9, 9]} maxBarSize={42} />
            <Bar dataKey="Accepted" fill="#060853" radius={[9, 9, 9, 9]} maxBarSize={42} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-lg font-bold text-[#20203d]">Recent Orders</h2>
        <div className="overflow-x-auto">
          <Table columns={columns} dataSource={recentOrders} pagination={false} className="custom-table min-w-[850px]" size="small" />
        </div>
        <div className="pt-4 text-right">
          <button className="text-[11px] font-semibold text-[#12bd89]">View More...</button>
        </div>
      </section>
    </>
  );
}

function ChartCard({ eyebrow, title, legend, children }) {
  return (
    <section className="rounded-2xl border border-[#eff0f3] bg-white p-5 shadow-sm sm:p-7">
      <div className="flex flex-col justify-between gap-4 border-b border-[#ececf2] pb-5 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-[#9a99b4]">{eyebrow}</p>
          <h2 className="text-lg font-bold text-[#20203d]">{title}</h2>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs text-[#777594]">
          <div className="flex items-center gap-2">{legend}</div>
          <div className="ml-auto flex rounded-xl bg-[#f8f8fc] p-1">
            <button className="rounded-lg px-4 py-2 text-[#aaa9bd]">Weekly</button>
            <button className="rounded-lg bg-[#20203d] px-4 py-2 text-white">Monthly</button>
          </div>
        </div>
      </div>
      <div className="mt-3 h-[290px]">{children}</div>
    </section>
  );
}

function Legend({ color, label }) {
  return (
    <span className="flex items-center gap-2">
      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}

function EmptyDashboard() {
  return (
    <>
      <section className="flex min-h-[570px] flex-col items-center justify-center rounded-2xl border border-[#eff0f3] bg-white px-6 text-center shadow-sm">
        <Image src="/images/no_order.png" alt="No orders yet" width={480} height={347} className="h-auto w-full max-w-[480px]" />
        <h2 className="mt-2 text-2xl font-bold text-black">Welcome to Your Dashboard!</h2>
        <p className="mt-2 text-sm text-[#67676d]">Track your money spent on orders, order status and recent orders</p>
        <button className="mt-6 min-w-48 rounded-lg bg-[#060853] px-8 py-3 text-sm text-white">Get Started</button>
        <p className="mt-6 text-sm text-[#67676d]">No data yet, Start making orders and appointment to see your analytics here</p>
      </section>
      <div className="grid gap-7 lg:grid-cols-2">
        <EmptyPanel title="Order Status" />
        <EmptyPanel title="Recent Order" message />
      </div>
    </>
  );
}

function EmptyPanel({ title, message = false }) {
  return (
    <section className="min-h-[380px] rounded-2xl border border-[#eff0f3] bg-white p-8 shadow-sm">
      <h2 className="border-b border-[#ececf2] pb-7 text-xl font-bold text-[#20203d]">{title}</h2>
      {message && (
        <div className="flex h-[260px] flex-col items-center justify-center text-center">
          <Box size={28} className="mb-3 text-[#060853]" />
          <p className="text-lg font-bold text-black">Not enough data yet</p>
          <p className="mt-2 text-sm text-[#67676d]">Start making orders to unlock insights</p>
        </div>
      )}
    </section>
  );
}
