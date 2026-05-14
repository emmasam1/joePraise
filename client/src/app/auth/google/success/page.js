"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Spin, message } from "antd";

const GoogleSuccess = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setLoginSuccess = useAuthStore((state) => state.setLoginSuccess);

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const email = searchParams.get("email");
    const avatar = searchParams.get("avatar");

    if (accessToken && id) {
      const userData = {
        id,
        name: decodeURIComponent(name),
        email: decodeURIComponent(email),
        avatar: decodeURIComponent(avatar),
        role: "user" // Default fallback or read directly from parameters if appended by backend
      };

      // Set state in Zustand store
      setLoginSuccess(userData, accessToken);
      message.success("Google Authentication Successful!");
      
      // Redirect to main workspace
      router.push("/dashboard");
    } else {
      message.error("Authentication parameters missed.");
      router.push("/login");
    }
  }, [searchParams, setLoginSuccess, router]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50">
      <Spin size="large" tip="Finalizing login setup..." />
    </div>
  );
};

export default GoogleSuccess;