
"use client";
import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { Input, Button, Flex, message } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import api from "@/api/axios";

const VerificationContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setLoginSuccess = useAuthStore((state) => state.setLoginSuccess);

  // Read email context and reason for verification from URL query strings
  const email = searchParams.get("email") || "";
  const type = searchParams.get("type") || "registration"; // 'registration' or 'reset'

  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    setCanResend(false);

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // 1. Resend OTP Handler
  const handleResend = async (e) => {
    e.preventDefault();
    if (!canResend || !email) return;

    setResendLoading(true);
    try {
      if (type === "reset") {
        // Triggers your forgotPassword backend controller
        const res = await api.post("/auth/forgot-password", { email });
        // console.log("Resend OTP response:", res.data);
        message.success("Password reset OTP resent to email!");
      } else {
        // If registering, re-trigger signup or a dedicated resend endpoint if available
        // For your current backend architecture, hit /auth/register with the cached payload
        // or a resend specific route. Here we fallback to alert user:
        await api.post("/auth/forgot-password", { email }); // Fallback reuse or custom resend route
        message.success("Verification code resent successfully!");
      }
      
      setTimeLeft(180);
      setCanResend(false);
    } catch (error) {
      console.log(error)
      message.error(error.response?.data?.message || "Failed to resend code.");
    } finally {
      setResendLoading(false);
    }
  };

  // 2. Submit OTP Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 6) {
      return message.error("Please enter the complete 6-digit verification code");
    }
    if (!email) {
      return message.error("Email context missing. Please try logging in or registering again.");
    }

    setLoading(true);
    try {
      if (type === "reset") {
        router.push(`/new-password?email=${encodeURIComponent(email)}&code=${encodeURIComponent(otpCode)}`);
      } else {
        // Regular registration verification flow
        const response = await api.post("/auth/verify-email", {
          email,
          code: otpCode,
        });

        if (response.data.success) {
          // Immediately save tokens & user into Zustand store
          setLoginSuccess(response.data.user, response.data.accessToken);
          
          // Route user to your custom green success screen!
          router.push("/verification-successful");
        }
      }
    } catch (error) {
      message.error(error.response?.data?.message || "Invalid or expired verification code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col md:flex-row bg-white font-sans overflow-hidden">
      {/* LEFT SIDE: FORM */}
      <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center px-6 lg:px-16 py-6">
        <div className="w-full max-w-xl flex flex-col h-full max-h-[850px]">
          <div className="mb-10">
            <img src="/images/logo.png" alt="logo" className="w-18" />
          </div>

          <div className="mb-6">
            <h1 className="text-3xl font-extrabold text-center text-[#15BE87] tracking-tight">
              Verification Code
            </h1>
            <p className="text-[#2A2A2A] mt-2 text-center text-sm md:text-base">
              A code has been sent to <span className="font-bold">{email || "your email"}</span>, please copy
              <br /> and enter the code for verification
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex justify-center items-center flex-col gap-5 mt-10 w-full">
            <Flex gap="medium" align="center" vertical>
              <Input.OTP
                length={6}
                value={otpCode}
                formatter={(str) => str.toUpperCase()}
                onChange={(text) => setOtpCode(text)}
                className="scale-110"
              />
            </Flex>

            <div className="flex flex-col items-center gap-2 mt-6">
              <div className="text-center">
                {!canResend && (
                  <p className="text-[#15BE87] font-bold text-lg mb-1">
                    {formatTime(timeLeft)}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={handleResend}
                disabled={!canResend || resendLoading}
                className={`text-lg font-bold transition-colors duration-300 ${
                  canResend && !resendLoading
                    ? "text-[#15BE87] hover:underline cursor-pointer"
                    : "text-[#999999] cursor-not-allowed"
                }`}
              >
                {resendLoading ? "Sending..." : canResend ? "Resend code now" : "Resend again?"}
              </button>
            </div>

            <div className="flex flex-col justify-center items-center mt-8 w-full">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="h-11 w-full max-w-[400px] !bg-[#060853] !border-none font-bold text-base rounded-lg mb-3 shadow-md"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="hidden md:block md:w-1/2 h-screen relative">
        <Image
          src="/images/verifiy-code.png"
          alt="Verification"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/5" />
      </div>
    </div>
  );
};

// Next.js App Router requires searchParams to be wrapped in a Suspense boundary
export default function Page() {
  return (
    <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading verification settings...</div>}>
      <VerificationContent />
    </Suspense>
  );
}
