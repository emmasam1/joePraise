// // "use client";

// // import { useState, useEffect } from "react";
// // import { Button, Checkbox, Divider, Input } from "antd";
// // import Link from "next/link";
// // import Loader from "../../components/Loader"
// // import {
// //   DeleteOutlined,
// //   MinusOutlined,
// //   PlusOutlined,
// //   EnvironmentOutlined,
// //   ShoppingCartOutlined,
// //   ArrowLeftOutlined,
// // } from "@ant-design/icons";

// // const { TextArea } = Input;

// // const page = () => {
// //   const [loading, setLoading] = useState(true);
// //   const [openAddress, setOpenAddress] = useState(null);
// //   const initialCart = [
// //     {
// //       id: 1,
// //       businessName: "Aurora Design Studio",
// //       category: "Interior Design & Architecture Consultancy",
// //       logo: "/images/company1.png",
// //       headerColor: "bg-[#E2EDFC]",
// //       footerColor: "bg-[#E2EDFC]",
// //       subtotal: 1278,

// //       products: [
// //         {
// //           id: 1,
// //           image: "/images/product1.png",
// //           name: "Architectural Lighting Kits",
// //           description:
// //             "Pre-configured lighting sets designed to create specific moods using smart-glass technology.",
// //           qty: 1,
// //           price: 150,
// //         },
// //         {
// //           id: 2,
// //           image: "/images/product1.png",
// //           name: "Architectural Lighting Kits",
// //           description:
// //             "Pre-configured lighting sets designed to create specific moods using smart-glass technology.",
// //           qty: 4,
// //           price: 150,
// //         },
// //       ],
// //     },

// //     {
// //       id: 2,
// //       businessName: "Ceramic Limited",
// //       category: "Interior Design & Architecture Consultancy",
// //       logo: "/images/company2.png",
// //       headerColor: "bg-[#E8FFF7]",
// //       footerColor: "bg-[#E8FFF7]",
// //       subtotal: 1278,

// //       deliveryAddress: "344 Garki Expressway, Abuja",

// //       products: [
// //         {
// //           id: 3,
// //           image: "/images/product2.png",
// //           name: "Architectural Lighting Kits",
// //           description:
// //             "Pre-configured lighting sets designed to create specific moods using smart-glass technology.",
// //           qty: 4,
// //           price: 150,
// //         },
// //         {
// //           id: 4,
// //           image: "/images/product3.png",
// //           name: "Architectural Lighting Kits",
// //           description:
// //             "Pre-configured lighting sets designed to create specific moods using smart-glass technology.",
// //           qty: 4,
// //           price: 150,
// //         },
// //       ],
// //     },
// //   ];
// //   const [cartData, setCartData] = useState(initialCart);

// //   useEffect(() => {
// //   const timer = setTimeout(() => {
// //     setLoading(false);
// //   }, 5000); 

// //   return () => clearTimeout(timer);
// // }, []);

// //  if (loading) {
// //     return <Loader />;
// //   }

// //   const increaseQty = (businessId, productId) => {
// //     setCartData((prev) =>
// //       prev.map((business) => {
// //         if (business.id !== businessId) return business;

// //         return {
// //           ...business,
// //           products: business.products.map((product) =>
// //             product.id === productId
// //               ? {
// //                   ...product,
// //                   qty: product.qty + 1,
// //                 }
// //               : product,
// //           ),
// //         };
// //       }),
// //     );
// //   };

// //   const decreaseQty = (businessId, productId) => {
// //     setCartData((prev) =>
// //       prev.map((business) => {
// //         if (business.id !== businessId) return business;

// //         return {
// //           ...business,
// //           products: business.products.map((product) =>
// //             product.id === productId
// //               ? {
// //                   ...product,
// //                   qty: product.qty > 1 ? product.qty - 1 : 1,
// //                 }
// //               : product,
// //           ),
// //         };
// //       }),
// //     );
// //   };

// //   return (
// //     <div className="py-10 px-10 bg-white">
// //       {/* ====================== */}
// //       {/* Page Heading */}
// //       {/* ====================== */}

// //       <h1 className="text-4xl font-bold text-[#1D1D1F]">Your Cart</h1>

// //       <p className="text-gray-500 mt-2 mb-10">
// //         Review your items and proceed to checkout
// //       </p>

// //       {/* ====================== */}
// //       {/* Businesses */}
// //       {/* ====================== */}

// //       <div className="space-y-16">
// //         {initialCart.map((business) => (
// //           <div
// //             key={business.id}
// //             className="rounded-2xl overflow-hidden border border-gray-50 bg-white"
// //           >
// //             {/* ====================== */}
// //             {/* Header */}
// //             {/* ====================== */}

// //             <div
// //               className={`${business.headerColor} flex justify-between items-center p-3 px-3`}
// //             >
// //               <div className="flex items-center gap-5">
// //                 <img
// //                   src={business.logo}
// //                   className="w-16 h-16 rounded-full object-cover"
// //                   alt=""
// //                 />

// //                 <div>
// //                   <h2 className="text-lg font-bold text-black">
// //                     {business.businessName}
// //                   </h2>

// //                   <p className="text-black text-xs mt-1">{business.category}</p>
// //                 </div>
// //               </div>

// //               <div className="text-right">
// //                 <h2 className="text-lg font-bold text-black">
// //                   ${business.subtotal.toLocaleString()}
// //                 </h2>

// //                 <p className="text-black text-xs">
// //                   Subtotal ({business.products.length} items)
// //                 </p>
// //               </div>
// //             </div>

// //             {/* ====================== */}
// //             {/* Products */}
// //             {/* ====================== */}

// //             <div className="p-8 space-y-8">
// //               {business.products.map((product) => (
// //                 <div
// //                   key={product.id}
// //                   className="flex justify-between items-center"
// //                 >
// //                   {/* LEFT */}

