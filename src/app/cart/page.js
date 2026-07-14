"use client";

import { useState, useEffect } from "react";
import { Button, Checkbox, Divider, Input } from "antd";
import Link from "next/link";
import Loader from "../../components/Loader"
import {
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined,
  EnvironmentOutlined,
  ShoppingCartOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;

const page = () => {
  const [loading, setLoading] = useState(true);
  const [openAddress, setOpenAddress] = useState(null);
  const initialCart = [
    {
      id: 1,
      businessName: "Aurora Design Studio",
      category: "Interior Design & Architecture Consultancy",
      logo: "/images/company1.png",
      headerColor: "bg-[#E2EDFC]",
      footerColor: "bg-[#E2EDFC]",
      subtotal: 1278,

      products: [
        {
          id: 1,
          image: "/images/product1.png",
          name: "Architectural Lighting Kits",
          description:
            "Pre-configured lighting sets designed to create specific moods using smart-glass technology.",
          qty: 1,
          price: 150,
        },
        {
          id: 2,
          image: "/images/product1.png",
          name: "Architectural Lighting Kits",
          description:
            "Pre-configured lighting sets designed to create specific moods using smart-glass technology.",
          qty: 4,
          price: 150,
        },
      ],
    },

    {
      id: 2,
      businessName: "Ceramic Limited",
      category: "Interior Design & Architecture Consultancy",
      logo: "/images/company2.png",
      headerColor: "bg-[#E8FFF7]",
      footerColor: "bg-[#E8FFF7]",
      subtotal: 1278,

      deliveryAddress: "344 Garki Expressway, Abuja",

      products: [
        {
          id: 3,
          image: "/images/product2.png",
          name: "Architectural Lighting Kits",
          description:
            "Pre-configured lighting sets designed to create specific moods using smart-glass technology.",
          qty: 4,
          price: 150,
        },
        {
          id: 4,
          image: "/images/product3.png",
          name: "Architectural Lighting Kits",
          description:
            "Pre-configured lighting sets designed to create specific moods using smart-glass technology.",
          qty: 4,
          price: 150,
        },
      ],
    },
  ];
  const [cartData, setCartData] = useState(initialCart);

  useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 5000); 

  return () => clearTimeout(timer);
}, []);

 if (loading) {
    return <Loader />;
  }

  const increaseQty = (businessId, productId) => {
    setCartData((prev) =>
      prev.map((business) => {
        if (business.id !== businessId) return business;

        return {
          ...business,
          products: business.products.map((product) =>
            product.id === productId
              ? {
                  ...product,
                  qty: product.qty + 1,
                }
              : product,
          ),
        };
      }),
    );
  };

  const decreaseQty = (businessId, productId) => {
    setCartData((prev) =>
      prev.map((business) => {
        if (business.id !== businessId) return business;

        return {
          ...business,
          products: business.products.map((product) =>
            product.id === productId
              ? {
                  ...product,
                  qty: product.qty > 1 ? product.qty - 1 : 1,
                }
              : product,
          ),
        };
      }),
    );
  };

  return (
    <div className="py-10 px-10 bg-white">
      {/* ====================== */}
      {/* Page Heading */}
      {/* ====================== */}

      <h1 className="text-4xl font-bold text-[#1D1D1F]">Your Cart</h1>

      <p className="text-gray-500 mt-2 mb-10">
        Review your items and proceed to checkout
      </p>

      {/* ====================== */}
      {/* Businesses */}
      {/* ====================== */}

      <div className="space-y-16">
        {initialCart.map((business) => (
          <div
            key={business.id}
            className="rounded-2xl overflow-hidden border border-gray-50 bg-white"
          >
            {/* ====================== */}
            {/* Header */}
            {/* ====================== */}

            <div
              className={`${business.headerColor} flex justify-between items-center p-3 px-3`}
            >
              <div className="flex items-center gap-5">
                <img
                  src={business.logo}
                  className="w-16 h-16 rounded-full object-cover"
                  alt=""
                />

                <div>
                  <h2 className="text-lg font-bold text-black">
                    {business.businessName}
                  </h2>

                  <p className="text-black text-xs mt-1">{business.category}</p>
                </div>
              </div>

              <div className="text-right">
                <h2 className="text-lg font-bold text-black">
                  ${business.subtotal.toLocaleString()}
                </h2>

                <p className="text-black text-xs">
                  Subtotal ({business.products.length} items)
                </p>
              </div>
            </div>

            {/* ====================== */}
            {/* Products */}
            {/* ====================== */}

            <div className="p-8 space-y-8">
              {business.products.map((product) => (
                <div
                  key={product.id}
                  className="flex justify-between items-center"
                >
                  {/* LEFT */}

                  <div className="flex gap-6">
                    <img
                      src={product.image}
                      className="w-25 h-28 rounded-xl object-cover"
                      alt=""
                    />

                    <div>
                      <h3 className="font-bold text-black">{product.name}</h3>

                      <p className="text-black text-sm max-w-lg leading-7">
                        {product.description}
                      </p>

                      {/* Quantity */}

                      <div className="flex items-center gap-5">
                        <Button
                          onClick={() => decreaseQty(business.id, product.id)}
                          className="border-none!"
                          icon={<MinusOutlined className="text-black!" />}
                        />

                        <span className="font-semibold text-black">
                          Qty: {product.qty}
                        </span>

                        <Button
                          onClick={() => increaseQty(business.id, product.id)}
                          className="border-none!"
                          icon={<PlusOutlined className="text-black!" />}
                        />

                        <span className="font-semibold text-black ml-6">
                          ${product.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT */}

                  <Button
                    danger
                    type="text"
                    icon={<DeleteOutlined />}
                    className="font-bold! text-[#870A0A]!"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>

            {/* ====================== */}
            {/* Footer */}
            {/* ====================== */}

            <div
              className={`${business.footerColor} p-6 flex justify-between items-center`}
            >
              <Checkbox>Include delivery</Checkbox>

              {business.deliveryAddress && (
                <div className="relative">
                  <div
                    onClick={() =>
                      setOpenAddress(
                        openAddress === business.id ? null : business.id,
                      )
                    }
                    className="flex items-center cursor-pointer"
                  >
                    <img src="/images/pin_dark.png" className="w-4 mr-3" />

                    <p className="text-black text-sm font-semibold">
                      {business.deliveryAddress}
                    </p>

                    <img
                      src="/images/arrowdown.png"
                      className={`w-5 ml-2 transition-transform ${
                        openAddress === business.id ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {openAddress === business.id && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-10 left-0 z-50! w-[340px] bg-white rounded-xl shadow-2xl border border-gray-200 p-5"
                    >
                      <h3 className="font-bold text-black mb-4">
                        Delivery Address
                      </h3>

                      <div className="space-y-3">
                        <div className="border rounded-lg p-3 cursor-pointer hover:border-[#060853]">
                          <p className="font-semibold text-sm">Home</p>

                          <p className="text-xs text-gray-500 mt-1">
                            344 Garki Expressway, Abuja
                          </p>
                        </div>

                        <div className="border rounded-lg p-3 cursor-pointer hover:border-[#060853]">
                          <p className="font-semibold text-sm">Office</p>

                          <p className="text-xs text-gray-500 mt-1">
                            Wuse Zone 5, Abuja
                          </p>
                        </div>

                        <Button
                          type="primary"
                          className="w-full bg-[#060853] border-none mt-3"
                        >
                          + Add New Address
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <span className="font-semibold cursor-pointer text-black">
                View Instruction
              </span>

              <Button
                type="primary"
                size="large"
                className="bg-[#060853]! px-10 h-9! text-sm! rounded-md! border-none flex"
              >
                <img src="/images/checkout.png" className="w-5" />
                Checkout {business.businessName} ($
                {business.subtotal.toLocaleString()})
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="rounded-2xl border border-gray-100 p-6 mt-10">
        <h1 className="text-black font-semibold text-2xl mt-4">
          Order Summary
        </h1>
        <div className="mt-3 border-b border-gray-100 pb-3">
          <div className="flex justify-between items-center mb-2">
            <p className="text-[#6A7282] text-sm">Aurora Design Studio</p>
            <p className="text-black font-extrabold">$1,278.00</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[#6A7282] text-sm">Ceramic Limited</p>
            <p className="text-black font-extrabold">$1,278.00</p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4 mb-5">
          <p className="text-[#6A7282] font-bold text-sm">Total</p>
          <p className="text-black font-extrabold">$58,278.00</p>
        </div>

        <div className="mt-15">
          <p className="text-black text-sm font-bold mb-2">
            Special Instructions
          </p>
          <TextArea
            rows={10}
            placeholder="Write a brief of what you want"
            className="bg-[#FBFBFB]! placeholder:text-[#D3D5D4]"
          />
        </div>
        <div className="mt-10">
          <p className="text-black text-sm font-bold mb-2">Delivery Address</p>
          <Input placeholder="Enter Address" className="h-10!" />
        </div>

        <div className="mt-10 pt-8 border-t border-[#E5E7EB] flex justify-between items-center">
          <Button className="font-bold flex px-30! py-4! rounded-sm! hover:border-gray-200! hover:text-black!">
            <img src="/images/arrow-left-line.png" alt="" className="w-4" />
            Continue Shopping
          </Button>

          <Link href="/checkout">
            <Button className="font-bold flex px-30! bg-[#060853]! py-4! rounded-sm! text-white! hover:border-gray-200! hover:text-white!">
              <img src="/images/solar_bag.png" alt="" className="w-4" />
              Proceed to Checkout ($6,278.00)
            </Button>
          </Link>
        </div>
      </div>

      {openAddress && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setOpenAddress(null)}
        />
      )}
    </div>
  );
};

export default page;
