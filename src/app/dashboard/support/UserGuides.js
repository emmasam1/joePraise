"use client";
import React from "react";

const UserGuidesPage = () => {
  const guideSections = [
    {
      title: "Getting Started",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500sLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...",
    },
    {
      title: "Market Place",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500sLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...",
    },
  ];

  return (
    <div className="px-5 mt-5 relative">
      {/* HEADER SECTION */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Welcome To JoePraiseSmart Hub
        </h1>
        <p className="text-[#4A4A4A] text-sm max-w-xl mx-auto leading-relaxed font-medium">
          This guide is designed to provide you with a clear
          <br />
          understanding of how to navigate and use the key features of
          <br />
          Blendstudy
        </p>
      </div>

      {/* GUIDE CARDS */}
      <div className="space-y-6">
        {guideSections.map((section, index) => (
          <div
            key={index}
            className="bg-[#F4F8FB] rounded-xl p-10 transition-all hover:shadow-sm"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {section.title}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed max-w-4xl">
              {section.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserGuidesPage;