// //                   <div className="flex gap-6">
// //                     <img
// //                       src={product.image}
// //                       className="w-25 h-28 rounded-xl object-cover"
// //                       alt=""
// //                     />

// //                     <div>
// //                       <h3 className="font-bold text-black">{product.name}</h3>

// //                       <p className="text-black text-sm max-w-lg leading-7">
// //                         {product.description}
// //                       </p>

// //                       {/* Quantity */}

// //                       <div className="flex items-center gap-5">
// //                         <Button
// //                           onClick={() => decreaseQty(business.id, product.id)}
// //                           className="border-none!"
// //                           icon={<MinusOutlined className="text-black!" />}
// //                         />

// //                         <span className="font-semibold text-black">
// //                           Qty: {product.qty}
// //                         </span>

// //                         <Button
// //                           onClick={() => increaseQty(business.id, product.id)}
// //                           className="border-none!"
// //                           icon={<PlusOutlined className="text-black!" />}
// //                         />

// //                         <span className="font-semibold text-black ml-6">
// //                           ${product.price}
// //                         </span>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* RIGHT */}

// //                   <Button
// //                     danger
// //                     type="text"
// //                     icon={<DeleteOutlined />}
// //                     className="font-bold! text-[#870A0A]!"
// //                   >
// //                     Remove
// //                   </Button>
// //                 </div>
// //               ))}
// //             </div>

// //             {/* ====================== */}
// //             {/* Footer */}
// //             {/* ====================== */}

// //             <div
// //               className={`${business.footerColor} p-6 flex justify-between items-center`}
// //             >
// //               <Checkbox>Include delivery</Checkbox>

// //               {business.deliveryAddress && (
// //                 <div className="relative">
// //                   <div
// //                     onClick={() =>
// //                       setOpenAddress(
// //                         openAddress === business.id ? null : business.id,
// //                       )
// //                     }
// //                     className="flex items-center cursor-pointer"
// //                   >
// //                     <img src="/images/pin_dark.png" className="w-4 mr-3" />

// //                     <p className="text-black text-sm font-semibold">
// //                       {business.deliveryAddress}
// //                     </p>

// //                     <img
// //                       src="/images/arrowdown.png"
// //                       className={`w-5 ml-2 transition-transform ${
// //                         openAddress === business.id ? "rotate-180" : ""
// //                       }`}
// //                     />
// //                   </div>

// //                   {openAddress === business.id && (
// //                     <div
// //                       onClick={(e) => e.stopPropagation()}
// //                       className="absolute top-10 left-0 z-50! w-[340px] bg-white rounded-xl shadow-2xl border border-gray-200 p-5"
// //                     >
// //                       <h3 className="font-bold text-black mb-4">
// //                         Delivery Address
// //                       </h3>

// //                       <div className="space-y-3">
// //                         <div className="border rounded-lg p-3 cursor-pointer hover:border-[#060853]">
// //                           <p className="font-semibold text-sm">Home</p>

// //                           <p className="text-xs text-gray-500 mt-1">
// //                             344 Garki Expressway, Abuja
// //                           </p>
// //                         </div>

// //                         <div className="border rounded-lg p-3 cursor-pointer hover:border-[#060853]">
// //                           <p className="font-semibold text-sm">Office</p>

// //                           <p className="text-xs text-gray-500 mt-1">
// //                             Wuse Zone 5, Abuja
// //                           </p>
// //                         </div>

// //                         <Button
// //                           type="primary"
// //                           className="w-full bg-[#060853] border-none mt-3"
// //                         >
// //                           + Add New Address
// //                         </Button>
// //                       </div>
// //                     </div>
// //                   )}
// //                 </div>
// //               )}

// //               <span className="font-semibold cursor-pointer text-black">
// //                 View Instruction
// //               </span>

// //               <Button
// //                 type="primary"
// //                 size="large"
// //                 className="bg-[#060853]! px-10 h-9! text-sm! rounded-md! border-none flex"
// //               >
// //                 <img src="/images/checkout.png" className="w-5" />
// //                 Checkout {business.businessName} ($
// //                 {business.subtotal.toLocaleString()})
// //               </Button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Order Summary */}
// //       <div className="rounded-2xl border border-gray-100 p-6 mt-10">
// //         <h1 className="text-black font-semibold text-2xl mt-4">
// //           Order Summary
// //         </h1>
// //         <div className="mt-3 border-b border-gray-100 pb-3">
// //           <div className="flex justify-between items-center mb-2">
// //             <p className="text-[#6A7282] text-sm">Aurora Design Studio</p>
// //             <p className="text-black font-extrabold">$1,278.00</p>
// //           </div>
// //           <div className="flex justify-between items-center">
// //             <p className="text-[#6A7282] text-sm">Ceramic Limited</p>
// //             <p className="text-black font-extrabold">$1,278.00</p>
// //           </div>
// //         </div>
// //         <div className="flex justify-between items-center mt-4 mb-5">
// //           <p className="text-[#6A7282] font-bold text-sm">Total</p>
// //           <p className="text-black font-extrabold">$58,278.00</p>
// //         </div>

// //         <div className="mt-15">
// //           <p className="text-black text-sm font-bold mb-2">
// //             Special Instructions
// //           </p>
// //           <TextArea
// //             rows={10}
// //             placeholder="Write a brief of what you want"
// //             className="bg-[#FBFBFB]! placeholder:text-[#D3D5D4]"
// //           />
// //         </div>
// //         <div className="mt-10">
// //           <p className="text-black text-sm font-bold mb-2">Delivery Address</p>
// //           <Input placeholder="Enter Address" className="h-10!" />
// //         </div>

