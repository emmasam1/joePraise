// "use client";

// import React, { useState } from "react";
// import { Button, Input, Table, Dropdown, message } from "antd";

// import { ShopOutlined, MoreOutlined } from "@ant-design/icons";
// import CustomModal from "@/components/CustomModal";

// const page = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [blkProduct, setBlkProduct] = useState(false);

//   const statusColor = (status) => {
//     switch (status) {
//       case "Active":
//         return "text-green-500 font-medium";

//       case "Inactive":
//         return "text-yellow-500 font-medium";

//       case "Banned":
//         return "text-red-500 font-medium";

//       case "Blocked":
//         return "text-red-600 font-medium";

//       default:
//         return "text-gray-500";
//     }
//   };

//   const [products, setProducts] = useState([
//     {
//       key: 1,
//       business: "YBI Multimedia",
//       category: "Electronics",
//       subCategory: "Mobile Phones",
//       date: "09/12/2025",
//       price: 250,
//       status: "Active",
//     },
//     {
//       key: 2,
//       business: "YBI Multimedia",
//       category: "Electronics",
//       subCategory: "Mobile Phones",
//       date: "15/12/2025",
//       price: 100,
//       status: "Inactive",
//     },
//     {
//       key: 3,
//       business: "YBI Multimedia",
//       category: "Electronics",
//       subCategory: "Mobile Phones",
//       date: "19/12/2025",
//       price: 50,
//       status: "Banned",
//     },
//     {
//       key: 4,
//       business: "YBI Multimedia",
//       category: "Electronics",
//       subCategory: "Tablets",
//       date: "09/12/2025",
//       price: 250,
//       status: "Blocked",
//     },
//   ]);

//   const openModal = (record) => {
//     setSelectedProduct(record);
//     setIsOpen(true);
//   };

//   const blockProduct = (record) => {
//     setSelectedProduct(record);
//     setBlkProduct(true);
//   };

//   const actionMenu = (record) => ({
//     items: [
//       {
//         key: "1",
//         label: "View Product",
//         onClick: () => openModal(record),
//       },
//       {
//         key: "2",
//         label: "Ban Product",
//         danger: true,
//         onClick: () => {
//           message.warning(`${record.business} banned`);
//         },
//       },
//       {
//         key: "3",
//         label: "Block Product",
//         danger: true,
//         onClick: () => blockProduct(record),
//       },
//     ],
//   });

//   const columns = [
//     {
//       title: "BUSINESS NAME",
//       dataIndex: "business",
//       render: (text) => (
//         <div className="flex items-center gap-2 font-semibold">
//           <ShopOutlined />
//           {text}
//         </div>
//       ),
//     },
//     {
//       title: "MAIN CATEGORY",
//       dataIndex: "category",
//     },
//     {
//       title: "SUB CATEGORY",
//       dataIndex: "subCategory",
//     },
//     {
//       title: "DATE LISTED",
//       dataIndex: "date",
//     },
//     {
//       title: "PRICE",
//       dataIndex: "price",
//       render: (price) => `$${price}`,
//     },
//     {
//       title: "STATUS",
//       dataIndex: "status",
//       render: (status) => <span className={statusColor(status)}>{status}</span>,
//     },
//     {
//       title: "ACTION",
//       width: 70,
//       render: (_, record) => (
//         <Dropdown trigger={["click"]} menu={actionMenu(record)}>
//           <Button type="text" icon={<MoreOutlined />} />
//         </Dropdown>
//       ),
//     },
//   ];
//   return (
//     <div className="mt-3 space-y-6 min-h-screen">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">
//             Product Management
//           </h1>
//           <span className="text-[#000000]! text-xs">
//             View Products, reviews and Ratings, block or ban a product.
//           </span>
//         </div>
//         <Button className="p-4.5! bg-[#060853]! rounded-lg border-none! text-white! flex items-center gap-2">
//           <img src="/images/upload.png" alt="export" className="h-5 invert" />
//           Export Report
//         </Button>
//       </div>

//       <div className="bg-[#f0f5ff] p-8 min-h-screen">
//         <div className="flex justify-end gap-2 mb-10">
//           <div>
//             <Input
//               prefix={
//                 <img src="/images/search.png" alt="search" className="h-7" />
//               }
//               placeholder="Search"
//               className="w-72 rounded-lg bg-gray-50 border border-gray-200 h-10 text-xs"
//             />
//           </div>

//           <Button className="flex items-center justify-center border-gray-200 rounded-lg h-10!  overflow-hidden">
//             <img
//               src="/images/funnel.png"
//               alt="list"
//               className="h-8 w-8 object-contain" // Reduce the size of the image relative to the 10x10 button
//             />
//           </Button>
//           {/* <Button className="flex items-center justify-center border-gray-200 rounded-lg h-10!  overflow-hidden">
//             <img
//               src="/images/grid.png"
//               alt="list"
//               className="h-8 w-8 object-contain" // Reduce the size of the image relative to the 10x10 button
//             />
//           </Button>
//           <Button className="flex items-center justify-center border-gray-200 rounded-lg h-10! overflow-hidden">
//             <img
//               src="/images/list.png"
//               alt="list"
//               className="h-8 w-8 object-contain" // Reduce the size of the image relative to the 10x10 button
//             />
//           </Button> */}
//         </div>

//         <Table
//           columns={columns}
//           dataSource={products}
//           //   pagination={{
//           //     pageSize: 8,
//           //   }}
//           pagination={false}
//           className="custom-table"
//           size="small"
//           rowClassName="hover:bg-gray-50 transition-colors"
//         />

//         {/* FOOTER / PAGINATION */}
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
//             <button className="w-8 h-8 flex items-center justify-center rounded bg-white  border border-gray-100 text-gray-400 text-xs">
//               3
//             </button>
//             <button className="w-8 h-8 flex items-center justify-center rounded bg-white  border border-gray-100 text-gray-400 text-xs">
//               4
//             </button>
//             <span className="px-1 text-gray-400">...</span>
//             <button className="w-8 h-8 flex items-center justify-center rounded bg-white  border border-gray-100 text-gray-400 text-xs">
//               10
//             </button>
//             <button className="w-8 h-8 flex items-center justify-center rounded bg-white  border border-gray-100 text-gray-400 text-xs">
//               11
//             </button>
//             <button className="p-2 text-gray-400 hover:text-black">
//               {" "}
//               <img src="/images/arrow_right.png" alt="next" className="h-4" />
//             </button>
//           </div>
//         </div>
//       </div>

//       <CustomModal
//         isOpen={isOpen}
//         onClose={() => {
//           setIsOpen(false);
//           setSelectedProduct(null);
//         }}
//         title={`Product ID: #${selectedProduct?.key}`}
//         size="max-w-3xl"
//       >
//         {selectedProduct && (
//           <div className="bg-white rounded-xl overflow-hidden">
//             {/* Header */}

//             {/* Category */}
//             <div className="bg-[#EAF2FF] flex justify-between items-center px-5 py-3 mt-5 rounded">
//               <div>
//                 <p className="text-[11px] text-gray-500">Category</p>

//                 <p className="font-semibold text-sm text-black">
//                   {selectedProduct.category}
//                 </p>
//               </div>

//               <div className="flex gap-2">
//                 <span
//                   className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                     selectedProduct.status === "Active"
//                       ? "bg-green-100 text-green-600"
//                       : selectedProduct.status === "Inactive"
//                         ? "bg-yellow-100 text-yellow-600"
//                         : "bg-red-100 text-red-600"
//                   }`}
//                 >
//                   {selectedProduct.status}
//                 </span>

//                 <Button size="small">View</Button>
//               </div>
//             </div>

//             {/* Product Image */}
//             <div className="mt-5">
//               <img
//                 src="/images/product-details.jpg"
//                 className="w-full h-[320px] rounded-xl object-cover"
//                 alt=""
//               />
//             </div>

//             {/* Product Details */}
//             <div className="mt-6">
//               <h3 className="font-bold text-black mb-3">Product Details</h3>

//               <p className="text-sm leading-7 text-gray-600">
//                 Beyond Minimal Events, offering bespoke designs for weddings,
//                 anniversaries and milestone celebrations with premium finishing.
//               </p>

//               <div className="flex justify-between items-center mt-5">
//                 <div>
//                   <p className="text-xs text-gray-400">Price</p>

//                   <h2 className="font-bold text-xl text-black">
//                     ${selectedProduct.price}
//                   </h2>
//                 </div>

//                 <span
//                   className={`font-semibold ${
//                     selectedProduct.status === "Active"
//                       ? "text-green-500"
//                       : "text-red-500"
//                   }`}
//                 >
//                   {selectedProduct.status}
//                 </span>
//               </div>
//             </div>

//             {/* Reviews */}
//             <div className="mt-10">
//               <h3 className="font-bold text-black">Customers Reviews</h3>

