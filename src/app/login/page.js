
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input, Button, message } from "antd";
import { LockOutlined, EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useAuthStore } from "@/store/authStore";
import api from "@/api/axios";

const LoginPage = () => {
  const router = useRouter();
  const setLoginSuccess = useAuthStore((state) => state.setLoginSuccess);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL.replace('/v1', '');
    window.location.href = `${baseUrl}/auth/google`;
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   if (!email || !password) {
  //     return message.error("Please provide both email and password");
  //   }

  //   setLoading(true);
  //   try {
  //     const response = await api.post("/auth/login", { email, password });
      
  //     const { data } = response;

  //     // Handle 2FA Required Redirect if your route demands it
  //     if (data.twoFactorRequired) {
  //       message.info(data.message);
  //       router.push(`/verify-2fa?email=${encodeURIComponent(email)}`);
  //       return;
  //     }

  //     if (data.success) {
  //       // Save user state into Zustand store (persists to localStorage)
  //       setLoginSuccess(data.user, data.accessToken);
  //       message.success("Logged in successfully!");
  //       router.push("/dashboard");
  //     }
  //   } catch (error) {
  //     const errMsg = error.response?.data?.message || "Login failed";
  //     message.error(errMsg);

  //     // If backend explicitly warns that verification is lacking
  //     if (errMsg.toLowerCase().includes("verify your email")) {
  //       router.push(`/verification-code?email=${encodeURIComponent(email)}`);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };


 const handleLogin = async (e) => {
  e.preventDefault();
  if (!email || !password) return message.error("Provide credentials");

  setLoading(true);
  try {
    const response = await api.post("/auth/login", { email, password });
    const { data } = response;

    if (data.success) {
      // This trigger saves to both Zustand and Cookies
      setLoginSuccess(data.user, data.accessToken);
      message.success("Logged in successfully!");

      // Route based on role
      if (data.user.role === "admin") router.push("/admin");
      else if (data.user.role === "business") router.push("/dashboard");
      else router.push("/");
    }
  } catch (error) {
    message.error(error.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="h-screen w-full flex flex-col md:flex-row bg-white font-sans overflow-hidden">
      <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center px-6 lg:px-16 py-6">
        <div className="w-full max-w-xl flex flex-col h-full max-h-[850px]">
          <div className="mb-10">
            <img src="/images/logo.png" alt="logo" className="w-18" />
          </div>
          <div className="mb-6">
            <h1 className="text-3xl font-extrabold text-[#15BE87] tracking-tight">Login</h1>
          </div>
          <form className="flex-grow flex flex-col gap-5 mb-15" onSubmit={handleLogin}>
            <div className="flex flex-col gap-1">
              <label className="text-[#060853] font-bold text-lg">Email</label>
              <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 rounded-lg bg-gray-50"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[#060853] font-bold text-lg">Password</label>
              <Input.Password
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                prefix={<LockOutlined className="text-gray-400" />}
                iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                className="h-10 rounded-lg bg-gray-50"
              />
            </div>

            <div className="mt-5 flex flex-col items-center gap-3">
              <Button
                htmlType="submit"
                type="primary"
                loading={loading}
                className="h-11! w-100! !bg-[#060853] !border-none font-bold text-base rounded-lg"
              >
                Login
              </Button>

              <div className="flex items-center gap-3 w-full my-2">
                <div className="h-[1px] bg-gray-200 flex-1" />
                <span className="text-gray-400 text-[10px]">or</span>
                <div className="h-[1px] bg-gray-200 flex-1" />
              </div>

              <Button
                onClick={handleGoogleLogin}
                className="h-11! w-100! rounded-lg border-[#E2E8F0] flex items-center justify-center gap-2 shadow-none hover:bg-gray-50"
              >
                <img src="/images/google.png" alt="G" className="h-5 w-auto" />
                Login with Google
              </Button>

              <p className="text-center text-gray-600 text-sm mt-4">
                Don't have an account? <Link href="/business-registration" className="text-[#060853] font-bold hover:underline">Sign Up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden md:block md:w-1/2 h-screen relative">
        <Image src="/images/sign_up.png" alt="Login Banner" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/5" />
      </div>
    </div>
  );
};

export default LoginPage;
