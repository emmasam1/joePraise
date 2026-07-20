// "use client";

// import { useState, useEffect, useMemo } from "react";
// import {
//   ArrowLeftOutlined,
//   ShoppingCartOutlined,
//   UserOutlined,
//   CreditCardOutlined,
//   CheckCircleOutlined,
//   LockOutlined,
// } from "@ant-design/icons";
// import { Input, Radio, Select, Checkbox } from "antd";
// import Loader from "../../components/Loader";
// import { Country, City } from "country-state-city";
// import Link from "next/link";

// // We import your CustomModal, but we'll build a fallback just in case this component is broken
// import CustomModal from "@/components/CustomModal";

// const CheckoutPage = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [loading, setLoading] = useState(true);

//   // Controls modal visibility
//   const [paymentMethod, setPaymentMethod] = useState(false);
//   const [isLoginMode, setIsLoginMode] = useState(false);

//   const [selectedMethod, setSelectedMethod] = useState("online");
//   const [useWallet, setUseWallet] = useState(false);

//   const countries = useMemo(() => Country.getAllCountries(), []);

//   const [formData, setFormData] = useState({
//     fullName: "",
//     phoneNumber: "",
//     street: "",
//     postalCode: "",
//     city: "",
//     state: "",
//     email: "",
//     password: "",
//     country: "",
//     accountCity: "",
//     cardNumber: "",
//     cardExpiry: "",
//     cardCvv: "",
//     expiry: "",
//     cvc: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Processing payment of $3459.90...");
//   };

//   const cities = useMemo(() => {
//     return formData.country ? City.getCitiesOfCountry(formData.country) : [];
//   }, [formData.country]);

//   const [value, setValue] = useState("standard");

//   const onChange = (e) => {
//     setValue(e.target.value);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSelectChange = (name, value) => {
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // 100% reliable trigger function
//   const triggerNextStep = (e) => {
//     if (e) e.preventDefault();
//     // console.log("triggerNextStep invoked. Current Step:", currentStep);

//     if (currentStep === 2) {
//       // Basic validation
//       if (isLoginMode) {
//         if (!formData.email || !formData.password) {
//           alert("Please fill in your Email and Password.");
//           return;
//         }
//       } else {
//         if (!formData.fullName || !formData.email || !formData.password) {
//           alert("Please fill in your Name, Email, and Password.");
//           return;
//         }
//       }

//       console.log("Opening Modal...");
//       setPaymentMethod(true);
//     } else if (currentStep < 3) {
//       setCurrentStep((prev) => prev + 1);
//     }
//   };

//   const handleModalCloseAndProceed = () => {
//     setPaymentMethod(false);
//     setCurrentStep(3);
//   };

//   const handlePrevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep((prev) => prev - 1);
//     }
//   };

//   const handleCompleteOrder = (e) => {
//     e.preventDefault();
//     alert(
//       "Order successfully placed! Thank you for shopping with Aurora Design Studio.",
//     );
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 5000);
//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <div className="min-h-screen bg-white font-sans antialiased pb-16">
//       {/* Header Area */}
//       <header className="pt-5">
//         <div className="px-10 h-20">
//           {currentStep === 1 ? (
//             <div className="flex items-center gap-4">
//               <div className="w-10 h-10 bg-[#060853] rounded-xl flex items-center justify-center text-white shadow-md rotate-45">
//                 <span className="-rotate-45 font-black text-lg tracking-tighter">
//                   A
//                 </span>
//               </div>
//               <span className="font-bold text-lg text-[#060853] tracking-tight">
//                 Aurora Design Studio
//               </span>
//             </div>
//           ) : currentStep === 2 ? (
//             <div className="flex items-center gap-4">
//               <img src="/images/logo_sm.png" alt="logo" className="w-15" />
//               <span className="font-bold text-lg text-[#060853] tracking-tight">
//                 JoePraisesmarthub
//               </span>
//             </div>
//           ) : null}
//         </div>
//       </header>

//       <main className="mt-8">
//         {/* Step Progress Bar */}
//         {(currentStep === 1 || currentStep === 2) && (
//           <div className="bg-[#D3D5D433] px-10 p-5 mb-8">
//             <div className="flex items-center justify-between w-full">
//               <button
//                 type="button"
//                 onClick={() => setCurrentStep(1)}
//                 className="flex items-center gap-2 focus:outline-none"
//               >
//                 <div
//                   className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
//                     currentStep === 1
//                       ? "bg-[#18C37E]/10 text-[#18C37E] border border-[#18C37E]/30"
//                       : currentStep > 1
//                         ? "bg-[#18C37E] text-white"
//                         : "bg-slate-100 text-slate-400 border"
//                   }`}
//                 >
//                   {currentStep > 1 ? <CheckCircleOutlined /> : "1"}
//                 </div>
//                 <span
//                   className={`text-xs font-bold ${currentStep === 1 ? "text-[#18C37E]" : "text-slate-400"}`}
//                 >
//                   Order Review
//                 </span>
//               </button>

//               <div className="flex-1 h-[2px] mx-3 bg-[#DEE2E0] relative">
//                 <div
//                   className={`absolute top-0 left-0 h-full bg-[#18C37E] transition-all duration-500 ${currentStep >= 2 ? "w-full" : "w-0"}`}
//                 />
//               </div>

//               <button
//                 type="button"
//                 onClick={() => currentStep > 1 && setCurrentStep(2)}
//                 className="flex items-center gap-2 focus:outline-none"
//                 disabled={currentStep < 2}
//               >
//                 <div
//                   className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
//                     currentStep === 2
//                       ? "bg-[#18C37E]/10 text-[#18C37E] border border-[#18C37E]/30"
//                       : currentStep > 2
//                         ? "bg-[#18C37E] text-white"
//                         : "bg-slate-100 text-slate-400 border"
//                   }`}
//                 >
//                   {currentStep > 2 ? <CheckCircleOutlined /> : "2"}
//                 </div>
//                 <span
//                   className={`text-xs font-bold ${currentStep === 2 ? "text-[#18C37E]" : "text-slate-400"}`}
//                 >
//                   Account
//                 </span>
//               </button>

//               <div className="flex-1 h-[2px] mx-3 bg-[#DEE2E0] relative">
//                 <div
//                   className={`absolute top-0 left-0 h-full bg-[#18C37E] transition-all duration-500 ${currentStep === 3 ? "w-full" : "w-0"}`}
//                 />
//               </div>

