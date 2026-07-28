"use client";

import { usePathname } from "next/navigation";
import AuthInitializer from "@/components/AuthInitializer";
import Footer from "@/components/Footer";
import NaveBar from "@/components/NaveBar";

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

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const showNavbar =
    navLinks.includes(pathname) || pathname.startsWith("/business-details/");
  const showCart =
    pathname.startsWith("/business-details/") &&
    pathname !== "/business-details";
  const showFooter = footerLinks.includes(pathname);

  return (
    <>
      <AuthInitializer />
      {showNavbar && <NaveBar showCart={showCart} />}
      <main className="grow">{children}</main>
      {showFooter && <Footer />}
    </>
  );
}
