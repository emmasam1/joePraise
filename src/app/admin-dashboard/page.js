"use client";
import React, { useEffect } from "react";
import { Button, Avatar } from "antd";
import {
  UserOutlined,
  UserAddOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";
import { useAuthStore } from "@/store/authStore";
import { useAdminDashboardStore } from "@/store/adminDashboardStore";
import CompanyLoader from "@/components/Loader";


const Page = () => {
  const user = useAuthStore((state) => state.user);

const {
  dashboard,
  dashboardLoading,
  getDashboard,
} = useAdminDashboardStore();

useEffect(() => {
  getDashboard();
}, [getDashboard]);
  
  const statsCard = [
  {
    id: 1,
    title: "Total Businesses",
    value: dashboard?.overview?.totalBusinesses || 0,
  },
  {
    id: 2,
    title: "Total Revenue",
    value: `$${dashboard?.finance?.revenue || 0}`,
  },
  {
    id: 3,
    title: "Pending Verification",
    value: dashboard?.businesses?.pending || 0,
  },
  {
    id: 4,
    title: "Trusted Customers",
    value: dashboard?.customers?.verified || 0,
  },
];
  
  const orderTrendsData = [
    { name: "Mon", Orders: 1800 },
    { name: "Tue", Orders: 2100 },
    { name: "Wed", Orders: 2800 },
    { name: "Thur", Orders: 4100 },
    { name: "Fri", Orders: 3200 },
    { name: "Sat", Orders: 2200 },
    { name: "Sun", Orders: 2000 },
  ];

  // Data for the Activity Overview Line Chart
  const lineChartData = [
    { name: "Mon", Visitors: 20000, Orders: 5000 },
    { name: "Tue", Visitors: 24000, Orders: 15000 },
    { name: "Wed", Visitors: 11000, Orders: 17000 },
    { name: "Thur", Visitors: 28000, Orders: 8000 },
    { name: "Fri", Visitors: 22000, Orders: 25000 },
    { name: "Sat", Visitors: 25000, Orders: 29000 },
  ];

  // Data for the Business Growth Bar Chart
  // const barChartData = [
  //   { name: "Jan", Growth: 23000 },
  //   { name: "Feb", Growth: 31000 },
  //   { name: "Mar", Growth: 55000 },
  //   { name: "Apr", Growth: 70000 },
  //   { name: "May", Growth: 83000 },
  //   { name: "Jun", Growth: 96000 },
  // ];

  const monthNames = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const barChartData =
  dashboard?.charts?.businessGrowth?.map((item) => ({
    name: monthNames[item._id.month],
    Growth: item.total,
  })) || [];

  const pendingBusinesses = dashboard?.pendingVerificationQueue || [];

  const recentOrders = dashboard?.recentOrders || [];

if (dashboardLoading) return <CompanyLoader />


  return (
    <div className="space-y-6 font-sans bg-[#F4F7FE] p-6 min-h-screen pb-12">
      {/* Header */}
      <div className="flex justify-between items-center mt-5">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
        </div>
        <Button className="p-4.5! bg-[#060853]! rounded-lg border-none! text-white! flex items-center gap-2">
          <img src="/images/upload.png" alt="export" className="h-4" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-[#E2EDFC] p-4 rounded-xl">
        {statsCard.map((card) => {
          return (
            <div
              key={card.id}
              className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-3"
            >
              <div className="flex items-center gap-2 border-b border-gray-50 pb-2">
                <img src="/images/cube.png" alt="cube" className="h-6" />
                <h3 className="font-bold text-sm text-gray-500">{card.title}</h3>
              </div>
              <p className="text-2xl font-bold text-[#060853]">{card.value}</p>
            </div>
          );
        })}
      </div>

      {/* Split Charts Section Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Activity Overview Line Chart */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between min-h-[420px]">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-bold text-gray-900">Activity Overview</h3>
              <div className="flex gap-4 text-xs font-bold">
                <div className="flex items-center gap-1.5 text-[#10B981]">
                  <span className="w-4 h-1.5 rounded-full bg-[#10B981]" /> Visitors
                </div>
                <div className="flex items-center gap-1.5 text-[#060853]">
                  <span className="w-4 h-1.5 rounded-full bg-[#060853] border-t border-dashed" /> Orders
                </div>
              </div>
            </div>

            <div className="h-56 w-full text-[10px] font-medium text-gray-400">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} stroke="#9CA3AF" className="font-semibold text-xs" />
                  <YAxis tickLine={false} axisLine={false} stroke="#9CA3AF" tickFormatter={(value) => `${value / 1000}K`} />
                  <Tooltip />
                  <Line type="monotone" dataKey="Visitors" stroke="#10B981" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="Orders" stroke="#060853" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex gap-8 border-t border-gray-100 pt-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-[#10B981]">
                <UserOutlined />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 flex items-center gap-1">
                  {/* <span className="text-[#10B981]">👥</span> 3.2k */}
                  {dashboard?.overview?.totalUsers || 0}
                  <span className="text-xs font-medium text-gray-400 ml-1">Active Users</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-[#060853]">
                <UserAddOutlined />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 flex items-center gap-1">
                  {/* <span className="text-[#060853]">👥</span> 1.6k */}
                  {dashboard?.customers?.verified || 0}
                  <span className="text-xs font-medium text-gray-400 ml-1">New Signups</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Business Growth Bar Chart */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between min-h-[420px]">
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-2">Business Growth</h3>
            <div className="h-px bg-gray-100 w-full mb-4" />

            <div className="flex justify-end mb-4">
              <span className="text-emerald-500 font-bold text-xs bg-emerald-50/60 px-2.5 py-1 rounded-md flex items-center gap-1">
                <ArrowUpOutlined className="text-[10px]" /> 12% <span className="text-gray-400 font-medium">this month</span>
              </span>
            </div>

            <div className="h-64 w-full mt-6 text-[10px] font-medium text-gray-400">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} stroke="#9CA3AF" className="font-semibold text-xs" />
                  <YAxis tickLine={false} axisLine={false} stroke="#9CA3AF" tickFormatter={(value) => `${value / 1000}K`} />
                  <Tooltip cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="Growth" fill="#10B981" radius={[4, 4, 0, 0]} maxBarSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>

      {/* NEW SECTION: Order Trends Big Area Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h3 className="text-base font-bold text-gray-900">Order Trends</h3>
            <span className="text-xs text-gray-500 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#060853]" /> Average Daily Orders: <strong>181</strong>
            </span>
          </div>
          <div className="bg-gray-100 p-1 rounded-lg flex gap-1 text-xs font-semibold">
            <span className="bg-[#060853] text-white px-3 py-1 rounded-md cursor-pointer">Daily</span>
            <span className="text-gray-500 px-3 py-1 cursor-pointer">Weekly</span>
          </div>
        </div>

        <div className="h-56 w-full text-[10px] font-medium text-gray-400">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={orderTrendsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="orderGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#060853" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#060853" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} stroke="#9CA3AF" className="font-semibold text-xs" />
              <YAxis tickLine={false} axisLine={false} stroke="#9CA3AF" tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip />
              <Area type="monotone" dataKey="Orders" stroke="#060853" strokeWidth={2.5} fillOpacity={1} fill="url(#orderGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* NEW SECTION: Lower Verification Lists Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Verify Businesses Panel */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold text-gray-900">Verify Businesses</h3>
            <span className="text-xs font-semibold text-gray-400 cursor-pointer hover:text-gray-600">See All</span>
          </div>
          <div className="divide-y divide-gray-50">
            {pendingBusinesses.map((biz) => (
              <div key={biz._id} className="flex items-center justify-between py-3.5">
                <div className="flex items-center gap-3">
                  <Avatar size={44} src={biz.logo?.url} icon={<UserOutlined />} className="border border-gray-100" />
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{biz.businessName}</h4>
                    <p className="text-xs text-gray-400 truncate max-w-[240px] sm:max-w-xs">{biz.category.name}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-orange-500 bg-orange-50/60 px-2.5 py-1 rounded-md">
                  {biz.verificationStatus}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders Tracker Panel */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold text-gray-900">Recent Orders</h3>
            <Button size="small" className="text-xs font-semibold text-white bg-[#060853] hover:bg-[#060853]/90 border-none rounded-md">
              Manage
            </Button>
          </div>
          <div className="divide-y divide-gray-50">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-gray-50 rounded border border-gray-200 flex items-center justify-center text-[10px]">📈</div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{order.action?.replaceAll("_", " ")}</h4>
                    <p className="text-xs text-gray-400">{order.admin?.name || "No Recent Order"}</p>
                  </div>
                </div>
                <div className="text-right">
                  <h4 className="text-xs font-bold text-gray-900">{order.location || "No location"}</h4>
                  <p className="text-[10px] text-gray-400 font-medium">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Page;