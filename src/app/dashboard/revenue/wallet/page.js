// "use client";
// import React, { useState } from "react";
// import { Table, Tag, Button, DatePicker, Avatar, Input, Form } from "antd";
// import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
// import CustomModal from "@/components/CustomModal";

// const { RangePicker } = DatePicker;

// const WalletPage = () => {
//   const [show, setShow] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const [isPinOpen, setIsPinOpen] = useState(false);

//   const [form] = Form.useForm();

//   const handleClick = () => {
//     setShow((pre) => !pre);
//   };

//   const handleWithdrawal = () =>{
//     setIsOpen(false)
//     setIsPinOpen(true)
//   }
//   // --- TABLE DATA ---
//   const columns = [
//     {
//       title: "NAME",
//       dataIndex: "name",
//       key: "name",
//       render: (text) => <span className="font-bold">{text}</span>,
//     },
//     { title: "DATE/TIME", dataIndex: "dateTime", key: "dateTime" },
//     {
//       title: "AMOUNT",
//       dataIndex: "amount",
//       key: "amount",
//       render: (val) => <span className="font-bold">${val}</span>,
//     },
//     {
//       title: "STATUS",
//       dataIndex: "status",
//       key: "status",
//       render: (status) => (
//         <span
//           className={
//             status === "Successful" ? "text-blue-400" : "text-orange-400"
//           }
//         >
//           {status}
//         </span>
//       ),
//     },
//   ];

//   const dataSource = Array(8)
//     .fill({
//       key: "1",
//       name: "Adams James",
//       dateTime: "Sep 28, 12:00 AM",
//       amount: "450",
//       status: "Successful",
//     })
//     .map((item, i) => ({
//       ...item,
//       key: i,
//       status: i % 2 === 0 ? "Successful" : "Pending",
//     }));

//   const statsCard = [
//     {
//       id: 1,
//       title: "Daily Earnings",
//       value: "2500",
//       img: "/images/record-robort.png",
//     },
//     {
//       id: 2,
//       title: "Weekly Earnings ",
//       value: "3500",
//       img: "/images/record-robort.png",
//     },
//     {
//       id: 3,
//       title: "Monthly Earnings",
//       value: "9870",
//       img: "/images/record-robort.png",
//     },
//   ];

//   return (
//     <div className="space-y-6">
//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-8 mt-5">
//         <h1 className="text-xl font-bold text-gray-900">Wallet</h1>
//         <div className="flex gap-4">
//           <RangePicker className="rounded-lg border-gray-200" />
//           <Button className="p-4.5! bg-[#060853]! rounded-lg border-none! text-white!">
//             <img src="/images/upload.png" alt="export" className="h-7" />
//             Export Report
//           </Button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
//         {/* LEFT COLUMN */}
//         <div className="min-w-0 xl:col-span-7 space-y-6">
//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-[#E2EDFC] p-4 rounded-sm">
//             {statsCard.map((card) => (
//               <div
//                 key={card.id}
//                 className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
//               >
//                 <div className="flex items-center border-b border-gray-100 pb-2">
//                   <img src={card.img} alt="icon" className="h-8 mr-2" />
//                   <h3 className="text-gray-900 text-xs">{card.title}</h3>
//                 </div>
//                 <p className="mt-2 text-[#060853]">${card.value}</p>
//               </div>
//             ))}
//           </div>

//           <div className="bg-[#E2EDFC] p-4">
//             {/* RECENT TRANSACTIONS TABLE */}
//             <div className="bg-white rounded-xl overflow-hidden shadow-sm">
//               <Table
//                 columns={columns}
//                 dataSource={dataSource}
//                 pagination={false} // Custom pagination below
//                 className="custom-table"
//                 size="small"
//                 rowClassName="hover:bg-gray-50 transition-colors"
//               />
//             </div>
//             {/* FOOTER / PAGINATION */}
//             <div className="mt-5 flex flex-col gap-3 px-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
//               <span className="text-[11px] text-black">
//                 Show 1 to 4 of 20 results
//               </span>

