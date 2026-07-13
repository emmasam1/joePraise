
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

  const showNavbar = navLinks.includes(pathname);
  const showFooter = footerLinks.includes(pathname);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">

        {/* Initialize auth */}
        <AuthInitializer />

        {showNavbar && <NaveBar />}

        <main className="grow">
          {children}
        </main>

        {showFooter && <Footer />}

      </body>
    </html>
  );
}