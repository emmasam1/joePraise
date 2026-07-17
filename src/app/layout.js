"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NaveBar from "@/components/NaveBar";
import Footer from "@/components/Footer";
import AuthInitializer from "@/components/AuthInitializer";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Define links using normal string matches or simple regex checks
  const navLinks = [
    "/",
    "/support",
    "/who-we-are",
    "/list-your-business",
    "/business-details",
  ];

  const footerLinks = [
    "/",
    "/support",
    "/who-we-are",
    "/list-your-business",
  ];

  // Helper to check if pathname is an exact match OR if it starts with dynamic nested segments
  const shouldShowNavbar = () => {
    // Check strict array match
    if (navLinks.includes(pathname)) return true;
    
    // Explicitly handle any sub-route of /business-details/ like /business-details/1234
    if (pathname.startsWith("/business-details/")) return true;
    
    return false;
  };

  const showCart = pathname.startsWith("/business-details/") && pathname !== "/business-details";
  const showNavbar = shouldShowNavbar();
  const showFooter = footerLinks.includes(pathname);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">

        {/* Initialize auth */}
        <AuthInitializer />

        {showNavbar && <NaveBar showCart={showCart} />}

        <main className="grow">
          {children}
        </main>

        {showFooter && <Footer />}

      </body>
    </html>
  );
}