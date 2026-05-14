"use client";
import React, { useState } from "react";
import { Button, Input, Table, Dropdown } from "antd";
import CustomModal from "@/components/CustomModal";

const page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const statsCard = [
    {
      id: 1,
      title: "Total Subscribers",
      value: "2500",
    },
    {
      id: 2,
      title: "Active Subscribers",
      value: "3500",
    },
    {
      id: 3,
      title: "Expired Subscribers",
      value: "9870",
    },
    {
      id: 4,
      title: "Upcoming Renewals ",
      value: "9870",
    },
  ];

  const columns = [
    {
      title: "",
      render: () => <img src="/images/pen.png" className="w-5" />,
    },
    {
      title: "BUSINESS NAME",
      dataIndex: "businessName",
      key: "businessName",
      render: (text) => (
        <div className="flex items-center gap-4">
          {/* <CheckSquareOutlined className="text-gray-400 text-lg" /> */}
          <span className="font-bold text-[#0F172A]">{text}</span>
        </div>
      ),
    },
    {
      title: "PLAN TYPE",
      dataIndex: "planType",
      key: "planType",
      render: (text) => (
        <span className="text-gray-500 font-medium">{text}</span>
      ),
    },
    {
      title: "RENEWAL DATE",
      dataIndex: "renewalDate",
      key: "renewalDate",
      render: (text) => (
        <span className="text-gray-500 font-medium">{text}</span>
      ),
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let textColor = "";

        // Matching colors from your UI: Active (Green), Expired (Red), Cancelled (Orange)
        if (status === "Active") textColor = "text-[#10B981]";
        if (status === "Expired") textColor = "text-[#EF4444]";
        if (status === "Cancelled") textColor = "text-[#F59E0B]";

        return <span className={`${textColor} font-bold`}>{status}</span>;
      },
    },
    {
      title: "",
      key: "action",
      render: (
        record, // 'record' is the data for the current row
      ) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "1",
                label: (
                  <span className="text-[10px] font-bold py-1 block">
                    Activate Subscription
                  </span>
                ),
                onClick: () => {
                  setSelectedCustomer(record); // Pass the row data to state
                  setIsOpen(true); // Open the modal
                },
              },
              {
                key: "2",
                label: (
                  <span className="text-[10px] font-bold py-1 block">
                    Cancel Subscription
                  </span>
                ),
                onClick: () => {
                  setSelectedCustomer(record); // Pass the row data to state
                  setIsCancelOpen(true); // Open the modal
                },
              },
            ],
          }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Button className="border-none! bg-transparent! outline-0! p-0! flex items-center justify-center h-8 w-8">
            <img src="/images/dots.png" className="w-5" />
          </Button>
        </Dropdown>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      businessName: "Bie's Kitchen",
      planType: "Basic",
      renewalDate: "19/12/2025",
      status: "Active",
    },
    {
      key: "2",
      businessName: "Bie's Kitchen",
      planType: "Basic",
      renewalDate: "19/12/2025",
      status: "Expired",
    },
    {
      key: "3",
      businessName: "Bie's Kitchen",
      planType: "Standard",
      renewalDate: "19/12/2025",
      status: "Active",
    },
    {
      key: "4",
      businessName: "Bie's Kitchen",
      planType: "Basic",
      renewalDate: "19/12/2025",
      status: "Cancelled",
    },
    {
      key: "5",
      businessName: "Bie's Kitchen",
      planType: "Basic",
      renewalDate: "19/12/2025",
      status: "Expired",
    },
    {
      key: "6",
      businessName: "Bie's Kitchen",
      planType: "Standard",
      renewalDate: "19/12/2025",
      status: "Active",
    },
    {
      key: "7",
      businessName: "Bie's Kitchen",
      planType: "Premium",
      renewalDate: "19/12/2025",
      status: "Cancelled",
    },
    {
      key: "8",
      businessName: "Bie's Kitchen",
      planType: "Standard",
      renewalDate: "19/12/2025",
      status: "Expired",
    },
    {
      key: "9",
      businessName: "Bie's Kitchen",
      planType: "Standard",
      renewalDate: "19/12/2025",
      status: "Active",
    },
    {
      key: "10",
      businessName: "Bie's Kitchen",
      planType: "Basic",
      renewalDate: "19/12/2025",
      status: "Cancelled",
    },
  ];

  return (
    <div className="space-y-6 mt-3">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 mt-5">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            Subscription Management
          </h1>
        </div>
        <div className="flex gap-4">
          {/* <RangePicker className="rounded-lg border-gray-200" /> */}
          <Button className="p-4.5! bg-[#060853]! rounded-lg border-none! text-white!">
            <img src="/images/upload.png" alt="export" className="h-7" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-[#E2EDFC] p-4 rounded-sm">
        {statsCard.map((card) => {
          return (
            <div
              key={card.id}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center border-b border-gray-100 pb-2">
                <img src="/images/cube.png" alt="cube" className="h-8" />
                <h3 className="font-bold text-gray-900">{card.title}</h3>
              </div>

              <p className="text-2xl font-bold text-[#060853]">{card.value}</p>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end gap-2">
        <div>
          <Input
            prefix={
              <img src="/images/search.png" alt="search" className="h-7" />
            }
            placeholder="Search"
            className="w-72 rounded-lg bg-gray-50 border border-gray-200 h-10 text-xs"
          />
        </div>

        <Button className="flex items-center justify-center border-gray-200 rounded-lg h-10!  overflow-hidden">
          <img
            src="/images/funnel.png"
            alt="list"
            className="h-8 w-8 object-contain" // Reduce the size of the image relative to the 10x10 button
          />
        </Button>
        <Button className="flex items-center justify-center border-gray-200 rounded-lg h-10!  overflow-hidden">
          <img
            src="/images/grid.png"
            alt="list"
            className="h-8 w-8 object-contain" // Reduce the size of the image relative to the 10x10 button
          />
        </Button>
        <Button className="flex items-center justify-center border-gray-200 rounded-lg h-10! overflow-hidden">
          <img
            src="/images/list.png"
            alt="list"
            className="h-8 w-8 object-contain" // Reduce the size of the image relative to the 10x10 button
          />
        </Button>
      </div>

      <div className="bg-[#f0f5ff] p-8 min-h-screen">
        <h2 className="text-sm font-bold mb-4 text-[#1e293b]">Customer List</h2>

        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          <Table
            columns={columns}
            dataSource={data}
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
              <img src="/images/arrow_left.png" alt="prev" className="h-4" />
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
              <img src="/images/arrow_right.png" alt="next" className="h-4" />
            </button>
          </div>
        </div>
      </div>

      <CustomModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size="max-w-md"
      >
        <div className="flex flex-col gap-5 justify-center items-center">
          <div className="border border-gray-200 rounded-md p-3">
            <img src="/images/mail_checked.png" className="w-20" />
          </div>

          <h1 className="text-[#15BE87] text-2xl font-bold">
            Activate Subscription
          </h1>
          <p className="text-[#4A4A4A] text-sm">
            Are you sure you want to activate this Subscription?
          </p>

          <div className="flex gap-5 items-center">
            <Button className="bg-transparent! border-[#FFC542]! text-[#FFC542]!">
              Cancel
            </Button>
            <Button className="bg-[#060853]! text-white! border-none!">
              Activate
            </Button>
          </div>
        </div>
      </CustomModal>

      <CustomModal
        isOpen={isCancelOpen}
        onClose={() => setIsCancelOpen(false)}
        size="max-w-md"
      >
        <div className="flex flex-col gap-5 justify-center items-center">
          <div className="border border-gray-200 rounded-md p-3">
            <img src="/images/cusion_red.png" className="w-20" />
          </div>

          <h1 className="text-2xl font-bold text-black">Cancel Subscription</h1>
          <p className="text-[#4A4A4A] text-sm text-center">
            Are you sure you want to cancel this Subscription?
            <br />
            This action cannot be undone!
          </p>

          <div className="flex gap-5 items-center">
            <Button className="bg-transparent! border-[#FFC542]! text-[#FFC542]!">
              Cancel
            </Button>
            <Button className="bg-[#870A0A]! text-white! border-none!">
              Cancel Subscription
            </Button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default page;
