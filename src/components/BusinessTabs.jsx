
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Button, Form, Input, Select, DatePicker, message } from "antd";
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
  const { addToCart, cartLoading } = useCartStore();

  const dataMap = {
    Services: services,
    Products: physicalProducts,
    "Digital Products": digitalProducts,
  };

  const currentItems = dataMap[activeTab] || [];

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
          {currentItems.map((item) => (
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

              <div className="mt-4 flex items-center justify-between">
                <Heart size={23} className="text-zinc-600" />
                <span className="text-xl font-bold">{formatPrice(item)}</span>

                <Button
                  loading={activeTab === "Services" ? false : addingItemId === item._id}
                  onClick={() => {
                    if (activeTab === "Services") {
                      openBookingModal(item);
                    } else {
                      handleAddToCart(item);
                    }
                  }}
                  className="rounded! bg-[#10105e]! px-3! py-2! text-xs! font-semibold! text-white! border-none!"
                >
                  {activeTab === "Services" ? "Book Now" : "Add To Cart"}
                </Button>
              </div>
            </article>
          ))}
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