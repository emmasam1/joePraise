"use client";
import React, { useState } from "react";
import { Input, Button, Select } from "antd";
import {
  StarFilled,
} from "@ant-design/icons";

import {
  // SearchOutlined,
  AimOutlined,
  HistoryOutlined,
  FireOutlined,
} from "@ant-design/icons";

import Image from "next/image";

const LandingPage = () => {
  const [activeCity, setActiveCity] = useState("Los Angeles");

  const categories = [
    {
      title: "Restaurants",
      icon: (
        <Image
          src="/images/spoon.png"
          alt="Restaurant"
          width={40}
          height={40}
        />
      ),
    },
    {
      title: "Shopping",
      icon: (
        <Image src="/images/house.png" alt="Shopping" width={40} height={40} />
      ),
    },
    {
      title: "Home Services",
      icon: (
        <Image
          src="/images/gear.png"
          alt="Home Services"
          width={40}
          height={40}
        />
      ),
    },
    {
      title: "Beauty & Spa",
      icon: (
        <Image
          src="/images/sesors.png"
          alt="Beauty & Spa"
          width={40}
          height={40}
        />
      ),
    },
    {
      title: "Automotive",
      icon: (
        <Image
          src="/images/car.png"
          alt="Automotive"
          width={40}
          height={40}
        />
      ),
    },
    {
      title: "More",
      icon: (
        <Image src="/images/line_dot.png" alt="More" width={40} height={40} />
      ),
    },
  ];

  const cities = [
    "Los Angeles",
    "New York",
    "Chicago",
    "Houston",
    "San Diego",
    "Las Vegas",
    "San Francisco",
    "Dallas",
    "San Jose",
    "Phoenix",
    "Philadelphia",
    "Atlanta",
    "Austin",
    "Brooklyn",
    "Seattle",
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

  const listings = [
    {
      id: 1,
      user: "Claire C.",
      action: "added 2 photos",
      time: "1 minute ago",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      title: "Yi Fang Taiwan Fruit Tea",
      rating: 4,
      reviews: 229,
      price: "Bubble Tea, Juice Bars & Smoothies",
      category: "",
      images: [
        "/images/image1.png",
        "/images/image2.png",
      ],
    },
    {
      id: 2,
      user: "Claire C.",
      action: "wrote a review",
      time: "1 minute ago",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      title: "Yi Fang Taiwan Flower Shop",
      rating: 4,
      reviews: 229,
      price: "Roses, Floral, Lillies",
      category:
        "Very straight forward ordering process and they have a bench to sit on while you wait. I loved the...",
      images: [
        "/images/image3.png",
      ],
    },
    {
      id: 3,
      user: "Stacey I.",
      action: "added 2 photos",
      time: "3 minute ago",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      title: "Michie’s Beauty Salon",
      rating: 4,
      reviews: 229,
      price: "Installations, Braiding, Styling",
      category: "",
      images: [
        "/images/image4.png",
        "/images/image5.png",
      ],
    },
    {
      id: 4,
      user: "Andrew K.",
      action: "wrote a review",
      time: "4 minute ago",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      title: "Jules automobile",
      rating: 4,
      reviews: 229,
      price: " Pizza, Italian",
      category:
        "Come for amazing pizzas like the Spicy Ronny, stay for the juicy roast chicken. Excellent wines by the",
      images: [
        "/images/image6.png",
      ],
    },
    {
      id: 5,
      user: "Claire C.",
      action: "added a photos",
      time: "4 minute ago",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      title: "Yi Fang Taiwan Fruit Tea",
      rating: 4,
      reviews: 229,
      price: "Korean, New American, Breakfast & Brunch",
      category: "",
      images: [
        "/images/image7.png",
      ],
    },
    {
      id: 6,
      user: "Claire C.",
      action: "wrote a review",
      time: "5 minute ago",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      title: "Morris Plumite",
      rating: 4,
      reviews: 229,
      price: "Plumbing",
      category:
        "The bulgogi japchae rice was super savory and delicious. Noodles and beef were well made but I",
      images: [
        "/images/image8.png",
      ],
    },
    // ... add 5 more objects here to reach 6
  ];

  const SearchDropdown = () => (
    // Use w-[400px] or similar to ensure enough space for the tags
    <div className="p-5 w-[380px] bg-white">
      <p className="text-gray-400 text-[13px] mb-5">
        Find most searched and popular items close to you
      </p>

      {/* Recently Searched Section */}
      <div className="mb-6">
        <p className="text-[14px] font-bold mb-3 flex items-center gap-2 text-gray-800">
          <HistoryOutlined className="text-gray-400" /> Recently searched
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            "Life service",
            "Schools",
            "Restaurants",
            "Automobile Repair",
            "Bank",
          ].map((item) => (
            <button
              key={item}
              className="px-4 py-1.5 border border-gray-100 rounded-full text-xs font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Popular Section */}
      <div>
        <p className="text-[14px] font-bold mb-3 flex items-center gap-2 text-gray-800">
          <FireOutlined className="text-gray-400" /> Popular
        </p>
        <div className="flex flex-wrap gap-2">
          {["Restaurants", "Hotel", "Plumbers", "Bar"].map((item) => (
            <button
              key={item}
              className="px-4 py-1.5 border border-gray-100 rounded-full text-xs font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* 2. Hero Section */}
      <section className="py-20 px-4 text-center bg-linear-to-b from-white to-gray-50">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#2A2A2A] mb-6">
          Search over <span className="text-[#00D094]">30,000+</span> businesses
          in <br />
          the world through joe-praise
        </h1>

        {/* Combined Search Bar */}
        <div className="max-w-5xl mx-auto mt-10 bg-white p-2.5 rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.1)] flex flex-col md:flex-row items-center gap-2 border border-gray-100">
          {/* Location Input */}
          <div className="flex-1 w-full flex items-center px-4">
            <Image
              src="/images/pin_dark.png"
              alt="Pin"
              width={20}
              height={20}
            />
            <Select
              showSearch
              suffixIcon={null} // This removes the arrow
              placeholder="Location"
              variant="borderless"
              className="w-full h-12 text-base font-medium custom-select placeholder:text-[#4A4A4A]"
              options={[
                {
                  value: "current",
                  label: (
                    <div className="text-[#060853] font-bold flex items-center gap-2 py-1">
                      <AimOutlined className="text-[#060853]" /> Current
                      Location
                    </div>
                  ),
                },
                { value: "z1", label: "Zurich, Schweiz" },
                { value: "z2", label: "Zurich, Ontario, Kanada" },
                { value: "z3", label: "Zurich, MT, Vereinigte Staaten" },
                { value: "z4", label: "Zurich, KS, Vereinigte Staaten" },
              ]}
            />
          </div>

          <div className="w-px h-8 bg-gray-200 hidden md:block" />

          {/* Category */}
          <div className="flex-[1.2] w-full flex items-center px-4">
            <Image src="/images/bag.png" alt="Pin" width={20} height={20} />
            <Select
              showSearch
              suffixIcon={null}
              placeholder="Category"
              variant="borderless"
              className="w-full h-12 text-base font-medium custom-select placeholder:text-[#4A4A4A]"
              // ADD THIS LINE:
              dropdownStyle={{ minWidth: "350px" }}
              dropdownMatchSelectWidth={false}
              dropdownRender={() => <SearchDropdown />}
              options={[]}
            />
          </div>

          <div className="w-px h-8 bg-gray-200 hidden md:block" />

          <div className="flex-[1.2] w-full flex items-center px-4">
            <Input
              placeholder="Search here..."
              variant="borderless"
              className="flex-1 h-14 placeholder:text-[#90A1B980]"
            />
          </div>

          {/* Primary Search Button */}
          <Button
            type="primary"
            className="bg-[#060853]! hover:bg-[#060853]! text-white! h-14! px-12 rounded-xl font-bold text-base flex items-center gap-3 border-none shadow-none"
          >
            Search  <Image src="/images/search_white.png" alt="Search" width={16} height={16} />
          </Button>
        </div>

        {/* Categories */}
        <div className="flex flex-col items-center gap-4 mt-12">
          {/* First Row: First 7 items */}
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Events",
              "Bakery",
              "Bar",
              "Bank",
              "Auto Service",
              "Home & Garden",
              "Apartment",
            ].map((cat) => (
              <Button
                key={cat}
                className="bg-white px-6 h-12 rounded-full! shadow-sm border-none cursor-pointer transition-all hover:bg-white hover:text-inherit focus:outline-none! active:outline-none!"
              >
                <p className="text-xs font-bold text-gray-700">{cat}</p>
              </Button>
            ))}
          </div>

          {/* Second Row: Last 2 items centered */}
          <div className="flex justify-center gap-4">
            {["Restaurant", "More"].map((cat) => (
              <Button
                key={cat}
                className="bg-white px-6 h-12 rounded-full! shadow-sm border-none cursor-pointer transition-all hover:bg-white hover:text-inherit focus:outline-none active:outline-none"
              >
                <p className="text-xs font-bold text-gray-700">{cat}</p>
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="w-40 h-44 bg-white border border-gray-100 rounded-md flex flex-col items-center justify-between py-8 px-4 cursor-pointer hover:shadow-md transition-shadow group"
            >
              {/* Title */}
              <span className="text-sm font-bold text-gray-900 text-center leading-tight">
                {cat.title}
              </span>

              {/* Icon Container with specific pink background */}
              <div className="w-20 h-20 rounded-full bg-[#F5E6E6] flex items-center justify-center transition-transform group-hover:scale-110">
                <span className="text-[#800000] text-2xl flex items-center justify-center">
                  {cat.icon}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. New Listings Grid */}
      <section className="py-16 px-10 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#00D094] font-bold text-lg uppercase tracking-wider">
            OUR LATEST LISTING
          </span>
          <h2 className="text-3xl font-bold text-[#2A2A2A] mt-2">
            New Listings in our Directory
          </h2>

          <p className="text-black my-3">
            Lorem ipsum dolor sit amet dummying text fo the printing and
            typesetting industry
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {listings.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200  overflow-hidden flex flex-col"
            >
              {/* Header: User Info */}
              <div className="flex items-center gap-3 p-4">
                <Image
                  src={item.avatar}
                  alt={item.user}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <p className="text-[15px] font-bold">
                    <span className="text-[#00D094]">{item.user}</span>{" "}
                    <span className="text-[#00D094] font-semibold">
                      {item.action}
                    </span>
                  </p>
                  <span className="text-gray-400 text-sm">{item.time}</span>
                </div>
              </div>

              {/* Image Grid: 2 columns */}
              <div
                className={`grid gap-0.5 h-52 relative ${item.images?.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}
              >
                {/* Always render the first image */}
                <div className="relative w-full h-full">
                  <Image
                    src={item.images[0]}
                    alt="listing-content"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Only render the second image if it exists */}
                {item.images?.length > 1 && (
                  <div className="relative w-full h-full">
                    <Image
                      src={item.images[1]}
                      alt="listing-content-extra"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 15vw"
                    />
                  </div>
                )}
              </div>

              {/* Body: Title and Rating */}
              <div className="p-4 flex-1">
                <h3 className="text-xl font-bold text-[#2A2A2A] mb-1">
                  {item.title}
                </h3>

                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-red-700 text-sm">
                    {[...Array(5)].map((_, i) => (
                      <StarFilled
                        key={i}
                        className={
                          i < item.rating ? "text-red-800" : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-gray-500 text-sm font-medium">
                    {item.reviews}
                  </span>
                </div>

                <p className="text-gray-500 text-sm font-medium">
                  $$ • {item.price}
                </p>

                <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                  {item.category?.length > 98 ? (
                    <>
                      {item.category.slice(0, 98)}...
                      <span className="text-[#00D094] font-bold cursor-pointer ml-1">
                        Read More
                      </span>
                    </>
                  ) : (
                    item.category
                  )}
                </p>
              </div>

              {/* Footer: Interaction Icons */}
              <div className="px-4 py-3 border-t border-gray-100 flex justify-between items-center text-gray-400">
                <div className="flex gap-6 items-center">
                  <img src="/images/bulb.png" alt="Bulb" className="w-4 h-4" />
                  <img src="/images/like.png" alt="Bulb" className="w-4 h-4" />
                  <img
                    src="/images/message_2.png"
                    alt="Bulb"
                    className="w-4 h-4"
                  />
                </div>
                <img src="/images/share.png" alt="Bulb" className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-10 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#00D094] font-bold text-lg uppercase tracking-wider">
            POPULAR LISTING
          </span>
          <h2 className="text-3xl font-bold text-[#2A2A2A] mt-2">
            Popular Listings in our Directory
          </h2>

          <p className="text-black my-3">
            Lorem ipsum dolor sit amet dummying text fo the printing and
            typesetting industry
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {/* Apply .slice(0, 3) to limit the output */}
          {listings.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200  overflow-hidden flex flex-col"
            >
              {/* Header: User Info */}
              <div className="flex items-center gap-3 p-4">
                <Image
                  src={item.avatar}
                  alt={item.user}
                  width={40}
                  height={40}
                  className=" rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <p className="text-[15px] font-bold">
                    <span className="text-[#00D094]">{item.user}</span>{" "}
                    <span className="text-[#00D094] font-semibold">
                      {item.action}
                    </span>
                  </p>
                  <span className="text-gray-400 text-sm">{item.time}</span>
                </div>
              </div>

              {/* Image Grid: 2 columns */}
              <div
                className={`grid gap-0.5 h-52 relative ${item.images?.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}
              >
                {/* Always render the first image */}
                <div className="relative w-full h-full">
                  <Image
                    src={item.images[0]}
                    alt="listing-content"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Only render the second image if it exists */}
                {item.images?.length > 1 && (
                  <div className="relative w-full h-full">
                    <Image
                      src={item.images[1]}
                      alt="listing-content-extra"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 15vw"
                    />
                  </div>
                )}
              </div>

              {/* Body: Title and Rating */}
              <div className="p-4 flex-1">
                <h3 className="text-xl font-bold text-[#2A2A2A] mb-1">
                  {item.title}
                </h3>

                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-red-700 text-sm">
                    {[...Array(5)].map((_, i) => (
                      <StarFilled
                        key={i}
                        className={
                          i < item.rating ? "text-red-800" : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-gray-500 text-sm font-medium">
                    {item.reviews}
                  </span>
                </div>

                <p className="text-gray-500 text-sm font-medium">
                  $$ • {item.price}
                </p>

                <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                  {item.category?.length > 98 ? (
                    <>
                      {item.category.slice(0, 98)}...
                      <span className="text-[#00D094] font-bold cursor-pointer ml-1">
                        Read More
                      </span>
                    </>
                  ) : (
                    item.category
                  )}
                </p>
              </div>

              {/* Footer: Interaction Icons */}
              <div className="px-4 py-3 border-t border-gray-100 flex justify-between items-center text-gray-400">
                <div className="flex gap-6 items-center">
                  <img src="/images/bulb.png" alt="Bulb" className="w-4 h-4" />
                  <img src="/images/like.png" alt="Bulb" className="w-4 h-4" />
                  <img
                    src="/images/message_2.png"
                    alt="Bulb"
                    className="w-4 h-4"
                  />
                </div>
                <img src="/images/share.png" alt="Bulb" className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full bg-[#060853] py-24 px-6 flex items-center justify-center">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Side: Heading */}
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight text-center lg:text-left">
              Don't miss our weekly updates
            </h2>
          </div>

          {/* Right Side: Search/Subscribe Bar */}
          <div className="flex-1 w-full max-w-xl bg-[#1D293D80]!">
            <div className="relative flex items-center h-18 bg-[#1D293D80]! border border-white/10 rounded-2xl overflow-hidden px-2">
              <Input
                placeholder="Enter your email address..."
                variant="borderless"
                className="flex-1 bg-[#1D293D80]! text-white! text-lg placeholder:text-white! focus:ring-0 px-6 h-full"
              />

              <Button className="h-14! bg-[#15BE87]! hover:bg-[#15BE87]! border-none! text-white! font-bold uppercase text-xs tracking-[1px] rounded-lg! px-8 transition-all flex items-center justify-center">
                SUBSCRIBE
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white font-sans max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-black mb-2">
            Explore searches in popular cities
          </h2>
          <p className="text-gray-500 text-lg">
            Discover what people are searching for in each city
          </p>
        </div>

        {/* City Tags */}
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

        {/* Search Lists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Top Searches */}
          <div>
            <h3 className="font-bold text-black mb-6">
              Top Searches in {activeCity}, CA
            </h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-4">
              {searchData.top.map(([left, right], i) => (
                <React.Fragment key={i}>
                  <span className="text-gray-500 text-sm hover:text-[#060853] cursor-pointer">
                    {left}
                  </span>
                  <span className="text-gray-500 text-sm hover:text-[#060853] cursor-pointer">
                    {right}
                  </span>
                </React.Fragment>
              ))}
            </div>
            <p
              type="link"
              className="p-0 mt-6 text-[#060853] font-bold flex items-center gap-2"
            >
              Show more{" "}
              <Image
                src="/images/arrow_down.png"
                alt="Down Arrow"
                width={15}
                height={15}
              />
            </p>
          </div>

          {/* Trending Searches */}
          <div>
            <h3 className="font-bold text-black mb-6">
              Trending Searches in {activeCity}, CA
            </h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-4">
              {searchData.trending.map(([left, right], i) => (
                <React.Fragment key={i}>
                  <span className="text-gray-500 text-sm hover:text-[#060853] cursor-pointer">
                    {left}
                  </span>
                  <span className="text-gray-500 text-sm hover:text-[#060853] cursor-pointer">
                    {right}
                  </span>
                </React.Fragment>
              ))}
            </div>
            <p
              type="link"
              className="p-0 mt-6 text-[#060853] font-bold flex  gap-2"
            >
              Show more{" "}
              <Image
                src="/images/arrow_down.png"
                alt="Down Arrow"
                width={15}
                height={15}
              />
            </p>
          </div>

          {/* Seasonal Searches */}
          <div>
            <h3 className="font-bold text-black mb-6">
              Seasonal Searches in {activeCity}, CA
            </h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-4">
              {searchData.seasonal.map((item, i) => (
                <span
                  key={i}
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