//               <div className="flex max-w-full items-center gap-1 overflow-x-auto">
//                 <button className="p-2 text-gray-400 hover:text-black">
//                   <img
//                     src="/images/arrow_left.png"
//                     alt="prev"
//                     className="h-4"
//                   />
//                 </button>
//                 <button className="w-8 h-8 flex items-center justify-center rounded bg-[#060853] text-white text-xs font-bold">
//                   1
//                 </button>
//                 <button className="w-8 h-8 flex items-center justify-center rounded bg-white border border-gray-100 text-gray-400 text-xs">
//                   2
//                 </button>
//                 <button className="w-8 h-8 flex items-center justify-center rounded bg-white  border border-gray-100 text-gray-400 text-xs">
//                   3
//                 </button>
//                 <button className="w-8 h-8 flex items-center justify-center rounded bg-white  border border-gray-100 text-gray-400 text-xs">
//                   4
//                 </button>
//                 <span className="px-1 text-gray-400">...</span>
//                 <button className="w-8 h-8 flex items-center justify-center rounded bg-white  border border-gray-100 text-gray-400 text-xs">
//                   10
//                 </button>
//                 <button className="w-8 h-8 flex items-center justify-center rounded bg-white  border border-gray-100 text-gray-400 text-xs">
//                   11
//                 </button>
//                 <button className="p-2 text-gray-400 hover:text-black">
//                   {" "}
//                   <img
//                     src="/images/arrow_right.png"
//                     alt="next"
//                     className="h-4"
//                   />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT COLUMN */}
//         <div className="min-w-0 xl:col-span-5 space-y-6">
//           {/* VIRTUAL CARD */}
//           <div className="bg-white rounded-t-lg">
//             <div className="bg-[#060853]  p-8 rounded-3xl text-white relative overflow-hidden">
//               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
//               <div className="flex justify-between items-center">
//                 <p className="text-xs text-white mb-2">Current Balance (NGN)</p>
//                 <div>
//                   <img
//                     onClick={handleClick}
//                     src={`/images/${show ? "closed_eye.png" : "open_eye.png"}`}
//                     alt=""
//                     className="w-5 cursor-pointer"
//                   />
//                 </div>
//               </div>
//               {show ? (
//                 <h2 className="text-4xl font-bold mb-8">****</h2>
//               ) : (
//                 <h2 className="text-4xl font-bold mb-8">$445,456.90</h2>
//               )}
//               <div className="flex justify-between items-end">
//                 <span className="text-xs opacity-60">09/08/2024</span>
//                 <Button
//                   size="small"
//                   onClick={() => setIsOpen(true)}
//                   className="bg-white text-[#060853] border-none font-bold text-[10px]"
//                 >
//                   Request Payout
//                 </Button>
//               </div>
//             </div>
//             {/* WITHDRAWN / LIFE TIME CARDS */}
//             <div className="bg-white p-6 mt-2 flex justify-between">
//               <div className="space-y-1">
//                 <p className="text-xs text-[#4A4A4A] font-bold">Withdrawn</p>
//                 <div className="flex items-center gap-2">
//                   <span className="text-xl text-black font-bold">
//                     $ 100,000
//                   </span>
//                   <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
//                     <ArrowDownOutlined className="text-green-500 text-[10px]" />
//                   </div>
//                 </div>
//               </div>
//               <div className="space-y-1 text-right">
//                 <p className="text-xs text-[#4A4A4A] font-bold">
//                   Life Time Earning
//                 </p>
//                 <div className="flex items-center justify-end gap-2">
//                   <span className="text-xl text-black font-bold">
//                     $ 800,000
//                   </span>
//                   <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
//                     <ArrowUpOutlined className="text-red-500 text-[10px]" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* TRANSACTION LIST ITEMS */}
//           <div className="space-y-4">
//             {[
//               {
//                 name: "Adams Sekani",
//                 date: "May 21 2025",
//                 amount: "140,000",
//                 status: "SUCCESS",
//                 color: "green",
//               },
//               {
//                 name: "Adams Sekani",
//                 date: "May 21 2025",
//                 amount: "140,000",
//                 status: "CANCELLED",
//                 color: "red",
//               },
//             ].map((item, i) => (
//               <div
//                 key={i}
//                 className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50"
//               >
//                 <div className="flex justify-between items-start mb-4">
//                   <div className="flex gap-3">
//                     <Avatar size={40} src="https://i.pravatar.cc/100" />
//                     <div>
//                       <p className="text-sm font-bold text-gray-800">
//                         {item.name}
//                       </p>
//                       <p className="text-[12px] text-[#4A4A4A]">
//                         sekaniadams@gmail.com
//                       </p>
//                     </div>
//                   </div>
//                   <Tag
//                     color={item.color === "green" ? "green" : "volcano"}
//                     className="rounded-full text-[9px] font-bold px-3"
//                   >
//                     {item.status}
//                   </Tag>
//                 </div>
//                 <div className="flex justify-between items-end">
//                   <div>
//                     <p className="text-[10px] text-gray-400 font-bold">Date</p>
//                     <p className="text-xs text-[#4A4A4A] font-bold">
//                       {item.date}
//                     </p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-[10px] text-gray-400 font-bold">
//                       Amount
//                     </p>
//                     <p className="text-sm text-[#4A4A4A] font-black">
//                       ₦ {item.amount}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <style jsx global>{`
//         .custom-table .ant-table {
//           background: transparent !important;
//         }
//         .custom-table .ant-table-thead > tr > th {
//           background: #060853 !important;
//           color: white !important;
//           font-size: 10px;
//           border-radius: 0 !important;
//         }
//         .custom-table .ant-table-tbody > tr > td {
//           border-bottom: 1px solid #f0f0f0;
//           font-size: 12px;
//           padding: 12px 16px !important;
//         }
//       `}</style>

