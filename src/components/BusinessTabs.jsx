
// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Heart } from "lucide-react";
// import { Button, Form, Input, Select, DatePicker, message } from "antd";
// import CustomModal from "./CustomModal";
// import { useCartStore } from "@/store/cartStore";

// const { TextArea } = Input;

// const formatPrice = (item) => {
//   if (item.pricing?.type === "range" || item.pricingType === "range") {
//     return `$${item.pricing?.minPrice ?? item.minPrice} - $${item.pricing?.maxPrice ?? item.maxPrice}`;
//   }
//   if (item.pricing?.type === "quote" || item.pricingType === "quote") {
//     return "Negotiable";
//   }
//   return `$${item.pricing?.price ?? item.price ?? 0}`;
// };

// export default function BusinessTabs({ businessId, services = [], physicalProducts = [], digitalProducts = [] }) {
//   const tabs = ["Services", "Products", "Digital Products"];
//   const [activeTab, setActiveTab] = useState("Services");
//   const [isBookingOpen, setIsBookingOpen] = useState(false);
//   const [selectedService, setSelectedService] = useState(null);
//   const [addingItemId, setAddingItemId] = useState(null);

//   const [form] = Form.useForm();
//   const { addToCart, cartLoading } = useCartStore();

//   const dataMap = {
//     Services: services,
//     Products: physicalProducts,
//     "Digital Products": digitalProducts,
//   };

//   const currentItems = dataMap[activeTab] || [];

//   const openBookingModal = (service) => {
//     setSelectedService(service);
//     form.resetFields();
//     setIsBookingOpen(true);
//   };

//   const closeBookingModal = () => {
//     form.resetFields();
//     setSelectedService(null);
//     setIsBookingOpen(false);
//   };

//   const handleBookingSubmit = async (values) => {
//     try {
//       await addToCart({
//         listingId: selectedService._id,
//         bookingDate: values.bookingDate?.format("YYYY-MM-DD"),
//         bookingTime: values.bookingTime,
//         fulfillmentType: values.serviceType,
//         instructions: values.instruction,
//         quantity: 1,
//       });

//       closeBookingModal();
//     } catch {
//       // error already surfaced via message in the store
//     }
//   };

//   const handleAddToCart = async (item) => {
//     setAddingItemId(item._id);
//     try {
//       await addToCart({
//         listingId: item._id,
//         quantity: 1,
//       });
//     } finally {
//       setAddingItemId(null);
//     }
//   };

//   return (
//     <section>
//       <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
//         <h2 className="text-3xl font-bold">{activeTab}</h2>

//         <div className="flex overflow-hidden rounded border border-zinc-200 bg-white text-xs">
//           {tabs.map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className="relative px-4 py-3 font-medium text-zinc-700"
//             >
//               {tab}
//               {activeTab === tab && (
//                 <motion.div
//                   layoutId="active-tab"
//                   className="absolute bottom-0 left-0 h-0.5 w-full bg-rose-600"
//                   transition={{ type: "spring", stiffness: 500, damping: 35 }}
//                 />
//               )}
//             </button>
//           ))}
//         </div>
//       </div>

//       {currentItems.length === 0 ? (
//         <p className="text-center text-sm text-zinc-400 py-10">
//           No {activeTab.toLowerCase()} listed yet.
//         </p>
//       ) : (
//         <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
//           {currentItems.map((item) => (
//             <article key={item._id} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
//               <div className="flex gap-4">
//                 <img
//                   src={item.images?.[0]?.url || "/images/no-image.png"}
//                   alt={item.title}
//                   className="h-28 w-36 rounded object-cover"
//                   loading="lazy"
//                 />

//                 <div>
//                   <p className="text-sm font-bold">{item.title}</p>
//                   <p className="mt-2 line-clamp-4 text-xs leading-5 text-zinc-600">
//                     {item.description}
//                   </p>
//                 </div>
//               </div>

//               <div className="mt-4 flex items-center justify-between">
//                 <Heart size={23} className="text-zinc-600" />
//                 <span className="text-xl font-bold">{formatPrice(item)}</span>

//                 <Button
//                   loading={activeTab === "Services" ? false : addingItemId === item._id}
//                   onClick={() => {
//                     if (activeTab === "Services") {
//                       openBookingModal(item);
//                     } else {
//                       handleAddToCart(item);
//                     }
//                   }}
//                   className="rounded! bg-[#10105e]! px-3! py-2! text-xs! font-semibold! text-white! border-none!"
//                 >
//                   {activeTab === "Services" ? "Book Now" : "Add To Cart"}
//                 </Button>
//               </div>
//             </article>
//           ))}
//         </div>
//       )}

//       <CustomModal
//         isOpen={isBookingOpen}
//         onClose={closeBookingModal}
//         title={
//           <h2 className="pr-8 text-3xl font-bold text-zinc-800 sm:text-2xl">
//             Book a Service
//           </h2>
//         }
//         size="max-w-lg"
//       >
//         {selectedService && (
//           <div className="px-2 pb-2 pt-5 sm:px-2">
//             <img
//               src={selectedService.images?.[0]?.url || "/images/no-image.png"}
//               alt={selectedService.title}
//               className="h-[200px] w-full object-cover sm:h-[300px]"
//             />

//             <Form
//               form={form}
//               layout="vertical"
//               requiredMark={false}
//               onFinish={handleBookingSubmit}
//               className="mt-10"
//             >
//               <Form.Item
//                 label={<span className="text-sm font-semibold text-zinc-900">Preferred Date</span>}
//                 name="bookingDate"
//                 rules={[{ required: true, message: "Please select a date" }]}
//                 className="mb-7"
//               >
//                 <DatePicker size="large" className="w-full h-[40px]" />
//               </Form.Item>

//               <Form.Item
//                 label={<span className="text-sm font-semibold text-zinc-900">Preferred Time</span>}
//                 name="bookingTime"
//                 rules={[{ required: true, message: "Please select a time" }]}
//                 className="mb-7"
//               >
//                 <Select
//                   size="large"
//                   placeholder="Select time"
//                   className="h-[40px]"
//                   options={["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"].map((t) => ({
//                     value: t,
//                     label: t,
//                   }))}
//                 />
//               </Form.Item>

//               <Form.Item
//                 label={<span className="text-sm font-semibold text-zinc-900">Type of Service</span>}
//                 name="serviceType"
//                 rules={[{ required: true, message: "Please select the type of service" }]}
//                 className="mb-7"
//               >
//                 <Select
//                   size="large"
//                   placeholder="Select type of service"
//                   className="h-[40px]"
//                   options={[
//                     { value: "client_location", label: "Home Service" },
//                     { value: "online_virtual", label: "Online Service" },
//                   ]}
//                 />
//               </Form.Item>

//               <Form.Item
//                 label={<span className="text-sm font-semibold text-zinc-900">Add Instruction</span>}
//                 name="instruction"
//                 className="mb-9"
//               >
//                 <TextArea
//                   rows={7}
//                   maxLength={1000}
//                   showCount
//                   placeholder="Write a brief of what you want"
//                   className="resize-none rounded-lg border-zinc-300 p-4 text-base shadow-none placeholder:text-zinc-300"
//                 />
//               </Form.Item>

//               <Button
//                 htmlType="submit"
//                 loading={cartLoading}
//                 className="h-10! w-full bg-[#060853]! text-lg font-semibold text-white! shadow-none hover:!border-[#0b084d] hover:!bg-[#0b084d]"
//               >
//                 Add To Cart
//               </Button>
//             </Form>
//           </div>
//         )}
//       </CustomModal>
//     </section>
//   );
// }

