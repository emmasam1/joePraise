"use client";

import { useState, useEffect, useMemo } from "react";
import {
  ArrowLeftOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  CreditCardOutlined,
  CheckCircleOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Input, Radio, Select, Checkbox } from "antd";
import Loader from "../../components/Loader";
import { Country, City } from "country-state-city";
import Link from "next/link";

// We import your CustomModal, but we'll build a fallback just in case this component is broken
import CustomModal from "@/components/CustomModal";

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);

  // Controls modal visibility
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(false);

  const [selectedMethod, setSelectedMethod] = useState("online");
  const [useWallet, setUseWallet] = useState(false);

  const countries = useMemo(() => Country.getAllCountries(), []);

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    street: "",
    postalCode: "",
    city: "",
    state: "",
    email: "",
    password: "",
    country: "",
    accountCity: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
    expiry: "",
    cvc: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Processing payment of $3459.90...");
  };

  const cities = useMemo(() => {
    return formData.country ? City.getCitiesOfCountry(formData.country) : [];
  }, [formData.country]);

  const [value, setValue] = useState("standard");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 100% reliable trigger function
  const triggerNextStep = (e) => {
    if (e) e.preventDefault();
    // console.log("triggerNextStep invoked. Current Step:", currentStep);

    if (currentStep === 2) {
      // Basic validation
      if (isLoginMode) {
        if (!formData.email || !formData.password) {
          alert("Please fill in your Email and Password.");
          return;
        }
      } else {
        if (!formData.fullName || !formData.email || !formData.password) {
          alert("Please fill in your Name, Email, and Password.");
          return;
        }
      }

      console.log("Opening Modal...");
      setPaymentMethod(true);
    } else if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleModalCloseAndProceed = () => {
    setPaymentMethod(false);
    setCurrentStep(3);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    alert(
      "Order successfully placed! Thank you for shopping with Aurora Design Studio.",
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-white font-sans antialiased pb-16">
      {/* Header Area */}
      <header className="pt-5">
        <div className="px-10 h-20">
          {currentStep === 1 ? (
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#060853] rounded-xl flex items-center justify-center text-white shadow-md rotate-45">
                <span className="-rotate-45 font-black text-lg tracking-tighter">
                  A
                </span>
              </div>
              <span className="font-bold text-lg text-[#060853] tracking-tight">
                Aurora Design Studio
              </span>
            </div>
          ) : currentStep === 2 ? (
            <div className="flex items-center gap-4">
              <img src="/images/logo_sm.png" alt="logo" className="w-15" />
              <span className="font-bold text-lg text-[#060853] tracking-tight">
                JoePraisesmarthub
              </span>
            </div>
          ) : null}
        </div>
      </header>

      <main className="mt-8">
        {/* Step Progress Bar */}
        {(currentStep === 1 || currentStep === 2) && (
          <div className="bg-[#D3D5D433] px-10 p-5 mb-8">
            <div className="flex items-center justify-between w-full">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                    currentStep === 1
                      ? "bg-[#18C37E]/10 text-[#18C37E] border border-[#18C37E]/30"
                      : currentStep > 1
                        ? "bg-[#18C37E] text-white"
                        : "bg-slate-100 text-slate-400 border"
                  }`}
                >
                  {currentStep > 1 ? <CheckCircleOutlined /> : "1"}
                </div>
                <span
                  className={`text-xs font-bold ${currentStep === 1 ? "text-[#18C37E]" : "text-slate-400"}`}
                >
                  Order Review
                </span>
              </button>

              <div className="flex-1 h-[2px] mx-3 bg-[#DEE2E0] relative">
                <div
                  className={`absolute top-0 left-0 h-full bg-[#18C37E] transition-all duration-500 ${currentStep >= 2 ? "w-full" : "w-0"}`}
                />
              </div>

              <button
                type="button"
                onClick={() => currentStep > 1 && setCurrentStep(2)}
                className="flex items-center gap-2 focus:outline-none"
                disabled={currentStep < 2}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                    currentStep === 2
                      ? "bg-[#18C37E]/10 text-[#18C37E] border border-[#18C37E]/30"
                      : currentStep > 2
                        ? "bg-[#18C37E] text-white"
                        : "bg-slate-100 text-slate-400 border"
                  }`}
                >
                  {currentStep > 2 ? <CheckCircleOutlined /> : "2"}
                </div>
                <span
                  className={`text-xs font-bold ${currentStep === 2 ? "text-[#18C37E]" : "text-slate-400"}`}
                >
                  Account
                </span>
              </button>

              <div className="flex-1 h-[2px] mx-3 bg-[#DEE2E0] relative">
                <div
                  className={`absolute top-0 left-0 h-full bg-[#18C37E] transition-all duration-500 ${currentStep === 3 ? "w-full" : "w-0"}`}
                />
              </div>

              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                    currentStep === 3
                      ? "bg-[#060853] text-white"
                      : "bg-slate-100 text-slate-400 border"
                  }`}
                >
                  3
                </div>
                <span
                  className={`text-xs font-bold ${currentStep === 3 ? "text-[#060853]" : "text-slate-400"}`}
                >
                  Payment
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Form Panels */}
        <div className="px-10">
          {currentStep === 1 && (
            /* ================= STEP 1: ORDER REVIEW ================= */
            <form
              onSubmit={triggerNextStep}
              className="space-y-8 animate-fadeIn"
            >
              <section className="py-4">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-slate-900">
                    Confirm Your Order
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Contact Information
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-5 space-y-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      name="fullName"
                      placeholder="Enter full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Phone Number
                    </label>
                    <Input
                      type="text"
                      name="phoneNumber"
                      placeholder="Enter phone number"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Delivery Address */}
                <section className="rounded-lg border border-gray-200 p-5 mt-8">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">
                    Delivery Address
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase">
                        Street Address
                      </label>
                      <Input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase">
                        Postal Code
                      </label>
                      <Input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase">
                        City
                      </label>
                      <Input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase">
                        State / Region
                      </label>
                      <Input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </section>
              </section>

              {/* Delivery Options */}
              <div className="bg-[#D3D5D433] py-7 px-5 rounded-lg">
                <h2 className="text-xl font-bold text-slate-900 mb-4">
                  Delivery Options
                </h2>
                <Radio.Group
                  onChange={onChange}
                  value={value}
                  className="w-full flex flex-col gap-4"
                >
                  <div
                    onClick={() => setValue("standard")}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <Radio
                      value="standard"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Standard Delivery (3-5 business days)
                    </Radio>
                    <span className="text-sm font-bold text-slate-900">
                      $5.99
                    </span>
                  </div>
                  <div
                    onClick={() => setValue("express")}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <Radio
                      value="express"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Express Delivery (1-2 business days)
                    </Radio>
                    <span className="text-sm font-bold text-slate-900">
                      $12.99
                    </span>
                  </div>
                </Radio.Group>
              </div>

              {/* Actions */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-[#060853] text-white py-2 px-8 rounded-sm transition-colors cursor-pointer"
                >
                  <img src="/images/payment.png" alt="" className="w-5" />
                  Continue to Account
                </button>
              </div>
            </form>
          )}

          {currentStep === 2 && (
            /* ================= STEP 2: ACCOUNT ================= */
            <div className="space-y-8 animate-fadeIn">
              <section className="bg-white py-4">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-slate-900">
                    {isLoginMode ? "Welcome Back" : "Create Your Account"}
                  </h2>
                  <p className="text-xs text-slate-400 font-medium mt-1">
                    {isLoginMode ? (
                      <>
                        Log in to complete your purchase.{" "}
                        <span
                          onClick={() => setIsLoginMode(false)}
                          className="text-[#060853] font-bold cursor-pointer underline"
                        >
                          Create new account
                        </span>
                      </>
                    ) : (
                      <>
                        Create an account or{" "}
                        <span
                          onClick={() => setIsLoginMode(true)}
                          className="text-[#060853] font-bold cursor-pointer underline"
                        >
                          login
                        </span>{" "}
                        if you already have one.
                      </>
                    )}
                  </p>
                </div>

                <div className="space-y-6 rounded-lg border border-gray-200 p-5">
                  {isLoginMode ? (
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase">
                          Email Address
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="you@example.com"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase">
                          Password
                        </label>
                        <Input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="*********"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-[11px] font-bold text-slate-400 uppercase">
                            Full Name
                          </label>
                          <Input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Full Name"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[11px] font-bold text-slate-400 uppercase">
                            Email Address
                          </label>
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="you@example.com"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[11px] font-bold text-slate-400 uppercase">
                            Phone Number
                          </label>
                          <Input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            placeholder="+44 7700 900077"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[11px] font-bold text-slate-400 uppercase">
                            Country
                          </label>
                          <Select
                            showSearch
                            placeholder="Select Country"
                            value={formData.country || undefined}
                            onChange={(val) => {
                              handleSelectChange("country", val);
                              handleSelectChange("accountCity", "");
                            }}
                          >
                            {countries.map((c) => (
                              <Select.Option key={c.isoCode} value={c.isoCode}>
                                {c.flag} {c.name}
                              </Select.Option>
                            ))}
                          </Select>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase">
                          City
                        </label>
                        <Select
                          showSearch
                          placeholder={
                            formData.country
                              ? "Select City"
                              : "Select a country first"
                          }
                          disabled={!formData.country}
                          value={formData.accountCity || undefined}
                          onChange={(val) =>
                            handleSelectChange("accountCity", val)
                          }
                        >
                          {cities.map((city) => (
                            <Select.Option
                              key={`${city.name}-${city.latitude}`}
                              value={city.name}
                            >
                              {city.name}
                            </Select.Option>
                          ))}
                        </Select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase">
                          Password
                        </label>
                        <Input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="*********"
                        />
                      </div>
                    </>
                  )}
                </div>

                {!isLoginMode && (
                  <div className="flex items-center gap-3 mt-5">
                    <Checkbox />
                    <p className="text-[#060853] text-sm">
                      I agree to the{" "}
                      <Link className="font-bold underline" href="#">
                        Terms
                      </Link>{" "}
                      and{" "}
                      <Link className="font-bold underline" href="#">
                        Privacy
                      </Link>
                    </p>
                  </div>
                )}
              </section>

              {/* Standard HTML Action Buttons to avoid any library blocking */}
              <div className="flex justify-between items-center mt-8">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="py-2 px-8 rounded-sm bg-white border border-gray-300 text-black  transition-all flex items-center gap-2 cursor-pointer hover:bg-gray-50"
                >
                  <img
                    src="/images/arrow-left-line.png"
                    alt=""
                    className="w-5"
                  />
                  Back to Order
                </button>

                <button
                  type="button"
                  onClick={triggerNextStep}
                  className="flex items-center justify-center gap-2 bg-[#060853] text-white py-2 px-8 rounded-sm transition-colors cursor-pointer"
                >
                  <img src="/images/check-box.png" alt="" className="w-5" />
                  {isLoginMode ? "Login" : "Proceed to Payment"}
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="absolute top-0 left-0 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
                <div className="bg-[#FBFBFB] p-15">
                  <div className="">
                    <div className="mb-8 p-5">
                      <span className="text-sm font-bold text-slate-900 tracking-tight block">
                        Pay Powder
                      </span>
                      <h1 className="text-4xl font-bold text-slate-900 mt-1">
                        $433
                      </h1>
                    </div>

                    {/* Item List */}
                    <div className="space-y-6 mb-8">
                      {/* Item 1: Pure Set */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 flex items-center justify-center border border-slate-100">
                            <span className="text-lg">🏺</span>
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-slate-900">
                              Pure Set
                            </h3>
                            <p className="text-xs text-[#2A2A2A] font-medium">
                              Qty 1
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold text-slate-900">
                            $359.00
                          </span>
                        </div>
                      </div>

                      {/* Item 2: Ice cream */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 flex items-center justify-center border border-slate-100">
                            <span className="text-lg">🍦</span>
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-slate-900">
                              Ice cream
                            </h3>
                            <p className="text-xs text-[#2A2A2A] font-medium">
                              Qty 2
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold text-slate-900">
                            $64.00
                          </span>
                          <p className="text-[10px] text-[#2A2A2A] mt-0.5">
                            $32.00{" "}
                            <span className="font-normal text-[#2A2A2A]">
                              each
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Calculations Section */}
                    <div className="space-y-4 pl-15">
                      {/* Subtotal */}
                      <div className="border-t pt-5 border-slate-100 flex justify-between items-center text-sm">
                        <span className="font-bold text-slate-900">
                          Subtotal
                        </span>
                        <span className="font-bold text-slate-900">
                          $423.00
                        </span>
                      </div>

                      {/* Shipping details matching design */}
                      <div className="flex justify-between items-start text-xs text-slate-400 pt-2 pb-4">
                        <div className="max-w-[70%]">
                          <p className="font-medium text-[#2A2A2A]">Shipping</p>
                          <p className="text-[11px] text-[#2A2A2A] mt-0.5">
                            Ground shipping (3-5 business days)
                          </p>
                        </div>
                        <span className="font-medium text-[#2A2A2A]">
                          $10.00
                        </span>
                      </div>

                      {/* Total due footer */}
                      <div className="border-t border-slate-100 pt-5 flex justify-between items-center">
                        <span className="text-sm font-bold text-slate-900">
                          Total Due
                        </span>
                        <span className="text-sm font-bold text-slate-900">
                          $433.00
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 pt-10">
                  <div className="w-2/3 mx-auto">
                    <button
                      type="button"
                      className="w-full bg-[#060853] text-white py-3 px-4 rounded-sm flex items-center justify-center gap-1.5 transition-colors duration-200 cursor-pointer"
                    >
                      {/* Apple Logo SVG */}
                      <svg
                        className="w-4 h-4 fill-current mb-0.5"
                        viewBox="0 0 170 170"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.14-1.92-14.38-6.14-3.51-2.9-7.51-7.7-11.99-14.41-11.19-16.79-16.79-35.31-16.79-55.55 0-12.58 3.27-23.06 9.82-31.42 6.54-8.37 14.83-12.56 24.87-12.56 4.12 0 8.87 1.1 14.25 3.28 5.37 2.19 8.94 3.28 10.71 3.28 1.55 0 5.17-1.12 10.85-3.38 5.69-2.25 10.15-3.29 13.4-3.1 11.83.62 21.03 4.96 27.62 13.04-9.61 5.83-14.29 13.88-14.04 24.16.25 8.12 3.23 14.93 8.94 20.43 5.7 5.5 12.61 8.54 20.73 9.13 1.15 3.03 2.1 6.13 2.85 9.32.74 3.19 1.12 6.16 1.12 8.92 0 3.74-.43 7.84-1.28 12.29zM119.22 28.14c0-7.85-2.73-14.87-8.19-21.07 5.75-.12 11.45 2.19 17.11 6.94 5.25 4.41 8.16 10.19 8.74 17.33-6.12.5-11.53-1.46-16.23-5.88-1.11-1.05-1.43-1.25-1.43-7.32z" />
                      </svg>
                      <span className="text-base font-medium tracking-tight">
                        Pay
                      </span>
                    </button>{" "}
                    {/* "Or pay with card" Divider */}
                    <div className="flex items-center my-6">
                      <div className="flex-1 border-t border-[#E2E8F0]"></div>
                      <span className="px-4 text-[13px] font-semibold text-[#CBD5E1] whitespace-nowrap bg-white">
                        Or pay with card
                      </span>
                      <div className="flex-1 border-t border-[#E2E8F0]"></div>
                    </div>
                    {/* Card Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-900 mb-3">
                          Payment details
                        </label>

                        {/* Card Number Input with integrated Brand Logos */}
                        <div className="relative">
                          <input
                            type="text"
                            name="cardNumber"
                            placeholder="1234 2345 7564 4567"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#8A94C0]/40 rounded-lg text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:border-[#050B54] focus:ring-1 focus:ring-[#050B54] transition-all"
                            required
                          />
                          {/* Card Brand Icons Container */}
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
                            {/* Visa Icon */}
                            <div className="w-7 h-5 bg-[#1A1F71] rounded flex items-center justify-center">
                              <span className="text-[7px] text-white font-extrabold italic tracking-tighter">
                                VISA
                              </span>
                            </div>
                            {/* Mastercard Icon */}
                            <div className="w-7 h-5 bg-[#3A3A3A] rounded flex items-center justify-center relative overflow-hidden">
                              <div className="w-3.5 h-3.5 bg-[#EB001B] rounded-full absolute left-1"></div>
                              <div className="w-3.5 h-3.5 bg-[#F79E1B] rounded-full absolute right-1 opacity-90"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Expiry & CVC Grid */}
                      <div className="grid grid-cols-2 gap-3.5">
                        <input
                          type="text"
                          name="expiry"
                          placeholder="MM / YY"
                          value={formData.expiry}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#8A94C0]/40 rounded-lg text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:border-[#050B54] focus:ring-1 focus:ring-[#050B54] transition-all"
                          required
                        />
                        <input
                          type="password"
                          name="cvc"
                          placeholder="CVC"
                          maxLength="4"
                          value={formData.cvc}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#8A94C0]/40 rounded-lg text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:border-[#050B54] focus:ring-1 focus:ring-[#050B54] transition-all"
                          required
                        />
                      </div>

                      {/* Complete Payment Button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full bg-[#060853] text-white py-3 px-4 rounded-sm font-bold text-sm tracking-wide transition-colors duration-200 cursor-pointer"
                        >
                          Pay $3459.9
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ================= OPTION A: YOUR CUSTOM IMPORTED MODAL ================= */}
      {typeof CustomModal !== "undefined" && (
        <CustomModal
          size="max-w-md"
          open={paymentMethod}
          visible={paymentMethod}
          isOpen={paymentMethod}
          show={paymentMethod}
          onClose={() => setPaymentMethod(false)}
          footer={null}
        >
          <div>
            {/* Header */}
            <div className="bg-[#FFF7E8] w-full left-0 mb-6 px-6 py-5  border-b border-[#F3E6C4] absolute top-0">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#FFECC2] flex items-center justify-center">
                  <img
                    src="/images/mdi-light_credit-card.png"
                    className="w-5"
                    alt=""
                  />
                </div>

                <div>
                  <h3 className="font-bold text-[#7B3306]">Payment method</h3>

                  <p className="text-xs text-[#BB4D00] mt-1">
                    Kindly select your preferred payment method
                  </p>
                </div>
              </div>
            </div>

            {/* Wallet */}
            <div
              onClick={() => setSelectedMethod("wallet")}
              className="flex justify-between items-center cursor-pointer py-4 border-b border-gray-100"
            >
              <div className="flex gap-3">
                <img
                  src="/images/mdi-light_credit-card_transparent.png"
                  className="w-5 h-5 mt-1"
                  alt=""
                />

                <div>
                  <h4 className="font-semibold text-black">Wallet</h4>

                  <p className="text-sm text-gray-500">$678</p>
                </div>
              </div>

              <div
                className={`w-5 h-5 rounded border flex items-center justify-center transition ${
                  selectedMethod === "wallet"
                    ? "bg-[#060853] border-[#060853]"
                    : "border-gray-300"
                }`}
              >
                {selectedMethod === "wallet" && (
                  <span className="text-white text-xs">✓</span>
                )}
              </div>
            </div>

            {/* Online */}
            <div
              onClick={() => setSelectedMethod("online")}
              className="cursor-pointer py-4"
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-3">
                  <img
                    src="/images/Globe.png"
                    className="w-5 h-5 mt-1"
                    alt=""
                  />

                  <div>
                    <h4 className="font-semibold text-black">Pay Online</h4>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center transition ${
                    selectedMethod === "online"
                      ? "bg-[#060853] border-[#060853]"
                      : "border-gray-300"
                  }`}
                >
                  {selectedMethod === "online" && (
                    <span className="text-white text-xs">✓</span>
                  )}
                </div>
              </div>

              {/* Only show when online is selected */}
              {selectedMethod === "online" && (
                <div className="ml-8">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useWallet}
                      onChange={(e) => setUseWallet(e.target.checked)}
                      className="accent-[#060853]"
                    />

                    <span className="text-xs text-gray-500">
                      Use with wallet balance
                    </span>
                  </label>
                </div>
              )}
            </div>

            {/* Button */}
            <button
              onClick={handleModalCloseAndProceed}
              className="w-full h-11 bg-[#060853] text-white rounded-md font-semibold mt-6 hover:opacity-90"
            >
              Proceed to Payment
            </button>
          </div>
        </CustomModal>
      )}

      {/* ================= OPTION B: FOOLPROOF INLINE FALLBACK MODAL ================= */}
      {/* {paymentMethod && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-scaleUp">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Verify & Proceed to Payment</h3>
            <p className="text-sm text-slate-500 mb-6">
              You are about to be redirected to our secure payment gateway. Please verify your details before proceeding.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleModalCloseAndProceed}
                className="px-5 py-2 bg-[#060853] hover:bg-[#0c107c] text-white rounded-lg text-sm font-semibold cursor-pointer"
              >
                Proceed to Pay
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default CheckoutPage;
