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
import React, { useState, useEffect } from "react";
import { Button, Input, Table, Dropdown, message } from "antd";
import Link from "next/link";
import api from "@/api/axios";

const BusinessManagement = () => {
  const [loading, setLoading] = useState(false);
  const [businesses, setBusinesses] = useState([]);
  const [stats, setStats] = useState({
    totalBusinesses: 0,
    totalActive: 0,
    totalInactive: 0,
    suspendedBusinesses: 0,
  });
  
  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchBusinesses = async (page = 1, search = "") => {
    setLoading(true);
    try {
      const response = await api.get("/admin", {
        params: {
          page,
          limit: pagination.pageSize,
          search,
        },
      });
      
      if (response.data.success) {
        setBusinesses(response.data.businesses || []);
        if (response.data.stats) {
          setStats(response.data.stats);
        }
        if (response.data.pagination) {
          setPagination((prev) => ({
            ...prev,
            current: Number(response.data.pagination.page),
            total: response.data.pagination.total,
          }));
        }
      }
    } catch (error) {
      message.error(error.response?.data?.message || "Failed to load businesses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchBusinesses(1, searchQuery);
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleTableChange = (pageObj) => {
    fetchBusinesses(pageObj.current, searchQuery);
  };

  const columns = [
    {
      title: "",
      width: 50,
      render: () => (
        <img
          src="/images/pen.png"
          alt="edit"
          className="w-4 opacity-50 hover:opacity-100 cursor-pointer"
        />
      ),
    },
    {
      title: "BUSINESS NAME",
      dataIndex: "businessName",
      key: "businessName",
      render: (text) => (
        <span className="font-bold text-[#1e293b]">{text || "N/A"}</span>
      ),
    },
    { 
      title: "OWNER NAME", 
      dataIndex: ["owner", "fullName"], 
      key: "owner_name",
      render: (text) => <span>{text || "N/A"}</span>
    },
    { 
      title: "LOCATION", 
      dataIndex: "location", 
      key: "location",
      render: (text) => <span>{text || "N/A"}</span>
    },
    { 
      title: "DATE", 
      dataIndex: "createdAt", 
      key: "createdAt",
      render: (date) => <span>{date ? new Date(date).toLocaleDateString("en-GB") : "N/A"}</span>
    },
    {
      title: "TRUST SCORE",
      dataIndex: "trustScore",
      key: "trustScore",
      render: (score) => (
        <span className="flex items-center gap-1">
          {score !== undefined && score !== null ? score : "0.0"}{" "}
          <img src="/images/trust_star.png" alt="star" className="h-4 w-4" />
        </span>
      ),
    },
    {
      title: "SUBSCRIPTION STATUS",
      dataIndex: "subscriptionStatus",
      key: "subscriptionStatus",
      render: (status) => {
        const normalized = status?.toLowerCase();
        let color = "#64748b";
        if (normalized === "active") color = "#007A55";
        if (normalized === "inactive") color = "#C70036";
        
        return (
          <span style={{ color }} className="font-bold capitalize text-[11px]">
            {status || "unknown"}
          </span>
        );
      },
    },
    {
      title: "VERIFICATION",
      dataIndex: "verificationStatus",
      key: "verification",
      render: (status) => {
        let classes = "text-[#15BE87]"; 
        let display = "Verified";
        
        if (status === "pending") { classes = "text-[#F2994A]"; display = "Pending"; }
        if (status === "cancelled" || status === "rejected") { classes = "text-[#EB5757]"; display = "Cancelled"; }
        if (status === "completed") { classes = "text-[#2F80ED]"; display = "Completed"; }
        
        return <span className={`${classes} text-[10px] font-medium`}>{display}</span>;
      },
    },
    {
      title: "",
      key: "action",
      render: (_, record) => {
        const dropdownItems = [
          {
            key: "1",
            label: (
              <Link 
                href={`/admin-dashboard/business-management/${record._id || record.key}`}
                className="text-[10px] font-bold py-1 block"
              >
                View Profile
              </Link>
            ),
          },
          {
            key: "2",
            label: (
              <span className="text-[10px] font-bold py-1 block">
                Approve Verification
              </span>
            ),
          },
          {
            key: "3",
            label: (
              <span className="text-[10px] font-bold py-1 block">
                Suspend Business
              </span>
            ),
          },
        ];

        return (
          <Dropdown menu={{ items: dropdownItems }} trigger={["click"]} placement="bottomRight">
            <Button className="border-none! bg-transparent! outline-0! p-0! flex items-center justify-center h-8 w-8">
              <img src="/images/dots.png" className="w-5" alt="dots" />
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div className="mt-3 space-y-6 min-h-screen">
      {/* Top Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Business Management
        </h1>
        <Button className="p-4.5! bg-[#060853]! rounded-lg border-none! text-white! flex items-center gap-2">
          <img src="/images/upload.png" alt="export" className="h-5 invert" />
          Export Report
        </Button>
      </div>

      {/* Analytic Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-[#E2EDFC] p-6 rounded-xl">
        {[
          { title: "Total Businesses", value: stats.totalBusinesses.toLocaleString() },
          { title: "Total Active", value: stats.totalActive.toLocaleString() },
          { title: "Total Inactive", value: stats.totalInactive.toLocaleString() },
          { title: "Suspended Businesses", value: stats.suspendedBusinesses.toLocaleString() }
        ].map((card, i) => (
          <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-blue-50">
            <div className="flex items-center gap-3 mb-2 border-b border-gray-50 pb-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <img src="/images/cube.png" alt="" className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-gray-600">{card.title}</h3>
            </div>
            <p className="text-2xl font-bold text-[#060853]">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Action Toolbar */}
      <div className="flex flex-col md:flex-row justify-end items-end md:items-center gap-4">
        <div className="flex items-center gap-2 pr-2">
          <Input
            prefix={<img src="/images/search.png" alt="search" className="h-5" />}
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-72 rounded-lg bg-gray-50 border border-gray-200 h-10 text-xs"
            allowClear
          />
          <Button className="flex items-center justify-center border-gray-200 rounded-lg h-10! w-10 overflow-hidden bg-white">
            <img src="/images/funnel.png" alt="filter" className="h-5 w-5 object-contain" />
          </Button>
          <Button className="flex items-center justify-center border-gray-200 rounded-lg h-10! w-10 overflow-hidden bg-white">
            <img src="/images/grid.png" alt="grid" className="h-5 w-5 object-contain" />
          </Button>
          <Button className="flex items-center justify-center border-gray-200 rounded-lg h-10! w-10 overflow-hidden bg-white">
            <img src="/images/list.png" alt="list" className="h-5 w-5 object-contain" />
          </Button>
        </div>
      </div>

      {/* Main Table Segment Layout */}
      <div className="bg-[#f0f5ff] p-8 rounded-xl">
        <h2 className="text-sm font-bold mb-4 text-[#1e293b]">Businesses</h2>
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          <Table
            columns={columns}
            dataSource={businesses}
            rowKey={(record) => record._id || record.key}
            loading={loading}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: pagination.total,
              showSizeChanger: false,
              position: ["bottomRight"],
              showTotal: (total, range) => `Show ${range[0]} to ${range[1]} of ${total} results`
            }}
            onChange={handleTableChange}
            size="small"
            rowClassName="hover:bg-gray-50 transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessManagement;