"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Button, Form, Input, Select, DatePicker, message } from "antd";
import { MinusOutlined, PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import Link from "next/link";
import CustomModal from "./CustomModal";
import { useCartStore } from "@/store/cartStore";

const { TextArea } = Input;

const formatPrice = (item) => {
  if (item.pricing?.type === "range" || item.pricingType === "range") {
    return `$${item.pricing?.minPrice ?? item.minPrice} - $${item.pricing?.maxPrice ?? item.maxPrice}`;
  }
  if (item.pricing?.type === "quote" || item.pricingType === "quote") {
    return "Negotiable";
  }
  return `$${item.pricing?.price ?? item.price ?? 0}`;
};

export default function BusinessTabs({ businessId, services = [], physicalProducts = [], digitalProducts = [] }) {
  const tabs = ["Services", "Products", "Digital Products"];
  const [activeTab, setActiveTab] = useState("Services");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [addingItemId, setAddingItemId] = useState(null);

  const [form] = Form.useForm();
  const {
    cart,
    fetchCart,
    addToCart,
    updateItemQuantity,
    removeItem,
    mutatingItemId,
    cartLoading,
  } = useCartStore();

  useEffect(() => {
    fetchCart().catch(() => {});
  }, []);

  const dataMap = {
    Services: services,
    Products: physicalProducts,
    "Digital Products": digitalProducts,
  };

  const currentItems = dataMap[activeTab] || [];

  // Map of listingId -> cart item, so each card can look itself up in O(1).
  const cartItemByListingId = useMemo(() => {
    const map = new Map();
    (cart?.items || []).forEach((cartItem) => {
      const listingId = cartItem.listing?._id || cartItem.listing;
      if (listingId) map.set(String(listingId), cartItem);
    });
    return map;
  }, [cart?.items]);

  const openBookingModal = (service) => {
    setSelectedService(service);
    form.resetFields();
    setIsBookingOpen(true);
  };

  const closeBookingModal = () => {
    form.resetFields();
    setSelectedService(null);
    setIsBookingOpen(false);
  };

  const handleBookingSubmit = async (values) => {
    try {
      await addToCart({
        listingId: selectedService._id,
        bookingDate: values.bookingDate?.format("YYYY-MM-DD"),
        bookingTime: values.bookingTime,
        fulfillmentType: values.serviceType,
        instructions: values.instruction,
        quantity: 1,
      });

      closeBookingModal();
    } catch {
      // error already surfaced via message in the store
    }
  };

  const handleAddToCart = async (item) => {
    setAddingItemId(item._id);
    try {
      await addToCart({
        listingId: item._id,
        quantity: 1,
      });
    } finally {
      setAddingItemId(null);
    }
  };

  const handleIncrease = (cartItem) => {
    updateItemQuantity(cartItem._id, (cartItem.quantity || 1) + 1);
  };

  const handleDecrease = (cartItem) => {
    const nextQty = (cartItem.quantity || 1) - 1;
    if (nextQty < 1) {
      // Decrementing a qty-1 item removes it entirely — the card then
      // flips back to showing "Add to Cart" once cart state updates.
      removeItem(cartItem._id);
    } else {
      updateItemQuantity(cartItem._id, nextQty);
    }
  };

  return (
    <section>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-3xl font-bold">{activeTab}</h2>

        <div className="flex overflow-hidden rounded border border-zinc-200 bg-white text-xs">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="relative px-4 py-3 font-medium text-zinc-700"
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute bottom-0 left-0 h-0.5 w-full bg-rose-600"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {currentItems.length === 0 ? (
        <p className="text-center text-sm text-zinc-400 py-10">
          No {activeTab.toLowerCase()} listed yet.
        </p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {currentItems.map((item) => {
            const cartItem = cartItemByListingId.get(String(item._id));
            const isInCart = Boolean(cartItem);
            const isMutating = cartItem && mutatingItemId === cartItem._id;
            const isAdding = addingItemId === item._id;

            return (
              <article key={item._id} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                <div className="flex gap-4">
                  <img
                    src={item.images?.[0]?.url || "/images/no-image.png"}
                    alt={item.title}
                    className="h-28 w-36 rounded object-cover"
                    loading="lazy"
                  />

                  <div>
                    <p className="text-sm font-bold">{item.title}</p>
                    <p className="mt-2 line-clamp-4 text-xs leading-5 text-zinc-600">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-2">
                  <Heart size={23} className="text-zinc-600 shrink-0" />
                  <span className="text-xl font-bold">{formatPrice(item)}</span>

                  {activeTab === "Services" ? (
                      isInCart ? (
                        <div className="flex flex-col items-end gap-1.5">
                          <Link href="/cart">
                            <Button className="rounded! bg-white! px-3! py-2! text-xs! font-semibold! text-[#10105e]! border! border-[#10105e]!">
                              Already Booked · View in Cart
                            </Button>
                          </Link>
                          <button
                            onClick={() => openBookingModal(item)}
                            className="text-[11px] font-semibold text-zinc-500 hover:text-[#10105e] underline underline-offset-2 cursor-pointer"
                          >
                            Book Another
                          </button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => openBookingModal(item)}
                          className="rounded! bg-[#10105e]! px-3! py-2! text-xs! font-semibold! text-white! border-none!"
                        >
                          Book Now
                        </Button>
                      )
                    ) : isInCart ? (
                      <div className="flex items-center gap-2">
                        <Button
                          size="small"
                          onClick={() => handleDecrease(cartItem)}
                          disabled={isMutating}
                          icon={<MinusOutlined />}
                          className="rounded! border-[#10105e]! text-[#10105e]!"
                        />
                        <span className="text-sm font-bold min-w-[20px] text-center">
                          {isMutating ? <LoadingOutlined spin /> : cartItem.quantity}
                        </span>
                        <Button
                          size="small"
                          onClick={() => handleIncrease(cartItem)}
                          disabled={isMutating}
                          icon={<PlusOutlined />}
                          className="rounded! border-[#10105e]! text-[#10105e]!"
                        />
                      </div>
                    ) : (
                      <Button
                        loading={isAdding}
                        onClick={() => handleAddToCart(item)}
                        className="rounded! bg-[#10105e]! px-3! py-2! text-xs! font-semibold! text-white! border-none!"
                      >
                        Add To Cart
                      </Button>
                    )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      <CustomModal
        isOpen={isBookingOpen}
        onClose={closeBookingModal}
        title={
          <h2 className="pr-8 text-3xl font-bold text-zinc-800 sm:text-2xl">
            Book a Service
          </h2>
        }
        size="max-w-lg"
      >
        {selectedService && (
          <div className="px-2 pb-2 pt-5 sm:px-2">
            <img
              src={selectedService.images?.[0]?.url || "/images/no-image.png"}
              alt={selectedService.title}
              className="h-[200px] w-full object-cover sm:h-[300px]"
            />

            <Form
              form={form}
              layout="vertical"
              requiredMark={false}
              onFinish={handleBookingSubmit}
              className="mt-10"
            >
              <Form.Item
                label={<span className="text-sm font-semibold text-zinc-900">Preferred Date</span>}
                name="bookingDate"
                rules={[{ required: true, message: "Please select a date" }]}
                className="mb-7"
              >
                <DatePicker size="large" className="w-full h-[40px]" />
              </Form.Item>

              <Form.Item
                label={<span className="text-sm font-semibold text-zinc-900">Preferred Time</span>}
                name="bookingTime"
                rules={[{ required: true, message: "Please select a time" }]}
                className="mb-7"
              >
                <Select
                  size="large"
                  placeholder="Select time"
                  className="h-[40px]"
                  options={["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"].map((t) => ({
                    value: t,
                    label: t,
                  }))}
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-sm font-semibold text-zinc-900">Type of Service</span>}
                name="serviceType"
                rules={[{ required: true, message: "Please select the type of service" }]}
                className="mb-7"
              >
                <Select
                  size="large"
                  placeholder="Select type of service"
                  className="h-[40px]"
                  options={[
                    { value: "client_location", label: "Home Service" },
                    { value: "online_virtual", label: "Online Service" },
                  ]}
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-sm font-semibold text-zinc-900">Add Instruction</span>}
                name="instruction"
                className="mb-9"
              >
                <TextArea
                  rows={7}
                  maxLength={1000}
                  showCount
                  placeholder="Write a brief of what you want"
                  className="resize-none rounded-lg border-zinc-300 p-4 text-base shadow-none placeholder:text-zinc-300"
                />
              </Form.Item>

              <Button
                htmlType="submit"
                loading={cartLoading}
                className="h-10! w-full bg-[#060853]! text-lg font-semibold text-white! shadow-none hover:!border-[#0b084d] hover:!bg-[#0b084d]"
              >
                Add To Cart
              </Button>
            </Form>
          </div>
        )}
      </CustomModal>
    </section>
  );
}