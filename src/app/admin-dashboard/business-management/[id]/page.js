// "use client";
// import React, { use } from "react";
// import { Button, Tag, Rate, Input, Badge, Avatar } from "antd";
// import { useRouter } from "next/navigation";
// import {
//   ClockCircleOutlined,
//   CheckSquareFilled,
//   MinusCircleOutlined,
//   MailOutlined,
//   PhoneOutlined,
//   IdcardOutlined,
//   ScanOutlined,
//   FileTextOutlined,
//   UploadOutlined,
//   CheckCircleFilled,
//   CloseCircleFilled,
//   ClockCircleFilled,
//   StarFilled,
//   StarOutlined,
//   CheckCircleOutlined, 
//   CloseCircleOutlined, 
//   StopOutlined, 
//   MessageOutlined
// } from "@ant-design/icons";

// import {
//   RiArrowLeftLine,
//   RiMailLine,
//   RiPhoneLine,
//   RiGlobalLine,
//   RiMapPinLine,
//   RiTimeLine,
// } from "react-icons/ri";

// // This would typically come from an API call using the ID
// const MOCK_DATA = [
//   {
//     key: "1",
//     business_name: "Joseph Grace Cleaning",
//     owner_name: "Joseph Grace",
//     email: "joseph.cleaning@gmail.com",
//     phone: "+1 555 0123",
//     location: "New York, NY",
//     hours: "Mon - Sat: 8:00 AM - 6:00 PM",
//     website: "jgracecleaning.com",
//     category: "Home Services • Cleaning",
//     established: "2020",
//     description:
//       "Bie’s Kitchen is an authentic local dishes and homemade food products crafted by Chef Bie, specializing in traditional flavors, culinary artistry, and, in some contexts, homemade goods like Leche Flan and Biko",
//     image: "/images/cleaning_demo.png",
//   },
//   {
//     key: "2",
//     business_name: "Josh Plumbing",
//     owner_name: "Lawrance Josh",
//     email: "josh.plumbing@outlook.com",
//     phone: "+1 555 0987",
//     location: "Austin, Texas",
//     hours: "24/7 Emergency Service",
//     website: "joshplumbing.tx",
//     category: "Construction • Plumbing",
//     established: "2015",
//     description:
//       "Reliable plumbing solutions including leak detection, pipe installation, and emergency repairs across Texas.",
//     image: "/images/plumbing_demo.png",
//   },
// ];

// const timelineData = [
//   {
//     title: "Verification Submitted",
//     time: "4:00pm",
//     subtitle: "2 days",
//     color: "bg-[#1A1A5E]",
//   },
//   {
//     title: "Documents Uploaded",
//     time: "Just now",
//     subtitle: "Just now",
//     color: "bg-[#F4511E]",
//   },
//   {
//     title: "Under review",
//     time: "1 day ago",
//     subtitle: "1 day ago",
//     color: "bg-gray-300",
//   },
// ];

// const products = [
//   "Food Ordering",
//   "Seasonal Gifts",
//   "Wedding Cakes",
//   "Home Delivering",
//   "Event Planing",
//   "Custom Cakes",
//   "Kits for baking",
//   "Catering",
//   "Small chops",
//   "Food Ordering",
//   "Donuts & Bread",
//   "Baking Ingredients",
// ];

// const documents = [
//   {
//     title: "Business License",
//     file: "License_biekitchen.pdf",
//     status: "Verified",
//   },
//   { title: "Tax Certificate", file: "Tax_biekitchen.pdf", status: "Verified" },
//   { title: "ID Proof (Owner)", file: "biebele_id.pdf", status: "Declined" },
//   {
//     title: "Business Registration",
//     file: "business_reg.pdf",
//     status: "Under Review",
//   },
// ];

// const reviews = [1, 2, 3, 4];

// const BusinessProfilePage = ({ params }) => {
//   const router = useRouter();

//   // Unwrap params to get the ID from the URL
//   const { id } = use(params);

//   // Find the specific business based on the URL ID
//   const business = MOCK_DATA.find((item) => item.key === id);

//   // Fallback if ID doesn't match any data
//   if (!business) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen">
//         <h2 className="text-xl font-bold">Business Not Found</h2>
//         <Button onClick={() => router.back()} className="mt-4">
//           Go Back
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-50 min-h-screen p-6">
//       {/* Top Header Navigation */}
//       <div className="flex items-center justify-between mb-6">
//         <div className="flex items-center gap-4">
//           <Button
//             icon={<RiArrowLeftLine />}
//             type="text"
//             onClick={() => router.back()}
//             className="hover:bg-gray-200 flex items-center justify-center"
//           />
//           <div>
//             <h1 className="text-xl font-bold text-gray-900 leading-tight">
//               {business.business_name}
//             </h1>
//             <p className="text-xs text-gray-500">
//               Business Management / Profile
//             </p>
//           </div>
//         </div>

//         {/* Search & User Profile Bar */}
//         <header className="h-20 bg-white border border-gray-100 flex items-center justify-between px-8 flex-1 max-w-4xl rounded-lg shadow-sm">
//           <div className="w-full max-w-md">
//             <Input
//               prefix={
//                 <img
//                   src="/images/search.png"
//                   alt="search"
//                   className="h-6 opacity-40"
//                 />
//               }
//               placeholder="Search"
//               className="rounded-full! bg-gray-50 border-none h-10 w-full"
//             />
//           </div>

//           <div className="flex items-center gap-6">
//             <Badge count={5} size="small" color="#060853">
//               <img
//                 src="/images/bell.png"
//                 alt="msg"
//                 className="h-6 cursor-pointer"
//               />
//             </Badge>
//             <div className="flex items-center gap-3 p-1.5 pr-4 rounded-full border border-gray-50 bg-white shadow-sm">
//               <Avatar src="https://i.pravatar.cc/150?u=admin" size={36} />
//               <div className="flex flex-col text-right">
//                 <span className="text-[11px] font-bold text-gray-900">
//                   Admin User
//                 </span>
//                 <span className="text-[9px] text-gray-400">Super Admin</span>
//               </div>
//             </div>
//           </div>
//         </header>
//       </div>

//       <div className="w-full bg-white border border-gray-100 rounded-sm p-6 flex flex-col md:flex-row gap-6 mb-5">
//         {/* 1. Business Image */}
//         <div className="w-full md:w-64 h-48 shrink-0">
//           <img
//             src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1000&auto=format&fit=crop"
//             alt="Bie's Kitchen"
//             className="w-full h-full object-cover rounded-lg"
//           />
//         </div>

