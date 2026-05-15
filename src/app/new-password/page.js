// "use client";
// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { Input, Button, Flex } from "antd";
// import Link from "next/link";

// const Page = () => {
//   return (
//     <div className="h-screen w-full flex flex-col md:flex-row bg-white font-sans overflow-hidden">
//       {/* LEFT SIDE: FORM */}
//       <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center px-6 lg:px-16 py-6">
//         <div className="w-full max-w-xl flex flex-col h-full max-h-[850px]">
//           <div className="mb-10">
//             <img src="/images/logo.png" alt="logo" className="w-18" />
//           </div>

//           <div className="mb-6">
//             <h1 className="text-3xl font-extrabold text-center text-[#15BE87] tracking-tight">
//               New Password
//             </h1>
//           </div>

//           <form className="flex justify-center items-center flex-col gap-5 mt-10">
//             <div className="flex flex-col justify-center items-center mt-8 w-full gap-5">
              
//               {/* --- PASSWORD INPUTS START --- */}
//               <div className="w-full max-w-[400px] flex flex-col gap-1.5">
//                 <label className="text-[13px] font-semibold text-black tracking-widest ml-1">
//                  New Password
//                 </label>
//                 <Input.Password 
//                   placeholder="Enter new password" 
//                   className="h-11! rounded-lg! border-slate-200!"
//                 />
//               </div>

//               <div className="w-full max-w-[400px] flex flex-col gap-1.5">
//                 <label className="text-[13px] font-semibold text-black tracking-widest ml-1">
//                   Confirm Password
//                 </label>
//                 <Input.Password 
//                   placeholder="Confirm new password" 
//                   className="h-11! rounded-lg! border-slate-200!"
//                 />
//               </div>
//               {/* --- PASSWORD INPUTS END --- */}

//               <Link href="verification-successful" title="reset" className="h-11 w-full max-w-[400px]">
//                 <Button
//                   type="primary"
//                   htmlType="submit"
//                   className="h-11 w-full max-w-[400px] !bg-[#060853] !border-none font-bold text-base rounded-lg mb-3 shadow-md"
//                 >
//                   Reset Password
//                 </Button>
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* RIGHT SIDE IMAGE */}
//       <div className="hidden md:block md:w-1/2 h-screen relative">
//         <Image
//           src="/images/new-password.png"
//           alt="Verification"
//           fill
//           className="object-cover"
//           priority
//         />
//         <div className="absolute inset-0 bg-black/5" />
//       </div>
//     </div>
//   );
// };

// export default Page;


"use client";
import React, { useState, Suspense } from "react";
import Image from "next/image";
import { Input, Button, message } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/api/axios";

const NewPasswordContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get data passed from the Verification Page
  const email = searchParams.get("email");
  const code = searchParams.get("code");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return message.error("Passwords do not match!");
    }
    if (password.length < 6) {
      return message.error("Password must be at least 6 characters");
    }

    setLoading(true);
    try {
      // Final API call to reset the password
      await api.post("/auth/reset-password", {
        email,
        code,
        newPassword: password
      });

      message.success("Password reset successful!");
      router.push("/login"); // Redirect to login after success
    } catch (error) {
      message.error(error.response?.data?.message || "Reset failed. Please try again.");
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
            <h1 className="text-3xl font-extrabold text-center text-[#15BE87] tracking-tight">
              New Password
            </h1>
          </div>

          <form onSubmit={handleReset} className="flex justify-center items-center flex-col gap-5 mt-10 w-full">
            <div className="flex flex-col justify-center items-center w-full gap-5">
              <div className="w-full max-w-[400px] flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-black tracking-widest ml-1">
                  New Password
                </label>
                <Input.Password 
                  placeholder="Enter new password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11! rounded-lg! border-slate-200!"
                />
              </div>

              <div className="w-full max-w-[400px] flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-black tracking-widest ml-1">
                  Confirm Password
                </label>
                <Input.Password 
                  placeholder="Confirm new password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-11! rounded-lg! border-slate-200!"
                />
              </div>

              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="h-11 w-full max-w-[400px] !bg-[#060853] !border-none font-bold text-base rounded-lg mb-3 shadow-md"
              >
                Reset Password
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden md:block md:w-1/2 h-screen relative">
        <Image src="/images/new-password.png" alt="New Password" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/5" />
      </div>
    </div>
  );
};

// Suspense wrapper for searchParams
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewPasswordContent />
    </Suspense>
  );
}