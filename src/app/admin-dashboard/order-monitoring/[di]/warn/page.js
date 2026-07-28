// "use client";

// import React, { use } from "react";
// import { useRouter } from "next/navigation";
// import { Button, Input } from "antd";
// import {
//   ArrowLeftOutlined,
//   MailOutlined,
//   PhoneOutlined,
//   WarningFilled,
// } from "@ant-design/icons";

// const { TextArea } = Input;

// const page = ({ params }) => {
//   const router = useRouter();
//   const { id } = use(params);

//   return (
//     <div className="min-h-screen bg-white p-8">
//       {/* Header / Back Link */}
//       <div className="mb-10">
//         <button
//           onClick={() => router.back()}
//           className="flex items-center gap-2 text-gray-900 font-bold text-lg hover:opacity-70 transition-opacity"
//         >
//           <ArrowLeftOutlined className="text-sm" /> Warning Message
//         </button>
//       </div>

//       <div className="">
//         {/* Contact Details Section */}
//         <div className="mb-12">
//           <h2 className="text-xl font-bold text-black mb-6">Contact Details</h2>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
//             {/* Business/Owner Info */}
//             <div className="flex items-center gap-3">
//               <img
//                 src="/images/perls-marvin.png"
//                 className="w-12 h-12 rounded-full object-cover bg-gray-100"
//                 alt="Perlson Marvin"
//               />
//               <div>
//                 <p className="font-bold text-gray-900 text-[15px]">
//                   Perlson Marvin
//                 </p>
//                 <p className="text-xs text-gray-400">Wafas Limited Plc</p>
//               </div>
//             </div>

//             {/* Address & Type */}
//             <div className="space-y-4">
//               <div>
//                 <p className="text-xs text-gray-400">Business Address</p>
//                 <p className="font-bold text-gray-900 text-[13px]">
//                   No. 34 wakali Street Ikeja, Lagos.
//                 </p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-400">Business Type</p>
//                 <p className="font-bold text-gray-900 text-[13px]">
//                   IT Consulting & Services
//                 </p>
//               </div>
//             </div>

//             {/* Phone & Email */}
//             <div className="space-y-4">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 bg-[#ECFDF5] text-[#10B981] flex items-center justify-center rounded-lg">
//                   <PhoneOutlined rotate={90} />
//                 </div>
//                 <div>
//                   <p className="font-bold text-gray-900 text-[13px]">
//                     +1 34699976830
//                   </p>
//                   <p className="text-xs text-gray-400">Phone Number</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 bg-[#ECFDF5] text-[#10B981] flex items-center justify-center rounded-lg">
//                   <MailOutlined />
//                 </div>
//                 <div>
//                   <p className="font-bold text-gray-900 text-[13px]">
//                     oramafelix!gmail.com
//                   </p>
//                   <p className="text-xs text-gray-400">Mail Address</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Warning Message Box */}
//         <div className="bg-[#FFE9E9] rounded-sm p-8 md:p-12">
//           <h3 className="font-bold text-gray-900 mb-6">Warning Message</h3>

//           <TextArea
//             placeholder="Enter your message here"
//             className="resize-none!"
//             rows={15}
//           />

//           {/* Footer Warning Info */}
//           <div className="mt-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
//             <div className="flex items-center gap-2 text-[#870A0A] text-xs font-bold">
//               <WarningFilled />
//               <span>
//                 Warning: This an official warning regarding your account.
//               </span>
//             </div>

//             <div className="flex gap-4 w-full md:w-auto">
//               <Button
//                 onClick={() => router.back()}
//                 className="h-10 px-8 border-[#870A0A]! text-[#870A0A]! bg-transparent! rounded-sm! font-bold"
//               >
//                 Cancel
//               </Button>
//               <Button className="h-10 px-8 bg-[#060853]! text-white! border-none! rounded-sm! font-bold">
//                 Send Message
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default page;



"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Input, Spin, message } from "antd";
import { FiArrowLeft, FiPhone, FiMail } from "react-icons/fi";
import { useOrderManagementStore } from "@/store/orderManagementStore";

const { TextArea } = Input;

const page = () => {
  const params = useParams();
  const router = useRouter();
  const orderId = params.di;

  const {
    disputeOrder,
    dispute,
    disputeLoading,
    disputeError,
    getDisputeReview,

    disputeActionLoading,
    warnDisputeBusiness,
  } = useOrderManagementStore();

  const [warningMessage, setWarningMessage] = useState("");

  useEffect(() => {
    // Ensure we have the dispute loaded even on a direct page refresh —
    // if it's already in the store from the review page, this resolves instantly.
    if (orderId && (!dispute || dispute.order !== orderId)) {
      getDisputeReview(orderId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const handleSend = async () => {
    if (!warningMessage.trim()) {
      message.error("Please enter your warning message.");
      return;
    }

    const res = await warnDisputeBusiness(dispute._id, warningMessage.trim());

    if (res?.success) {
      message.success(res.message);
      router.push(`/admin-dashboard/order-monitoring/${orderId}`);
    } else {
      message.error(res?.message);
    }
  };

  if (disputeLoading || !disputeOrder) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spin size="large" />
      </div>
    );
  }

  if (disputeError) {
    return <div className="text-center py-24 text-sm text-red-600">{disputeError}</div>;
  }

  const business = disputeOrder.business;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[#060853] font-bold text-sm mb-8 hover:underline"
      >
        <FiArrowLeft /> Warning Message
      </button>

      <h2 className="text-sm font-bold text-gray-900 mb-4">Contact Details</h2>

      <div className="flex items-start justify-between border-b border-gray-100 pb-6 mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
            {business?.logo?.url && (
              <img src={business.logo.url} className="w-full h-full object-cover" />
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">{business?.businessName}</p>
            <p className="text-xs text-gray-400">Business</p>
          </div>
        </div>

        <div className="text-xs">
          <p className="text-gray-400">Business Address</p>
          <p className="font-bold text-gray-900">{business?.address}</p>
          <p className="text-gray-400 mt-2">Business Type</p>
          <p className="font-bold text-gray-900">
            {business?.category?.map((c) => c.name).join(", ") || "—"}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="w-6 h-6 rounded bg-green-50 flex items-center justify-center">
              <FiPhone className="text-green-600" size={12} />
            </span>
            <div>
              <p className="font-bold text-gray-900">{business?.businessPhone}</p>
              <p className="text-gray-400">Phone Number</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="w-6 h-6 rounded bg-green-50 flex items-center justify-center">
              <FiMail className="text-green-600" size={12} />
            </span>
            <div>
              <p className="font-bold text-gray-900">{business?.businessEmail}</p>
              <p className="text-gray-400">Mail Address</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-red-50 border border-red-100 rounded-sm p-6">
        <h3 className="text-sm font-bold text-red-700 mb-3">Warning Message</h3>

        <TextArea
          rows={8}
          value={warningMessage}
          onChange={(e) => setWarningMessage(e.target.value)}
          placeholder="Enter your message here"
          className="bg-white!"
        />

        <div className="flex items-center justify-between mt-4">
          <p className="text-xs text-red-600 flex items-center gap-1">
            ⚠ Warning: This an official warning regarding your account.
          </p>

          <div className="flex gap-3">
            <Button onClick={() => router.back()} className="rounded-sm!">
              Cancel
            </Button>
            <Button
              onClick={handleSend}
              loading={disputeActionLoading}
              className="bg-[#060853]! text-white! border-none! rounded-sm!"
            >
              Send Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

