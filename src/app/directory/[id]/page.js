
import BusinessTabs from "@/components/BusinessTabs";
import {
  BadgeCheck,
  Check,
  Clock3,
  Heart,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Search,
  Send,
  Share2,
  Star,
  Zap,
} from "lucide-react";


// Replace this with your real API request when ready.
async function getBusiness(id) {
  // REAL API EXAMPLE:
  //
  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL}/businesses/${id}`,
  //   { cache: "no-store" }
  // );
  //
  // if (!response.ok) {
  //   throw new Error("Business not found");
  // }
  //
  // return response.json();

  // Temporary data while API is not connected
  return {
    id,
    name: "Aurora Design Studio",
    category: "Interior Design & Architecture Consultancy",
    logo: "https://placehold.co/150x150/100d63/ffffff?text=AD",
    isVerified: true,
    rating: 4.9,
    totalReviews: 247,
    description:
      "Aurora Design Studio transforms spaces into extraordinary experiences. With over 12 years of expertise in residential and commercial design, we blend innovation with functionality. Our award-winning team has completed 500+ projects across 15 cities, delivering personalized solutions that reflect your unique style and needs.",
    trustScore: 87,
    responseRate: 98,
    onTimeDelivery: 96,
    clientSatisfaction: 94,
    address: "Murtala Mohammed Expressway",
    city: "Abuja",
    state: "FCT",
    country: "Nigeria",
    postalCode: "901708",
    latitude: 9.0765,
    longitude: 7.3986,

    openingHours: [
      { day: "Monday", hours: "8am - 6pm", isOpen: true },
      { day: "Tuesday", hours: "8am - 6pm", isOpen: true },
      { day: "Wednesday", hours: "8am - 6pm", isOpen: true },
      { day: "Thursday", hours: "8am - 6pm", isOpen: true },
      { day: "Friday", hours: "8am - 6pm", isOpen: true },
      { day: "Saturday", hours: "8am - 6pm", isOpen: true },
      { day: "Sunday", hours: "Closed", isOpen: false },
    ],

    services: [
      {
        id: "1",
        name: "Professional Web Design",
        description:
          "Pre-configured lighting sets designed to create specific moods using smart-glass technology.",
        price: 100,
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600",
      },
      {
        id: "2",
        name: "Eco-Friendly Residential Cleaning",
        description:
          "Pre-configured lighting sets designed to create specific moods using smart-glass technology.",
        price: 100,
        image:
          "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=600",
      },
      {
        id: "3",
        name: "Personal Fitness Training",
        description:
          "Pre-configured lighting sets designed to create specific moods using smart-glass technology.",
        price: 100,
        image:
          "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600",
      },
      {
        id: "4",
        name: "Gourmet Catering Services",
        description:
          "Pre-configured lighting sets designed to create specific moods using smart-glass technology.",
        price: 100,
        image:
          "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600",
      },
      {
        id: "5",
        name: "App & Web Development",
        description:
          "Pre-configured lighting sets designed to create specific moods using smart-glass technology.",
        price: 100,
        image:
          "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600",
      },
      {
        id: "6",
        name: "Cybersecurity & Cloud Consulting",
        description:
          "Pre-configured lighting sets designed to create specific moods using smart-glass technology.",
        price: 100,
        image:
          "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600",
      },
    ],

    ratingBreakdown: {
      5: 220,
      4: 29,
      3: 6,
      2: 2,
      1: 0,
    },

    reviews: [
      {
        id: "1",
        customerName: "Emily Davis",
        avatar: "https://i.pravatar.cc/100?img=47",
        rating: 5,
        createdAt: "2 days ago",
        comment:
          "Absolutely stunning work! Aurora transformed our dated living room into a modern, inviting space. The attention to detail was incredible, and they stayed within budget. Highly recommend!",
      },
      {
        id: "2",
        customerName: "David Brown",
        avatar: "https://i.pravatar.cc/100?img=12",
        rating: 5,
        createdAt: "3 days ago",
        comment:
          "Excellent service from start to finish. The team understood exactly what we wanted and delivered a beautiful result.",
      },
      {
        id: "3",
        customerName: "Grace Johnson",
        avatar: "https://i.pravatar.cc/100?img=32",
        rating: 5,
        createdAt: "1 week ago",
        comment:
          "Professional, creative and very responsive. I would definitely recommend Aurora Design Studio.",
      },
      {
        id: "4",
        customerName: "Michael Smith",
        avatar: "https://i.pravatar.cc/100?img=11",
        rating: 4,
        createdAt: "1 week ago",
        comment:
          "Great communication and excellent attention to detail throughout the entire project.",
      },
    ],
  };
}

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5 text-amber-400">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={15}
          fill={star <= Math.round(rating) ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}

export default async function DirectoryDetails({ params }) {
//   import { useState } from "react";
//   import { motion } from "framer-motion";

  const { id } = await params;
  const business = await getBusiness(id);

  const totalRatings = Object.values(business.ratingBreakdown).reduce(
    (total, count) => total + count,
    0,
  );


  return (
    <main className="min-h-screen bg-[#fcfcfc] text-zinc-800">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <section className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr]">
          <div>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <img
                src={business.logo}
                alt={business.name}
                className="h-24 w-24 rounded-full object-cover ring-1 ring-zinc-200"
              />

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                    {business.name}
                  </h1>

                  {business.isVerified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
                      <BadgeCheck size={13} />
                      Verified
                    </span>
                  )}
                </div>

                <p className="mt-1 text-zinc-600">{business.category}</p>

                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                  <Stars rating={business.rating} />
                  <span className="font-semibold">{business.rating}</span>
                  <span className="text-zinc-400">
                    ({business.totalReviews} reviews)
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
                    <Check size={12} />
                    Verified Business
                  </span>

                  <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-500">
                    <Star size={12} />
                    Top Rated
                  </span>

                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-500">
                    <Zap size={12} />
                    Top Rated
                  </span>
                </div>
              </div>
            </div>

            <article className="mt-8 rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-bold text-[#10105e]">About Us</h2>
              <p className="mt-4 leading-7 text-zinc-700">
                {business.description}
              </p>
              <button className="mt-4 text-xs font-semibold text-rose-700">
                Read More
              </button>
            </article>

            <div className="mt-6 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded bg-[#10105e] px-4 py-3 text-sm font-medium text-white">
                <Share2 size={17} />
                Share Business
              </button>

              <button className="inline-flex items-center gap-2 rounded border border-[#10105e] px-4 py-3 text-sm font-medium text-[#10105e]">
                <MessageCircle size={17} />
                Message
              </button>
            </div>
          </div>

          <aside>
            <div className="mb-10 flex h-11 items-center gap-2 rounded-full border border-zinc-200 bg-white px-4">
              <Search size={20} className="text-zinc-600" />
              <input
                type="search"
                placeholder="Search"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>

            <div className="rounded-2xl bg-[#100d63] p-6 text-white shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-zinc-300">Trust Score</p>
                  <p className="mt-1 text-5xl font-semibold">
                    {business.trustScore}
                    <span className="text-sm font-normal text-zinc-300">
                      /100
                    </span>
                  </p>
                </div>

                <div className="rounded-full bg-amber-400/20 p-5 text-amber-400">
                  <BadgeCheck size={31} fill="currentColor" />
                </div>
              </div>

              <div className="my-6 border-t border-white/15" />

              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-200">Response Rate</span>
                  <span>{business.responseRate}%</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-200">On-time Delivery</span>
                  <span>{business.onTimeDelivery}%</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-200">Client Satisfaction</span>
                  <span>{business.clientSatisfaction}%</span>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-14 grid gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl bg-emerald-50">
            <div className="flex items-center gap-4 p-5">
              <div className="rounded-full bg-zinc-200 p-3">
                <MapPin className="text-zinc-900" />
              </div>

              <div>
                <p className="text-sm font-semibold">Service Location</p>
                <h2 className="mt-1 text-lg font-bold">{business.address}</h2>
                <p className="text-sm text-zinc-600">
                  {business.city}, {business.state}, {business.country} -{" "}
                  {business.postalCode}
                </p>
              </div>
            </div>

            <iframe
              title={`${business.name} location`}
              className="h-72 w-full border-0"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                business.longitude - 0.03
              }%2C${business.latitude - 0.02}%2C${
                business.longitude + 0.03
              }%2C${business.latitude + 0.02}&layer=mapnik&marker=${
                business.latitude
              }%2C${business.longitude}`}
            />

            <div className="grid grid-cols-4 p-4 text-center text-xs font-medium">
              <button className="flex flex-col items-center gap-2">
                <Phone size={17} />
                Call
              </button>
              <button className="flex flex-col items-center gap-2">
                <Send size={17} />
                Text
              </button>
              <button className="flex flex-col items-center gap-2">
                <Navigation size={17} />
                Directions
              </button>
              <button className="flex flex-col items-center gap-2">
                <Share2 size={17} />
                Share
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-xl font-bold">
                <Clock3 className="text-emerald-500" size={20} />
                Hours
              </h2>
              <span className="rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-white">
                Open Today
              </span>
            </div>

            <div className="mt-5">
              {business.openingHours.map((hour) => (
                <div
                  key={hour.day}
                  className="grid grid-cols-[1fr_auto] gap-4 border-b border-zinc-100 py-4 text-sm last:border-0"
                >
                  <span className="font-medium">{hour.day}</span>
                  <span
                    className={
                      hour.isOpen === false
                        ? "font-medium text-rose-700"
                        : "font-medium"
                    }
                  >
                    {hour.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-14">
          <BusinessTabs />
          {/* <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-3xl font-bold">Services & Products</h2>

          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {business.services.map((service) => (
              <article
                key={service.id}
                className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4"
              >
                <div className="flex gap-4">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="h-28 w-36 rounded object-cover"
                  />

                  <div>
                    <p className="text-sm font-bold">{service.name}</p>
                    <p className="mt-2 line-clamp-4 text-xs leading-5 text-zinc-600">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <Heart size={23} className="text-zinc-600" />
                  <span className="text-xl font-bold">${service.price}</span>
                  <button className="rounded bg-[#10105e] px-3 py-2 text-xs font-semibold text-white">
                    Book Now
                  </button>
                </div>
              </article>
            ))}
          </div> */}
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-bold">Customers Reviews</h2>
          <p className="mt-1 text-sm text-zinc-600">
            Based on {business.totalReviews} verified reviews
          </p>

          <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6">
            <div className="grid items-center gap-8 md:grid-cols-[180px_1fr]">
              <div className="text-center">
                <p className="text-4xl font-bold">{business.rating}</p>
                <p className="mt-2 text-xs">({totalRatings} reviews)</p>
                <div className="mt-1 flex justify-center">
                  <Stars rating={business.rating} />
                </div>
              </div>

              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = business.ratingBreakdown[star];
                  const width = totalRatings ? (count / totalRatings) * 100 : 0;

                  return (
                    <div
                      key={star}
                      className="grid grid-cols-[25px_1fr_28px] items-center gap-3 text-xs"
                    >
                      <span>{star}★</span>
                      <div className="h-3 overflow-hidden rounded-full bg-zinc-100">
                        <div
                          className="h-full rounded-full bg-amber-400"
                          style={{ width: `${width}%` }}
                        />
                      </div>
                      <span className="text-zinc-500">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {business.reviews.map((review) => (
              <article key={review.id}>
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.customerName}
                    className="h-10 w-10 rounded-full object-cover"
                  />

                  <div>
                    <p className="text-sm font-bold">{review.customerName}</p>
                    <div className="flex items-center gap-3">
                      <Stars rating={review.rating} />
                      <span className="text-xs text-zinc-500">
                        {review.createdAt}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-6 text-zinc-700">
                  {review.comment}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
