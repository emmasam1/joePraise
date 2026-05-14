import React from "react";
import { Table } from "antd";

const OrderHistory = () => {
  const orderColumns = [
    {
      title: "Order ID",
      dataIndex: "order_id",
      key: "order_id",
      render: (text) => (
        <span className="font-bold text-[#1e293b]">{text}</span>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <span className="text-gray-500">{text}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span className="text-[#1e293b] capitalize">{status}</span>
      ),
    },
    {
      title: "",
      key: "action",
      render: () => (
        <button className="border-none bg-transparent cursor-pointer">
          <img
            src="/images/dots.png"
            className="w-4 opacity-60"
            alt="actions"
          />
        </button>
      ),
    },
  ];

  const orderData = [
    {
      key: "1",
      order_id: "#10235",
      date: "April 12, 2026",
      amount: "$115",
      status: "Completed",
    },
    {
      key: "2",
      order_id: "#10236",
      date: "April 15, 2026",
      amount: "$250",
      status: "Completed",
    },
    {
      key: "3",
      order_id: "#10237",
      date: "April 18, 2026",
      amount: "$85",
      status: "Completed",
    },
    {
      key: "4",
      order_id: "#10238",
      date: "April 20, 2026",
      amount: "$1,200",
      status: "Completed",
    },
    // Add more rows to test your pagination
    ...Array(6)
      .fill({
        order_id: "#10235",
        date: "April 12, 2026",
        amount: "$115",
        status: "Completed",
      })
      .map((item, i) => ({ ...item, key: i + 5 })),
  ];

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 mb-6"> Order History</h2>

      <div className="">
        {/* RECENT TRANSACTIONS TABLE */}
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          <Table
            columns={orderColumns}
            dataSource={orderData}
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
    </div>
  );
};

export default OrderHistory;
