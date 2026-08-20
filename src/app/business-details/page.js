
"use client";
export const dynamic = "force-dynamic";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  SearchOutlined,
  EnvironmentOutlined,
  AppstoreOutlined,
  StarFilled,
  ShareAltOutlined,
  HeartOutlined,
  UpOutlined,
  DownOutlined,
  LoadingOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Pagination, Spin } from "antd";
import Link from "next/link";
import { useBusinessStore } from "@/store/businessStore";
import CompanyLoader from "@/components/Loader";

function DirectoryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categorySlug = searchParams.get("category");
  const queryText = searchParams.get("q");
  const queryLocation = searchParams.get("location") || "";

  const [categoryOpen, setCategoryOpen] = useState(true);
  const [subCategoryOpen, setSubCategoryOpen] = useState(true);
  const [locationInput, setLocationInput] = useState(queryLocation);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
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
    searchResults,
    searchLoading,
    searchBusinessesPublic,
  } = useBusinessStore();

  useEffect(() => {
    fetchPublicCategories().catch(() => {});
  }, [fetchPublicCategories]);

  useEffect(() => {
    setPage(1);
    setSelectedSubCategory(null);
  }, [categorySlug, queryText]);

  useEffect(() => {
    if (categorySlug) {
      fetchBusinessesByCategory(categorySlug, {
        subCategory: selectedSubCategory || undefined,
        location: locationInput || undefined,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
        page,
        limit: 10,
      });
    } else {
      searchBusinessesPublic({
        q: queryText || undefined,
        location: locationInput || undefined,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorySlug, queryText, selectedSubCategory, page]);

  const activeCategoryDoc = (publicCategories || []).find((c) => c.slug === categorySlug);
  const subCategories = activeCategoryDoc?.subCategories || [];

  const businesses = categorySlug ? categoryBusinesses : searchResults;
  const isLoading = categorySlug ? categoryLoading : searchLoading;
  const total = categorySlug ? categoryPagination.total : businesses.length;
  const heading = categoryInfo?.name || (queryText ? `Results for "${queryText}"` : "All Businesses");

  const handleApplyFilters = () => {
    setPage(1);
    if (categorySlug) {
      fetchBusinessesByCategory(categorySlug, {
        subCategory: selectedSubCategory || undefined,
        location: locationInput || undefined,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
        page: 1,
        limit: 10,
      });
    } else {
      router.push(
        `/business-details?${queryText ? `q=${encodeURIComponent(queryText)}&` : ""}location=${encodeURIComponent(locationInput)}`,
      );
    }
  };

  const handleCategoryCheckbox = (slug) => {
    router.push(`/business-details?category=${encodeURIComponent(slug)}`);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#0F172A] font-sans">
      <div className="max-w-7xl mx-auto pt-10 px-4">
        {/* NEW: Back button */}
        <button
          onClick={() => router.push("/")}
          className="mb-6 inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#060853] transition-colors"
        >
          <ArrowLeftOutlined /> Back to Home
        </button>

        <div className="text-center">
          <h1 className="text-2xl font-black text-[#060853] mb-6">
            Find a business directory
          </h1>

          <div className="inline-flex flex-col md:flex-row bg-white rounded-xl shadow-sm border border-gray-100 p-2 max-w-3xl w-full items-center gap-2">
            <div className="flex items-center gap-2 px-3 border-r border-gray-100 w-full md:w-1/4 py-2">
              <EnvironmentOutlined className="text-gray-400" />
              <input
                type="text"
                placeholder="Location"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                className="text-xs font-bold text-gray-700 outline-none w-full"
              />
            </div>
            <div className="flex items-center gap-2 px-3 border-r border-gray-100 w-full md:w-1/4 py-2">
              <AppstoreOutlined className="text-gray-400" />
              <span className="text-xs font-bold text-gray-700 w-full truncate">
                {categoryInfo?.name || "All Categories"}
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 w-full md:w-2/4 py-2">
              <SearchOutlined className="text-gray-400" />
              <input
                type="text"
                placeholder="Search items..."
                defaultValue={queryText || ""}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    router.push(`/business-details?q=${encodeURIComponent(e.target.value)}`);
                  }
                }}
                className="text-xs font-medium text-gray-700 outline-none w-full"
              />
            </div>
            <button
              onClick={handleApplyFilters}
              className="bg-[#060853] text-white px-6 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 w-full md:w-auto justify-center shadow-sm whitespace-nowrap"
            >
              Search <SearchOutlined />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8 items-start relative">
        {/* LEFT SIDEBAR */}
        <aside className="w-full lg:w-64 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm lg:sticky lg:top-6 shrink-0 space-y-6">
          <div className="border-b border-gray-50 pb-2 mb-2">
            <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest">Filter</h2>
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">
              Price
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="MIN"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 text-[10px] font-bold p-2 rounded-lg text-gray-500 outline-none"
              />
              <input
                type="number"
                placeholder="MAX"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 text-[10px] font-bold p-2 rounded-lg text-gray-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">
              Location
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="City or Region"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 text-[10px] font-medium p-2.5 pl-8 rounded-lg outline-none text-gray-700"
              />
              <SearchOutlined className="absolute left-3 top-3.5 text-gray-400 text-[10px]" />
            </div>
          </div>

          <button
            onClick={handleApplyFilters}
            className="w-full bg-[#060853] text-white text-[10px] font-black py-2.5 rounded-lg"
          >
            Apply Filters
          </button>

          <div>
            <div
              className="flex justify-between items-center cursor-pointer border-b border-gray-50 pb-2 mb-3"
              onClick={() => setCategoryOpen(!categoryOpen)}
            >
              <span className="text-[10px] font-black text-gray-900 uppercase tracking-wider">Category</span>
              {categoryOpen ? <UpOutlined className="text-[8px] text-gray-400" /> : <DownOutlined className="text-[8px] text-gray-400" />}
            </div>

            {categoryOpen && (
              <div className="space-y-2.5 transition-all">
                {publicCategoriesLoading ? (
                  <Spin size="small" indicator={<LoadingOutlined spin />} />
                ) : (
                  (publicCategories || []).map((cat) => (
                    <label
                      key={cat._id}
                      className="flex items-center gap-2.5 text-xs font-bold text-gray-600 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={categorySlug === cat.slug}
                        onChange={() => handleCategoryCheckbox(cat.slug)}
                        className="accent-[#060853] rounded border-gray-200 h-3.5 w-3.5"
                      />
                      {cat.name}
                    </label>
                  ))
                )}
              </div>
            )}
          </div>

          {categorySlug && subCategories.length > 0 && (
            <div>
              <div
                className="flex justify-between items-center cursor-pointer border-b border-gray-50 pb-2 mb-3"
                onClick={() => setSubCategoryOpen(!subCategoryOpen)}
              >
                <span className="text-[10px] font-black text-gray-900 uppercase tracking-wider">Sub Category</span>
                {subCategoryOpen ? <UpOutlined className="text-[8px] text-gray-400" /> : <DownOutlined className="text-[8px] text-gray-400" />}
              </div>

              {subCategoryOpen && (
                <div className="space-y-2.5 transition-all">
                  {subCategories.map((sub) => (
                    <label
                      key={sub._id}
                      className="flex items-center gap-2.5 text-xs font-bold text-gray-500 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedSubCategory === sub.slug}
                        onChange={() =>
                          setSelectedSubCategory((prev) => (prev === sub.slug ? null : sub.slug))
                        }
                        className="accent-[#060853] rounded border-gray-200 h-3.5 w-3.5"
                      />
                      {sub.name}
                    </label>
                  ))}
                </div>
              )}
            </div>
          )}
        </aside>

        {/* RIGHT CONTENT */}
        <main className="flex-1 w-full space-y-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold text-gray-400">
              <span className="text-gray-900 font-extrabold">{total}</span> {heading}
            </span>
          </div>

          {isLoading ? (
            [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm h-44 animate-pulse flex gap-6"
              >
                <div className="w-56 h-full bg-gray-200 rounded-xl shrink-0" />
                <div className="flex-1 space-y-3 py-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-3 bg-gray-200 rounded w-1/4" />
                  <div className="h-3 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            ))
          ) : businesses.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-sm text-gray-400 font-medium">
              No businesses found matching your filters.
            </div>
          ) : (
            businesses.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col md:flex-row gap-6 relative group hover:shadow-md transition-all"
              >
                <div className="w-full md:w-56 h-44 rounded-xl overflow-hidden relative bg-gray-100 shrink-0">
                  <img
                    src={
                      (typeof item.banner === "string" ? item.banner : item.banner?.url) ||
                      (typeof item.logo === "string" ? item.logo : item.logo?.url) ||
                      "/images/business.png"
                    }
                    alt={item.businessName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <Link
                        href={`/business-details/${item._id}`}
                        className="text-base font-black text-gray-900 tracking-tight cursor-pointer hover:text-[#060853]"
                      >
                        {item.businessName}
                      </Link>
                      <div className="flex gap-4 text-gray-400 text-sm">
                        <ShareAltOutlined className="hover:text-gray-600 cursor-pointer" />
                        <HeartOutlined className="hover:text-red-500 cursor-pointer" />
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mt-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <StarFilled
                          key={i}
                          className={`text-xs ${i < Math.floor(item.rating || 0) ? "text-red-700" : "text-gray-200"}`}
                        />
                      ))}
                      <span className="text-xs font-black text-gray-900 ml-1">{item.rating || 0}</span>
                      <span className="text-xs font-bold text-gray-400">({item.numReviews || 0} Reviews)</span>
                    </div>

                    <div className="flex items-center gap-6 text-xs text-gray-400 font-bold mb-3 flex-wrap">
                      <span className="flex items-center gap-1">
                        <EnvironmentOutlined className="text-[10px]" />
                        {item.businessCity || "—"}, {item.businessCountry || ""}
                      </span>
                      {item.trustScore ? (
                        <>
                          <span>•</span>
                          <span className="text-emerald-600">Trust Score: {item.trustScore}</span>
                        </>
                      ) : null}
                    </div>

                    <p className="text-xs text-gray-400 leading-relaxed font-medium mb-4">
                      {(item.description || "").slice(0, 140)}
                      {(item.description || "").length > 140 ? "..." : ""}{" "}
                      <Link
                        href={`/business-details/${item._id}`}
                        className="text-[#10B981] font-black ml-1 hover:underline"
                      >
                        Read More
                      </Link>
                      {/* <Link
                        href={`/business/${item.slug}/${item._id}`}
                        className="text-[#10B981] font-black ml-1 hover:underline"
                      >
                        Read More
                    </Link> */}
                    </p>
                  </div>

                  <div className="flex justify-between items-end pt-2 border-t border-gray-50">
                    <div className="flex gap-2 flex-wrap">
                      {(item.category || []).slice(0, 3).map((cat) => (
                        <span
                          key={cat._id}
                          className="bg-gray-50 border border-gray-100 text-[10px] text-gray-500 font-bold px-3 py-1.5 rounded-full"
                        >
                          {cat.name}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/business-details/${item._id}`}
                      //href={`/business/${item.slug}/${item._id}`}
                      className="bg-[#10B981] text-white px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs hover:opacity-95 transition-all"
                    >
                      View Business
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}

          {categorySlug && categoryPagination.pages > 1 && (
            <div className="flex justify-center pt-6">
              <Pagination
                current={page}
                total={categoryPagination.total}
                pageSize={categoryPagination.limit}
                onChange={(p) => setPage(p)}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function DirectoryPage() {
  return (
    <Suspense
      fallback={
        // <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-xs font-bold text-gray-400">
        //   <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        //   <span className="ml-3">Loading Directory...</span>
        // </div>
        <CompanyLoader />
      }
    >
      <DirectoryContent />
    </Suspense>
  );
}
