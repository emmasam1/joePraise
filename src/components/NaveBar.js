"use client";
import React, { useState } from "react";
import { Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import this

const NaveBar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname(); // Get current path (e.g., "/" or "/pricing")

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Pricing", path: "/pricing" },
    { label: "Support", path: "/support" },
    { label: "Who We Are", path: "/who-we-are" },
    { label: "List Your Business", path: "/list-your-business" },
  ];

  return (
    <section className="w-full bg-white px-6 py-4 md:px-12 ">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <img src="/images/logo_sm.png" alt="Logo" className="h-10 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => {
            // Check if current path matches the link path
            const isActive = pathname === link.path;

            return (
              <Link
                key={link.label}
                href={link.path}
                className={`text-[15px] font-medium transition-colors ${
                  isActive
                    ? "text-black font-semibold" // Active style
                    : "text-gray-400 hover:text-[#060853]" // Inactive style
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="business-registration">
            <Button className="h-12 px-12! border-[#060853]! text-[#060853]! font-bold rounded-xl hover:bg-gray-50">
              Register
            </Button>
          </Link>
          <Link href="/login">
            <Button className="h-12 px-12! bg-[#060853]! text-white! font-bold rounded-xl border-none hover:bg-[#0a0d6b]!">
              Sign in
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-2xl text-[#060853]"
          onClick={() => setOpen(true)}
        >
          <MenuOutlined />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <Drawer
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
        size={280}
      >
        <div className="flex flex-col gap-6 pt-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.label}
                href={link.path}
                onClick={() => setOpen(false)}
                className={`text-lg font-bold ${isActive ? "text-[#060853]" : "text-gray-400"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </Drawer>
    </section>
  );
};

export default NaveBar;
