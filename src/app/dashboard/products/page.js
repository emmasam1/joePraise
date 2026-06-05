"use client";
import React, { useState } from "react";
import { Input, Button, Table, Dropdown, Select, Radio, Switch, Upload } from "antd";
import { motion, AnimatePresence } from "framer-motion"; 
import CustomModal from "@/components/CustomModal";
import ConfirmActionModal from "@/components/ConfirmActionModal";
import Image from "next/image";

const { TextArea } = Input;

const ProductManagementPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeletingModalOpen, setIsDeletingModalOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(null);

  const [productType, setProductType] = useState("physical");
  
  // State tracking for dynamic pricing layout changes
  const [priceType, setPriceType] = useState("fixed");

  // Track selected fulfillment location type ("my-location", "client-location", "virtual")
  const [fulfillmentLocation, setFulfillmentLocation] = useState("my-location");

  // Track selected days by their index positions (0 = Mon, 1 = Tue, etc.)
  const [selectedDays, setSelectedDays] = useState([0, 1, 2, 3, 4]);
  const daysList = ["M", "T", "W", "T", "F", "S", "S"];

  const toggleDay = (idx) => {
    setSelectedDays(prev => 
      prev.includes(idx) ? prev.filter(d => d !== idx) : [...prev, idx]
    );
  };

  // State to hold uploaded image display preview data strings
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleImageUpload = ({ fileList }) => {
    const formattedUrls = fileList.map(file => {
      if (file.url) return file.url;
      if (file.originFileObj) return URL.createObjectURL(file.originFileObj);
      return null;
    }).filter(Boolean);
    
    setUploadedImages(formattedUrls);
  };

  // Handler to remove a selected image by its specific slot index position
  const removeImage = (indexToRemove) => {
    setUploadedImages(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const productTypeTabs = [
    {
      id: "physical",
      title: "Physical Product",
      description: "Tangible items shipped or picked up by the customer",
      icon: "/images/briefcase.png", 
    },
    {
      id: "digital",
      title: "Digital product",
      description: "Files, courses, templates, and downloadable content",
      icon: "/images/plus-box.png",
    },
    {
      id: "service",
      title: "Service",
      description: "Hair styling, cleaning, consultancy, and bookable services",
      icon: "/images/clock.png",
    },
  ];
  
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const statsCard = [
    { id: 1, title: "Total Products", value: "45", img: "/images/cube.png", size: "md" },
    { id: 2, title: "Active Orders", value: "34", img: "/images/active.png", size: "xmd" },
    { id: 3, title: "Draft", value: "6", img: "/images/draft.png", size: "xmd" },
    { id: 4, title: "Out of Stock", value: "8", img: "/images/out-of-stock.png", size: "md" },
  ];

  const tabs = ["All", "Active", "Draft", "Paused", "Out of Stock"];

  const tabVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  const columns = [
    {
      title: "",
      render: () => <img src="/images/pen.png" className="w-5" />,
    },
    {
      title: "Product",
      dataIndex: "title",
      key: "id",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img src={record.image} alt={record.title} className="w-10 h-10 rounded-lg object-cover" />
          <div className="flex flex-col">
            <span className="font-semibold text-[#1e293b] text-sm">{record.title}</span>
            <span className="text-[10px] text-gray-500">{record.category}</span>
          </div>
        </div>
      ),
    },
    {
      title: "CATEGORY",
      dataIndex: "prodcut",
      key: "prodcut",
      render: (_, record) => <span className="font-semibold text-black">{record.prodcut}</span>,
    },
    {
      title: "PRICE",
      dataIndex: "price",
      key: "price",
      render: (_, record) => <span className="text-black">{record.price}</span>,
    },
    {
      title: "EARNING",
      dataIndex: "earning",
      key: "earning",
      render: (_, record) => <span className="text-black">₦{record.earning}</span>,
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (_, record) => {
        let statusColor = "#9CA3AF";
        if (record.status === "Draft") statusColor = "#FFC542";
        else if (record.status === "Paused") statusColor = "#A71818";
        else if (record.status === "Active") statusColor = "#15BE87";
        else if (record.status === "Out of Stock") statusColor = "#870A0A";

        return <span style={{ color: statusColor }} className="text-xs">{record.status}</span>;
      },
    },
    {
      title: "",
      key: "action",
      render: (_, record) => {
        const items = [
          { key: "1", label: <span className="text-[10px] font-bold py-1 block">Add</span> },
          {
            key: "view",
            label: (
              <span
                onClick={() => {
                  setIsModalOpen(true);
                  setIsSelected(record);
                }}
                className="text-[10px] font-bold py-1 block cursor-pointer"
              >
                View
              </span>
            ),
          },
          { key: "3", label: <span className="text-[10px] font-bold py-1 block">Edit</span> },
          {
            key: "4",
            label: (
              <span onClick={() => setIsDeletingModalOpen(true)} className="text-[10px] font-bold py-1 block">
                Delete
              </span>
            ),
          },
        ];

        return (
          <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
            <Button className="border-none! bg-transparent! outline-0! p-0! flex items-center justify-center h-8 w-8">
              <img src="/images/dots.png" className="w-5" />
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  const data = [
    {
      key: "1",
      image: "/images/cake.png",
      title: "Custom Celebration Cakes",
      category: "Weddings, anniversaries, Birthdays",
      prodcut: "Cakes",
      price: "25,000.00",
      earning: "25,000",
      status: "Paused",
    },
  ];

  // --- RENDERING ADD PRODUCT FORM VIEW ---
  if (isAddingProduct) {
    return (
      <div className="space-y-6 p-6 bg-white mt-5">
        {/* Header Block */}
        <div className="flex justify-between items-center border-b pb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Add Product / Service</h1>
            <p className="text-xs text-gray-500">Provide features of your product or services view section</p>
          </div>
          <Button 
            className="p-4.5! border-[#060853]! rounded-lg border text-[#060853]! font-medium"
            onClick={() => setIsAddingProduct(false)}
          >
            &larr; Back to List
          </Button>
        </div>

        {/* Top Type Switcher Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          {productTypeTabs.map((tab) => {
            const isActive = productType === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setProductType(tab.id)}
                className={`relative flex items-center gap-4 p-5 rounded-2xl border text-left transition-all duration-200 outline-none
                  ${isActive 
                    ? "border-[#060853] bg-[#F8FAFC]" 
                    : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeProductTypeBorder"
                    className="absolute inset-0 rounded-2xl border border-[#060853] pointer-events-none"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Icon Container */}
                <div 
                  className={`flex items-center justify-center w-12 h-12 rounded-xl transition-colors duration-200 shrink-0
                    ${isActive ? "bg-[#060853] text-white" : "bg-gray-100 text-gray-500"}`}
                >
                  <img 
                    src={tab.icon} 
                    alt={tab.title} 
                    className={`w-5 h-5 object-contain ${isActive ? "invert" : ""}`} 
                  />
                </div>

                {/* Text Content */}
                <div className="flex flex-col space-y-1">
                  <span className="font-bold text-gray-900 text-[15px] leading-tight">
                    {tab.title}
                  </span>
                  <span className="text-xs text-gray-500 font-normal leading-normal">
                    {tab.description}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Basic Information Section */}
        <div className="space-y-5">
          <h2 className="text-sm font-bold text-gray-800 border-b border-gray-200 pb-2">Basic Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Name *</label>
              <Input placeholder="e.g. Luxury Chocolate Layered Cake" className="h-10 rounded-lg" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Category *</label>
              <Select placeholder="Select category" className="w-full h-10 custom-select" defaultValue="cakes">
                <Select.Option value="cakes">Cakes & Pastries</Select.Option>
                <Select.Option value="bread">Bread & Bakery</Select.Option>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
            <TextArea rows={4} placeholder="Describe what makes this cake or service special..." className="rounded-lg" />
          </div>

          {/* Metrics Layout Rendered from Frame 238564.png */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <label className="block text-[13px] font-extrabold text-black mb-1.5 tracking-tight">SKU / product code</label>
                <Input placeholder="...eg. PROD-0001" className="h-12 rounded-lg border-gray-200 placeholder:text-gray-400 text-sm" />
              </div>
              <div>
                <label className="block text-[13px] font-extrabold text-black mb-1.5 tracking-tight">Stock quantity</label>
                <Input type="number" defaultValue={0} className="h-12 rounded-lg border-gray-200 text-sm" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <label className="block text-[13px] font-extrabold text-black mb-1.5 tracking-tight">Weight (kg)</label>
                <Input placeholder="0.0" className="h-12 rounded-lg border-gray-200 placeholder:text-gray-400 text-sm" />
              </div>
              <div>
                <label className="block text-[13px] font-extrabold text-black mb-1.5 tracking-tight">Dimensions (L x W x H cm)</label>
                <Input placeholder="e.g. 20 × 15 × 10" className="h-12 rounded-lg border-gray-200 placeholder:text-gray-400 text-sm" />
              </div>
            </div>

            {/* Service / Fulfillment Selection Cards Group implemented from Frame 238564.png */}
            <div className="pt-2">
              <div className="grid grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setFulfillmentLocation("my-location")}
                  className={`flex flex-col items-center justify-center p-6 rounded-xl border text-center transition-all outline-none min-h-[105px]
                    ${fulfillmentLocation === "my-location"
                      ? "border-[#060853] bg-[#F1F5F9] ring-1 ring-[#060853]" 
                      : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-black mb-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-800">At my location</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFulfillmentLocation("client-location")}
                  className={`flex flex-col items-center justify-center p-6 rounded-xl border text-center transition-all outline-none min-h-[105px]
                    ${fulfillmentLocation === "client-location"
                      ? "border-[#060853] bg-[#F1F5F9] ring-1 ring-[#060853]" 
                      : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-black mb-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-800">At client location</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFulfillmentLocation("virtual")}
                  className={`flex flex-col items-center justify-center p-6 rounded-xl border text-center transition-all outline-none min-h-[105px]
                    ${fulfillmentLocation === "virtual"
                      ? "border-[#060853] bg-[#F1F5F9] ring-1 ring-[#060853]" 
                      : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-black mb-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-800">Online/Virtual</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scheduling Config Container Component */}
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 space-y-4">
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-gray-800">Appointment booking</p>
              <span className="bg-[#E2EDFC] text-[#060853] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Scheduling</span>
            </div>
            <Switch defaultChecked />
          </div>
          <p className="text-[11px] text-gray-500 mb-2">Let customers schedule and pay for appointments directly</p>
          
          <div className="border-t border-gray-200 pt-4 space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Available days</label>
              <div className="flex gap-2">
                {daysList.map((day, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleDay(idx)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all
                      ${selectedDays.includes(idx) ? "bg-[#060853] text-white" : "bg-white border border-gray-200 text-gray-400"}`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Opening time</label>
                <Select placeholder="Select" className="w-full h-10" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Closing time</label>
                <Select placeholder="Select" className="w-full h-10" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Earliest booking notice</label>
                <Select placeholder="Select" className="w-full h-10" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Latest booking window</label>
                <Select placeholder="Select" className="w-full h-10" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Buffer between sessions</label>
                <Select placeholder="Select" className="w-full h-10" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Max bookings per day</label>
                <Input type="number" defaultValue={1} className="h-10 rounded-lg" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Cancellation policy</label>
              <Select placeholder="Select" className="w-full h-10" />
            </div>
          </div>
        </div>

        {/* Pricing Section (Updated with Dynamic Form Inputs Conditionals) */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-gray-800">Pricing</h2>
          <div className="flex gap-4 mb-2">
            <Radio.Group 
              value={priceType} 
              onChange={(e) => setPriceType(e.target.value)} 
              className="flex gap-4"
            >
              <Radio value="fixed">Fixed Price</Radio>
              <Radio value="range">Price Range</Radio>
              <Radio value="negotiable">Negotiable</Radio>
              <Radio value="free">Free</Radio>
            </Radio.Group>
          </div>

          {/* Conditional Layout Switching Logic */}
          {priceType === "fixed" && (
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Price</label>
              <Input prefix="₦" placeholder="0.00" className="h-10 w-64 rounded-lg" />
            </div>
          )}

          {priceType === "range" && (
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-700 mb-1">From (Min Price)</label>
                <Input prefix="₦" placeholder="0.00" className="h-10 w-full! rounded-lg" />
              </div>
              <span className="text-gray-400 font-semibold mb-2">to</span>
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-700 mb-1">To (Max Price)</label>
                <Input prefix="₦" placeholder="0.00" className="h-10 w-full! rounded-lg" />
              </div>
            </div>
          )}

          {/* Note: inputs vanish automatically for 'free' and 'negotiable' */}
        </div>

        {/* Media Upload Section */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-gray-800">Upload Media File</h2>
          <Upload
            multiple
            maxCount={8}
            accept="image/*"
            showUploadList={false}
            beforeUpload={() => false} 
            onChange={handleImageUpload}
          >
            <Button className="p-4.5! bg-[#060853]! rounded-lg border-none! text-white! flex items-center mb-4">
              + Upload Images
            </Button>
          </Upload>
          
          <div className="grid grid-cols-8 gap-2">
            {[...Array(8)].map((_, i) => {
              const imageSrc = uploadedImages[i];
              return (
                <div key={i} className="aspect-square bg-gray-100 rounded-lg flex flex-col items-center justify-center border overflow-hidden relative group">
                  {imageSrc ? (
                    <>
                      <img src={imageSrc} alt={`upload-${i}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute top-1 right-1 bg-black/60 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10 shadow-sm"
                      >
                        &times;
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="text-gray-400 text-xs mb-0.5">+</span>
                      <span className="text-[8px] text-gray-400">Add Image</span>
                    </>
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-[10px] text-gray-400 mt-1">Up to 8 images. Hover over any image to delete it.</p>
        </div>

        {/* Visibility Options Status Module */}
        <div className="space-y-3 bg-gray-50/50 p-4 rounded-xl border">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Visibility & status</span>
            <Switch defaultChecked />
          </div>
          <div className="flex justify-between items-center pt-1">
            <div>
              <p className="text-xs font-bold text-gray-800">Active</p>
              <p className="text-[11px] text-gray-500">Mark as available for purchase or booking</p>
            </div>
            <Switch />
          </div>
          <div className="flex justify-between items-center border-t pt-2">
            <div>
              <p className="text-xs font-bold text-gray-800">Featured</p>
              <p className="text-[11px] text-gray-500">Highlight this listing in featured sections on the marketplace</p>
            </div>
            <Switch />
          </div>
          <div className="flex justify-between items-center border-t pt-2">
            <div>
              <p className="text-xs font-bold text-gray-800">Paused</p>
              <p className="text-[11px] text-gray-500">Temporarily hide this listing from customers</p>
            </div>
            <Switch />
          </div>
        </div>

        {/* Submit Actions Button Footer */}
        <div className="flex justify-between items-center pt-4 border-t">
          <Button onClick={() => setIsAddingProduct(false)} className="rounded-lg h-10 font-bold border-gray-300 text-gray-600">
            Save as Draft
          </Button>
          <Button className="bg-[#060853]! text-white! rounded-lg h-10 px-8 font-bold border-none">
            Save & Publish
          </Button>
        </div>
      </div>
    );
  }

  // --- STANDARD DASHBOARD LIST VIEW ---
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mt-5">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Baker</h1>
        </div>
        <div className="flex gap-4">
          <Button 
            className="p-4.5! border-[#060853]! rounded-lg border text-[#060853]!"
            onClick={() => setIsAddingProduct(true)}
          >
            <img src="/images/plus.png" alt="export" className="h-7" />
            Add New
          </Button>
          <Button className="p-4.5! bg-[#060853]! rounded-lg border-none! text-white!">
            <img src="/images/upload.png" alt="export" className="h-7" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-[#E2EDFC] p-4 rounded-sm">
        {statsCard.map((card) => (
          <div key={card.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center border-b border-gray-100 pb-2">
              <img
                src={card.img}
                alt={card.title}
                className={`object-contain mr-2 ${card.size === "lg" ? "w-8 h-8" : "w-5 h-5"}`}
              />
              <h3 className="font-bold text-gray-900">{card.title}</h3>
            </div>
            <p className="text-2xl font-bold text-[#060853]">{card.value}</p>
          </div>
        ))}
      </div>

      <div>
        {/* Filter Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-1 bg-[#E2EDFC] p-1 rounded-full border border-[#E0E7FF]/60">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-4 rounded-lg p-1.5 text-xs font-bold transition-colors z-10 
                    ${isActive ? "text-white" : "text-gray-500 hover:text-gray-700"}`}
                >
                  {tab}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-[#060853] rounded-full z-[-1]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 pr-2">
            <Input
              prefix={<img src="/images/search.png" alt="search" className="h-7" />}
              placeholder="Search"
              className="w-72 rounded-lg bg-gray-50 border border-gray-200 h-10 text-xs"
            />
            <Button className="flex items-center justify-center border-gray-200 rounded-lg h-10! overflow-hidden">
              <img src="/images/funnel.png" alt="filter" className="h-8 w-8 object-contain" />
            </Button>
            <Button className="flex items-center justify-center border-gray-200 rounded-lg h-10! overflow-hidden">
              <img src="/images/grid.png" alt="grid" className="h-8 w-8 object-contain" />
            </Button>
            <Button className="flex items-center justify-center border-gray-200 rounded-lg h-10! overflow-hidden">
              <img src="/images/list.png" alt="list" className="h-8 w-8 object-contain" />
            </Button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={tabVariants}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "All" && (
              <div className="bg-[#f0f5ff] p-8 min-h-screen">
                <h2 className="text-sm font-bold mb-4 text-[#1e293b]">My Products/Services</h2>
                <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                  <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    className="custom-table"
                    size="small"
                    rowClassName="hover:bg-gray-50 transition-colors"
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* VIEW MODAL */}
      <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="max-w-md" title="Product ID: #0045">
        <div className="h-72 w-full relative overflow-hidden">
          {isSelected?.image ? (
            <Image src={isSelected.image} alt={isSelected.title} fill className="object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-200 text-sm text-gray-500">No Image</div>
          )}
        </div>
        <h2 className="font-bold text-black mb-2 mt-3">Product Details</h2>
        <div className="flex justify-between">
          <p className="text-black text-[11px]">{isSelected?.category}</p>
          <p className="text-[11px] font-bold">{isSelected?.status}</p>
        </div>
      </CustomModal>

      {/* DELETE MODAL */}
      <ConfirmActionModal
        isOpen={isDeletingModalOpen}
        size="max-w-md"
        onClose={() => setIsDeletingModalOpen(false)}
        title="Delete this Service/Product"
        description="Are you sure you want to delete this Product? This action cannot be undone."
        actionText="Delete"
      />
    </div>
  );
};

export default ProductManagementPage;