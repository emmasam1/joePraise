"use client";
import React from "react";
import { Input, Badge, Avatar } from "antd";
import {
  AppstoreOutlined,
  ShoppingCartOutlined,
  TagOutlined,
  UserOutlined,
  CreditCardOutlined,
  BarChartOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  // --- HIDE LOGIC ---
  const isProfilePage =
    pathname.includes("/business-management/") &&
    pathname.split("/business-management/")[1]?.length > 0;

  const isDispute =
    pathname.includes("/order-monitoring/") &&
    pathname.split("/order-monitoring/")[1]?.length > 0;

  const isViewDocs =
    pathname.includes("/verification-center") &&
    pathname.split("/verification-center")[1]?.length > 0;

  if (isProfilePage || isDispute || isViewDocs) {
    return (
      <div className="h-screen w-full bg-[#F8FAFC] overflow-y-auto font-sans">
        {children}
      </div>
    );
  }

  // --- MENU ITEMS ---
  const menuItems = [
    { label: "Overview", icon: <AppstoreOutlined />, href: "/admin-dashboard" },
    {
      label: "Business Management",
      icon: <ShoppingCartOutlined />,
      href: "/admin-dashboard/business-management",
    },
    {
      label: "Customer Management",
      icon: <TagOutlined />,
      href: "/admin-dashboard/customer-management",
    },
    {
      label: "Order Monitoring",
      icon: <UserOutlined />,
      href: "/admin-dashboard/order-monitoring",
    },
    {
      label: "Verification Center",
      icon: <CreditCardOutlined />,
      href: "/admin-dashboard/verification-center",
    },
    {
      label: "Trust Score Management",
      icon: <BarChartOutlined />,
      href: "/admin-dashboard/trust-score-management",
    },
    {
      label: "Payments & Subscription",
      icon: <BarChartOutlined />,
      href: "/admin-dashboard/payments-and-subscription",
    },
    {
      label: "Reports & Analytics",
      icon: <BarChartOutlined />,
      href: "/admin-dashboard/analytics",
    },
    {
      label: "Revenue",
      icon: <BarChartOutlined />,
      href: "/admin-dashboard/revenue",
    },
  ];

  const generalItems = [
    {
      label: "Settings",
      icon: <SettingOutlined />,
      href: "/dashboard/settings",
    },
    {
      label: "Logout",
      icon: <LogoutOutlined />,
      href: "/logout",
      color: "text-red-500",
    },
  ];

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] overflow-hidden font-sans p-4">
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-white border border-gray-100 flex flex-col h-full shrink-0 rounded-lg relative">
        <div className="p-6">
          <div className="flex justify-center items-center">
            <img src="/images/logo_sm.png" alt="Logo" className="h-10" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 space-y-8">
          <div>
            <p className="text-[14px] uppercase font-bold text-black mb-4 px-2 tracking-widest">
              Menu
            </p>
            <nav className="space-y-1 relative">
              {menuItems.map((item) => {
                // Check if it's the exact home path OR a sub-path of a non-root route
                const isActive =
                  item.href === "/admin-dashboard"
                    ? pathname === "/admin-dashboard"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all
        ${isActive ? "bg-[#060853] text-white" : "text-gray-500 hover:bg-gray-50"}`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div>
            <p className="text-[14px] uppercase font-bold text-black mb-4 px-2 tracking-widest">
              General
            </p>
            <nav className="space-y-1">
              {generalItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all
                      ${isActive ? "bg-[#060853] text-white" : item.color || "text-gray-500 hover:bg-gray-50"}`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white border border-gray-100 ml-5 flex items-center justify-between px-8 shrink-0 rounded-lg">
          <div className="w-full max-w-md">
            <Input
              prefix={
                <img
                  src="/images/search.png"
                  alt="search"
                  className="h-6 opacity-40"
                />
              }
              placeholder="Search"
              className="rounded-full bg-gray-50 border-none h-10 w-50"
            />
          </div>

          <div className="flex items-center gap-6">
            <Badge count={12} size="small" color="#060853">
              <img
                src="/images/message.png"
                alt="msg"
                className="h-6 cursor-pointer"
              />
            </Badge>
            <Badge count={12} size="small" color="#060853">
              <img
                src="/images/bell.png"
                alt="bell"
                className="h-6 cursor-pointer"
              />
            </Badge>

            <div className="flex items-center gap-3 p-1.5 pr-4 rounded-full border border-gray-50 bg-white shadow-sm">
              <Avatar src="https://i.pravatar.cc/150?u=michelle" size={36} />
              <div className="flex flex-col text-right">
                <span className="text-[11px] font-bold text-gray-900 leading-tight">
                  Michelle Ajoma
                </span>
                <span className="text-[9px] text-gray-400">
                  Lush Hair Beauty Salon
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto ml-5">{children}</main>
      </div>
    </div>
  );
}
