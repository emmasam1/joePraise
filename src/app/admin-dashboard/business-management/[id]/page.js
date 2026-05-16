
"use client";
import React, { useEffect, useState } from "react";
import { Button, Input, Badge, Avatar, Spin, message } from "antd";
import { useRouter, useParams } from "next/navigation";
import { useBusinessStore } from "@/store/businessStore";

import {
  FileTextOutlined,
  UploadOutlined,
  StarFilled,
  StarOutlined,
  MessageOutlined
} from "@ant-design/icons";

import { RiArrowLeftLine } from "react-icons/ri";

export default function BusinessProfilePage() {
  const router = useRouter();
  const { id } = useParams();

  // Connect directly to your Zustand global state store
  const { fetchBusiness, verifyBusiness, selectedBusiness, loading } = useBusinessStore();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchBusiness(id).catch((err) => {
        console.error("Zustand fetch failed:", err);
      });
    }
  }, [id, fetchBusiness]);

  // Fixed payloader mapping targeting lowercased enum values expected by your controller
  const handleStatusUpdate = async (statusValue) => {
    setSubmitting(true);
    try {
      await verifyBusiness(id, { status: statusValue });
      message.success(`Business status updated to ${statusValue} successfully`);
    } catch (error) {
      console.error(`Failed to verify business with status ${statusValue}:`, error);
      message.error("Failed to update status validation requirements.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC]">
        <Spin size="large" tip="Loading Business Profile..." />
      </div>
    );
  }

  if (!selectedBusiness) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8FAFC]">
        <h2 className="text-xl font-bold text-gray-800">Business Not Found</h2>
        <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
      </div>
    );
  }

  const business = selectedBusiness;

  // Formatting helper to read nested operating arrays or display fallback values matching the design exactly
  const getOperatingHoursDisplay = () => {
    if (business.operatingHours && business.operatingHours.length > 0) {
      const activeDays = business.operatingHours.filter(d => !d.closed);
      if (activeDays.length > 0) {
        return `Mon - Sun: ${activeDays[0].open || "7:00 AM"} - ${activeDays[0].close || "9:00 PM"}`;
      }
    }
    return "Mon - Sun: 7:00 AM - 9:00 PM";
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen p-8 font-sans antialiased">
      
      {/* Top Header Navigation matching Figma layout spacing */}
      <div className="flex items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-3">
          <Button
            icon={<RiArrowLeftLine size={20} />}
            type="text"
            onClick={() => router.back()}
            className="hover:bg-gray-200 flex items-center justify-center text-gray-700 w-10 h-10 rounded-full"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm cursor-pointer hover:underline" onClick={() => router.back()}>
                Business Management
              </span>
              <span className="text-gray-400 text-sm">/</span>
              <span className="text-gray-900 font-medium text-sm">
                {business.businessName || "Profile Profile View"}
              </span>
            </div>
            <h1 className="text-sm text-gray-500 mt-0.5 font-normal">
              {business.businessName || "Bie's Kitchen"}
            </h1>
          </div>
        </div>

        {/* Search Bar & User Profile Context Row */}
        <div className="flex items-center gap-6">
          <div className="w-80">
            <Input
              prefix={<img src="/images/search.png" alt="search" className="h-4 w-4 opacity-40 mx-1" onError={(e) => { e.target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='gray'><path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'/></svg>"; }} />}
              placeholder="Search"
              className="rounded-full bg-white border border-gray-200 h-11 w-full text-sm shadow-none focus:border-gray-300"
            />
          </div>

          <div className="relative cursor-pointer mt-1">
            <Badge count={12} size="small" color="#0F172A" offset={[2, -2]}>
              <div className="p-2.5 bg-white border border-gray-200 rounded-full flex items-center justify-center w-11 h-11">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-700">
                  <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16ZM16 17H8V11C8 8.52 9.51 6.5 12 6.5C14.49 6.5 16 8.52 16 11V17Z" fill="currentColor"/>
                </svg>
              </div>
            </Badge>
          </div>

          <div className="flex items-center gap-3 bg-white border border-gray-200 pl-2 pr-5 py-1.5 rounded-full shadow-sm">
            <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop" size={38} className="border border-gray-100" />
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-tight">Joe Praise</span>
              <span className="text-[10px] text-gray-400 font-medium">Admin</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Profile Info Banner Workspace Card */}
      <div className="w-full bg-white border border-gray-200 rounded-xl p-6 flex flex-col md:flex-row gap-6 mb-6 shadow-sm">
        <div className="w-full md:w-52 h-40 shrink-0 rounded-lg overflow-hidden border border-gray-100">
          <img
            src={business.banner || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop"}
            alt={business.businessName || "Business banner"}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{business.businessName || "Bie's Kitchen"}</h2>
            <div className="flex items-center gap-2 text-gray-500 text-xs font-medium mt-1">
              <span>{business.category ? (business.category.charAt(0).toUpperCase() + business.category.slice(1)) : "Food & Beverage"}</span>
              <span className="text-gray-300">•</span>
              <span>Restaurant & Cafe</span>
              <span className="text-gray-300">•</span>
              <span>Established 2018</span>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed max-w-3xl mt-2 font-normal">
              {business.description || "Bie's Kitchen is an authentic local dishes and homemade food products crafted by Chef Bie, specializing in traditional flavors, culinary artistry, and, in some contexts, homemade goods like Leche Flan and Biko"}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-3">
            <span className="bg-[#E6F7FF] text-[#0050B3] px-3 py-1.5 rounded text-[11px] font-medium">
              Business ID: {business.businessID || "BE-2018-002"}
            </span>
            <span className="bg-[#F6FFED] text-[#389E0D] px-3 py-1.5 rounded text-[11px] font-medium">
              Added: {business.createdAt ? new Date(business.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "March 29, 2026"}
            </span>
            <span className="bg-[#FFF7E6] text-[#D46B08] px-3 py-1.5 rounded text-[11px] font-medium">
              Last Updated: 2 hours ago
            </span>
          </div>
        </div>

        {/* Verification Status Progress Card Checklist */}
        <div className="w-full md:w-72 bg-white rounded-xl p-5 border border-gray-200 shrink-0">
          <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-50">
            <h3 className="font-bold text-slate-900 text-xs tracking-wide uppercase">Verification Status</h3>
            <div className="flex items-center gap-1.5 text-[#E27C3E] text-xs font-bold bg-[#FFF7E6] px-2 py-1 rounded-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E27C3E]" />
              <span className="capitalize text-[11px]">{business.verificationStatus === 'not_started' ? 'Pending Review' : (business.verificationStatus || "Pending Review")}</span>
            </div>
          </div>

          <div className="relative pl-6 space-y-5 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
            {/* Step 1 */}
            <div className="relative flex items-start justify-between">
              <div className="absolute -left-[23px] top-0.5 bg-white rounded-full p-0.5">
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 flex items-center justify-center">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4"><path d="M20 6L9 17L4 12" /></svg>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-800 leading-none">Submitted</p>
                <p className="text-[10px] text-gray-400 mt-1">2 days ago</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex items-start justify-between">
              <div className="absolute -left-[23px] top-0.5 bg-white rounded-full p-0.5">
                <div className={`w-3.5 h-3.5 rounded-full ${business.verificationStage === 'under_review' ? 'border-2 border-orange-500 bg-white' : 'bg-orange-500'} flex items-center justify-center`}>
                  {business.verificationStage !== 'under_review' && <span className="w-1 h-1 rounded-full bg-white" />}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-800 leading-none">Under Review</p>
                <p className="text-[10px] text-orange-500 font-medium mt-1">In Progress</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex items-start justify-between">
              <div className="absolute -left-[23px] top-0.5 bg-white rounded-full p-0.5">
                <div className="w-3.5 h-3.5 rounded-full bg-gray-200 flex items-center justify-center" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 leading-none">Decision</p>
                <p className="text-[10px] text-gray-400 mt-1">Pending</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Layout Framework Mapping blocks exactly */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Owner Details Card layout */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 mb-5 tracking-wide uppercase">Owner Details</h2>
          <div className="flex items-center gap-3.5 mb-6 pb-5 border-b border-gray-100">
            <Avatar size={48} src={business.owner?.avatar?.url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"} className="border border-gray-100" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-base leading-tight">
                  {business.owner?.name || "BieBele Edward"}
                </h3>
                <span className="text-[9px] bg-slate-50 text-gray-400 border border-gray-100 px-1.5 py-0.5 rounded font-normal">Primary Contact</span>
              </div>
              <p className="text-gray-400 text-xs mt-1 font-normal">Owner & Founder</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-5 gap-x-6">
            <div className="flex items-center gap-3">
              <div className="bg-[#EBFBFA] p-2.5 rounded-lg flex items-center justify-center w-10 h-10 shrink-0 text-[#0D9488]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate leading-tight">{business.owner?.email || "oramafelix@gmail.com"}</p>
                <p className="text-[10px] text-gray-400 mt-1 font-medium tracking-wide">Mail Address</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-[#EBFBFA] p-2.5 rounded-lg flex items-center justify-center w-10 h-10 shrink-0 text-[#0D9488]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="16" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="4"/><line x1="8" y1="2" x2="8" y2="4"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 leading-tight">Driver's License</p>
                <p className="text-[10px] text-gray-400 mt-1 font-medium tracking-wide">ID Type</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-[#EBFBFA] p-2.5 rounded-lg flex items-center justify-center w-10 h-10 shrink-0 text-[#0D9488]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 leading-tight">{business.owner?.phone || "+1 34699976830"}</p>
                <p className="text-[10px] text-gray-400 mt-1 font-medium tracking-wide">Phone Number</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-[#EBFBFA] p-2.5 rounded-lg flex items-center justify-center w-10 h-10 shrink-0 text-[#0D9488]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate leading-tight">DL #6884403843</p>
                <p className="text-[10px] text-gray-400 mt-1 font-medium tracking-wide">ID Number</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information Card layout */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 mb-6 tracking-wide uppercase">Contact Information</h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <p className="text-[11px] text-gray-400 font-medium tracking-wide mb-1">Business Email</p>
              <p className="text-sm font-bold text-slate-800 break-all">{business.businessEmail || "biekitchen@gmail.com"}</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-400 font-medium tracking-wide mb-1">Business Address</p>
              <p className="text-sm font-bold text-slate-800 leading-tight">{business.address || "No. 34 wakali Street Ikeja, Lagos."}</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-400 font-medium tracking-wide mb-1">Phone Number</p>
              <p className="text-sm font-bold text-slate-800">{business.businessPhone || "+1 8990337293"}</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-400 font-medium tracking-wide mb-1">Business Hours</p>
              <p className="text-sm font-bold text-slate-800">{getOperatingHoursDisplay()}</p>
            </div>
            <div className="col-span-2 pt-2 border-t border-gray-50">
              <p className="text-[11px] text-gray-400 font-medium tracking-wide mb-1">Website</p>
              <p className="text-sm font-bold text-slate-800 underline decoration-gray-100">
                {business.website ? (
                  <a href={business.website} target="_blank" rel="noreferrer" className="text-slate-800 hover:text-blue-600">{business.website}</a>
                ) : (
                  "biekitchen.com"
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Products/Services, Reviews, and Docs Layout Blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        
        {/* Left Side: Products and Verification documents combo column wrapper */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Products & Services Block */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900 mb-4 tracking-wide uppercase">Products & Services</h2>
            <div className="flex flex-wrap gap-2">
              {business.services && business.services.length > 0 ? (
                business.services.map((srv, idx) => (
                  <span key={idx} className="bg-slate-50 border border-gray-100 text-slate-700 text-xs px-3 py-2 rounded-md font-normal">
                    {srv.title || srv.category}
                  </span>
                ))
              ) : (
                ["Food Ordering", "Seasonal Gifts", "Wedding Cakes", "Home Delivering", "Event Planning", "Custom Cakes", "Kits for baking", "Catering", "Small chops", "Food Ordering", "Donuts & Bread", "Baking Ingredients"].map((item, index) => (
                  <span key={index} className="bg-[#F8FAFC] text-slate-600 text-[11px] px-3 py-2 rounded font-medium border border-gray-100">
                    {item}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Verification Documents Block */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex-1">
            <h2 className="text-sm font-bold text-slate-900 mb-5 tracking-wide uppercase">Verification Documents</h2>
            <div className="space-y-4">
              {business.documents && business.documents.length > 0 ? (
                business.documents.map((doc, idx) => {
                  const label = doc.documentType === 'CAC' ? 'Business License' : doc.documentType === 'ID_CARD' ? 'ID Proof (Owner)' : 'Utility Document';
                  const docName = doc.documentUrl ? doc.documentUrl.substring(doc.documentUrl.lastIndexOf('/') + 1).split('?')[0] : "attachment.pdf";
                  return (
                    <div key={doc.id || idx} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <FileTextOutlined className="text-gray-400 text-lg shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-800 leading-tight">{label}</p>
                          <span className="text-[10px] text-gray-400 truncate block max-w-[160px] font-normal mt-0.5">{docName}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${doc.status === 'approved' || doc.status === 'verified' ? 'bg-[#E6FFFA] text-[#0D9488]' : doc.status === 'rejected' || doc.status === 'declined' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                          {doc.status === 'approved' || doc.status === 'verified' ? 'Verified' : doc.status === 'rejected' || doc.status === 'declined' ? 'Declined' : 'Under Review'}
                        </span>
                        <a href={doc.documentUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-slate-600 flex items-center justify-center">
                          <UploadOutlined className="rotate-180 transform" />
                        </a>
                      </div>
                    </div>
                  );
                })
              ) : (
                <>
                  {[
                    { label: "Business License", name: "License_biekitchen.pdf", status: "Verified", badgeClass: "bg-[#E6FFFA] text-[#0D9488]" },
                    { label: "Tax Certificate", name: "Tax_biekitchen.pdf", status: "Verified", badgeClass: "bg-[#E6FFFA] text-[#0D9488]" },
                    { label: "ID Proof (Owner)", name: "biebele_id.pdf", status: "Declined", badgeClass: "bg-[#FFF1F0] text-[#F5222D]" },
                    { label: "Business Registration", name: "business_reg.pdf", status: "Under Review", badgeClass: "bg-[#E6F7FF] text-[#0050B3]" }
                  ].map((staticDoc, index) => (
                    <div key={index} className="flex items-center justify-between p-1.5">
                      <div className="flex items-center gap-3">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                        <div>
                          <p className="text-xs font-bold text-slate-800 leading-tight">{staticDoc.label}</p>
                          <p className="text-[10px] text-gray-400 font-normal mt-0.5">{staticDoc.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded ${staticDoc.badgeClass}`}>
                          {staticDoc.status}
                        </span>
                        <UploadOutlined className="text-gray-400 rotate-180 transform cursor-pointer" />
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Customer Reviews Block layout */}
        <div className="lg:col-span-7 bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-sm font-bold text-slate-900 tracking-wide uppercase">Customer Reviews</h2>
              <span className="text-xs font-bold text-slate-500 cursor-pointer hover:underline">See All</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-8 mb-6 bg-slate-50 p-5 rounded-xl border border-gray-100">
              <div className="text-center shrink-0 bg-white border border-gray-100 px-6 py-4 rounded-xl shadow-sm w-36">
                <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {business.reviews?.averageRating ? business.reviews.averageRating.toFixed(1) : "4.9"}
                </p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">
                  ({business.reviews?.totalReviews || 128} reviews)
                </p>
                <div className="flex justify-center gap-0.5 mt-2 text-amber-400 text-xs">
                  <StarFilled /><StarFilled /><StarFilled /><StarFilled /><StarFilled />
                </div>
              </div>

              {/* Progress Rating Breakdowns exactly mirroring Figma weights */}
              <div className="flex-1 w-full space-y-2.5">
                {[
                  { star: 5, count: 102, percent: "78%" },
                  { star: 4, count: 18, percent: "15%" },
                  { star: 3, count: 6, percent: "5%" },
                  { star: 2, count: 2, percent: "2%" },
                  { star: 1, count: 0, percent: "0%" }
                ].map((row) => (
                  <div key={row.star} className="flex items-center gap-3 text-xs text-gray-400 font-medium">
                    <span className="w-3 text-right">{row.star}☆</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: row.percent }} />
                    </div>
                    <span className="w-6 text-slate-700 text-right font-semibold">{row.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulated Reviews Cards List elements */}
            <div className="space-y-3.5">
              {[1, 2, 3, 4].map((item, index) => (
                <div key={index} className="border-b border-gray-100 last:border-none pb-3.5 last:pb-0">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-800">Emily Davis</span>
                      <div className="flex text-amber-400 text-[10px] gap-0.5">
                        <StarFilled /><StarFilled /><StarFilled /><StarFilled /><StarFilled />
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-400">2 days ago</span>
                  </div>
                  <p className="text-gray-500 text-[11px] font-normal leading-normal mt-1.5 max-w-2xl">
                    Great Product. Loved the quality and fast shipping. Will buy again
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Admin Action Control Panels & Activity Timelines Blocks footer row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Side: Buttons Container */}
        <div className="lg:col-span-4 bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 mb-5 tracking-wide uppercase">Admin Actions</h2>
            <div className="space-y-3">
              <button
                disabled={submitting}
                onClick={() => handleStatusUpdate("approved")}
                className="w-full py-3 bg-[#10B981] hover:bg-[#0E9F6E] text-white rounded-lg flex items-center justify-center gap-2 text-xs font-bold tracking-wide transition-colors disabled:opacity-50 shadow-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                Approve Business
              </button>
              
              <button
                disabled={submitting}
                onClick={() => handleStatusUpdate("rejected")}
                className="w-full py-3 bg-[#7F1D1D] hover:bg-[#681717] text-white rounded-lg flex items-center justify-center gap-2 text-xs font-bold tracking-wide transition-colors disabled:opacity-50 shadow-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Reject Verification
              </button>
              
              <button
                disabled={submitting}
                onClick={() => handleStatusUpdate("rejected")} // Mongoose schema lacks fallback arrays for 'suspended', maps into standard rejected flow safely
                className="w-full py-3 bg-[#FBBF24] hover:bg-[#E5A914] text-white rounded-lg flex items-center justify-center gap-2 text-xs font-bold tracking-wide transition-colors disabled:opacity-50 shadow-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                Suspend Account
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 mt-5">
            <button className="w-full py-2.5 border border-[#1E3A8A] text-[#1E3A8A] hover:bg-blue-50 rounded-lg flex items-center justify-center gap-2 text-xs font-bold tracking-wide transition-colors">
              <MessageOutlined /> Send Message to Owner
            </button>
          </div>
        </div>

        {/* Right Side: Activity Timeline matching your pipeline objects payload */}
        <div className="lg:col-span-8 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 mb-6 tracking-wide uppercase">Activity Timeline</h2>
          <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
            
            {business.timeline && business.timeline.length > 0 ? (
              business.timeline.map((item, index) => (
                <div key={index} className="relative flex items-start justify-between">
                  <div className="absolute -left-[19px] top-1 bg-white rounded-full p-0.5">
                    <div className={`w-2.5 h-2.5 rounded-full ${index === 0 ? 'bg-[#060853]' : 'bg-orange-500'}`} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 leading-tight">{item.title}</h4>
                    <p className="text-[11px] text-gray-400 mt-1">{item.description}</p>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">
                    {item.date ? new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "1 day ago"}
                  </span>
                </div>
              ))
            ) : (
              <>
                <div className="relative flex items-start justify-between">
                  <div className="absolute -left-[19px] top-1 bg-white rounded-full p-0.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#060853]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 leading-tight">Verification Submitted</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">2 days ago</p>
                  </div>
                  <span className="text-[10px] text-slate-700 font-medium">4:00pm</span>
                </div>

                <div className="relative flex items-start justify-between">
                  <div className="absolute -left-[19px] top-1 bg-white rounded-full p-0.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 leading-tight">Documents Uploaded</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">Just now</p>
                  </div>
                  <span className="text-[10px] text-slate-700 font-medium">Just now</span>
                </div>

                <div className="relative flex items-start justify-between">
                  <div className="absolute -left-[19px] top-1 bg-white rounded-full p-0.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 leading-tight">Under review</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">1 day ago</p>
                  </div>
                  <span className="text-[10px] text-slate-700 font-medium">1 day ago</span>
                </div>
              </>
            )}

            <div className="relative flex items-center gap-3 pt-2 mt-2 border-t border-gray-50">
              <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop" size={24} />
              <p className="text-[11px] font-bold text-slate-800">
                Review assigned to: <span className="text-gray-500 font-medium">Admin User</span>
              </p>
              <span className="ml-auto text-[10px] text-gray-400 font-medium">1 day ago</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}


// "use client";
// import React, { useEffect, useState } from "react";
// import { Button, Input, Badge, Avatar, Spin, message } from "antd";
// import { useRouter, useParams } from "next/navigation";
// import { useBusinessStore } from "@/store/businessStore"; // Adjust this import path to match your file structure

// import {
//   ClockCircleOutlined,
//   CheckSquareFilled,
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

// import { RiArrowLeftLine } from "react-icons/ri";

// export default function BusinessProfilePage() {
//   const router = useRouter();
//   const { id } = useParams();

//   // Connect directly to your Zustand global state store
//   const { fetchBusiness, verifyBusiness, selectedBusiness, loading } = useBusinessStore();
//   const [submitting, setSubmitting] = useState(false);

//   // Trigger global fetch via your Axios client with auth interceptors intact
//   useEffect(() => {
//     if (id) {
//       fetchBusiness(id).catch((err) => {
//         console.error("Zustand fetch failed:", err);
//       });
//     }
//   }, [id, fetchBusiness]);

//   // Wire buttons to your store's patch verify action
//   const handleStatusUpdate = async (status) => {
//     setSubmitting(true);
//     try {
//       await verifyBusiness(id, { status });
//       // Re-fetch automatically inside Zustand to keep data perfectly synchronized
//     } catch (error) {
//       console.error(`Failed to verify business with status ${status}:`, error);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // Keep layout loading states perfectly centered
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <Spin size="large" tip="Loading Business Profile..." />
//       </div>
//     );
//   }

//   // Fallback if data isn't in state
//   if (!selectedBusiness) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
//         <h2 className="text-xl font-bold text-gray-800">Business Not Found</h2>
//         <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
//       </div>
//     );
//   }

//   // Convenience wrapper alias for easier reading matching your layout mappings
//   const business = selectedBusiness;

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
//               {business.businessName || business.business_name}
//             </h1>
//             <p className="text-xs text-gray-500">Business Management / Profile</p>
//           </div>
//         </div>

//         {/* Search & User Profile Bar */}
//         <header className="h-20 bg-white border border-gray-100 flex items-center justify-between px-8 flex-1 max-w-4xl rounded-lg shadow-sm">
//           <div className="w-full max-w-md">
//             <Input
//               prefix={<img src="/images/search.png" alt="search" className="h-6 opacity-40" />}
//               placeholder="Search"
//               className="rounded-full bg-gray-50 border-none h-10 w-full"
//             />
//           </div>

//           <div className="flex items-center gap-6">
//             <Badge count={5} size="small" color="#060853">
//               <img src="/images/bell.png" alt="msg" className="h-6 cursor-pointer" />
//             </Badge>
//             <div className="flex items-center gap-3 p-1.5 pr-4 rounded-full border border-gray-50 bg-white shadow-sm">
//               <Avatar src="https://i.pravatar.cc/150?u=admin" size={36} />
//               <div className="flex flex-col text-right">
//                 <span className="text-[11px] font-bold text-gray-900">Admin User</span>
//                 <span className="text-[9px] text-gray-400">Super Admin</span>
//               </div>
//             </div>
//           </div>
//         </header>
//       </div>

//       {/* Main Banner Info Card */}
//       <div className="w-full bg-white border border-gray-100 rounded-sm p-6 flex flex-col md:flex-row gap-6 mb-5">
//         <div className="w-full md:w-64 h-48 shrink-0">
//           <img
//             src={business.banner || business.logo || "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1000&auto=format&fit=crop"}
//             alt={business.businessName}
//             className="w-full h-full object-cover rounded-lg"
//           />
//         </div>

//         <div className="flex-1 space-y-4">
//           <div>
//             <h2 className="text-xl font-bold text-[#2A2A2A]">{business.businessName || business.business_name}</h2>
//             <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
//               <span>{business.category || "Food & Beverage"}</span>
//               <span className="text-gray-300">•</span>
//               <span>{business.businessCity}, {business.businessCountry}</span>
//             </div>
//           </div>

//           <p className="text-gray-600 text-sm leading-relaxed max-w-2xl">
//             {business.description || "No business description provided."}
//           </p>

//           <div className="flex flex-wrap gap-3 pt-2">
//             <div className="bg-[#E6FFFA] text-[#2D3748] px-4 py-2 rounded-md text-[13px] font-medium">
//               Postal Code: {business.postalCode || "N/A"}
//             </div>
//             <div className="bg-[#E6FFFA] text-[#2D3748] px-4 py-2 rounded-md text-[13px] font-medium">
//               Added: {business.createdAt ? new Date(business.createdAt).toLocaleDateString() : "Recently"}
//             </div>
//           </div>
//         </div>

//         {/* Verification Status Card using Icons */}
//         <div className="w-full md:w-72 bg-[#F8FAFC] rounded-xl p-5 border border-gray-50">
//           <div className="flex justify-between items-center mb-6">
//             <h3 className="font-bold text-gray-800 text-sm">Verification Status</h3>
//             <div className="flex items-center gap-1 text-[#E27C3E] text-[11px] font-bold uppercase">
//               {business.status === "Approved" ? (
//                 <CheckCircleFilled className="text-[#10B981]" />
//               ) : business.status === "Rejected" ? (
//                 <CloseCircleFilled className="text-[#7F1D1D]" />
//               ) : (
//                 <ClockCircleOutlined />
//               )}
//               <span>{business.status || "Pending Review"}</span>
//             </div>
//           </div>

//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <CheckSquareFilled className="text-[#10B981] text-lg" />
//                 <span className="text-sm text-gray-600 font-medium">Submitted</span>
//               </div>
//               <span className="text-xs text-gray-400">Verified Step</span>
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 {business.status === "Approved" ? (
//                   <CheckCircleFilled className="text-[#10B981] text-lg" />
//                 ) : business.status === "Rejected" ? (
//                   <CloseCircleFilled className="text-[#7F1D1D] text-lg" />
//                 ) : (
//                   <ClockCircleFilled className="text-[#E27C3E] text-lg" />
//                 )}
//                 <span className="text-sm text-gray-800 font-bold">Current State</span>
//               </div>
//               <span className="text-xs text-gray-500 font-medium italic">{business.status || "Under Review"}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Grid Content Columns */}
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
//         {/* Owner Details */}
//         <div className="lg:col-span-5 bg-white border border-gray-100 rounded-sm p-6">
//           <h2 className="text-lg font-bold text-gray-900 mb-6">Owner Details</h2>
//           <div className="flex items-center gap-4 mb-8">
//             <Avatar size={56} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${business.businessName}`} />
//             <div className="flex-1">
//               <h3 className="font-bold text-gray-900 text-base leading-tight">Business Representative</h3>
//               <p className="text-gray-400 text-xs mt-0.5">Manager Account</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 gap-y-4">
//             <div className="flex items-start gap-3">
//               <div className="bg-[#E6FFFA] p-2.5 rounded-lg"><CheckCircleFilled className="text-[#0D9488]" /></div>
//               <div className="min-w-0">
//                 <p className="text-sm font-bold text-gray-800 truncate">{business.businessEmail}</p>
//                 <p className="text-[11px] text-gray-400 mt-1">Mail Address</p>
//               </div>
//             </div>
//             <div className="flex items-start gap-3">
//               <div className="bg-[#E6FFFA] p-2.5 rounded-lg"><CheckCircleFilled className="text-[#0D9488]" /></div>
//               <div>
//                 <p className="text-sm font-bold text-gray-800">{business.businessPhone}</p>
//                 <p className="text-[11px] text-gray-400 mt-1">Phone Number</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Contact Information */}
//         <div className="lg:col-span-7 bg-white border border-gray-100 rounded-sm p-6">
//           <h2 className="text-lg font-bold text-gray-900 mb-8">Contact Information</h2>
//           <div className="grid grid-cols-2 gap-y-8 gap-x-8">
//             <div>
//               <p className="text-xs text-gray-400 mb-1.5 font-medium">Business Address</p>
//               <p className="text-base font-bold text-gray-800">{business.address || "No custom street address details"}</p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-400 mb-1.5 font-medium">City / Country</p>
//               <p className="text-base font-bold text-gray-800">{business.businessCity} / {business.businessCountry}</p>
//             </div>
//             <div className="col-span-2">
//               <p className="text-xs text-gray-400 mb-1.5 font-medium">Website URL</p>
//               <p className="text-base font-bold text-gray-800 underline decoration-gray-200">
//                 {business.website ? (
//                   <a href={business.website} target="_blank" rel="noreferrer">{business.website}</a>
//                 ) : (
//                   "None Provided"
//                 )}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Products, Documents & Reviews Grid Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 pb-10">
//         <div className="lg:col-span-5 flex flex-col gap-6">
//           {/* Products & Services */}
//           <div className="bg-white border border-gray-100 rounded-sm p-6">
//             <h2 className="text-lg font-bold text-gray-900 mb-6">Social Handle Connections</h2>
//             <div className="grid grid-cols-3 gap-3">
//               <div className="bg-[#F1F5F9] text-gray-700 text-[11px] font-medium py-2.5 px-2 rounded-md text-center truncate">
//                 IG: {business.instagram || "None"}
//               </div>
//               <div className="bg-[#F1F5F9] text-gray-700 text-[11px] font-medium py-2.5 px-2 rounded-md text-center truncate">
//                 X: {business.twitter || "None"}
//               </div>
//               <div className="bg-[#F1F5F9] text-gray-700 text-[11px] font-medium py-2.5 px-2 rounded-md text-center truncate">
//                 FB: {business.facebook || "None"}
//               </div>
//             </div>
//           </div>

//           {/* Verification Documents with custom Ant icons mappings */}
//           <div className="bg-white border border-gray-100 rounded-sm p-6 flex-1">
//             <h2 className="text-lg font-bold text-gray-900 mb-6">Verification Documents</h2>
//             <div className="space-y-5">
//               {business.documents && business.documents.length > 0 ? (
//                 business.documents.map((docUrl, index) => (
//                   <div key={index} className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <div className="bg-gray-50 p-2 rounded-lg">
//                         <FileTextOutlined className="text-gray-400 text-lg" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-bold text-gray-800 leading-tight">Document Attachment {index + 1}</p>
//                         <a href={docUrl} target="_blank" rel="noreferrer" className="text-[11px] text-blue-500 underline truncate block max-w-xs">
//                           View Uploaded File
//                         </a>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-[#E6FFFA] text-[#0D9488]">
//                         Uploaded
//                       </span>
//                       <UploadOutlined className="text-gray-400 cursor-pointer" />
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-400 text-sm">No files uploaded for verification.</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Customer Reviews Element */}
//         <div className="lg:col-span-7 bg-white border border-gray-100 rounded-sm p-6 flex flex-col">
//           <h2 className="text-lg font-bold text-gray-900 mb-6">Customer Reviews</h2>
//           <div className="flex flex-col md:flex-row items-center gap-10 mb-5 pb-8 border-b border-gray-50">
//             <div className="bg-white border border-gray-50 shadow-sm rounded-xl p-6 text-center w-40 shrink-0">
//               <p className="text-3xl font-bold text-gray-900">5.0</p>
//               <div className="flex justify-center gap-0.5 mt-2 text-[#F6AD55] text-xs">
//                 <StarFilled />
//                 <StarFilled />
//                 <StarFilled />
//                 <StarFilled />
//                 <StarFilled />
//               </div>
//             </div>
//             <div className="text-gray-400 text-sm">
//               <MessageOutlined className="mr-2" /> Initial system reviews ready for verification steps.
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Admin Action Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
//         <div className="lg:col-span-4 bg-white border border-gray-100 rounded-sm p-6 flex flex-col">
//           <h2 className="text-lg font-bold text-gray-900 mb-6">Admin Actions</h2>
//           <div className="space-y-4">
//             <button 
//               disabled={submitting}
//               onClick={() => handleStatusUpdate("Approved")}
//               className="w-full py-3 bg-[#10B981] hover:bg-[#059669] text-white rounded-sm flex items-center justify-center gap-2 text-sm font-medium transition-colors disabled:opacity-50"
//             >
//               <CheckCircleOutlined /> Approve Business
//             </button>
//             <button 
//               disabled={submitting}
//               onClick={() => handleStatusUpdate("Rejected")}
//               className="w-full py-3 bg-[#7F1D1D] hover:bg-[#450a0a] text-white rounded-sm flex items-center justify-center gap-2 text-sm font-medium transition-colors disabled:opacity-50"
//             >
//               <CloseCircleOutlined /> Reject Verification
//             </button>
//             <button 
//               disabled={submitting}
//               onClick={() => handleStatusUpdate("Suspended")}
//               className="w-full py-3 bg-[#FBBF24] hover:bg-[#f59e0b] text-white rounded-sm flex items-center justify-center gap-2 text-sm font-medium transition-colors disabled:opacity-50"
//             >
//               <StopOutlined /> Suspend Account
//             </button>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }

