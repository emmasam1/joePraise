

// "use client";
// import Link from 'next/link';
// import React, { Suspense } from 'react';
// import Image from 'next/image';
// import { useSearchParams } from 'next/navigation';
// import { useAuthStore } from '@/store/authStore';

// const SuccessContent = () => {
//   const user = useAuthStore((state) => state.user);
//   const searchParams = useSearchParams();
//   const type = searchParams.get("type");

//   // Determine the destination dynamically based on registration journey context
//   const getDestination = () => {
//     if (!user) return "/login";
    
//     // ⚡ If they are a verified merchant with business details unsubmitted, force them to Step 2
//     if (type === "business_onboarding" || user.onboardingStep === "business_personal") {
//       return "/business-onboarding"; // 👈 Your exact frontend Route for business onboarding step 2 form
//     }

//     if (user.role === 'admin') return "/admin-dashboard";
//     if (user.role === 'business') return "/dashboard";
//     return "/"; // Standard 'user' role goes to landing page
//   };

//   const getLinkText = () => {
//     if (type === "business_onboarding" || user?.onboardingStep === "business_personal") {
//       return "Continue Business Onboarding";
//     }
//     if (user?.role === 'business' || user?.role === 'admin') {
//       return "Proceed to Dashboard";
//     }
//     return "Proceed to Home";
//   };

//   return (
//     <div className='flex gap-5 justify-center items-center flex-col bg-[#E8FFF7] h-screen w-full font-sans'>
//       <h1 className="text-4xl font-extrabold text-center text-[#15BE87] tracking-tight">
//         Email Verification
//       </h1>

//       <Image 
//         src="/images/success_icon.png" 
//         width={200} 
//         height={200} 
//         alt="successIcon" 
//         className='my-5 animate-bounce'
//         priority
//       />

//       <p className='text-[#4A4A4A] text-2xl font-bold'>Congratulations</p>
//       <span className='text-[#4A4A4A] text-lg text-center tracking-wide'>
//         Your email has been successfully<br/> verified.
//       </span>

//       <Link 
//         href={getDestination()} 
//         className='text-[#15BE87] underline font-semibold text-lg hover:text-[#0f9468] transition-colors mt-4'
//       >
//         {getLinkText()}
//       </Link>
//     </div>
//   );
// };

// export default function VerificationSuccessPage() {
//   return (
//     <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading confirmation workspace...</div>}>
//       <SuccessContent />
//     </Suspense>
//   );
// }

"use client";
import Link from 'next/link';
import React, { Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

const SuccessContent = () => {
  const user = useAuthStore((state) => state.user);
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const redirectTo = searchParams.get("redirect"); // NEW

  const getDestination = () => {
    if (!user) return "/login";

    // NEW: explicit redirect always wins, unless they're mid-business-onboarding
    // (that flow should still complete first before bouncing to checkout).
    if (redirectTo && type !== "business_onboarding" && user.onboardingStep !== "business_personal") {
      return redirectTo;
    }

    if (type === "business_onboarding" || user.onboardingStep === "business_personal") {
      return "/business-onboarding";
    }

    if (user.role === 'admin') return "/admin-dashboard";
    if (user.role === 'business') return "/dashboard";
    return "/";
  };

  const getLinkText = () => {
    if (type === "business_onboarding" || user?.onboardingStep === "business_personal") {
      return "Continue Business Onboarding";
    }
    if (redirectTo) {
      return "Continue to Checkout";
    }
    if (user?.role === 'business' || user?.role === 'admin') {
      return "Proceed to Dashboard";
    }
    return "Proceed to Home";
  };

  return (
    <div className='flex gap-5 justify-center items-center flex-col bg-[#E8FFF7] h-screen w-full font-sans'>
      <h1 className="text-4xl font-extrabold text-center text-[#15BE87] tracking-tight">
        Email Verification
      </h1>

      <Image 
        src="/images/success_icon.png" 
        width={200} 
        height={200} 
        alt="successIcon" 
        className='my-5 animate-bounce'
        priority
      />

      <p className='text-[#4A4A4A] text-2xl font-bold'>Congratulations</p>
      <span className='text-[#4A4A4A] text-lg text-center tracking-wide'>
        Your email has been successfully<br/> verified.
      </span>

      <Link 
        href={getDestination()} 
        className='text-[#15BE87] underline font-semibold text-lg hover:text-[#0f9468] transition-colors mt-4'
      >
        {getLinkText()}
      </Link>
    </div>
  );
};

export default function VerificationSuccessPage() {
  return (
    <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading confirmation workspace...</div>}>
      <SuccessContent />
    </Suspense>
  );
}