//               <div className="flex items-center gap-2">
//                 <div
//                   className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
//                     currentStep === 3
//                       ? "bg-[#060853] text-white"
//                       : "bg-slate-100 text-slate-400 border"
//                   }`}
//                 >
//                   3
//                 </div>
//                 <span
//                   className={`text-xs font-bold ${currentStep === 3 ? "text-[#060853]" : "text-slate-400"}`}
//                 >
//                   Payment
//                 </span>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Form Panels */}
//         <div className="px-10">
//           {currentStep === 1 && (
//             /* ================= STEP 1: ORDER REVIEW ================= */
//             <form
//               onSubmit={triggerNextStep}
//               className="space-y-8 animate-fadeIn"
//             >
//               <section className="py-4">
//                 <div className="mb-6">
//                   <h2 className="text-xl font-bold text-slate-900">
//                     Confirm Your Order
//                   </h2>
//                   <p className="text-xs text-slate-400 mt-1">
//                     Contact Information
//                   </p>
//                 </div>

//                 <div className="border border-gray-200 rounded-lg p-5 space-y-4">
//                   <div className="flex flex-col gap-2">
//                     <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
//                       Full Name
//                     </label>
//                     <Input
//                       type="text"
//                       name="fullName"
//                       placeholder="Enter full name"
//                       value={formData.fullName}
//                       onChange={handleInputChange}
//                     />
//                   </div>

//                   <div className="flex flex-col gap-2">
//                     <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
//                       Phone Number
//                     </label>
//                     <Input
//                       type="text"
//                       name="phoneNumber"
//                       placeholder="Enter phone number"
//                       value={formData.phoneNumber}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                 </div>

//                 {/* Delivery Address */}
//                 <section className="rounded-lg border border-gray-200 p-5 mt-8">
//                   <h2 className="text-xl font-bold text-slate-900 mb-6">
//                     Delivery Address
//                   </h2>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div className="flex flex-col gap-2">
//                       <label className="text-[11px] font-bold text-slate-400 uppercase">
//                         Street Address
//                       </label>
//                       <Input
//                         type="text"
//                         name="street"
//                         value={formData.street}
//                         onChange={handleInputChange}
//                       />
//                     </div>
//                     <div className="flex flex-col gap-2">
//                       <label className="text-[11px] font-bold text-slate-400 uppercase">
//                         Postal Code
//                       </label>
//                       <Input
//                         type="text"
//                         name="postalCode"
//                         value={formData.postalCode}
//                         onChange={handleInputChange}
//                       />
//                     </div>
//                     <div className="flex flex-col gap-2">
//                       <label className="text-[11px] font-bold text-slate-400 uppercase">
//                         City
//                       </label>
//                       <Input
//                         type="text"
//                         name="city"
//                         value={formData.city}
//                         onChange={handleInputChange}
//                       />
//                     </div>
//                     <div className="flex flex-col gap-2">
//                       <label className="text-[11px] font-bold text-slate-400 uppercase">
//                         State / Region
//                       </label>
//                       <Input
//                         type="text"
//                         name="state"
//                         value={formData.state}
//                         onChange={handleInputChange}
//                       />
//                     </div>
//                   </div>
//                 </section>
//               </section>

//               {/* Delivery Options */}
//               <div className="bg-[#D3D5D433] py-7 px-5 rounded-lg">
//                 <h2 className="text-xl font-bold text-slate-900 mb-4">
//                   Delivery Options
//                 </h2>
//                 <Radio.Group
//                   onChange={onChange}
//                   value={value}
//                   className="w-full flex flex-col gap-4"
//                 >
//                   <div
//                     onClick={() => setValue("standard")}
//                     className="flex items-center justify-between cursor-pointer"
//                   >
//                     <Radio
//                       value="standard"
//                       className="text-sm font-semibold text-slate-700"
//                     >
//                       Standard Delivery (3-5 business days)
//                     </Radio>
//                     <span className="text-sm font-bold text-slate-900">
//                       $5.99
//                     </span>
//                   </div>
//                   <div
//                     onClick={() => setValue("express")}
//                     className="flex items-center justify-between cursor-pointer"
//                   >
//                     <Radio
//                       value="express"
//                       className="text-sm font-semibold text-slate-700"
//                     >
//                       Express Delivery (1-2 business days)
//                     </Radio>
//                     <span className="text-sm font-bold text-slate-900">
//                       $12.99
//                     </span>
//                   </div>
//                 </Radio.Group>
//               </div>

//               {/* Actions */}
//               <div className="flex justify-end pt-4">
//                 <button
//                   type="submit"
//                   className="flex items-center justify-center gap-2 bg-[#060853] text-white py-2 px-8 rounded-sm transition-colors cursor-pointer"
//                 >
//                   <img src="/images/payment.png" alt="" className="w-5" />
//                   Continue to Account
//                 </button>
//               </div>
//             </form>
//           )}

//           {currentStep === 2 && (
//             /* ================= STEP 2: ACCOUNT ================= */
//             <div className="space-y-8 animate-fadeIn">
//               <section className="bg-white py-4">
//                 <div className="mb-6">
//                   <h2 className="text-xl font-bold text-slate-900">
//                     {isLoginMode ? "Welcome Back" : "Create Your Account"}
//                   </h2>
//                   <p className="text-xs text-slate-400 font-medium mt-1">
//                     {isLoginMode ? (
//                       <>
//                         Log in to complete your purchase.{" "}
//                         <span
//                           onClick={() => setIsLoginMode(false)}
//                           className="text-[#060853] font-bold cursor-pointer underline"
//                         >
//                           Create new account
//                         </span>
//                       </>
//                     ) : (
//                       <>
//                         Create an account or{" "}
//                         <span
//                           onClick={() => setIsLoginMode(true)}
//                           className="text-[#060853] font-bold cursor-pointer underline"
//                         >
//                           login
//                         </span>{" "}
//                         if you already have one.
//                       </>
//                     )}
//                   </p>
//                 </div>