// //         <div className="mt-10 pt-8 border-t border-[#E5E7EB] flex justify-between items-center">
// //           <Button className="font-bold flex px-30! py-4! rounded-sm! hover:border-gray-200! hover:text-black!">
// //             <img src="/images/arrow-left-line.png" alt="" className="w-4" />
// //             Continue Shopping
// //           </Button>

// //           <Link href="/checkout">
// //             <Button className="font-bold flex px-30! bg-[#060853]! py-4! rounded-sm! text-white! hover:border-gray-200! hover:text-white!">
// //               <img src="/images/solar_bag.png" alt="" className="w-4" />
// //               Proceed to Checkout ($6,278.00)
// //             </Button>
// //           </Link>
// //         </div>
// //       </div>

// //       {openAddress && (
// //         <div
// //           className="fixed inset-0 bg-black/30 z-40"
// //           onClick={() => setOpenAddress(null)}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default page;


// "use client";

// import { useState, useEffect, useMemo } from "react";
// import { useRouter } from "next/navigation";
// import { Button, Checkbox, Input, Spin } from "antd";
// import Link from "next/link";
// import {
//   DeleteOutlined,
//   MinusOutlined,
//   PlusOutlined,
//   LoadingOutlined,
//   EditOutlined,
// } from "@ant-design/icons";
// import { useCartStore } from "@/store/cartStore";
// import { useCheckoutStore } from "@/store/checkoutStore";
// import { useAuthStore } from "@/store/authStore";

// const { TextArea } = Input;

// const HEADER_COLORS = ["bg-[#E2EDFC]", "bg-[#E8FFF7]", "bg-[#FFF3E0]", "bg-[#F3E8FF]"];

// const CartPage = () => {
//   const router = useRouter();
//   const {
//     cart,
//     cartLoading,
//     mutatingItemId,
//     fetchCart,
//     updateItemQuantity,
//     updateItemInstructions,
//     removeItem,
//   } = useCartStore();
//   const { setCheckoutSelection } = useCheckoutStore();
//   const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

//   const [openAddress, setOpenAddress] = useState(null);
//   const [businessAddresses, setBusinessAddresses] = useState({});
//   const [checkedItemIds, setCheckedItemIds] = useState(new Set());
//   const [editingInstructionsId, setEditingInstructionsId] = useState(null);
//   const [instructionsDraft, setInstructionsDraft] = useState("");
//   const [globalInstructions, setGlobalInstructions] = useState("");
//   const [globalAddress, setGlobalAddress] = useState("");

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   // Default everything checked once the cart first loads.
//   useEffect(() => {
//     if (cart?.items?.length) {
//       setCheckedItemIds(new Set(cart.items.map((i) => i._id)));
//     }
//   }, [cart?.items?.length]);

//   const businessGroups = useMemo(() => {
//     if (!cart?.items?.length) return [];

//     const map = new Map();

//     for (const item of cart.items) {
//       const businessId = item.business?._id || item.business;
//       if (!map.has(businessId)) {
//         map.set(businessId, {
//           businessId,
//           businessName: item.business?.businessName || "Unknown Business",
//           logo: item.business?.logo?.url || null,
//           items: [],
//         });
//       }
//       map.get(businessId).items.push(item);
//     }

//     return Array.from(map.values());
//   }, [cart?.items]);

//   const getItemLineTotal = (item) => (item.priceAtTimeOfAdding || 0) * (item.quantity || 1);

//   const getBusinessSubtotal = (group) =>
//     group.items.reduce((sum, item) => sum + getItemLineTotal(item), 0);

//   const getBusinessCheckedSubtotal = (group) =>
//     group.items
//       .filter((i) => checkedItemIds.has(i._id))
//       .reduce((sum, item) => sum + getItemLineTotal(item), 0);

//   const getBusinessCheckedCount = (group) =>
//     group.items.filter((i) => checkedItemIds.has(i._id)).length;

//   const allChecked = cart?.items?.length > 0 && checkedItemIds.size === cart.items.length;
//   const someChecked = checkedItemIds.size > 0 && !allChecked;

//   const selectedTotal = useMemo(() => {
//     if (!cart?.items?.length) return 0;
//     return cart.items
//       .filter((i) => checkedItemIds.has(i._id))
//       .reduce((sum, item) => sum + getItemLineTotal(item), 0);
//   }, [cart?.items, checkedItemIds]);

//   const toggleItemChecked = (itemId) => {
//     setCheckedItemIds((prev) => {
//       const next = new Set(prev);
//       if (next.has(itemId)) next.delete(itemId);
//       else next.add(itemId);
//       return next;
//     });
//   };

//   const toggleBusinessChecked = (group, checked) => {
//     setCheckedItemIds((prev) => {
//       const next = new Set(prev);
//       group.items.forEach((item) => {
//         if (checked) next.add(item._id);
//         else next.delete(item._id);
//       });
//       return next;
//     });
//   };

//   const toggleSelectAll = (checked) => {
//     if (checked) {
//       setCheckedItemIds(new Set(cart.items.map((i) => i._id)));
//     } else {
//       setCheckedItemIds(new Set());
//     }
//   };

//   const handleIncrease = (item) => {
//     if (item.type === "digital_product") return;
//     updateItemQuantity(item._id, (item.quantity || 1) + 1);
//   };

//   const handleDecrease = (item) => {
//     if (item.type === "digital_product") return;
//     const nextQty = (item.quantity || 1) - 1;
//     if (nextQty < 1) return;
//     updateItemQuantity(item._id, nextQty);
//   };

//   const startEditingInstructions = (item) => {
//     setEditingInstructionsId(item._id);
//     setInstructionsDraft(item.instructions || "");
//   };

//   const saveInstructions = async (itemId) => {
//     await updateItemInstructions(itemId, instructionsDraft);
//     setEditingInstructionsId(null);
//   };

//   const requireAuthThenGo = (destinationBuilder) => {
//     if (!isAuthenticated) {
//       router.push(`/login?redirect=${encodeURIComponent("/checkout")}`);
//       return;
//     }
//     destinationBuilder();
//   };