//       <CustomModal
//         isOpen={isOpen}
//         onClose={() => setIsOpen(false)}
//         showClose = {false}
//         title=<div className="flex justify-center w-83.75">
//         <h1 className="text-center">Request Payout</h1>
//         </div>
//         size="max-w-sm"
//       >
//         <Form layout="vertical">
//           <Form.Item
//             name="Available Balance"
//             label={<span className="font-bold text-gray-700">Available Balance</span>}
//           >
//             <Input placeholder="$100,000,000" className="h-12 bg-gray-50 border-gray-100 rounded-xl" />
//           </Form.Item>
//           <Form.Item
//             name="Payout Amount"
//             label={<span className="font-bold text-gray-700">Payout Amount</span>}
//           >
//             <Input placeholder="Enter Payout Amount" className="h-12 bg-gray-50 border-gray-100 rounded-xl" />
//           </Form.Item>

//           <Button onClick={handleWithdrawal} className="bg-[#060853]! w-full! border-none! text-white! h-10!">Request Payout</Button>
//         </Form>
//       </CustomModal>
      
//       {/* PIN MODAL */}
//       <CustomModal
//         isOpen={isPinOpen}
//         onClose={() => setIsPinOpen(false)}
//         showClose = {false}
//         title=<div className="flex justify-center w-83.75">
//         <h1 className="text-center">Enter Your Pin</h1>
//         </div>
//         size="max-w-sm"
//       >
//         <Form layout="vertical">
//           <Form.Item
//             name="Available Balance"
//             label={<span className="font-bold text-gray-700">Available Balance</span>}
//           >
//             <Input placeholder="$100,000,000" className="h-12 bg-gray-50 border-gray-100 rounded-xl" />
//           </Form.Item>

//           <Button className="bg-[#060853]! w-full! border-none! text-white! h-10!">Sumit</Button>
//         </Form>
//       </CustomModal>
//     </div>
//   );
// };

// export default WalletPage;


"use client";
import React, { useEffect, useState } from "react";
import { Table, Tag, Button, DatePicker, Avatar, Input, Form, message } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import CustomModal from "@/components/CustomModal";
import { useWalletStore } from "@/store/walletStore";

const { RangePicker } = DatePicker;

// Builds a compact page-number list (1,2,3,4 ... 10,11 style) around the current page.
const buildPageList = (current, total) => {
  if (total <= 1) return [1];
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = new Set(
    [1, 2, current - 1, current, current + 1, total - 1, total].filter(
      (p) => p >= 1 && p <= total,
    ),
  );

  return Array.from(pages).sort((a, b) => a - b);
};

