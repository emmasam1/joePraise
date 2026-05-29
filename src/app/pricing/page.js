"use client";

import React, { useState } from 'react';
import { CheckOutlined, CloseOutlined, InfoCircleOutlined, ArrowUpOutlined } from '@ant-design/icons';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly', 'quarterly', 'annually'

  const plans = [
    {
      name: "Basic Plan",
      price: "509",
      period: "/month",
      subtext: "billed yearly with 10,000 requests",
      features: [
        "100% digital initial dynamic draft",
        "Lifetime access",
        "Files & links marketing",
        "New platform features",
        "Premium support",
        "Post updates & extensions",
        "Analytics dashboard",
        "Mass marketing automation"
      ]
    },
    {
      name: "Standard Plan",
      price: "849",
      period: "/month",
      subtext: "automatically after 10,000 requests",
      isPopular: true,
      features: [
        "Priority support",
        "Professional templates",
        "Real-time notifications",
        "Website links metrics insights",
        "Smart delivery comparison system",
        "10 templates/trends & CMS",
        "Post and receive files",
        "Instant delivery"
      ]
    },
    {
      name: "Premium Plan",
      price: "1,699",
      period: "/month",
      subtext: "automatically after 30,000 requests",
      features: [
        "Dedicated account manager",
        "International payment collection",
        "Custom domain structure",
        "Custom setup for fast onboarding",
        "Central management of API",
        "SOC 2, HIPAA, GDPR & Omnisec Security",
        "Optimized processing pipeline",
        "Unlimited response validation"
      ]
    }
  ];

  const comparisonFeatures = [
    { category: "Email marketing", isHeader: true },
    { name: "Smart matching design logic", basic: true, standard: true, premium: true },
    { name: "In-App marketing assist segment", basic: true, standard: true, premium: true },
    { name: "A/B Testing", basic: true, standard: true, premium: true },
    { name: "Email templates custom", basic: true, standard: true, premium: true },
    { name: "Currency level validation", basic: true, standard: true, premium: true },
    { name: "Link validation tracking", basic: true, standard: true, premium: true },
    { name: "Advanced matrix", basic: true, standard: true, premium: true },
    { name: "Initial design logic layout", basic: true, standard: true, premium: true },
    { name: "Operations manager", basic: false, standard: true, premium: true },
    { name: "Client transparency reports", basic: false, standard: true, premium: true },
    { name: "Email frequency monitoring", basic: false, standard: false, premium: true },
    { name: "Cross tier asset standard log", basic: false, standard: false, premium: true },
    { name: "Infrastructure monitoring", basic: false, standard: false, premium: true },
    { name: "Forward asset integration", basic: false, standard: false, premium: true },
    { name: "Extended response logs", basic: false, standard: false, premium: true },
    { name: "Network connection profiles", basic: false, standard: false, premium: true }
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans pb-24">
      {/* Top Header Section */}
      <div className="text-center pt-16 pb-12">
        <span className="text-[#10B981] text-xs font-bold uppercase tracking-widest">Pricing and Editions</span>
        <h1 className="text-4xl font-black text-[#0F172A] mt-2 mb-8">Choose your plan</h1>

        {/* Billing Cycle Selector */}
        <div className="inline-flex bg-gray-100 p-1 rounded-xl text-xs font-bold text-gray-500 shadow-inner">
          <button 
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2.5 rounded-lg transition-all ${billingCycle === 'monthly' ? 'bg-white text-[#0F172A] shadow-sm' : 'hover:text-gray-900'}`}
          >
            Monthly
          </button>
          <button 
            onClick={() => setBillingCycle('quarterly')}
            className={`px-6 py-2.5 rounded-lg transition-all flex items-center gap-1.5 ${billingCycle === 'quarterly' ? 'bg-white text-[#0F172A] shadow-sm' : 'hover:text-gray-900'}`}
          >
            Quarterly <span className="text-[9px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded font-extrabold">- 10%</span>
          </button>
          <button 
            onClick={() => setBillingCycle('annually')}
            className={`px-6 py-2.5 rounded-lg transition-all flex items-center gap-1.5 ${billingCycle === 'annually' ? 'bg-white text-[#0F172A] shadow-sm' : 'hover:text-gray-900'}`}
          >
            Annually <span className="text-[9px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded font-extrabold">- 20%</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-16">
        {plans.map((plan, idx) => (
          <div 
            key={idx} 
            className={`bg-white rounded-2xl p-8 border transition-all relative flex flex-col justify-between shadow-sm
              ${plan.isPopular ? 'border-2 border-[#060853] scale-[1.02] z-10' : 'border-gray-100'}`}
          >
            {plan.isPopular && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#060853] text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                Most Popular
              </span>
            )}

            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-4">{plan.name}</h3>
              <div className="flex items-baseline mb-1">
                <span className="text-3xl font-black text-gray-900">$</span>
                <span className="text-5xl font-black text-gray-900 tracking-tight">{plan.price}</span>
                <span className="text-gray-400 text-xs font-bold ml-1">{plan.period}</span>
              </div>
              <p className="text-[10px] text-gray-400 font-bold mb-8">{plan.subtext}</p>

              <button className="w-full py-3 bg-[#060853] text-white font-bold text-xs rounded-xl hover:opacity-95 transition-all mb-8 shadow-sm">
                Get started
              </button>

              <div className="space-y-3.5">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">Key Features</p>
                {plan.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2.5 text-xs">
                    <CheckOutlined className="text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-gray-500 font-medium leading-normal">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Start Trial Notice */}
      <div className="text-center text-xs font-bold text-gray-400 mb-24">
        Startup / Running teams eligible for up to <span className="text-[#060853] font-black">$100,000/month</span>. <a href="#" className="text-[#060853] underline font-black">Learn more</a>
      </div>

      {/* Detailed Feature Comparison Section */}
      <div className="max-w-5xl mx-auto px-6 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-8 px-6 text-sm font-bold text-gray-900 w-1/2">Plan</th>
              <th className="py-8 px-4 text-center w-1/6">
                <span className="block text-xs font-black text-gray-900">Basic Plan</span>
                <span className="text-[10px] text-gray-400 font-bold">Popular tier</span>
              </th>
              <th className="py-8 px-4 text-center w-1/6">
                <span className="block text-xs font-black text-gray-900">Standard Plan</span>
                <span className="text-[10px] text-[#060853] font-black">Value option</span>
              </th>
              <th className="py-8 px-4 text-center w-1/6">
                <span className="block text-xs font-black text-gray-900">Premium Plan</span>
                <span className="text-[10px] text-gray-400 font-bold">Enterprise option</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonFeatures.map((row, rIdx) => {
              if (row.isHeader) {
                return (
                  <tr key={rIdx} className="bg-gray-50/50">
                    <td colSpan={4} className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      ▸ {row.category}
                    </td>
                  </tr>
                );
              }

              return (
                <tr key={rIdx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 text-xs font-medium text-gray-500 flex items-center gap-2">
                    {row.name} <InfoCircleOutlined className="text-gray-300 text-[10px] cursor-pointer" />
                  </td>
                  <td className="py-4 px-4 text-center">
                    {row.basic ? (
                      <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-bold"><CheckOutlined /></div>
                    ) : (
                      <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-800 text-white text-[10px] font-bold"><CloseOutlined /></div>
                    )}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {row.standard ? (
                      <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-bold"><CheckOutlined /></div>
                    ) : (
                      <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-800 text-white text-[10px] font-bold"><CloseOutlined /></div>
                    )}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {row.premium ? (
                      <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-bold"><CheckOutlined /></div>
                    ) : (
                      <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-800 text-white text-[10px] font-bold"><CloseOutlined /></div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}