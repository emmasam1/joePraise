"use client";
import React from "react";
import Image from "next/image";
import { Input, Button } from "antd";
import {
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const page = () => {
  //  const [password, setPassword] = useState("");
  return (
    <div className="h-screen w-full flex flex-col md:flex-row bg-white font-sans overflow-hidden">
      {/* LEFT SIDE: FORM */}
      <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center px-6 lg:px-16 py-6">
        <div className="w-full max-w-xl flex flex-col h-full max-h-[850px]">
          <div className="mb-10">
            <img src="/images/logo.png" alt="logo" className="w-18" />
          </div>
          <div className="mb-6">
            <h1 className="text-3xl font-extrabold text-[#15BE87] tracking-tight">
              Login
            </h1>
          </div>
          <form className="flex-grow flex flex-col gap-5 mb-15">
            <div className="flex flex-col gap-1">
              <label className="text-[#060853] font-bold text-lg">Email</label>
              <Input
                placeholder="Email"
                className="h-10 rounded-lg bg-gray-50"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[#060853] font-bold text-lg">
                Password
              </label>
              <Input.Password
                placeholder="Password"
                prefix={<LockOutlined className="text-gray-400" />}
                iconRender={(visible) =>
                  visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                }
                className="h-10 rounded-lg bg-gray-50"
              />
            </div>

            <div className="mt-5 flex justify-end">
              <Link
                href="/forget-password"
                className="text-[#15BE87] font-bold underline"
              >
                Forget Password
              </Link>
            </div>

            <div className="flex flex-col justify-center items-center mt-auto">
              <Button
                type="primary"
                className="h-11! w-100! !bg-[#060853] !border-none font-bold text-base rounded-lg mb-3"
              >
                Login
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
                Don't have an account?{" "}
                <Link
                  href="/business-registration"
                  className="text-[#060853] font-bold hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      {/* RIGHT SIDE IMAGE */}
      <div className="hidden md:block md:w-1/2 h-screen relative">
        <Image
          src="/images/login.png"
          alt="Sign Up"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/5" />
      </div>
    </div>
  );
};

export default page;