//               <p className="text-xs text-gray-500 mb-4">
//                 Based on 247 verified reviews
//               </p>

//               <div className="flex gap-10">
//                 <div className="text-center">
//                   <h1 className="text-4xl font-bold">4.9</h1>

//                   <div className="text-yellow-400 text-xl">★★★★★</div>

//                   <p className="text-xs text-gray-500">(128 Reviews)</p>
//                 </div>

//                 <div className="flex-1 space-y-2">
//                   {[5, 4, 3, 2, 1].map((star, index) => (
//                     <div key={star} className="flex items-center gap-3">
//                       <span className="text-xs w-4">{star}</span>

//                       <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
//                         <div
//                           className={`h-full bg-yellow-400 ${
//                             index === 0
//                               ? "w-[85%]"
//                               : index === 1
//                                 ? "w-[40%]"
//                                 : index === 2
//                                   ? "w-[10%]"
//                                   : index === 3
//                                     ? "w-[5%]"
//                                     : "w-[2%]"
//                           }`}
//                         />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Sample Reviews */}
//               <div className="grid grid-cols-2 gap-6 mt-8">
//                 {[1, 2, 3, 4].map((item) => (
//                   <div key={item} className="flex gap-3">
//                     <img
//                       src="/images/avatar.png"
//                       className="w-10 h-10 rounded-full"
//                       alt=""
//                     />

//                     <div>
//                       <h4 className="font-semibold text-sm">Emily Davis</h4>

//                       <div className="text-yellow-400 text-xs">★★★★★</div>

//                       <p className="text-xs text-gray-500 mt-2 leading-5">
//                         Absolutely stunning work! The attention to detail was
//                         incredible and delivery was on time.
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="text-right mt-5">
//                 <Button type="link" className="text-[#060853]">
//                   View More...
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}
//       </CustomModal>

//       <CustomModal
//         isOpen={blkProduct}
//         onClose={() => setBlkProduct(false)}
//         size="max-w-md"
//       >
//         <div className="flex flex-col gap-5 justify-center items-center">
//           <div className="border border-gray-200 rounded-md p-3">
//             <img src="/images/cusion_red.png" className="w-20" />
//           </div>

//           <h1 className="text-2xl font-bold text-black">Block Product</h1>
//           <p className="text-[#4A4A4A] text-sm text-center">
//             Are you sure you want to block this product?
          
//           </p>

//           <div className="flex gap-5 items-center">
//             <Button className="bg-transparent! border-[#FFC542]! text-[#FFC542]!">
//               No
//             </Button>
//             <Button className="bg-[#870A0A]! text-white! border-none!">
//               Yes
//             </Button>
//           </div>
//         </div>
//       </CustomModal>
//     </div>
//   );
// };

// export default page;


"use client";

import React, { useState, useEffect } from "react";
import { Button, Input, Table, Dropdown, message } from "antd";
import { ShopOutlined, MoreOutlined, LoadingOutlined } from "@ant-design/icons";
import CustomModal from "@/components/CustomModal";
import { useProductManagementStore } from "@/store/productManagementStore";

const getStatusInfo = (listing) => {
  if (listing.isBanned) return { label: "Banned", className: "text-red-600 font-medium" };
  if (listing.isBlocked) return { label: "Blocked", className: "text-red-500 font-medium" };
  if (listing.approvalStatus === "pending") return { label: "Pending Review", className: "text-blue-500 font-medium" };
  if (listing.approvalStatus === "rejected") return { label: "Rejected", className: "text-red-400 font-medium" };
  if (listing.listingStatus === "published" && listing.isActive && !listing.isPaused) {
    return { label: "Active", className: "text-green-500 font-medium" };
  }
  return { label: "Inactive", className: "text-yellow-500 font-medium" };
};

const formatPrice = (listing) => {
  if (listing.pricingType === "range") {
    return `$${listing.minPrice ?? 0} - $${listing.maxPrice ?? 0}`;
  }
  if (listing.pricingType === "quote") return "Negotiable";
  return `$${listing.price ?? 0}`;
};

