"use client";
import PricingComparison from "@/components/PricingComparison";
import PaymentCheckout from "@/components/PaymentCheckout";
import React, { useState } from "react";

const SubscriptionManagement = () => {
  const [subscriptionStatus, setSubscriptionStatus] = useState("expired");
  const [showPricing, setShowPricing] = useState(false);
  const [view, setView] = useState("dashboard"); // states: dashboard, pricing, checkout
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setView("checkout");
  };

  // 1. CHECKOUT VIEW
  if (view === "checkout") {
    return <PaymentCheckout plan={selectedPlan} onBack={() => setView("pricing")} />;
  }

  // 2. PRICING VIEW
  if (view === "pricing") {
    return (
      <div className="bg-white p-5 relative">
        <button 
          onClick={() => setView("dashboard")} 
          className="absolute top-5 right-5 text-gray-400 font-bold text-xs"
        >
          ✕ Close
        </button>
        {/* Pass the selection handler to your Pricing component */}
        <PricingComparison onSelectPlan={handleSelectPlan} />
      </div>
    );
  }

  const benefits = [
    "24/7 support (live chat and email)",
    "Journey builder",
    "Email & SMS marketing",
    "Web push notifications",
    "Form & pop-up builder",
    "AI suggestions & predictions",
  ];

  // --- OVERRIDE LOGIC ---
  // When showPricing is true, this block runs and the code below it is ignored.
  if (showPricing) {
    return (
      <div className="bg-white mt-5 p-5 relative min-h-screen">
        {/* Back button to return to the management page */}
        <button 
          onClick={() => setShowPricing(false)} 
          className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 text-black px-4 py-2 rounded-md text-xs font-bold transition-all shadow-sm"
        >
          ← Back to Management
        </button>
        
        <PricingComparison />
      </div>
    );
  }

  return (
    <div className="bg-white mt-5 p-5">
      {/* 1. HEADER */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-xl font-bold text-black mb-1">
            Subscription Management
          </h1>
          <p className="text-xs text-gray-500 font-medium">
            Manage your business plan, billing, and invoices.
          </p>
        </div>
        {subscriptionStatus === "expired" ?  <span className="bg-[#fdaaaa8d] text-[#870A0A]  px-5 py-1 rounded text-[10px] font-bold uppercase tracking-tight">
          Expired
        </span> :  <span className="bg-[#D0FAE5] text-[#007A55] px-5 py-1 rounded text-[10px] font-bold uppercase tracking-tight">
          Active
        </span>}
       
      </div>

      {subscriptionStatus === "expired" && (
        <div className="bg-[#fdaaaa8d] border border-[#F5A9A9] text-[#870A0A] px-6 py-4 rounded mb-10 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/images/expaire.png" className="w-10" alt="expired" />
            <div>
              <h1 className="text-[#8B0836] text-xs font-bold">
                Your subscription has expired
              </h1>
              <span className="text-xs text-[#C70036]">
                Please renew to continue receiving orders and access your
                dashboard features.
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowPricing(true)}
            className="bg-[#870A0A] text-white px-5 py-2 rounded-sm font-bold text-xs cursor-pointer 
             transition-all duration-200 
             shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-md"
          >
            Renew Subscription
          </button>
        </div>
      )}

      {/* 2. OVERVIEW */}
      <div className="mb-12">
        <div className="flex items-center gap-2 pb-3 mb-8">
          <img src="/images/sheild.png" className="w-5" alt="shield" />
          <h2 className="text-sm font-bold text-black uppercase tracking-tight">
            Subscription Overview
          </h2>
        </div>

        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase">
              Current Plan
            </p>
            <h1 className="text-[#15BE87] font-bold text-2xl">Standard</h1>
          </div>
          <div className="flex items-center gap-1">
            <h1 className="text-4xl font-bold text-black">$509</h1>
            <span className="text-xs text-[#4A4A4A]">USD/mo</span>
          </div>
        </div>

        {/* Billing Details Grid */}
        <div className="flex flex-col">
          <div className="flex items-center">
            <img src="/images/billing.png" className="w-5" alt="billing" />
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
              Billing Cycle
            </p>
          </div>
          <div>
            <p className="text-sm font-bold text-black ml-5 -mt-2">Monthly</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col">
          <div className="flex items-center">
            <img src="/images/billing.png" className="w-5" alt="billing" />
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
              Last Billing Date
            </p>
          </div>
          <div>
            <p className="text-sm font-bold text-black ml-5 -mt-2">
              Mar 15, 2026
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-1">
          <p className="text-[20px] font-bold text-black">
            **** **** **** <span className="text-[17px]!">0009</span>
          </p>
          <div className="bg-[#143198] text-white p-2 rounded-md text-xs">
            VISA
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-14">
        <div className="flex flex-col">
          <div className="flex items-center">
            <img src="/images/billing.png" className="w-5" alt="billing" />
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
              Next Billing Date
            </p>
          </div>
          <div>
            <p className="text-sm font-bold text-black ml-5 -mt-2">
              Apr 15, 2026
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-1">
          <p className="text-xs text-[#15BE87] font-normal">Payment History</p>
        </div>
      </div>

      {/* 3. UPGRADE */}
      <div className="mb-10 pt-4 mt-10">
        <h3 className="text-sm font-bold text-black mb-5">Account Upgrade</h3>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[11px] font-bold text-black">
              Upgrade or downgrade
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">
              Select a subscription model tailored to your need
            </p>
          </div>
          <div className="flex gap-6">
            <div className="flex flex-col items-center gap-1.5">
              <img src="/images/upload_2.png" className="w-10" alt="upgrade" />
              <span className="text-[10px] font-bold text-gray-500">
                Upgrade
              </span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <img src="/images/download.png" className="w-10" alt="downgrade" />
              <span className="text-[10px] font-bold text-gray-500">
                Downgrade
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. BENEFITS */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-black uppercase tracking-tight">
            Plan Benefits
          </h3>
          <button className="text-[#15BE87] text-[10px] font-bold hover:underline">
            View more
          </button>
        </div>
        <div className="bg-[#F8FAFC] rounded-xl p-5 space-y-4">
          {benefits.map((benefit, i) => (
            <div key={i} className="flex items-center gap-3">
              <img src="/images/green_check.png" className="w-4" alt="check" />
              <span className="text-[11px] text-gray-500 font-medium">
                {benefit}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. QUICK SUPPORT */}
      <div className="mb-12 pt-4">
        <h3 className="text-[11px] font-bold text-black uppercase tracking-widest mb-6">
          Quick Support
        </h3>
        <div className="space-y-6">
          <div>
            <p className="text-[12px] font-bold text-black">Billing FAQ</p>
            <p className="text-[11px] text-gray-400 mt-0.5 font-medium">
              Common questions about invoices and plans.
            </p>
          </div>
          <div>
            <p className="text-[12px] font-bold text-black">Contact Support</p>
            <p className="text-[11px] text-gray-400 mt-0.5 font-medium">
              Get help with your subscription.
            </p>
          </div>
        </div>
      </div>

      {/* 6. CANCEL */}
      <h3 className="text-sm font-bold text-black">Cancel Subscription</h3>
      <div className="pt-6  flex justify-between items-start">
        <div>
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-black">Delete Account</p>
            <p className="text-[11px] text-gray-400 font-medium">
              Cancel account subscription
            </p>
          </div>
        </div>
        <button className="bg-[#870A0A] text-white px-12 py-2 rounded-lg font-bold text-sm hover:opacity-90 transition-all">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SubscriptionManagement;