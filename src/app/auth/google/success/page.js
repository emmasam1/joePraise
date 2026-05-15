// import { Suspense } from "react";
// import GoogleSuccess from "./GoogleSuccess";


// export default function Page() {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <GoogleSuccess />
//     </Suspense>
//   );
// }

"use client";
import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { message } from "antd";

const GoogleSuccessContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setLoginSuccess = useAuthStore((state) => state.setLoginSuccess);

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const role = searchParams.get("role") || "user"; // Default to user if role not in URL
    
    // Extract user data from URL params sent by your backend
    const userData = {
      _id: searchParams.get("id"),
      name: searchParams.get("name"),
      email: searchParams.get("email"),
      avatar: { url: searchParams.get("avatar") },
      role: role,
    };

    if (accessToken && userData._id) {
      // 1. Save to Zustand & Cookies (Handling role-based persistence)
      setLoginSuccess(userData, accessToken);
      
      message.success(`Welcome back, ${userData.name}!`);

      // 2. Immediate Role-Based Redirect
      if (role === "admin") {
        router.push("/admin");
      } else if (role === "business") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } else {
      message.error("Google authentication failed. Please try again.");
      router.push("/login");
    }
  }, [searchParams, router, setLoginSuccess]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#15BE87]"></div>
      <p className="mt-4 text-gray-600 font-medium">Finalizing your login...</p>
    </div>
  );
};

export default function GoogleSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GoogleSuccessContent />
    </Suspense>
  );
}