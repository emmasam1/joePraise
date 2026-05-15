

"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  LockOutlined,
  CheckCircleFilled,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Button, Input, Select, Row, Col, message } from "antd";
import api from "@/api/axios";

const SignUpPage = () => {
  const { Option } = Select;
  const router = useRouter();
  const searchParams = useSearchParams();

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+234",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  // Capture Referral code if it exists in URL (?ref=CODE)
  const [referredByCode, setReferredByCode] = useState("");

  useEffect(() => {
    const ref = searchParams.get("ref") || searchParams.get("referralCode");
    if (ref) setReferredByCode(ref);
  }, [searchParams]);

  // Real-time validation logic
  const validations = {
    length: formData.password.length >= 8,
    numberOrSymbol: /[0-9!@#$%^&*(),.?":{}|<>]/.test(formData.password),
    case: /[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password),
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Google OAuth URL Trigger
  const handleGoogleSignup = () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL.replace('/v1', ''); // Get base domain
    const googleUrl = referredByCode 
      ? `${baseUrl}/auth/google?ref=${referredByCode}`
      : `${baseUrl}/auth/google`;
    
    window.location.href = googleUrl;
  };

  // Submit local form to API
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      return message.error("Please fill in all fields");
    }
    if (formData.password !== formData.confirmPassword) {
      return message.error("Passwords do not match");
    }
    if (!validations.length || !validations.numberOrSymbol || !validations.case) {
      return message.error("Password requirements not met");
    }

    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phoneNumber: `${formData.countryCode}${formData.phone}`,
        password: formData.password,
        role: "user", // Can be customized depending on selection if needed
        referredByCode: referredByCode || undefined,
      };

      const response = await api.post("/auth/register", payload);

      if (response.data.success) {
        message.success(response.data.message || "Verification code sent!");
        // Redirect to a verification page, carrying the email over in query strings
        router.push(`/verification-code?email=${encodeURIComponent(formData.email)}`);
      }
    } catch (error) {
      message.error(error.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const countries = [
    { code: "+234", flag: "/images/flags/ng.png", name: "Nigeria" },
    { code: "+1", flag: "/images/flags/us.png", name: "USA" },
  ];

  const countrySelector = (
    <Select 
      defaultValue="+234" 
      bordered={false} 
      className="h-full items-center bg-transparent"
      onChange={(value) => handleInputChange("countryCode", value)}
    >
      {countries.map((c) => (
        <Option key={c.code} value={c.code}>
          <div className="flex items-center gap-2">
            <Image src={c.flag} alt={c.name} width={18} height={12} />
            <span className="text-sm">{c.code}</span>
          </div>
        </Option>
      ))}
    </Select>
  );

  return (
    <div className="h-screen w-full flex flex-col md:flex-row bg-white font-sans overflow-hidden">
      <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center px-6 lg:px-16 py-6">
        <div className="w-full max-w-xl flex flex-col h-full max-h-[850px]">
          
          <div className="mb-4">
            <img src="/images/logo.png" alt="logo" className="w-18" />
          </div>

          <div className="mb-6">
            <h1 className="text-3xl font-extrabold text-[#15BE87] tracking-tight">Sign Up</h1>
            <p className="text-gray-500 text-sm font-medium">Fill in your details appropriately</p>
          </div>

          <form className="flex-grow flex flex-col" onSubmit={handleSubmit}>
            <Row gutter={[16, 12]}>
              <Col span={12}>
                <div className="flex flex-col gap-1">
                  <label className="text-[#060853] font-bold text-xs">Name</label>
                  <Input 
                    placeholder="Name" 
                    className="h-10 rounded-lg bg-gray-50" 
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>
              </Col>
              <Col span={12}>
                <div className="flex flex-col gap-1">
                  <label className="text-[#060853] font-bold text-xs">Email</label>
                  <Input 
                    placeholder="Email" 
                    type="email"
                    className="h-10 rounded-lg bg-gray-50" 
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
              </Col>

              <Col span={12}>
                <div className="flex flex-col gap-1">
                  <label className="text-[#060853] font-bold text-xs">Phone number</label>
                  <div className="flex items-center h-10 border border-[#E2E8F0] rounded-lg bg-gray-50 overflow-hidden focus-within:border-[#15BE87]">
                    {countrySelector}
                    <Input 
                      placeholder="Phone" 
                      bordered={false} 
                      className="flex-1 bg-transparent text-sm" 
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                </div>
              </Col>

              <Col span={12}>
                <div className="flex flex-col gap-1">
                  <label className="text-[#060853] font-bold text-xs">Password</label>
                  <Input.Password
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder="Password"
                    prefix={<LockOutlined className="text-gray-400" />}
                    iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                    className="h-10 rounded-lg bg-gray-50"
                  />
                  <div className="mt-1.5 space-y-1">
                    <p className={`text-[10px] flex items-center gap-1 transition-colors ${validations.length ? 'text-[#15BE87]' : 'text-gray-400'}`}>
                      {validations.length ? <CheckCircleFilled className="text-[9px]" /> : <span className="w-1.5 h-1.5 rounded-full bg-gray-300 ml-0.5" />}
                      At least 8 characters
                    </p>
                    <p className={`text-[10px] flex items-center gap-1 transition-colors ${validations.numberOrSymbol ? 'text-[#15BE87]' : 'text-gray-400'}`}>
                      {validations.numberOrSymbol ? <CheckCircleFilled className="text-[9px]" /> : <span className="w-1.5 h-1.5 rounded-full bg-gray-300 ml-0.5" />}
                      One number (0-9) or symbol
                    </p>
                    <p className={`text-[10px] flex items-center gap-1 transition-colors ${validations.case ? 'text-[#15BE87]' : 'text-gray-400'}`}>
                      {validations.case ? <CheckCircleFilled className="text-[9px]" /> : <span className="w-1.5 h-1.5 rounded-full bg-gray-300 ml-0.5" />}
                      Lowercase and uppercase
                    </p>
                  </div>
                </div>
              </Col>

              <Col span={24}>
                <div className="flex flex-col gap-1">
                  <label className="text-[#060853] font-bold text-xs">Confirm password</label>
                  <Input.Password 
                    placeholder="Confirm password" 
                    prefix={<LockOutlined className="text-gray-400" />} 
                    iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                    className="h-10 rounded-lg bg-gray-50" 
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  />
                </div>
              </Col>
            </Row>

            <div className="flex flex-col justify-center items-center mt-auto">
              <Button 
                htmlType="submit"
                type="primary" 
                loading={loading}
                className="h-11! w-100! !bg-[#060853] !border-none font-bold text-base rounded-lg mb-3"
              >
                Sign up
              </Button>
              <div className="flex items-center gap-3 w-full mb-3">
                <div className="h-[1px] bg-gray-200 flex-1" />
                <span className="text-gray-400 text-[10px]">or</span>
                <div className="h-[1px] bg-gray-200 flex-1" />
              </div>
              
              <Button 
                onClick={handleGoogleSignup}
                className="h-11! w-100! rounded-lg border-[#E2E8F0] flex items-center justify-center gap-2 shadow-none hover:bg-gray-50"
              >
                <img src="/images/google.png" alt="G" className="h-5 w-auto" />
                Sign up with Google
              </Button>

              <p className="text-center text-gray-600 text-sm mt-4">
                Already have an account? <Link href="/login" className="text-[#060853] font-bold hover:underline">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden md:block md:w-1/2 h-screen relative">
        <Image src="/images/sign_up.png" alt="Sign Up" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/5" />
      </div>
    </div>
  );
};

export default SignUpPage;