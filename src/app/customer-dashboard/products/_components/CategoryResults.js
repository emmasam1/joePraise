"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Grid2X2,
  List,
  MapPin,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useBusinessStore } from "@/store/businessStore";
import ListingCard from "./ListingCard";
import { fallbackCategories, fallbackListings } from "./directoryData";

export default function CategoryResults({ slug, initialLocation, initialQuery }) {
  const router = useRouter();
  const [location, setLocation] = useState(initialLocation);
  const [query, setQuery] = useState(initialQuery);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [page, setPage] = useState(1);

  const {
    publicCategories,
    publicCategoriesLoading,
    fetchPublicCategories,
    categoryBusinesses,
    categoryInfo,
    categoryPagination,
    categoryLoading,
    fetchBusinessesByCategory,
  } = useBusinessStore();

  useEffect(() => {
    fetchPublicCategories().catch(() => {});
  }, [fetchPublicCategories]);

  useEffect(() => {
    fetchBusinessesByCategory(slug, {
      location: initialLocation || undefined,
      q: initialQuery || undefined,
      page,
      limit: 9,
    }).catch(() => {});
  }, [fetchBusinessesByCategory, initialLocation, initialQuery, page, slug]);

  const categories = publicCategories.length ? publicCategories : fallbackCategories;
  const sourceListings = categoryBusinesses.length ? categoryBusinesses : fallbackListings;
  const listings = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return sourceListings;
    return sourceListings.filter((item) =>
      [item.businessName, item.description, item.category?.[0]?.name]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(normalizedQuery)),
    );
  }, [query, sourceListings]);

  const activeName =
    categoryInfo?.name ||
    categories.find((item) => item.slug === slug)?.name ||
    slug.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

  const applyFilters = () => {
    setPage(1);
    fetchBusinessesByCategory(slug, {
      location: location || undefined,
      q: query || undefined,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
      page: 1,
      limit: 9,
    }).catch(() => {});
  };

  return (
    <div className="min-h-full bg-[#f8fafc] px-4 py-2 sm:px-6">
      <Link href="/customer-dashboard/products" className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-[#60656d] hover:text-[#060853]">
        <ArrowLeft size={15} /> Back to Products/Services
      </Link>

      <section className="rounded-2xl bg-white px-5 py-9 text-center shadow-sm">
        <h1 className="text-2xl font-extrabold text-[#17171b]">{activeName}</h1>
        <p className="mt-2 text-xs text-[#777b82]">Discover trusted businesses and services in this category</p>

        <div className="mx-auto mt-7 flex max-w-3xl flex-col overflow-hidden rounded-xl border border-[#e4e6eb] bg-[#fafbfe] md:flex-row">
          <label className="flex h-12 flex-1 items-center gap-2 border-b px-4 md:border-b-0 md:border-r">
            <MapPin size={15} className="text-[#6d727a]" />
            <input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Location" className="min-w-0 flex-1 bg-transparent text-xs outline-none" />
          </label>
          <label className="flex h-12 flex-[1.5] items-center gap-2 px-4">
            <Search size={15} className="text-[#6d727a]" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => event.key === "Enter" && applyFilters()} placeholder={`Search ${activeName}...`} className="min-w-0 flex-1 bg-transparent text-xs outline-none" />
          </label>
          <button onClick={applyFilters} className="m-1.5 rounded-lg bg-[#060853] px-8 py-2 text-xs text-white">Search</button>
        </div>
      </section>

      <div className="mt-7 flex flex-col gap-7 lg:flex-row lg:items-start">
        <aside className="w-full shrink-0 rounded-2xl border border-[#eceef2] bg-white p-5 shadow-sm lg:sticky lg:top-4 lg:w-60">
          <button onClick={() => setFiltersOpen((value) => !value)} className="flex w-full items-center justify-between border-b border-[#edf0f3] pb-4 text-xs font-bold uppercase tracking-wider">
            <span className="flex items-center gap-2"><SlidersHorizontal size={15} /> Filter</span>
            {filtersOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>

          {filtersOpen && (
            <div className="mt-5 space-y-6">
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase text-[#8a8e95]">Price</p>
                <div className="flex gap-2">
                  <input type="number" value={minPrice} onChange={(event) => setMinPrice(event.target.value)} placeholder="MIN" className="w-1/2 rounded-lg bg-[#f8f9fb] p-2 text-[10px] outline-none" />
                  <input type="number" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} placeholder="MAX" className="w-1/2 rounded-lg bg-[#f8f9fb] p-2 text-[10px] outline-none" />
                </div>
              </div>

              <div>
                <p className="mb-3 text-[10px] font-bold uppercase text-[#8a8e95]">Category</p>
                <div className="space-y-3">
                  {publicCategoriesLoading && !publicCategories.length ? (
                    <div className="h-24 animate-pulse rounded-lg bg-[#f4f5f8]" />
                  ) : categories.map((item) => (
                    <label key={item._id} className="flex cursor-pointer items-center gap-2 text-xs text-[#595d64]">
                      <input
                        type="radio"
                        name="category"
                        checked={item.slug === slug}
                        onChange={() => router.push(`/customer-dashboard/products/${item.slug}`)}
                        className="accent-[#060853]"
                      />
                      {item.name}
                    </label>
                  ))}
                </div>
              </div>

              <button onClick={applyFilters} className="w-full rounded-lg bg-[#060853] py-2.5 text-xs font-semibold text-white">Apply Filters</button>
            </div>
          )}
        </aside>

        <main className="min-w-0 flex-1">
          <div className="mb-5 flex items-center justify-between">
            <p className="text-xs text-[#777b82]"><strong className="text-[#22252a]">{categoryPagination.total || listings.length}</strong> {activeName} listings</p>
            <div className="flex gap-2">
              <button aria-label="Grid view" className="flex h-9 w-9 items-center justify-center rounded-md bg-[#060853] text-white"><Grid2X2 size={16} /></button>
              <button aria-label="List view" className="flex h-9 w-9 items-center justify-center rounded-md border border-[#dfe2e7] bg-white"><List size={17} /></button>
            </div>
          </div>

          {categoryLoading && !categoryBusinesses.length ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => <div key={item} className="h-[370px] animate-pulse rounded-lg bg-[#e9ecf1]" />)}
            </div>
          ) : listings.length ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {listings.map((business) => <ListingCard key={business._id} business={business} />)}
            </div>
          ) : (
            <div className="rounded-2xl border border-[#eceef2] bg-white p-16 text-center text-sm text-[#858991]">No businesses found matching your filters.</div>
          )}

          {categoryPagination.pages > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              {Array.from({ length: categoryPagination.pages }, (_, index) => index + 1).slice(0, 6).map((number) => (
                <button key={number} onClick={() => setPage(number)} className={`h-9 w-9 rounded-md text-xs ${page === number ? "bg-[#060853] text-white" : "bg-white text-[#555b64]"}`}>
                  {number}
                </button>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
