
"use client";

import { useState } from "react";
import {
  SearchOutlined,
  StarFilled,
  EnvironmentOutlined,
  CheckCircleFilled,
  ShareAltOutlined,
  MessageOutlined,
  SafetyCertificateFilled,
} from "@ant-design/icons";

const DirectoryDetails = ({ params }) => {
  const { id } = params;

  // ===============================
  // MOCK DATA (Replace with API later)
  // ===============================
  const business = {
    id,
    name: "Aurora Design Studio",
    verified: true,
    category: "Interior Design & Architecture Consultancy",
    logo: "/images/logo.png",

    rating: 4.9,
    totalReviews: 247,

    badges: [
      {
        title: "Verified Business",
        color: "bg-[#E9FFF7]",
        text: "text-[#10B981]",
      },
      {
        title: "Top Rated",
        color: "bg-[#FFF1F1]",
        text: "text-[#D64545]",
      },
      {
        title: "Top Rated",
        color: "bg-[#FFF8E7]",
        text: "text-[#F59E0B]",
      },
    ],

    about:
      "Aurora Design Studio transforms spaces into extraordinary experiences. With over 12 years of expertise in residential and commercial design, we blend innovation with functionality. Our award-winning team has completed over 500 successful projects across 15 cities, delivering personalized solutions that reflect your unique style and needs.",

    trustScore: {
      score: 87,
      max: 100,
      responseRate: 98,
      onTimeDelivery: 96,
      satisfaction: 94,
    },
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen">

      {/* ================= HEADER ================= */}

      <div className="max-w-7xl mx-auto py-10 px-4">

        <div className="flex flex-col lg:flex-row gap-8">

          {/* LEFT SIDE */}

          <div className="flex-1">

            {/* Business Header */}

            <div className="flex items-start gap-5">

              <div className="w-24 h-24 rounded-full bg-[#060853] flex items-center justify-center">

                <img
                  src={business.logo}
                  alt=""
                  className="w-14"
                />

              </div>

              <div className="flex-1">

                <div className="flex items-center gap-3">

                  <h1 className="text-4xl font-black text-[#060853]">
                    {business.name}
                  </h1>

                  {business.verified && (
                    <span className="bg-[#10B981] text-white text-[10px] px-3 py-1 rounded-full font-bold flex items-center gap-1">
                      <CheckCircleFilled />
                      Verified
                    </span>
                  )}

                </div>

                <p className="text-gray-500 mt-1 font-medium">
                  {business.category}
                </p>

                {/* Rating */}

                <div className="flex items-center gap-2 mt-4">

                  {[...Array(5)].map((_, i) => (
                    <StarFilled
                      key={i}
                      className="text-[#FFC107]"
                    />
                  ))}

                  <span className="font-bold">
                    {business.rating}
                  </span>

                  <span className="text-gray-400 text-sm">
                    ({business.totalReviews} reviews)
                  </span>

                </div>

                {/* Badges */}

                <div className="flex gap-3 mt-4 flex-wrap">

                  {business.badges.map((badge, index) => (

                    <div
                      key={index}
                      className={`${badge.color} ${badge.text} rounded-full px-4 py-2 text-xs font-bold`}
                    >
                      {badge.title}
                    </div>

                  ))}

                </div>

              </div>

            </div>

            {/* About */}

            <div className="mt-8 bg-white rounded-3xl p-8 border border-gray-100">

              <h2 className="font-bold text-[#060853] text-lg mb-4">
                About Us
              </h2>

              <p className="leading-8 text-gray-600">
                {business.about}
              </p>

              <button className="mt-4 text-red-500 text-sm font-bold">
                Read More
              </button>

            </div>

            {/* Buttons */}

            <div className="flex gap-4 mt-6">

              <button className="bg-[#060853] text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2">
                <ShareAltOutlined />
                Share Business
              </button>

              <button className="border border-[#060853] text-[#060853] px-6 py-3 rounded-lg font-bold flex items-center gap-2">
                <MessageOutlined />
                Message
              </button>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="w-full lg:w-[380px]">

            {/* Search */}

            <div className="bg-white rounded-full border px-5 py-3 flex items-center mb-6">

              <SearchOutlined className="text-gray-400" />

              <input
                placeholder="Search"
                className="ml-3 flex-1 outline-none"
              />

            </div>

            {/* Trust Score */}

            <div className="bg-[#060853] rounded-3xl text-white p-8">

              <div className="flex justify-between">

                <div>

                  <p className="text-sm opacity-80">
                    Trust Score
                  </p>

                  <h2 className="text-6xl font-black mt-3">

                    {business.trustScore.score}

                    <span className="text-lg font-normal">
                      /{business.trustScore.max}
                    </span>

                  </h2>

                </div>

                <div className="w-24 h-24 rounded-full bg-[#2D2A5F] flex items-center justify-center">

                  <SafetyCertificateFilled
                    style={{
                      fontSize: 40,
                      color: "#FFC107",
                    }}
                  />

                </div>

              </div>

              <div className="border-t border-white/20 mt-8 pt-8 space-y-5">

                <div className="flex justify-between">

                  <span>Response Rate</span>

                  <span>
                    {business.trustScore.responseRate}%
                  </span>

                </div>

                <div className="flex justify-between">

                  <span>On-time Delivery</span>

                  <span>
                    {business.trustScore.onTimeDelivery}%
                  </span>

                </div>

                <div className="flex justify-between">

                  <span>Client Satisfaction</span>

                  <span>
                    {business.trustScore.satisfaction}%
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default DirectoryDetails;