//   // Shortcut: check out only this business's items, ignoring current
//   // checkbox state elsewhere — a one-click convenience.
//   const handleCheckoutBusinessOnly = (group) => {
//     requireAuthThenGo(() => {
//       const itemIds = group.items.map((i) => i._id);
//       setCheckoutSelection(itemIds, group.businessId);
//       router.push("/checkout");
//     });
//   };

//   // Main flow: checkout whatever is currently checked, across any number
//   // of businesses — covers "mixed selection", "whole business via its
//   // checkbox", and "everything via Select All" in one code path.
//   const handleProceedToCheckout = () => {
//     if (checkedItemIds.size === 0) return;

//     requireAuthThenGo(() => {
//       setCheckoutSelection(Array.from(checkedItemIds), null);
//       router.push("/checkout");
//     });
//   };

//   const businessSummaries = businessGroups.map((group) => ({
//     businessId: group.businessId,
//     businessName: group.businessName,
//     subtotal: getBusinessSubtotal(group),
//   }));

//   if (cartLoading && !cart) {
//     return (
//       <div className="min-h-[60vh] flex items-center justify-center">
//         <Spin indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />} />
//       </div>
//     );
//   }

//   const isEmpty = !cart?.items?.length;

//   return (
//     <div className="py-10 px-4 md:px-10 bg-white min-h-screen">
//       <div className="flex flex-wrap items-center justify-between gap-4">
//         <div>
//           <h1 className="text-4xl font-bold text-[#1D1D1F]">Your Cart</h1>
//           <p className="text-gray-500 mt-2">
//             Review your items and proceed to checkout
//           </p>
//         </div>

//         {!isEmpty && (
//           <Checkbox
//             checked={allChecked}
//             indeterminate={someChecked}
//             onChange={(e) => toggleSelectAll(e.target.checked)}
//             className="font-semibold"
//           >
//             Select All ({cart.items.length} items)
//           </Checkbox>
//         )}
//       </div>

//       {isEmpty ? (
//         <div className="flex flex-col items-center justify-center py-24 text-center">
//           <img src="/images/no-image.png" alt="Empty cart" className="w-24 h-24 opacity-40 mb-4" />
//           <p className="text-lg font-semibold text-gray-500">Your cart is empty</p>
//           <p className="text-sm text-gray-400 mt-1 mb-6">
//             Browse businesses and add items to get started.
//           </p>
//           <Link href="/">
//             <Button type="primary" className="bg-[#060853]! border-none!">
//               Continue Shopping
//             </Button>
//           </Link>
//         </div>
//       ) : (
//         <>
//           <div className="space-y-16 mt-10">
//             {businessGroups.map((group, groupIndex) => {
//               const subtotal = getBusinessSubtotal(group);
//               const checkedSubtotal = getBusinessCheckedSubtotal(group);
//               const checkedCount = getBusinessCheckedCount(group);
//               const businessAllChecked = checkedCount === group.items.length;
//               const businessSomeChecked = checkedCount > 0 && !businessAllChecked;
//               const headerColor = HEADER_COLORS[groupIndex % HEADER_COLORS.length];

//               return (
//                 <div
//                   key={group.businessId}
//                   className="rounded-2xl overflow-hidden border border-gray-100 bg-white"
//                 >
//                   {/* Header */}
//                   <div className={`${headerColor} flex flex-wrap gap-4 justify-between items-center p-3 px-4`}>
//                     <div className="flex items-center gap-4">
//                       <Checkbox
//                         checked={businessAllChecked}
//                         indeterminate={businessSomeChecked}
//                         onChange={(e) => toggleBusinessChecked(group, e.target.checked)}
//                       />

//                       <img
//                         src={group.logo || "/images/no-image.png"}
//                         className="w-16 h-16 rounded-full object-cover bg-white"
//                         alt=""
//                       />
//                       <div>
//                         <h2 className="text-lg font-bold text-black">{group.businessName}</h2>
//                       </div>
//                     </div>

//                     <div className="text-right">
//                       <h2 className="text-lg font-bold text-black">
//                         ${subtotal.toLocaleString()}
//                       </h2>
//                       <p className="text-black text-xs">
//                         Subtotal ({group.items.length} item{group.items.length !== 1 ? "s" : ""})
//                       </p>
//                     </div>
//                   </div>

//                   {/* Items */}
//                   <div className="p-6 md:p-8 space-y-8">
//                     {group.items.map((item) => {
//                       const listing = item.listing || item.service;
//                       const imageUrl = listing?.images?.[0]?.url || "/images/no-image.png";
//                       const isMutating = mutatingItemId === item._id;
//                       const isEditingInstructions = editingInstructionsId === item._id;

//                       return (
//                         <div
//                           key={item._id}
//                           className="flex flex-col sm:flex-row justify-between gap-4 sm:items-start"
//                         >
//                           <div className="flex gap-4">
//                             <Checkbox
//                               checked={checkedItemIds.has(item._id)}
//                               onChange={() => toggleItemChecked(item._id)}
//                               className="mt-1"
//                             />

//                             <img
//                               src={imageUrl}
//                               className="w-24 h-28 rounded-xl object-cover shrink-0"
//                               alt=""
//                             />

//                             <div className="flex-1">
//                               <h3 className="font-bold text-black">{item.title}</h3>

//                               {item.type === "service" && (item.bookingDate || item.bookingTime) && (
//                                 <p className="text-xs text-gray-500 mt-1">
//                                   {item.bookingDate ? new Date(item.bookingDate).toLocaleDateString() : ""}
//                                   {item.bookingTime ? ` at ${item.bookingTime}` : ""}
//                                 </p>
//                               )}

