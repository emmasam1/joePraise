"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  Grid2X2,
  Heart,
  HelpCircle,
  LogOut,
  Menu,
  Search,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Tag,
  X,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";

const menuItems = [
  { label: "Overview", href: "/customer-dashboard", icon: Grid2X2 },
  { label: "Orders", href: "/customer-dashboard/orders", icon: ShoppingBag },
  { label: "Products/Services", href: "/customer-dashboard/products", icon: Tag },
  { label: "Wishlist", href: "/customer-dashboard/wishlist", icon: Heart },
];

const generalItems = [
  { label: "Settings", href: "/customer-dashboard/settings", icon: Settings },
  { label: "Support", href: "/support", icon: HelpCircle },
];

export default function CustomerDashboardShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { cart, fetchCart } = useCartStore();

    useEffect(() => {
      if ( isAuthenticated) {
        fetchCart().catch(() => {});
      }
    }, [fetchCart, isAuthenticated ]);
  
    const cartItemCount = cart?.items?.length || 0;

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const displayName = user?.name || "Bie Edward";
  const avatarUrl = user?.avatar?.url;

    const handleLogout = () => {
    logout();
    router.push("/");
  };

  const sidebar = (
    <aside className="flex h-full w-64 shrink-0 flex-col rounded-lg border border-gray-100 bg-white">
      <div className="flex h-24 items-center justify-center">
        <Image src="/images/logo_sm.png" alt="JoePraise" width={46} height={40} className="h-10 w-auto object-contain" />
      </div>

      <div className="flex flex-1 flex-col px-3 pb-8">
        <p className="mb-5 px-3 text-sm font-semibold uppercase text-[#505050]">Menu</p>
        <nav className="space-y-2">
          {menuItems.map(({ label, href, icon: Icon }) => {
            const active =
              href === "/customer-dashboard"
                ? pathname === href
                : pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={label}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={`flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors ${
                  active ? "bg-[#060853] text-white" : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <Icon size={20} strokeWidth={1.7} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto">
          <p className="mb-5 px-3 text-sm font-semibold uppercase text-[#505050]">General</p>
          <nav className="space-y-2">
            {generalItems.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className="flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50"
              >
                <Icon size={20} strokeWidth={1.6} />
                <span>{label}</span>
              </Link>
            ))}
            <button onClick={handleLogout} className="flex h-11 w-full cursor-pointer items-center gap-3 rounded-lg px-3 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50">
              <LogOut size={20} strokeWidth={1.6} />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] p-4 text-[#171717] lg:h-screen lg:overflow-hidden">
      <div className="hidden lg:block">{sidebar}</div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/30 lg:hidden">
          {sidebar}
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setSidebarOpen(false)}
            className="m-4 flex h-10 w-10 items-center justify-center rounded-full bg-white"
          >
            <X size={20} />
          </button>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col lg:ml-5">
        <header className="flex h-20 shrink-0 items-center justify-between rounded-lg border border-gray-100 bg-white px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setSidebarOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 lg:hidden"
            >
              <Menu size={20} />
            </button>
            <label className="hidden h-10 w-52 items-center gap-3 rounded-full bg-gray-50 px-4 sm:flex">
              <Search size={21} strokeWidth={1.8} />
              <input aria-label="Search" placeholder="Search" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#555]" />
            </label>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <NotificationIcon icon={ShoppingCart} count={cartItemCount} label="Cart" href="/cart" />
            <NotificationIcon icon={Bell} count={0} label="Notifications" href="/notifications" />
            <div className="flex min-w-0 items-center gap-3 rounded-full border border-gray-100 bg-white py-1.5 pl-2 pr-4 shadow-sm">
              <div className="relative h-9 w-9 overflow-hidden rounded-full bg-[#dff7f4]">
                {avatarUrl ? (
                  <Image src={avatarUrl} alt={displayName} fill sizes="36px" className="object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#19b9b6] text-sm font-bold text-white">
                    {displayName.charAt(0)}
                  </div>
                )}
              </div>
              <div className="hidden min-w-20 sm:block">
                <p className="truncate text-xs font-medium text-[#282828]">{displayName}</p>
                <p className="mt-0.5 text-[10px] text-[#8b8b91]">Customer</p>
              </div>
            </div>
          </div>
        </header>

        <main className="mt-5 flex-1 overflow-y-auto pb-8">{children}</main>
      </div>
    </div>
  );
}

function NotificationIcon({ icon: Icon, count, label, href }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="relative inline-block text-[#111]"
    >
      <Icon size={27} strokeWidth={1.7} />

      {count > 0 && (
        <span className="absolute -right-2 -top-1 rounded-full bg-[#060853] px-1.5 py-0.5 text-[8px] leading-none text-white">
          {count}
        </span>
      )}
    </Link>
  );
}

// function NotificationIcon({ icon: Icon, count, label }) {
//   return (
//     <button type="button" aria-label={label} className="relative text-[#111]">
//       <Icon size={27} strokeWidth={1.7} />
//       <span className="absolute -right-2 -top-1 rounded-full bg-[#060853] px-1.5 py-0.5 text-[8px] leading-none text-white">
//         {count}
//       </span>
//     </button>
//   );
// }
