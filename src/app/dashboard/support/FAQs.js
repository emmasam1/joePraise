"use client";
import React from "react";
import { Collapse } from "antd";

const { Panel } = Collapse;

const FaqPage = () => {
  const faqData = [
    {
      key: "1",
      header: "What do we do?",
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
    {
      key: "2",
      header: "What is the purpose of the platform",
      content: "This platform is designed to streamline your business analytics and financial tracking in one central dashboard.",
    },
    {
      key: "3",
      header: "How do I sign up for an account?",
      content: "Click on the registration button on the home page and follow the prompts to set up your salon or clinic management profile.",
    },
    {
      key: "4",
      header: "How do I contact support?",
      content: "You can reach out via our support ticket system or use the 'Get in Touch' link above for immediate assistance.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      {/* HEADER SECTION */}
      <div className="text-center mb-12 max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          Quick answers to questions you may have about JoePraiseSmart<br/> Hub. 
          Can't find what you're looking for?{" "}
          <button 
            onClick={onContactSupport}
            className="text-[#10B981] font-bold hover:underline"
          >
            Get in Touch
          </button>
        </p>
      </div>

      {/* ACCORDION / COLLAPSE SECTION */}
      <div className="w-full max-w-3xl">
        <Collapse
          accordion
          ghost
          expandIconPosition="start"
          expandIcon={({ isActive }) => 
            isActive ? <img src="/images/arrow_down_dark.png" alt="arrow down" className="w-5" /> : <img src="/images/arrow_up_dark.png" alt="arrow right" className="w-4" />
          }
          className="space-y-4"
        >
          {faqData.map((item) => (
            <Panel
              header={<span className="text-lg font-bold text-gray-900">{item.header}</span>}
              key={item.key}
              className="bg-[#F4F8FB] rounded-xl border-none overflow-hidden"
            >
              <p className="text-gray-500 text-sm px-4 pb-4">
                {item.content}
              </p>
            </Panel>
          ))}
        </Collapse>
      </div>
    </div>
  );
};

export default FaqPage;