"use client";
import React, { useState } from "react";
import { FiCheck, FiX, FiCheckCircle, FiMinusCircle } from "react-icons/fi";

const PricingComparison = () => {
  const [billingCycle, setBillingCycle] = useState("Monthly");

  const plans = [
    {
      name: "Basic Plan",
      price: "$509",
      period: "/mo",
      description: "Just for individuals who want simple security.",
      buttonText: "Active",
      active: true,
      features: [
        "Everything from the Basic plan...",
        "Basic support",
        "Journey builder",
        "Email & SMS marketing",
        "Web push notifications",
        "Form & pop-up builder",
        "AI suggestions & predictions",
        "Campaign reporting",
        "Goal & variable tracking",
      ],
    },
    {
      name: "Standard Plan",
      price: "$849",
      period: "/mo",
      description: "Everything from the Basic plan plus...",
      buttonText: "Upgrade",
      active: false,
      recommended: true,
      features: [
        "Basic support",
        "Everything from the Standard plan...",
        "Goal & variable tracking",
        "Omni-channel marketing",
        "Contact management",
        "Smart push notifications",
        "Form & pop-up builder",
        "Journey builder",
        "AI suggestions & predictions",
      ],
    },
    {
      name: "Prudential Plan",
      price: "$1,699",
      period: "/mo",
      description: "Everything from the Standard plan plus...",
      buttonText: "Upgrade",
      active: false,
      features: [
        "Advanced features include:",
        "Advanced contact manager",
        "Dynamic content blocks",
        "Predictive send time optimization",
        "Event based autoresponders",
        "Web push notification builder",
        "Goal & variable tracking",
        "Advanced reporting & analytics",
        "Goal and variable reporting",
      ],
    },
  ];

  const comparison = [
    {
      group: "Plan Features",
      rows: [
        { feature: "Everything in the Basic plan", basic: true, standard: true, prudential: true },
        { feature: "Goal & variable tracking", basic: true, standard: true, prudential: true },
        { feature: "Basic reporting", basic: true, standard: true, prudential: true },
        { feature: "Contact management", basic: true, standard: true, prudential: true },
        { feature: "Smart push notifications", basic: true, standard: true, prudential: true },
        { feature: "Form & pop-up builder", basic: true, standard: true, prudential: true },
        { feature: "Journey builder", basic: true, standard: true, prudential: true },
        { feature: "Campaign reporting", basic: true, standard: true, prudential: true },
        { feature: "Omni-channel marketing", basic: false, standard: true, prudential: true },
        { feature: "Goal & variable reporting", basic: false, standard: true, prudential: true },
        { feature: "Web push notification builder", basic: false, standard: true, prudential: true },
        { feature: "Goal and variable reporting", basic: false, standard: false, prudential: true },
        { feature: "Predictive send optimization", basic: false, standard: false, prudential: true },
        { feature: "Event based triggers", basic: false, standard: false, prudential: true },
        { feature: "Dynamic Content Blocks", basic: false, standard: false, prudential: true },
        { feature: "Advanced A/B Testing", basic: false, standard: false, prudential: true },
      ],
    },
  ];

  const ToggleButton = ({ label }) => (
    <button
      onClick={() => setBillingCycle(label)}
      className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
        billingCycle === label ? "bg-[#060853] text-white" : "text-gray-500 hover:bg-gray-100"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="p-8 text-[#1e293b]">
      {/* HEADER SECTION */}
      <div className="mb-10">
        <h1 className="text-xl font-bold text-black mb-1">Billing update</h1>
        <div className="flex gap-2  border border-gray-100 p-1.5 rounded-xl w-fit">
          <ToggleButton label="Monthly" />
          <ToggleButton label="Quaterly" />
          <ToggleButton label="Yearly" />
        </div>
      </div>

      {/* PRICING CARDS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 items-stretch">
        {plans.map((plan, i) => (
          <div key={i} className={`relative p-8 rounded-3xl border ${plan.recommended ? "border-[#060853] bg-[#E9F2FF]" : "border-gray-100"} transition-all`}>
            {plan.recommended && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#060853] text-white px-8 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-none">
                RECOMMENDED
              </span>
            )}
            <h3 className="text-xl font-bold text-black mb-3">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-3">
              <h1 className="text-5xl font-extrabold text-black">{plan.price}</h1>
              <span className="text-sm font-bold text-gray-500 tracking-tight">{plan.period}</span>
            </div>
            <p className="text-[11px] text-gray-400 mb-8 max-w-[200px] leading-relaxed">
              {plan.description}
            </p>

            <button className={`cursor-pointer w-full py-4 rounded-xl font-bold text-sm mb-10 transition-all ${plan.active ? "bg-[#15BE87] text-white" : "bg-[#060853] text-white hover:opacity-95"} shadow-none`}>
              {plan.buttonText}
            </button>

            <p className="text-[11px] font-semibold text-black mb-6">Key features includes:</p>
            <div className="space-y-4">
              {plan.features.map((feature, j) => (
                <div key={j} className="flex items-start gap-2 text-[10px] leading-relaxed">
                  <FiCheck className={`text-base flex-shrink-0 mt-0.5 stroke-[3] ${feature.startsWith("Everything from") || feature.startsWith("Advanced features") ? "text-gray-400" : "text-[#15BE87]"}`} />
                  <span className={feature.startsWith("Everything from") || feature.startsWith("Advanced features") ? "text-gray-400 font-medium" : "text-gray-600 font-medium"}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* COMPARISON TABLE SECTION */}
      <div className=" p-8 shadow-none">
        <div className="grid grid-cols-5 text-center mb-8 gap-x-6 items-end">
          <div className="col-span-2 text-left">
            <h2 className="text-2xl font-bold text-black">Plan comparison</h2>
          </div>
          {plans.map((p, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-xs font-bold text-black">{p.name}</span>
              <span className="text-[9px] font-medium text-gray-500">{p.price}{p.period}</span>
              <button className="text-[#060853] text-[9px] font-bold hover:underline mt-1">{p.active ? "Current Plan" : "Downgrade"}</button>
            </div>
          ))}
        </div>

        {comparison.map((group, i) => (
          <div key={i}>
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3 mb-6">
              <span className="text-gray-400">►</span>
              <h3 className="text-sm font-bold text-black uppercase tracking-tight">{group.group}</h3>
            </div>
            <div className="space-y-2">
              {group.rows.map((row, j) => (
                <div key={j} className="grid grid-cols-5 gap-x-6 items-center p-4 rounded-xl hover:bg-white transition-all">
                  <span className="col-span-2 text-[11px] text-gray-600 font-medium">{row.feature}</span>
                  {[row.basic, row.standard, row.prudential].map((v, k) => (
                    <div key={k} className="flex justify-center text-xl">
                      {v ? (
                        <FiCheckCircle className="text-[#15BE87]" />
                      ) : (
                        <FiMinusCircle className="text-[#A12E2E]" />
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingComparison;