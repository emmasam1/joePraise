"use client";
import React, { useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";

const TutorialsPage = ({ onBack }) => {
  const [expandedId, setExpandedId] = useState(null);

  const tutorialData = [
    {
      id: 1,
      title: "What is the purpose of the platform",
      shortText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
      fullText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. It was popularized in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages."
    },
    {
      id: 2,
      title: "How to manage your wallet",
      shortText: "Learn how to track your daily earnings and request payouts efficiently...",
      fullText: "Our wallet system allows you to view daily, weekly, and monthly earnings at a glance. You can request payouts directly to your bank account, which are processed within 24-48 business hours."
    },
    {
      id: 3,
      title: "Setting up your business profile",
      shortText: "Configure your salon or clinic details to start accepting bookings...",
      fullText: "Go to settings to upload your logo, set your business hours, and define the services you offer. This information is what customers see when they book through your unique link."
    }
  ];

  return (
    <div className="px-5 mt-5 relative">
   
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Tutorials</h1>

      <div className="space-y-4">
        {tutorialData.map((item) => {
          const isExpanded = expandedId === item.id;
          
          return (
            <div 
              key={item.id}
              onClick={() => setExpandedId(isExpanded ? null : item.id)}
              className="bg-[#E2EDFC59] rounded-sm p-6 flex gap-6 cursor-pointer hover:shadow-sm transition-all"
            >
              {/* ICON BOX */}
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-[#E2EDFC] rounded-lg flex items-center justify-center">
                  <img src="/images/live-help.png" alt="help" className="w-6 h-6 opacity-60" />
                </div>
              </div>

              {/* CONTENT */}
              <div className="flex-grow">
                <h2 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h2>
                <div className={`text-sm text-gray-500 leading-relaxed transition-all duration-300 ${isExpanded ? "" : "line-clamp-2"}`}>
                  {isExpanded ? item.fullText : item.shortText}
                </div>
                
                {/* {!isExpanded && (
                  <button className="text-[#060853] text-xs font-bold mt-2 hover:underline">
                    Read more
                  </button>
                )} */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TutorialsPage;