//                 <div className="space-y-6 rounded-lg border border-gray-200 p-5">
//                   {isLoginMode ? (
//                     <div className="grid grid-cols-1 gap-4">
//                       <div className="flex flex-col gap-2">
//                         <label className="text-[11px] font-bold text-slate-400 uppercase">
//                           Email Address
//                         </label>
//                         <Input
//                           type="email"
//                           name="email"
//                           value={formData.email}
//                           onChange={handleInputChange}
//                           placeholder="you@example.com"
//                         />
//                       </div>
//                       <div className="flex flex-col gap-2">
//                         <label className="text-[11px] font-bold text-slate-400 uppercase">
//                           Password
//                         </label>
//                         <Input
//                           type="password"
//                           name="password"
//                           value={formData.password}
//                           onChange={handleInputChange}
//                           placeholder="*********"
//                         />
//                       </div>
//                     </div>
//                   ) : (
//                     <>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div className="flex flex-col gap-2">
//                           <label className="text-[11px] font-bold text-slate-400 uppercase">
//                             Full Name
//                           </label>
//                           <Input
//                             type="text"
//                             name="fullName"
//                             value={formData.fullName}
//                             onChange={handleInputChange}
//                             placeholder="Full Name"
//                           />
//                         </div>
//                         <div className="flex flex-col gap-2">
//                           <label className="text-[11px] font-bold text-slate-400 uppercase">
//                             Email Address
//                           </label>
//                           <Input
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleInputChange}
//                             placeholder="you@example.com"
//                           />
//                         </div>
//                         <div className="flex flex-col gap-2">
//                           <label className="text-[11px] font-bold text-slate-400 uppercase">
//                             Phone Number
//                           </label>
//                           <Input
//                             type="text"
//                             name="phoneNumber"
//                             value={formData.phoneNumber}
//                             onChange={handleInputChange}
//                             placeholder="+44 7700 900077"
//                           />
//                         </div>
//                         <div className="flex flex-col gap-2">
//                           <label className="text-[11px] font-bold text-slate-400 uppercase">
//                             Country
//                           </label>
//                           <Select
//                             showSearch
//                             placeholder="Select Country"
//                             value={formData.country || undefined}
//                             onChange={(val) => {
//                               handleSelectChange("country", val);
//                               handleSelectChange("accountCity", "");
//                             }}
//                           >
//                             {countries.map((c) => (
//                               <Select.Option key={c.isoCode} value={c.isoCode}>
//                                 {c.flag} {c.name}
//                               </Select.Option>
//                             ))}
//                           </Select>
//                         </div>
//                       </div>

//                       <div className="flex flex-col gap-2">
//                         <label className="text-[11px] font-bold text-slate-400 uppercase">
//                           City
//                         </label>
//                         <Select
//                           showSearch
//                           placeholder={
//                             formData.country
//                               ? "Select City"
//                               : "Select a country first"
//                           }
//                           disabled={!formData.country}
//                           value={formData.accountCity || undefined}
//                           onChange={(val) =>
//                             handleSelectChange("accountCity", val)
//                           }
//                         >
//                           {cities.map((city) => (
//                             <Select.Option
//                               key={`${city.name}-${city.latitude}`}
//                               value={city.name}
//                             >
//                               {city.name}
//                             </Select.Option>
//                           ))}
//                         </Select>
//                       </div>

//                       <div className="flex flex-col gap-2">
//                         <label className="text-[11px] font-bold text-slate-400 uppercase">
//                           Password
//                         </label>
//                         <Input
//                           type="password"
//                           name="password"
//                           value={formData.password}
//                           onChange={handleInputChange}
//                           placeholder="*********"
//                         />
//                       </div>
//                     </>
//                   )}
//                 </div>

//                 {!isLoginMode && (
//                   <div className="flex items-center gap-3 mt-5">
//                     <Checkbox />
//                     <p className="text-[#060853] text-sm">
//                       I agree to the{" "}
//                       <Link className="font-bold underline" href="#">
//                         Terms
//                       </Link>{" "}
//                       and{" "}
//                       <Link className="font-bold underline" href="#">
//                         Privacy
//                       </Link>
//                     </p>
//                   </div>
//                 )}
//               </section>

//               {/* Standard HTML Action Buttons to avoid any library blocking */}
//               <div className="flex justify-between items-center mt-8">
//                 <button
//                   type="button"
//                   onClick={handlePrevStep}
//                   className="py-2 px-8 rounded-sm bg-white border border-gray-300 text-black  transition-all flex items-center gap-2 cursor-pointer hover:bg-gray-50"
//                 >
//                   <img
//                     src="/images/arrow-left-line.png"
//                     alt=""
//                     className="w-5"
//                   />
//                   Back to Order
//                 </button>

//                 <button
//                   type="button"
//                   onClick={triggerNextStep}
//                   className="flex items-center justify-center gap-2 bg-[#060853] text-white py-2 px-8 rounded-sm transition-colors cursor-pointer"
//                 >
//                   <img src="/images/check-box.png" alt="" className="w-5" />
//                   {isLoginMode ? "Login" : "Proceed to Payment"}
//                 </button>
//               </div>
//             </div>
//           )}

//           {currentStep === 3 && (
//             <div className="absolute top-0 left-0 w-full">
//               <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
//                 <div className="bg-[#FBFBFB] p-15">
//                   <div className="">
//                     <div className="mb-8 p-5">
//                       <span className="text-sm font-bold text-slate-900 tracking-tight block">
//                         Pay Powder
//                       </span>
//                       <h1 className="text-4xl font-bold text-slate-900 mt-1">
//                         $433
//                       </h1>
//                     </div>

//                     {/* Item List */}
//                     <div className="space-y-6 mb-8">
//                       {/* Item 1: Pure Set */}
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-4">
//                           <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 flex items-center justify-center border border-slate-100">
//                             <span className="text-lg">🏺</span>
//                           </div>
//                           <div>
//                             <h3 className="text-sm font-bold text-slate-900">
//                               Pure Set
//                             </h3>
//                             <p className="text-xs text-[#2A2A2A] font-medium">
//                               Qty 1
//                             </p>
//                           </div>
//                         </div>
//                         <div className="text-right">
//                           <span className="text-sm font-bold text-slate-900">
//                             $359.00
//                           </span>
//                         </div>
//                       </div>

