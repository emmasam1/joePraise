// "use client";

// import React, { use, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button, Input } from "antd";
// import {
//   UndoOutlined,
//   WarningOutlined,
//   StopOutlined,
//   MailOutlined,
//   CheckCircleFilled,
// } from "@ant-design/icons";
// import CustomModal from "@/components/CustomModal";

// const { TextArea } = Input;

// const page = ({ params }) => {
//   const router = useRouter();
//   const { id } = use(params);
//   const [isOpen, setIsOpen] = useState(false);
//   const [isRefund, setIsRefund] = useState(false);
//   const [isSuspended, setIsSuspended] = useState(false);


//   return (
//     <div className="min-h-screen bg-white p-12">
//       {/* Header Section */}
//       <div className="text-center mb-16">
//         <h1 className="text-4xl font-bold text-black mb-2">
//           Order Dispute Review
//         </h1>
//         <p className="text-gray-500 text-lg">
//           Customer has raised a complaint regarding this order
//         </p>
//       </div>

//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
//         {/* Left Column: Order Details */}
//         <div className="space-y-6">
//           <h2 className="text-2xl text-black text-center mb-8">
//             Order Details
//           </h2>
//           <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] p-10 min-h-[500px]">
//             {/* Customer Info */}
//             <div className="flex items-center gap-4 mb-2 pb-6 border-b border-gray-50">
//               <img
//                 src="/images/avatar.png"
//                 className="w-12 h-12 rounded-full object-cover bg-gray-100"
//                 alt="Marry John"
//               />
//               <span className="text-lg font-semibold text-gray-900">
//                 Marry John
//               </span>
//             </div>

//             {/* Business Info */}
//             <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-50">
//               <img
//                 src="/images/business-logo.png"
//                 className="w-12 h-12 rounded-full object-cover bg-gray-100"
//                 alt="Tech Haven"
//               />
//               <span className="text-lg font-semibold text-gray-900">
//                 Tech Haven Limited
//               </span>
//             </div>

//             {/* Order Meta */}
//             <div className="space-y-2 mb-8">
//               <p className="text-[15px]">
//                 <span className="font-bold text-black">Order:</span> #00455
//               </p>
//               <p className="text-[15px]">
//                 <span className="font-bold text-black">Date:</span> April 10,
//                 2026
//               </p>
//               <p className="text-[15px]">
//                 <span className="font-bold text-black">Total Amount:</span>{" "}
//                 $45.00
//               </p>
//             </div>

//             {/* Product Items */}
//             <ul className="space-y-3 mb-10">
//               <li className="flex items-center gap-3 text-[15px] text-gray-800">
//                 <span className="w-1.5 h-1.5 rounded-full bg-black"></span> 2x
//                 Zbook Firefly HP Laptop
//               </li>
//               <li className="flex items-center gap-3 text-[15px] text-gray-800">
//                 <span className="w-1.5 h-1.5 rounded-full bg-black"></span> 1x
//                 Wireless Mouse
//               </li>
//               <li className="flex items-center gap-3 text-[15px] text-gray-800">
//                 <span className="w-1.5 h-1.5 rounded-full bg-black"></span> 2x
//                 Monitor computer
//               </li>
//             </ul>

//             <div className="mb-8 flex items-center gap-2 text-[15px]">
//               <span className="font-bold text-black">Payment Status:</span>
//               <span className="text-[#10B981] font-bold flex items-center gap-1">
//                 <CheckCircleFilled /> Paid
//               </span>
//             </div>