//         {/* 2. Business Details */}
//         <div className="flex-1 space-y-4">
//           <div>
//             <h2 className="text-xl font-bold text-[#2A2A2A]">
//               {business.business_name}
//             </h2>
//             <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
//               <span>Food & Beverage</span>
//               <span className="text-gray-300">•</span>
//               <span>Restaurant & Cafe</span>
//               <span className="text-gray-300">•</span>
//               <span>Established 2018</span>
//             </div>
//           </div>

//           <p className="text-gray-600 text-sm leading-relaxed max-w-2xl">
//             Bie's Kitchen is an authentic local dishes and homemade food
//             products crafted by Chef Bie, specializing in traditional flavors,
//             culinary artistry, and, in some contexts, homemade goods like Leche
//             Flan and Biko
//           </p>

//           {/* Info Tags */}
//           <div className="flex flex-wrap gap-3 pt-2">
//             <div className="bg-[#E6FFFA] text-[#2D3748] px-4 py-2 rounded-md text-[13px] font-medium">
//               Business ID: BE-2018-002
//             </div>
//             <div className="bg-[#E6FFFA] text-[#2D3748] px-4 py-2 rounded-md text-[13px] font-medium">
//               Added: March 29, 2026
//             </div>
//             <div className="bg-[#E6FFFA] text-[#2D3748] px-4 py-2 rounded-md text-[13px] font-medium">
//               Last Updated: 2 hours ago
//             </div>
//           </div>
//         </div>

//         {/* 3. Verification Status Card */}
//         <div className="w-full md:w-72 bg-[#F8FAFC] rounded-xl p-5 border border-gray-50">
//           <div className="flex justify-between items-center mb-6">
//             <h3 className="font-bold text-gray-800 text-sm">
//               Verification Status
//             </h3>
//             <div className="flex items-center gap-1 text-[#E27C3E] text-[11px] font-bold uppercase">
//               <ClockCircleOutlined />
//               <span>Pending Review</span>
//             </div>
//           </div>

//           <div className="space-y-4">
//             {/* Step 1 */}
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <CheckSquareFilled className="text-[#10B981] text-lg" />
//                 <span className="text-sm text-gray-600 font-medium">
//                   Submitted
//                 </span>
//               </div>
//               <span className="text-xs text-gray-400">2 days ago</span>
//             </div>

//             {/* Step 2 */}
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="w-[18px] h-[18px] rounded-full border-2 border-[#E27C3E] flex items-center justify-center">
//                   <div className="w-2 h-2 bg-[#E27C3E] rounded-full"></div>
//                 </div>
//                 <span className="text-sm text-gray-800 font-bold">
//                   Under Review
//                 </span>
//               </div>
//               <span className="text-xs text-gray-500 font-medium italic">
//                 In Progress
//               </span>
//             </div>

//             {/* Step 3 */}
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="w-[18px] h-[18px] rounded-full bg-gray-200" />
//                 <span className="text-sm text-gray-400 font-medium">
//                   Decision
//                 </span>
//               </div>
//               <span className="text-xs text-gray-400">Pending</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
//         {/* 1. Owner Details Card (Spans 5 of 12 columns) */}
//         <div className="lg:col-span-5 bg-white border border-gray-100 rounded-sm p-6">
//           <h2 className="text-lg font-bold text-gray-900 mb-6">
//             Owner Details
//           </h2>

//           <div className="flex items-center gap-4 mb-8">
//             <Avatar
//               size={56}
//               src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
//               className="border-2 border-gray-50"
//             />
//             <div className="flex-1">
//               <div className="flex items-center justify-between">
//                 <h3 className="font-bold text-gray-900 text-base leading-tight">
//                   BieBele Edward
//                 </h3>
//                 <span className="text-[10px] text-gray-300 font-medium uppercase tracking-wider">
//                   Primary Contact
//                 </span>
//               </div>
//               <p className="text-gray-400 text-xs mt-0.5">Owner & Founder</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-y-6 gap-x-4">
//             <div className="flex items-start gap-3">
//               <div className="bg-[#E6FFFA] p-2.5 rounded-lg shrink-0">
//                 <MailOutlined className="text-[#0D9488] text-lg" />
//               </div>
//               <div className="min-w-0">
//                 <p className="text-sm font-bold text-gray-800 leading-tight truncate">
//                   oramafelix!gmail.com
//                 </p>
//                 <p className="text-[11px] text-gray-400 mt-1">Mail Address</p>
//               </div>
//             </div>

//             <div className="flex items-start gap-3">
//               <div className="bg-[#E6FFFA] p-2.5 rounded-lg shrink-0">
//                 <IdcardOutlined className="text-[#0D9488] text-lg" />
//               </div>
//               <div>
//                 <p className="text-sm font-bold text-gray-800 leading-tight">
//                   ID Type
//                 </p>
//                 <p className="text-[11px] text-gray-400 mt-1">
//                   Driver's License
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-start gap-3">
//               <div className="bg-[#E6FFFA] p-2.5 rounded-lg shrink-0">
//                 <PhoneOutlined className="text-[#0D9488] text-lg" />
//               </div>
//               <div>
//                 <p className="text-sm font-bold text-gray-800 leading-tight">
//                   +1 34699976830
//                 </p>
//                 <p className="text-[11px] text-gray-400 mt-1">Phone Number</p>
//               </div>
//             </div>

//             <div className="flex items-start gap-3">
//               <div className="bg-[#E6FFFA] p-2.5 rounded-lg shrink-0">
//                 <ScanOutlined className="text-[#0D9488] text-lg" />
//               </div>
//               <div>
//                 <p className="text-sm font-bold text-gray-800 leading-tight">
//                   ID Number
//                 </p>
//                 <p className="text-[11px] text-gray-400 mt-1">DL #6884403843</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* 2. Contact Information Card (Spans 7 of 12 columns) */}
//         <div className="lg:col-span-7 bg-white border border-gray-100 rounded-sm p-6">
//           <h2 className="text-lg font-bold text-gray-900 mb-8">
//             Contact Information
//           </h2>

//           <div className="grid grid-cols-2 gap-y-8 gap-x-8">
//             <div>
//               <p className="text-xs text-gray-400 mb-1.5 font-medium">
//                 Business Email
//               </p>
//               <p className="text-base font-bold text-gray-800">
//                 biekitchen@gmail.com
//               </p>
//             </div>

//             <div>
//               <p className="text-xs text-gray-400 mb-1.5 font-medium">
//                 Business Address
//               </p>
//               <p className="text-base font-bold text-gray-800">
//                 No. 34 wakali Street Ikeja, Lagos.
//               </p>
//             </div>

