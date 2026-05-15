// "use client";
// import React, { useState } from "react";
// import { Button, Input, Table, Dropdown } from "antd";
// import Link from "next/link";

// const BusinessManagement = () => {

//   const statsCard = [
//     { id: 1, title: "Total Businesses", value: "3,788" },
//     { id: 2, title: "Total Active", value: "1,256" },
//     { id: 3, title: "Total Inactive", value: "1,012" },
//     { id: 4, title: "Suspended Businesses", value: "1,550" },
//   ];

//   const data = [
//     {
//       key: "1",
//       business_name: "Joseph Grace Cleaning",
//       owner_name: "Joseph Grace",
//       location: "New York",
//       date: "09/12/2025",
//       amount: "$250",
//       sub_status: "active",
//       trust_score: "4.5",
//     },
//     {
//       key: "2",
//       business_name: "Josh Plumbing",
//       owner_name: "Lawrance Josh",
//       location: "Texas",
//       date: "15/12/2025",
//       amount: "$100",
//       sub_status: "inactive",
//       trust_score: "4.0",
//     },
//   ];

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case "active":
//         return "#007A55";
//       case "inactive":
//         return "#C70036";
//       default:
//         return "#64748b";
//     }
//   };

//   const columns = [
//     {
//       title: "",
//       width: 50,
//       render: () => (
//         <img
//           src="/images/pen.png"
//           alt="edit"
//           className="w-4 opacity-50 hover:opacity-100 cursor-pointer"
//         />
//       ),
//     },
//     {
//       title: "BUSINESS NAME",
//       dataIndex: "business_name",
//       key: "business_name",
//       render: (text) => (
//         <span className="font-bold text-[#1e293b]">{text}</span>
//       ),
//     },
//     { title: "OWNER NAME", dataIndex: "owner_name", key: "owner_name" },
//     { title: "LOCATION", dataIndex: "location", key: "location" },
//     { title: "DATE", dataIndex: "date", key: "date" },
//     {
//       title: "TRUST SCORE",
//       dataIndex: "trust_score",
//       key: "trust_score",
//       render: (score) => (
//         <span className="flex items-center gap-1">
//           {score}{" "}
//           <img src="/images/trust_star.png" alt="star" className="h-4 w-4" />
//         </span>
//       ),
//     },
//     {
//       title: "SUBSCRIPTION STATUS",
//       dataIndex: "sub_status",
//       key: "sub_status",
//       render: (status) => (
//         <span
//           style={{ color: getStatusColor(status) }}
//           className="font-bold capitalize text-[11px]"
//         >
//           {status}
//         </span>
//       ),
//     },
//     {
//       title: "VERIFICATION",
//       dataIndex: "amount",
//       key: "verification",
//       render: () => (
//         <span className="text-[#15BE87] text-[10px]">Verified</span>
//       ),
//     },
//     {
//       title: "",
//       key: "action",
//       render: (_, record) => {
//         // Defined here so it can use 'record' directly
//         const dropdownItems = [
//           {
//             key: "1",
//             label: (
//              <Link 
//               href={`/admin-dashboard/business-management/${record.key}`}
//               className="text-[10px] font-bold py-1 block"
//             >
//               View Profile
//             </Link>
//             ),
//           },
//           {
//             key: "2",
//             label: (
//               <span className="text-[10px] font-bold py-1 block">
//                 Approve Verification
//               </span>
//             ),
//           },
//           {
//             key: "3",
//             label: (
//               <span className="text-[10px] font-bold py-1 block">
//                 Suspend Business
//               </span>
//             ),
//           },
//         ];

//         return (
//           <Dropdown
//             menu={{ items: dropdownItems }}
//             trigger={["click"]}
//             placement="bottomRight"
//           >
//             <Button className="border-none! bg-transparent! outline-0! p-0! flex items-center justify-center h-8 w-8">
//               <img src="/images/dots.png" className="w-5" alt="dots" />
//             </Button>
//           </Dropdown>
//         );
//       },
//     },
//   ];

//   return (
//     <div className="mt-3 space-y-6 min-h-screen">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-gray-900">
//           Business Management
//         </h1>
//         <Button className="p-4.5! bg-[#060853]! rounded-lg border-none! text-white!">
//           <img src="/images/upload.png" alt="export" className="h-7" />
//           Export Report
//         </Button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-[#E2EDFC] p-6 rounded-xl">
//         {statsCard.map((card) => (
//           <div
//             key={card.id}
//             className="bg-white p-5 rounded-xl shadow-sm border border-blue-50"
//           >
//             <div className="flex items-center gap-3 mb-2 border-b border-gray-50 pb-3">
//               <div className="p-2 bg-blue-50 rounded-lg">
//                 <img src="/images/cube.png" alt="" className="h-5 w-5" />
//               </div>
//               <h3 className="text-sm font-semibold text-gray-600">
//                 {card.title}
//               </h3>
//             </div>
//             <p className="text-2xl font-bold text-[#060853]">{card.value}</p>
//           </div>
//         ))}
//       </div>

