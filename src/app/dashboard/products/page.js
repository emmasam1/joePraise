
// "use client";
// import React, { useState, useEffect } from "react";
// import { Input, Button, Table, Dropdown, Select, Radio, Switch, Upload } from "antd";
// import { motion, AnimatePresence } from "framer-motion"; 
// import CustomModal from "@/components/CustomModal";
// import ConfirmActionModal from "@/components/ConfirmActionModal";
// import Image from "next/image";
// import { InboxOutlined } from "@ant-design/icons";
// import { useListingStore } from "@/store/listingStore";

// const { TextArea } = Input;

// const ProductManagementPage = () => {
//   const { createService, getMyServices, services, loading } = useListingStore();

//   const [activeTab, setActiveTab] = useState("All");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isDeletingModalOpen, setIsDeletingModalOpen] = useState(false);
//   const [isSelected, setIsSelected] = useState(null);
//   const [isAddingProduct, setIsAddingProduct] = useState(false);

//   // Core structured single-state form handling
//   const [formData, setFormData] = useState({
//     name: "",
//     category: "cakes",
//     description: "",
//     sku: "",
//     stock: 0,
//     weight: "",
//     dimensions: "",
//     price: "",
//     minPrice: "",
//     maxPrice: "",
//     openingTime: "",
//     closingTime: "",
//     earliestNotice: "",
//     latestWindow: "",
//     bufferSession: "",
//     maxBookingsPerDay: 1,
//     cancellationPolicy: "",
//     digitalAccessDuration: "lifetime",
//     digitalDownloadLimit: "unlimited",
//   });

//   const [productType, setProductType] = useState("physical");
//   const [priceType, setPriceType] = useState("fixed");
//   const [fulfillmentLocation, setFulfillmentLocation] = useState("my-location");
  
//   // Visibility and Feature toggles
//   const [isPublished, setIsPublished] = useState(true);
//   const [isFeatured, setIsFeatured] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);
//   const [schedulingEnabled, setSchedulingEnabled] = useState(true);

//   // Track selected days by index (0 = Mon, 1 = Tue, etc.)
//   const [selectedDays, setSelectedDays] = useState([0, 1, 2, 3, 4]);
//   const daysList = ["M", "T", "W", "T", "F", "S", "S"];

//   // Separated states for preview urls vs raw binary files for multipart payload transmission
//   const [uploadedImages, setUploadedImages] = useState([]);
//   const [rawImageFiles, setRawImageFiles] = useState([]);