//             <div>
//               <p className="text-xs text-gray-400 mb-1.5 font-medium">
//                 Phone Number
//               </p>
//               <p className="text-base font-bold text-gray-800">+1 8990337293</p>
//             </div>

//             <div>
//               <p className="text-xs text-gray-400 mb-1.5 font-medium">
//                 Business Hours
//               </p>
//               <p className="text-base font-bold text-gray-800">
//                 Mon - Sun: 7:00 AM - 9:00 PM
//               </p>
//             </div>

//             <div className="col-span-2">
//               <p className="text-xs text-gray-400 mb-1.5 font-medium">
//                 Website
//               </p>
//               <p className="text-base font-bold text-gray-800 underline decoration-gray-200 underline-offset-4">
//                 biekitchen.com
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 pb-10 items-stretch">
//         {/* LEFT COLUMN: Products & Documents (5/12) */}
//         {/* Added flex flex-col to allow children to grow */}
//         <div className="lg:col-span-5 flex flex-col gap-6">
//           {/* Products & Services */}
//           <div className="bg-white border border-gray-100 rounded-sm p-6">
//             <h2 className="text-lg font-bold text-gray-900 mb-6">
//               Products & Services
//             </h2>
//             <div className="grid grid-cols-3 gap-3">
//               {products.map((item, index) => (
//                 <div
//                   key={index}
//                   className="bg-[#F1F5F9] text-gray-500 text-[11px] font-medium py-2.5 px-2 rounded-md text-center truncate"
//                 >
//                   {item}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Verification Documents */}
//           {/* Added flex-1 to make this card fill the remaining height */}
//           <div className="bg-white border border-gray-100 rounded-sm p-6 flex-1">
//             <h2 className="text-lg font-bold text-gray-900 mb-6">
//               Verification Documents
//             </h2>
//             <div className="space-y-5">
//               {documents.map((doc, index) => (
//                 <div key={index} className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div className="bg-gray-50 p-2 rounded-lg">
//                       <FileTextOutlined className="text-gray-400 text-lg" />
//                     </div>
//                     <div>
//                       <p className="text-sm font-bold text-gray-800 leading-tight">
//                         {doc.title}
//                       </p>
//                       <p className="text-[11px] text-gray-400 mt-0.5">
//                         {doc.file}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-4">
//                     {doc.status === "Verified" && (
//                       <span className="bg-[#E6FFFA] text-[#0D9488] text-[10px] font-bold px-2.5 py-1 rounded flex items-center gap-1">
//                         <CheckCircleFilled size={10} /> Verified
//                       </span>
//                     )}
//                     {doc.status === "Declined" && (
//                       <span className="bg-[#FFF5F5] text-[#E53E3E] text-[10px] font-bold px-2.5 py-1 rounded flex items-center gap-1">
//                         <CloseCircleFilled size={10} /> Declined
//                       </span>
//                     )}
//                     {doc.status === "Under Review" && (
//                       <span className="bg-[#EBF8FF] text-[#3182CE] text-[10px] font-bold px-2.5 py-1 rounded flex items-center gap-1">
//                         <ClockCircleFilled size={10} /> Under Review
//                       </span>
//                     )}
//                     <UploadOutlined className="text-gray-400 cursor-pointer hover:text-gray-600" />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* RIGHT COLUMN: Customer Reviews (7/12) */}
//         {/* flex flex-col ensures this fills the grid height automatically */}
//         <div className="lg:col-span-7 bg-white border border-gray-100 rounded-sm p-6 flex flex-col">
//           <h2 className="text-lg font-bold text-gray-900 mb-6">
//             Customer Reviews
//           </h2>

//           {/* Review Summary Stats */}
//           <div className="flex flex-col md:flex-row items-center gap-10 mb-5 border-b border-gray-50 pb-8">
//             <div className="bg-white border border-gray-50 shadow-sm rounded-xl p-6 text-center w-40 shrink-0">
//               <p className="text-3xl font-bold text-gray-900">4.9</p>
//               <p className="text-[10px] text-gray-400 mt-1">(128 reviews)</p>
//               <div className="flex justify-center gap-0.5 mt-2 text-[#F6AD55] text-xs">
//                 <StarFilled />
//                 <StarFilled />
//                 <StarFilled />
//                 <StarFilled />
//                 <StarFilled />
//               </div>
//             </div>

//             <div className="flex-1 w-full space-y-2">
//               {[
//                 { s: 5, v: 85, count: 102 },
//                 { s: 4, v: 45, count: 18 },
//                 { s: 3, v: 25, count: 6 },
//                 { s: 2, v: 10, count: 2 },
//                 { s: 1, v: 2, count: 0 },
//               ].map((row) => (
//                 <div key={row.s} className="flex items-center gap-3">
//                   <span className="text-[11px] text-gray-500 w-4">
//                     {row.s} <StarOutlined className="text-[9px]" />
//                   </span>
//                   <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
//                     <div
//                       className={`h-full rounded-full ${row.s > 2 ? "bg-[#F6AD55]" : "bg-gray-400"}`}
//                       style={{ width: `${row.v}%` }}
//                     ></div>
//                   </div>
//                   <span className="text-[11px] text-gray-400 w-6 text-right">
//                     {row.count}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Individual Review List */}
//           <div className="space-y-4 flex-1">
//             <div className="flex justify-end">
//               <button className="text-[11px] font-bold text-gray-400 hover:text-gray-600 uppercase tracking-wider">
//                 See All
//               </button>
//             </div>

//             {reviews.map((_, i) => (
//               <div
//                 key={i}
//                 className="border border-gray-50 rounded-xl p-5 hover:bg-gray-50/50 transition-colors"
//               >
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <div className="flex items-center gap-3">
//                       <p className="text-sm font-bold text-gray-800">
//                         Emily Davis
//                       </p>
//                       <Rate
//                         disabled
//                         defaultValue={5}
//                         className="text-[10px] text-[#F6AD55]"
//                       />
//                     </div>
//                     <p className="text-xs text-gray-500 mt-2 leading-relaxed">
//                       Great Product. Loved the quality and fast shipping. Will
//                       buy again
//                     </p>
//                   </div>
//                   <span className="text-[10px] text-gray-400 font-medium">
//                     2 days ago
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
//         {/* LEFT COLUMN: Admin Actions (4/12) */}
//         <div className="lg:col-span-4 bg-white border border-gray-100 rounded-sm p-6 flex flex-col">
//           <h2 className="text-lg font-bold text-gray-900 mb-6">
//             Admin Actions
//           </h2>

//           <div className="space-y-4">
//             <button className="w-full py-3 bg-[#10B981] hover:bg-[#059669] text-white rounded-sm flex items-center justify-center gap-2 text-sm font-medium transition-colors">
//               <CheckCircleOutlined /> Approve Business
//             </button>

