"use client";

import { useSyncExternalStore } from "react";
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
  "/privacy-policy",
  "/terms-of-use",
  "/cookie-policy",
];

const footerLinks = [
  "/",
  "/support",
  "/who-we-are",
  "/list-your-business",
  "/privacy-policy",
  "/terms-of-use",
  "/cookie-policy",
  "/policies/reviews",
  "/policies/acceptable-use",
  "/policies/community-guidelines",
];

const subscribeToLocation = (callback) => {
  window.addEventListener("popstate", callback);
  return () => window.removeEventListener("popstate", callback);
};

const getEmbeddedSnapshot = () =>
  new URLSearchParams(window.location.search).get("embedded") === "1";

const getServerEmbeddedSnapshot = () => false;

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const isEmbeddedPolicy = useSyncExternalStore(
    subscribeToLocation,
    getEmbeddedSnapshot,
    getServerEmbeddedSnapshot,
  );
  const showNavbar =
    !isEmbeddedPolicy &&
    (navLinks.includes(pathname) ||
      pathname.startsWith("/business-details/") ||
      pathname.startsWith("/policies/"));
  const showCart =
    pathname.startsWith("/business-details/") &&
    pathname !== "/business-details";
  const showFooter = !isEmbeddedPolicy && footerLinks.includes(pathname);

  return (
    <>
      <AuthInitializer />
      {showNavbar && <NaveBar showCart={showCart} />}
      <main className="grow">{children}</main>
      {showFooter && <Footer />}
    </>
  );
}