//                               {isEditingInstructions ? (
//                                 <div className="mt-2 max-w-md">
//                                   <TextArea
//                                     rows={3}
//                                     value={instructionsDraft}
//                                     onChange={(e) => setInstructionsDraft(e.target.value)}
//                                     placeholder="Write a brief of what you want"
//                                   />
//                                   <div className="flex gap-2 mt-2">
//                                     <Button
//                                       size="small"
//                                       type="primary"
//                                       loading={isMutating}
//                                       onClick={() => saveInstructions(item._id)}
//                                       className="bg-[#060853]! border-none!"
//                                     >
//                                       Save
//                                     </Button>
//                                     <Button size="small" onClick={() => setEditingInstructionsId(null)}>
//                                       Cancel
//                                     </Button>
//                                   </div>
//                                 </div>
//                               ) : (
//                                 <div className="flex items-start gap-2 mt-1">
//                                   <p className="text-black text-sm max-w-lg leading-6">
//                                     {item.instructions || (
//                                       <span className="text-gray-400 italic">No instructions added</span>
//                                     )}
//                                   </p>
//                                   <button
//                                     onClick={() => startEditingInstructions(item)}
//                                     className="text-gray-400 hover:text-[#060853] shrink-0"
//                                   >
//                                     <EditOutlined className="text-xs" />
//                                   </button>
//                                 </div>
//                               )}

//                               <div className="flex items-center gap-3 mt-3 flex-wrap">
//                                 {item.type !== "digital_product" ? (
//                                   <>
//                                     <Button
//                                       onClick={() => handleDecrease(item)}
//                                       disabled={isMutating || item.quantity <= 1}
//                                       className="border-none!"
//                                       icon={<MinusOutlined className="text-black!" />}
//                                     />
//                                     <span className="font-semibold text-black min-w-[70px] text-center">
//                                       {isMutating ? <LoadingOutlined spin /> : `Qty: ${item.quantity}`}
//                                     </span>
//                                     <Button
//                                       onClick={() => handleIncrease(item)}
//                                       disabled={isMutating}
//                                       className="border-none!"
//                                       icon={<PlusOutlined className="text-black!" />}
//                                     />
//                                   </>
//                                 ) : (
//                                   <span className="text-xs text-gray-400 font-medium">Digital — Qty 1</span>
//                                 )}

//                                 <span className="font-semibold text-black ml-2">
//                                   ${item.priceAtTimeOfAdding}
//                                 </span>
//                               </div>
//                             </div>
//                           </div>

//                           <Button
//                             danger
//                             type="text"
//                             loading={isMutating}
//                             onClick={() => removeItem(item._id)}
//                             icon={<DeleteOutlined />}
//                             className="font-bold! text-[#870A0A]! self-start"
//                           >
//                             Remove
//                           </Button>
//                         </div>
//                       );
//                     })}
//                   </div>

//                   {/* Footer */}
//                   <div className={`${headerColor} p-6 flex flex-wrap gap-4 justify-between items-center`}>
//                     <div className="relative">
//                       <div
//                         onClick={() =>
//                           setOpenAddress(openAddress === group.businessId ? null : group.businessId)
//                         }
//                         className="flex items-center cursor-pointer"
//                       >
//                         <img src="/images/pin_dark.png" className="w-4 mr-2" alt="" />
//                         <p className="text-black text-sm font-semibold">
//                           {businessAddresses[group.businessId] || "Add delivery address"}
//                         </p>
//                       </div>

//                       {openAddress === group.businessId && (
//                         <div
//                           onClick={(e) => e.stopPropagation()}
//                           className="absolute top-10 left-0 z-50 w-[320px] bg-white rounded-xl shadow-2xl border border-gray-200 p-5"
//                         >
//                           <h3 className="font-bold text-black mb-3 text-sm">Delivery Address</h3>
//                           <Input
//                             placeholder="Enter delivery address"
//                             defaultValue={businessAddresses[group.businessId] || ""}
//                             onPressEnter={(e) => {
//                               setBusinessAddresses((prev) => ({
//                                 ...prev,
//                                 [group.businessId]: e.target.value,
//                               }));
//                               setOpenAddress(null);
//                             }}
//                           />
//                           <p className="text-[10px] text-gray-400 mt-2">Press Enter to save</p>
//                         </div>
//                       )}
//                     </div>

//                     <Button
//                       type="primary"
//                       size="large"
//                       disabled={checkedCount === 0}
//                       onClick={() => handleCheckoutBusinessOnly(group)}
//                       className="bg-[#060853]! px-8 h-9! text-sm! rounded-md! border-none"
//                     >
//                       Checkout {group.businessName} (${subtotal.toLocaleString()})
//                     </Button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Order Summary */}
//           <div className="rounded-2xl border border-gray-100 p-6 mt-10">
//             <h2 className="text-black font-semibold text-2xl">Order Summary</h2>

//             <div className="mt-4 border-b border-gray-100 pb-3">
//               {businessSummaries.map((b) => (
//                 <div key={b.businessId} className="flex justify-between items-center mb-2">
//                   <p className="text-[#6A7282] text-sm">{b.businessName}</p>
//                   <p className="text-black font-extrabold">${b.subtotal.toLocaleString()}</p>
//                 </div>
//               ))}
//             </div>

//             <div className="flex justify-between items-center mt-4 mb-5">
//               <p className="text-[#6A7282] font-bold text-sm">
//                 Selected Total ({checkedItemIds.size} item{checkedItemIds.size !== 1 ? "s" : ""})
//               </p>
//               <p className="text-black font-extrabold">${selectedTotal.toLocaleString()}</p>
//             </div>

//             <div className="mt-10">
//               <p className="text-black text-sm font-bold mb-2">Special Instructions</p>
//               <TextArea
//                 rows={5}
//                 value={globalInstructions}
//                 onChange={(e) => setGlobalInstructions(e.target.value)}
//                 placeholder="Write a brief of what you want"
//                 className="bg-[#FBFBFB]!"
//               />
//             </div>