//             {/* Complaint Text Area */}
//             <div className="bg-[#FEF2F2] p-4 rounded-lg">
//               <p className="text-sm leading-relaxed">
//                 <span className="font-bold text-black">
//                   Customer Complaint:
//                 </span>
//                 <span className="text-[#610C0C] ml-1">
//                   “Received cold and incorrect items.”
//                 </span>
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Right Column: Chat History */}
//         <div className="space-y-6">
//           <h2 className="text-2xl text-black text-center mb-8">Chat History</h2>
//           <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] p-10 flex flex-col items-center justify-center min-h-[500px]">
//             <div className="bg-[#E5E7EB] px-10 py-4 rounded-md mb-6">
//               <span className="text-gray-600 font-bold text-lg">
//                 Coming Soon....
//               </span>
//             </div>
//             <div className="w-full h-[1px] bg-gray-50 mb-6"></div>
//             <p className="text-gray-400 text-center max-w-[280px] leading-relaxed font-medium">
//               Chat history feature will be available in future updates
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Admin Actions Section */}
//       <div className="max-w-7xl mx-auto">
//         <div className="flex items-center gap-4 mb-10">
//           <span className="text-sm font-bold text-black whitespace-nowrap">
//             Admin Actions
//           </span>
//           <div className="w-full h-[1px] bg-gray-200"></div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
//           <Button
//           onClick={()=> setIsRefund(true)}
//             className="h-10! bg-[#060853]! text-white! border-none! rounded-sm! font-bold text-lg flex items-center justify-center gap-3"
//             icon={<UndoOutlined className="text-xl" />}
//           >
//             Refund Customer
//           </Button>

//           <Button
//           onClick={() => router.push(`/admin-dashboard/order-monitoring/${id}/warn`)}
//             className="h-10! bg-[#C99B3B]! text-white! border-none! rounded-sm! font-bold text-lg flex items-center justify-center gap-3"
//             icon={<WarningOutlined className="text-xl" />}
//           >
//             Warn Business
//           </Button>

//           <Button
//           onClick={() => setIsSuspended(true)}
//             className="h-10! bg-[#610C0C]! text-white! border-none! rounded-sm! font-bold text-lg flex items-center justify-center gap-3"
//             icon={<StopOutlined className="text-xl" />}
//           >
//             Suspend Business
//           </Button>

//           <Button
//             onClick={() => setIsOpen(true)}
//             className="w-full h-10! border-2 border-[#060853]! text-[#060853]! rounded-sm! font-bold text-lg flex items-center justify-center gap-3 bg-transparent!"
//             icon={<MailOutlined className="text-xl" />}
//           >
//             Send a Message
//           </Button>
//         </div>
//       </div>
//       <CustomModal
//         isOpen={isOpen}
//         onClose={() => setIsOpen(false)}
//         size="max-w-xl"
//         showClose={false}
//         bgColor="bg-[#FFE9E9]"
//         title="Message to customer"
//       >
//         <TextArea
//           placeholder="Type your message here"
//           className="border-none! resize-none!"
//           rows={10}
//         />
//         <div className="flex justify-end items-center mt-5 gap-5">
//             <Button onClick={()=> setIsOpen(false)} className="bg-transparent! rounded-sm! border-[#870A0A]! text-[#870A0A]!">Cancel</Button>
//             <Button className="bg-[#060853]! rounded-sm! text-white! border-none!">Send Message</Button>
//         </div>
//       </CustomModal>

//       <CustomModal
//         isOpen={isRefund}
//         onClose={() => setIsRefund(false)}
//         size="max-w-md"
//       >
//         <div className="flex justify-center items-center flex-col gap-4">

//             <div className="rounded-md p-3 border border-gray-200">
//                 <img src="/images/refund.png" alt="refund" className="w-12 h-12"/>
//             </div>

//             <h1 className="text-[#2A2A2A] font-bold text-2xl">Refund customer</h1>
//             <p className="text-[#4A4A4A] font-nomal text-xs">Are you sure you want customer to be refunded?</p>
            
//         <div className="flex justify-end items-center mt-5 gap-5">
//             <Button onClick={()=> setIsRefund(false)} className="bg-transparent! rounded-sm! border-[#870A0A]! text-[#870A0A]!">No</Button>
//             <Button className="bg-[#060853]! rounded-sm! text-white! border-none!">Yes</Button>
//         </div>
//         </div>
//       </CustomModal>

//       <CustomModal
//         isOpen={isSuspended}
//         onClose={() => setIsSuspended(false)}
//         size="max-w-md"
//       >
//         <div className="flex justify-center items-center flex-col gap-4">

//             <div className="rounded-md p-3 border border-gray-200">
//                 <img src="/images/suspend.png" alt="suspend" className="w-12 h-12"/>
//             </div>

