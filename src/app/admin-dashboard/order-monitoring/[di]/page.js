"use client";

import React, { use, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "antd";
import {
  UndoOutlined,
  WarningOutlined,
  StopOutlined,
  MailOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import CustomModal from "@/components/CustomModal";

const { TextArea } = Input;

const page = ({ params }) => {
  const router = useRouter();
  const { id } = use(params);
  const [isOpen, setIsOpen] = useState(false);
  const [isRefund, setIsRefund] = useState(false);
  const [isSuspended, setIsSuspended] = useState(false);


  return (
    <div className="min-h-screen bg-white p-12">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-black mb-2">
          Order Dispute Review
        </h1>
        <p className="text-gray-500 text-lg">
          Customer has raised a complaint regarding this order
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Left Column: Order Details */}
        <div className="space-y-6">
          <h2 className="text-2xl text-black text-center mb-8">
            Order Details
          </h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] p-10 min-h-[500px]">
            {/* Customer Info */}
            <div className="flex items-center gap-4 mb-2 pb-6 border-b border-gray-50">
              <img
                src="/images/avatar.png"
                className="w-12 h-12 rounded-full object-cover bg-gray-100"
                alt="Marry John"
              />
              <span className="text-lg font-semibold text-gray-900">
                Marry John
              </span>
            </div>

            {/* Business Info */}
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-50">
              <img
                src="/images/business-logo.png"
                className="w-12 h-12 rounded-full object-cover bg-gray-100"
                alt="Tech Haven"
              />
              <span className="text-lg font-semibold text-gray-900">
                Tech Haven Limited
              </span>
            </div>

            {/* Order Meta */}
            <div className="space-y-2 mb-8">
              <p className="text-[15px]">
                <span className="font-bold text-black">Order:</span> #00455
              </p>
              <p className="text-[15px]">
                <span className="font-bold text-black">Date:</span> April 10,
                2026
              </p>
              <p className="text-[15px]">
                <span className="font-bold text-black">Total Amount:</span>{" "}
                $45.00
              </p>
            </div>

            {/* Product Items */}
            <ul className="space-y-3 mb-10">
              <li className="flex items-center gap-3 text-[15px] text-gray-800">
                <span className="w-1.5 h-1.5 rounded-full bg-black"></span> 2x
                Zbook Firefly HP Laptop
              </li>
              <li className="flex items-center gap-3 text-[15px] text-gray-800">
                <span className="w-1.5 h-1.5 rounded-full bg-black"></span> 1x
                Wireless Mouse
              </li>
              <li className="flex items-center gap-3 text-[15px] text-gray-800">
                <span className="w-1.5 h-1.5 rounded-full bg-black"></span> 2x
                Monitor computer
              </li>
            </ul>

            <div className="mb-8 flex items-center gap-2 text-[15px]">
              <span className="font-bold text-black">Payment Status:</span>
              <span className="text-[#10B981] font-bold flex items-center gap-1">
                <CheckCircleFilled /> Paid
              </span>
            </div>

            {/* Complaint Text Area */}
            <div className="bg-[#FEF2F2] p-4 rounded-lg">
              <p className="text-sm leading-relaxed">
                <span className="font-bold text-black">
                  Customer Complaint:
                </span>
                <span className="text-[#610C0C] ml-1">
                  “Received cold and incorrect items.”
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Chat History */}
        <div className="space-y-6">
          <h2 className="text-2xl text-black text-center mb-8">Chat History</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] p-10 flex flex-col items-center justify-center min-h-[500px]">
            <div className="bg-[#E5E7EB] px-10 py-4 rounded-md mb-6">
              <span className="text-gray-600 font-bold text-lg">
                Coming Soon....
              </span>
            </div>
            <div className="w-full h-[1px] bg-gray-50 mb-6"></div>
            <p className="text-gray-400 text-center max-w-[280px] leading-relaxed font-medium">
              Chat history feature will be available in future updates
            </p>
          </div>
        </div>
      </div>

      {/* Admin Actions Section */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <span className="text-sm font-bold text-black whitespace-nowrap">
            Admin Actions
          </span>
          <div className="w-full h-[1px] bg-gray-200"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <Button
          onClick={()=> setIsRefund(true)}
            className="h-10! bg-[#060853]! text-white! border-none! rounded-sm! font-bold text-lg flex items-center justify-center gap-3"
            icon={<UndoOutlined className="text-xl" />}
          >
            Refund Customer
          </Button>

          <Button
          onClick={() => router.push(`/admin-dashboard/order-monitoring/${id}/warn`)}
            className="h-10! bg-[#C99B3B]! text-white! border-none! rounded-sm! font-bold text-lg flex items-center justify-center gap-3"
            icon={<WarningOutlined className="text-xl" />}
          >
            Warn Business
          </Button>

          <Button
          onClick={() => setIsSuspended(true)}
            className="h-10! bg-[#610C0C]! text-white! border-none! rounded-sm! font-bold text-lg flex items-center justify-center gap-3"
            icon={<StopOutlined className="text-xl" />}
          >
            Suspend Business
          </Button>

          <Button
            onClick={() => setIsOpen(true)}
            className="w-full h-10! border-2 border-[#060853]! text-[#060853]! rounded-sm! font-bold text-lg flex items-center justify-center gap-3 bg-transparent!"
            icon={<MailOutlined className="text-xl" />}
          >
            Send a Message
          </Button>
        </div>
      </div>
      <CustomModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size="max-w-xl"
        showClose={false}
        bgColor="bg-[#FFE9E9]"
        title="Message to customer"
      >
        <TextArea
          placeholder="Type your message here"
          className="border-none! resize-none!"
          rows={10}
        />
        <div className="flex justify-end items-center mt-5 gap-5">
            <Button onClick={()=> setIsOpen(false)} className="bg-transparent! rounded-sm! border-[#870A0A]! text-[#870A0A]!">Cancel</Button>
            <Button className="bg-[#060853]! rounded-sm! text-white! border-none!">Send Message</Button>
        </div>
      </CustomModal>

      <CustomModal
        isOpen={isRefund}
        onClose={() => setIsRefund(false)}
        size="max-w-md"
      >
        <div className="flex justify-center items-center flex-col gap-4">

            <div className="rounded-md p-3 border border-gray-200">
                <img src="/images/refund.png" alt="refund" className="w-12 h-12"/>
            </div>

            <h1 className="text-[#2A2A2A] font-bold text-2xl">Refund customer</h1>
            <p className="text-[#4A4A4A] font-nomal text-xs">Are you sure you want customer to be refunded?</p>
            
        <div className="flex justify-end items-center mt-5 gap-5">
            <Button onClick={()=> setIsRefund(false)} className="bg-transparent! rounded-sm! border-[#870A0A]! text-[#870A0A]!">No</Button>
            <Button className="bg-[#060853]! rounded-sm! text-white! border-none!">Yes</Button>
        </div>
        </div>
      </CustomModal>

      <CustomModal
        isOpen={isSuspended}
        onClose={() => setIsSuspended(false)}
        size="max-w-md"
      >
        <div className="flex justify-center items-center flex-col gap-4">

            <div className="rounded-md p-3 border border-gray-200">
                <img src="/images/suspend.png" alt="suspend" className="w-12 h-12"/>
            </div>

            <h1 className="text-[#2A2A2A] font-bold text-2xl">Suspend business</h1>
            <p className="text-[#4A4A4A] font-nomal text-xs">Are you sure you want to suspend this business?</p>
            
        <div className="flex justify-end items-center mt-5 gap-5">
            <Button onClick={()=> setIsSuspended(false)} className="bg-transparent! rounded-sm! border-[#870A0A]! text-[#870A0A]!">No</Button>
            <Button className="bg-[#060853]! rounded-sm! text-white! border-none!">Yes</Button>
        </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default page;
