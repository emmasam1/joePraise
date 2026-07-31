"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Share2, Star } from "lucide-react";

export default function ListingCard({ business }) {
  const category = business.category?.[0]?.name || "Local business";
  const image = business.banner || business.logo || "/images/image3.png";

  return (
    <article className="flex min-h-[370px] flex-col overflow-hidden rounded-lg border border-[#e3e5e8] bg-white transition-shadow hover:shadow-md">
      <div className="flex items-center gap-2 px-4 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e0f5f1] text-xs font-bold text-[#060853]">
          {(business.update || business.businessName || "B").charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="truncate text-[11px] font-semibold text-[#11b98a]">{business.update || `${business.businessName} added a listing`}</p>
          <p className="text-[9px] text-[#8b8f96]">{business.updateTime || "Recently"}</p>
        </div>
      </div>

      <div className="relative h-44 w-full bg-[#f1f2f5]">
        <Image src={image} alt={business.businessName} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" unoptimized />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <Link href={`/business-details/${business._id}`} className="text-base font-bold text-[#202025] hover:text-[#060853]">
          {business.businessName}
        </Link>
        <div className="mt-1 flex items-center gap-1">
          {[0, 1, 2, 3, 4].map((index) => (
            <Star key={index} size={12} className={index < Math.round(business.rating || 0) ? "fill-[#9f171d] text-[#9f171d]" : "fill-white text-[#a8abb1]"} />
          ))}
          <span className="ml-1 text-[10px] text-[#8a8d94]">{business.numReviews || 0}</span>
        </div>
        <p className="mt-1 text-[10px] text-[#73767c]">$$ • {category}</p>
        {business.description && (
          <p className="mt-3 line-clamp-3 text-[11px] leading-5 text-[#70737a]">
            {business.description} <span className="font-semibold text-[#060853]">Read more</span>
          </p>
        )}
        <div className="mt-auto flex justify-end gap-3 pt-4 text-[#78808c]">
          <button type="button" aria-label="Add to wishlist"><Heart size={16} /></button>
          <button type="button" aria-label="Share listing"><Share2 size={15} /></button>
        </div>
      </div>
    </article>
  );
}
