import BusinessActions from "@/components/BuisnessAction";
import BusinessTabs from "@/components/BusinessTabs";
import {
  BadgeCheck,
  Check,
  Clock3,
  MapPin,
  Navigation,
  Phone,
  Search,
  Send,
  Share2,
  Star,
  ArrowLeft,
  Zap,
} from "lucide-react";
import Link from "next/link";


const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL

async function getBusinessProfile(id) {
  const response = await fetch(`${API_BASE}/business/${id}/profile`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Business not found");
  }

  return response.json();
}

async function getBusinessReviews(id) {
  try {
    const response = await fetch(`${API_BASE}/reviews/Business/${id}?limit=4`, {
      cache: "no-store",
    });

    if (!response.ok) return { reviews: [] };
    return response.json();
  } catch {
    return { reviews: [] };
  }
}

const DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function formatDayHours(dayEntry) {
  if (!dayEntry) return "Not set";
  if (dayEntry.closed) return "Closed";
  if (!dayEntry.shifts || dayEntry.shifts.length === 0) return "Hours not set";
  return dayEntry.shifts.map((s) => `${s.open || "?"} - ${s.close || "?"}`).join(", ");
}

function isOpenToday(operatingHours) {
  if (!operatingHours?.length) return false;
  const todayName = DAY_ORDER[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
  const entry = operatingHours.find((d) => d.day === todayName);
  return entry && !entry.closed;
}

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5 text-amber-400">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} size={15} fill={star <= Math.round(rating) ? "currentColor" : "none"} />
      ))}
    </div>
  );
}

export default async function DirectoryDetails({ params }) {
  const { id } = await params;

  const [profileData, reviewsData] = await Promise.all([
    getBusinessProfile(id),
    getBusinessReviews(id),
  ]);

  const business = profileData.business;
  const listings = profileData.listings || { services: [], physicalProducts: [], digitalProducts: [] };
  const ratingBreakdown = profileData.ratingBreakdown || { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  const reviews = reviewsData.reviews || [];

  const totalRatings = Object.values(ratingBreakdown).reduce((total, count) => total + count, 0);
  const openToday = isOpenToday(business.operatingHours);

  const orderedHours = DAY_ORDER.map((day) => {
    const entry = business.operatingHours?.find((d) => d.day === day);
    return { day, hours: formatDayHours(entry), isOpen: entry ? !entry.closed : false };
  });

  return (
    <main className="min-h-screen bg-[#fcfcfc] text-zinc-800">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
         {/* NEW: Back button */}
          <Link
            href="/business-details"
            className="mb-6 inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#060853] transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Directory
          </Link>

        <section className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr]">
          <div>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <img
                src={business.logo || "/images/no-image.png"}
                alt={business.businessName}
                className="h-24 w-24 rounded-full object-cover ring-1 ring-zinc-200"
              />

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                    {business.businessName}
                  </h1>

                  {business.isVerified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
                      <BadgeCheck size={13} />
                      Verified
                    </span>
                  )}
                </div>

                <p className="mt-1 text-zinc-600">
                  {(business.category || []).map((c) => c.name).join(", ")}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                  <Stars rating={business.rating} />
                  <span className="font-semibold">{business.rating}</span>
                  <span className="text-zinc-400">({business.numReviews} reviews)</span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {business.isVerified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
                      <Check size={12} />
                      Verified Business
                    </span>
                  )}

                  {business.trustScore >= 80 && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-500">
                      <Star size={12} />
                      Top Rated
                    </span>
                  )}
                </div>
              </div>
            </div>

            <article className="mt-8 rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-bold text-[#10105e]">About Us</h2>
              <p className="mt-4 leading-7 text-zinc-700">{business.description || "No description provided yet."}</p>
            </article>

            <BusinessActions businessId={business._id} businessName={business.businessName} />
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
                    <span className="text-sm font-normal text-zinc-300">/100</span>
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
                  {business.businessCity}, {business.businessState}, {business.businessCountry} -{" "}
                  {business.postalCode}
                </p>
              </div>
            </div>

            {business.mapLink ? (
              <iframe
                title={`${business.businessName} location`}
                className="h-72 w-full border-0"
                src={business.mapLink}
              />
            ) : (
              <div className="flex h-40 items-center justify-center text-sm text-zinc-500">
                No map location provided by this business.
              </div>
            )}

            <div className="grid grid-cols-4 p-4 text-center text-xs font-medium">
              
                <a href={business.businessPhone ? `tel:${business.businessPhone}` : undefined}
                className="flex flex-col items-center gap-2"
              >
                <Phone size={17} />
                Call
              </a>
              
                <a href={business.businessPhone ? `sms:${business.businessPhone}` : undefined}
                className="flex flex-col items-center gap-2"
              >
                <Send size={17} />
                Text
              </a>
              
                <a href={business.direction || business.mapLink || undefined}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-2"
              >
                <Navigation size={17} />
                Directions
              </a>
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
              {openToday && (
                <span className="rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-white">
                  Open Today
                </span>
              )}
            </div>

            <div className="mt-5">
              {orderedHours.map((hour) => (
                <div
                  key={hour.day}
                  className="grid grid-cols-[1fr_auto] gap-4 border-b border-zinc-100 py-4 text-sm last:border-0"
                >
                  <span className="font-medium">{hour.day}</span>
                  <span className={!hour.isOpen ? "font-medium text-rose-700" : "font-medium"}>
                    {hour.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-14">
          <BusinessTabs
            businessId={business._id}
            services={listings.services}
            physicalProducts={listings.physicalProducts}
            digitalProducts={listings.digitalProducts}
          />
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-bold">Customers Reviews</h2>
          <p className="mt-1 text-sm text-zinc-600">
            Based on {business.numReviews} verified reviews
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
                  const count = ratingBreakdown[star] || 0;
                  const width = totalRatings ? (count / totalRatings) * 100 : 0;

                  return (
                    <div key={star} className="grid grid-cols-[25px_1fr_28px] items-center gap-3 text-xs">
                      <span>{star}★</span>
                      <div className="h-3 overflow-hidden rounded-full bg-zinc-100">
                        <div className="h-full rounded-full bg-amber-400" style={{ width: `${width}%` }} />
                      </div>
                      <span className="text-zinc-500">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {reviews.length === 0 ? (
              <p className="text-sm text-zinc-400 col-span-full text-center py-6">
                No reviews yet for this business.
              </p>
            ) : (
              reviews.map((review) => (
                <article key={review._id}>
                  <div className="flex items-center gap-3">
                    <img
                      src={review.user?.avatar?.url || "/images/no-image.png"}
                      alt={review.user?.name || "Customer"}
                      className="h-10 w-10 rounded-full object-cover"
                    />

                    <div>
                      <p className="text-sm font-bold">{review.user?.name || "Anonymous"}</p>
                      <div className="flex items-center gap-3">
                        <Stars rating={review.rating} />
                        <span className="text-xs text-zinc-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-zinc-700">{review.comment}</p>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
