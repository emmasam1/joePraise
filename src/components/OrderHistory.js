
"use client";
import React, { useEffect, useState } from "react";
import { Table, Spin } from "antd";
import dayjs from "dayjs";
import { useCustomerManagementStore } from "@/store/customerManagementStore";

const OrderHistory = ({ customerId }) => {
  const { customerOrders, ordersPagination, ordersLoading, getCustomerOrders } =
    useCustomerManagementStore();

  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    if (customerId) {
      getCustomerOrders(customerId, { page, limit });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId, page]);

  const orderColumns = [
    {
      title: "Order ID",
      dataIndex: "orderNumber",
      key: "orderNumber",
      render: (text) => (
        <span className="font-bold text-[#1e293b]">#{text}</span>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => (
        <span className="text-gray-500">
          {date ? dayjs(date).format("MMMM D, YYYY") : "—"}
        </span>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amountPaidViaStripe",
      key: "amountPaidViaStripe",
      render: (val) => <span className="font-medium">${val ?? 0}</span>,
    },
    {
      title: "Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (status) => (
        <span className="text-[#1e293b] capitalize">{status}</span>
      ),
    },
    {
      title: "",
      key: "action",
      render: () => (
        <button className="border-none bg-transparent cursor-pointer">
          <img src="/images/dots.png" className="w-4 opacity-60" alt="actions" />
        </button>
      ),
    },
  ];

  const dataSource = customerOrders.map((o) => ({ ...o, key: o._id }));

  const totalPages = ordersPagination?.totalPages || 1;

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 mb-6">Order History</h2>

      <div>
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          <Table
            columns={orderColumns}
            dataSource={dataSource}
            pagination={false}
            loading={ordersLoading}
            className="custom-table"
            size="small"
            rowClassName="hover:bg-gray-50 transition-colors"
            locale={{ emptyText: ordersLoading ? " " : "No orders yet" }}
          />
        </div>

        <div className="flex items-center justify-between px-6 py-4 mt-5">
          <span className="text-[11px] text-black">
            {ordersPagination
              ? `Showing ${(ordersPagination.page - 1) * ordersPagination.limit + 1} to ${Math.min(
                  ordersPagination.page * ordersPagination.limit,
                  ordersPagination.total
                )} of ${ordersPagination.total} results`
              : ""}
          </span>

          <div className="flex items-center gap-1">
            <button
              className="p-2 text-gray-400 hover:text-black disabled:opacity-30"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <img src="/images/arrow_left.png" alt="prev" className="h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .slice(0, 6)
              .map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 flex items-center justify-center rounded text-xs font-bold ${
                    p === page
                      ? "bg-[#060853] text-white"
                      : "bg-white border border-gray-100 text-gray-400"
                  }`}
                >
                  {p}
                </button>
              ))}

            <button
              className="p-2 text-gray-400 hover:text-black disabled:opacity-30"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              <img src="/images/arrow_right.png" alt="next" className="h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
