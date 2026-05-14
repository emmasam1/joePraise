"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Input, Button, Flex } from "antd";
import { motion } from "framer-motion";
import Link from "next/link";

const Page = () => {
  const [timeLeft, setTimeLeft] = useState(180); // 180 seconds = 3 minutes
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    // Set canResend to false if timer is running (useful for resets)
    setCanResend(false);

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Formatter to turn seconds into MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleResend = (e) => {
    e.preventDefault(); // Prevent form submission
    if (!canResend) return;

    // Logic: Trigger your API call here
    console.log("OTP Resent");

    // Reset timer
    setTimeLeft(180);
    setCanResend(false);
  };

  const sharedProps = {
    onChange: (text) => console.log("onChange:", text),
    onInput: (value) => console.log("onInput:", value),
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
              A code has been sent to your email, please copy
              <br /> and enter the code for verification
            </p>
          </div>

          <form className="flex justify-center items-center flex-col gap-5 mt-10">
            <Flex gap="medium" align="flex-start" vertical>
              <Input.OTP
                formatter={(str) => str.toUpperCase()}
                {...sharedProps}
              />
            </Flex>

            <div className="flex flex-col items-center gap-2 mt-6">
              <div className="text-center">
                {/* Only show timer if not ready to resend */}
                {!canResend && (
                  <p className="text-[#15BE87] font-bold text-lg mb-1">
                    {formatTime(timeLeft)}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={handleResend}
                disabled={!canResend}
                className={`text-lg font-bold transition-colors duration-300 ${
                  canResend
                    ? "text-[#15BE87] hover:underline cursor-pointer"
                    : "text-[#999999] cursor-not-allowed"
                }`}
              >
                {canResend ? "Resend code now" : "Resend again?"}
              </button>
            </div>

            <div className="flex flex-col justify-center items-center mt-8 w-full">
                <Link href="new-password" className="h-11 w-full max-w-[400px] ">
              <Button
                type="primary"
                htmlType="submit"
                className="h-11 w-full max-w-[400px] !bg-[#060853] !border-none font-bold text-base rounded-lg mb-3 shadow-md"
              >
                Submit
              </Button>
                </Link>
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

export default Page;