const formatDateTime = (value) => {
  if (!value) return "";
  const d = new Date(value);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const formatDate = (value) => {
  if (!value) return "";
  const d = new Date(value);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const WalletPage = () => {
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPinOpen, setIsPinOpen] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // PIN modal can be in "verify" (existing PIN) or "setup" (no PIN yet / forgot PIN) mode
  const [pinMode, setPinMode] = useState("verify"); // "verify" | "setup"
  const [pinValue, setPinValue] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmNewPin, setConfirmNewPin] = useState("");

  const [form] = Form.useForm();

  const {
    balance,
    earnings,
    transactions,
    pagination,
    payoutLoading,
    pinOtpLoading,
    getBalance,
    getEarningsSummary,
    getTransactions,
    requestPayout,
    requestPinOtp,
    confirmPinSetup,
  } = useWalletStore();

  useEffect(() => {
    getBalance();
    getEarningsSummary();
    getTransactions({ page: 1, limit: 10 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    setShow((pre) => !pre);
  };

  const goToPage = (targetPage) => {
    if (targetPage < 1 || (pagination?.totalPages && targetPage > pagination.totalPages)) return;
    setCurrentPage(targetPage);
    getTransactions({ page: targetPage, limit: 10 });
  };

  const openPayoutModal = () => {
    setPayoutAmount("");
    setIsOpen(true);
  };

  const resetPinModalState = () => {
    setPinValue("");
    setOtpSent(false);
    setOtpValue("");
    setNewPin("");
    setConfirmNewPin("");
  };

  const handleWithdrawal = async () => {
    const amount = Number(payoutAmount);

    if (!amount || amount <= 0) {
      message.error("Enter a valid payout amount.");
      return;
    }

    if (balance && amount > (balance.availableBalance || 0)) {
      message.error("Payout amount exceeds your available balance.");
      return;
    }

    setIsOpen(false);
    resetPinModalState();

    if (balance?.hasPin) {
      setPinMode("verify");
      setIsPinOpen(true);
    } else {
      // No PIN set yet — send the setup code straight away
      setPinMode("setup");
      setIsPinOpen(true);
      const result = await requestPinOtp();
      if (result.success) {
        setOtpSent(true);
        message.info(result.message || "Verification code sent to your email.");
      } else {
        message.error(result.message || "Failed to send verification code.");
      }
    }
  };

  const handleResendOtp = async () => {
    const result = await requestPinOtp();
    if (result.success) {
      setOtpSent(true);
      message.info(result.message || "Verification code sent to your email.");
    } else {
      message.error(result.message || "Failed to send verification code.");
    }
  };

  const handleForgotPin = async () => {
    setPinMode("setup");
    setOtpSent(false);
    setPinValue("");
    const result = await requestPinOtp();
    if (result.success) {
      setOtpSent(true);
      message.info(result.message || "Verification code sent to your email.");
    } else {
      message.error(result.message || "Failed to send verification code.");
    }
  };

  const handleVerifyAndPay = async () => {
    if (!pinValue) {
      message.error("Enter your withdrawal PIN.");
      return;
    }

    const amount = Number(payoutAmount);
    const result = await requestPayout(amount, pinValue);

    if (result.success) {
      message.success(result.message || "Payout request submitted.");
      setIsPinOpen(false);
      setPayoutAmount("");
      setCurrentPage(1);
      resetPinModalState();
    } else if (result.pinRequired) {
      // wallet has no PIN (edge case / race condition) — fall back to setup
      handleForgotPin();
    } else {
      message.error(result.message || "Incorrect PIN.");
      setPinValue("");
    }
  };

  const handleConfirmSetupAndPay = async () => {
    if (!/^\d{4,6}$/.test(otpValue || "")) {
      message.error("Enter the 6-digit code sent to your email.");
      return;
    }
    if (!/^\d{4,6}$/.test(newPin || "")) {
      message.error("PIN must be 4 to 6 digits.");
      return;
    }
    if (newPin !== confirmNewPin) {
      message.error("PINs do not match.");
      return;
    }

    const setupResult = await confirmPinSetup(otpValue, newPin);

    if (!setupResult.success) {
      message.error(setupResult.message || "Failed to set withdrawal PIN.");
      return;
    }

    message.success("Withdrawal PIN set successfully.");

    const amount = Number(payoutAmount);
    const payoutResult = await requestPayout(amount, newPin);

    if (payoutResult.success) {
      message.success(payoutResult.message || "Payout request submitted.");
      setIsPinOpen(false);
      setPayoutAmount("");
      setCurrentPage(1);
      resetPinModalState();
    } else {
      message.error(payoutResult.message || "Failed to submit payout request.");
    }
  };

  // --- TABLE DATA ---
  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      render: (text) => <span className="font-bold">{text}</span>,
    },
    { title: "DATE/TIME", dataIndex: "dateTime", key: "dateTime" },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      key: "amount",
      render: (val) => <span className="font-bold">${Number(val || 0).toLocaleString()}</span>,
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={
            status === "Successful"
              ? "text-blue-400"
              : status === "Pending"
                ? "text-orange-400"
                : "text-red-400"
          }
        >
          {status}
        </span>
      ),
    },
  ];

  const dataSource = (transactions || []).map((tx) => ({
    key: tx.key,
    name: tx.name,
    dateTime: formatDateTime(tx.dateTime),
    amount: tx.amount,
    status: tx.status,
  }));

  const statsCard = [
    {
      id: 1,
      title: "Daily Earnings",
      value: (earnings?.dailyEarnings ?? 0).toLocaleString(),
      img: "/images/record-robort.png",
    },
    {
      id: 2,
      title: "Weekly Earnings ",
      value: (earnings?.weeklyEarnings ?? 0).toLocaleString(),
      img: "/images/record-robort.png",
    },
    {
      id: 3,
      title: "Monthly Earnings",
      value: (earnings?.monthlyEarnings ?? 0).toLocaleString(),
      img: "/images/record-robort.png",
    },
  ];

  const total = pagination?.total || 0;
  const limit = pagination?.limit || 10;
  const totalPages = pagination?.totalPages || 1;
  const activePage = pagination?.page || currentPage;
  const rangeStartIdx = total === 0 ? 0 : (activePage - 1) * limit + 1;
  const rangeEndIdx = Math.min(activePage * limit, total);
  const pageList = buildPageList(activePage, totalPages);

  const recentItems = (transactions || []).slice(0, 2).map((tx) => ({
    name: tx.name,
    email: tx.email || "—",
    date: formatDate(tx.dateTime),
    amount: Number(tx.amount || 0).toLocaleString(),
    status: tx.status === "Successful" ? "SUCCESS" : tx.status.toUpperCase(),
    color: tx.status === "Successful" ? "green" : tx.status === "Pending" ? "orange" : "red",
  }));

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 mt-5">
        <h1 className="text-xl font-bold text-gray-900">Wallet</h1>
        <div className="flex gap-4">
          <RangePicker className="rounded-lg border-gray-200" />
          <Button className="p-4.5! bg-[#060853]! rounded-lg border-none! text-white!">
            <img src="/images/upload.png" alt="export" className="h-7" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        {/* LEFT COLUMN */}
        <div className="min-w-0 xl:col-span-7 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-[#E2EDFC] p-4 rounded-sm">
            {statsCard.map((card) => (
              <div
                key={card.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <div className="flex items-center border-b border-gray-100 pb-2">
                  <img src={card.img} alt="icon" className="h-8 mr-2" />
                  <h3 className="text-gray-900 text-xs">{card.title}</h3>
                </div>
                <p className="mt-2 text-[#060853]">${card.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#E2EDFC] p-4">
            {/* RECENT TRANSACTIONS TABLE */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <Table
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                className="custom-table"
                size="small"
                rowClassName="hover:bg-gray-50 transition-colors"
              />
            </div>
            {/* FOOTER / PAGINATION */}
            <div className="mt-5 flex flex-col gap-3 px-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <span className="text-[11px] text-black">
                {total === 0
                  ? "No results"
                  : `Show ${rangeStartIdx} to ${rangeEndIdx} of ${total} results`}
              </span>

              <div className="flex max-w-full items-center gap-1 overflow-x-auto">
                <button
                  onClick={() => goToPage(activePage - 1)}
                  className="p-2 text-gray-400 hover:text-black"
                >
                  <img
                    src="/images/arrow_left.png"
                    alt="prev"
                    className="h-4"
                  />
                </button>
                {pageList.map((p, idx) => (
                  <React.Fragment key={p}>
                    {idx > 0 && pageList[idx - 1] !== p - 1 && (
                      <span className="px-1 text-gray-400">...</span>
                    )}
                    <button
                      onClick={() => goToPage(p)}
                      className={
                        p === activePage
                          ? "w-8 h-8 flex items-center justify-center rounded bg-[#060853] text-white text-xs font-bold"
                          : "w-8 h-8 flex items-center justify-center rounded bg-white  border border-gray-100 text-gray-400 text-xs"
                      }
                    >
                      {p}
                    </button>
                  </React.Fragment>
                ))}
                <button
                  onClick={() => goToPage(activePage + 1)}
                  className="p-2 text-gray-400 hover:text-black"
                >
                  {" "}
                  <img
                    src="/images/arrow_right.png"
                    alt="next"
                    className="h-4"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="min-w-0 xl:col-span-5 space-y-6">
          {/* VIRTUAL CARD */}
          <div className="bg-white rounded-t-lg">
            <div className="bg-[#060853]  p-8 rounded-3xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
              <div className="flex justify-between items-center">
                <p className="text-xs text-white mb-2">Current Balance ({balance?.currency || "USD"})</p>
                <div>
                  <img
                    onClick={handleClick}
                    src={`/images/${show ? "closed_eye.png" : "open_eye.png"}`}
                    alt=""
                    className="w-5 cursor-pointer"
                  />
                </div>
              </div>
              {show ? (
                <h2 className="text-4xl font-bold mb-8">****</h2>
              ) : (
                <h2 className="text-4xl font-bold mb-8">
                  ${(balance?.availableBalance ?? 0).toLocaleString()}
                </h2>
              )}
              <div className="flex justify-between items-end">
                <span className="text-xs opacity-60">
                  {balance?.updatedAt ? formatDate(balance.updatedAt) : ""}
                </span>
                <Button
                  size="small"
                  onClick={openPayoutModal}
                  className="bg-white text-[#060853] border-none font-bold text-[10px]"
                >
                  Request Payout
                </Button>
              </div>
            </div>
            {/* WITHDRAWN / LIFE TIME CARDS */}
            <div className="bg-white p-6 mt-2 flex justify-between">
              <div className="space-y-1">
                <p className="text-xs text-[#4A4A4A] font-bold">Withdrawn</p>
                <div className="flex items-center gap-2">
                  <span className="text-xl text-black font-bold">
                    ${(earnings?.withdrawnTotal ?? 0).toLocaleString()}
                  </span>
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <ArrowDownOutlined className="text-green-500 text-[10px]" />
                  </div>
                </div>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-xs text-[#4A4A4A] font-bold">
                  Life Time Earning
                </p>
                <div className="flex items-center justify-end gap-2">
                  <span className="text-xl text-black font-bold">
                    ${(earnings?.lifetimeEarning ?? 0).toLocaleString()}
                  </span>
                  <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                    <ArrowUpOutlined className="text-red-500 text-[10px]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TRANSACTION LIST ITEMS */}
          <div className="space-y-4">
            {recentItems.length === 0 && (
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50 text-center text-xs text-gray-400">
                No recent transactions yet
              </div>
            )}
            {recentItems.map((item, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-3">
                    <Avatar size={40} src="https://i.pravatar.cc/100" />
                    <div>
                      <p className="text-sm font-bold text-gray-800">
                        {item.name}
                      </p>
                      <p className="text-[12px] text-[#4A4A4A]">
                        {item.email}
                      </p>
                    </div>
                  </div>
                  <Tag
                    color={item.color === "green" ? "green" : "volcano"}
                    className="rounded-full text-[9px] font-bold px-3"
                  >
                    {item.status}
                  </Tag>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold">Date</p>
                    <p className="text-xs text-[#4A4A4A] font-bold">
                      {item.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 font-bold">
                      Amount
                    </p>
                    <p className="text-sm text-[#4A4A4A] font-black">
                      $ {item.amount}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-table .ant-table {
          background: transparent !important;
        }
        .custom-table .ant-table-thead > tr > th {
          background: #060853 !important;
          color: white !important;
          font-size: 10px;
          border-radius: 0 !important;
        }
        .custom-table .ant-table-tbody > tr > td {
          border-bottom: 1px solid #f0f0f0;
          font-size: 12px;
          padding: 12px 16px !important;
        }
      `}</style>

      <CustomModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        showClose = {false}
        title=<div className="flex justify-center w-83.75">
        <h1 className="text-center">Request Payout</h1>
        </div>
        size="max-w-sm"
      >
        <Form layout="vertical">
          <Form.Item
            name="Available Balance"
            label={<span className="font-bold text-gray-700">Available Balance</span>}
          >
            <Input
              readOnly
              value={`$${(balance?.availableBalance ?? 0).toLocaleString()}`}
              className="h-12 bg-gray-50 border-gray-100 rounded-xl"
            />
          </Form.Item>
          <Form.Item
            name="Payout Amount"
            label={<span className="font-bold text-gray-700">Payout Amount</span>}
          >
            <Input
              placeholder="Enter Payout Amount"
              value={payoutAmount}
              onChange={(e) => setPayoutAmount(e.target.value.replace(/[^0-9.]/g, ""))}
              className="h-12 bg-gray-50 border-gray-100 rounded-xl"
            />
          </Form.Item>

          <Button onClick={handleWithdrawal} className="bg-[#060853]! w-full! border-none! text-white! h-10!">Request Payout</Button>
        </Form>
      </CustomModal>
      
      {/* PIN MODAL */}
      <CustomModal
        isOpen={isPinOpen}
        onClose={() => setIsPinOpen(false)}
        showClose = {false}
        title=<div className="flex justify-center w-83.75">
        <h1 className="text-center">Enter Your Pin</h1>
        </div>
        size="max-w-sm"
      >
        <Form layout="vertical">
          <Form.Item
            name="Available Balance"
            label={<span className="font-bold text-gray-700">Available Balance</span>}
          >
            <Input
              readOnly
              value={`$${(balance?.availableBalance ?? 0).toLocaleString()}`}
              className="h-12 bg-gray-50 border-gray-100 rounded-xl"
            />
          </Form.Item>

          {pinMode === "verify" && (
            <>
              <Form.Item
                name="Withdrawal PIN"
                label={<span className="font-bold text-gray-700">Withdrawal PIN</span>}
              >
                <Input.Password
                  placeholder="Enter your 4-6 digit PIN"
                  maxLength={6}
                  value={pinValue}
                  onChange={(e) => setPinValue(e.target.value.replace(/[^0-9]/g, ""))}
                  className="h-12 bg-gray-50 border-gray-100 rounded-xl"
                />
              </Form.Item>

              <button
                type="button"
                onClick={handleForgotPin}
                className="text-xs text-[#060853] font-bold mb-4 underline"
              >
                Forgot PIN?
              </button>

              <Button
                onClick={handleVerifyAndPay}
                loading={payoutLoading}
                className="bg-[#060853]! w-full! border-none! text-white! h-10!"
              >
                Submit
              </Button>
            </>
          )}

          {pinMode === "setup" && !otpSent && (
            <>
              <p className="text-xs text-gray-500 mb-4">
                You don&apos;t have a withdrawal PIN set up yet. We&apos;re sending a
                verification code to your email — enter it below along with a new PIN to
                continue.
              </p>
              <Button
                onClick={handleResendOtp}
                loading={pinOtpLoading}
                className="bg-[#060853]! w-full! border-none! text-white! h-10!"
              >
                Send Verification Code
              </Button>
            </>
          )}

          {pinMode === "setup" && otpSent && (
            <>
              <Form.Item
                name="Verification Code"
                label={<span className="font-bold text-gray-700">Verification Code</span>}
              >
                <Input
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value.replace(/[^0-9]/g, ""))}
                  className="h-12 bg-gray-50 border-gray-100 rounded-xl"
                />
              </Form.Item>
              <Form.Item
                name="New PIN"
                label={<span className="font-bold text-gray-700">New Withdrawal PIN</span>}
              >
                <Input.Password
                  placeholder="4-6 digits"
                  maxLength={6}
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value.replace(/[^0-9]/g, ""))}
                  className="h-12 bg-gray-50 border-gray-100 rounded-xl"
                />
              </Form.Item>
              <Form.Item
                name="Confirm New PIN"
                label={<span className="font-bold text-gray-700">Confirm New PIN</span>}
              >
                <Input.Password
                  placeholder="Re-enter PIN"
                  maxLength={6}
                  value={confirmNewPin}
                  onChange={(e) => setConfirmNewPin(e.target.value.replace(/[^0-9]/g, ""))}
                  className="h-12 bg-gray-50 border-gray-100 rounded-xl"
                />
              </Form.Item>

              <button
                type="button"
                onClick={handleResendOtp}
                className="text-xs text-[#060853] font-bold mb-4 underline"
              >
                Resend code
              </button>

              <Button
                onClick={handleConfirmSetupAndPay}
                loading={payoutLoading || pinOtpLoading}
                className="bg-[#060853]! w-full! border-none! text-white! h-10!"
              >
                Confirm & Withdraw
              </Button>
            </>
          )}
        </Form>
      </CustomModal>
    </div>
  );
};

export default WalletPage;

