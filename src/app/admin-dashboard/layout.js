"use client";
import React, { useState } from "react";
import { Input, Badge, Avatar, Modal } from "antd";
import {
  AppstoreOutlined,
  ShoppingCartOutlined,
  TagOutlined,
  UserOutlined,
  CreditCardOutlined,
  BarChartOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useAdminDashboardStore } from "@/store/adminDashboardStore";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

    const router = useRouter();
  
    const logout = useAuthStore((state) => state.logout);

    const { dashboard } = useAdminDashboardStore();

  
  
    const handleLogout = () => {
      Modal.confirm({
        title: "Logout",
        content: "Are you sure you want to log out of JoePraise Smart Hub?",
        okText: "Yes, Logout",
        cancelText: "Stay",
        okButtonProps: { danger: true },
        onOk: () => {
          logout();
          router.push("/");
        },
      });
    };

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
    { label: "Overview", icon: "/images/dashboard.png", href: "/admin-dashboard" },
    {
      label: "Business Management",
      icon: "/images/business.png",
      href: "/admin-dashboard/business-management",
    },
    {
      label: "Customer Management",
      icon: "/images/customer.png",
      href: "/admin-dashboard/customer-management",
    },
    {
      label: "Product Management",
      icon: "/images/product.png",
      href: "/admin-dashboard/product-management",
    },
    {
      label: "Order Monitoring",
      icon: "/images/order.png",
      href: "/admin-dashboard/order-monitoring",
    },
    {
      label: "Verification Center",
      icon: "/images/verification.png",
      href: "/admin-dashboard/verification-center",
    },
    {
      label: "Trust Score Management",
      icon: "/images/trust.png",
      href: "/admin-dashboard/trust-score-management",
    },
    {
      label: "Payments & Subscription",
      icon: "/images/card.png",
      href: "/admin-dashboard/payments-and-subscription",
    },
    {
      label: "Reports & Analytics",
      icon: "/images/report.png",
      href: "/admin-dashboard/analytics",
    },
    {
      label: "Revenue",
      icon: "/images/revenue.png",
      href: "/admin-dashboard/revenue",
    },
    {
      label: "Policy Governance",
      icon: "/images/file.png",
      href: "/admin-dashboard/policies",
    },
  ];

  const generalItems = [
    {
      label: "Settings",
      icon: <SettingOutlined />,
      href: "/admin-dashboard/settings",
    },
    { 
     label: "Logout", 
     icon: <LogoutOutlined />, 
     onClick: handleLogout,
     color: "text-red-500" 
    },
  ];

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden bg-[#F8FAFC] p-2 font-sans sm:p-4 lg:h-screen lg:overflow-hidden">
      {/* --- SIDEBAR --- */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/35 lg:hidden"
        />
      )}
      <aside
        onClick={(event) => {
          if (event.target.closest("a")) setSidebarOpen(false);
        }}
        className={`fixed inset-y-2 left-2 z-50 flex w-64 shrink-0 flex-col rounded-lg border border-gray-100 bg-white transition-transform duration-200 sm:inset-y-4 sm:left-4 lg:static lg:h-full lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-[110%]"}`}
      >
        <div className="p-6">
          <div className="flex justify-center items-center">
            <img src="/images/logo_sm.png" alt="Logo" className="h-10" />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setSidebarOpen(false)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 lg:hidden"
            >
              <CloseOutlined />
            </button>
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
                    <img className="w-5" src={item.icon} alt={item.label}/>
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
            const isActive =
              item.href && pathname.startsWith(item.href);

            // If item has onClick, render button
            if (item.onClick) {
              return (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    item.color || "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </button>
              );
            }

            // Otherwise render link
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-[#060853] text-white"
                    : item.color || "text-gray-500 hover:bg-gray-50"
                }`}
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
        <header className="flex h-16 shrink-0 items-center justify-between rounded-lg border border-gray-100 bg-white px-3 sm:h-20 sm:px-5 lg:ml-5 lg:px-8">
          <div className="flex min-w-0 items-center gap-3 sm:w-full sm:max-w-md">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setSidebarOpen(true)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 lg:hidden"
            >
              <MenuOutlined />
            </button>
            <Input
              prefix={
                <img
                  src="/images/search.png"
                  alt="search"
                  className="h-6 opacity-40"
                />
              }
              placeholder="Search"
              className="hidden rounded-full bg-gray-50 border-none h-10 w-50 sm:flex"
            />
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
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
              <Avatar src={dashboard?.admin?.avatar?.url || "https://i.pravatar.cc/150?u=michelle"} size={36} />
              <div className="hidden flex-col text-right sm:flex">
                <span className="text-[11px] font-bold text-gray-900 leading-tight">
                 {dashboard?.admin?.name}
                </span>
                <span className="text-[9px] text-gray-400">
                  {dashboard?.admin?.role}
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto pt-3 lg:ml-5 lg:pt-0">{children}</main>
      </div>
    </div>
  );
}
