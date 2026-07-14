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
import { Input, Radio, Button, Select } from "antd";
import Loader from "../../components/Loader";
import { Country, City } from "country-state-city";

const CheckoutPage = () => {
  // Manage 3 distinct wizard steps: 1 = Order Review, 2 = Account, 3 = Payment
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const countries = useMemo(() => Country.getAllCountries(), []);

  const [formData, setFormData] = useState({
    // Step 1: Order Review / Contact Info & Delivery
    fullName: "",
    phoneNumber: "",
    street: "",
    postalCode: "",
    city: "",
    state: "",
    // Step 2: Account details
    email: "",
    password: "",
    country: "", // State key for country selector
    accountCity: "", // Separate state key for account-level city selector
    // Step 3: Payment details
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  });

  // Dynamically load cities only when a country is selected to avoid runtime empty calls
  const cities = useMemo(() => {
    return formData.country ? City.getCitiesOfCountry(formData.country) : [];
  }, [formData.country]);

  //   console.log(cities)

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

  const handleNextStep = (e) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
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
      {/* 1. Header Area */}
      <header className="pt-5">
        <div className="px-10 h-20">
          <div className="flex items-center gap-3">
            {/* Dark deep blue/indigo icon representing Aurora Design Studio logo */}
          </div>
          {currentStep === 1 ? (
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#060853] rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-900/10 rotate-45">
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
          ) : (
            ""
          )}
        </div>
      </header>

      <main className="mt-8">
        <div className="bg-[#D3D5D433] px-10 p-5 mb-8">
          <div className="flex items-center justify-between w-full ">
            {/* Step 1: Order Review */}
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
                      : "bg-slate-100 text-slate-400 border border-slate-200"
                }`}
              >
                {currentStep > 1 ? <CheckCircleOutlined /> : "1"}
              </div>
              <span
                className={`text-xs font-bold transition-colors ${
                  currentStep === 1 ? "text-[#18C37E]" : "text-slate-400"
                }`}
              >
                Order Review
              </span>
            </button>

            {/* Connecting Bar 1 -> 2 */}
            <div className="flex-1 h-[2px] mx-3 min-w-[20px] bg-[#DEE2E0] relative">
              <div
                className={`absolute top-0 left-0 h-full bg-[#18C37E] transition-all duration-500 ${
                  currentStep >= 2 ? "w-full" : "w-0"
                }`}
              />
            </div>

            {/* Step 2: Account */}
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
                      : "bg-slate-100 text-slate-400 border border-slate-200"
                }`}
              >
                {currentStep > 2 ? <CheckCircleOutlined /> : "2"}
              </div>
              <span
                className={`text-xs font-bold transition-colors ${
                  currentStep === 2 ? "text-[#18C37E]" : "text-slate-400"
                }`}
              >
                Account
              </span>
            </button>

            {/* Connecting Bar 2 -> 3 */}
            <div className="flex-1 h-[2px] mx-3 min-w-[20px] bg-[#DEE2E0] relative">
              <div
                className={`absolute top-0 left-0 h-full bg-[#18C37E] transition-all duration-500 ${
                  currentStep === 3 ? "w-full" : "w-0"
                }`}
              />
            </div>

            {/* Step 3: Payment */}
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                  currentStep === 3
                    ? "bg-[#060853] text-white border border-[#060853]"
                    : "bg-slate-100 text-slate-400 border border-slate-200"
                }`}
              >
                3
              </div>
              <span
                className={`text-xs font-bold transition-colors ${
                  currentStep === 3 ? "text-[#060853]" : "text-slate-400"
                }`}
              >
                Payment
              </span>
            </div>
          </div>
        </div>

        {/* 4. Multi-step Form Panels */}
        <div>
          {currentStep === 1 && (
            /* ================= STEP 1: ORDER REVIEW ================= */
            <form
              onSubmit={handleNextStep}
              className="space-y-8 animate-fadeIn"
            >
              <section className="p-8">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-slate-900">
                    Confirm Your Order
                  </h2>
                  <p className="text-xs text-slate-400 font-medium mt-1">
                    Contact Information
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-5">
                  <div className="flex flex-col gap-2 mb-5">
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

                <section className="rounded-lg border border-gray-200 p-5 mt-10">
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-slate-900">
                      Delivery Address
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
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
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
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
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
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
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
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

              <div className="bg-[#D3D5D433] py-7 px-10">
                <h2 className="text-xl font-bold text-slate-900 mb-4">
                  Delivery Options
                </h2>

                <Radio.Group
                  onChange={onChange}
                  value={value}
                  className="w-full flex flex-col gap-4"
                >
                  {/* Standard Delivery Option */}
                  <div
                    onClick={() => setValue("standard")}
                    className={`flex items-center justify-between cursor-pointer transition-all mb-2`}
                  >
                    <Radio
                      value="standard"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Standard Delivery (3-5 business days) - $5.99
                    </Radio>
                    <span className="text-sm font-bold text-slate-900">
                      $5.99
                    </span>
                  </div>

                  {/* Express Delivery Option */}
                  <div
                    onClick={() => setValue("express")}
                    className={`flex items-center justify-between cursor-pointer transition-all`}
                  >
                    <Radio
                      value="express"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Express Delivery (1-2 business days) - $12.99
                    </Radio>
                    <span className="text-sm font-bold text-slate-900">
                      $12.99
                    </span>
                  </div>
                </Radio.Group>
              </div>

              <div className="mt-15 px-10">
                <h2 className="text-xl font-bold text-slate-900">
                  Confirm Your Order
                </h2>
                <div className="mt-3 border-b border-gray-100 pb-3">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-[#6A7282] text-sm">
                      Aurora Design Studio
                    </p>
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
              </div>

              <div className="flex justify-end sm:flex-row gap-4 pt-4 px-10">
                <Button
                  htmlType="submit"
                  className="font-bold flex items-center bg-[#060853]! py-4! rounded-sm! text-white! hover:border-gray-200! hover:text-white!"
                >
                  <img src="/images/payment.png" alt="" className="w-5" />
                  Continue to Account
                </Button>
              </div>
            </form>
          )}

          {currentStep === 2 && (
            /* ================= STEP 2: ACCOUNT ================= */
            <form
              onSubmit={handleNextStep}
              className="space-y-8 animate-fadeIn"
            >
              <section className="bg-white p-8">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-slate-900">
                    Create Your Account
                  </h2>
                  <p className="text-xs text-slate-400 font-medium mt-1">
                    Email AddressTo proceed with payment, please create an
                    account or login if you already have one.
                  </p>
                </div>

                <div className="space-y-6 rounded-lg border border-gray-200 p-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Full Name
                      </label>
                      <Input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@example.com"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
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
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Country
                      </label>
                      <Select
                        showSearch
                        size="small"
                        placeholder="Select Country"
                        value={formData.country || undefined}
                        className="h-8! text-xs! rounded-md!"
                        optionFilterProp="children"
                        onChange={(value) => {
                          handleSelectChange("country", value);
                          handleSelectChange("accountCity", ""); // Reset city selection on country switch
                        }}
                        filterOption={(input, option) => {
                          const text =
                            typeof option?.children === "string"
                              ? option.children
                              : Array.isArray(option?.children)
                                ? option.children.join(" ")
                                : "";
                          return text
                            .toLowerCase()
                            .includes(input.toLowerCase());
                        }}
                      >
                        {countries.map((country) => (
                          <Select.Option
                            key={country.isoCode}
                            value={country.isoCode}
                          >
                            {country.flag} {country.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      City
                    </label>
                    <Select
                      showSearch
                      size="small"
                      placeholder={
                        formData.country
                          ? "Select City"
                          : "Select a country first"
                      }
                      disabled={!formData.country}
                      value={formData.accountCity || undefined}
                      className="h-8! text-xs! rounded-md!"
                      optionFilterProp="children"
                      onChange={(value) => {
                        handleSelectChange("accountCity", value);
                      }}
                      filterOption={(input, option) => {
                        const text =
                          typeof option?.children === "string"
                            ? option.children
                            : Array.isArray(option?.children)
                              ? option.children.join(" ")
                              : "";
                        return text.toLowerCase().includes(input.toLowerCase());
                      }}
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
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
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
              </section>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 px-8">
                <button
                  type="submit"
                  className="flex-1 py-4 bg-[#060853] text-white font-bold rounded-xl shadow-lg shadow-indigo-950/20 hover:bg-[#04053d] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <UserOutlined className="text-lg" />
                  <span>Proceed to Payment</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="py-4 px-8 border border-slate-200 hover:border-slate-300 bg-white text-slate-600 font-bold rounded-xl transition-all"
                >
                  Back
                </button>
              </div>
            </form>
          )}

          {currentStep === 3 && (
            /* ================= STEP 3: PAYMENT ================= */
            <form
              onSubmit={handleCompleteOrder}
              className="space-y-8 animate-fadeIn"
            >
              <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                <div className="mb-6 flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Secure Payment
                    </h2>
                    <p className="text-xs text-slate-400 font-medium mt-1">
                      Safe & encrypted
                    </p>
                  </div>
                  <LockOutlined className="text-emerald-500 text-lg" />
                </div>

                <div className="space-y-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <CreditCardOutlined /> Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      required
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="0000 0000 0000 0000"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#060853]/10 focus:border-[#060853] transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="cardExpiry"
                        required
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#060853]/10 focus:border-[#060853] transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        CVV Code
                      </label>
                      <input
                        type="password"
                        maxLength="3"
                        name="cardCvv"
                        required
                        value={formData.cardCvv}
                        onChange={handleInputChange}
                        placeholder="•••"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#060853]/10 focus:border-[#060853] transition-all"
                      />
                    </div>
                  </div>
                </div>
              </section>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-4 bg-[#18C37E] text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 hover:bg-[#15ab6e] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircleOutlined className="text-lg" />
                  <span>Complete Order & Pay</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="py-4 px-8 border border-slate-200 hover:border-slate-300 bg-white text-slate-600 font-bold rounded-xl transition-all"
                >
                  Back
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