//       <div className="flex flex-col md:flex-row justify-end items-end md:items-center gap-4">
//         <div className="flex items-center gap-2 pr-2">
//           <Input
//             prefix={
//               <img src="/images/search.png" alt="search" className="h-7" />
//             }
//             placeholder="Search"
//             className="w-72 rounded-lg bg-gray-50 border border-gray-200 h-10 text-xs"
//           />
//           <Button className="flex items-center justify-center border-gray-200 rounded-lg h-10! overflow-hidden">
//             <img
//               src="/images/funnel.png"
//               alt="filter"
//               className="h-8 w-8 object-contain"
//             />
//           </Button>
//           <Button className="flex items-center justify-center border-gray-200 rounded-lg h-10! overflow-hidden">
//             <img
//               src="/images/grid.png"
//               alt="grid"
//               className="h-8 w-8 object-contain"
//             />
//           </Button>
//           <Button className="flex items-center justify-center border-gray-200 rounded-lg h-10! overflow-hidden">
//             <img
//               src="/images/list.png"
//               alt="list"
//               className="h-8 w-8 object-contain"
//             />
//           </Button>
//         </div>
//       </div>

//       <div className="bg-[#f0f5ff] p-8 min-h-screen">
//         <h2 className="text-sm font-bold mb-4 text-[#1e293b]">Businesses</h2>
//         <div className="bg-white rounded-xl overflow-hidden shadow-sm">
//           <Table
//             columns={columns}
//             dataSource={data}
//             pagination={false}
//             className="custom-table"
//             size="small"
//             rowClassName="hover:bg-gray-50 transition-colors"
//           />
//         </div>

//         <div className="flex items-center justify-between px-6 py-4 mt-5">
//           <span className="text-[11px] text-black">
//             Show 1 to 4 of 20 results
//           </span>
//           <div className="flex items-center gap-1">
//             <button className="p-2 text-gray-400 hover:text-black">
//               <img src="/images/arrow_left.png" alt="prev" className="h-4" />
//             </button>
//             <button className="w-8 h-8 flex items-center justify-center rounded bg-[#060853] text-white text-xs font-bold">
//               1
//             </button>
//             <button className="w-8 h-8 flex items-center justify-center rounded bg-white border border-gray-100 text-gray-400 text-xs">
//               2
//             </button>
//             <button className="w-8 h-8 flex items-center justify-center rounded bg-white border border-gray-100 text-gray-400 text-xs">
//               3
//             </button>
//             <button className="w-8 h-8 flex items-center justify-center rounded bg-white border border-gray-100 text-gray-400 text-xs">
//               4
//             </button>
//             <span className="px-1 text-gray-400">...</span>
//             <button className="w-8 h-8 flex items-center justify-center rounded bg-white border border-gray-100 text-gray-400 text-xs">
//               10
//             </button>
//             <button className="w-8 h-8 flex items-center justify-center rounded bg-white border border-gray-100 text-gray-400 text-xs">
//               11
//             </button>
//             <button className="p-2 text-gray-400 hover:text-black">
//               <img src="/images/arrow_right.png" alt="next" className="h-4" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BusinessManagement;

"use client";

import React, { useEffect } from "react";
import { Button, Input, Table, Dropdown, Spin } from "antd";
import Link from "next/link";
import { useBusinessStore } from "@/store/businessStore";

const BusinessManagement = () => {
  const { businesses, fetchBusinesses, loading } = useBusinessStore();

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const statsCard = [
    { id: 1, title: "Total Businesses", value: "—" },
    { id: 2, title: "Total Active", value: "—" },
    { id: 3, title: "Total Inactive", value: "—" },
    { id: 4, title: "Suspended Businesses", value: "—" },
  ];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "#007A55";
      case "pending":
        return "#E27C3E";
      case "rejected":
        return "#C70036";
      default:
        return "#64748b";
    }
  };

  const columns = [
    {
      title: "",
      width: 50,
      render: () => (
        <img src="/images/pen.png" className="w-4 opacity-50" />
      ),
    },
    {
      title: "BUSINESS NAME",
      dataIndex: "businessName",
      render: (text) => (
        <span className="font-bold text-[#1e293b]">{text}</span>
      ),
    },
    {
      title: "OWNER",
      dataIndex: "owner",
      render: (owner) => owner?.fullName || "—",
    },
    {
      title: "LOCATION",
      render: (_, record) =>
        `${record.businessCity || ""}, ${record.businessCountry || ""}`,
    },
    {
      title: "STATUS",
      dataIndex: "verificationStatus",
      render: (status) => (
        <span style={{ color: getStatusColor(status) }} className="font-bold">
          {status}
        </span>
      ),
    },
    {
      title: "SUBSCRIPTION",
      render: (_, record) =>
        record.subscription?.status || "inactive",
    },
    {
      title: "",
      render: (_, record) => {
        const items = [
          {
            key: "1",
            label: (
              <Link
                href={`/admin-dashboard/business-management/${record._id}`}
              >
                View Profile
              </Link>
            ),
          },
        ];

        return (
          <Dropdown menu={{ items }}>
            <Button>•••</Button>
          </Dropdown>
        );
      },
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="mt-3 space-y-6">
      <h1 className="text-2xl font-bold">Business Management</h1>

      <Table
        dataSource={businesses}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default BusinessManagement;