//             <h1 className="text-[#2A2A2A] font-bold text-2xl">Suspend business</h1>
//             <p className="text-[#4A4A4A] font-nomal text-xs">Are you sure you want to suspend this business?</p>
            
//         <div className="flex justify-end items-center mt-5 gap-5">
//             <Button onClick={()=> setIsSuspended(false)} className="bg-transparent! rounded-sm! border-[#870A0A]! text-[#870A0A]!">No</Button>
//             <Button className="bg-[#060853]! rounded-sm! text-white! border-none!">Yes</Button>
//         </div>
//         </div>
//       </CustomModal>
//     </div>
//   );
// };

// export default page;



"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Input, Spin, message } from "antd";
import dayjs from "dayjs";
import CustomModal from "@/components/CustomModal";
import { useOrderManagementStore } from "@/store/orderManagementStore";

const { TextArea } = Input;

const RESOLUTION_LABEL = {
  refund_customer: "Customer Refunded",
  warn_business: "Business Warned",
  suspend_business: "Business Suspended",
  dismissed: "Dismissed",
};

const page = () => {
  const params = useParams();
  const router = useRouter();
  const orderId = params.di;

  const {
    disputeOrder,
    dispute,
    chatHistory,
    disputeLoading,
    disputeError,
    disputeNotFound,
    getDisputeReview,
    clearDisputeReview,

    disputeActionLoading,
    openDispute,
    refundDisputeCustomer,
    suspendDisputeBusiness,
    sendDisputeMessage,
  } = useOrderManagementStore();

  const [complaint, setComplaint] = useState("");

  const [refundOpen, setRefundOpen] = useState(false);
  const [suspendOpen, setSuspendOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    if (orderId) getDisputeReview(orderId);
    return () => clearDisputeReview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const handleOpenDispute = async () => {
    if (!complaint.trim()) {
      message.error("Please describe the customer's complaint.");
      return;
    }

    const res = await openDispute(orderId, complaint.trim());
    if (res?.success) {
      message.success(res.message);
      setComplaint("");
    } else {
      message.error(res?.message);
    }
  };

  const handleRefund = async () => {
    const res = await refundDisputeCustomer(dispute._id);
    if (res?.success) {
      message.success(res.message);
      setRefundOpen(false);
    } else {
      message.error(res?.message);
    }
  };

  const handleSuspend = async () => {
    const res = await suspendDisputeBusiness(dispute._id);
    if (res?.success) {
      message.success(res.message);
      setSuspendOpen(false);
    } else {
      message.error(res?.message);
    }
  };

  const handleSendMessage = async () => {
    if (!messageText.trim()) {
      message.error("Please write a message.");
      return;
    }

    const res = await sendDisputeMessage(dispute._id, messageText.trim(), "customer");
    if (res?.success) {
      message.success(res.message);
      setMessageOpen(false);
      setMessageText("");
    } else {
      message.error(res?.message);
    }
  };

  /* ---------------- LOADING ---------------- */
  if (disputeLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spin size="large" />
      </div>
    );
  }

  /* ---------------- NO DISPUTE YET: OPEN INVESTIGATION FORM ---------------- */
  if (disputeNotFound) {
    return (
      <div className="max-w-xl mx-auto mt-16 px-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Investigate Order</h1>
          <p className="text-blue-600 text-sm mt-1">
            No active dispute exists for this order yet. Describe the customer's
            complaint to begin an investigation.
          </p>
        </div>

        <div className="bg-white border border-gray-100 rounded-sm p-6 shadow-sm">
          <label className="block text-xs font-bold text-gray-700 mb-2">
            Customer Complaint
          </label>
          <TextArea
            rows={5}
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            placeholder="Describe what the customer reported (e.g. received wrong/damaged items)..."
          />

          <div className="flex justify-end gap-3 mt-5">
            <Button onClick={() => router.back()} className="rounded-sm!">
              Cancel
            </Button>
            <Button
              onClick={handleOpenDispute}
              loading={disputeActionLoading}
              className="bg-[#060853]! text-white! border-none! rounded-sm!"
            >
              Open Investigation
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- GENERIC ERROR ---------------- */
  if (disputeError || !dispute || !disputeOrder) {
    return (
      <div className="text-center py-24 text-sm text-red-600">
        {disputeError || "Failed to load dispute details."}
      </div>
    );
  }

  const isResolved = dispute.status === "resolved";
  const alreadyRefunded = dispute.resolution === "refund_customer";
  const alreadySuspended = dispute.resolution === "suspend_business";

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-8">
      {/* HEADER */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Order Dispute Review</h1>
        <p className="text-blue-600 text-sm mt-1">
          Customer has raised a complaint regarding this order
        </p>
      </div>

      {isResolved && (
        <div className="max-w-2xl mx-auto bg-green-50 border border-green-200 text-green-800 text-sm font-medium rounded-sm p-3 text-center">
          Resolved — {RESOLUTION_LABEL[dispute.resolution] || dispute.resolution}
          {dispute.resolvedBy?.name ? ` by ${dispute.resolvedBy.name}` : ""}
          {dispute.resolvedAt ? ` on ${dayjs(dispute.resolvedAt).format("MMMM D, YYYY")}` : ""}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* ORDER DETAILS */}
        <div>
          <h2 className="text-sm font-bold text-gray-900 text-center mb-4">Order Details</h2>

          <div className="bg-white border border-gray-100 rounded-sm p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                {disputeOrder.customer?.avatar && (
                  <img src={disputeOrder.customer.avatar} className="w-full h-full object-cover" />
                )}
              </div>
              <span className="text-sm font-bold text-gray-900">
                {disputeOrder.customer?.name}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                {disputeOrder.business?.logo?.url && (
                  <img src={disputeOrder.business.logo.url} className="w-full h-full object-cover" />
                )}
              </div>
              <span className="text-sm font-bold text-gray-900">
                {disputeOrder.business?.businessName}
              </span>
            </div>

            <div className="text-xs space-y-1 pt-2 border-t border-gray-50">
              <p>
                <span className="font-bold text-gray-900">Order:</span>{" "}
                <span className="text-gray-500">#{disputeOrder.orderNumber}</span>
              </p>
              <p>
                <span className="font-bold text-gray-900">Date:</span>{" "}
                <span className="text-gray-500">
                  {dayjs(disputeOrder.createdAt).format("MMMM D, YYYY")}
                </span>
              </p>
              <p>
                <span className="font-bold text-gray-900">Total Amount:</span>{" "}
                <span className="text-gray-500">${disputeOrder.totalOriginalPrice}</span>
              </p>
            </div>

            <ul className="text-xs text-blue-700 list-disc list-inside space-y-1">
              {disputeOrder.items?.map((item) => (
                <li key={item._id}>
                  {item.quantity > 1 ? `${item.quantity}x ` : ""}
                  {item.title}
                </li>
              ))}
            </ul>

            <p className="text-xs">
              <span className="font-bold text-gray-900">Payment Status:</span>{" "}
              <span className="text-green-600 font-bold capitalize">
                {disputeOrder.paymentStatus}
              </span>
            </p>

            <div className="bg-red-50 border border-red-100 rounded-sm p-3">
              <p className="text-xs font-bold text-gray-900 mb-1">Customer Complaint</p>
              <p className="text-xs text-red-700 italic">"{dispute.complaint}"</p>
            </div>
          </div>
        </div>

        {/* CHAT HISTORY */}
        <div>
          <h2 className="text-sm font-bold text-gray-900 text-center mb-4">Chat History</h2>
          <div className="bg-white border border-gray-100 rounded-sm p-5 shadow-sm h-full flex flex-col items-center justify-center text-center min-h-[280px]">
            <span className="bg-gray-100 text-gray-500 text-xs font-bold px-4 py-2 rounded-sm">
              Coming Soon...
            </span>
            <p className="text-xs text-gray-400 mt-3">
              {chatHistory?.message || "Chat history feature will be available in future updates."}
            </p>
          </div>
        </div>
      </div>

      {/* ADMIN ACTIONS */}
      <div>
        <h3 className="text-xs font-bold text-gray-400 uppercase mb-3 border-t border-gray-100 pt-4">
          Admin Actions
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
          <button
            disabled={alreadyRefunded}
            onClick={() => setRefundOpen(true)}
            className="bg-[#060853] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold py-3 rounded-sm hover:bg-[#0a0d6e] transition-colors flex items-center justify-center gap-2"
          >
            <img src="/images/refund.png" className="w-4 h-4" alt="" />
            {alreadyRefunded ? "Customer Refunded" : "Refund Customer"}
          </button>

          <Link
            href={`/admin-dashboard/order-monitoring/${orderId}/warn`}
            className="bg-[#C08A1E] text-white text-xs font-bold py-3 rounded-sm hover:bg-[#a8791a] transition-colors flex items-center justify-center gap-2"
          >
            Warn Business
          </Link>

          <button
            disabled={alreadySuspended}
            onClick={() => setSuspendOpen(true)}
            className="bg-[#610C0C] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold py-3 rounded-sm hover:bg-red-950 transition-colors flex items-center justify-center gap-2"
          >
            <img src="/images/suspend.png" className="w-4 h-4" alt="" />
            {alreadySuspended ? "Business Suspended" : "Suspend Business"}
          </button>
        </div>

        <button
          onClick={() => setMessageOpen(true)}
          className="border border-gray-200 text-gray-700 text-xs font-bold py-3 px-6 rounded-sm hover:bg-gray-50 transition-colors"
        >
          Send a Message
        </button>
      </div>

      {/* REFUND CONFIRM MODAL */}
      <CustomModal isOpen={refundOpen} onClose={() => setRefundOpen(false)} size="max-w-sm" showClose={false}>
        <div className="text-center py-2">
          <div className="w-12 h-12 rounded-full bg-[#EAF0FF] flex items-center justify-center mx-auto mb-4">
            <img src="/images/refund.png" className="w-5 h-5" alt="" />
          </div>
          <h3 className="font-bold text-gray-900 mb-1">Refund customer</h3>
          <p className="text-xs text-gray-500 mb-6">Are you sure you want customer to be refunded?</p>
          <div className="flex justify-center gap-3">
            <Button onClick={() => setRefundOpen(false)} className="border-red-200! text-red-700! rounded-sm! px-6!">
              No
            </Button>
            <Button
              onClick={handleRefund}
              loading={disputeActionLoading}
              className="bg-[#060853]! text-white! border-none! rounded-sm! px-6!"
            >
              Yes
            </Button>
          </div>
        </div>
      </CustomModal>

      {/* SUSPEND CONFIRM MODAL */}
      <CustomModal isOpen={suspendOpen} onClose={() => setSuspendOpen(false)} size="max-w-sm" showClose={false}>
        <div className="text-center py-2">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <img src="/images/suspend.png" className="w-5 h-5" alt="" />
          </div>
          <h3 className="font-bold text-gray-900 mb-1">Suspend business</h3>
          <p className="text-xs text-gray-500 mb-6">Are you sure you want to suspend this business?</p>
          <div className="flex justify-center gap-3">
            <Button onClick={() => setSuspendOpen(false)} className="border-red-200! text-red-700! rounded-sm! px-6!">
              No
            </Button>
            <Button
              onClick={handleSuspend}
              loading={disputeActionLoading}
              className="bg-[#610C0C]! text-white! border-none! rounded-sm! px-6!"
            >
              Yes
            </Button>
          </div>
        </div>
      </CustomModal>

      {/* SEND MESSAGE MODAL */}
      <CustomModal isOpen={messageOpen} onClose={() => setMessageOpen(false)} title="Send a Message" size="max-w-md">
        <p className="text-xs text-gray-500 mb-3">This message will be sent to the customer.</p>
        <TextArea
          rows={4}
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type your message..."
        />
        <div className="flex justify-end gap-3 mt-4">
          <Button onClick={() => setMessageOpen(false)} className="rounded-sm!">
            Cancel
          </Button>
          <Button
            onClick={handleSendMessage}
            loading={disputeActionLoading}
            className="bg-[#060853]! text-white! border-none! rounded-sm!"
          >
            Send Message
          </Button>
        </div>
      </CustomModal>
    </div>
  );
};

export default page;
