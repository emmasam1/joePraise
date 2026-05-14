"use client";

import React from 'react';
import { Table, Pagination } from 'antd';
import { DislikeOutlined, CheckSquareOutlined } from '@ant-design/icons';

const Response = () => {
  // Stats data for the top header
  const stats = [
    { label: "TOTAL", value: "14" },
    { label: "Pending", value: "16" },
    { label: "AVERAGE RESPONSE TIME", value: "14.5", unit: "/ Min" },
    { label: "RESPONSE RATE", value: "85%" },
  ];

  // Table Data
  const dataSource = [
    { key: '1', complaint: 'Dark mode toggle', date: 'Sep 26, 12:08 AM', resolved: '2026-04-07 11:00' },
    { key: '2', complaint: 'Login failed on iOS 17.4', date: 'Sep 26, 12:08 AM', resolved: '2026-04-07 11:00' },
    { key: '3', complaint: 'App crashes on startup', date: 'Sep 26, 12:08 AM', resolved: '2026-04-07 11:00' },
    { key: '4', complaint: 'App crashes on startup', date: 'Sep 26, 12:08 AM', resolved: '2026-04-07 11:00' },
    { key: '5', complaint: 'In-app purchase not credited', date: 'Sep 26, 12:08 AM', resolved: '2026-04-07 11:00' },
    { key: '6', complaint: 'Login failed on iOS 17.4', date: 'Sep 26, 12:08 AM', resolved: '2026-04-07 11:00' },
    { key: '7', complaint: 'App crashes on startup', date: 'Sep 26, 12:08 AM', resolved: '2026-04-07 11:00' },
  ];

  const columns = [
    {
      title: "",
      render: () => <img src="/images/pen.png" className="w-5" />,
    },
    {
      title: 'COMPLAINT',
      dataIndex: 'complaint',
      key: 'complaint',
      render: (text) => (
        <div className="flex items-center gap-4">
          {/* <CheckSquareOutlined className="text-gray-400 text-lg" /> */}
          <span className="font-bold text-[#0F172A]">{text}</span>
        </div>
      ),
    },
    {
      title: 'DATE/ TIME MADE',
      dataIndex: 'date',
      key: 'date',
      render: (text) => <span className="text-gray-500 font-medium">{text}</span>,
    },
    {
      title: 'DATE/TIME RESOLVED',
      dataIndex: 'resolved',
      key: 'resolved',
      render: (text) => <span className="text-[#10B981] font-bold">{text}</span>,
    },
  ];

  return (
    <div className="mt-8 animate-in fade-in duration-500">
      {/* Top Stats Header */}
      <div className="grid grid-cols-4 gap-8 mb-12 text-center">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col gap-1">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-5xl font-black text-[#0F172A]">{stat.value}</span>
              {stat.unit && <span className="text-lg font-bold text-gray-400">{stat.unit}</span>}
            </div>
            <span className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Complaints Log Section */}
      <div className="flex items-center gap-3 mb-6">
        <img src="/images/thumbsdown.png" className='w-5'/>
        <h2 className="text-xl font-bold text-[#0F172A]">Complaints Log</h2>
      </div>

      <div className="bg-white rounded-xl overflow-hidden border border-gray-50 shadow-sm">
        <Table 
          dataSource={dataSource} 
          columns={columns} 
          pagination={false}
          className="custom-complaint-table"
          rowClassName="hover:bg-gray-50 transition-colors border-b border-gray-50"
        />
      </div>

      {/* Custom Pagination Footer */}
      <div className="mt-8 flex justify-between items-center px-4">
        <span className="text-gray-400 text-xs font-medium">
          Show <span className="text-gray-900">1 to 4</span> of 20 results
        </span>
        <Pagination 
          total={20} 
          pageSize={4} 
          showSizeChanger={false}
          className="complaint-pagination"
        />
      </div>

      <style jsx global>{`
        .custom-complaint-table .ant-table-thead > tr > th {
          background-color: #060853 !important;
          color: white !important;
          font-size: 11px !important;
          font-weight: 800 !important;
          letter-spacing: 0.1em !important;
          padding: 24px !important;
          border-bottom: none !important;
        }
        .custom-complaint-table .ant-table-tbody > tr > td {
          padding: 24px !important;
          border-bottom: 1px solid #F8FAFC !important;
        }
        .complaint-pagination .ant-pagination-item-active {
          background-color: #060853 !important;
          border-color: #060853 !important;
        }
        .complaint-pagination .ant-pagination-item-active a {
          color: white !important;
        }
      `}</style>
    </div>
  );
};

export default Response;