//             <div className="mt-6">
//               <p className="text-black text-sm font-bold mb-2">Delivery Address</p>
//               <Input
//                 placeholder="Enter Address"
//                 value={globalAddress}
//                 onChange={(e) => setGlobalAddress(e.target.value)}
//                 className="h-10!"
//               />
//             </div>

//             <div className="mt-10 pt-8 border-t border-[#E5E7EB] flex flex-col sm:flex-row justify-between items-center gap-4">
//               <Link href="/">
//                 <Button className="font-bold flex px-10 py-4! rounded-sm!">
//                   Continue Shopping
//                 </Button>
//               </Link>

//               <Button
//                 disabled={checkedItemIds.size === 0}
//                 onClick={handleProceedToCheckout}
//                 className="font-bold flex px-10 bg-[#060853]! py-4! rounded-sm! text-white!"
//               >
//                 {allChecked ? "Checkout All Items" : "Proceed to Checkout"} ({checkedItemIds.size} item
//                 {checkedItemIds.size !== 1 ? "s" : ""} — ${selectedTotal.toLocaleString()})
//               </Button>
//             </div>
//           </div>
//         </>
//       )}

//       {openAddress && (
//         <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setOpenAddress(null)} />
//       )}
//     </div>
//   );
// };

// export default CartPage;

"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button, Checkbox, Input, Spin } from "antd";
import Link from "next/link";
import {
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined,
  LoadingOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useCartStore } from "@/store/cartStore";
import { useCheckoutStore } from "@/store/checkoutStore";
import { useAuthStore } from "@/store/authStore";

const { TextArea } = Input;

const HEADER_COLORS = ["bg-[#E2EDFC]", "bg-[#E8FFF7]", "bg-[#FFF3E0]", "bg-[#F3E8FF]"];

