"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, Rate, Progress, Button, Tag } from "antd";
import { 
  ArrowLeftOutlined, 
  UndoOutlined, 
  WarningOutlined, 
  StopOutlined,
  LikeOutlined,
  DislikeOutlined,
  MoreOutlined
} from "@ant-design/icons";
import Complaint from "@/components/Complaint";
import Response from "@/components/Response";

const BusinessDetailsPage = () => {
  const router = useRouter();
  
  // Data for the header
  const businessHeader = {
    name: "TechSupport Pro",
    type: "IT SERVICES",
    trustScore: "82.8",
    logo: "/images/tech-support-logo.png"
  };

  // Mock data for reviews
  const reviews = [
    {
      id: 1,
      author: "@magnetic_vibez",
      title: "Unfair Game!!!!!!!",
      date: "3 Nov",
      rating: 2,
      content: "Winning just 10 coins for 20 levels is not fair at all, atleast reward us for each level passed even if it is 5 coin per level. The reward is making the game feel like a chore rather than a fun experience.",
      helpfulCount: 124,
      developerResponse: "Hello. Are you enjoying our game? We'll keep bringing you more fun with exciting updates. We are currently re-balancing the economy and your feedback is very helpful!"
    },
    {
      id: 2,
      author: "@pixel_pioneer",
      title: "Masterpiece of design",
      date: "28 Oct",
      rating: 5,
      content: "The attention to detail in the UI and the smooth animations are just incredible. I've been playing for weeks and I still find little hidden gems in the UX. Highly recommended for anyone who appreciates craft.",
      helpfulCount: 89,
    }
  ];

  const RatingsTab = () => (
    <div className="mt-8">
      {/* Stats Section */}
      <div className="flex flex-col md:flex-row gap-12 mb-12 items-start">
        <div className="text-center md:text-left">
          <h2 className="text-7xl font-black text-gray-900 leading-none">4.5</h2>
          <p className="text-gray-400 mt-2 font-bold uppercase tracking-widest text-xs">OUT OF 5</p>
          <Rate disabled defaultValue={4.5} className="text-orange-400 mt-4" />
          <p className="text-gray-400 text-xs mt-2">11,240 Ratings</p>
        </div>
        
        <div className="flex-1 max-w-md w-full space-y-1">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center gap-4 text-xs">
              <span className="w-2 font-bold text-gray-400">{star}★</span>
              <Progress 
                percent={star === 5 ? 75 : star === 4 ? 20 : 5} 
                showInfo={false} 
                strokeColor="#1E293B" 
                trailColor="#F1F5F9"
                size="small"
              />
              <span className="text-gray-400 w-10 text-right">
                {star === 5 ? "8.4K" : star === 4 ? "1.7K" : "200"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-400">Tap to Rate:</span>
          <Rate className="text-gray-200 text-lg" />
        </div>
        <select className="text-sm font-bold text-gray-900 bg-transparent outline-none cursor-pointer">
          <option>Sort by Most Helpful</option>
          <option>Newest First</option>
        </select>
      </div>

      {/* Review List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white border border-gray-50 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-gray-900">{review.title}</h4>
                <span className="text-xs text-gray-400">{review.date}</span>
              </div>
              <MoreOutlined className="text-gray-400 cursor-pointer" />
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <Rate disabled defaultValue={review.rating} className="text-[10px] text-orange-400" />
              <span className="text-xs text-gray-400">{review.author}</span>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {review.content} <span className="text-emerald-500 font-bold cursor-pointer">more</span>
            </p>

            {review.developerResponse && (
              <div className="bg-[#F8FAFC] border-l-2 border-emerald-500 p-4 rounded-r-lg mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Tag color="success" className="text-[9px] font-bold border-none uppercase">Developer Response</Tag>
                  <span className="text-[10px] text-gray-400">14 Nov</span>
                </div>
                <p className="text-xs text-gray-500 italic">"{review.developerResponse}"</p>
              </div>
            )}

            <div className="flex items-center gap-4 text-gray-400 text-xs font-medium">
              <span>Was this helpful?</span>
              <button className="flex items-center gap-1 hover:text-gray-900"><LikeOutlined /> {review.helpfulCount}</button>
              <button className="hover:text-gray-900"><DislikeOutlined /></button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center py-10">
        <button className="text-emerald-500 font-bold text-sm hover:underline">View All Reviews</button>
      </div>
    </div>
  );

  const items = [
    { key: "1", label: "Ratings & Reviews", children: <RatingsTab /> },
    { key: "2", label: "Complaint", children: <Complaint /> },
    { key: "3", label: "Response", children: <Response /> },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Bar */}
      <div className="p-8 max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img src={businessHeader.logo} className="w-12 h-12 rounded-lg bg-gray-100 object-cover" />
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-tight">{businessHeader.name}</h1>
            <span className="text-[10px] font-bold text-gray-400 tracking-widest">{businessHeader.type}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end gap-1">
            <span className="text-3xl font-black text-gray-900">{businessHeader.trustScore}</span>
            <span className="text-xl font-bold text-gray-900">%</span>
          </div>
          <p className="text-[10px] font-bold text-gray-400 tracking-tighter uppercase">Trust Score</p>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="max-w-6xl mx-auto px-8">
        <Tabs 
          defaultActiveKey="1" 
          items={items} 
          className="custom-tabs"
          centered
          tabBarStyle={{ borderBottom: 'none' }}
        />
      </div>

      {/* Admin Actions (Sticky Footer Style) */}
      {/* <div className="max-w-6xl mx-auto mt-12 p-8 border-t border-gray-100">
        <div className="flex items-center gap-4 mb-8">
          <span className="text-xs font-bold text-gray-900 uppercase tracking-widest">Admin Actions</span>
          <div className="h-[1px] bg-gray-100 flex-1"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Button icon={<UndoOutlined />} className="h-12 bg-[#060853] text-white font-bold rounded-lg border-none">Refund Customer</Button>
          <Button icon={<WarningOutlined />} className="h-12 bg-[#FFBD3D] text-white font-bold rounded-lg border-none">Warn Business</Button>
          <Button icon={<StopOutlined />} className="h-12 bg-[#740D0D] text-white font-bold rounded-lg border-none">Suspend Business</Button>
        </div>
      </div> */}

      <style jsx global>{`
        .custom-tabs .ant-tabs-tab {
          padding: 12px 24px !important;
          font-weight: bold !important;
          color: #94A3B8 !important;
        }
        .custom-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
          color: #0F172A !important;
          font-size: 20px !important;
        }
        .custom-tabs .ant-tabs-ink-bar {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default BusinessDetailsPage;