//             <button className="w-full py-3 bg-[#7F1D1D] hover:bg-[#450a0a] text-white rounded-sm flex items-center justify-center gap-2 text-sm font-medium transition-colors">
//               <CloseCircleOutlined /> Reject Verification
//             </button>

//             <button className="w-full py-3 bg-[#FBBF24] hover:bg-[#f59e0b] text-white rounded-sm flex items-center justify-center gap-2 text-sm font-medium transition-colors">
//               <StopOutlined /> Suspend Account
//             </button>

//             <button className="w-full py-3 bg-white border border-[#3730a3] text-[#3730a3] rounded-sm flex items-center justify-center gap-2 text-sm font-medium hover:bg-indigo-50 transition-colors">
//               <MessageOutlined /> Send Message to Owner
//             </button>
//           </div>
//         </div>

//         {/* RIGHT COLUMN: Activity Timeline (8/12) */}
//         <div className="lg:col-span-8 bg-white border border-gray-100 rounded-sm p-6 flex flex-col">
//           <h2 className="text-lg font-bold text-gray-900 mb-6">
//             Activity Timeline
//           </h2>

//           <div className="relative space-y-8 flex-1">
//             {timelineData.map((item, index) => (
//               <div
//                 key={index}
//                 className="relative flex items-start justify-between"
//               >
//                 {/* Vertical Line Connector */}
//                 {index !== timelineData.length - 1 && (
//                   <div className="absolute left-[7px] top-[24px] w-[1px] h-full bg-gray-200"></div>
//                 )}

//                 <div className="flex gap-4">
//                   <div
//                     className={`w-3.5 h-3.5 rounded-full mt-1 z-10 ${item.color}`}
//                   ></div>
//                   <div>
//                     <p className="text-sm font-bold text-gray-800 leading-none">
//                       {item.title}
//                     </p>
//                     <p className="text-[11px] text-gray-400 mt-1.5">
//                       {item.subtitle}
//                     </p>
//                   </div>
//                 </div>

//                 <span className="text-[11px] text-gray-500 font-medium">
//                   {item.time}
//                 </span>
//               </div>
//             ))}

//             {/* Assigned Reviewer Item */}
//             <div className="flex items-center justify-between pt-2">
//               <div className="flex items-center gap-4">
//                 <img
//                   src="https://via.placeholder.com/24"
//                   alt="Admin"
//                   className="w-6 h-6 rounded-full object-cover"
//                 />
//                 <p className="text-sm font-bold text-gray-800">
//                   Review assigned to:{" "}
//                   <span className="font-medium text-gray-600">Admin User</span>
//                 </p>
//               </div>
//               <span className="text-[11px] text-gray-500 font-medium">
//                 1 day ago
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BusinessProfilePage;


"use client";
import React, { useState, useEffect } from "react";
import { Button, Tag, Rate, Input, Badge, Avatar, Spin } from "antd";
import { useRouter, useParams } from "next/navigation";
import {
  ClockCircleOutlined,
  CheckSquareFilled,
  FileTextOutlined,
  UploadOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  ClockCircleFilled,
  StarFilled,
  StarOutlined,
  CheckCircleOutlined, 
  CloseCircleOutlined, 
  StopOutlined, 
  MessageOutlined
} from "@ant-design/icons";

import { RiArrowLeftLine } from "react-icons/ri";