//                       {/* Item 2: Ice cream */}
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-4">
//                           <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 flex items-center justify-center border border-slate-100">
//                             <span className="text-lg">🍦</span>
//                           </div>
//                           <div>
//                             <h3 className="text-sm font-bold text-slate-900">
//                               Ice cream
//                             </h3>
//                             <p className="text-xs text-[#2A2A2A] font-medium">
//                               Qty 2
//                             </p>
//                           </div>
//                         </div>
//                         <div className="text-right">
//                           <span className="text-sm font-bold text-slate-900">
//                             $64.00
//                           </span>
//                           <p className="text-[10px] text-[#2A2A2A] mt-0.5">
//                             $32.00{" "}
//                             <span className="font-normal text-[#2A2A2A]">
//                               each
//                             </span>
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Calculations Section */}
//                     <div className="space-y-4 pl-15">
//                       {/* Subtotal */}
//                       <div className="border-t pt-5 border-slate-100 flex justify-between items-center text-sm">
//                         <span className="font-bold text-slate-900">
//                           Subtotal
//                         </span>
//                         <span className="font-bold text-slate-900">
//                           $423.00
//                         </span>
//                       </div>

//                       {/* Shipping details matching design */}
//                       <div className="flex justify-between items-start text-xs text-slate-400 pt-2 pb-4">
//                         <div className="max-w-[70%]">
//                           <p className="font-medium text-[#2A2A2A]">Shipping</p>
//                           <p className="text-[11px] text-[#2A2A2A] mt-0.5">
//                             Ground shipping (3-5 business days)
//                           </p>
//                         </div>
//                         <span className="font-medium text-[#2A2A2A]">
//                           $10.00
//                         </span>
//                       </div>

//                       {/* Total due footer */}
//                       <div className="border-t border-slate-100 pt-5 flex justify-between items-center">
//                         <span className="text-sm font-bold text-slate-900">
//                           Total Due
//                         </span>
//                         <span className="text-sm font-bold text-slate-900">
//                           $433.00
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-white p-6 pt-10">
//                   <div className="w-2/3 mx-auto">
//                     <button
//                       type="button"
//                       className="w-full bg-[#060853] text-white py-3 px-4 rounded-sm flex items-center justify-center gap-1.5 transition-colors duration-200 cursor-pointer"
//                     >
//                       {/* Apple Logo SVG */}
//                       <svg
//                         className="w-4 h-4 fill-current mb-0.5"
//                         viewBox="0 0 170 170"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.14-1.92-14.38-6.14-3.51-2.9-7.51-7.7-11.99-14.41-11.19-16.79-16.79-35.31-16.79-55.55 0-12.58 3.27-23.06 9.82-31.42 6.54-8.37 14.83-12.56 24.87-12.56 4.12 0 8.87 1.1 14.25 3.28 5.37 2.19 8.94 3.28 10.71 3.28 1.55 0 5.17-1.12 10.85-3.38 5.69-2.25 10.15-3.29 13.4-3.1 11.83.62 21.03 4.96 27.62 13.04-9.61 5.83-14.29 13.88-14.04 24.16.25 8.12 3.23 14.93 8.94 20.43 5.7 5.5 12.61 8.54 20.73 9.13 1.15 3.03 2.1 6.13 2.85 9.32.74 3.19 1.12 6.16 1.12 8.92 0 3.74-.43 7.84-1.28 12.29zM119.22 28.14c0-7.85-2.73-14.87-8.19-21.07 5.75-.12 11.45 2.19 17.11 6.94 5.25 4.41 8.16 10.19 8.74 17.33-6.12.5-11.53-1.46-16.23-5.88-1.11-1.05-1.43-1.25-1.43-7.32z" />
//                       </svg>
//                       <span className="text-base font-medium tracking-tight">
//                         Pay
//                       </span>
//                     </button>{" "}
//                     {/* "Or pay with card" Divider */}
//                     <div className="flex items-center my-6">
//                       <div className="flex-1 border-t border-[#E2E8F0]"></div>
//                       <span className="px-4 text-[13px] font-semibold text-[#CBD5E1] whitespace-nowrap bg-white">
//                         Or pay with card
//                       </span>
//                       <div className="flex-1 border-t border-[#E2E8F0]"></div>
//                     </div>
//                     {/* Card Form */}
//                     <form onSubmit={handleSubmit} className="space-y-4">
//                       <div>
//                         <label className="block text-sm font-bold text-slate-900 mb-3">
//                           Payment details
//                         </label>

//                         {/* Card Number Input with integrated Brand Logos */}
//                         <div className="relative">
//                           <input
//                             type="text"
//                             name="cardNumber"
//                             placeholder="1234 2345 7564 4567"
//                             value={formData.cardNumber}
//                             onChange={handleInputChange}
//                             className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#8A94C0]/40 rounded-lg text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:border-[#050B54] focus:ring-1 focus:ring-[#050B54] transition-all"
//                             required
//                           />
//                           {/* Card Brand Icons Container */}
//                           <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
//                             {/* Visa Icon */}
//                             <div className="w-7 h-5 bg-[#1A1F71] rounded flex items-center justify-center">
//                               <span className="text-[7px] text-white font-extrabold italic tracking-tighter">
//                                 VISA
//                               </span>
//                             </div>
//                             {/* Mastercard Icon */}
//                             <div className="w-7 h-5 bg-[#3A3A3A] rounded flex items-center justify-center relative overflow-hidden">
//                               <div className="w-3.5 h-3.5 bg-[#EB001B] rounded-full absolute left-1"></div>
//                               <div className="w-3.5 h-3.5 bg-[#F79E1B] rounded-full absolute right-1 opacity-90"></div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Expiry & CVC Grid */}
//                       <div className="grid grid-cols-2 gap-3.5">
//                         <input
//                           type="text"
//                           name="expiry"
//                           placeholder="MM / YY"
//                           value={formData.expiry}
//                           onChange={handleInputChange}
//                           className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#8A94C0]/40 rounded-lg text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:border-[#050B54] focus:ring-1 focus:ring-[#050B54] transition-all"
//                           required
//                         />
//                         <input
//                           type="password"
//                           name="cvc"
//                           placeholder="CVC"
//                           maxLength="4"
//                           value={formData.cvc}
//                           onChange={handleInputChange}
//                           className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#8A94C0]/40 rounded-lg text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:border-[#050B54] focus:ring-1 focus:ring-[#050B54] transition-all"
//                           required
//                         />
//                       </div>

//                       {/* Complete Payment Button */}
//                       <div className="pt-2">
//                         <button
//                           type="submit"
//                           className="w-full bg-[#060853] text-white py-3 px-4 rounded-sm font-bold text-sm tracking-wide transition-colors duration-200 cursor-pointer"
//                         >
//                           Pay $3459.9
//                         </button>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>

