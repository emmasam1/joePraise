"use client";
import React, { useState } from "react";
import { Input, Button, Table, Dropdown } from "antd";
import ProfileTab from "./ProfileTab";
import BusinessTab from "./BusinessTab";
import AccountTab from "./AccountTab";
import NotificationSetting from "./NotificationSetting";
import SecurityPage from "./SecurityPage";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [accountHeader, setAccountHeader] = useState("Account Settings");

  const tabs = [
    { id: "Profile", label: "Profile" },
    { id: "Business", label: "Business" },
    { id: "Account", label: "Account" },
    { id: "Notification", label: "Notification" },
    { id: "Security", label: "Security" },
    { id: "Wallet", label: "Wallet" },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-lg font-bold text-[#060853]">Business Settings</h1>
        <div className="flex gap-3">
          <Button className="p-4! border border-[#060853]! text-[#060853]! rounded-lg">
            Save Changes
          </Button>
          <Button className="p-4.5! bg-[#060853]! rounded-lg border-none! text-white!">
            <img src="/images/upload.png" alt="export" className="h-7" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Internal Sidebar Navigation */}
        <aside className="w-full lg:w-64 bg-white rounded-sm border border-gray-100 p-3 shrink-0 ">
          <nav className="flex flex-col gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#E0E7FF] text-[#060853]"
                    : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                }`}
              >
                {tab.label}
              </button>
            ))}

            {/* Delete Account Button */}
            <button className="text-left px-4 py-3 mt-12 text-sm font-bold text-orange-400 hover:text-orange-500 transition-all border-t border-gray-50 pt-6">
              Delete Account
            </button>
          </nav>
        </aside>

        {/* Dynamic Content Area */}

        <div className="flex-1 w-full">
          {/* DYNAMIC HEADER SECTION */}
          {activeTab === "Profile" ? (
            <span className="text-black text-lg font-semibold">
              Business Profile Setting
            </span>
          ) : activeTab === "Business" ? (
            <span className="text-black text-lg font-semibold">
              Business Location Setting
            </span>
          ) : activeTab === "Account" ? (
            <span className="text-black text-lg font-semibold">
              {accountHeader}
            </span>
          ) : activeTab === "Notification" ? (
            <span className="text-black text-lg font-semibold">
              Notification Setting
              </span>) : activeTab === "Security" ? (
                <span className="text-black text-lg font-semibold">
                  Security Setting
                </span>
              ) : activeTab === "Wallet" ? (
                <span className="text-black text-lg font-semibold">
                  Wallet Setting
                </span>
              ) : null}

          <div className="bg-white rounded-sm mt-3 border-2 border-blue-50 p-6 md:p-10 shadow-sm min-h-150">
            {activeTab === "Profile" && <ProfileTab />}
            {activeTab === "Business" && <BusinessTab />}
            {/* Pass the setter to AccountTab */}
            {activeTab === "Account" && (
              <AccountTab setHeaderTitle={setAccountHeader} />
            )}
            {activeTab === "Notification" && <NotificationSetting />}
            {activeTab === "Security" && <SecurityPage />}
            {activeTab === "Wallet" && <div>Wallet Settings Coming Soon...</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
