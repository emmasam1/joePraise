
"use client";
import React, { useState, useTransition } from "react";
import { Input, Button, Select } from "antd";
import { useRouter } from "next/navigation";
import {
  StarFilled,
  AimOutlined,
  HistoryOutlined,
  FireOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Heart, MessageCircle, Share2, Globe } from "lucide-react";
import Image from "next/image";
import { Country, City } from "country-state-city";

const COUNTRIES = Country.getAllCountries();
const COUNTRY_OPTIONS = COUNTRIES.map((country) => ({
  value: country.isoCode,
  label: `${country.flag} ${country.name}`,
  searchLabel: country.name,
}));

function countrySearchValue(value) {
  const normalizedValue = String(value || "").trim().toLowerCase();
  const country = COUNTRIES.find(
    (item) =>
      item.name.toLowerCase() === normalizedValue ||
      item.isoCode.toLowerCase() === normalizedValue,
  );
  return country?.isoCode || String(value || "").trim();
}

const LandingPage = ({
  publicCategories = [],
  newListings = [],
  popularListings = [],
}) => {
  const router = useRouter();
  const [isSearchPending, startSearchTransition] = useTransition();
  const [activeCity, setActiveCity] = useState("Los Angeles");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [searchCategorySlug, setSearchCategorySlug] = useState(undefined);
  const [searchText, setSearchText] = useState("");

  const publicCategoriesLoading = false;
  const newListingsLoading = false;
  const popularListingsLoading = false;
  const cityOptions = searchLocation
    ? City.getCitiesOfCountry(countrySearchValue(searchLocation)).map((city) => ({
        value: city.name,
        label: city.name,
      }))
    : [];

  const handleCategoryClick = (slug) => {
    router.push(`/business-details?category=${encodeURIComponent(slug)}`);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchCategorySlug) params.set("category", searchCategorySlug);
    if (searchText) params.set("q", searchText);
    if (searchLocation) params.set("location", countrySearchValue(searchLocation));
    if (searchCity.trim()) params.set("city", searchCity.trim());
    startSearchTransition(() => {
      router.push(`/business-details?${params.toString()}`);
    });
  };

  const handleBusinessClick = (businessId) => {
    router.push(`/business-details/${businessId}`);
  };

  const handleShare = (e, business) => {
    e.stopPropagation();
    const url = `${window.location.origin}/business-details/${business._id}`;
    if (navigator.share) {
      navigator.share({ title: business.businessName, url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
    }
  };

  const categoryOptions = (publicCategories || []).map((cat) => ({
    value: cat.slug,
    label: cat.name,
  }));

  const cities = [
    "Los Angeles", "New York", "Chicago", "Houston", "San Diego",
    "Las Vegas", "San Francisco", "Dallas", "San Jose", "Phoenix",
    "Philadelphia", "Atlanta", "Austin", "Brooklyn", "Seattle",
  ];

  const searchData = {
    top: [
      ["Dog Grooming", "Escape Room"],
      ["Ramen", "Eyebrow Threading"],
      ["Korean BBQ", "Laundromat"],
      ["Veterinary Clinic", "Sushi"],
      ["Shoe Repair", "Urgent Care"],
      ["Chinese Food", "Coffee"],
    ],
    trending: [
      ["Auto Windows", "Corned Beef and Cabbage"],
      ["Kids Spring Break Camps", "Bowling"],
      ["Dubai Chewy Cookie", "Korean Lash Lift"],
      ["Ceviche", "Easter Brunch"],
      ["Mosques", "Coffee Shop To Work At"],
      ["Health Retreats", "Ramadan Buffet"],
    ],
    seasonal: ["Irish Pub", "Yoga Classes"],
  };

  const SearchDropdown = () => (
    <div className="p-5 w-[380px] bg-white">
      <p className="text-gray-400 text-[13px] mb-5">
        Find most searched and popular items close to you
      </p>

      <div className="mb-6">
        <p className="text-[14px] font-bold mb-3 flex items-center gap-2 text-gray-800">
          <HistoryOutlined className="text-gray-400" /> Categories
        </p>
        <div className="flex flex-wrap gap-2">
          {publicCategoriesLoading ? (
            <span className="text-xs text-gray-400 flex items-center gap-2">
              <LoadingOutlined spin /> Loading categories...
            </span>
          ) : (
            (publicCategories || []).slice(0, 8).map((cat) => (
              <button
                key={cat._id}
                onClick={() => {
                  setSearchCategorySlug(cat.slug);
                  handleCategoryClick(cat.slug);
                }}
                className="px-4 py-1.5 border border-gray-100 rounded-full text-xs font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all"
              >
                {cat.name}
              </button>
            ))
          )}
        </div>
      </div>

      <div>
        <p className="text-[14px] font-bold mb-3 flex items-center gap-2 text-gray-800">
          <FireOutlined className="text-gray-400" /> Popular
        </p>
        <div className="flex flex-wrap gap-2">
          {(publicCategories || []).slice(0, 4).map((cat) => (
            <button
              key={cat._id}
              onClick={() => handleCategoryClick(cat.slug)}
              className="px-4 py-1.5 border border-gray-100 rounded-full text-xs font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all"
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const BusinessCard = ({ business }) => {
    const imageUrl =
      (typeof business.banner === "string" ? business.banner : business.banner?.url) ||
      (typeof business.logo === "string" ? business.logo : business.logo?.url) ||
      "/images/image1.png";
    const categoryLabel = business.category?.[0]?.name || "";
    const description = business.description || "";
    const truncatedDescription =
      description.length > 110 ? `${description.slice(0, 110)}...` : description;

    return (
      <div
        onClick={() => handleBusinessClick(business._id)}
        className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col cursor-pointer hover:shadow-md transition-shadow"
      >
        <div className="relative w-full h-52">
          <Image
            src={imageUrl}
            alt={business.businessName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            unoptimized
          />
          {business.isVerified && (
            <span className="absolute top-3 left-3 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
              Verified
            </span>
          )}
        </div>

        <div className="p-4 flex-1">
          <div className="flex min-w-0 items-center gap-3 mb-2">
            {business.logo && (
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100 ring-1 ring-gray-200">
                <Image
                  src={typeof business.logo === "string" ? business.logo : business.logo.url}
                  alt={`${business.businessName} logo`}
                  fill
                  sizes="40px"
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}
            <h3 className="min-w-0 truncate text-lg font-bold text-[#2A2A2A]">{business.businessName}</h3>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <div className="flex text-red-700 text-sm">
              {[...Array(5)].map((_, i) => (
                <StarFilled
                  key={i}
                  className={i < Math.round(business.rating || 0) ? "text-red-800" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-gray-500 text-sm font-medium">
              ({business.numReviews || 0})
            </span>
          </div>

          <p className="text-gray-500 text-sm font-medium">
            {categoryLabel} {business.businessCity ? `• ${business.businessCity}` : ""}
          </p>

          {truncatedDescription && (
            <p className="text-gray-500 text-xs mt-2 leading-relaxed">
              {truncatedDescription}
            </p>
          )}

          <p className="text-[#00D094] font-bold text-sm mt-3">
            View Business →
          </p>
        </div>

        {/* Restored action icon row */}
        <div className="px-4 py-3 border-t border-gray-100 flex justify-between items-center text-gray-400">
          <div className="flex gap-5 items-center">
            <Globe size={16} className="hover:text-gray-600" />
            <Heart
              size={16}
              className="hover:text-red-500"
              onClick={(e) => e.stopPropagation()}
            />
            <MessageCircle
              size={16}
              className="hover:text-gray-600"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <Share2
            size={16}
            className="hover:text-gray-600"
            onClick={(e) => handleShare(e, business)}
          />
        </div>
      </div>
    );
  };

  const CardSkeleton = () => (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
      <div className="w-full h-52 bg-gray-200" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="px-4 py-12 text-center bg-gradient-to-b from-white to-gray-50 sm:py-16 lg:py-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2A2A2A] mb-6">
          Search over <span className="text-[#00D094]">30,000+</span> businesses
          in <br className="hidden sm:block" />
          the world through joe-praise
        </h1>

        <div className="max-w-5xl mx-auto mt-10 bg-white p-2.5 rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.1)] flex flex-col md:flex-row items-center gap-2 border border-gray-100">
          <div className="flex-1 w-full flex items-center px-4">
            <Image
              src="/images/pin_dark.png"
              alt="Location"
              width={20}
              height={20}
              className="h-5 w-5 shrink-0 object-contain"
            />
            <Select
              showSearch
              allowClear
              placeholder="Country"
              value={searchLocation}
              onChange={(value) => {
                setSearchLocation(value || "");
                setSearchCity("");
              }}
              options={COUNTRY_OPTIONS}
              optionFilterProp="searchLabel"
              filterOption={(input, option) =>
                option.searchLabel.toLowerCase().includes(input.toLowerCase())
              }
              variant="borderless"
              className="country-search-select h-12 w-full text-base font-medium"
            />
          </div>

          <div className="w-px h-8 bg-gray-200 hidden md:block" />

          <div className="flex-1 w-full flex items-center px-4">
            <Select
              showSearch
              allowClear
              placeholder="City"
              value={searchCity}
              onChange={(value) => setSearchCity(value || "")}
              options={cityOptions}
              optionFilterProp="label"
              variant="borderless"
              onPressEnter={handleSearch}
              className="country-search-select h-12 w-full text-base font-medium"
            />
          </div>

          <div className="w-px h-8 bg-gray-200 hidden md:block" />

          <div className="flex-[1.2] w-full flex items-center px-4">
            <Image
              src="/images/bag.png"
              alt="Category"
              width={20}
              height={20}
              className="h-5 w-5 shrink-0 object-contain"
            />
            <Select
              showSearch
              suffixIcon={null}
              placeholder="Category"
              variant="borderless"
              value={searchCategorySlug}
              onChange={(val) => setSearchCategorySlug(val)}
              className="w-full h-12 text-base font-medium custom-select"
              styles={{ popup: { root: { minWidth: "350px" } } }}
              loading={publicCategoriesLoading}
              options={categoryOptions}
              allowClear
              optionFilterProp="label"
            />
          </div>

          <div className="w-px h-8 bg-gray-200 hidden md:block" />

          <div className="flex-[1.2] w-full flex items-center px-4">
            <Input
              placeholder="Search here..."
              variant="borderless"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onPressEnter={handleSearch}
              className="flex-1 h-14 placeholder:text-[#90A1B980]"
            />
          </div>

          <Button
            type="primary"
            onClick={handleSearch}
            loading={isSearchPending}
            className="w-full bg-[#060853]! hover:bg-[#060853]! text-white! h-14! px-8 sm:px-12 rounded-xl font-bold text-base flex items-center justify-center gap-3 border-none shadow-none md:w-auto"
          >
            Search <Image src="/images/search_white.png" alt="Search" width={16} height={16} />
          </Button>
        </div>
      </section>

      {/* Category Icon Grid */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6">
          {publicCategoriesLoading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="w-40 h-44 bg-gray-100 rounded-md animate-pulse" />
            ))
          ) : (
            (publicCategories || []).slice(0, 6).map((cat) => (
              <div
                key={cat._id}
                onClick={() => handleCategoryClick(cat.slug)}
                className="w-40 h-44 bg-white border border-gray-100 rounded-md flex flex-col items-center justify-between py-8 px-4 cursor-pointer hover:shadow-md transition-shadow group"
              >
                <span className="text-sm font-bold text-gray-900 text-center leading-tight">
                  {cat.name}
                </span>

                <div className="w-20 h-20 rounded-full bg-[#F5E6E6] p-1 overflow-hidden transition-transform group-hover:scale-110">
                  {cat?.icon?.url ? (
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <Image
                        src={cat.icon.url}
                        alt={cat.name}
                        fill
                        className="object-cover rounded-full"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full rounded-full flex items-center justify-center">
                      <span className="text-[#800000] text-2xl">•</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* New Listings Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
        <div className="text-center mb-12">
          <span className="text-[#00D094] font-bold text-lg uppercase tracking-wider">
            OUR LATEST LISTING
          </span>
          <h2 className="text-3xl font-bold text-[#2A2A2A] mt-2">
            New Listings in our Directory
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newListingsLoading
            ? [...Array(6)].map((_, i) => <CardSkeleton key={i} />)
            : newListings.length > 0
              ? newListings.map((business) => (
                  <BusinessCard key={business._id} business={business} />
                ))
              : (
                <p className="col-span-full text-center text-gray-400 text-sm py-10">
                  No new listings yet.
                </p>
              )}
        </div>
      </section>

      {/* Popular Listings Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
        <div className="text-center mb-12">
          <span className="text-[#00D094] font-bold text-lg uppercase tracking-wider">
            POPULAR LISTING
          </span>
          <h2 className="text-3xl font-bold text-[#2A2A2A] mt-2">
            Popular Listings in our Directory
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularListingsLoading
            ? [...Array(3)].map((_, i) => <CardSkeleton key={i} />)
            : popularListings.length > 0
              ? popularListings.map((business) => (
                  <BusinessCard key={business._id} business={business} />
                ))
              : (
                <p className="col-span-full text-center text-gray-400 text-sm py-10">
                  No popular listings yet.
                </p>
              )}
        </div>
      </section>

      {/* Weekly Newsletter Banner */}
      <section className="w-full bg-[#060853] py-24 px-6 flex items-center justify-center">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight text-center lg:text-left">
              Don&apos;t miss our weekly updates
            </h2>
          </div>

          <div className="flex-1 w-full max-w-xl bg-[#1D293D80]!">
            <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-[#1D293D80]! p-2 sm:h-18 sm:flex-row sm:items-center">
              <Input
                placeholder="Enter your email address..."
                variant="borderless"
                className="flex-1 bg-[#1D293D80]! text-white! text-lg placeholder:text-white! focus:ring-0 px-6 h-full"
              />
              <Button className="h-14! w-full bg-[#15BE87]! hover:bg-[#15BE87]! border-none! text-white! font-bold uppercase text-xs tracking-[1px] rounded-lg! px-8 transition-all flex items-center justify-center sm:w-auto">
                SUBSCRIBE
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Searches */}
      <section className="py-20 px-6 bg-white font-sans max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-black mb-2">
            Explore searches in popular cities
          </h2>
          <p className="text-gray-500 text-lg">
            Discover what people are searching for in each city
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-16">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setActiveCity(city)}
              className={`px-6 py-2 rounded-full border transition-all font-medium text-sm ${
                activeCity === city
                  ? "bg-[#060853] text-white border-[#060853]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-bold text-black mb-6">Top Searches in {activeCity}, CA</h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-4">
              {searchData.top.map(([left, right], i) => (
                <React.Fragment key={i}>
                  <span
                    onClick={() => router.push(`/business-details?q=${encodeURIComponent(left)}`)}
                    className="text-gray-500 text-sm hover:text-[#060853] cursor-pointer"
                  >
                    {left}
                  </span>
                  <span
                    onClick={() => router.push(`/business-details?q=${encodeURIComponent(right)}`)}
                    className="text-gray-500 text-sm hover:text-[#060853] cursor-pointer"
                  >
                    {right}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-black mb-6">Trending Searches in {activeCity}, CA</h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-4">
              {searchData.trending.map(([left, right], i) => (
                <React.Fragment key={i}>
                  <span
                    onClick={() => router.push(`/business-details?q=${encodeURIComponent(left)}`)}
                    className="text-gray-500 text-sm hover:text-[#060853] cursor-pointer"
                  >
                    {left}
                  </span>
                  <span
                    onClick={() => router.push(`/business-details?q=${encodeURIComponent(right)}`)}
                    className="text-gray-500 text-sm hover:text-[#060853] cursor-pointer"
                  >
                    {right}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-black mb-6">Seasonal Searches in {activeCity}, CA</h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-4">
              {searchData.seasonal.map((item, i) => (
                <span
                  key={i}
                  onClick={() => router.push(`/business-details?q=${encodeURIComponent(item)}`)}
                  className="text-gray-500 text-sm hover:text-[#060853] cursor-pointer"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
