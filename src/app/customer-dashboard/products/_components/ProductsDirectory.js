"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Car,
  ChevronDown,
  Ellipsis,
  House,
  MapPin,
  Scissors,
  Search,
  ShoppingBag,
  Soup,
} from "lucide-react";
import ListingCard from "./ListingCard";

const categoryIcons = [Soup, ShoppingBag, House, Scissors, Car, Ellipsis];
const quickCategories = ["Events", "Bakery", "Bar", "Bank", "Auto Service", "Home & Garden", "Apartment", "Restaurant"];

export default function ProductsDirectory({ categories, newListings, popularListings }) {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const goToCategory = (slug) => router.push(`/customer-dashboard/products/${encodeURIComponent(slug)}`);
  const handleSearch = () => {
    const target = category || categories[0]?.slug;
    if (!target) return;
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (query) params.set("q", query);
    router.push(`/customer-dashboard/products/${encodeURIComponent(target)}${params.size ? `?${params}` : ""}`);
  };

  const visibleNewListings = showAll ? newListings : newListings.slice(0, 6);

  return (
    <div className="space-y-0 bg-white">
      <section className="relative flex min-h-[560px] flex-col items-center justify-center overflow-hidden px-5 py-16 text-center">
        <FloatingAvatar src="/images/image9.png" className="left-[7%] top-[7%]" />
        <FloatingAvatar src="/images/image10.png" className="right-[4%] top-[10%]" />
        <FloatingAvatar src="/images/image11.png" className="left-[2%] top-[30%]" />
        <FloatingAvatar src="/images/image12.png" className="right-[1%] top-[37%]" />

        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef0ff]">
          <span className="h-5 w-5 rounded-md border-[6px] border-[#060853]" />
        </div>
        <h1 className="max-w-2xl text-3xl font-extrabold leading-tight text-black sm:text-4xl">
          Search over <span className="text-[#13bd88]">30,000+</span> businesses in
          <br className="hidden sm:block" /> the world through joe-praise
        </h1>

        <div className="mt-9 flex w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-[#eff0f4] bg-[#fafbfe] shadow-sm md:flex-row">
          <label className="flex h-14 flex-1 items-center gap-2 border-b px-4 md:border-b-0 md:border-r">
            <MapPin size={15} />
            <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" className="min-w-0 flex-1 bg-transparent text-xs outline-none" />
          </label>
          <label className="flex h-14 flex-1 items-center gap-2 border-b px-4 md:border-b-0 md:border-r">
            <ShoppingBag size={15} />
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="min-w-0 flex-1 bg-transparent text-xs outline-none">
              <option value="">Category</option>
              {categories.map((item) => <option key={item._id} value={item.slug}>{item.name}</option>)}
            </select>
          </label>
          <label className="flex h-14 flex-[1.2] items-center px-4">
            <input value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} placeholder="Search here..." className="min-w-0 flex-1 bg-transparent text-xs outline-none" />
          </label>
          <button onClick={handleSearch} className="m-1.5 flex h-11 items-center justify-center gap-2 rounded-lg bg-[#060853] px-7 text-xs text-white">
            Search <Search size={13} />
          </button>
        </div>

        <div className="mt-7 flex max-w-3xl flex-wrap justify-center gap-2">
          {quickCategories.map((item) => {
            const matching = categories.find((cat) => cat.name.toLowerCase().includes(item.toLowerCase().split(" ")[0]));
            return (
              <button key={item} onClick={() => matching && goToCategory(matching.slug)} className="rounded-full border border-[#e1e4e9] bg-[#fafbfe] px-5 py-2 text-[10px] text-[#50545b]">
                {item}
              </button>
            );
          })}
          <button className="rounded-full bg-[#f3f5f8] px-5 py-2 text-[10px]">More</button>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-5 bg-[#F8FAFC] px-4 py-14 sm:grid-cols-3 xl:grid-cols-6">
        {categories.slice(0, 6).map((item, index) => {
          const Icon = categoryIcons[index] || Ellipsis;
          return (
            <button key={item._id} onClick={() => goToCategory(item.slug)} className="flex h-40 flex-col items-center justify-between rounded-sm border border-[#dde0e5] bg-white px-4 py-7 transition-shadow hover:shadow-md">
              <span className="text-sm font-bold text-black">{item.name}</span>
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f5e5e6] text-[#a31e26]"><Icon size={24} /></span>
            </button>
          );
        })}
      </section>

      <ListingSection eyebrow="Our latest listing" title="New Listings in our Directory" listings={visibleNewListings} />
      {newListings.length > 6 && (
        <button onClick={() => setShowAll((value) => !value)} className="mx-auto mb-12 flex items-center gap-2 text-xs font-semibold text-[#1766ee]">
          {showAll ? "Show fewer listings" : "Show more listing"} <ChevronDown size={13} className={showAll ? "rotate-180" : ""} />
        </button>
      )}
      <ListingSection eyebrow="Popular listing" title="Popular Listings in our Directory" listings={popularListings.slice(0, 3)} muted />
    </div>
  );
}

function ListingSection({ eyebrow, title, listings, muted = false }) {
  return (
    <section className={`px-5 py-14 sm:px-10 ${muted ? "bg-[#F8FAFC]" : "bg-white"}`}>
      <div className="mb-8 text-center">
        <p className="text-[11px] font-bold uppercase text-[#11bd89]">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-bold text-black">{title}</h2>
        <p className="mt-3 text-xs text-[#74777d]">Discover trusted businesses, products and services in our growing directory</p>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {listings.map((business) => <ListingCard key={business._id} business={business} />)}
      </div>
    </section>
  );
}

function FloatingAvatar({ src, className }) {
  return (
    <div className={`absolute hidden h-10 w-10 overflow-hidden rounded-full border-2 border-white shadow-md md:block ${className}`}>
      <Image src={src} alt="" fill sizes="40px" className="object-cover" />
    </div>
  );
}
