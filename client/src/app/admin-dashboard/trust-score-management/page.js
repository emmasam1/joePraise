"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Tag } from 'antd';
import { 
  StarFilled, 
  UserOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  ExclamationCircleOutlined 
} from '@ant-design/icons';

const Page = () => {
  const router = useRouter();

  const businessData = [
    {
      id: 1,
      name: "Swift Logistics",
      category: "SHIPPING & DELIVERY",
      isTopPerformer: true,
      logo: "/images/swift-logo.png",
      trustScore: 96.1,
      metrics: {
        reviews: "4.8 / 5.0",
        users: "250k",
        completion: "99.8%",
        response: "12m",
        complaints: "0.5%"
      },
      color: "text-[#15BE87]",
      bg: "bg-[#ECFDF5]"
    },
    {
      id: 2,
      name: "Global Trade Hub",
      category: "WHOLESALE",
      isTopPerformer: false,
      logo: "/images/global-logo.png",
      trustScore: 90.1,
      metrics: {
        reviews: "4.5 / 5.0",
        users: "1.5M",
        completion: "97.8%",
        response: "30m",
        complaints: "1.2%"
      },
      color: "text-[#15BE87]",
      bg: "bg-[#ECFDF5]"
    },
    {
      id: 3,
      name: "FreshBite Catering",
      category: "FOOD & BEVERAGE",
      isTopPerformer: false,
      logo: "/images/freshbite-logo.png",
      trustScore: 86.2,
      metrics: {
        reviews: "4.9 / 5.0",
        users: "3.5k",
        completion: "92%",
        response: "60m",
        complaints: "0.8%"
      },
      color: "text-[#060853]",
      bg: "bg-[#EFF6FF]"
    },
    {
      id: 4,
      name: "EcoStore Solutions",
      category: "RETAIL",
      isTopPerformer: false,
      logo: "/images/ecostore-logo.png",
      trustScore: 84,
      metrics: {
        reviews: "4.2 / 5.0",
        users: "8.5M",
        completion: "94.5%",
        response: "45m",
        complaints: "2.1%"
      },
      color: "text-[#060853]",
      bg: "bg-[#EFF6FF]"
    }
  ];

  return (
    <div className="space-y-6 bg-[#F8FAFC] mt-3 p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Business Performance</h1>
        <p className="text-gray-500 text-sm">Monitor and review business trust scores and service metrics.</p>
      </div>

      <div className="space-y-4">
        {businessData.map((business) => (
          <div 
            key={business.id}
            onClick={() => router.push(`/admin-dashboard/trust-score-management/${business.id}`)}
            className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              {/* Left: Info & Logo */}
              <div className="flex items-start gap-4 w-full md:w-1/3">
                <div className="relative">
                  <span className="absolute -top-2 -left-2 bg-[#060853] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white font-bold z-10">
                    #{business.id}
                  </span>
                  <img 
                    src={business.logo} 
                    className="w-16 h-16 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all" 
                    alt={business.name} 
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-900 text-lg">{business.name}</h3>
                    {business.isTopPerformer && (
                      <Tag color="orange" className="rounded-full text-[10px] border-none font-bold bg-[#FFF7ED] text-[#C2410C]">
                        🏆 TOP PERFORMER
                      </Tag>
                    )}
                  </div>
                  <Tag className="bg-gray-100 text-gray-400 border-none text-[10px] font-bold px-2 py-0.5 rounded">
                    {business.category}
                  </Tag>
                </div>
              </div>

              {/* Right: Trust Score Badge */}
              <div className={`${business.bg} rounded-2xl p-4 flex flex-col items-center justify-center min-w-[120px] ml-4`}>
                <span className={`text-2xl font-black ${business.color}`}>
                  {business.trustScore}
                </span>
                <span className={`${business.color} text-[10px] font-bold tracking-widest`}>
                  TRUST SCORE
                </span>
              </div>
            </div>

            {/* Center: Metrics Grid (Bottom Section) */}
            <div className="grid grid-cols-3 md:grid-cols-5 gap-8 w-full mt-4 pt-3 border-t border-gray-100">
              <MetricItem icon={<StarFilled className="text-gray-300" />} label="REVIEWS" value={business.metrics.reviews} />
              <MetricItem icon={<UserOutlined className="text-gray-300" />} label="USERS" value={business.metrics.users} />
              <MetricItem icon={<CheckCircleOutlined className="text-gray-300" />} label="COMPLETION" value={business.metrics.completion} />
              <MetricItem icon={<ClockCircleOutlined className="text-gray-300" />} label="RESPONSE" value={business.metrics.response} />
              <MetricItem icon={<ExclamationCircleOutlined className="text-gray-300" />} label="COMPLAINTS" value={business.metrics.complaints} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MetricItem = ({ icon, label, value }) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-2 text-gray-400">
      {icon}
      <span className="text-[9px] font-bold tracking-wider">{label}</span>
    </div>
    <span className="font-bold text-gray-800 text-[14px]">{value}</span>
  </div>
);

export default Page;