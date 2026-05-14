"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LockOutlined,
  CheckCircleFilled,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Button, Input, Select, Row, Col } from "antd";

const SignUpPage = () => {
  const { Option } = Select;
  const [password, setPassword] = useState("");

  // Real-time validation logic
  const validations = {
    length: password.length >= 8,
    numberOrSymbol: /[0-9!@#$%^&*(),.?":{}|<>]/.test(password),
    case: /[a-z]/.test(password) && /[A-Z]/.test(password),
  };

  const countries = [
    { code: "+234", flag: "/images/flags/ng.png", name: "Nigeria" },
    { code: "+1", flag: "/images/flags/us.png", name: "USA" },
  ];

  const countrySelector = (
    <Select defaultValue="+234" bordered={false} className="h-full items-center bg-transparent">
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
      {/* LEFT SIDE: FORM */}
      <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center px-6 lg:px-16 py-6">
        <div className="w-full max-w-xl flex flex-col h-full max-h-[850px]">
          
          <div className="mb-4">
            <img src="/images/logo.png" alt="logo" className="w-18" />
          </div>

          <div className="mb-6">
            <h1 className="text-3xl font-extrabold text-[#15BE87] tracking-tight">Sign Up</h1>
            <p className="text-gray-500 text-sm font-medium">Fill in your details appropriately</p>
          </div>

          <form className="flex-grow flex flex-col">
            <Row gutter={[16, 12]}>
              <Col span={12}>
                <div className="flex flex-col gap-1">
                  <label className="text-[#060853] font-bold text-xs">Name</label>
                  <Input placeholder="Name"  className="h-10 rounded-lg bg-gray-50" />
                </div>
              </Col>
              <Col span={12}>
                <div className="flex flex-col gap-1">
                  <label className="text-[#060853] font-bold text-xs">Email</label>
                  <Input placeholder="Email"  className="h-10 rounded-lg bg-gray-50" />
                </div>
              </Col>

              <Col span={12}>
                <div className="flex flex-col gap-1">
                  <label className="text-[#060853] font-bold text-xs">Phone number</label>
                  <div className="flex items-center h-10 border border-[#E2E8F0] rounded-lg bg-gray-50 overflow-hidden focus-within:border-[#15BE87]">
                    {countrySelector}
                    <Input placeholder="Phone" bordered={false} className="flex-1 bg-transparent text-sm" />
                  </div>
                </div>
              </Col>

              <Col span={12}>
                <div className="flex flex-col gap-1">
                  <label className="text-[#060853] font-bold text-xs">Password</label>
                  <Input.Password
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    prefix={<LockOutlined className="text-gray-400" />}
                    iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                    className="h-10 rounded-lg bg-gray-50"
                  />
                  {/* REAL-TIME CHECKLIST */}
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
                  />
                </div>
              </Col>
            </Row>

            <div className="flex flex-col justify-center items-center mt-auto">
              <Button type="primary" className="h-11! w-100! !bg-[#060853] !border-none font-bold text-base rounded-lg mb-3">
                Sign up
              </Button>
              <div className="flex items-center gap-3 w-full mb-3">
                <div className="h-[1px] bg-gray-200 flex-1" />
                <span className="text-gray-400 text-[10px]">or</span>
                <div className="h-[1px] bg-gray-200 flex-1" />
              </div>
              
              <Button className="h-11! w-100! rounded-lg border-[#E2E8F0] flex items-center justify-center gap-2 shadow-none hover:bg-gray-50">
                <img src="/images/google.png" alt="G" className="h-5 w-auto" />
                {/* <span className="font-semibold text-gray-700">Continue with Google</span> */}
              </Button>

              <p className="text-center text-gray-600 text-sm mt-4">
                Already have an account? <Link href="/login" className="text-[#060853] font-bold hover:underline">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="hidden md:block md:w-1/2 h-screen relative">
        <Image src="/images/sign_up.png" alt="Sign Up" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/5" />
      </div>
    </div>
  );
};

export default SignUpPage;