const ProductManagementPage = () => {
  const {
    listings,
    listingsLoading,
    pagination,
    selectedListing,
    selectedListingLoading,
    ratingBreakdown,
    avgRating,
    totalReviews,
    reviews,
    mutating,
    fetchListings,
    fetchListingDetail,
    clearSelectedListing,
    banListing,
    unbanListing,
    blockListing,
    unblockListing,
  } = useProductManagementStore();

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const [confirmModal, setConfirmModal] = useState(null); // { type: "ban" | "block", record }

  useEffect(() => {
    fetchListings({ page, limit: 10, search: searchTerm || undefined });
  }, [page]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setPage(1);
      fetchListings({ page: 1, limit: 10, search: searchTerm || undefined });
    }, 400);
    return () => clearTimeout(delay);
  }, [searchTerm]);

  const openModal = async (record) => {
    setIsOpen(true);
    await fetchListingDetail(record._id);
  };

  const closeModal = () => {
    setIsOpen(false);
    clearSelectedListing();
  };

  const openConfirm = (type, record) => setConfirmModal({ type, record });
  const closeConfirm = () => setConfirmModal(null);

  const handleConfirmAction = async () => {
    if (!confirmModal) return;
    const { type, record } = confirmModal;

    try {
      if (type === "ban") await banListing(record._id, "Violation of platform policy");
      else if (type === "block") await blockListing(record._id, "Temporarily blocked by admin");
      else if (type === "unban") await unbanListing(record._id);
      else if (type === "unblock") await unblockListing(record._id);

      closeConfirm();
      fetchListings({ page, limit: 10, search: searchTerm || undefined });
    } catch {
      // error already surfaced via message in the store
    }
  };

  const actionMenu = (record) => ({
    items: [
      { key: "view", label: "View Product", onClick: () => openModal(record) },
      record.isBanned
        ? { key: "unban", label: "Unban Product", onClick: () => openConfirm("unban", record) }
        : { key: "ban", label: "Ban Product", danger: true, onClick: () => openConfirm("ban", record) },
      record.isBlocked
        ? { key: "unblock", label: "Unblock Product", onClick: () => openConfirm("unblock", record) }
        : { key: "block", label: "Block Product", danger: true, onClick: () => openConfirm("block", record) },
    ],
  });

  const columns = [
    {
      title: "PRODUCT NAME",
      dataIndex: "title",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <img
            src={record.images?.[0]?.url || "/images/no-image.png"}
            alt=""
            className="w-8 h-8 rounded object-cover"
          />
          <span className="font-semibold">{text}</span>
        </div>
      ),
    },
    {
      title: "BUSINESS NAME",
      dataIndex: "business",
      render: (business) => (
        <div className="flex items-center gap-2 font-semibold">
          <ShopOutlined />
          {business?.businessName || "—"}
        </div>
      ),
    },
    {
      title: "MAIN CATEGORY",
      dataIndex: "category",
      render: (category) => category?.name || "—",
    },
    {
      title: "DATE LISTED",
      dataIndex: "createdAt",
      render: (date) => (date ? new Date(date).toLocaleDateString("en-GB") : "—"),
    },
    {
      title: "PRICE",
      dataIndex: "price",
      render: (_, record) => formatPrice(record),
    },
    {
      title: "STATUS",
      render: (_, record) => {
        const { label, className } = getStatusInfo(record);
        return <span className={className}>{label}</span>;
      },
    },
    {
      title: "ACTION",
      width: 70,
      render: (_, record) => (
        <Dropdown trigger={["click"]} menu={actionMenu(record)}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="mt-3 space-y-6 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
          <span className="text-[#000000]! text-xs">
            View products/services, reviews and ratings, block or ban a listing.
          </span>
        </div>
        <Button className="p-4.5! bg-[#060853]! rounded-lg border-none! text-white! flex items-center gap-2">
          <img src="/images/upload.png" alt="export" className="h-5 invert" />
          Export Report
        </Button>
      </div>

      <div className="bg-[#f0f5ff] p-8 min-h-screen">
        <div className="flex justify-end gap-2 mb-10">
          <Input
            prefix={<img src="/images/search.png" alt="search" className="h-7" />}
            placeholder="Search by product name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-72 rounded-lg bg-gray-50 border border-gray-200 h-10 text-xs"
            allowClear
          />
        </div>

        <Table
          columns={columns}
          dataSource={listings}
          rowKey="_id"
          loading={{
            spinning: listingsLoading,
            indicator: <LoadingOutlined style={{ fontSize: 24 }} spin />,
          }}
          pagination={{
            current: pagination.page,
            pageSize: pagination.limit,
            total: pagination.total,
            onChange: (p) => setPage(p),
            showTotal: (total, range) => `Show ${range[0]} to ${range[1]} of ${total} results`,
          }}
          className="custom-table"
          size="small"
          rowClassName="hover:bg-gray-50 transition-colors"
        />
      </div>

      {/* VIEW PRODUCT MODAL */}
      <CustomModal
        isOpen={isOpen}
        onClose={closeModal}
        title={selectedListing ? `Product: ${selectedListing.title}` : "Product Details"}
        size="max-w-3xl"
      >
        {selectedListingLoading ? (
          <div className="flex justify-center py-16">
            <LoadingOutlined style={{ fontSize: 32 }} spin />
          </div>
        ) : selectedListing ? (
          <div className="bg-white rounded-xl overflow-hidden">
            <div className="bg-[#EAF2FF] flex justify-between items-center px-5 py-3 mt-5 rounded">
              <div>
                <p className="text-[11px] text-gray-500">Category</p>
                <p className="font-semibold text-sm text-black">
                  {selectedListing.category?.name || "—"}
                </p>
              </div>

              <div className="flex gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    getStatusInfo(selectedListing).label === "Active"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {getStatusInfo(selectedListing).label}
                </span>
              </div>
            </div>

            <div className="mt-5">
              <img
                src={selectedListing.images?.[0]?.url || "/images/no-image.png"}
                className="w-full h-[320px] rounded-xl object-cover"
                alt=""
              />
            </div>

            <div className="mt-6">
              <h3 className="font-bold text-black mb-3">Product Details</h3>
              <p className="text-sm leading-7 text-gray-600">
                {selectedListing.description || "No description provided."}
              </p>

              <div className="flex justify-between items-center mt-5">
                <div>
                  <p className="text-xs text-gray-400">Price</p>
                  <h2 className="font-bold text-xl text-black">{formatPrice(selectedListing)}</h2>
                </div>
                <span className="font-semibold text-slate-700">
                  Business: {selectedListing.business?.businessName}
                </span>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="font-bold text-black">Customers Reviews</h3>
              <p className="text-xs text-gray-500 mb-4">Based on {totalReviews} verified reviews</p>

              <div className="flex gap-10">
                <div className="text-center">
                  <h1 className="text-4xl font-bold">{avgRating}</h1>
                  <div className="text-yellow-400 text-xl">★★★★★</div>
                  <p className="text-xs text-gray-500">({totalReviews} Reviews)</p>
                </div>

                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = ratingBreakdown?.[star] || 0;
                    const width = totalReviews ? (count / totalReviews) * 100 : 0;
                    return (
                      <div key={star} className="flex items-center gap-3">
                        <span className="text-xs w-4">{star}</span>
                        <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-400" style={{ width: `${width}%` }} />
                        </div>
                        <span className="text-xs text-gray-500 w-6 text-right">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {reviews.length === 0 ? (
                <p className="text-xs text-gray-400 text-center mt-8">No reviews yet.</p>
              ) : (
                <div className="grid grid-cols-2 gap-6 mt-8">
                  {reviews.map((review) => (
                    <div key={review._id} className="flex gap-3">
                      <img
                        src={review.user?.avatar?.url || "/images/avatar.png"}
                        className="w-10 h-10 rounded-full object-cover"
                        alt=""
                      />
                      <div>
                        <h4 className="font-semibold text-sm">{review.user?.name || "Anonymous"}</h4>
                        <div className="text-yellow-400 text-xs">{"★".repeat(review.rating)}</div>
                        <p className="text-xs text-gray-500 mt-2 leading-5">{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </CustomModal>

      {/* BAN/BLOCK CONFIRM MODAL */}
      <CustomModal isOpen={!!confirmModal} onClose={closeConfirm} size="max-w-md">
        <div className="flex flex-col gap-5 justify-center items-center">
          <div className="border border-gray-200 rounded-md p-3">
            <img src="/images/cusion_red.png" className="w-20" alt="" />
          </div>

          <h1 className="text-2xl font-bold text-black capitalize">
            {confirmModal?.type} Product
          </h1>
          <p className="text-[#4A4A4A] text-sm text-center">
            Are you sure you want to {confirmModal?.type} "{confirmModal?.record?.title}"?
          </p>

          <div className="flex gap-5 items-center">
            <Button onClick={closeConfirm} className="bg-transparent! border-[#FFC542]! text-[#FFC542]!">
              No
            </Button>
            <Button
              loading={mutating}
              onClick={handleConfirmAction}
              className="bg-[#870A0A]! text-white! border-none!"
            >
              Yes
            </Button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default ProductManagementPage;