const CartPage = () => {
  const router = useRouter();
  const {
    cart,
    cartLoading,
    mutatingItemId,
    fetchCart,
    updateItemQuantity,
    updateItemInstructions,
    removeItem,
  } = useCartStore();
  const { setCheckoutSelection } = useCheckoutStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [openAddress, setOpenAddress] = useState(null);
  const [businessAddresses, setBusinessAddresses] = useState({});
  const [checkedItemIds, setCheckedItemIds] = useState(new Set());
  const [editingInstructionsId, setEditingInstructionsId] = useState(null);
  const [instructionsDraft, setInstructionsDraft] = useState("");
  const [globalInstructions, setGlobalInstructions] = useState("");
  const [globalAddress, setGlobalAddress] = useState("");

  useEffect(() => {
    fetchCart();
  }, []);

  // Default everything checked once the cart first loads.
  useEffect(() => {
    if (cart?.items?.length) {
      setCheckedItemIds(new Set(cart.items.map((i) => i._id)));
    }
  }, [cart?.items?.length]);

  const businessGroups = useMemo(() => {
    if (!cart?.items?.length) return [];

    const map = new Map();

    for (const item of cart.items) {
      const businessId = item.business?._id || item.business;
      if (!map.has(businessId)) {
        map.set(businessId, {
          businessId,
          businessName: item.business?.businessName || "Unknown Business",
          logo:
            (typeof item.business?.logo === "string"
              ? item.business.logo
              : item.business?.logo?.url) || null,
          items: [],
        });
      }
      map.get(businessId).items.push(item);
    }

    return Array.from(map.values());
  }, [cart?.items]);

  const getItemLineTotal = (item) => (item.priceAtTimeOfAdding || 0) * (item.quantity || 1);

  const getBusinessSubtotal = (group) =>
    group.items.reduce((sum, item) => sum + getItemLineTotal(item), 0);

  const getBusinessCheckedSubtotal = (group) =>
    group.items
      .filter((i) => checkedItemIds.has(i._id))
      .reduce((sum, item) => sum + getItemLineTotal(item), 0);

  const getBusinessCheckedCount = (group) =>
    group.items.filter((i) => checkedItemIds.has(i._id)).length;

  const allChecked = cart?.items?.length > 0 && checkedItemIds.size === cart.items.length;
  const someChecked = checkedItemIds.size > 0 && !allChecked;

  const selectedTotal = useMemo(() => {
    if (!cart?.items?.length) return 0;
    return cart.items
      .filter((i) => checkedItemIds.has(i._id))
      .reduce((sum, item) => sum + getItemLineTotal(item), 0);
  }, [cart?.items, checkedItemIds]);

  const toggleItemChecked = (itemId) => {
    setCheckedItemIds((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) next.delete(itemId);
      else next.add(itemId);
      return next;
    });
  };

  const toggleBusinessChecked = (group, checked) => {
    setCheckedItemIds((prev) => {
      const next = new Set(prev);
      group.items.forEach((item) => {
        if (checked) next.add(item._id);
        else next.delete(item._id);
      });
      return next;
    });
  };

  const toggleSelectAll = (checked) => {
    if (checked) {
      setCheckedItemIds(new Set(cart.items.map((i) => i._id)));
    } else {
      setCheckedItemIds(new Set());
    }
  };

  const handleIncrease = (item) => {
    if (item.type !== "physical_product") return;
    updateItemQuantity(item._id, (item.quantity || 1) + 1);
  };

  const handleDecrease = (item) => {
    if (item.type !== "physical_product") return;
    const nextQty = (item.quantity || 1) - 1;
    if (nextQty < 1) return;
    updateItemQuantity(item._id, nextQty);
  };

  const startEditingInstructions = (item) => {
    setEditingInstructionsId(item._id);
    setInstructionsDraft(item.instructions || "");
  };

  const saveInstructions = async (itemId) => {
    await updateItemInstructions(itemId, instructionsDraft);
    setEditingInstructionsId(null);
  };

  const requireAuthThenGo = (destinationBuilder) => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=${encodeURIComponent("/cart")}`);
      return;
    }
    destinationBuilder();
  };

  // Shortcut: check out only this business's items, ignoring current
  // checkbox state elsewhere — a one-click convenience.
  const handleCheckoutBusinessOnly = (group) => {
    requireAuthThenGo(() => {
      const itemIds = group.items.map((i) => i._id);
      setCheckoutSelection(itemIds, group.businessId);
      router.push("/checkout");
    });
  };

  // Main flow: checkout whatever is currently checked, across any number
  // of businesses — covers "mixed selection", "whole business via its
  // checkbox", and "everything via Select All" in one code path.
  const handleProceedToCheckout = () => {
    if (checkedItemIds.size === 0) return;

    requireAuthThenGo(() => {
      setCheckoutSelection(Array.from(checkedItemIds), null);
      router.push("/checkout");
    });
  };

  const businessSummaries = businessGroups.map((group) => ({
    businessId: group.businessId,
    businessName: group.businessName,
    subtotal: getBusinessSubtotal(group),
  }));

  if (cartLoading && !cart) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />} />
      </div>
    );
  }

  const isEmpty = !cart?.items?.length;

  return (
    <div className="py-10 px-4 md:px-10 bg-white min-h-screen">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-[#1D1D1F]">Your Cart</h1>
          <p className="text-gray-500 mt-2">
            Review your items and proceed to checkout
          </p>
        </div>

        {!isEmpty && (
          <Checkbox
            checked={allChecked}
            indeterminate={someChecked}
            onChange={(e) => toggleSelectAll(e.target.checked)}
            className="font-semibold"
          >
            Select All ({cart.items.length} items)
          </Checkbox>
        )}
      </div>

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <img src="/images/no_order.png" alt="Empty cart" className="w-24 h-24 opacity-40 mb-4" />
          <p className="text-lg font-semibold text-gray-500">Your cart is empty</p>
          <p className="text-sm text-gray-400 mt-1 mb-6">
            Browse businesses and add items to get started.
          </p>
          <Link href="/">
            <Button type="primary" className="bg-[#060853]! border-none!">
              Continue Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-16 mt-10">
            {businessGroups.map((group, groupIndex) => {
              const subtotal = getBusinessSubtotal(group);
              const checkedSubtotal = getBusinessCheckedSubtotal(group);
              const checkedCount = getBusinessCheckedCount(group);
              const businessAllChecked = checkedCount === group.items.length;
              const businessSomeChecked = checkedCount > 0 && !businessAllChecked;
              const headerColor = HEADER_COLORS[groupIndex % HEADER_COLORS.length];

              return (
                <div
                  key={group.businessId}
                  className="rounded-2xl overflow-hidden border border-gray-100 bg-white"
                >
                  {/* Header */}
                  <div className={`${headerColor} flex flex-wrap gap-4 justify-between items-center p-3 px-4`}>
                    <div className="flex items-center gap-4">
                      <Checkbox
                        checked={businessAllChecked}
                        indeterminate={businessSomeChecked}
                        onChange={(e) => toggleBusinessChecked(group, e.target.checked)}
                      />

                      <img
                        src={group.logo || "/images/business.png"}
                        className="w-16 h-16 rounded-full object-cover bg-white"
                        alt=""
                      />
                      <div>
                        <h2 className="text-lg font-bold text-black">{group.businessName}</h2>
                      </div>
                    </div>

                    <div className="text-right">
                      <h2 className="text-lg font-bold text-black">
                        ${subtotal.toLocaleString()}
                      </h2>
                      <p className="text-black text-xs">
                        Subtotal ({group.items.length} item{group.items.length !== 1 ? "s" : ""})
                      </p>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="p-6 md:p-8 space-y-8">
                    {group.items.map((item) => {
                      const listing = item.listing || item.service;
                      const firstImage = listing?.images?.[0];
                      const imageUrl =
                        (typeof firstImage === "string" ? firstImage : firstImage?.url) ||
                        "/images/product.png";
                      const isMutating = mutatingItemId === item._id;
                      const isEditingInstructions = editingInstructionsId === item._id;

                      return (
                        <div
                          key={item._id}
                          className="flex flex-col sm:flex-row justify-between gap-4 sm:items-start"
                        >
                          <div className="flex gap-4">
                            <Checkbox
                              checked={checkedItemIds.has(item._id)}
                              onChange={() => toggleItemChecked(item._id)}
                              className="mt-1"
                            />

                            <img
                              src={imageUrl}
                              className="w-24 h-28 rounded-xl object-cover shrink-0"
                              alt=""
                            />

                            <div className="flex-1">
                              <h3 className="font-bold text-black">{item.title}</h3>

                              {item.type === "service" && (item.bookingDate || item.bookingTime) && (
                                <p className="text-xs text-gray-500 mt-1">
                                  {item.bookingDate ? new Date(item.bookingDate).toLocaleDateString() : ""}
                                  {item.bookingTime ? ` at ${item.bookingTime}` : ""}
                                </p>
                              )}

                              {isEditingInstructions ? (
                                <div className="mt-2 max-w-md">
                                  <TextArea
                                    rows={3}
                                    value={instructionsDraft}
                                    onChange={(e) => setInstructionsDraft(e.target.value)}
                                    placeholder="Write a brief of what you want"
                                  />
                                  <div className="flex gap-2 mt-2">
                                    <Button
                                      size="small"
                                      type="primary"
                                      loading={isMutating}
                                      onClick={() => saveInstructions(item._id)}
                                      className="bg-[#060853]! border-none!"
                                    >
                                      Save
                                    </Button>
                                    <Button size="small" onClick={() => setEditingInstructionsId(null)}>
                                      Cancel
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-start gap-2 mt-1">
                                  <p className="text-black text-sm max-w-lg leading-6">
                                    {item.instructions || (
                                      <span className="text-gray-400 italic">No instructions added</span>
                                    )}
                                  </p>
                                  <button
                                    onClick={() => startEditingInstructions(item)}
                                    className="text-gray-400 hover:text-[#060853] shrink-0"
                                  >
                                    <EditOutlined className="text-xs" />
                                  </button>
                                </div>
                              )}

                              <div className="flex items-center gap-3 mt-3 flex-wrap">
                                {item.type === "physical_product" ? (
                                  <>
                                    <Button
                                      onClick={() => handleDecrease(item)}
                                      disabled={isMutating || item.quantity <= 1}
                                      className="border-none!"
                                      icon={<MinusOutlined className="text-black!" />}
                                    />
                                    <span className="font-semibold text-black min-w-[70px] text-center">
                                      {isMutating ? <LoadingOutlined spin /> : `Qty: ${item.quantity}`}
                                    </span>
                                    <Button
                                      onClick={() => handleIncrease(item)}
                                      disabled={isMutating}
                                      className="border-none!"
                                      icon={<PlusOutlined className="text-black!" />}
                                    />
                                  </>
                                ) : item.type === "digital_product" ? (
                                  <span className="text-xs text-gray-400 font-medium">Digital — Qty 1</span>
                                ) : (
                                  <span className="text-xs text-gray-400 font-medium">Service booking — Qty 1</span>
                                )}

                                <span className="font-semibold text-black ml-2">
                                  ${item.priceAtTimeOfAdding}
                                </span>
                              </div>
                            </div>
                          </div>

                          <Button
                            danger
                            type="text"
                            loading={isMutating}
                            onClick={() => removeItem(item._id)}
                            icon={<DeleteOutlined />}
                            className="font-bold! text-[#870A0A]! self-start"
                          >
                            Remove
                          </Button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Footer */}
                  <div className={`${headerColor} p-6 flex flex-wrap gap-4 justify-between items-center`}>
                    <div className="relative">
                      <div
                        onClick={() =>
                          setOpenAddress(openAddress === group.businessId ? null : group.businessId)
                        }
                        className="flex items-center cursor-pointer"
                      >
                        <img src="/images/pin_dark.png" className="w-4 mr-2" alt="" />
                        <p className="text-black text-sm font-semibold">
                          {businessAddresses[group.businessId] || "Add delivery address"}
                        </p>
                      </div>

                      {openAddress === group.businessId && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="absolute top-10 left-0 z-50 w-[320px] bg-white rounded-xl shadow-2xl border border-gray-200 p-5"
                        >
                          <h3 className="font-bold text-black mb-3 text-sm">Delivery Address</h3>
                          <Input
                            placeholder="Enter delivery address"
                            defaultValue={businessAddresses[group.businessId] || ""}
                            onPressEnter={(e) => {
                              setBusinessAddresses((prev) => ({
                                ...prev,
                                [group.businessId]: e.target.value,
                              }));
                              setOpenAddress(null);
                            }}
                          />
                          <p className="text-[10px] text-gray-400 mt-2">Press Enter to save</p>
                        </div>
                      )}
                    </div>

                    <Button
                      type="primary"
                      size="large"
                      disabled={checkedCount === 0}
                      onClick={() => handleCheckoutBusinessOnly(group)}
                      className="bg-[#060853]! px-8 h-9! text-sm! rounded-md! border-none"
                    >
                      Checkout {group.businessName} (${subtotal.toLocaleString()})
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="rounded-2xl border border-gray-100 p-6 mt-10">
            <h2 className="text-black font-semibold text-2xl">Order Summary</h2>

            <div className="mt-4 border-b border-gray-100 pb-3">
              {businessSummaries.map((b) => (
                <div key={b.businessId} className="flex justify-between items-center mb-2">
                  <p className="text-[#6A7282] text-sm">{b.businessName}</p>
                  <p className="text-black font-extrabold">${b.subtotal.toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-4 mb-5">
              <p className="text-[#6A7282] font-bold text-sm">
                Selected Total ({checkedItemIds.size} item{checkedItemIds.size !== 1 ? "s" : ""})
              </p>
              <p className="text-black font-extrabold">${selectedTotal.toLocaleString()}</p>
            </div>

            <div className="mt-10">
              <p className="text-black text-sm font-bold mb-2">Special Instructions  (Optional)</p>
              <TextArea
                rows={5}
                value={globalInstructions}
                onChange={(e) => setGlobalInstructions(e.target.value)}
                placeholder="Write a brief of what you want"
                className="bg-[#FBFBFB]!"
              />
            </div>

            {/* <div className="mt-6">
              <p className="text-black text-sm font-bold mb-2">Delivery Address</p>
              <Input
                placeholder="Enter Address"
                value={globalAddress}
                onChange={(e) => setGlobalAddress(e.target.value)}
                className="h-10!"
              />
            </div> */}

            <div className="mt-10 pt-8 border-t border-[#E5E7EB] flex flex-col sm:flex-row justify-between items-center gap-4">
              <Link href="/">
                <Button className="font-bold flex px-10 py-4! rounded-sm!">
                  Continue Shopping
                </Button>
              </Link>

              <Button
                disabled={checkedItemIds.size === 0}
                onClick={handleProceedToCheckout}
                className="font-bold flex px-10 bg-[#060853]! py-4! rounded-sm! text-white!"
              >
                {allChecked ? "Checkout All Items" : "Proceed to Checkout"} ({checkedItemIds.size} item
                {checkedItemIds.size !== 1 ? "s" : ""} — ${selectedTotal.toLocaleString()})
              </Button>
            </div>
          </div>
        </>
      )}

      {openAddress && (
        <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setOpenAddress(null)} />
      )}
    </div>
  );
};

export default CartPage;