//       {/* ================= OPTION A: YOUR CUSTOM IMPORTED MODAL ================= */}
//       {typeof CustomModal !== "undefined" && (
//         <CustomModal
//           size="max-w-md"
//           open={paymentMethod}
//           visible={paymentMethod}
//           isOpen={paymentMethod}
//           show={paymentMethod}
//           onClose={() => setPaymentMethod(false)}
//           footer={null}
//         >
//           <div>
//             {/* Header */}
//             <div className="bg-[#FFF7E8] w-full left-0 mb-6 px-6 py-5  border-b border-[#F3E6C4] absolute top-0">
//               <div className="flex items-start gap-3">
//                 <div className="w-10 h-10 bg-[#FFECC2] flex items-center justify-center">
//                   <img
//                     src="/images/mdi-light_credit-card.png"
//                     className="w-5"
//                     alt=""
//                   />
//                 </div>

//                 <div>
//                   <h3 className="font-bold text-[#7B3306]">Payment method</h3>

//                   <p className="text-xs text-[#BB4D00] mt-1">
//                     Kindly select your preferred payment method
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Wallet */}
//             <div
//               onClick={() => setSelectedMethod("wallet")}
//               className="flex justify-between items-center cursor-pointer py-4 border-b border-gray-100"
//             >
//               <div className="flex gap-3">
//                 <img
//                   src="/images/mdi-light_credit-card_transparent.png"
//                   className="w-5 h-5 mt-1"
//                   alt=""
//                 />

//                 <div>
//                   <h4 className="font-semibold text-black">Wallet</h4>

//                   <p className="text-sm text-gray-500">$678</p>
//                 </div>
//               </div>

//               <div
//                 className={`w-5 h-5 rounded border flex items-center justify-center transition ${
//                   selectedMethod === "wallet"
//                     ? "bg-[#060853] border-[#060853]"
//                     : "border-gray-300"
//                 }`}
//               >
//                 {selectedMethod === "wallet" && (
//                   <span className="text-white text-xs">✓</span>
//                 )}
//               </div>
//             </div>

//             {/* Online */}
//             <div
//               onClick={() => setSelectedMethod("online")}
//               className="cursor-pointer py-4"
//             >
//               <div className="flex justify-between items-center">
//                 <div className="flex gap-3">
//                   <img
//                     src="/images/Globe.png"
//                     className="w-5 h-5 mt-1"
//                     alt=""
//                   />

//                   <div>
//                     <h4 className="font-semibold text-black">Pay Online</h4>
//                   </div>
//                 </div>

//                 <div
//                   className={`w-5 h-5 rounded border flex items-center justify-center transition ${
//                     selectedMethod === "online"
//                       ? "bg-[#060853] border-[#060853]"
//                       : "border-gray-300"
//                   }`}
//                 >
//                   {selectedMethod === "online" && (
//                     <span className="text-white text-xs">✓</span>
//                   )}
//                 </div>
//               </div>

//               {/* Only show when online is selected */}
//               {selectedMethod === "online" && (
//                 <div className="ml-8">
//                   <label className="flex items-center gap-2 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={useWallet}
//                       onChange={(e) => setUseWallet(e.target.checked)}
//                       className="accent-[#060853]"
//                     />

//                     <span className="text-xs text-gray-500">
//                       Use with wallet balance
//                     </span>
//                   </label>
//                 </div>
//               )}
//             </div>

//             {/* Button */}
//             <button
//               onClick={handleModalCloseAndProceed}
//               className="w-full h-11 bg-[#060853] text-white rounded-md font-semibold mt-6 hover:opacity-90"
//             >
//               Proceed to Payment
//             </button>
//           </div>
//         </CustomModal>
//       )}
//     </div>
//   );
// };

// export default CheckoutPage;


"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircleOutlined,
  LoadingOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Input, Radio, Select, Button, Spin, message } from "antd";
import { Country, City } from "country-state-city";
import Link from "next/link";

import CustomModal from "@/components/CustomModal";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { useCheckoutStore } from "@/store/checkoutStore";
import { useAddressStore } from "@/store/addressStore";
import api from "@/api/axios";

const DELIVERY_FEES = { standard: 5.99, express: 12.99 };

