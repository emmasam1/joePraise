"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Share2, Star } from "lucide-react";
import { fallbackListings } from "../products/_components/directoryData";

const tabs = ["Businesses", "Products", "Services", "Digital Services"];

const wishlistItems = {
  Products: Array.from({ length: 9 }, (_, index) => ({
    id: `product-${index + 1}`,
    title: "Aurora Scents & Textures",
    description: 'Pre-configured lighting sets designed to create specific "moods" (e.g., "The Morning Glow" or "Focus Mode") using smart-glass technology.',
    image: ["/images/image3.png", "/images/image5.png", "/images/image7.png"][index % 3],
    price: "$100",
  })),
  Services: Array.from({ length: 6 }, (_, index) => ({
    id: `service-${index + 1}`,
    title: ["Home Cleaning Service", "Beauty Consultation", "Automotive Repair"][index % 3],
    description: "Reliable, professionally delivered service tailored to your schedule and specific requirements.",
    image: ["/images/image13.png", "/images/image7.png", "/images/image8.png"][index % 3],
    price: ["$80", "$120", "$150"][index % 3],
  })),
  "Digital Services": Array.from({ length: 6 }, (_, index) => ({
    id: `digital-${index + 1}`,
    title: ["Brand Identity Kit", "Social Media Strategy", "Website Audit"][index % 3],
    description: "A complete digital solution created to strengthen your business presence and customer experience.",
    image: ["/images/image3.png", "/images/image4.png", "/images/image6.png"][index % 3],
    price: ["$75", "$100", "$140"][index % 3],
  })),
};

const businessWishlist = [...fallbackListings, ...fallbackListings].map((item, index) => ({
  ...item,
  _id: `${item._id}-${index}`,
}));

export default function CustomerWishlistPage() {
  const [activeTab, setActiveTab] = useState("Businesses");
  const [removedIds, setRemovedIds] = useState([]);

  const removeItem = (id) => {
    setRemovedIds((current) => [...current, id]);
  };

  const currentItems =
    activeTab === "Businesses"
      ? businessWishlist.filter((item) => !removedIds.includes(item._id))
      : wishlistItems[activeTab].filter((item) => !removedIds.includes(item.id));

  return (
    <div className="min-h-full pb-10">
      <div className="border-b border-[#e9eaee] pt-7">
        <div className="flex min-w-max justify-end gap-3 overflow-x-auto pr-3 sm:gap-8">
          {tabs.map((tab) => {
            const active = activeTab === tab;
            return (
              <button
                type="button"
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-3 pb-4 text-base font-bold transition-colors sm:px-5 sm:text-lg ${
                  active ? "text-[#17172b]" : "text-[#a6a8af] hover:text-[#777a83]"
                }`}
              >
                {tab}
                {active && (
                  <motion.span
                    layoutId="customerWishlistActiveTab"
                    className="absolute inset-x-0 -bottom-px h-[3px] rounded-full bg-[#060853]"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className="pt-12"
        >
          {currentItems.length === 0 ? (
            <EmptyWishlist activeTab={activeTab} />
          ) : activeTab === "Businesses" ? (
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
              {currentItems.map((business) => (
                <WishlistBusinessCard key={business._id} business={business} onRemove={() => removeItem(business._id)} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {currentItems.map((item) => (
                <WishlistItemCard key={item.id} item={item} activeTab={activeTab} onRemove={() => removeItem(item.id)} />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function WishlistBusinessCard({ business, onRemove }) {
  const category = business.category?.[0]?.name || "Local business";
  const image = business.banner || business.logo || "/images/image3.png";

  return (
    <article className="flex min-h-[500px] flex-col overflow-hidden rounded-lg border border-[#dde0e5] bg-white">
      <div className="flex items-center gap-3 px-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e1f5f1] text-sm font-bold text-[#060853]">
          {(business.update || "C").charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-[#0bb888]">{business.update || "Claire C. added 2 photos"}</p>
          <p className="mt-0.5 text-xs text-[#858992]">{business.updateTime || "1 minute ago"}</p>
        </div>
      </div>

      <div className="relative h-56 w-full bg-[#f0f1f4]">
        <Image src={image} alt={business.businessName} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" unoptimized />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <Link href={`/business-details/${business._id.split("-")[0]}`} className="text-xl font-bold text-[#17171b] hover:text-[#060853]">
          {business.businessName}
        </Link>
        <div className="mt-2 flex items-center gap-1">
          {[0, 1, 2, 3, 4].map((index) => (
            <Star key={index} size={15} className={index < Math.round(business.rating || 0) ? "fill-[#a3151d] text-[#a3151d]" : "text-[#060853]"} />
          ))}
          <span className="ml-2 text-xs text-[#7d8189]">{business.numReviews || 0}</span>
        </div>
        <p className="mt-1 text-sm text-[#666a72]">$$ • {category}</p>
        {business.description && (
          <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#666a72]">
            {business.description} <span className="font-semibold text-[#060853]">Read more</span>
          </p>
        )}

        <div className="mt-auto flex justify-end gap-5 border-t border-[#eceef1] pt-4 text-[#707782]">
          <button type="button" onClick={onRemove} aria-label={`Remove ${business.businessName} from wishlist`}>
            <Heart size={21} className="fill-[#0aaa7e] text-[#0aaa7e]" />
          </button>
          <button type="button" aria-label={`Share ${business.businessName}`}><Share2 size={18} /></button>
        </div>
      </div>
    </article>
  );
}

function WishlistItemCard({ item, activeTab, onRemove }) {
  const actionLabel = activeTab === "Products" || activeTab === "Digital Services" ? "Add to Cart" : "Book Now";

  return (
    <article className="rounded-3xl border border-[#dfe2e3] bg-[#f1f4f3] p-4">
      <div className="flex gap-4">
        <div className="relative h-36 w-[52%] shrink-0 overflow-hidden rounded-lg bg-[#dfe1e2]">
          <Image src={item.image} alt={item.title} fill sizes="220px" className="object-cover" />
        </div>
        <div className="min-w-0">
          <h2 className="text-base font-bold leading-5 text-black">{item.title}</h2>
          <p className="mt-4 line-clamp-5 text-xs leading-5 text-[#3d4145]">{item.description}</p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <button type="button" onClick={onRemove} aria-label={`Remove ${item.title} from wishlist`}>
          <Heart size={22} className="fill-[#08a878] text-[#08a878]" />
        </button>
        <div className="ml-auto flex items-center gap-5">
          <span className="text-2xl font-bold text-black">{item.price}</span>
          <button type="button" className="rounded-lg bg-[#060853] px-4 py-2 text-xs font-semibold text-white hover:bg-[#111175]">
            {actionLabel}
          </button>
        </div>
      </div>
    </article>
  );
}

function EmptyWishlist({ activeTab }) {
  return (
    <div className="flex min-h-[430px] flex-col items-center justify-center text-center">
      <Heart size={54} className="text-[#c7cad0]" />
      <h2 className="mt-5 text-xl font-bold text-[#24242a]">No saved {activeTab.toLowerCase()} yet</h2>
      <p className="mt-2 text-sm text-[#7a7e86]">Items you save will appear here.</p>
      <Link href="/customer-dashboard/products" className="mt-6 rounded-lg bg-[#060853] px-7 py-3 text-sm text-white">
        Explore Products/Services
      </Link>
    </div>
  );
}