export default function BusinessProfilePage() {
  const router = useRouter();
  const { id } = useParams(); // Next.js App Router way to get the ID safely
  
  // States for API data, loading, and action processing
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch data from your backend API
  useEffect(() => {
    async function fetchBusinessData() {
      try {
        const response = await fetch(`/api/businesses/${id}`);
        const data = await response.json();
        setBusiness(data);
      } catch (error) {
        console.error("Error fetching business profile:", error);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchBusinessData();
  }, [id]);

  // Handler for Admin Actions (Approve, Reject, Suspend)
  const handleStatusUpdate = async (status) => {
    setSubmitting(true);
    try {
      const response = await fetch(`/api/businesses/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        // Refresh data or update local state
        setBusiness(prev => ({ ...prev, verificationStatus: status }));
      }
    } catch (error) {
      console.error(`Failed to update status to ${status}:`, error);
    } finally {
      setSubmitting(false);
    }
  };

  // Center a loader while waiting for API data so layout doesn't break jumpily
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Spin size="large" tip="Loading Business Profile..." />
      </div>
    );
  }

  // Fallback if API returns no data
  if (!business) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h2 className="text-xl font-bold text-gray-800">Business Not Found</h2>
        <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            icon={<RiArrowLeftLine />}
            type="text"
            onClick={() => router.back()}
            className="hover:bg-gray-200 flex items-center justify-center"
          />
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-tight">
              {business.business_name}
            </h1>
            <p className="text-xs text-gray-500">Business Management / Profile</p>
          </div>
        </div>

        {/* Search & User Profile Bar */}
        <header className="h-20 bg-white border border-gray-100 flex items-center justify-between px-8 flex-1 max-w-4xl rounded-lg shadow-sm">
          <div className="w-full max-w-md">
            <Input
              prefix={<img src="/images/search.png" alt="search" className="h-6 opacity-40" />}
              placeholder="Search"
              className="rounded-full bg-gray-50 border-none h-10 w-full"
            />
          </div>

          <div className="flex items-center gap-6">
            <Badge count={5} size="small" color="#060853">
              <img src="/images/bell.png" alt="msg" className="h-6 cursor-pointer" />
            </Badge>
            <div className="flex items-center gap-3 p-1.5 pr-4 rounded-full border border-gray-50 bg-white shadow-sm">
              <Avatar src="https://i.pravatar.cc/150?u=admin" size={36} />
              <div className="flex flex-col text-right">
                <span className="text-[11px] font-bold text-gray-900">Admin User</span>
                <span className="text-[9px] text-gray-400">Super Admin</span>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Main Banner Info Card */}
      <div className="w-full bg-white border border-gray-100 rounded-sm p-6 flex flex-col md:flex-row gap-6 mb-5">
        <div className="w-full md:w-64 h-48 shrink-0">
          <img
            src={business.image || "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1000&auto=format&fit=crop"}
            alt={business.business_name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-xl font-bold text-[#2A2A2A]">{business.business_name}</h2>
            <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
              <span>{business.category || "Food & Beverage"}</span>
              <span className="text-gray-300">•</span>
              <span>Established {business.established || "2018"}</span>
            </div>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed max-w-2xl">
            {business.description}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <div className="bg-[#E6FFFA] text-[#2D3748] px-4 py-2 rounded-md text-[13px] font-medium">
              Business ID: {business.business_id || `BE-${business.established}-002`}
            </div>
            <div className="bg-[#E6FFFA] text-[#2D3748] px-4 py-2 rounded-md text-[13px] font-medium">
              Added: {new Date(business.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Verification Status Card */}
        <div className="w-full md:w-72 bg-[#F8FAFC] rounded-xl p-5 border border-gray-50">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800 text-sm">Verification Status</h3>
            <div className="flex items-center gap-1 text-[#E27C3E] text-[11px] font-bold uppercase">
              <ClockCircleOutlined />
              <span>{business.verificationStatus || "Pending Review"}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckSquareFilled className="text-[#10B981] text-lg" />
                <span className="text-sm text-gray-600 font-medium">Submitted</span>
              </div>
              <span className="text-xs text-gray-400">2 days ago</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-[18px] h-[18px] rounded-full border-2 border-[#E27C3E] flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#E27C3E] rounded-full"></div>
                </div>
                <span className="text-sm text-gray-800 font-bold">Under Review</span>
              </div>
              <span className="text-xs text-gray-500 font-medium italic">In Progress</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Content Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Owner Details */}
        <div className="lg:col-span-5 bg-white border border-gray-100 rounded-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Owner Details</h2>
          <div className="flex items-center gap-4 mb-8">
            <Avatar size={56} src={business.owner_avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} />
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-base leading-tight">{business.owner_name}</h3>
              <p className="text-gray-400 text-xs mt-0.5">Owner & Founder</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-6 gap-x-4">
            <div className="flex items-start gap-3">
              <div className="bg-[#E6FFFA] p-2.5 rounded-lg"><CheckCircleFilled className="text-[#0D9488]" /></div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-gray-800 truncate">{business.email}</p>
                <p className="text-[11px] text-gray-400 mt-1">Mail Address</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-[#E6FFFA] p-2.5 rounded-lg"><CheckCircleFilled className="text-[#0D9488]" /></div>
              <div>
                <p className="text-sm font-bold text-gray-800">{business.phone}</p>
                <p className="text-[11px] text-gray-400 mt-1">Phone Number</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="lg:col-span-7 bg-white border border-gray-100 rounded-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-8">Contact Information</h2>
          <div className="grid grid-cols-2 gap-y-8 gap-x-8">
            <div>
              <p className="text-xs text-gray-400 mb-1.5 font-medium">Business Address</p>
              <p className="text-base font-bold text-gray-800">{business.location}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1.5 font-medium">Business Hours</p>
              <p className="text-base font-bold text-gray-800">{business.hours}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-gray-400 mb-1.5 font-medium">Website</p>
              <p className="text-base font-bold text-gray-800 underline decoration-gray-200">{business.website}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products & Documents & Reviews Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 pb-10">
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Products & Services */}
          <div className="bg-white border border-gray-100 rounded-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Products & Services</h2>
            <div className="grid grid-cols-3 gap-3">
              {business.products?.map((item, index) => (
                <div key={index} className="bg-[#F1F5F9] text-gray-500 text-[11px] font-medium py-2.5 px-2 rounded-md text-center truncate">
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Verification Documents */}
          <div className="bg-white border border-gray-100 rounded-sm p-6 flex-1">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Verification Documents</h2>
            <div className="space-y-5">
              {business.documents?.map((doc, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-50 p-2 rounded-lg"><FileTextOutlined className="text-gray-400 text-lg" /></div>
                    <div>
                      <p className="text-sm font-bold text-gray-800 leading-tight">{doc.title}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{doc.file}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded ${
                      doc.status === "Verified" ? "bg-[#E6FFFA] text-[#0D9488]" : "bg-[#FFF5F5] text-[#E53E3E]"
                    }`}>{doc.status}</span>
                    <UploadOutlined className="text-gray-400 cursor-pointer" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Customer Reviews UI Element */}
        <div className="lg:col-span-7 bg-white border border-gray-100 rounded-sm p-6 flex flex-col">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Customer Reviews</h2>
          <div className="flex flex-col md:flex-row items-center gap-10 mb-5 pb-8 border-b border-gray-50">
            <div className="bg-white border border-gray-50 shadow-sm rounded-xl p-6 text-center w-40 shrink-0">
              <p className="text-3xl font-bold text-gray-900">{business.rating || "0.0"}</p>
              <div className="flex justify-center gap-0.5 mt-2 text-[#F6AD55] text-xs"><StarFilled /><StarFilled /></div>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Action Action Buttons section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-4 bg-white border border-gray-100 rounded-sm p-6 flex flex-col">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Admin Actions</h2>
          <div className="space-y-4">
            <button 
              disabled={submitting}
              onClick={() => handleStatusUpdate("Approved")}
              className="w-full py-3 bg-[#10B981] hover:bg-[#059669] text-white rounded-sm flex items-center justify-center gap-2 text-sm font-medium transition-colors disabled:opacity-50"
            >
              <CheckCircleOutlined /> Approve Business
            </button>
            <button 
              disabled={submitting}
              onClick={() => handleStatusUpdate("Rejected")}
              className="w-full py-3 bg-[#7F1D1D] hover:bg-[#450a0a] text-white rounded-sm flex items-center justify-center gap-2 text-sm font-medium transition-colors disabled:opacity-50"
            >
              <CloseCircleOutlined /> Reject Verification
            </button>
            <button 
              disabled={submitting}
              onClick={() => handleStatusUpdate("Suspended")}
              className="w-full py-3 bg-[#FBBF24] hover:bg-[#f59e0b] text-white rounded-sm flex items-center justify-center gap-2 text-sm font-medium transition-colors disabled:opacity-50"
            >
              <StopOutlined /> Suspend Account
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

// "use client";
// import React, { useState, useEffect, use } from "react";
// import { Button, Input, Avatar, Spin, message, Modal } from "antd";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import api from "@/api/axios";

// const BusinessProfilePage = ({ params }) => {
//   const router = useRouter();
//   const resolvedParams = params ? use(params) : { id: "default" };
//   const id = resolvedParams.id;

//   const [loading, setLoading] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [rejectReason, setRejectReason] = useState("");
//   const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  
//   // Real dynamic state initialized cleanly with safe fallback paths
//   const [business, setBusiness] = useState(null);

//   const fetchBusinessProfile = async () => {
//     if (id === "default") return;
//     setLoading(true);
//     try {
//       const response = await api.get(`/admin/${id}`);
//       if (response.data.success) {
//         setBusiness(response.data.business);
//       }
//     } catch (error) {
//       message.error(error.response?.data?.message || "Failed to fetch profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBusinessProfile();
//   }, [id]);

//   const handleVerify = async (status, reason = "") => {
//     setSubmitting(true);
//     try {
//       const response = await api.patch(`/admin/${id}/verify`, {
//         status,
//         rejectionReason: reason,
//       });
//       if (response.data.success) {
//         message.success(`Business verification status updated to ${status}!`);
//         setIsRejectModalOpen(false);
//         fetchBusinessProfile();
//       }
//     } catch (error) {
//       message.error(error.response?.data?.message || "Verification status update failed");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="h-screen w-full flex items-center justify-center bg-white">
//         <Spin size="large" />
//       </div>
//     );
//   }

//   // Safe fallback structural object structure if API has not completed loading yet
//   const data = business || {
//     businessName: "Loading...",
//     category: "N/A",
//     subCategory: "N/A",
//     establishedYear: "",
//     description: "",
//     businessID: "N/A",
//     createdAt: null,
//     updatedAt: null,
//     verificationStatus: "pending",
//     owner: { name: "N/A", role: "business", email: "N/A", phone: "N/A", idType: "N/A", idNumber: "N/A" },
//     contact: { email: "N/A", phone: "N/A", website: "N/A", address: "N/A", hours: "N/A" },
//     productsAndServices: [],
//     verificationDocuments: [],
//     reviews: [],
//     timeline: []
//   };

//   // Safe Status mapping configurations
//   const getStatusLabel = (status) => {
//     switch (status?.toLowerCase()) {
//       case "approved": return "Verified";
//       case "rejected": case "cancelled": return "Rejected";
//       default: return "Pending Review";
//     }
//   };

//   const getStatusColorClass = (status) => {
//     switch (status?.toLowerCase()) {
//       case "approved": return "text-[#15BE87] bg-[#EBF7F5]";
//       case "rejected": case "cancelled": return "text-[#EB5757] bg-[#FCE8E6]";
//       default: return "text-[#F2994A] bg-[#FFF8E6]";
//     }
//   };

//   return (
//     <div className="bg-white min-h-screen px-8 py-6 space-y-6 text-[#2A2A2A]">
      
//       {/* Top Breadcrumb Navigation Row */}
//       <div className="flex items-center justify-between pb-2">
//         <div className="flex items-center gap-2 cursor-pointer text-xs" onClick={() => router.back()}>
//           <img src="/images/arrow_left.png" alt="back" className="w-4 h-4 object-contain" />
//           <span className="font-bold text-gray-900 hover:underline">Business Management</span>
//           <span className="text-gray-400">/</span>
//           <span className="text-gray-400 font-medium">{data.businessName}</span>
//         </div>
//       </div>

//       {/* Corporate Profile Top Identity Box Panel */}
//       <div className="w-full bg-white border border-gray-100 rounded-xl p-6 flex flex-col lg:flex-row gap-6 shadow-sm">
//         <div className="w-full lg:w-56 h-40 shrink-0">
//           <img
//             src="/images/kitchen_banner.png"
//             alt="Business Banner"
//             className="w-full h-full object-cover rounded-lg"
//           />
//         </div>

//         <div className="flex-1 min-w-0">
//           <h2 className="text-xl font-bold text-black tracking-tight">{data.businessName}</h2>
//           <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mt-1">
//             <span>{data.category}</span>
//             {data.subCategory && (
//               <>
//                 <span>•</span>
//                 <span>{data.subCategory}</span>
//               </>
//             )}
//             {data.establishedYear && (
//               <>
//                 <span>•</span>
//                 <span>Established {data.establishedYear}</span>
//               </>
//             )}
//           </div>
//           <p className="text-gray-500 text-xs leading-relaxed mt-2.5 max-w-3xl">
//             {data.description || "No business description provided."}
//           </p>

//           {/* Badge Metadata Row */}
//           <div className="flex flex-wrap gap-2 mt-4">
//             <span className="bg-[#EBF7F5] text-[#00A389] px-2.5 py-1 rounded text-[11px] font-medium">
//               Business ID: {data.businessID || data._id || "N/A"}
//             </span>
//             <span className="bg-[#EBF7F5] text-[#00A389] px-2.5 py-1 rounded text-[11px] font-medium">
//               Added: {data.createdAt ? new Date(data.createdAt).toLocaleDateString("en-GB") : "N/A"}
//             </span>
//             <span className="bg-[#EBF7F5] text-[#00A389] px-2.5 py-1 rounded text-[11px] font-medium">
//               Last Updated: {data.updatedAt ? new Date(data.updatedAt).toLocaleDateString("en-GB") : "Just now"}
//             </span>
//           </div>
//         </div>

//         {/* Verification Tracking Right Panel */}
//         <div className="w-full lg:w-64 border-t lg:border-t-0 lg:border-l pt-4 lg:pt-0 lg:pl-6 border-gray-100 flex flex-col justify-between">
//           <div className="flex justify-between items-center mb-3">
//             <h3 className="font-bold text-xs text-black">Verification Status</h3>
//             <span className={`text-[11px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 ${getStatusColorClass(data.verificationStatus)}`}>
//               {getStatusLabel(data.verificationStatus)}
//             </span>
//           </div>
//           <div className="space-y-2 text-xs">
//             <div className="flex items-center justify-between text-gray-500">
//               <span className="flex items-center gap-1.5 font-medium">
//                 <input type="checkbox" checked={!!data.createdAt} readOnly className="accent-[#15BE87] h-3 w-3 rounded" /> Submitted
//               </span>
//               <span className="text-[11px]">Completed</span>
//             </div>
//             <div className="flex items-center justify-between text-gray-500">
//               <span className="flex items-center gap-1.5 font-medium">
//                 <span className={`h-3 w-3 rounded-full border-2 bg-transparent inline-block ${data.verificationStatus === "pending" ? "border-[#F2994A]" : "border-gray-300"}`}></span> Under Review
//               </span>
//               <span className={`text-[11px] font-medium ${data.verificationStatus === "pending" ? "text-[#F2994A]" : "text-gray-400"}`}>
//                 {data.verificationStatus === "pending" ? "In Progress" : "Done"}
//               </span>
//             </div>
//             <div className="flex items-center justify-between text-gray-500">
//               <span className="flex items-center gap-1.5 font-medium">
//                 <span className={`h-3 w-3 rounded-full border bg-transparent inline-block ${data.verificationStatus !== "pending" ? "border-blue-500" : "border-gray-300"}`}></span> Decision
//               </span>
//               <span className="text-[11px] font-medium capitalize">{data.verificationStatus}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Structural Twin Grid Columns Box Section Layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
//         {/* Left Hand Side Column */}
//         <div className="space-y-6">
          
//           {/* Owner Details Profile Card */}
//           <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
//             <h3 className="text-sm font-bold text-black mb-4">Owner Details</h3>
//             <div className="flex items-center gap-3 mb-5">
//               <Avatar size={44} src="/images/avatar_owner.png" className="border border-gray-200" />
//               <div>
//                 <div className="flex items-center gap-2">
//                   <h4 className="font-bold text-xs text-black">{(data.owner?.fullName) || data.owner?.name || "N/A"}</h4>
//                   <span className="text-[10px] text-gray-400 font-medium bg-gray-50 px-1 rounded">Primary Contact</span>
//                 </div>
//                 <p className="text-[11px] text-gray-400 font-medium mt-0.5">{data.owner?.role || "Owner & Founder"}</p>
//               </div>
//             </div>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 pt-4 border-t border-gray-50">
//               <div className="flex items-start gap-2.5">
//                 <div className="p-2 bg-[#EBF7F5] rounded shrink-0">
//                   <img src="/images/search.png" className="w-3.5 h-3.5 object-contain opacity-60" alt="" />
//                 </div>
//                 <div className="min-w-0">
//                   <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Mail Address</p>
//                   <p className="text-xs font-bold text-black mt-0.5 truncate">{data.owner?.email || "N/A"}</p>
//                 </div>
//               </div>
//               <div className="flex items-start gap-2.5">
//                 <div className="p-2 bg-[#EBF7F5] rounded shrink-0">
//                   <img src="/images/cube.png" className="w-3.5 h-3.5 object-contain opacity-60" alt="" />
//                 </div>
//                 <div>
//                   <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">ID Type</p>
//                   <p className="text-xs font-bold text-black mt-0.5">{data.owner?.idType || "N/A"}</p>
//                 </div>
//               </div>
//               <div className="flex items-start gap-2.5">
//                 <div className="p-2 bg-[#EBF7F5] rounded shrink-0">
//                   <img src="/images/dots.png" className="w-3.5 h-3.5 object-contain opacity-60" alt="" />
//                 </div>
//                 <div>
//                   <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Phone Number</p>
//                   <p className="text-xs font-bold text-black mt-0.5">{data.owner?.phone || "N/A"}</p>
//                 </div>
//               </div>
//               <div className="flex items-start gap-2.5">
//                 <div className="p-2 bg-[#EBF7F5] rounded shrink-0">
//                   <img src="/images/cube.png" className="w-3.5 h-3.5 object-contain opacity-60" alt="" />
//                 </div>
//                 <div>
//                   <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">ID Number</p>
//                   <p className="text-xs font-bold text-black mt-0.5">{data.owner?.idNumber || "N/A"}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Products & Services Dynamic Component */}
//           <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
//             <h3 className="text-sm font-bold text-black mb-4">Products & Services</h3>
//             <div className="flex flex-wrap gap-2">
//               {data.productsAndServices?.length ? (
//                 data.productsAndServices.map((item, idx) => (
//                   <span key={idx} className="bg-[#F1F3F6] text-gray-600 px-3 py-1.5 rounded text-xs font-medium">
//                     {item}
//                   </span>
//                 ))
//               ) : (
//                 ["Food Ordering", "Seasonal Gifts", "Wedding Cakes", "Home Delivery", "Catering"].map((item, idx) => (
//                   <span key={idx} className="bg-[#F1F3F6] text-gray-600 px-3 py-1.5 rounded text-xs font-medium">
//                     {item}
//                   </span>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* Verification Legal Compliance Document Attachments */}
//           <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
//             <h3 className="text-sm font-bold text-black mb-4">Verification Documents</h3>
//             <div className="space-y-3">
//               {(data.verificationDocuments?.length ? data.verificationDocuments : [
//                 { label: "Business License", name: "License_biekitchen.pdf", status: "Verified", color: "bg-[#EBF7F5] text-[#15BE87]" },
//                 { label: "Tax Certificate", name: "Tax_biekitchen.pdf", status: "Verified", color: "bg-[#EBF7F5] text-[#15BE87]" }
//               ]).map((doc, idx) => (
//                 <div key={idx} className="flex items-center justify-between p-2.5 bg-white border border-gray-100 rounded-lg">
//                   <div className="flex items-center gap-3">
//                     <img src="/images/list_view.png" alt="pdf" className="w-5 h-5 object-contain opacity-70" />
//                     <div>
//                       <h4 className="font-bold text-xs text-black">{doc.label}</h4>
//                       <p className="text-[11px] text-gray-400 mt-0.5">{doc.name}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-4">
//                     <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${doc.color || "bg-gray-100 text-gray-600"}`}>
//                       {doc.status}
//                     </span>
//                     <Button className="border-none bg-transparent p-0 flex items-center justify-center shadow-none h-6 w-6 hover:bg-gray-100 rounded-full">
//                       <img src="/images/upload.png" className="w-3.5 h-3.5 object-contain rotate-180" alt="download" />
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Interactive Core Control Action Triggers Block Panel */}
//           <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-3">
//             <h3 className="text-sm font-bold text-black mb-2">Admin Actions</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//               <Button 
//                 onClick={() => handleVerify("approved")}
//                 loading={submitting}
//                 disabled={data.verificationStatus === "approved"}
//                 className="w-full h-10 bg-[#15BE87] hover:bg-[#12a173]! text-white text-xs font-bold rounded-lg border-none shadow-none flex items-center justify-center gap-2"
//               >
//                 Approve Business
//               </Button>
//               <Button 
//                 onClick={() => setIsRejectModalOpen(true)}
//                 disabled={data.verificationStatus === "rejected"}
//                 className="w-full h-10 bg-[#7B0000] hover:bg-[#5e0000]! text-white text-xs font-bold rounded-lg border-none shadow-none flex items-center justify-center gap-2"
//               >
//                 Reject Verification
//               </Button>
//             </div>
//             <Button className="w-full h-10 bg-[#F2C94C] hover:bg-[#dbb53d]! text-white text-xs font-bold rounded-lg border-none shadow-none flex items-center justify-center gap-2">
//               Suspend Account
//             </Button>
//             <Button className="w-full h-10 bg-white hover:bg-gray-50! text-[#060853] text-xs font-bold rounded-lg border border-[#060853] shadow-none flex items-center justify-center gap-2">
//               Send Message to Owner
//             </Button>
//           </div>

//         </div>

//         {/* Right Hand Side Column */}
//         <div className="space-y-6">
          
//           {/* Detailed Contact Grid Box */}
//           <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
//             <h3 className="text-sm font-bold text-black mb-4">Contact Information</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-xs">
//               <div>
//                 <p className="text-gray-400 font-medium">Business Email</p>
//                 <p className="font-bold text-gray-900 mt-1 break-all">{data.contact?.email || "N/A"}</p>
//               </div>
//               <div>
//                 <p className="text-gray-400 font-medium">Business Address</p>
//                 <p className="font-bold text-gray-900 mt-1">{data.contact?.address || "N/A"}</p>
//               </div>
//               <div>
//                 <p className="text-gray-400 font-medium">Phone Number</p>
//                 <p className="font-bold text-gray-900 mt-1">{data.contact?.phone || "N/A"}</p>
//               </div>
//               <div>
//                 <p className="text-gray-400 font-medium">Business Hours</p>
//                 <p className="font-bold text-gray-900 mt-1">{data.contact?.hours || "N/A"}</p>
//               </div>
//               <div className="sm:col-span-2">
//                 <p className="text-gray-400 font-medium">Website</p>
//                 {data.contact?.website ? (
//                   <a href={`https://${data.contact.website}`} target="_blank" rel="noreferrer" className="font-bold text-blue-600 hover:underline block mt-1">
//                     {data.contact.website}
//                   </a>
//                 ) : (
//                   <p className="font-bold text-gray-900 mt-1">N/A</p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Customer Reviews Analytic Performance Summary Grid Dashboard */}
//           <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
//             <h3 className="text-sm font-bold text-black mb-4">Customer Reviews</h3>
            
//             <div className="flex items-center gap-6 mb-4">
//               <div className="bg-[#FAFAFA] border border-gray-100 rounded-xl p-4 text-center w-28 shrink-0">
//                 <p className="text-3xl font-bold text-black">4.9</p>
//                 <p className="text-[9px] text-gray-400 font-semibold mt-0.5">(128 reviews)</p>
//                 <div className="flex justify-center gap-0.5 mt-1">
//                   {Array(5).fill(0).map((_, i) => (
//                     <img key={i} src="/images/trust_star.png" className="w-2.5 h-2.5 object-contain" alt="star" />
//                   ))}
//                 </div>
//               </div>
              
//               {/* Star breakdown rows configuration */}
//               <div className="flex-1 space-y-1.5">
//                 {[
//                   { star: "5☆", count: 102, percent: "w-[80%] bg-[#F2C94C]" },
//                   { star: "4☆", count: 18, percent: "w-[20%] bg-[#F2C94C]" },
//                   { star: "3☆", count: 6, percent: "w-[8%] bg-[#F2C94C]" },
//                   { star: "2☆", count: 2, percent: "w-[4%] bg-gray-300" },
//                   { star: "1☆", count: 0, percent: "w-0 bg-transparent" }
//                 ].map((row, i) => (
//                   <div key={i} className="flex items-center text-[11px] font-medium text-gray-500 gap-2">
//                     <span className="w-4 shrink-0">{row.star}</span>
//                     <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
//                       <div className={`h-full rounded-full ${row.percent}`}></div>
//                     </div>
//                     <span className="w-5 text-right shrink-0">{row.count}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <p className="text-right text-xs font-bold text-[#2F80ED] cursor-pointer mb-4 hover:underline">See All</p>

//             {/* Individual Reviews Feed Layout */}
//             <div className="space-y-3">
//               {(data.reviews?.length ? data.reviews : [
//                 { name: "Emily Davis", days: "2 days ago", comment: "Great Product. Loved the quality and fast shipping. Will buy again" }
//               ]).map((rev, idx) => (
//                 <div key={idx} className="p-3 bg-white border border-gray-100 rounded-lg">
//                   <div className="flex justify-between items-center text-xs">
//                     <div className="flex items-center gap-2">
//                       <span className="font-bold text-black">{rev.name}</span>
//                       <div className="flex gap-0.5">
//                         {Array(5).fill(0).map((_, i) => (
//                           <img key={i} src="/images/trust_star.png" className="w-2 h-2 object-contain" alt="" />
//                         ))}
//                       </div>
//                     </div>
//                     <span className="text-gray-400 text-[10px]">{rev.days}</span>
//                   </div>
//                   <p className="text-gray-500 text-[11px] mt-2 leading-relaxed">{rev.comment}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* System Audit Activity Timeline Logs Section */}
//           <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
//             <h3 className="text-sm font-bold text-black mb-6">Activity Timeline</h3>
//             <div className="relative pl-6 border-l-2 border-gray-100 space-y-6">
//               {[
//                 { title: "Verification Process Started", detail: "System updated", time: "2 days ago", color: "bg-[#060853]" },
//                 { title: "Documents Uploaded for Review", detail: "By Business Owner", time: "2 days ago", color: "bg-[#F2994A]" }
//               ].map((act, i) => (
//                 <div key={i} className="relative text-xs">
//                   <span className={`absolute -left-[31px] top-0.5 h-2.5 w-2.5 rounded-full ${act.color} ring-4 ring-white`}></span>
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h4 className="font-bold text-black">{act.title}</h4>
//                       <p className="text-[11px] text-gray-400 mt-0.5">{act.detail}</p>
//                     </div>
//                     <span className="text-gray-400 text-[11px] whitespace-nowrap">{act.time}</span>
//                   </div>
//                 </div>
//               ))}
//               <div className="relative text-xs">
//                 <span className="absolute -left-[37px] top-0.5 ring-4 ring-white rounded-full">
//                   <Avatar size={22} src="/images/avatar_owner.png" />
//                 </span>
//                 <div className="flex justify-between items-start pl-1">
//                   <div>
//                     <h4 className="font-bold text-black">Review Assigned to Current Admin Session</h4>
//                   </div>
//                   <span className="text-gray-400 text-[11px] whitespace-nowrap">Just now</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* Decline Rejection Modal context Input Form */}
//       <Modal
//         title="Input Audit Rejection Reason"
//         open={isRejectModalOpen}
//         onOk={() => handleVerify("rejected", rejectReason)}
//         onCancel={() => setIsRejectModalOpen(false)}
//         confirmLoading={submitting}
//         okButtonProps={{ danger: true }}
//         okText="Decline Application"
//       >
//         <p className="text-xs text-gray-400 mb-2">Provide explicit notes detailing the missing items or verification issues for the owner.</p>
//         <Input.TextArea
//           rows={4}
//           value={rejectReason}
//           onChange={(e) => setRejectReason(e.target.value)}
//           placeholder="e.g., Documents provided are blurry or business name mismatch..."
//         />
//       </Modal>

//     </div>
//   );
// };

// export default BusinessProfilePage;
