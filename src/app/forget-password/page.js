// "use client";
// import React from "react";
// import Image from "next/image";
// import { Input, Button } from "antd";

// import Link from "next/link";

// const page = () => {
//   //  const [password, setPassword] = useState("");
//   return (
//     <div className="h-screen w-full flex flex-col md:flex-row bg-white font-sans overflow-hidden">
//       {/* LEFT SIDE: FORM */}
//       <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center px-6 lg:px-16 py-6">
//         <div className="w-full max-w-xl flex flex-col h-full max-h-[850px]">
//           <div className="mb-10">
//             <img src="/images/logo.png" alt="logo" className="w-18" />
//           </div>
//           <div className="mb-6">
//             <h1 className="text-3xl font-extrabold text-[#15BE87] tracking-tight">
//               Forget Password?
//             </h1>
//             <p className="text-[#2A2A2A] mt-2">Provide the email address you used <br/>to create your account</p>
//           </div>
//           <form className="flex flex-col gap-5 mt-20!">
//             <div className="flex flex-col gap-1">
//               <label className="text-[#060853] font-bold text-lg">Email</label>
//               <Input
//                 placeholder="Email"
//                 className="h-10 rounded-lg bg-gray-50"
//               />
//             </div>

//             <div className="flex flex-col justify-center items-center mt-10!">
//               <Button
//                 type="primary"
//                 className="h-11! w-100! !bg-[#060853] !border-none font-bold text-base rounded-lg mb-3"
//               >
//                 <Link href="/verification-code">Submit</Link>
//               </Button>
           

//               <p className="text-center text-gray-600 text-sm mt-4">
//                 Remember password?{" "}
//                 <Link
//                   href="/login"
//                   className="text-[#060853] font-bold hover:underline"
//                 >
//                   Login
//                 </Link>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//       {/* RIGHT SIDE IMAGE */}
//       <div className="hidden md:block md:w-1/2 h-screen relative">
//         <Image
//           src="/images/forget_pass.png"
//           alt="Sign Up"
//           fill
//           className="object-cover"
//           priority
//         />
//         <div className="absolute inset-0 bg-black/5" />
//       </div>
//     </div>
//   );
// };

// export default page;


"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Input, Button, message } from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/api/axios";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return message.error("Please enter your email address");

    setLoading(true);
    try {
      // Trigger the OTP email from your backend
      await api.post("/auth/forgot-password", { email });
      message.success("OTP sent to your email!");
      
      // Pass the email and the 'type' to the verification page
      router.push(`/verification-code?email=${encodeURIComponent(email)}&type=reset`);
    } catch (error) {
      message.error(error.response?.data?.message || "Something went wrong");
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
            <h1 className="text-3xl font-extrabold text-[#15BE87] tracking-tight">
              Forget Password?
            </h1>
            <p className="text-[#2A2A2A] mt-2">Provide the email address you used <br/>to create your account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-10">
            <div className="flex flex-col gap-1">
              <label className="text-[#060853] font-bold text-lg">Email</label>
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 rounded-lg bg-gray-50"
                type="email"
                required
              />
            </div>

            <div className="flex flex-col justify-center items-center mt-10">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="h-11! w-full max-w-[400px] !bg-[#060853] !border-none font-bold text-base rounded-lg mb-3"
              >
                Submit
              </Button>
            
              <p className="text-center text-gray-600 text-sm mt-4">
                Remember password?{" "}
                <Link href="/login" className="text-[#060853] font-bold hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden md:block md:w-1/2 h-screen relative">
        <Image src="/images/forget_pass.png" alt="Forget Password" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/5" />
      </div>
    </div>
  );
};

export default ForgetPasswordPage;