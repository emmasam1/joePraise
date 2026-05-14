"use client";
import React, { useState } from "react";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
// Assuming you have your Checkout/Component files ready
import PaymentCheckout from "@/components/PaymentCheckout";
import FAQs from "./FAQs";
import Tutorials from "./Tutorials";
import UserGuides from "./UserGuides";
import SupportTicket from "./SupportTicket";

const SupportPage = () => {
  const [activeTab, setActiveTab] = useState(null);

  const tabs = [
    { id: "FAQs", label: "FAQs" },
    { id: "Tutorials", label: "Tutorials" },
    { id: "User Guides", label: "User Guides" },
    { id: "Support Ticket System", label: "Support Ticket System" },
  ];

  // This function renders the component based on selection
  const renderComponent = () => {
    switch (activeTab) {
      case "FAQs":
        return (
          <div>
            <button
              onClick={() => setActiveTab(null)}
              className="text-[#060853] font-bold flex items-center gap-2 mb-4 cursor-pointer"
            >
              <LeftOutlined /> Back to Support
            </button>
            <FAQs />
          </div>
        );
      case "Tutorials":
        return (
          <div>
            <button
              onClick={() => setActiveTab(null)}
              className="text-[#060853] font-bold flex items-center gap-2 mb-4 cursor-pointer"
            >
              <LeftOutlined /> Back to Support
            </button>
            <Tutorials />
          </div>
        );
      case "User Guides":
        return (
          <div>
            <button
              onClick={() => setActiveTab(null)}
              className="text-[#060853] font-bold flex items-center gap-2 mb-4 cursor-pointer"
            >
              <LeftOutlined /> Back to Support
            </button>
            <UserGuides />
          </div>
        );
      case "Support Ticket System":
        return (
          <div>
            <button
              onClick={() => setActiveTab(null)}
              className="text-[#060853] font-bold flex items-center gap-2 mb-4 cursor-pointer"
            >
              <LeftOutlined /> Back to Support
            </button>
            <SupportTicket />
          </div>
        );
      default:
        return (
          <div className="p-10 text-center">
            <button
              onClick={() => setActiveTab(null)}
              className="text-[#060853] font-bold flex items-center gap-2 mb-4"
            >
              <LeftOutlined /> Back to Support
            </button>
            <h2 className="text-xl font-bold">
              {activeTab} Content Coming Soon
            </h2>
            {}
          </div>
        );
    }
  };

  return (
    <div className="mt-5 px-5">
      {/* If no tab is active, show the list. Otherwise, show the component */}
      {!activeTab ? (
        <>
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Support</h1>
          <div className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="cursor-pointer w-full flex justify-between items-center py-5 px-2 hover:bg-gray-50 transition-colors group"
              >
                <span className="text-lg font-semibold text-[#4A4A4A] group-hover:text-[#060853]">
                  {tab.label}
                </span>
                <img
                  src="/images/arrow_right_dark.png"
                  alt="arrow right"
                  className="w-4 h-4"
                />
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          {renderComponent()}
        </div>
      )}
    </div>
  );
};

export default SupportPage;