const CheckoutPage = () => {
  const router = useRouter();

  const { isAuthenticated, user } = useAuthStore();
  const { cart, cartLoading, fetchCart } = useCartStore();
  const { selectedItemIds, clearCheckoutSelection } = useCheckoutStore();
  const { addresses, addressLoading, addressMutating, fetchAddresses, addAddress, updateAddress, deleteAddress } =
    useAddressStore();

  const [currentStep, setCurrentStep] = useState(1); // 1 = Order Review, 2 = Payment
  const [pageReady, setPageReady] = useState(false);

  // Contact info
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  // Address selection
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null); // null = adding new
  const [addressForm, setAddressForm] = useState({
    label: "Home",
    fullName: "",
    phoneNumber: "",
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    isDefault: false,
  });

  // Delivery option
  const [deliveryOption, setDeliveryOption] = useState("standard");

  // Payment
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("online");
  const [useWalletWithOnline, setUseWalletWithOnline] = useState(false);
  const [walletBalance, setWalletBalance] = useState(null);
  const [walletLoading, setWalletLoading] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);

  const countries = useMemo(() => Country.getAllCountries(), []);
  const cities = useMemo(
    () => (addressForm.country ? City.getCitiesOfCountry(addressForm.country) : []),
    [addressForm.country],
  );

  // --- Guard: must be authenticated to view checkout at all ---
  useEffect(() => {
    if (!isAuthenticated) return;
    setPageReady(true);
  }, [isAuthenticated]);

  // --- Load cart + addresses once authenticated ---
  useEffect(() => {
    if (!isAuthenticated) return;
    fetchCart();
    fetchAddresses();
  }, [isAuthenticated]);

  // --- Prefill contact info from account ---
  useEffect(() => {
    if (user) {
      setContactName(user.name || "");
      setContactPhone(user.phoneNumber || "");
    }
  }, [user]);

  // --- Auto-select default saved address once addresses load ---
  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0];
      setSelectedAddressId(defaultAddr._id);
    }
  }, [addresses]);

  // --- Fetch wallet balance for the payment modal ---
  // NOTE: endpoint assumed as /wallet/me — confirm actual path.
  useEffect(() => {
    if (!isAuthenticated) return;
    setWalletLoading(true);
    api
      .get("/wallet/me")
      .then((res) => {
        if (res.data?.success) {
          setWalletBalance(res.data.wallet?.availableBalance ?? 0);
        }
      })
      .catch(() => setWalletBalance(null))
      .finally(() => setWalletLoading(false));
  }, [isAuthenticated]);

  const selectedItems = useMemo(() => {
    if (!cart?.items?.length) return [];
    if (!selectedItemIds?.length) return [];
    return cart.items.filter((i) => selectedItemIds.includes(i._id));
  }, [cart?.items, selectedItemIds]);

  const businessGroups = useMemo(() => {
    const map = new Map();
    selectedItems.forEach((item) => {
      const businessId = item.business?._id || item.business;
      if (!map.has(businessId)) {
        map.set(businessId, {
          businessId,
          businessName: item.business?.businessName || "Unknown Business",
          items: [],
        });
      }
      map.get(businessId).items.push(item);
    });
    return Array.from(map.values());
  }, [selectedItems]);

  const getItemLineTotal = (item) => (item.priceAtTimeOfAdding || 0) * (item.quantity || 1);
  const itemsSubtotal = selectedItems.reduce((sum, item) => sum + getItemLineTotal(item), 0);

  const hasPhysicalItems = selectedItems.some((i) => i.type === "physical_product");
  const deliveryFee = hasPhysicalItems ? DELIVERY_FEES[deliveryOption] : 0;
  const grandTotal = itemsSubtotal + deliveryFee;

  const selectedAddress = addresses.find((a) => a._id === selectedAddressId) || null;

  // --- Address modal handlers ---
  const openAddAddressModal = () => {
    setEditingAddress(null);
    setAddressForm({
      label: "Home",
      fullName: contactName,
      phoneNumber: contactPhone,
      street: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      isDefault: addresses.length === 0,
    });
    setIsAddressModalOpen(true);
  };

  const openEditAddressModal = (address) => {
    setEditingAddress(address);
    setAddressForm({
      label: address.label || "Address",
      fullName: address.fullName || "",
      phoneNumber: address.phoneNumber || "",
      street: address.street || "",
      city: address.city || "",
      state: address.state || "",
      country: address.country || "",
      postalCode: address.postalCode || "",
      isDefault: address.isDefault || false,
    });
    setIsAddressModalOpen(true);
  };

  const handleAddressFormChange = (field, value) => {
    setAddressForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveAddress = async () => {
    if (!addressForm.street || !addressForm.city || !addressForm.country) {
      message.error("Street, city, and country are required.");
      return;
    }

    try {
      if (editingAddress) {
        await updateAddress(editingAddress._id, addressForm);
      } else {
        const result = await addAddress(addressForm);
        // Auto-select the newly added address.
        const newAddr = result?.addresses?.[result.addresses.length - 1];
        if (newAddr) setSelectedAddressId(newAddr._id);
      }
      setIsAddressModalOpen(false);
    } catch {
      // error already surfaced via message in the store
    }
  };

  const handleDeleteAddress = async (addressId) => {
    await deleteAddress(addressId);
    if (selectedAddressId === addressId) {
      setSelectedAddressId(null);
    }
  };

  // --- Step navigation ---
  const handleContinueToPayment = () => {
    if (!contactName.trim() || !contactPhone.trim()) {
      message.error("Please provide contact name and phone number.");
      return;
    }

    if (hasPhysicalItems && !selectedAddress) {
      message.error("Please select or add a delivery address.");
      return;
    }

    setCurrentStep(2);
  };

  // --- Final checkout submission ---
  const buildDeliveryAddressPayload = () => {
    if (!selectedAddress) return null;
    return {
      fullName: selectedAddress.fullName,
      phoneNumber: selectedAddress.phoneNumber,
      street: selectedAddress.street,
      city: selectedAddress.city,
      state: selectedAddress.state,
      postalCode: selectedAddress.postalCode,
      country: selectedAddress.country,
      deliveryOption,
      deliveryFee,
    };
  };

  const handleConfirmPayment = async () => {
    setPlacingOrder(true);

    const paymentMethod =
      selectedPaymentMethod === "wallet"
        ? "wallet"
        : selectedPaymentMethod === "online" && useWalletWithOnline
          ? "wallet_and_online"
          : "online";

    try {
      const res = await api.post("/cart/checkout", {
        selectedItemIds,
        paymentMethod,
        deliveryAddress: buildDeliveryAddressPayload(),
        contactName,
        contactPhone,
      });

      if (res.data.success) {
        clearCheckoutSelection();

        if (res.data.url) {
          // Stripe path — redirect out to hosted checkout.
          window.location.href = res.data.url;
          return;
        }

        // Wallet-only path — synchronous, order already created.
        message.success("Payment successful! Your order has been placed.");
        router.push("/order-success");
      }
    } catch (error) {
      message.error(error?.response?.data?.message || "Checkout failed. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  };

  // --- Auth guard screen ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-[#060853] mb-3">
            Sign in to continue
          </h1>
          <p className="text-gray-500 mb-8">
            Please log in or create an account to complete your purchase.
          </p>
          <div className="flex flex-col gap-3">
            <Link href={`/login?redirect=${encodeURIComponent("/checkout")}`}>
              <Button
                type="primary"
                block
                className="h-11! bg-[#060853]! border-none! font-bold"
              >
                Login
              </Button>
            </Link>
            <Link href={`/business-registration?redirect=${encodeURIComponent("/checkout")}`}>
              <Button block className="h-11! font-bold">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cartLoading && !cart) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />} />
      </div>
    );
  }

  if (!cartLoading && selectedItems.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-[#060853] mb-3">
            No items selected
          </h1>
          <p className="text-gray-500 mb-8">
            Please go back to your cart and select items to checkout.
          </p>
          <Link href="/cart">
            <Button type="primary" className="h-11! bg-[#060853]! border-none! font-bold">
              Back to Cart
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans antialiased pb-16">
      <header className="pt-5">
        <div className="px-10 h-20 flex items-center gap-4">
          <img src="/images/logo_sm.png" alt="logo" className="w-15" />
          <span className="font-bold text-lg text-[#060853] tracking-tight">
            JoePraisesmarthub
          </span>
        </div>
      </header>

      <main className="mt-8">
        {/* Step progress — 2 steps now: Order Review, Payment */}
        <div className="bg-[#D3D5D433] px-10 p-5 mb-8">
          <div className="flex items-center justify-between w-full max-w-md mx-auto">
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                  currentStep === 1
                    ? "bg-[#18C37E]/10 text-[#18C37E] border border-[#18C37E]/30"
                    : "bg-[#18C37E] text-white"
                }`}
              >
                {currentStep > 1 ? <CheckCircleOutlined /> : "1"}
              </div>
              <span className={`text-xs font-bold ${currentStep === 1 ? "text-[#18C37E]" : "text-slate-400"}`}>
                Order Review
              </span>
            </div>

            <div className="flex-1 h-[2px] mx-3 bg-[#DEE2E0] relative">
              <div
                className={`absolute top-0 left-0 h-full bg-[#18C37E] transition-all duration-500 ${
                  currentStep === 2 ? "w-full" : "w-0"
                }`}
              />
            </div>

            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                  currentStep === 2 ? "bg-[#060853] text-white" : "bg-slate-100 text-slate-400 border"
                }`}
              >
                2
              </div>
              <span className={`text-xs font-bold ${currentStep === 2 ? "text-[#060853]" : "text-slate-400"}`}>
                Payment
              </span>
            </div>
          </div>
        </div>

        <div className="px-4 md:px-10">
          {currentStep === 1 && (
            <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
              {/* Order Items Summary */}
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Your Order</h2>
                <div className="space-y-6">
                  {businessGroups.map((group) => (
                    <div key={group.businessId} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-5 py-3 font-bold text-sm text-slate-800">
                        {group.businessName}
                      </div>
                      <div className="p-5 space-y-4">
                        {group.items.map((item) => (
                          <div key={item._id} className="flex justify-between items-center text-sm">
                            <div>
                              <p className="font-semibold text-slate-800">{item.title}</p>
                              <p className="text-xs text-gray-400">
                                Qty {item.quantity} × ${item.priceAtTimeOfAdding}
                                {item.type === "service" && item.bookingDate && (
                                  <> · {new Date(item.bookingDate).toLocaleDateString()} {item.bookingTime}</>
                                )}
                              </p>
                            </div>
                            <span className="font-bold text-slate-900">
                              ${getItemLineTotal(item).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Contact Information */}
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-1">Contact Information</h2>
                <p className="text-xs text-slate-400 mb-4">
                  Prefilled from your account — feel free to edit for this order.
                </p>
                <div className="border border-gray-200 rounded-lg p-5 space-y-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Full Name
                    </label>
                    <Input
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Phone Number
                    </label>
                    <Input
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
              </section>

              {/* Delivery Address — only relevant if there are physical items */}
              {hasPhysicalItems && (
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-900">Delivery Address</h2>
                    <Button
                      icon={<PlusOutlined />}
                      onClick={openAddAddressModal}
                      className="font-semibold"
                      size="small"
                    >
                      Add New Address
                    </Button>
                  </div>

                  {addressLoading ? (
                    <div className="flex justify-center py-8">
                      <Spin indicator={<LoadingOutlined spin />} />
                    </div>
                  ) : addresses.length === 0 ? (
                    <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <p className="text-sm text-gray-500 mb-3">No saved addresses yet.</p>
                      <Button
                        type="primary"
                        onClick={openAddAddressModal}
                        className="bg-[#060853]! border-none!"
                      >
                        Add Your First Address
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {addresses.map((addr) => {
                        const isSelected = selectedAddressId === addr._id;
                        return (
                          <div
                            key={addr._id}
                            onClick={() => setSelectedAddressId(addr._id)}
                            className={`relative border rounded-lg p-4 cursor-pointer transition-all ${
                              isSelected
                                ? "border-[#060853] bg-[#F1F5F9] ring-1 ring-[#060853]"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-2">
                                <Radio checked={isSelected} className="mt-0.5" />
                                <div>
                                  <p className="font-bold text-sm text-slate-900">
                                    {addr.label}
                                    {addr.isDefault && (
                                      <span className="ml-2 text-[10px] font-bold text-[#15BE87] bg-[#E8FFF7] px-1.5 py-0.5 rounded">
                                        DEFAULT
                                      </span>
                                    )}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">{addr.fullName}</p>
                                  <p className="text-xs text-gray-500">{addr.phoneNumber}</p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {addr.street}, {addr.city}, {addr.state ? `${addr.state}, ` : ""}
                                    {addr.country} {addr.postalCode}
                                  </p>
                                </div>
                              </div>

                              <div className="flex gap-2 shrink-0">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openEditAddressModal(addr);
                                  }}
                                  className="text-gray-400 hover:text-[#060853]"
                                >
                                  <EditOutlined className="text-xs" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteAddress(addr._id);
                                  }}
                                  className="text-gray-400 hover:text-red-500"
                                >
                                  <DeleteOutlined className="text-xs" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </section>
              )}

              {/* Delivery Options — only relevant for physical items */}
              {hasPhysicalItems && (
                <div className="bg-[#D3D5D433] py-7 px-5 rounded-lg">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">Delivery Options</h2>
                  <Radio.Group
                    onChange={(e) => setDeliveryOption(e.target.value)}
                    value={deliveryOption}
                    className="w-full flex flex-col gap-4"
                  >
                    <div
                      onClick={() => setDeliveryOption("standard")}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <Radio value="standard" className="text-sm font-semibold text-slate-700">
                        Standard Delivery (3-5 business days)
                      </Radio>
                      <span className="text-sm font-bold text-slate-900">
                        ${DELIVERY_FEES.standard}
                      </span>
                    </div>
                    <div
                      onClick={() => setDeliveryOption("express")}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <Radio value="express" className="text-sm font-semibold text-slate-700">
                        Express Delivery (1-2 business days)
                      </Radio>
                      <span className="text-sm font-bold text-slate-900">
                        ${DELIVERY_FEES.express}
                      </span>
                    </div>
                  </Radio.Group>
                </div>
              )}

              {/* Order total */}
              <div className="border-t border-gray-100 pt-5 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-semibold text-slate-900">${itemsSubtotal.toLocaleString()}</span>
                </div>
                {hasPhysicalItems && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Delivery Fee</span>
                    <span className="font-semibold text-slate-900">${deliveryFee.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-base pt-2 border-t border-gray-100">
                  <span className="font-bold text-slate-900">Total</span>
                  <span className="font-bold text-slate-900">${grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  type="primary"
                  size="large"
                  onClick={handleContinueToPayment}
                  className="bg-[#060853]! border-none! font-bold h-11! px-10!"
                >
                  Continue to Payment
                </Button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="max-w-2xl mx-auto animate-fadeIn">
              <div className="bg-[#FBFBFB] rounded-xl p-8">
                <h2 className="text-xl font-bold text-slate-900 mb-1">Order Total</h2>
                <p className="text-4xl font-bold text-slate-900 mt-2 mb-8">
                  ${grandTotal.toLocaleString()}
                </p>

                <div className="space-y-3 mb-8">
                  {selectedItems.map((item) => (
                    <div key={item._id} className="flex justify-between items-center text-sm">
                      <div>
                        <p className="font-semibold text-slate-900">{item.title}</p>
                        <p className="text-xs text-gray-400">Qty {item.quantity}</p>
                      </div>
                      <span className="font-bold text-slate-900">
                        ${getItemLineTotal(item).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-semibold">${itemsSubtotal.toLocaleString()}</span>
                  </div>
                  {hasPhysicalItems && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Delivery ({deliveryOption})</span>
                      <span className="font-semibold">${deliveryFee.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-bold pt-2 border-t border-gray-200">
                    <span>Total Due</span>
                    <span>${grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => setCurrentStep(1)}
                    className="h-11! font-bold"
                  >
                    Back to Order Review
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => setIsPaymentModalOpen(true)}
                    className="flex-1 h-11! bg-[#060853]! border-none! font-bold"
                  >
                    Choose Payment Method
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Add/Edit Address Modal */}
      <CustomModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        title={editingAddress ? "Edit Address" : "Add New Address"}
        size="max-w-lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Label</label>
              <Input
                value={addressForm.label}
                onChange={(e) => handleAddressFormChange("label", e.target.value)}
                placeholder="e.g. Home, Office"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Full Name</label>
              <Input
                value={addressForm.fullName}
                onChange={(e) => handleAddressFormChange("fullName", e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase">Phone Number</label>
            <Input
              value={addressForm.phoneNumber}
              onChange={(e) => handleAddressFormChange("phoneNumber", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase">Street Address</label>
            <Input
              value={addressForm.street}
              onChange={(e) => handleAddressFormChange("street", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Country</label>
              <Select
                showSearch
                placeholder="Select country"
                value={addressForm.country || undefined}
                onChange={(val) => {
                  handleAddressFormChange("country", val);
                  handleAddressFormChange("city", "");
                }}
                optionFilterProp="children"
              >
                {countries.map((c) => (
                  <Select.Option key={c.isoCode} value={c.isoCode}>
                    {c.flag} {c.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase">City</label>
              <Select
                showSearch
                placeholder={addressForm.country ? "Select city" : "Select country first"}
                disabled={!addressForm.country}
                value={addressForm.city || undefined}
                onChange={(val) => handleAddressFormChange("city", val)}
                optionFilterProp="children"
              >
                {cities.map((city) => (
                  <Select.Option key={`${city.name}-${city.latitude}`} value={city.name}>
                    {city.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase">State / Region</label>
              <Input
                value={addressForm.state}
                onChange={(e) => handleAddressFormChange("state", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Postal Code</label>
              <Input
                value={addressForm.postalCode}
                onChange={(e) => handleAddressFormChange("postalCode", e.target.value)}
              />
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={addressForm.isDefault}
              onChange={(e) => handleAddressFormChange("isDefault", e.target.checked)}
              className="accent-[#060853]"
            />
            <span className="text-sm text-gray-600">Set as default address</span>
          </label>

          <Button
            type="primary"
            block
            loading={addressMutating}
            onClick={handleSaveAddress}
            className="h-11! bg-[#060853]! border-none! font-bold mt-2"
          >
            {editingAddress ? "Save Changes" : "Add Address"}
          </Button>
        </div>
      </CustomModal>

      {/* Payment Method Modal */}
      <CustomModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        title={null}
        size="max-w-md"
      >
        <div>
          <div className="bg-[#FFF7E8] w-full left-0 mb-6 px-6 py-5 border-b border-[#F3E6C4] absolute top-0">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#FFECC2] flex items-center justify-center">
                <img src="/images/mdi-light_credit-card.png" className="w-5" alt="" />
              </div>
              <div>
                <h3 className="font-bold text-[#7B3306]">Payment method</h3>
                <p className="text-xs text-[#BB4D00] mt-1">
                  Kindly select your preferred payment method
                </p>
              </div>
            </div>
          </div>

          <div className="pt-10">
            {/* Wallet */}
            <div
              onClick={() => setSelectedPaymentMethod("wallet")}
              className="flex justify-between items-center cursor-pointer py-4 border-b border-gray-100"
            >
              <div className="flex gap-3">
                <img src="/images/mdi-light_credit-card_transparent.png" className="w-5 h-5 mt-1" alt="" />
                <div>
                  <h4 className="font-semibold text-black">Wallet</h4>
                  <p className="text-sm text-gray-500">
                    {walletLoading ? (
                      <LoadingOutlined spin />
                    ) : walletBalance !== null ? (
                      `$${walletBalance.toLocaleString()}`
                    ) : (
                      "Unavailable"
                    )}
                  </p>
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded border flex items-center justify-center transition ${
                  selectedPaymentMethod === "wallet" ? "bg-[#060853] border-[#060853]" : "border-gray-300"
                }`}
              >
                {selectedPaymentMethod === "wallet" && <span className="text-white text-xs">✓</span>}
              </div>
            </div>

            {/* Online */}
            <div onClick={() => setSelectedPaymentMethod("online")} className="cursor-pointer py-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-3">
                  <img src="/images/Globe.png" className="w-5 h-5 mt-1" alt="" />
                  <div>
                    <h4 className="font-semibold text-black">Pay Online</h4>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center transition ${
                    selectedPaymentMethod === "online" ? "bg-[#060853] border-[#060853]" : "border-gray-300"
                  }`}
                >
                  {selectedPaymentMethod === "online" && <span className="text-white text-xs">✓</span>}
                </div>
              </div>

              {selectedPaymentMethod === "online" && walletBalance > 0 && (
                <div className="ml-8">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useWalletWithOnline}
                      onChange={(e) => setUseWalletWithOnline(e.target.checked)}
                      className="accent-[#060853]"
                    />
                    <span className="text-xs text-gray-500">Use with wallet balance</span>
                  </label>
                </div>
              )}
            </div>

            <Button
              type="primary"
              block
              loading={placingOrder}
              onClick={handleConfirmPayment}
              className="h-11! bg-[#060853]! border-none! font-bold mt-6"
            >
              Proceed to Payment
            </Button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default CheckoutPage;