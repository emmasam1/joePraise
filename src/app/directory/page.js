"use client";
export const dynamic = "force-dynamic"; // Forces Next.js to skip incorrect static-bailout checks

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  SearchOutlined, 
  EnvironmentOutlined, 
  AppstoreOutlined,
  StarFilled, 
  ShareAltOutlined, 
  HeartOutlined,
  UpOutlined,
  DownOutlined
} from '@ant-design/icons';

function DirectoryContent() {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category'); 

  const [categoryOpen, setCategoryOpen] = useState(true);
  const [subCategoryOpen, setSubCategoryOpen] = useState(true);

  const directoryItems = [
    {
      id: 1,
      name: "Old Princeton Landing",
      rating: 4.2,
      reviews: 231,
      location: "Lagos, Nigeria",
      priceRange: "₦450 - ₦600",
      status: "Closed until 11:30 AM",
      statusColor: "text-red-500",
      description: "Re-opened in the fall of 2010 by brothers Brian and Peter Quarter, Old Princeton Landing welcomes locals and visitors alike. With the recent merging...",
      tags: ["Seafood", "Burgers", "Breakfast & Brunch"],
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: 2,
      name: "Miliards Smash Burger",
      rating: 4.0,
      reviews: 231,
      location: "Lagos, Nigeria",
      priceRange: "₦50 - ₦70",
      status: "Opened",
      statusColor: "text-blue-600",
      description: "Re-opened in the fall of 2010 by brothers Brian and Peter Quarter, Old Princeton Landing welcomes locals and visitors alike. With the recent merging...",
      tags: ["Seafood", "Burgers", "Breakfast & Brunch"],
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=60"
    }
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#0F172A] font-sans">
      {/* Top Main Universal Search Bar Header */}
      <div className="max-w-7xl mx-auto pt-10 px-4 text-center">
        <h1 className="text-2xl font-black text-[#060853] mb-6">Find a business directory</h1>
        
        <div className="inline-flex flex-col md:flex-row bg-white rounded-xl shadow-sm border border-gray-100 p-2 max-w-3xl w-full items-center gap-2">
          <div className="flex items-center gap-2 px-3 border-r border-gray-100 w-full md:w-1/4 py-2">
            <EnvironmentOutlined className="text-gray-400" />
            <input type="text" placeholder="Location" defaultValue="Lagos" className="text-xs font-bold text-gray-700 outline-none w-full" />
          </div>
          <div className="flex items-center gap-2 px-3 border-r border-gray-100 w-full md:w-1/4 py-2">
            <AppstoreOutlined className="text-gray-400" />
            <input type="text" placeholder="Category" defaultValue="Restaurants" className="text-xs font-bold text-gray-700 outline-none w-full" />
          </div>
          <div className="flex items-center gap-2 px-3 w-full md:w-2/4 py-2">
            <SearchOutlined className="text-gray-400" />
            <input type="text" placeholder="Search items..." className="text-xs font-medium text-gray-400 outline-none w-full" />
          </div>
          <button className="bg-[#060853] text-white px-6 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 w-full md:w-auto justify-center shadow-sm whitespace-nowrap">
            Search <SearchOutlined />
          </button>
        </div>
      </div>

      {/* Grid Workspace Content Layout Container */}
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8 items-start relative">
        
        {/* LEFT FIXED SIDEBAR */}
        <aside className="w-full lg:w-64 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm lg:sticky lg:top-6 shrink-0 space-y-6">
          <div className="border-b border-gray-50 pb-2 mb-2">
            <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest">Filter</h2>
          </div>

          {/* Price Component Section */}
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">Price</label>
            <div className="flex gap-2">
              <select className="w-full bg-gray-50 border border-gray-100 text-[10px] font-bold p-2 rounded-lg text-gray-500 outline-none">
                <option>MIN</option>
              </select>
              <select className="w-full bg-gray-50 border border-gray-100 text-[10px] font-bold p-2 rounded-lg text-gray-500 outline-none">
                <option>MAX</option>
              </select>
            </div>
          </div>

          {/* Location Custom Search Field */}
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">Location</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="State, Country or Region" 
                className="w-full bg-gray-50 border border-gray-100 text-[10px] font-medium p-2.5 pl-8 rounded-lg outline-none text-gray-700"
              />
              <SearchOutlined className="absolute left-3 top-3.5 text-gray-400 text-[10px]" />
            </div>
          </div>

          {/* Core Accordion Level Category Selector */}
          <div>
            <div 
              className="flex justify-between items-center cursor-pointer border-b border-gray-50 pb-2 mb-3"
              onClick={() => setCategoryOpen(!categoryOpen)}
            >
              <span className="text-[10px] font-black text-gray-900 uppercase tracking-wider">Category</span>
              {categoryOpen ? <UpOutlined className="text-[8px] text-gray-400" /> : <DownOutlined className="text-[8px] text-gray-400" />}
            </div>
            
            {categoryOpen && (
              <div className="space-y-2.5 transition-all">
                {["Restaurants", "Mechanics", "Barbers", "Event Planners", "Designers", "Artists"].map((category, index) => (
                  <label key={category} className="flex items-center gap-2.5 text-xs font-bold text-gray-600 cursor-pointer">
                    <input 
                      type="checkbox" 
                      defaultChecked={index === 0} 
                      className="accent-[#060853] rounded border-gray-200 h-3.5 w-3.5"
                    />
                    {category}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Sub Category Accordion Filter Block */}
          <div>
            <div 
              className="flex justify-between items-center cursor-pointer border-b border-gray-50 pb-2 mb-3"
              onClick={() => setSubCategoryOpen(!subCategoryOpen)}
            >
              <span className="text-[10px] font-black text-gray-900 uppercase tracking-wider">Sub Category</span>
              {subCategoryOpen ? <UpOutlined className="text-[8px] text-gray-400" /> : <DownOutlined className="text-[8px] text-gray-400" />}
            </div>

            {subCategoryOpen && (
              <div className="space-y-2.5 transition-all">
                {["Burgers", "Seafood", "Sandwiches", "Pizza", "Shawarma"].map((sub) => (
                  <label key={sub} className="flex items-center gap-2.5 text-xs font-bold text-gray-500 cursor-pointer">
                    <input type="checkbox" className="accent-[#060853] rounded border-gray-200 h-3.5 w-3.5" />
                    {sub}
                  </label>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* RIGHT STREAMING CONTENT FEED CARD STREAM */}
        <main className="flex-1 w-full space-y-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold text-gray-400">
              <span className="text-gray-900 font-extrabold">1,251</span> Restaurants
            </span>
            <div className="text-xs text-gray-400 font-bold">
              Sort by: <span className="text-gray-900 font-extrabold cursor-pointer">Newest</span>
            </div>
          </div>

          {directoryItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col md:flex-row gap-6 relative group hover:shadow-md transition-all">
              <div className="w-full md:w-56 h-44 rounded-xl overflow-hidden relative bg-gray-100 shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>

              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-base font-black text-gray-900 tracking-tight cursor-pointer hover:text-[#060853]">{item.name}</h3>
                    <div className="flex gap-4 text-gray-400 text-sm">
                      <ShareAltOutlined className="hover:text-gray-600 cursor-pointer" />
                      <HeartOutlined className="hover:text-red-500 cursor-pointer" />
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mt-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <StarFilled key={i} className={`text-xs ${i < Math.floor(item.rating) ? 'text-red-700' : 'text-gray-200'}`} />
                    ))}
                    <span className="text-xs font-black text-gray-900 ml-1">{item.rating}</span>
                    <span className="text-xs font-bold text-gray-400">({item.reviews} Reviews)</span>
                  </div>

                  <div className="flex items-center gap-6 text-xs text-gray-400 font-bold mb-3">
                    <span className="flex items-center gap-1">
                      <EnvironmentOutlined className="text-[10px]" /> {item.location}
                    </span>
                    <span>•</span>
                    <span>{item.priceRange}</span>
                    <span>•</span>
                    <span className={`${item.statusColor} font-black`}>{item.status}</span>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed font-medium mb-4">
                    {item.description} <span className="text-[#10B981] font-black cursor-pointer">more</span>
                  </p>
                </div>

                <div className="flex justify-between items-end pt-2 border-t border-gray-50">
                  <div className="flex gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="bg-gray-50 border border-gray-100 text-[10px] text-gray-500 font-bold px-3 py-1.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="bg-[#10B981] text-white px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs hover:opacity-95 transition-all">
                    🗂️ Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}

export default function DirectoryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-xs font-bold text-gray-400">
        Loading Directory...
      </div>
    }>
      <DirectoryContent />
    </Suspense>
  );
}