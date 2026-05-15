
"use client";
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { useAuthStore } from '@/store/authStore';

const VerificationSuccessPage = () => {
  const user = useAuthStore((state) => state.user);

  // Determine the destination based on role
  // Default to home "/" if user is not a business yet
  const getDestination = () => {
    if (!user) return "/login";
    if (user.role === 'admin') return "/admin-dashboard";
    if (user.role === 'business') return "/dashboard";
    return "/"; // Standard 'user' role goes to landing page
  };

  const getLinkText = () => {
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

export default VerificationSuccessPage;