//   // Fetch initial services listing on mount
//   useEffect(() => {
//     getMyServices();
//   }, []);

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const toggleDay = (idx) => {
//     setSelectedDays((prev) => 
//       prev.includes(idx) ? prev.filter((d) => d !== idx) : [...prev, idx]
//     );
//   };

//   const handleImageUpload = ({ fileList }) => {
//     const formattedUrls = fileList.map((file) => {
//       if (file.url) return file.url;
//       if (file.originFileObj) return URL.createObjectURL(file.originFileObj);
//       return null;
//     }).filter(Boolean);
//     setUploadedImages(formattedUrls);

//     const rawFiles = fileList.map((file) => file.originFileObj || file).filter(Boolean);
//     setRawImageFiles(rawFiles);
//   };

//   const removeImage = (indexToRemove) => {
//     setUploadedImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
//     setRawImageFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
//   };

//   // Submit Handler Framework
//   const handleSubmitListing = async (forcedDraftStatus = false) => {
//     let calculatedStatus = "pending_review";
//     if (forcedDraftStatus) {
//       calculatedStatus = "draft";
//     } else if (isPaused) {
//       calculatedStatus = "paused";
//     } else if (!isPublished) {
//       calculatedStatus = "draft";
//     }

//     const payload = {
//       name: formData.name,
//       category: formData.category,
//       description: formData.description,
//       productType,
//       priceType,
//       fulfillmentLocation,
//       status: calculatedStatus,
//       isFeatured,
//       images: rawImageFiles,
//     };

//     if (productType === "digital") {
//       payload.digitalAccessDuration = formData.digitalAccessDuration;
//       payload.digitalDownloadLimit = formData.digitalDownloadLimit;
//     } else {
//       payload.sku = formData.sku;
//       payload.stock = formData.stock;
//       payload.weight = formData.weight;
//       payload.dimensions = formData.dimensions;
//     }

//     if (priceType === "fixed") {
//       payload.price = formData.price || 0;
//     } else if (priceType === "range") {
//       payload.minPrice = formData.minPrice || 0;
//       payload.maxPrice = formData.maxPrice || 0;
//     }

//     if (schedulingEnabled) {
//       payload.schedulingEnabled = "true";
//       payload.availableDays = JSON.stringify(selectedDays);
//       payload.openingTime = formData.openingTime;
//       payload.closingTime = formData.closingTime;
//       payload.earliestBookingNotice = formData.earliestNotice;
//       payload.latestBookingWindow = formData.latestWindow;
//       payload.bufferBetweenSessions = formData.bufferSession;
//       payload.maxBookingsPerDay = formData.maxBookingsPerDay;
//       payload.cancellationPolicy = formData.cancellationPolicy;
//     }

//     try {
//       await createService(payload);
//       setIsAddingProduct(false);
//       getMyServices(); 
//     } catch (err) {
//       console.error("Listing creation failed:", err);
//     }
//   };

//   const productTypeTabs = [
//     {
//       id: "physical",
//       title: "Physical Product",
//       description: "Tangible items shipped or picked up by the customer",
//       icon: "/images/briefcase.png", 
//     },
//     {
//       id: "digital",
//       title: "Digital product",
//       description: "Files, courses, templates, and downloadable content",
//       icon: "/images/plus-box.png",
//     },
//     {
//       id: "service",
//       title: "Service",
//       description: "Hair styling, cleaning, consultancy, and bookable services",
//       icon: "/images/clock.png",
//     },
//   ];

//   const statsCard = [
//   { id: 1, title: "Total Products", value: services?.length || "0", img: "/images/cube.png", size: "md" },
//   { id: 2, title: "Active Orders", value: services?.filter(s => s.listingStatus === "published" && s.approvalStatus === "approved").length || "0", img: "/images/active.png", size: "xmd" },
//   { id: 3, title: "Draft", value: services?.filter(s => s.listingStatus === "draft").length || "0", img: "/images/draft.png", size: "xmd" },
//   { id: 4, title: "Out of Stock", value: services?.filter(s => s.type === "physical_product" && s.physicalProduct && Number(s.physicalProduct.stock) === 0).length || "0", img: "/images/out-of-stock.png", size: "md" },
// ];

//   const tabs = ["All", "Active", "Draft", "Paused", "Out of Stock"];

//   const tabVariants = {
//     initial: { opacity: 0, scale: 0.95 },
//     animate: { opacity: 1, scale: 1 },
//     exit: { opacity: 0, scale: 0.95 },
//   };

//   const columns = [
//     {
//       title: "",
//       render: () => <img src="/images/pen.png" className="w-5" />,
//     },
//     {
//       title: "Product",
//       dataIndex: "title", 
//       key: "id",
//       render: (_, record) => {
//         const imageSrc = typeof record.images?.[0] === "object" 
//           ? record.images[0]?.url 
//           : record.images?.[0] || "/images/cake.png";

//         return (
//           <div className="flex items-center gap-3">
//             <img 
//               src={imageSrc} 
//               alt={record.title} 
//               className="w-10 h-10 rounded-lg object-cover" 
//             />
//             <div className="flex flex-col">
//               <span className="font-semibold text-[#1e293b] text-sm">{record.title || "Untitled Product"}</span>
//               <span className="text-[10px] text-gray-500 capitalize">{record.category}</span>
//             </div>
//           </div>
//         );
//       },
//     },
//     {
//       title: "CATEGORY",
//       dataIndex: "category",
//       key: "category",
//       render: (text) => <span className="font-semibold text-black capitalize">{text}</span>,
//     },
//     {
//       title: "PRICE",
//       dataIndex: "price",
//       key: "price",
//       render: (_, record) => {
//         const type = record.pricingType || "fixed";
//         if (type === "fixed") {
//           return <span className="text-black">₦{record.price?.toLocaleString() || "0"}</span>;
//         } else if (type === "range") {
//           return <span className="text-black">₦{record.minPrice?.toLocaleString()} - ₦{record.maxPrice?.toLocaleString()}</span>;
//         } else if (type === "negotiable" || type === "quote") {
//           return <span className="text-black">Negotiable</span>;
//         }
//         return <span className="text-black">Free</span>;
//       },
//     },
//     {
//       title: "EARNINGS",
//       dataIndex: "earnings",
//       key: "earnings",
//       render: (text) => <span className="font-semibold text-black capitalize">{text || "₦0"}</span>,
//     },
//     {
//   title: "STATUS",
//   dataIndex: "approvalStatus", 
//   key: "status",
//   render: (_, record) => {
//     let currentStatus = record.listingStatus || "draft";
//     let approval = record.approvalStatus || "pending";
    
//     let displayLabel = currentStatus.replace("_", " ");
//     let statusColor = "#9CA3AF";

//     // 1. Structural workflow system lifecycles come first
//     if (currentStatus === "draft") {
//       statusColor = "#FFC542";
//       displayLabel = "Draft";
//     } else if (approval === "rejected") {
//       statusColor = "#EF4444";
//       displayLabel = "Rejected";
//     } else if (currentStatus === "pending_review" || approval === "pending") {
//       statusColor = "#3B82F6";
//       displayLabel = "Pending Review";
//     } else if (currentStatus === "paused" || record.isPaused) {
//       statusColor = "#A71818";
//       displayLabel = "Paused";
//     } 
//     // 2. Physical stock level notifications apply ONLY if it is live/published
//     else if (
//       record.type === "physical_product" && 
//       record.physicalProduct && 
//       Number(record.physicalProduct.stock) === 0
//     ) {
//       statusColor = "#870A0A";
//       displayLabel = "Out of Stock";
//     } else if (approval === "approved" && currentStatus === "published") {
//       statusColor = "#15BE87";
//       displayLabel = "Active";
//     }

//     return <span style={{ color: statusColor }} className="text-xs font-semibold capitalize">{displayLabel}</span>;
//   },
// },
//     {
//       title: "",
//       key: "action",
//       render: (_, record) => {
//         const items = [
//           {
//             key: "view",
//             label: (
//               <span
//                 onClick={() => {
//                   setIsModalOpen(true);
//                   setIsSelected(record);
//                 }}
//                 className="text-[10px] font-bold py-1 block cursor-pointer"
//               >
//                 View
//               </span>
//             ),
//           },
//           { key: "edit", label: <span className="text-[10px] font-bold py-1 block">Edit</span> },
//           {
//             key: "delete",
//             label: (
//               <span onClick={() => setIsDeletingModalOpen(true)} className="text-[10px] font-bold py-1 block cursor-pointer text-red-500">
//                 Delete
//               </span>
//             ),
//           },
//         ];

//         return (
//           <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
//             <Button className="border-none! bg-transparent! outline-0! p-0! flex items-center justify-center h-8 w-8">
//               <img src="/images/dots.png" className="w-5" />
//             </Button>
//           </Dropdown>
//         );
//       },
//     },
//   ];

//   // Refined structural filter workflows

//   const filteredServices = services.filter((service) => {
//   if (activeTab === "All") return true;
//   if (activeTab === "Active") return service.approvalStatus === "approved" && service.listingStatus === "published";
//   if (activeTab === "Draft") return service.listingStatus === "draft";
//   if (activeTab === "Paused") return service.isPaused || service.listingStatus === "paused";
//   if (activeTab === "Out of Stock") {
//     return (
//       service.type === "physical_product" && 
//       service.physicalProduct && 
//       Number(service.physicalProduct.stock) === 0
//     );
//   }
//   return true;
// });

//   // --- RENDERING ADD PRODUCT FORM VIEW ---
//   if (isAddingProduct) {
//     return (
//       <div className="space-y-6 p-6 bg-white mt-5">
//         <div className="flex justify-between items-center border-b pb-4">
//           <div>
//             <h1 className="text-xl font-bold text-gray-900">Add Product / Service</h1>
//             <p className="text-xs text-gray-500">Provide features of your product or services view section</p>
//           </div>
//           <Button 
//             className="p-4.5! border-[#060853]! rounded-lg border text-[#060853]! font-medium"
//             onClick={() => setIsAddingProduct(false)}
//           >
//             &larr; Back to List
//           </Button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
//           {productTypeTabs.map((tab) => {
//             const isActive = productType === tab.id;
//             return (
//               <button
//                 key={tab.id}
//                 type="button"
//                 onClick={() => setProductType(tab.id)}
//                 className={`relative flex items-center gap-4 p-5 rounded-2xl border text-left transition-all duration-200 outline-none
//                   ${isActive 
//                     ? "border-[#060853] bg-[#F8FAFC]" 
//                     : "border-gray-200 bg-white hover:border-gray-300"
//                   }`}
//               >
//                 {isActive && (
//                   <motion.div
//                     layoutId="activeProductTypeBorder"
//                     className="absolute inset-0 rounded-2xl border border-[#060853] pointer-events-none"
//                     initial={false}
//                     transition={{ type: "spring", stiffness: 380, damping: 30 }}
//                   />
//                 )}

//                 <div 
//                   className={`flex items-center justify-center w-12 h-12 rounded-xl transition-colors duration-200 shrink-0
//                     ${isActive ? "bg-[#060853] text-white" : "bg-gray-100 text-gray-500"}`}
//                 >
//                   <img 
//                     src={tab.icon} 
//                     alt={tab.title} 
//                     className={`w-5 h-5 object-contain ${isActive ? "invert" : ""}`} 
//                   />
//                 </div>

//                 <div className="flex flex-col space-y-1">
//                   <span className="font-bold text-gray-900 text-[15px] leading-tight">
//                     {tab.title}
//                   </span>
//                   <span className="text-xs text-gray-500 font-normal leading-normal">
//                     {tab.description}
//                   </span>
//                 </div>
//               </button>
//             );
//           })}
//         </div>

//         <div className="space-y-5">
//           <h2 className="text-sm font-bold text-gray-800 border-b border-gray-200 pb-2">Basic Information</h2>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-xs font-bold text-gray-700 mb-1">Name *</label>
//               <Input 
//                 value={formData.name}
//                 onChange={(e) => handleInputChange("name", e.target.value)}
//                 placeholder="e.g. Luxury Chocolate Layered Cake" 
//                 className="h-10 rounded-lg" 
//               />
//             </div>
//             <div>
//               <label className="block text-xs font-bold text-gray-700 mb-1">Category *</label>
//               <Select 
//                 value={formData.category}
//                 onChange={(val) => handleInputChange("category", val)}
//                 placeholder="Select category" 
//                 className="w-full h-10 custom-select"
//               >
//                 <Select.Option value="cakes">Cakes & Pastries</Select.Option>
//                 <Select.Option value="bread">Bread & Bakery</Select.Option>
//                 <Select.Option value="consultancy">Consultancy</Select.Option>
//                 <Select.Option value="styling">Hair Styling</Select.Option>
//               </Select>
//             </div>
//           </div>

//           <div>
//             <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
//             <TextArea 
//               value={formData.description}
//               onChange={(e) => handleInputChange("description", e.target.value)}
//               rows={4} 
//               placeholder="Describe what makes this cake or service special..." 
//               className="rounded-lg" 
//             />
//           </div>

//           {productType === "digital" ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start w-full pt-2">
//               <div className="border border-[#060853] bg-[#F8FAFC] rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer min-h-[180px] hover:bg-gray-50 transition-colors">
//                 <InboxOutlined className="text-gray-300 text-xl mb-3 opacity-60" />
//                 <p className="text-[#1e293b] font-medium text-base mb-1">Click to upload or drag & drop</p>
//                 <p className="text-gray-400 text-xs">PDF, ZIP, MP4, EPUB - max 2GB</p>
//               </div>

//               <div className="space-y-5">
//                 <div>
//                   <label className="block text-sm font-extrabold text-black mb-2 tracking-tight">Access duration</label>
//                   <Select
//                     value={formData.digitalAccessDuration}
//                     onChange={(val) => handleInputChange("digitalAccessDuration", val)}
//                     className="w-full h-12 text-sm"
//                     options={[
//                       { value: "lifetime", label: "Lifetime access" },
//                       { value: "limited", label: "Limited duration" },
//                     ]}
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-extrabold text-black mb-2 tracking-tight">Download limit</label>
//                   <Select
//                     value={formData.digitalDownloadLimit}
//                     onChange={(val) => handleInputChange("digitalDownloadLimit", val)}
//                     className="w-full h-12 text-sm"
//                     options={[
//                       { value: "unlimited", label: "Unlimited" },
//                       { value: "once", label: "1 time download" },
//                     ]}
//                   />
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-x-8 gap-y-4">
//                 <div>
//                   <label className="block text-[13px] font-extrabold text-black mb-1.5 tracking-tight">SKU / product code</label>
//                   <Input 
//                     value={formData.sku}
//                     onChange={(e) => handleInputChange("sku", e.target.value)}
//                     placeholder="...eg. PROD-0001" 
//                     className="h-12 rounded-lg border-gray-200 text-sm" 
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-[13px] font-extrabold text-black mb-1.5 tracking-tight">Stock quantity</label>
//                   <Input 
//                     type="number" 
//                     value={formData.stock}
//                     onChange={(e) => handleInputChange("stock", parseInt(e.target.value) || 0)}
//                     className="h-12 rounded-lg border-gray-200 text-sm" 
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-x-8 gap-y-4">
//                 <div>
//                   <label className="block text-[13px] font-extrabold text-black mb-1.5 tracking-tight">Weight (kg)</label>
//                   <Input 
//                     value={formData.weight}
//                     onChange={(e) => handleInputChange("weight", e.target.value)}
//                     placeholder="0.0" 
//                     className="h-12 rounded-lg border-gray-200 text-sm" 
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-[13px] font-extrabold text-black mb-1.5 tracking-tight">Dimensions (L x W x H cm)</label>
//                   <Input 
//                     value={formData.dimensions}
//                     onChange={(e) => handleInputChange("dimensions", e.target.value)}
//                     placeholder="e.g. 20 × 15 × 10" 
//                     className="h-12 rounded-lg border-gray-200 text-sm" 
//                   />
//                 </div>
//               </div>

//               <div className="pt-2">
//                 <div className="grid grid-cols-3 gap-4">
//                   <button
//                     type="button"
//                     onClick={() => setFulfillmentLocation("seller_location")}
//                     className={`flex flex-col items-center justify-center p-6 rounded-xl border text-center transition-all outline-none min-h-[105px]
//                       ${fulfillmentLocation === "seller_location"
//                         ? "border-[#060853] bg-[#F1F5F9] ring-1 ring-[#060853]" 
//                         : "border-gray-200 bg-white hover:border-gray-300"
//                       }`}
//                   >
//                     <span className="text-sm font-medium text-gray-800">At my location</span>
//                   </button>

//                   <button
//                     type="button"
//                     onClick={() => setFulfillmentLocation("client-location")}
//                     className={`flex flex-col items-center justify-center p-6 rounded-xl border text-center transition-all outline-none min-h-[105px]
//                       ${fulfillmentLocation === "client-location"
//                         ? "border-[#060853] bg-[#F1F5F9] ring-1 ring-[#060853]" 
//                         : "border-gray-200 bg-white hover:border-gray-300"
//                       }`}
//                   >
//                     <span className="text-sm font-medium text-gray-800">At client location</span>
//                   </button>

//                   <button
//                     type="button"
//                     onClick={() => setFulfillmentLocation("online_virtual")}
//                     className={`flex flex-col items-center justify-center p-6 rounded-xl border text-center transition-all outline-none min-h-[105px]
//                       ${fulfillmentLocation === "online_virtual"
//                         ? "border-[#060853] bg-[#F1F5F9] ring-1 ring-[#060853]" 
//                         : "border-gray-200 bg-white hover:border-gray-300"
//                       }`}
//                   >
//                     <span className="text-sm font-medium text-gray-800">Online/Virtual</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="space-y-4">
//           <h2 className="text-sm font-bold text-gray-800">Pricing</h2>
//           <div className="flex gap-4 mb-2">
//             <Radio.Group 
//               value={priceType} 
//               onChange={(e) => setPriceType(e.target.value)} 
//               className="flex gap-4"
//             >
//               <Radio value="fixed">Fixed Price</Radio>
//               <Radio value="range">Price Range</Radio>
//               <Radio value="quote">Negotiable</Radio>
//             </Radio.Group>
//           </div>

//           {priceType === "fixed" && (
//             <div>
//               <label className="block text-xs font-bold text-gray-700 mb-1">Price</label>
//               <Input 
//                 prefix="₦" 
//                 value={formData.price}
//                 onChange={(e) => handleInputChange("price", e.target.value)}
//                 placeholder="0.00" 
//                 className="h-10 w-64 rounded-lg" 
//               />
//             </div>
//           )}

//           {priceType === "range" && (
//             <div className="flex gap-4 items-end">
//               <div>
//                 <label className="block text-xs font-bold text-gray-700 mb-1">From (Min Price)</label>
//                 <Input 
//                   prefix="₦" 
//                   value={formData.minPrice}
//                   onChange={(e) => handleInputChange("minPrice", e.target.value)}
//                   placeholder="0.00" 
//                   className="h-10 w-48 rounded-lg" 
//                 />
//               </div>
//               <span className="text-gray-400 font-semibold mb-2">to</span>
//               <div>
//                 <label className="block text-xs font-bold text-gray-700 mb-1">To (Max Price)</label>
//                 <Input 
//                   prefix="₦" 
//                   value={formData.maxPrice}
//                   onChange={(e) => handleInputChange("maxPrice", e.target.value)}
//                   placeholder="0.00" 
//                   className="h-10 w-48 rounded-lg" 
//                 />
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="space-y-4">
//           <h2 className="text-sm font-bold text-gray-800">Upload Media File</h2>
//           <Upload
//             multiple
//             maxCount={8}
//             accept="image/*"
//             showUploadList={false}
//             beforeUpload={() => false} 
//             onChange={handleImageUpload}
//           >
//             <Button className="p-4.5! bg-[#060853]! rounded-lg border-none! text-white! flex items-center mb-4">
//               + Upload Images
//             </Button>
//           </Upload>
          
//           <div className="grid grid-cols-8 gap-2">
//             {[...Array(8)].map((_, i) => {
//               const imageSrc = uploadedImages[i];
//               return (
//                 <div key={i} className="aspect-square bg-gray-100 rounded-lg flex flex-col items-center justify-center border overflow-hidden relative group">
//                   {imageSrc ? (
//                     <>
//                       <img src={imageSrc} alt={`upload-${i}`} className="w-full h-full object-cover" />
//                       <button
//                         type="button"
//                         onClick={() => removeImage(i)}
//                         className="absolute top-1 right-1 bg-black/60 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10"
//                       >
//                         &times;
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <span className="text-gray-400 text-xs mb-0.5">+</span>
//                       <span className="text-[8px] text-gray-400">Add Image</span>
//                     </>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//           <p className="text-[10px] text-gray-400 mt-1">Up to 8 images. Hover over any image to delete it.</p>
//         </div>

//         <div className="space-y-3 bg-gray-50/50 p-4 rounded-xl border">
//           <div className="flex justify-between items-center border-b pb-2">
//             <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Visibility & status</span>
//             <Switch checked={isPublished} onChange={(checked) => setIsPublished(checked)} />
//           </div>
//           <div className="flex justify-between items-center pt-1">
//             <div>
//               <p className="text-xs font-bold text-gray-800">Active / Live</p>
//               <p className="text-[11px] text-gray-500">Mark as available for purchase or immediate booking</p>
//             </div>
//             <Switch checked={!isPaused} onChange={(checked) => setIsPaused(!checked)} />
//           </div>
//           <div className="flex justify-between items-center border-t pt-2">
//             <div>
//               <p className="text-xs font-bold text-gray-800">Featured</p>
//               <p className="text-[11px] text-gray-500">Highlight this listing in featured sections on the marketplace</p>
//             </div>
//             <Switch checked={isFeatured} onChange={(checked) => setIsFeatured(checked)} />
//           </div>
//         </div>

//         <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm mt-6 space-y-4">
//           <div className="flex justify-between items-center mb-1">
//             <div className="flex items-center gap-2">
//               <span className="text-sm font-bold text-gray-900">Appointment booking</span>
//               <span className="bg-[#E2EDFC] text-[#060853] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">Scheduling</span>
//             </div>
//             <Switch checked={schedulingEnabled} onChange={(checked) => setSchedulingEnabled(checked)} />
//           </div>
//           <p className="text-[12px] text-gray-500 mb-2">Let customers schedule and pay for appointments directly</p>
          
//           {schedulingEnabled && (
//             <div className="border-t border-gray-100 pt-4 space-y-4">
//               <div>
//                 <label className="block text-xs font-bold text-gray-700 mb-2">Available days</label>
//                 <div className="flex gap-2">
//                   {daysList.map((day, idx) => (
//                     <button
//                       key={idx}
//                       type="button"
//                       onClick={() => toggleDay(idx)}
//                       className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all
//                         ${selectedDays.includes(idx) ? "bg-[#060853] text-white" : "bg-white border border-gray-200 text-gray-400"}`}
//                     >
//                       {day}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-xs font-bold text-gray-700 mb-1">Opening time</label>
//                   <Select 
//                     value={formData.openingTime} 
//                     onChange={(val) => handleInputChange("openingTime", val)}
//                     placeholder="Select" 
//                     className="w-full h-10"
//                     options={[
//                       { value: "08:00", label: "08:00 AM" },
//                       { value: "09:00", label: "09:00 AM" },
//                       { value: "10:00", label: "10:00 AM" },
//                     ]}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-bold text-gray-700 mb-1">Closing time</label>
//                   <Select 
//                     value={formData.closingTime} 
//                     onChange={(val) => handleInputChange("closingTime", val)}
//                     placeholder="Select" 
//                     className="w-full h-10"
//                     options={[
//                       { value: "17:00", label: "05:00 PM" },
//                       { value: "18:00", label: "06:00 PM" },
//                       { value: "20:00", label: "08:00 PM" },
//                     ]}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-bold text-gray-700 mb-1">Earliest booking notice</label>
//                   <Select 
//                     value={formData.earliestNotice} 
//                     onChange={(val) => handleInputChange("earliestNotice", val)}
//                     placeholder="Select" 
//                     className="w-full h-10"
//                     options={[
//                       { value: "2-hours", label: "2 Hours notice" },
//                       { value: "24-hours", label: "24 Hours notice" },
//                     ]}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-bold text-gray-700 mb-1">Latest booking window</label>
//                   <Select 
//                     value={formData.latestWindow} 
//                     onChange={(val) => handleInputChange("latestWindow", val)}
//                     placeholder="Select" 
//                     className="w-full h-10"
//                     options={[
//                       { value: "30-days", label: "30 Days out" },
//                       { value: "60-days", label: "60 Days out" },
//                     ]}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-bold text-gray-700 mb-1">Buffer between sessions</label>
//                   <Select 
//                     value={formData.bufferSession} 
//                     onChange={(val) => handleInputChange("bufferSession", val)}
//                     placeholder="Select" 
//                     className="w-full h-10"
//                     options={[
//                       { value: "15-mins", label: "15 Mins" },
//                       { value: "30-mins", label: "30 Mins" },
//                     ]}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-bold text-gray-700 mb-1">Max bookings per day</label>
//                   <Input 
//                     type="number" 
//                     value={formData.maxBookingsPerDay} 
//                     onChange={(e) => handleInputChange("maxBookingsPerDay", parseInt(e.target.value) || 1)}
//                     className="h-10 rounded-lg" 
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-xs font-bold text-gray-700 mb-1">Cancellation policy</label>
//                 <Select 
//                   value={formData.cancellationPolicy} 
//                   onChange={(val) => handleInputChange("cancellationPolicy", val)}
//                   placeholder="Select" 
//                   className="w-full h-10"
//                   options={[
//                     { value: "flexible", label: "Flexible (Full refund up to 24h before)" },
//                     { value: "strict", label: "Strict (No refund within 48h)" },
//                   ]}
//                 />
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="flex justify-between items-center pt-4 border-t">
//           <Button 
//             loading={loading}
//             onClick={() => handleSubmitListing(true)} 
//             className="rounded-lg h-10 font-bold border-gray-300 text-gray-600"
//           >
//             Save as Draft
//           </Button>
//           <Button 
//             loading={loading}
//             onClick={() => handleSubmitListing(false)} 
//             className="bg-[#060853]! text-white! rounded-lg h-10 px-8 font-bold border-none"
//           >
//             Save & Publish
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   // --- STANDARD DASHBOARD LIST VIEW ---
//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center mt-5">
//         <div>
//           <h1 className="text-xl font-bold text-gray-900">Services & Products</h1>
//         </div>
//         <div className="flex gap-4">
//           <Button 
//             className="p-4.5! border-[#060853]! rounded-lg border text-[#060853]!"
//             onClick={() => setIsAddingProduct(true)}
//           >
//             <img src="/images/plus.png" alt="export" className="h-7" />
//             Add New
//           </Button>
//           <Button className="p-4.5! bg-[#060853]! rounded-lg border-none! text-white!">
//             <img src="/images/upload.png" alt="export" className="h-7" />
//             Export Report
//           </Button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-[#E2EDFC] p-4 rounded-sm">
//         {statsCard.map((card) => (
//           <div key={card.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//             <div className="flex items-center border-b border-gray-100 pb-2">
//               <img
//                 src={card.img}
//                 alt={card.title}
//                 className={`object-contain mr-2 ${card.size === "lg" ? "w-8 h-8" : "w-5 h-5"}`}
//               />
//               <h3 className="font-bold text-gray-900">{card.title}</h3>
//             </div>
//             <p className="text-2xl font-bold text-[#060853]">{card.value}</p>
//           </div>
//         ))}
//       </div>

//       <div>
//         {/* Filter Bar */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-1 bg-[#E2EDFC] p-1 rounded-full border border-[#E0E7FF]/60">
//             {tabs.map((tab) => {
//               const isActive = activeTab === tab;
//               return (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`relative px-4 rounded-lg p-1.5 text-xs font-bold transition-colors z-10 
//                     ${isActive ? "text-white" : "text-gray-500 hover:text-gray-700"}`}
//                 >
//                   <span className="relative z-10">{tab}</span>
//                   {isActive && (
//                     <motion.div
//                       layoutId="activeTabPill"
//                       className="absolute inset-0 bg-[#060853] rounded-lg z-0"
//                       initial={false}
//                       transition={{ type: "spring", stiffness: 350, damping: 30 }}
//                     />
//                   )}
//                 </button>
//               );
//             })}
//           </div>

//           <div className="flex items-center gap-2 pr-2">
//             <Input
//               prefix={<img src="/images/search.png" alt="search" className="h-7" />}
//               placeholder="Search"
//               className="w-72 rounded-lg bg-gray-50 border border-gray-200 h-10 text-xs"
//             />
//           </div>
//         </div>

//         <AnimatePresence mode="wait">
//           <motion.div
//             key={activeTab}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             variants={tabVariants}
//             transition={{ duration: 0.2 }}
//           >
//             <div className="bg-[#f0f5ff] p-8 min-h-screen">
//               <h2 className="text-sm font-bold mb-4 text-[#1e293b]">My Products/Services</h2>
//               <div className="bg-white rounded-xl overflow-hidden shadow-sm">
//                 <Table
//                   columns={columns}
//                   dataSource={filteredServices}
//                   rowKey={(record) => record._id?.$oid || record._id}
//                   pagination={{ pageSize: 10 }}
//                   className="custom-table"
//                   size="small"
//                   loading={loading}
//                 />
//               </div>
//             </div>
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       {/* VIEW MODAL */}
//       <CustomModal 
//         isOpen={isModalOpen} 
//         onClose={() => setIsModalOpen(false)} 
//         size="max-w-md" 
//         title={`Product ID: #${isSelected?._id?.$oid?.slice(-4) || isSelected?._id?.slice(-4) || "0045"}`}
//       >
//         <div className="h-72 w-full relative overflow-hidden rounded-lg">
//           {isSelected?.images?.[0]?.url || isSelected?.images?.[0] ? (
//             <Image 
//               src={isSelected?.images?.[0]?.url || isSelected?.images?.[0]} 
//               alt={isSelected?.title || "Product Image"} 
//               fill 
//               className="object-cover" 
//             />
//           ) : (
//             <div className="flex items-center justify-center h-full bg-gray-200 text-sm text-gray-500">No Image</div>
//           )}
//         </div>
//         <h2 className="font-bold text-black mb-2 mt-3">{isSelected?.title || "Product Details"}</h2>
//         <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
//           <p className="text-black text-xs capitalize font-medium">Category: {isSelected?.category}</p>
//           <p className="text-xs font-bold uppercase tracking-wider text-blue-900">{isSelected?.approvalStatus || "Pending"}</p>
//         </div>
//       </CustomModal>

//       {/* DELETE MODAL */}
//       <ConfirmActionModal
//         isOpen={isDeletingModalOpen}
//         size="max-w-md"
//         onClose={() => setIsDeletingModalOpen(false)}
//         title="Delete this Service/Product"
//         description="Are you sure you want to delete this Product? This action cannot be undone."
//         actionText="Delete"
//       />
//     </div>
//   );
// };

// export default ProductManagementPage;

"use client";
import React, { useState, useEffect } from "react";
import { Input, Button, Table, Dropdown, Select, Radio, Switch, Upload, Spin } from "antd";
import { motion, AnimatePresence } from "framer-motion"; 
import CustomModal from "@/components/CustomModal";
import ConfirmActionModal from "@/components/ConfirmActionModal";
import Image from "next/image";
import { InboxOutlined, LoadingOutlined, FileOutlined, CloseOutlined } from "@ant-design/icons";
import { useListingStore } from "@/store/listingStore";

const { TextArea } = Input;
const { Dragger } = Upload;

const SESSION_DURATION_OPTIONS = [
  "30 minutes",
  "45 minutes",
  "1 hour",
  "1.5 hours",
  "2 hours",
  "3 hours",
  "half day",
  "full day",
];

const ProductManagementPage = () => {
  const { createService, getMyServices, services, loading, fetchListingCategories } = useListingStore();

  const [activeTab, setActiveTab] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeletingModalOpen, setIsDeletingModalOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  // NEW: full-page overlay loader shown only while submitting the form.
  const [formSubmitting, setFormSubmitting] = useState(false);

  // NEW: category dropdown state — lazily loaded only when the Add form opens.
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categoriesFetched, setCategoriesFetched] = useState(false);

  // Core structured single-state form handling
  const [formData, setFormData] = useState({
    name: "",
    category: undefined,
    description: "",
    sku: "",
    stock: 0,
    weight: "",
    dimensions: "",
    price: "",
    minPrice: "",
    maxPrice: "",
    sessionDuration: undefined,
    serviceFormat: undefined,
    openingTime: "",
    closingTime: "",
    earliestNotice: "",
    latestWindow: "",
    bufferSession: "",
    maxBookingsPerDay: 1,
    cancellationPolicy: "",
    digitalAccessDuration: "lifetime",
    digitalDownloadLimit: "unlimited",
  });

  const [productType, setProductType] = useState("physical");
  const [priceType, setPriceType] = useState("fixed");

  // Only meaningful for services now — physical products always default to
  // "seller_location" silently (no UI control shown, per business decision).
  const [serviceLocationType, setServiceLocationType] = useState("seller_location");
  
  // Visibility and Feature toggles
  const [isPublished, setIsPublished] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [schedulingEnabled, setSchedulingEnabled] = useState(true);

  // Track selected days by index (0 = Mon, 1 = Tue, etc.)
  const [selectedDays, setSelectedDays] = useState([0, 1, 2, 3, 4]);
  const daysList = ["M", "T", "W", "T", "F", "S", "S"];

  // Separated states for preview urls vs raw binary files for multipart payload transmission
  const [uploadedImages, setUploadedImages] = useState([]);
  const [rawImageFiles, setRawImageFiles] = useState([]);

  // NEW: digital product file uploads (files themselves, not images).
  const [digitalRawFiles, setDigitalRawFiles] = useState([]);

  // Fetch initial services listing on mount
  useEffect(() => {
    getMyServices();
  }, []);

  // NEW: lazy-load listing categories only the first time the Add form opens.
  useEffect(() => {
    if (isAddingProduct && !categoriesFetched) {
      setCategoriesLoading(true);
      fetchListingCategories().then((result) => {
        setCategories(result);
        setCategoriesFetched(true);
        setCategoriesLoading(false);
      });
    }
  }, [isAddingProduct, categoriesFetched, fetchListingCategories]);

  // NEW: flatten parent + subCategories into one option list, sub-categories
  // shown with a dash prefix for visual nesting.
  const categoryOptions = React.useMemo(() => {
    const options = [];

    categories.forEach((parent) => {
      options.push({ value: parent._id, label: parent.name });

      (parent.subCategories || []).forEach((sub) => {
        options.push({ value: sub._id, label: `— ${sub.name}` });
      });
    });

    return options;
  }, [categories]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleDay = (idx) => {
    setSelectedDays((prev) => 
      prev.includes(idx) ? prev.filter((d) => d !== idx) : [...prev, idx]
    );
  };

  const handleImageUpload = ({ fileList }) => {
    const formattedUrls = fileList.map((file) => {
      if (file.url) return file.url;
      if (file.originFileObj) return URL.createObjectURL(file.originFileObj);
      return null;
    }).filter(Boolean);
    setUploadedImages(formattedUrls);

    const rawFiles = fileList.map((file) => file.originFileObj || file).filter(Boolean);
    setRawImageFiles(rawFiles);
  };

  const removeImage = (indexToRemove) => {
    setUploadedImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    setRawImageFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // NEW: digital file upload handling (PDF/ZIP/MP4/EPUB etc, not images).
  const handleDigitalFileUpload = ({ fileList }) => {
    const rawFiles = fileList.map((file) => file.originFileObj || file).filter(Boolean);
    setDigitalRawFiles(rawFiles);
  };

  const removeDigitalFile = (indexToRemove) => {
    setDigitalRawFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Reset type-specific state when switching product type tabs, so stale
  // values from one type don't accidentally get submitted with another.
  const handleProductTypeChange = (typeId) => {
    setProductType(typeId);

    if (typeId !== "service") {
      setSchedulingEnabled(false);
    } else {
      setSchedulingEnabled(true);
    }
  };

  // Submit Handler Framework
  const handleSubmitListing = async (forcedDraftStatus = false) => {
    let calculatedStatus = "pending_review";
    if (forcedDraftStatus) {
      calculatedStatus = "draft";
    } else if (isPaused) {
      calculatedStatus = "paused";
    } else if (!isPublished) {
      calculatedStatus = "draft";
    }

    const payload = {
      name: formData.name,
      category: formData.category || "",
      description: formData.description,
      productType,
      priceType,
      status: calculatedStatus,
      isFeatured,
    };

    if (productType === "digital") {
      payload.digitalFiles = digitalRawFiles;
      payload.accessDuration = formData.digitalAccessDuration;
      payload.downloadLimit =
        formData.digitalDownloadLimit === "unlimited" ? "" : "1";
    } else if (productType === "physical") {
      payload.images = rawImageFiles;
      payload.sku = formData.sku;
      payload.stock = formData.stock;
      payload.weightKg = formData.weight;
      payload.dimensions = formData.dimensions;
      // No UI control for this on physical products — always defaults
      // silently to seller_location, per business decision.
      payload.fulfillmentType = "seller_location";
    } else if (productType === "service") {
      payload.images = rawImageFiles;
      payload.sessionDuration = formData.sessionDuration;
      payload.serviceFormat = formData.serviceFormat;
      payload.locationType = serviceLocationType;
    }

    if (priceType === "fixed") {
      payload.price = formData.price || 0;
    } else if (priceType === "range") {
      payload.minPrice = formData.minPrice || 0;
      payload.maxPrice = formData.maxPrice || 0;
    }

    // Scheduling only applies to services — never sent for physical/digital.
    if (productType === "service" && schedulingEnabled) {
      payload.bookingEnabled = "true";
      payload.availableDays = JSON.stringify(selectedDays);
      payload.openingTime = formData.openingTime;
      payload.closingTime = formData.closingTime;
      payload.earliestBookingNotice = formData.earliestNotice;
      payload.latestBookingWindow = formData.latestWindow;
      payload.bufferBetweenSessions = formData.bufferSession;
      payload.maxBookingsPerDay = formData.maxBookingsPerDay;
      payload.cancellationPolicy = formData.cancellationPolicy;
    }

    setFormSubmitting(true);

    try {
      await createService(payload);
      setIsAddingProduct(false);
      getMyServices(); 
    } catch (err) {
      console.error("Listing creation failed:", err);
    } finally {
      setFormSubmitting(false);
    }
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

  const statsCard = [
  { id: 1, title: "Total Products", value: services?.length || "0", img: "/images/cube.png", size: "md" },
  { id: 2, title: "Active Orders", value: services?.filter(s => s.listingStatus === "published" && s.approvalStatus === "approved").length || "0", img: "/images/active.png", size: "xmd" },
  { id: 3, title: "Draft", value: services?.filter(s => s.listingStatus === "draft").length || "0", img: "/images/draft.png", size: "xmd" },
  { id: 4, title: "Out of Stock", value: services?.filter(s => s.type === "physical_product" && s.physicalProduct && Number(s.physicalProduct.stock) === 0).length || "0", img: "/images/out-of-stock.png", size: "md" },
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
      render: (_, record) => {
        const imageSrc = typeof record.images?.[0] === "object" 
          ? record.images[0]?.url 
          : record.images?.[0] || "/images/cake.png";

        return (
          <div className="flex items-center gap-3">
            <img 
              src={imageSrc} 
              alt={record.title} 
              className="w-10 h-10 rounded-lg object-cover" 
            />
            <div className="flex flex-col">
              <span className="font-semibold text-[#1e293b] text-sm">{record.title || "Untitled Product"}</span>
              <span className="text-[10px] text-gray-500 capitalize">
                {record.category?.name || record.category || ""}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      title: "CATEGORY",
      dataIndex: "category",
      key: "category",
      render: (cat) => (
        <span className="font-semibold text-black capitalize">
          {cat?.name || cat || "—"}
        </span>
      ),
    },
    {
      title: "PRICE",
      dataIndex: "price",
      key: "price",
      render: (_, record) => {
        const type = record.pricingType || "fixed";
        if (type === "fixed") {
          return <span className="text-black">₦{record.price?.toLocaleString() || "0"}</span>;
        } else if (type === "range") {
          return <span className="text-black">₦{record.minPrice?.toLocaleString()} - ₦{record.maxPrice?.toLocaleString()}</span>;
        } else if (type === "negotiable" || type === "quote") {
          return <span className="text-black">Negotiable</span>;
        }
        return <span className="text-black">Free</span>;
      },
    },
    {
      title: "EARNINGS",
      dataIndex: "earnings",
      key: "earnings",
      render: (text) => <span className="font-semibold text-black capitalize">{text || "₦0"}</span>,
    },
    {
  title: "STATUS",
  dataIndex: "approvalStatus", 
  key: "status",
  render: (_, record) => {
    let currentStatus = record.listingStatus || "draft";
    let approval = record.approvalStatus || "pending";
    
    let displayLabel = currentStatus.replace("_", " ");
    let statusColor = "#9CA3AF";

    // 1. Structural workflow system lifecycles come first
    if (currentStatus === "draft") {
      statusColor = "#FFC542";
      displayLabel = "Draft";
    } else if (approval === "rejected") {
      statusColor = "#EF4444";
      displayLabel = "Rejected";
    } else if (currentStatus === "pending_review" || approval === "pending") {
      statusColor = "#3B82F6";
      displayLabel = "Pending Review";
    } else if (currentStatus === "paused" || record.isPaused) {
      statusColor = "#A71818";
      displayLabel = "Paused";
    } 
    // 2. Physical stock level notifications apply ONLY if it is live/published
    else if (
      record.type === "physical_product" && 
      record.physicalProduct && 
      Number(record.physicalProduct.stock) === 0
    ) {
      statusColor = "#870A0A";
      displayLabel = "Out of Stock";
    } else if (approval === "approved" && currentStatus === "published") {
      statusColor = "#15BE87";
      displayLabel = "Active";
    }

    return <span style={{ color: statusColor }} className="text-xs font-semibold capitalize">{displayLabel}</span>;
  },
},
    {
      title: "",
      key: "action",
      render: (_, record) => {
        const items = [
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
          { key: "edit", label: <span className="text-[10px] font-bold py-1 block">Edit</span> },
          {
            key: "delete",
            label: (
              <span onClick={() => setIsDeletingModalOpen(true)} className="text-[10px] font-bold py-1 block cursor-pointer text-red-500">
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

  // Refined structural filter workflows

  const filteredServices = services.filter((service) => {
  if (activeTab === "All") return true;
  if (activeTab === "Active") return service.approvalStatus === "approved" && service.listingStatus === "published";
  if (activeTab === "Draft") return service.listingStatus === "draft";
  if (activeTab === "Paused") return service.isPaused || service.listingStatus === "paused";
  if (activeTab === "Out of Stock") {
    return (
      service.type === "physical_product" && 
      service.physicalProduct && 
      Number(service.physicalProduct.stock) === 0
    );
  }
  return true;
});

  // --- RENDERING ADD PRODUCT FORM VIEW ---
  if (isAddingProduct) {
    return (
      <div className="relative">
        {/* NEW: full-page overlay loader shown while submitting */}
        {formSubmitting && (
          <div className="fixed inset-0 z-[999] bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
            <p className="text-sm font-semibold text-[#060853] mt-4">
              Creating your listing...
            </p>
          </div>
        )}

        <div className="space-y-6 p-6 bg-white mt-5">
          <div className="flex justify-between items-center border-b pb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Add Product / Service</h1>
              <p className="text-xs text-gray-500">Provide features of your product or services view section</p>
            </div>
            <Button 
              className="p-4.5! border-[#060853]! rounded-lg border text-[#060853]! font-medium"
              onClick={() => setIsAddingProduct(false)}
              disabled={formSubmitting}
            >
              &larr; Back to List
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            {productTypeTabs.map((tab) => {
              const isActive = productType === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleProductTypeChange(tab.id)}
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

          <div className="space-y-5">
            <h2 className="text-sm font-bold text-gray-800 border-b border-gray-200 pb-2">Basic Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Name *</label>
                <Input 
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="e.g. Luxury Chocolate Layered Cake" 
                  className="h-10 rounded-lg" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Category *</label>
                {/* NEW: live categories (type=listing), lazy-loaded on form open */}
                <Select 
                  value={formData.category}
                  onChange={(val) => handleInputChange("category", val)}
                  placeholder="Select category"
                  className="w-full h-10 custom-select"
                  loading={categoriesLoading}
                  showSearch
                  optionFilterProp="label"
                  filterOption={(input, option) =>
                    (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                  }
                  notFoundContent={
                    categoriesLoading ? (
                      <div className="flex items-center justify-center py-3">
                        <Spin size="small" indicator={<LoadingOutlined style={{ fontSize: 14 }} spin />} />
                        <span className="ml-2 text-xs text-gray-400">Loading categories...</span>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">No categories available</span>
                    )
                  }
                  options={categoryOptions}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
              <TextArea 
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={4} 
                placeholder="Describe what makes this cake or service special..." 
                className="rounded-lg" 
              />
            </div>

            {productType === "digital" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start w-full pt-2">
                <div className="space-y-3">
                  <Dragger
                    multiple
                    maxCount={8}
                    accept=".pdf,.zip,.mp4,.epub,.doc,.docx"
                    showUploadList={false}
                    beforeUpload={() => false}
                    onChange={handleDigitalFileUpload}
                    className="border-[#060853]! bg-[#F8FAFC]! rounded-2xl!"
                  >
                    <div className="py-6">
                      <InboxOutlined className="text-gray-300 text-xl mb-3 opacity-60" />
                      <p className="text-[#1e293b] font-medium text-base mb-1">Click to upload or drag & drop</p>
                      <p className="text-gray-400 text-xs">PDF, ZIP, MP4, EPUB - max 2GB</p>
                    </div>
                  </Dragger>

                  {digitalRawFiles.length > 0 && (
                    <div className="space-y-2">
                      {digitalRawFiles.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-3 py-2"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <FileOutlined className="text-gray-400 shrink-0" />
                            <span className="text-xs text-gray-700 truncate">
                              {file.name || `file-${idx + 1}`}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeDigitalFile(idx)}
                            className="text-gray-400 hover:text-red-500 shrink-0"
                          >
                            <CloseOutlined className="text-xs" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-extrabold text-black mb-2 tracking-tight">Access duration</label>
                    <Select
                      value={formData.digitalAccessDuration}
                      onChange={(val) => handleInputChange("digitalAccessDuration", val)}
                      className="w-full h-12 text-sm"
                      options={[
                        { value: "lifetime", label: "Lifetime access" },
                        { value: "limited", label: "Limited duration" },
                      ]}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-extrabold text-black mb-2 tracking-tight">Download limit</label>
                    <Select
                      value={formData.digitalDownloadLimit}
                      onChange={(val) => handleInputChange("digitalDownloadLimit", val)}
                      className="w-full h-12 text-sm"
                      options={[
                        { value: "unlimited", label: "Unlimited" },
                        { value: "once", label: "1 time download" },
                      ]}
                    />
                  </div>
                </div>
              </div>
            )}

            {productType === "physical" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <label className="block text-[13px] font-extrabold text-black mb-1.5 tracking-tight">SKU / product code</label>
                    <Input 
                      value={formData.sku}
                      onChange={(e) => handleInputChange("sku", e.target.value)}
                      placeholder="...eg. PROD-0001" 
                      className="h-12 rounded-lg border-gray-200 text-sm" 
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-extrabold text-black mb-1.5 tracking-tight">Stock quantity</label>
                    <Input 
                      type="number" 
                      value={formData.stock}
                      onChange={(e) => handleInputChange("stock", parseInt(e.target.value) || 0)}
                      className="h-12 rounded-lg border-gray-200 text-sm" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <label className="block text-[13px] font-extrabold text-black mb-1.5 tracking-tight">Weight (kg)</label>
                    <Input 
                      value={formData.weight}
                      onChange={(e) => handleInputChange("weight", e.target.value)}
                      placeholder="0.0" 
                      className="h-12 rounded-lg border-gray-200 text-sm" 
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-extrabold text-black mb-1.5 tracking-tight">Dimensions (L x W x H cm)</label>
                    <Input 
                      value={formData.dimensions}
                      onChange={(e) => handleInputChange("dimensions", e.target.value)}
                      placeholder="e.g. 20 × 15 × 10" 
                      className="h-12 rounded-lg border-gray-200 text-sm" 
                    />
                  </div>
                </div>
                {/* NOTE: fulfillment location controls intentionally removed
                    for physical products — always defaults to seller_location
                    silently in the payload. */}
              </div>
            )}

            {productType === "service" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <label className="block text-[13px] font-extrabold text-black mb-1.5 tracking-tight">Session duration</label>
                    <Select
                      value={formData.sessionDuration}
                      onChange={(val) => handleInputChange("sessionDuration", val)}
                      placeholder="Select duration"
                      className="w-full h-12"
                      options={SESSION_DURATION_OPTIONS.map((d) => ({ value: d, label: d }))}
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-extrabold text-black mb-1.5 tracking-tight">Service format</label>
                    <Select
                      value={formData.serviceFormat}
                      onChange={(val) => handleInputChange("serviceFormat", val)}
                      placeholder="Select format"
                      className="w-full h-12"
                      options={[
                        { value: "in_person", label: "In Person" },
                        { value: "online", label: "Online Only" },
                        { value: "both", label: "Both" },
                      ]}
                    />
                  </div>
                </div>

                {/* Location buttons — service only, per business decision */}
                <div className="pt-2">
                  <label className="block text-xs font-bold text-gray-700 mb-2">Where is this service performed?</label>
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      type="button"
                      onClick={() => setServiceLocationType("seller_location")}
                      className={`flex flex-col items-center justify-center p-6 rounded-xl border text-center transition-all outline-none min-h-[105px]
                        ${serviceLocationType === "seller_location"
                          ? "border-[#060853] bg-[#F1F5F9] ring-1 ring-[#060853]" 
                          : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                    >
                      <span className="text-sm font-medium text-gray-800">At my location</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setServiceLocationType("client_location")}
                      className={`flex flex-col items-center justify-center p-6 rounded-xl border text-center transition-all outline-none min-h-[105px]
                        ${serviceLocationType === "client_location"
                          ? "border-[#060853] bg-[#F1F5F9] ring-1 ring-[#060853]" 
                          : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                    >
                      <span className="text-sm font-medium text-gray-800">At client location</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setServiceLocationType("online_virtual")}
                      className={`flex flex-col items-center justify-center p-6 rounded-xl border text-center transition-all outline-none min-h-[105px]
                        ${serviceLocationType === "online_virtual"
                          ? "border-[#060853] bg-[#F1F5F9] ring-1 ring-[#060853]" 
                          : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                    >
                      <span className="text-sm font-medium text-gray-800">Online/Virtual</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

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
                <Radio value="quote">Negotiable</Radio>
              </Radio.Group>
            </div>

            {priceType === "fixed" && (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Price</label>
                <Input 
                  prefix="₦" 
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="0.00" 
                  className="h-10 w-64 rounded-lg" 
                />
              </div>
            )}

            {priceType === "range" && (
              <div className="flex gap-4 items-end">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">From (Min Price)</label>
                  <Input 
                    prefix="₦" 
                    value={formData.minPrice}
                    onChange={(e) => handleInputChange("minPrice", e.target.value)}
                    placeholder="0.00" 
                    className="h-10 w-48 rounded-lg" 
                  />
                </div>
                <span className="text-gray-400 font-semibold mb-2">to</span>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">To (Max Price)</label>
                  <Input 
                    prefix="₦" 
                    value={formData.maxPrice}
                    onChange={(e) => handleInputChange("maxPrice", e.target.value)}
                    placeholder="0.00" 
                    className="h-10 w-48 rounded-lg" 
                  />
                </div>
              </div>
            )}
          </div>

          {/* Image upload — physical & service only. Digital uses its own
              file dropzone above instead. */}
          {(productType === "physical" || productType === "service") && (
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
                            className="absolute top-1 right-1 bg-black/60 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10"
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
          )}

          <div className="space-y-3 bg-gray-50/50 p-4 rounded-xl border">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Visibility & status</span>
              <Switch checked={isPublished} onChange={(checked) => setIsPublished(checked)} />
            </div>
            <div className="flex justify-between items-center pt-1">
              <div>
                <p className="text-xs font-bold text-gray-800">Active / Live</p>
                <p className="text-[11px] text-gray-500">Mark as available for purchase or immediate booking</p>
              </div>
              <Switch checked={!isPaused} onChange={(checked) => setIsPaused(!checked)} />
            </div>
            <div className="flex justify-between items-center border-t pt-2">
              <div>
                <p className="text-xs font-bold text-gray-800">Featured</p>
                <p className="text-[11px] text-gray-500">Highlight this listing in featured sections on the marketplace</p>
              </div>
              <Switch checked={isFeatured} onChange={(checked) => setIsFeatured(checked)} />
            </div>
          </div>

          {/* Appointment booking — SERVICE ONLY. Removed entirely for
              physical/digital products, per business decision. */}
          {productType === "service" && (
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm mt-6 space-y-4">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-900">Appointment booking</span>
                  <span className="bg-[#E2EDFC] text-[#060853] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">Scheduling</span>
                </div>
                <Switch checked={schedulingEnabled} onChange={(checked) => setSchedulingEnabled(checked)} />
              </div>
              <p className="text-[12px] text-gray-500 mb-2">Let customers schedule and pay for appointments directly</p>
              
              {schedulingEnabled && (
                <div className="border-t border-gray-100 pt-4 space-y-4">
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
                      <Select 
                        value={formData.openingTime} 
                        onChange={(val) => handleInputChange("openingTime", val)}
                        placeholder="Select" 
                        className="w-full h-10"
                        options={[
                          { value: "08:00", label: "08:00 AM" },
                          { value: "09:00", label: "09:00 AM" },
                          { value: "10:00", label: "10:00 AM" },
                        ]}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Closing time</label>
                      <Select 
                        value={formData.closingTime} 
                        onChange={(val) => handleInputChange("closingTime", val)}
                        placeholder="Select" 
                        className="w-full h-10"
                        options={[
                          { value: "17:00", label: "05:00 PM" },
                          { value: "18:00", label: "06:00 PM" },
                          { value: "20:00", label: "08:00 PM" },
                        ]}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Earliest booking notice</label>
                      <Select 
                        value={formData.earliestNotice} 
                        onChange={(val) => handleInputChange("earliestNotice", val)}
                        placeholder="Select" 
                        className="w-full h-10"
                        options={[
                          { value: "2-hours", label: "2 Hours notice" },
                          { value: "24-hours", label: "24 Hours notice" },
                        ]}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Latest booking window</label>
                      <Select 
                        value={formData.latestWindow} 
                        onChange={(val) => handleInputChange("latestWindow", val)}
                        placeholder="Select" 
                        className="w-full h-10"
                        options={[
                          { value: "30-days", label: "30 Days out" },
                          { value: "60-days", label: "60 Days out" },
                        ]}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Buffer between sessions</label>
                      <Select 
                        value={formData.bufferSession} 
                        onChange={(val) => handleInputChange("bufferSession", val)}
                        placeholder="Select" 
                        className="w-full h-10"
                        options={[
                          { value: "15-mins", label: "15 Mins" },
                          { value: "30-mins", label: "30 Mins" },
                        ]}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Max bookings per day</label>
                      <Input 
                        type="number" 
                        value={formData.maxBookingsPerDay} 
                        onChange={(e) => handleInputChange("maxBookingsPerDay", parseInt(e.target.value) || 1)}
                        className="h-10 rounded-lg" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Cancellation policy</label>
                    <Select 
                      value={formData.cancellationPolicy} 
                      onChange={(val) => handleInputChange("cancellationPolicy", val)}
                      placeholder="Select" 
                      className="w-full h-10"
                      options={[
                        { value: "flexible", label: "Flexible (Full refund up to 24h before)" },
                        { value: "strict", label: "Strict (No refund within 48h)" },
                      ]}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between items-center pt-4 border-t">
            <Button 
              loading={formSubmitting}
              disabled={formSubmitting}
              onClick={() => handleSubmitListing(true)} 
              className="rounded-lg h-10 font-bold border-gray-300 text-gray-600"
            >
              Save as Draft
            </Button>
            <Button 
              loading={formSubmitting}
              disabled={formSubmitting}
              onClick={() => handleSubmitListing(false)} 
              className="bg-[#060853]! text-white! rounded-lg h-10 px-8 font-bold border-none"
            >
              Save & Publish
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // --- STANDARD DASHBOARD LIST VIEW ---
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mt-5">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Services & Products</h1>
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
                  <span className="relative z-10">{tab}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-[#060853] rounded-lg z-0"
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
            <div className="bg-[#f0f5ff] p-8 min-h-screen">
              <h2 className="text-sm font-bold mb-4 text-[#1e293b]">My Products/Services</h2>
              <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                <Table
                  columns={columns}
                  dataSource={filteredServices}
                  rowKey={(record) => record._id?.$oid || record._id}
                  pagination={{ pageSize: 10 }}
                  className="custom-table"
                  size="small"
                  loading={loading}
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

     {/* VIEW MODAL */}
      <CustomModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        size="max-w-md" 
        title={`Product ID: #${isSelected?.physicalProduct?.sku || "0045"}`}
      >
        <div className="h-72 w-full relative overflow-hidden rounded-lg bg-gray-100">
          {isSelected?.images?.[0]?.url ? (
            <Image 
              src={isSelected.images[0].url}
              alt={isSelected?.title || "Product Image"} 
              fill 
              className="object-cover" 
              unoptimized // temporary safety net — remove once remotePatterns is confirmed working
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-200 text-sm text-gray-500">No Image</div>
          )}
        </div>
        <h2 className="font-bold text-black mb-2 mt-3">{isSelected?.title || "Product Details"}</h2>
        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
          <p className="text-black text-xs capitalize font-medium">
            Category: {isSelected?.category?.name || isSelected?.category || "—"}
          </p>
          <p className="text-xs font-bold uppercase tracking-wider text-blue-900">{isSelected?.approvalStatus || "Pending"}</p>
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
