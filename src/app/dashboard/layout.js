"use client";
import React, { useState } from "react";
import { Input, Badge, Avatar } from "antd";
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
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = useAuthStore((state) => state.logout);

  // State to handle the absolute pop-out menu
  const [isRevenueOpen, setIsRevenueOpen] = useState(false);


  const handleLogout = () => {
    Modal.confirm({
      title: "Logout",
      content: "Are you sure you want to log out of JoePraise Smart Hub?",
      okText: "Yes, Logout",
      cancelText: "Stay",
      okButtonProps: { danger: true },
      onOk: () => {
        logout();
        router.push("/login");
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
    {
      label: "Subscription",
      icon: <CreditCardOutlined />,
      href: "/dashboard/subscription",
    },
    { label: "Analytics", icon: <BarChartOutlined />, href: "/dashboard/analytics" },
  ];

  const generalItems = [
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
    // {
    //   label: "Logout",
    //   icon: <LogoutOutlined />,
    //   href: "/logout",
    //   color: "text-red-500",
    // },
    { 
      label: "Logout", 
      icon: <LogoutOutlined />, 
      onClick: handleLogout,
      color: "text-red-500" 
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
                // ADD THIS LOGIC HERE
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
              className="rounded-full! bg-gray-50 border-none h-10 w-50!"
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

        <main className="flex-1 overflow-y-auto  ml-5">{children}</main>
      </div>
    </div>
  );
}
