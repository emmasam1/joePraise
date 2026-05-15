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
import React, { useEffect } from "react";
import { Button, Avatar, Input, Badge, Rate } from "antd";
import { useRouter, useParams } from "next/navigation";
import { useBusinessStore } from "@/store/businessStore";
import {
  MailOutlined,
  PhoneOutlined,
  IdcardOutlined,
  ScanOutlined,
  FileTextOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  ClockCircleFilled,
  StarFilled,
  StarOutlined,
} from "@ant-design/icons";

const BusinessProfilePage = () => {
  const router = useRouter();
  const params = useParams();

  const { selectedBusiness, fetchBusiness, loading } = useBusinessStore();

  const id = params?.id;

  useEffect(() => {
    if (id) fetchBusiness(id);
  }, [id]);

  const business = selectedBusiness;

  if (loading || !business) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading business profile...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <Button onClick={() => router.back()}>Back</Button>

        <header className="h-20 bg-white border border-gray-100 flex items-center justify-between px-8 flex-1 max-w-4xl rounded-lg shadow-sm">
          <Input placeholder="Search" className="max-w-md" />

          <Badge count={5}>
            <img src="/images/bell.png" className="h-6" />
          </Badge>

          <Avatar src={business.owner?.avatar || "https://i.pravatar.cc/150"} />
        </header>
      </div>

      {/* BUSINESS HEADER CARD */}
      <div className="w-full bg-white border rounded-sm p-6 flex flex-col md:flex-row gap-6 mb-5">

        <div className="w-full md:w-64 h-48">
          <img
            src={business.banner || "https://images.unsplash.com/photo-1552566626-52f8b828add9"}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="flex-1 space-y-4">
          <h2 className="text-xl font-bold">
            {business.businessName}
          </h2>

          <div className="text-sm text-gray-500 flex gap-2 flex-wrap">
            <span>{business.category}</span>
            <span>•</span>
            <span>{business.businessCity}</span>
            <span>•</span>
            <span>
              Established {business.establishedYear || "N/A"}
            </span>
          </div>

          <p className="text-gray-600 text-sm">
            {business.description || "No description provided"}
          </p>

          <div className="flex gap-3 flex-wrap">
            <div className="bg-[#E6FFFA] px-4 py-2 rounded-md text-[12px]">
              Business ID: {business.businessId || business._id}
            </div>

            <div className="bg-[#E6FFFA] px-4 py-2 rounded-md text-[12px]">
              Added:{" "}
              {new Date(business.createdAt).toDateString()}
            </div>

            <div className="bg-[#E6FFFA] px-4 py-2 rounded-md text-[12px]">
              Status: {business.verificationStage}
            </div>
          </div>
        </div>

        {/* VERIFICATION CARD */}
        <div className="w-full md:w-72 bg-[#F8FAFC] rounded-xl p-5 border">

          <div className="flex justify-between mb-5">
            <h3 className="font-bold text-sm">
              Verification Status
            </h3>

            <span className="text-xs font-bold uppercase text-orange-500 flex items-center gap-1">
              <ClockCircleFilled />
              {business.verificationStage}
            </span>
          </div>

          <div className="space-y-4">

            <div className="flex justify-between">
              <span className="flex items-center gap-2">
                <CheckCircleFilled className="text-green-500" />
                Submitted
              </span>
              <span className="text-xs text-gray-400">
                {business.createdAt
                  ? new Date(business.createdAt).toDateString()
                  : "—"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="flex items-center gap-2 font-bold">
                <ClockCircleFilled className="text-orange-400" />
                Under Review
              </span>
              <span className="text-xs text-gray-500">
                In progress
              </span>
            </div>

            <div className="flex justify-between">
              <span className="flex items-center gap-2 text-gray-400">
                <CloseCircleFilled />
                Decision
              </span>
              <span className="text-xs text-gray-400">
                Pending
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* OWNER + CONTACT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">

        {/* OWNER */}
        <div className="lg:col-span-5 bg-white border rounded-sm p-6">
          <h2 className="font-bold mb-6">Owner Details</h2>

          <div className="flex items-center gap-4 mb-6">
            <Avatar size={56} src={business.owner?.avatar} />

            <div>
              <h3 className="font-bold">
                {business.owner?.fullName || "N/A"}
              </h3>
              <p className="text-xs text-gray-400">
                Owner & Founder
              </p>
            </div>
          </div>

          <div className="space-y-4">

            <div className="flex gap-3">
              <MailOutlined />
              <div>
                <p className="font-bold">
                  {business.owner?.email || "N/A"}
                </p>
                <p className="text-xs text-gray-400">Email</p>
              </div>
            </div>

            <div className="flex gap-3">
              <PhoneOutlined />
              <div>
                <p className="font-bold">
                  {business.owner?.phone || "N/A"}
                </p>
                <p className="text-xs text-gray-400">Phone</p>
              </div>
            </div>

            <div className="flex gap-3">
              <IdcardOutlined />
              <div>
                <p className="font-bold">
                  {business.owner?.idType || "N/A"}
                </p>
                <p className="text-xs text-gray-400">ID Type</p>
              </div>
            </div>

          </div>
        </div>

        {/* CONTACT */}
        <div className="lg:col-span-7 bg-white border rounded-sm p-6">
          <h2 className="font-bold mb-6">
            Contact Information
          </h2>

          <div className="grid grid-cols-2 gap-6">

            <div>
              <p className="text-xs text-gray-400">
                Business Email
              </p>
              <p className="font-bold">
                {business.businessEmail}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Phone
              </p>
              <p className="font-bold">
                {business.businessPhone}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Address
              </p>
              <p className="font-bold">
                {business.address}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Website
              </p>
              <p className="font-bold underline">
                {business.website || "N/A"}
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="bg-white border mt-6 p-6">
        <h2 className="font-bold mb-4">
          Products & Services
        </h2>

        <div className="flex flex-wrap gap-2">
          {(business.products || []).map((p, i) => (
            <span
              key={i}
              className="bg-gray-100 px-3 py-1 text-xs rounded"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* REVIEWS (STATIC UNTIL YOU CONNECT API) */}
      <div className="bg-white border mt-6 p-6">
        <h2 className="font-bold mb-4">
          Customer Reviews
        </h2>

        <p className="text-gray-400 text-sm">
          Reviews will load from backend endpoint later.
        </p>
      </div>

    </div>
  );
};

export default BusinessProfilePage;