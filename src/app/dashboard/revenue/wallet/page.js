"use client";
import React, { useState } from "react";
import { Table, Tag, Button, DatePicker, Avatar, Input, Form } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import CustomModal from "@/components/CustomModal";

const { RangePicker } = DatePicker;

const WalletPage = () => {
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPinOpen, setIsPinOpen] = useState(false);

  const [form] = Form.useForm();

  const handleClick = () => {
    setShow((pre) => !pre);
  };

  const handleWithdrawal = () =>{
    setIsOpen(false)
    setIsPinOpen(true)
  }
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
      render: (val) => <span className="font-bold">${val}</span>,
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={
            status === "Successful" ? "text-blue-400" : "text-orange-400"
          }
        >
          {status}
        </span>
      ),
    },
  ];

  const dataSource = Array(8)
    .fill({
      key: "1",
      name: "Adams James",
      dateTime: "Sep 28, 12:00 AM",
      amount: "450",
      status: "Successful",
    })
    .map((item, i) => ({
      ...item,
      key: i,
      status: i % 2 === 0 ? "Successful" : "Pending",
    }));

  const statsCard = [
    {
      id: 1,
      title: "Daily Earnings",
      value: "2500",
      img: "/images/record-robort.png",
    },
    {
      id: 2,
      title: "Weekly Earnings ",
      value: "3500",
      img: "/images/record-robort.png",
    },
    {
      id: 3,
      title: "Monthly Earnings",
      value: "9870",
      img: "/images/record-robort.png",
    },
  ];

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

      <div className="grid grid-cols-12 gap-6">
        {/* LEFT COLUMN */}
        <div className="col-span-12 lg:col-span-7 space-y-6">
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
                pagination={false} // Custom pagination below
                className="custom-table"
                size="small"
                rowClassName="hover:bg-gray-50 transition-colors"
              />
            </div>
            {/* FOOTER / PAGINATION */}
            <div className="flex items-center justify-between px-6 py-4 mt-5">
              <span className="text-[11px] text-black">
                Show 1 to 4 of 20 results
              </span>

              <div className="flex items-center gap-1">
                <button className="p-2 text-gray-400 hover:text-black">
                  <img
                    src="/images/arrow_left.png"
                    alt="prev"
                    className="h-4"
                  />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded bg-[#060853] text-white text-xs font-bold">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded bg-white border border-gray-100 text-gray-400 text-xs">
                  2
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded bg-white  border border-gray-100 text-gray-400 text-xs">
                  3
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded bg-white  border border-gray-100 text-gray-400 text-xs">
                  4
                </button>
                <span className="px-1 text-gray-400">...</span>
                <button className="w-8 h-8 flex items-center justify-center rounded bg-white  border border-gray-100 text-gray-400 text-xs">
                  10
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded bg-white  border border-gray-100 text-gray-400 text-xs">
                  11
                </button>
                <button className="p-2 text-gray-400 hover:text-black">
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
        <div className="col-span-12 lg:col-span-5 space-y-6">
          {/* VIRTUAL CARD */}
          <div className="bg-white rounded-t-lg">
            <div className="bg-[#060853]  p-8 rounded-3xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
              <div className="flex justify-between items-center">
                <p className="text-xs text-white mb-2">Current Balance (NGN)</p>
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
                <h2 className="text-4xl font-bold mb-8">$445,456.90</h2>
              )}
              <div className="flex justify-between items-end">
                <span className="text-xs opacity-60">09/08/2024</span>
                <Button
                  size="small"
                  onClick={() => setIsOpen(true)}
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
                    $ 100,000
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
                    $ 800,000
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
            {[
              {
                name: "Adams Sekani",
                date: "May 21 2025",
                amount: "140,000",
                status: "SUCCESS",
                color: "green",
              },
              {
                name: "Adams Sekani",
                date: "May 21 2025",
                amount: "140,000",
                status: "CANCELLED",
                color: "red",
              },
            ].map((item, i) => (
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
                        sekaniadams@gmail.com
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
                      ₦ {item.amount}
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
            <Input placeholder="$100,000,000" className="h-12 bg-gray-50 border-gray-100 rounded-xl" />
          </Form.Item>
          <Form.Item
            name="Payout Amount"
            label={<span className="font-bold text-gray-700">Payout Amount</span>}
          >
            <Input placeholder="Enter Payout Amount" className="h-12 bg-gray-50 border-gray-100 rounded-xl" />
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
            <Input placeholder="$100,000,000" className="h-12 bg-gray-50 border-gray-100 rounded-xl" />
          </Form.Item>

          <Button className="bg-[#060853]! w-full! border-none! text-white! h-10!">Sumit</Button>
        </Form>
      </CustomModal>
    </div>
  );
};

export default WalletPage;
