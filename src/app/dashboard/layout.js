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
  QuestionCircleOutlined,
  LogoutOutlined,
  DownOutlined,
  UpOutlined,
  MenuOutlined,
  CloseOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import CompanyLoader from "@/components/Loader";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = useAuthStore((state) => state.logout);
  const {user, authLoading} = useAuthStore();

  // State to handle the absolute pop-out menu
  const [isRevenueOpen, setIsRevenueOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);


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

  const menuItems = [
    { label: "Overview", icon: <AppstoreOutlined />, href: "/dashboard" },
    {
      label: "Orders",
      icon: <ShoppingCartOutlined />,
      href: "/dashboard/orders",
    },
    {
      label: "Products/Services",
      icon: <TagOutlined />,
      href: "/dashboard/products",
    },
    { label: "Customers", icon: <UserOutlined />, href: "/dashboard/customer" },
    // {
    //   label: "Subscription",
    //   icon: <CreditCardOutlined />,
    //   href: "/dashboard/subscription",
    // },
    { label: "Analytics", icon: <BarChartOutlined />, href: "/dashboard/analytics" },
  ];

  const generalItems = [
    {
      label: "Back to Home",
      icon: <HomeOutlined />,
      href: "/",
    },
    {
      label: "Settings",
      icon: <SettingOutlined />,
      href: "/dashboard/settings",
    },
    {
      label: "Support",
      icon: <QuestionCircleOutlined />,
      href: "/dashboard/support",
    },
    {
      label: "Policies & Resources",
      icon: <CreditCardOutlined />,
      href: "/dashboard/policies",
    },
    { 
      label: "Logout", 
      icon: <LogoutOutlined />, 
      onClick: handleLogout,
      color: "text-red-500" 
    },
  ];

    if (authLoading) return <CompanyLoader />

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
            <Link href="/" aria-label="Go to home">
              <img src="/images/logo_sm.png" alt="Logo" className="h-10" />
            </Link>
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
          {/* Menu Section */}
          <div>
            <p className="text-[14px] uppercase font-bold text-black mb-4 px-2 tracking-widest">
              Menu
            </p>
            <nav className="space-y-1 relative">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
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

              {/* REVENUE DROPDOWN SECTION */}
              <div className="relative">
                <button
                  onClick={() => setIsRevenueOpen(!isRevenueOpen)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all
                    ${isRevenueOpen || pathname.includes("revenue") ? "bg-[#060853] text-white" : "text-gray-500 hover:bg-gray-50"}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">
                      <BarChartOutlined />
                    </span>
                    Revenue
                  </div>
                  <span className="text-[10px]">
                    {isRevenueOpen ? <UpOutlined /> : <DownOutlined />}
                  </span>
                </button>

                {/* ABSOLUTE POP-OUT MENU - Does not alter UI flow */}
                {isRevenueOpen && (
                  <div className="absolute right-0 -bottom-25 w-44 bg-white border border-gray-100 shadow-2xl rounded-xl py-2 z-[999]">
                    <Link
                      href="/dashboard/revenue"
                      onClick={() => setIsRevenueOpen(false)}
                      className={`cursor-pointer block px-6 py-2.5 text-sm font-medium hover:bg-gray-50 ${pathname === "/dashboard/revenue" ? "text-[#060853] bg-gray-50" : "text-gray-700"}`}
                    >
                      Revenue
                    </Link>
                    <Link
                      href="/dashboard/revenue/wallet"
                      onClick={() => setIsRevenueOpen(false)}
                      className={`block px-6 py-2.5 text-sm font-medium hover:bg-gray-50 ${pathname === "/dashboard/revenue/wallet" ? "text-[#060853] bg-gray-50" : "text-gray-700"}`}
                    >
                      Wallet
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* General Section */}
          <div>
            <p className="text-[14px] uppercase font-bold text-black mb-4 px-2 tracking-widest">
              General
            </p>
            <nav className="space-y-1">

               {generalItems.map((item) => {
                  const isActive = pathname === item.href;

                  // HANDLE BUTTON ACTIONS (LIKE LOGOUT)
                  if (item.onClick) {
                    return (
                      <button
                        key={item.label}
                        onClick={item.onClick}
                        className={`w-full flex cursor-pointer items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all text-left
                          ${item.color || "text-gray-500 hover:bg-gray-50"}`}
                      >
                        <span className="text-lg">{item.icon}</span>
                        {item.label}
                      </button>
                    );
                  }

                  // HANDLE NORMAL LINKS
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
              className="hidden rounded-full! bg-gray-50 border-none h-10 w-50! sm:flex"
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
              <Avatar src={user?.avatar?.url} size={36} />
              <div className="hidden flex-col text-right sm:flex">
                <span className="text-[11px] font-bold text-gray-900 leading-tight">
                  {user?.name}
                </span>
                <span className="text-[9px] text-gray-400">
                 {user?.business?.businessName || user?.role}
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
