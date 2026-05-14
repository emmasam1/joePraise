"use client";
import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { Input, Button, Table, Dropdown } from "antd";

const page = () => {
  const statsCard = [
    {
      id: 1,
      title: "Total Orders",
      value: "1,245",
      rate: "12",
      icon: "/images/cube.png",
    },
    {
      id: 2,
      title: "Conversion Rate",
      value: "9.5",
      rate: "12",
      icon: "/images/rate.png",
    },
    {
      id: 3,
      title: "Customer Growth",
      value: "1,245",
      rate: "30",
      icon: "/images/growth.png",
    },
    {
      id: 4,
      title: "Repeat Customers",
      value: "1040",
      rate: "40",
      icon: "/images/user-remix.png",
    },
  ];

  const iconStyles = {
    "Conversion Rate": "h-5 ml-2",
    "Customer Growth": "h-5",
    "Repeat Customers": "h-6",
  };

  const rateText = {
    "Total Orders": "this month",
    "Conversion Rate": "this month",
    "Customer Growth": "growth",
    "Repeat Customers": "total of customers",
  }

  // --- DATA MOCKUPS ---
const orderTrendData = [
  { name: 'Feb 20', orders: 1800 }, { name: 'Mar 4', orders: 1950 },
  { name: 'Mar 19', orders: 2800 }, { name: 'April 10', orders: 2400 },
  { name: 'April 29', orders: 4200 }, { name: 'May 15', orders: 2100 },
  { name: 'May 30', orders: 2300 },
];

const topProductsData = [
  { name: 'Nutrition Coaching', value: 85 },
  { name: 'Brand Identity', value: 70 },
  { name: 'Auditing', value: 55 },
  { name: 'AI Consulting', value: 40 },
  { name: 'Fractional CMO', value: 30 },
];

const customerActivityData = [
  { name: 'W1', new: 1500, repeat: 1000 },
  { name: 'W2', new: 2200, repeat: 1400 },
  { name: 'W3', new: 1800, repeat: 1200 },
  { name: 'W4', new: 3500, repeat: 2500 },
  { name: 'W5', new: 2000, repeat: 1500 },
];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mt-5">
        <h1 className="text-xl font-bold text-gray-900">Analytics</h1>

        <Button className="p-4.5! bg-[#060853]! rounded-lg border-none! text-white!">
          <img src="/images/upload.png" alt="export" className="h-7" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-[#E2EDFC] p-4 rounded-sm">
        {statsCard.map((card) => {
          return (
            <div
              key={card.id}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center border-b border-gray-100 pb-2 gap-2">
                <img
                  src={card.icon}
                  alt={card.title}
                  className={`w-auto object-contain ${iconStyles[card.title] || "h-6"}`}
                />
                <h3 className="font-bold text-gray-900">{card.title}</h3>
              </div>

              <p className="text-2xl font-bold text-[#060853] mt-2">{card?.title === "Customer Growth" && "+"}{card.value}{card?.title === "Conversion Rate" && "%"}</p>

               <div className="flex items-center mt-2">
                  {card?.title === "Repeat Customers" ? "" : (
                    <img src="/images/arrow-up-fill.png" className="w-4" />
                  )}
                  <p className={`${rateText[card.title] === "growth" ? "text-[#15BE87]" : rateText[card.title] === "this month" ? "text-[#15BE87]" : "text-[#4A4A4A]"} text-sm font-bold ml-1`}>
                    {card.rate}
                    <span className="text-[#4A4A4A]! font-normal! ml-2">
                      {rateText[card.title]}
                    </span>
                  </p>
                </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Analytics</p>
            <h2 className="text-lg font-bold text-gray-900">Order Trends</h2>
          </div>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#312E81]"></div>
                <span className="text-xs font-medium text-gray-600">Average Daily Orders: <b className="text-gray-900">181</b></span>
             </div>
             <div className="bg-gray-100 p-1 rounded-lg flex">
                <button className="px-4 py-1.5 bg-[#1E1B4B] text-white text-xs font-bold rounded-md shadow-sm">Weekly</button>
                <button className="px-4 py-1.5 text-gray-500 text-xs font-bold">Monthly</button>
             </div>
          </div>
        </div>
        
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={orderTrendData}>
              <defs>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#312E81" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#312E81" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9CA3AF'}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9CA3AF'}} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                cursor={{ stroke: '#312E81', strokeWidth: 2 }}
              />
              <Area type="monotone" dataKey="orders" stroke="#312E81" strokeWidth={3} fillOpacity={1} fill="url(#colorOrders)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. MIDDLE SECTION: TOP PRODUCTS & CUSTOMER ACTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* TOP PERFORMING PRODUCTS */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Analytics</p>
          <h2 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-50">Top Performing Products/Services</h2>
          
          <div className="space-y-5">
            {topProductsData.map((item) => (
              <div key={item.name} className="flex items-center">
                <span className="w-1/3 text-xs font-bold text-gray-700">{item.name}</span>
                <div className="w-2/3 bg-gray-50 rounded-full h-6 overflow-hidden">
                  <div 
                    className="bg-[#312E81] h-full rounded-r-full transition-all duration-500" 
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CUSTOMER ACTIVITY AREA CHART */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Analytics</p>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Customer Activity</h2>
          
          <div className="flex gap-4 mb-6">
             <div className="flex items-center gap-2">
                <div className="w-3 h-1.5 rounded-full bg-[#1E1B4B]"></div>
                <span className="text-[10px] font-bold text-gray-500 uppercase">New Customers</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-3 h-1.5 rounded-full bg-[#10B981]"></div>
                <span className="text-[10px] font-bold text-[#10B981] uppercase">Repeat Customers</span>
             </div>
          </div>

          <div className="h-[200px] w-full flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={customerActivityData}>
                <Area type="monotone" dataKey="new" stroke="#1E1B4B" strokeWidth={2} fill="transparent" />
                <Area type="monotone" dataKey="repeat" stroke="#10B981" strokeWidth={2} fillOpacity={0.05} fill="#10B981" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-4 border-t flex items-center gap-2">
                <img src="/images/user-remix-gray.png" className="w-6" />
               
             <span className="text-xl font-bold text-gray-900">895</span>
             <span className="text-xs text-gray-400 font-medium">New Visitors</span>
          </div>
        </div>
      </div>

      {/* 3. SMART INSIGHTS SECTION */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Analytics</p>
        <div className="flex items-center gap-2 mb-6">
          <img src='/images/insights.png' className="w-5" />
          <h2 className="text-lg font-bold text-gray-900">Smart Insights</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 border-t pt-6">
          {[
            "You got more bookings on weekends",
            "80% of your customers come from referrals",
            "First-time customers have a 25% return rate",
            "Discount campaigns boosted bookings by 22%",
            "Peak booking time is between 4 PM - 7 PM",
            "Customers who book bundles spend 35% more",
            "Your weekday bookings are lowest on Tuesdays",
            "Most cancellations happen within 24 hours of booking"
          ].map((insight, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#1E1B4B]"></div>
              <p className="text-sm font-medium text-gray-700">{insight}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;